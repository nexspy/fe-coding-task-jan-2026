"use client";

/**
 * Portfolio performance line chart with selectable time range
 */
import { useMemo, useState } from "react";
import {
	CategoryScale,
	Chart as ChartJS,
	ChartData,
	ChartOptions,
	Filler,
	LinearScale,
	LineElement,
	PointElement,
	ScriptableContext,
	Tooltip,
} from "chart.js";
import { Line } from "react-chartjs-2";

import { Card } from "../common/Card";
import { ChangeBadge } from "../common/ChangeBadge";
import { ErrorState, EmptyState } from "../common/ErrorState";
import { SegmentedControl, SegmentedOption } from "../common/SegmentedControl";
import { LoadingState, Skeleton } from "../common/Skeleton";
import { useThemeTokens } from "@/hooks/useThemeTokens";
import {
	filterHistoryByMonths,
	getHistoryChange,
	HistoryPoint,
} from "@/utils/portfolio";
import {
	formatCompactCurrency,
	formatCurrency,
	formatLongDate,
	formatShortDate,
	formatSignedCurrency,
} from "@/utils/format";

ChartJS.register(
	CategoryScale,
	LinearScale,
	PointElement,
	LineElement,
	Filler,
	Tooltip,
);

export type Range = "1M" | "3M" | "6M" | "1Y";

const RANGE_MONTHS: Record<Range, number> = { "1M": 1, "3M": 3, "6M": 6, "1Y": 12 };

const RANGE_OPTIONS: SegmentedOption<Range>[] = (
	Object.keys(RANGE_MONTHS) as Range[]
).map((range) => ({ value: range, label: range }));

/** Mixes a hex colour with transparency for the gradient fill */
const withAlpha = (hex: string, alpha: number) => {
	const match = /^#([0-9a-f]{6})$/i.exec(hex);
	if (!match) return hex;
	const int = parseInt(match[1], 16);
	return `rgba(${(int >> 16) & 255}, ${(int >> 8) & 255}, ${int & 255}, ${alpha})`;
};

interface Props {
	history: HistoryPoint[];
	loading: boolean;
	error: Error | null;
	onRetry: () => void;
}

export const PerformanceChart = ({ history, loading, error, onRetry }: Props) => {
	const [range, setRange] = useState<Range>("6M");
	const tokens = useThemeTokens();

	const points = useMemo(
		() => filterHistoryByMonths(history, RANGE_MONTHS[range]),
		[history, range],
	);
	const { change, changePercent } = getHistoryChange(points);
	const latest = points.at(-1);

	const data: ChartData<"line"> = useMemo(
		() => ({
			labels: points.map((point) => formatShortDate(point.date)),
			datasets: [
				{
					label: "Portfolio value",
					data: points.map((point) => point.value),
					borderColor: tokens.accent,
					borderWidth: 2,
					tension: 0.35,
					pointRadius: 0,
					pointHoverRadius: 5,
					pointHoverBackgroundColor: tokens.accent,
					pointHoverBorderColor: tokens.surface,
					pointHoverBorderWidth: 2,
					fill: true,
					backgroundColor: (context: ScriptableContext<"line">) => {
						const { ctx, chartArea } = context.chart;
						if (!chartArea) return withAlpha(tokens.accent, 0.1);
						const gradient = ctx.createLinearGradient(0, chartArea.top, 0, chartArea.bottom);
						gradient.addColorStop(0, withAlpha(tokens.accent, 0.28));
						gradient.addColorStop(1, withAlpha(tokens.accent, 0));
						return gradient;
					},
				},
			],
		}),
		[points, tokens],
	);

	const options: ChartOptions<"line"> = useMemo(
		() => ({
			responsive: true,
			maintainAspectRatio: false,
			interaction: { mode: "index", intersect: false },
			plugins: {
				legend: { display: false },
				tooltip: {
					backgroundColor: tokens.foreground,
					titleColor: tokens.surface,
					bodyColor: tokens.surface,
					padding: 10,
					cornerRadius: 12,
					titleFont: { family: tokens.fontFamily },
					bodyFont: { family: tokens.fontFamily, weight: 600 },
					displayColors: false,
					callbacks: {
						label: (context) => formatCurrency(context.parsed.y ?? 0),
					},
				},
			},
			scales: {
				x: {
					grid: { display: false },
					border: { display: false },
					ticks: {
						color: tokens.muted,
						font: { family: tokens.fontFamily },
						maxTicksLimit: 6,
						maxRotation: 0,
					},
				},
				y: {
					position: "right",
					grid: { color: tokens.grid },
					border: { display: false },
					ticks: {
						color: tokens.muted,
						font: { family: tokens.fontFamily },
						maxTicksLimit: 5,
						callback: (value) => formatCompactCurrency(Number(value)),
					},
				},
			},
		}),
		[tokens],
	);

	const summary =
		latest &&
		`Portfolio value ${range === "1Y" ? "over the last year" : `over the last ${RANGE_MONTHS[range]} month${RANGE_MONTHS[range] > 1 ? "s" : ""}`}: from ${formatCurrency(points[0].value)} to ${formatCurrency(latest.value)}, a change of ${changePercent.toFixed(2)}%.`;

	return (
		<Card
			id="performance"
			title="Portfolio performance"
			description="Total value of all positions over time"
			actions={
				<SegmentedControl
					label="Time range"
					options={RANGE_OPTIONS}
					value={range}
					onChange={setRange}
				/>
			}
		>
			{loading ? (
				<LoadingState label="Loading portfolio performance">
					<Skeleton className="mb-4 h-14 w-56" />
					<Skeleton className="h-72 flex-1" />
				</LoadingState>
			) : error ? (
				<ErrorState message="We couldn't load your portfolio performance." onRetry={onRetry} />
			) : !latest ? (
				<EmptyState message="No portfolio history yet." />
			) : (
				<>
					<div className="mb-4 flex flex-wrap items-baseline gap-x-3 gap-y-1">
						<p className="text-3xl font-semibold tracking-tight">
							{formatCurrency(latest.value)}
						</p>
						<ChangeBadge value={changePercent} />
						<p className="text-sm text-muted-foreground">
							{formatSignedCurrency(change)} since {formatLongDate(points[0].date)}
						</p>
					</div>
					<div className="relative h-72 min-h-0 flex-1">
						<Line data={data} options={options} role="img" aria-label={summary} />
					</div>
				</>
			)}
		</Card>
	);
};
