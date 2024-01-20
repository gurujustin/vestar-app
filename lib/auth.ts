import jwt from "jsonwebtoken";
import { serialize } from "cookie";
import { NextApiRequest, NextApiResponse } from "next";
import User from "../models/user";
import dbConnect from "./dbConnect";

interface Request extends NextApiRequest {
	user?: DecodedUser;
}

type DecodedUser = {
	id: string;
	email: string;
	investor_pf?: string | null;
	investor_pj?: string | null;
	iat: number;
	exp: number;
};

const JWT_SECRET = process.env.JWT_SECRET as string;
export const cookieOptions = {
	httpOnly: true,
	maxAge: 604800,
	path: "/",
	sameSite: "Strict",
	secure: process.env.NODE_ENV === "production",
};

export function setCookie(
	res: any,
	name: string,
	value: string,
	options?: Record<string, unknown>
): void {
	const stringValue =
		typeof value === "object" ? `j:${JSON.stringify(value)}` : String(value);

	res.setHeader(
		"Set-Cookie",
		serialize(name, String(stringValue), options || (cookieOptions as any))
	);
}

export function generateToken(user: any) {
	if (!user) return "";

	const token = jwt.sign(
		{
			id: user._id,
			email: user.email,
			investor_pf: user?.investor_pf || null,
			investor_pj: user?.investor_pj || null,
		},
		JWT_SECRET,
		{ expiresIn: "7d" }
	);

	return token;
}

export async function verifyUser(
	req: Request,
	res: NextApiResponse,
	next: any
) {
	try {
		await dbConnect();

		const token = req.headers?.authorization?.replace("Bearer ", "") as string;
		let user: DecodedUser | undefined;

		jwt.verify(token, process.env.JWT_SECRET as string, (err, decoded) => {
			if (decoded) user = decoded as DecodedUser;
		});

		const userExists = await User.findById(user?.id).lean();

		if (!userExists) {
			return res.status(401).json({ error: "Unauthorized access" });
		}

		req.user = user;

		next();
	} catch (error: any) {
		res.status(400).json({ error: error?.message });
	}
}

export function clearUser(res: NextApiResponse): void {
	setCookie(res, "livn_auth", "0", {
		...cookieOptions,
		path: "/",
		maxAge: 1,
	});
}
