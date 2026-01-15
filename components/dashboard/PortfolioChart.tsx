"use client";

/**
 * Chart component for displaying portfolio price through time
 *  - this can be used in dashboard page
 */

import {
	Chart as ChartJS,
	CategoryScale,
	LinearScale,
	PointElement,
	LineElement,
	Title,
	Tooltip,
	Legend,
	Filler,
} from "chart.js";
import { Line } from "react-chartjs-2";
import { COLORS } from "@/config/colors";

ChartJS.register(
	CategoryScale,
	LinearScale,
	PointElement,
	LineElement,
	Title,
	Tooltip,
	Legend,
	Filler
);

export const PortfolioChart = () => {
	const data = {
		labels: [
			"Jan",
			"Feb",
			"Mar",
			"Apr",
			"May",
			"Jun",
			"Jul",
			"Aug",
			"Sep",
			"Oct",
			"Nov",
			"Dec",
		],
		datasets: [
			{
				label: "Portfolio Value (£)",
				data: [
					10000, 12000, 11500, 13000, 14500, 15000, 14800, 16000,
					17500, 18000, 19000, 20000,
				],
				borderColor: COLORS.primary,
				backgroundColor: `${COLORS.primary}20`, // 20 = 12.5% opacity in hex
				fill: true,
				tension: 0.4, // smooth curve
				pointRadius: 4,
				pointHoverRadius: 6,
			},
		],
	};

	const options = {
		responsive: true,
		maintainAspectRatio: true,
		plugins: {
			legend: {
				display: true,
				position: "top" as const,
			},
			tooltip: {
				mode: "index" as const,
				intersect: false,
				callbacks: {
					label: function (context: any) {
						return `£{
							context.dataset.label
						}: £${context.parsed.y.toLocaleString()}`;
					},
				},
			},
		},
		scales: {
			y: {
				beginAtZero: false,
				ticks: {
					callback: function (value: any) {
						return "$" + value.toLocaleString();
					},
				},
			},
		},
	};

	return (
		<div>
			<h2 className="font-bold mb-4">Portfolio Performance</h2>
			<Line data={data} options={options} />
		</div>
	);
};
