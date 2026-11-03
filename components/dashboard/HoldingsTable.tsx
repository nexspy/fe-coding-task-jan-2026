"use client";

/**
 * Positions table: the same holdings as the allocation chart, in detail
 */
import { Card } from "../common/Card";
import { ChangeBadge } from "../common/ChangeBadge";
import { EmptyState, ErrorState } from "../common/ErrorState";
import { LoadingState, Skeleton } from "../common/Skeleton";
import { Tag } from "../common/Tag";
import { AssetAvatar } from "./AssetAvatar";
import { AssetType } from "@/types/portfolio/Asset";
import { assetClassLabel, Holding } from "@/utils/portfolio";
import { formatCurrency, formatQuantity } from "@/utils/format";

const TAG_STYLES: Record<AssetType, string> = {
	[AssetType.STOCK]: "bg-accent-soft text-foreground",
	[AssetType.CRYPTO]: "bg-surface-raised text-foreground border border-border",
	[AssetType.FIAT]: "bg-surface-raised text-muted-foreground",
};

const th = "px-3 py-3 text-xs font-medium text-muted-foreground whitespace-nowrap";
const td = "px-3 py-3.5 whitespace-nowrap";

interface Props {
	holdings: Holding[];
	loading: boolean;
	error: Error | null;
	onRetry: () => void;
}

export const HoldingsTable = ({ holdings, loading, error, onRetry }: Props) => {
	const total = holdings.reduce((sum, holding) => sum + holding.value, 0);

	return (
		<Card
			id="holdings"
			title="Holdings"
			description={
				holdings.length > 0
					? `${holdings.length} positions · ${formatCurrency(total)}`
					: "Your current positions"
			}
		>
			{loading ? (
				<LoadingState label="Loading holdings">
					<div className="flex flex-col gap-3">
						{Array.from({ length: 5 }, (_, i) => (
							<Skeleton key={i} className="h-12" />
						))}
					</div>
				</LoadingState>
			) : error ? (
				<ErrorState message="We couldn't load your holdings." onRetry={onRetry} />
			) : holdings.length === 0 ? (
				<EmptyState message="You don't hold any positions yet." />
			) : (
				// Scrolls horizontally on narrow screens; focusable so keyboard users can scroll it.
				// `relative` keeps sr-only (absolutely positioned) text inside the scroll area.
				<div
					role="region"
					aria-label="Holdings table"
					tabIndex={0}
					className="relative -mx-5 overflow-x-auto px-2 sm:-mx-6 sm:px-3"
				>
					<table className="w-full min-w-[720px] text-sm">
						<caption className="sr-only">
							Current holdings with quantity, price, value, weekly change and portfolio weight
						</caption>
						<thead>
							<tr className="border-b border-border text-left">
								<th scope="col" className={th}>Asset</th>
								<th scope="col" className={th}>Class</th>
								<th scope="col" className={`${th} text-right`}>Quantity</th>
								<th scope="col" className={`${th} text-right`}>Price</th>
								<th scope="col" className={`${th} text-right`}>Value</th>
								<th scope="col" className={`${th} text-right`}>1W change</th>
								<th scope="col" className={`${th} w-40`}>Weight</th>
							</tr>
						</thead>
						<tbody>
							{holdings.map((holding) => (
								<tr
									key={holding.asset.id}
									className="border-b border-border last:border-0 hover:bg-surface-hover"
								>
									<th scope="row" className={`${td} text-left font-normal`}>
										<AssetAvatar asset={holding.asset} />
									</th>
									<td className={td}>
										<Tag className={TAG_STYLES[holding.asset.type]}>
											{assetClassLabel(holding.asset.type)}
										</Tag>
									</td>
									<td className={`${td} text-right`}>{formatQuantity(holding.quantity)}</td>
									<td className={`${td} text-right`}>{formatCurrency(holding.price)}</td>
									<td className={`${td} text-right font-semibold`}>
										{formatCurrency(holding.value)}
									</td>
									<td className={`${td} text-right`}>
										<ChangeBadge value={holding.changePercent} />
									</td>
									<td className={td}>
										<div className="flex items-center gap-2">
											<div
												aria-hidden="true"
												className="h-1.5 flex-1 overflow-hidden rounded-full bg-surface-raised"
											>
												<div
													className="h-full rounded-full bg-accent"
													style={{ width: `${holding.weight}%` }}
												/>
											</div>
											<span className="w-12 text-right text-xs text-muted-foreground">
												{holding.weight.toFixed(1)}%
											</span>
										</div>
									</td>
								</tr>
							))}
						</tbody>
					</table>
				</div>
			)}
		</Card>
	);
};
