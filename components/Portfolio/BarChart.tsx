import React, { useMemo } from "react";
import {
	BarChart,
	Bar,
	Cell,
	XAxis,
	YAxis,
	ResponsiveContainer,
} from "recharts";
import * as d3 from "d3";
interface IExample {
	chartData: any[];
}

const formatTokenAddress = (address: string) => {
	const firstFour = address.slice(0, 4);
	const lastFour = address.slice(-4);
	return `${firstFour}...${lastFour}`;
};

export const BarCharts: React.FC<IExample> = props => {
	const { chartData } = props;
	const getCellColor = (value: number) => {
		const colorScale = d3
			.scaleLinear<string>()
			.domain([0, d3.max(chartData, d => d.token_minted) || 0])
			.range(["#D7C7FE", "#2321C0"]);

		return colorScale(value);
	};

	const sortedChartData = useMemo(() => {
		if (Array.isArray(chartData)) {
			return [...chartData].sort((a, b) => b.token_minted - a.token_minted);
		}
		return;
	}, [chartData]);
	return (
		<ResponsiveContainer width="100%" height="100%">
			<BarChart
				width={600}
				height={300}
				data={sortedChartData}
				margin={{ top: 0, right: 50, left: 50, bottom: 154 }}
				layout="vertical"
				barSize={35}
				barGap={0}
				barCategoryGap={0}
			>
				<XAxis type="number" tick={false} hide />
				<YAxis
					strokeWidth={0}
					dataKey="token_address"
					axisLine={false}
					type="category"
					tickFormatter={formatTokenAddress}
					tick={{ textAnchor: "start" }}
					dx={-95}
				/>
				<Bar
					dataKey="token_minted"
					label={{ position: "right", formatter: (value: any) => `${value}` }}
				>
					{sortedChartData?.map((value, index) => (
						<Cell key={value.id} fill={getCellColor(value.token_minted)} />
					))}
				</Bar>
			</BarChart>
		</ResponsiveContainer>
	);
};
