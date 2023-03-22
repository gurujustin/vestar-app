import { NextApiRequest, NextApiResponse } from "next";
import { isValidObjectId } from "mongoose";
import nextConnect from "next-connect";

import dbConnect from "../../../lib/dbConnect";
import Investment from "../../../models/Investment";
import { verifyUser } from "../../../lib/auth";
import { ApiResponse } from "../../../models/ApiResponse";
import Investor from "../../../models/investor";

type ResponseData = ApiResponse<string>;

const router = nextConnect({
	onError(error, req: NextApiRequest, res: NextApiResponse<ResponseData>) {
		res.status(501).json({ error: `something went wrong! ${error.message}` });
	},
	onNoMatch(req: NextApiRequest, res: NextApiResponse<ResponseData>) {
		res.status(405).json({ error: `Method '${req.method}' Not Allowed` });
	},
});

router.get(verifyUser, async (req, res) => {
	try {
		await dbConnect();

		const { investorId } = req.query;
		const page = (req.query.page as any) ? (req.query.page as any) - 1 : 0;
		const limit = (req.query.limit as any) || 100;
		const { user } = req;

		if (!isValidObjectId(investorId)) {
			return res.status(400).json({ error: "invalid id" });
		}

		const investor = await Investor.findById(investorId).lean();

		if (!investor || user?.investor_id !== `${investor._id}`) {
			return res.status(200).json({ data: [], message: "investor not found" });
		}

		const { wallet_address } = investor;

		const totalPages = Math.ceil(
			(await Investment.countDocuments({
				investor_address: wallet_address,
			})) / limit
		);

		const investments = await Investment.find({ owner_address: wallet_address })
			.limit(limit)
			.skip(page * limit)
			.sort({ createdAt: -1 })
			.lean();

		res.status(200).json({ data: investments, totalPages });
	} catch (error: any) {
		res.status(400).json({ error: error.message });
	}
});

export default router;
