"use client";

import { ReactNode, useMemo } from "react";

import { ChangeBadge } from "../common/ChangeBadge";
import { Skeleton } from "../common/Skeleton";
import { Sparkline } from "../common/Sparkline";
import { Portfolio } from "@/types/portfolio/Portfolio";
import { AssetType } from "@/types/portfolio/Asset";
import {
	filterHistoryByMonths,
	getAssetHistory,
	getChange,
	getHistoryChange,
	Holding,
	HistoryPoint,
} from "@/utils/portfolio";
import { formatCurrency, formatSignedCurrency } from "@/utils/format";

/**
 * KPI cards at the top of the dashboard
 */

interface StatCardProps {
	label: string;
	value: string;
	change?: number;
	hint: ReactNode;
	trend?: number[];
	highlight?: boolean;
}

const StatCard = ({ label, value, change, hint, trend, highlight }: StatCardProps) => {
	const trendColor =
		change !== undefined && change < 0 ? "var(--negative)" : "var(--positive)";

	return (
		<article
			className={`flex flex-col gap-3 rounded-3xl border p-5 shadow-card ${
				highlight
					? "border-transparent bg-accent text-accent-foreground"
					: "border-border bg-surface"
			}`}
		>
			<h3
				className={`text-sm font-medium ${
					highlight ? "text-accent-foreground/75" : "text-muted-foreground"
				}`}
			>
				{label}
			</h3>
			<div className="flex items-end justify-between gap-3">
				<p className="text-2xl font-semibold tracking-tight">{value}</p>
				{trend && (
					<Sparkline
						values={trend}
						color={highlight ? "var(--accent-foreground)" : trendColor}
						className="h-10 w-24 shrink-0"
					/>
				)}
			</div>
			<div
				className={`flex flex-wrap items-center gap-2 text-xs ${
					highlight ? "text-accent-foreground/75" : "text-muted-foreground"
				}`}
			>
				{change !== undefined && (
					<ChangeBadge value={change} variant={highlight ? "inverse" : "pill"} />
				)}
				<span>{hint}</span>
			</div>
		</article>
	);
};

const values = (history: HistoryPoint[]) => history.map((point) => point.value);

interface Props {
	portfolios: Portfolio[];
	history: HistoryPoint[];
	holdings: Holding[];
	loading: boolean;
}

export const StatCards = ({ portfolios, history, holdings, loading }: Props) => {
	const stats = useMemo(() => {
		if (history.length === 0) return null;

		const current = history[history.length - 1].value;
		const previous = history[history.length - 2]?.value ?? current;
		const weekly = getChange(current, previous);

		const yearHistory = filterHistoryByMonths(history, 12);
		const yearly = getHistoryChange(yearHistory);

		const invested = holdings.filter((h) => h.asset.type !== AssetType.FIAT);
		const best = [...invested].sort((a, b) => b.changePercent - a.changePercent)[0];
		const cash = holdings
			.filter((h) => h.asset.type === AssetType.FIAT)
			.reduce((sum, h) => sum + h.value, 0);

		return {
			current,
			weekly,
			yearly,
			yearHistory,
			best,
			bestHistory: best
				? filterHistoryByMonths(getAssetHistory(portfolios, best.asset.id), 3)
				: [],
			cash,
			cashWeight: current > 0 ? (cash / current) * 100 : 0,
		};
	}, [portfolios, history, holdings]);

	if (loading) {
		return (
			<div role="status" aria-busy="true" className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
				<span className="sr-only">Loading portfolio summary</span>
				{Array.from({ length: 4 }, (_, i) => (
					<Skeleton key={i} className="h-36 rounded-3xl" />
				))}
			</div>
		);
	}

	// errors are reported by the cards below, which offer a retry
	if (!stats) return null;

	return (
		<div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
			<StatCard
				highlight
				label="Portfolio value"
				value={formatCurrency(stats.current)}
				change={stats.weekly.changePercent}
				hint="vs last week"
				trend={values(filterHistoryByMonths(history, 3))}
			/>
			<StatCard
				label="Total return (1Y)"
				value={formatSignedCurrency(stats.yearly.change)}
				change={stats.yearly.changePercent}
				hint="over 12 months"
				trend={values(stats.yearHistory)}
			/>
			{stats.best && (
				<StatCard
					label="Top performer this week"
					value={stats.best.asset.symbol}
					change={stats.best.changePercent}
					hint={`${formatCurrency(stats.best.price)} · ${stats.best.asset.name}`}
					trend={values(stats.bestHistory)}
				/>
			)}
			<StatCard
				label="Cash balance"
				value={formatCurrency(stats.cash)}
				hint={`${stats.cashWeight.toFixed(1)}% of portfolio · available to invest`}
			/>
		</div>
	);
};
