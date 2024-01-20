export interface ITimelineSteps {
	titleWidth?: string;
	data?: {
		year: number;
		data: Array<{
			quarter: string;
			info: Array<{ name_en?: string; name_pt?: string; status: string }>;
		}>;
	};
}
