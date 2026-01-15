"use client";

/**
 * Chart component for displaying asset data
 *  - this can be used in dashboard page
 */

import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Doughnut } from "react-chartjs-2";

ChartJS.register(ArcElement, Tooltip, Legend);

export const AssetChart = () => {
	const data = {
		labels: ["Stocks", "Crypto", "Flat"],
		datasets: [
			{
				label: "Assets",
				data: [35, 25, 20],
				backgroundColor: ["#B26C2D", "#D0B162", "#CCCCCC"],
			},
		],
	};

	const options = {
		responsive: true,
		maintainAspectRatio: true,
		plugins: {
			legend: {
				position: "bottom" as const,
			},
			tooltip: {
				callbacks: {
					label: function (context: any) {
						const label = context.label || "";
						const value = context.parsed || 0;
						return `${label}: ${value}%`;
					},
				},
			},
		},
	};

	return (
		<div>
			<h2>Donut chart</h2>

			<div className="w-[50%] mx-auto">
				<Doughnut data={data} options={options} />
			</div>
		</div>
	);
};
