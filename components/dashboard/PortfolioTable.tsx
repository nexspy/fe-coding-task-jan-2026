"use client";

import { useAssets } from "@/hooks/useAssets";
import { Loading } from "./Loading";
import { Asset, AssetView } from "@/types/portfolio/Asset";
import { AssetAvatar } from "./AssetAvatar";
import { Tag } from "../common/Tag";

/**
 * Table component - displays the company's portfolio in a tabular format
 */

export const PortfolioTable = () => {
	const { assets, loading } = useAssets();

	return (
		<div>
			<h2 className="font-bold mt-4 mb-8">Company's Portfolio</h2>

			<div className="w-full mx-auto overflow-y-auto">
				{loading ? (
					<Loading />
				) : (
					<PortfolioTableContent assets={assets} />
				)}
			</div>
		</div>
	);
};

interface Props {
	assets: AssetView[];
}

const PortfolioTableContent = ({ assets }: Props) => {
	return (
		<table className="w-full border-separate border-spacing-y-4">
			<thead>
				<tr>
					<th className="text-left p-2">Asset</th>
					<th className="text-left p-2">Type</th>
					<th className="text-right p-2">Current Price</th>
					<th className="text-right p-2">Price Change</th>
				</tr>
			</thead>
			<tbody>
				{assets.map((asset) => {
					console.log("asset", asset);

					const latestPrice = asset.prices?.[0]?.price || 0;
					const previousPrice =
						asset.prices?.[1]?.price || latestPrice;
					const priceChange = latestPrice - previousPrice;
					const priceChangePercent =
						previousPrice > 0
							? ((priceChange / previousPrice) * 100).toFixed(2)
							: "0.00";

					return (
						<tr key={asset.id}>
							<td className="p-2">
								<AssetAvatar asset={asset} />
							</td>
							<td className="p-2 capitalize">
								<Tag>{asset.type}</Tag>
							</td>
							<td className="p-2 text-right">
								£{latestPrice.toLocaleString()}
							</td>
							<td
								className={`p-2 text-right ${
									priceChange >= 0
										? "text-green-600"
										: "text-red-600"
								}`}
							>
								{priceChange >= 0 ? "+" : ""}
								{priceChangePercent}%
							</td>
						</tr>
					);
				})}
			</tbody>
		</table>
	);
};
