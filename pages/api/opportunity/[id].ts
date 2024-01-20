import { NextApiRequest, NextApiResponse } from "next";
import { isValidObjectId } from "mongoose";
import nextConnect from "next-connect";
import { z } from "zod";

import dbConnect from "../../../lib/dbConnect";
import Opportunity from "../../../models/oportunity";
import { verifyUser } from "../../../lib/auth";
import { ApiResponse } from "../../../models/ApiResponse";

type ResponseData = ApiResponse<string>;

const router = nextConnect({
	onError(error, req: NextApiRequest, res: NextApiResponse<ResponseData>) {
		res.status(501).json({ error: `something went wrong! ${error.message}` });
	},
	onNoMatch(req: NextApiRequest, res: NextApiResponse<ResponseData>) {
		res.status(405).json({ error: `Method '${req.method}' Not Allowed` });
	},
});

const OpportunitySchema = z.object({
	name: z.optional(z.string().max(60)),
	address: z.optional(z.object({} as { [key: string]: any })),
	min_investment: z.optional(z.number()),
	init_date: z.optional(z.string().datetime({ offset: true })),
	expected_delivery_date: z.optional(z.string().datetime({ offset: true })),
	end_date: z.optional(z.string().datetime({ offset: true })),
	profitability: z.optional(z.number()),
	cub_current: z.optional(z.number()),
	cub_expected: z.optional(z.number()),
	description: z.optional(z.string()),
	general_info: z.optional(z.array(z.string())),
	event_ensuing: z.optional(z.optional(z.object({} as { [key: string]: any }))),
	neighbor_description: z.optional(z.string()),
	pictures_neighbor: z.optional(z.array(z.string())),
	pictures_enterprise: z.optional(z.array(z.string())),
	compliant_address: z.optional(z.string()),
	sale_address: z.optional(z.string()),
	enterprise_type: z.optional(z.string()),
	description_extra: z.optional(z.string()),
	picture_extra: z.optional(z.array(z.string())),
	enterprise_name: z.optional(z.string().max(60)),
});

router.get(async (req, res) => {
	try {
		await dbConnect();

		const { id } = req.query;

		if (!isValidObjectId(id)) {
			return res.status(400).json({ error: "invalid id" });
		}

		const opportunity = await Opportunity.findById(id).lean();

		if (!opportunity) {
			return res.status(204).end("opportunity not found");
		}

		res.status(200).json({ data: opportunity });
	} catch (error: any) {
		res.status(400).json({ error: error.message });
	}
});

router.put(verifyUser, async (req, res) => {
	try {
		await dbConnect();

		const { id } = req.query;
		const opportunitiyData = req.body;

		OpportunitySchema.parse(opportunitiyData);

		if (!isValidObjectId(id)) {
			return res.status(400).json({ error: "invalid id" });
		}

		const opportunity = await Opportunity.findOneAndUpdate(
			{ _id: id },
			opportunitiyData,
			{
				new: true,
				runValidators: true,
			}
		);

		if (!opportunity) {
			return res.status(204).end();
		}

		res.status(200).json({ data: opportunity });
	} catch (error: any) {
		res.status(400).json({ error: error.message });
	}
});

router.delete(verifyUser, async (req, res) => {
	try {
		await dbConnect();

		const { id } = req.query;

		if (!isValidObjectId(id)) {
			return res.status(400).json({ error: "invalid id" });
		}

		await Opportunity.findByIdAndDelete(id);

		res.status(204).end();
	} catch (error: any) {
		res.status(400).json({ error: error.message });
	}
});

export default router;
