"use client";

/**
 * Chart component for displaying asset data
 *  - this can be used in dashboard page
 */

import { useAssets } from "@/hooks/useAssets";
import { Asset, AssetType, AssetView } from "@/types/portfolio/Asset";

import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { useEffect, useState } from "react";
import { Doughnut } from "react-chartjs-2";
import { Loading } from "./Loading";
import { COLORS } from "@/config/colors";
import { toast } from "react-toastify";

ChartJS.register(ArcElement, Tooltip, Legend);

type ChartData = {
	labels: AssetType[];
	datasets: {
		label: string;
		data: number[];
		backgroundColor: string[];
	}[];
};

const defaultData: ChartData = {
	labels: [AssetType.STOCK, AssetType.CRYPTO, AssetType.FLAT],
	datasets: [],
};

// initialise chart options
const chartOptions = {
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

export const AssetChart = () => {
	const [data, setData] = useState<ChartData>(defaultData);
	const { assets, loading, error } = useAssets();

	/**
	 * Map the assets into data format required by chartjs
	 * @param assets Asset[]
	 */
	const mapAssetsToChartData = (assets: AssetView[]) => {
		if (assets.length === 0) return;

		const typeCount: Record<AssetType, number> = {
			[AssetType.STOCK]: 0,
			[AssetType.CRYPTO]: 0,
			[AssetType.FLAT]: 0,
		};

		assets.forEach((asset) => {
			typeCount[asset.type]++;
		});

		const totalAssets = assets.length;
		const dataValues = Object.values(typeCount).map((count) => {
			const value = (count / totalAssets) * 100;
			return parseFloat(value.toFixed(2));
		});

		const backgroundColors = [
			COLORS.primary, // STOCK
			COLORS.secondary, // CRYPTO
			COLORS.accent, // FLAT
		];

		setData({
			labels: Object.keys(typeCount) as AssetType[],
			datasets: [
				{
					label: "Asset Distribution",
					data: dataValues,
					backgroundColor: backgroundColors,
				},
			],
		});
	};

	useEffect(() => {
		if (!error) return;

		// show toast for error
		toast.error(`Error fetching asset data`, {
			position: "top-right",
		});
	}, [error]);

	useEffect(() => {
		// map assets to dataset of chart
		mapAssetsToChartData(assets);
	}, [assets]);

	return (
		<div>
			<h2 className="font-bold">Portfolio Balance</h2>

			<div className="w-full md:w-[50%] mx-auto">
				{loading ? (
					<Loading />
				) : (
					<Doughnut data={data} options={chartOptions} />
				)}
			</div>
		</div>
	);
};
