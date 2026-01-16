"use client";

/**
 * Chart component for displaying portfolio price through time
 *  - this can be used in dashboard page
 */

import { useEffect, useState } from "react";
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
	TooltipItem,
} from "chart.js";
import { toast } from "react-toastify";

import { Line } from "react-chartjs-2";
import { COLORS } from "@/config/colors";
import { usePortfolios } from "@/hooks/usePortfolios";
import { Portfolio } from "@/types/portfolio/Portfolio";
import { Loading } from "./Loading";
import { PriceInAsset } from "@/types/portfolio/Price";
import { PositionView } from "@/types/portfolio/Position";
import { getLastMonthsLabels } from "@/utils/date";
import { FailedBox } from "../common/FailedBox";

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

type LineChartData = {
	labels: string[];
	datasets: {
		label: string;
		data: number[];
		borderColor: string;
		backgroundColor: string;
		fill: boolean;
		tension: number;
		pointRadius: number;
		pointHoverRadius: number;
	}[];
};

const defaultData: LineChartData = {
	labels: [],
	datasets: [],
};

const lineChartOptions = {
	responsive: true,
	maintainAspectRatio: false,
	plugins: {
		legend: {
			display: true,
			position: "top" as const,
		},
		tooltip: {
			mode: "index" as const,
			intersect: false,
			callbacks: {
				label: function (context: TooltipItem<"line">) {
					return `${context.dataset.label}: ${(
						context.parsed.y ?? 0
					).toLocaleString()}`;
				},
			},
		},
	},
	scales: {
		y: {
			beginAtZero: false,
			ticks: {
				// eslint-disable-next-line @typescript-eslint/no-explicit-any
				callback: function (value: any) {
					return "£" + value.toLocaleString();
				},
			},
		},
	},
};

export const PortfolioChart = () => {
	const [data, setData] = useState<LineChartData>(defaultData);
	const { portfolios, loading, error } = usePortfolios();

	const mapPortfoliosToLineChartData = (portfolios: Portfolio[]) => {
		if (portfolios.length === 0) return;

		const dataValues: number[] = [];

		// loop through all portfolios and aggregate their monthly values
		portfolios.forEach((portfolio: Portfolio) => {
			portfolio.positions.forEach((position: PositionView) => {
				let sumPosition = 0;
				position.asset.prices.forEach((price: PriceInAsset) => {
					sumPosition += price.price * position.quantity;
				});

				// accumulate month's value using prices of assets in that month
				dataValues.push(sumPosition);
			});
		});

		const lastMonthsLabels = getLastMonthsLabels(6);

		setData({
			labels: lastMonthsLabels.reverse(),
			datasets: [
				{
					label: "Portfolio Value (£)",
					data: dataValues.reverse(), // lastest data is at the start so have to reverse
					borderColor: COLORS.primary,
					backgroundColor: `${COLORS.primary}20`, // 20 = 12.5% opacity in hex
					fill: true,
					tension: 0.4, // smooth curve
					pointRadius: 4,
					pointHoverRadius: 6,
				},
			],
		});
	};

	useEffect(() => {
		if (!error) return;

		// show toast for error
		toast.error(`Error fetching portfolio performance`, {
			position: "top-right",
		});
	}, [error]);

	useEffect(() => {
		mapPortfoliosToLineChartData(portfolios);
	}, [portfolios]);

	return (
		<div>
			<h2 className="font-bold mb-4">Portfolio Performance</h2>

			<div className="w-full mx-auto" style={{ height: "340px" }}>
				{loading ? (
					<Loading />
				) : (
					<>
						{error ? (
							<FailedBox message="Failed to load portfolio performance data." />
						) : (
							<Line data={data} options={lineChartOptions} />
						)}
					</>
				)}
			</div>
		</div>
	);
};
