"use client";

/**
 * Market movers: assets with the biggest gains / losses since the last price
 */
import { useMemo, useState } from "react";

import { Card } from "../common/Card";
import { ChangeBadge } from "../common/ChangeBadge";
import { EmptyState, ErrorState } from "../common/ErrorState";
import { SegmentedControl } from "../common/SegmentedControl";
import { LoadingState, Skeleton } from "../common/Skeleton";
import { AssetAvatar } from "./AssetAvatar";
import { useAssets } from "@/hooks/useAssets";
import { getAssetChange, latestPrice } from "@/utils/portfolio";
import { formatCurrency } from "@/utils/format";

type View = "gainers" | "losers";

/** Keeps the card about as tall as the performance chart next to it */
const MAX_MOVERS = 5;

const VIEW_OPTIONS = [
	{ value: "gainers" as const, label: "Gainers" },
	{ value: "losers" as const, label: "Losers" },
];

export const MarketMovers = () => {
	const { assets, loading, error, refetch } = useAssets();
	const [view, setView] = useState<View>("gainers");

	const movers = useMemo(() => {
		const withChange = assets.map((asset) => ({
			asset,
			price: latestPrice(asset),
			...getAssetChange(asset),
		}));

		const sorted =
			view === "gainers"
				? withChange.filter((m) => m.change >= 0).sort((a, b) => b.changePercent - a.changePercent)
				: withChange.filter((m) => m.change < 0).sort((a, b) => a.changePercent - b.changePercent);

		return sorted.slice(0, MAX_MOVERS);
	}, [assets, view]);

	return (
		<Card
			id="movers"
			title="Market movers"
			description="Change since last week's close"
			actions={
				<SegmentedControl
					label="Show"
					options={VIEW_OPTIONS}
					value={view}
					onChange={setView}
				/>
			}
		>
			{loading ? (
				<LoadingState label="Loading market movers">
					<div className="flex flex-col gap-3">
						{Array.from({ length: 5 }, (_, i) => (
							<Skeleton key={i} className="h-12" />
						))}
					</div>
				</LoadingState>
			) : error ? (
				<ErrorState message="We couldn't load market data." onRetry={() => refetch()} />
			) : movers.length === 0 ? (
				<EmptyState message={`No ${view} right now.`} />
			) : (
				<ul className="-mx-2 flex flex-col">
					{movers.map(({ asset, price, changePercent }) => (
						<li
							key={asset.id}
							className="flex items-center justify-between gap-3 rounded-2xl px-2 py-2.5 hover:bg-surface-hover"
						>
							<AssetAvatar asset={asset} />
							<div className="flex shrink-0 flex-col items-end gap-1">
								<span className="text-sm font-semibold">{formatCurrency(price)}</span>
								<ChangeBadge value={changePercent} />
							</div>
						</li>
					))}
				</ul>
			)}
		</Card>
	);
};
