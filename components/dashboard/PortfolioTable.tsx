"use client";

import { useAssets } from "@/hooks/useAssets";
import { Loading } from "./Loading";
import { AssetType, AssetView } from "@/types/portfolio/Asset";
import { AssetAvatar } from "./AssetAvatar";
import { Tag } from "../common/Tag";
import { AssetService } from "@/services/Asset.service";
import { FailedBox } from "../common/FailedBox";

/**
 * Table component - displays the company's portfolio in a tabular format
 */

export const PortfolioTable = () => {
	const { assets, loading, error } = useAssets();

	return (
		<div>
			<h2 className="font-bold mt-4 mb-8">Company&apos;s Portfolio</h2>

			<div className="w-full mx-auto overflow-y-auto">
				{loading ? (
					<Loading />
				) : (
					<PortfolioTableContent assets={assets} />
				)}
			</div>

			{error && <FailedBox message="Failed to load portfolio data" />}
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
					const { priceChange, priceChangePercent, latestPrice } =
						AssetService.calculatePriceChange(asset);

					// calculate tag color based on asset type
					let tagColor = "bg-primary text-white";
					switch (asset.type) {
						case AssetType.STOCK:
							tagColor = "bg-primary text-white";
							break;
						case AssetType.CRYPTO:
							tagColor = "bg-secondary text-gray-800";
							break;
						case AssetType.FLAT:
							tagColor = "bg-tertiary text-gray-800";
							break;
					}

					return (
						<tr key={asset.id}>
							<td className="p-2">
								<AssetAvatar asset={asset} />
							</td>
							<td className="p-2 capitalize">
								<Tag bgColor={tagColor}>{asset.type}</Tag>
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
