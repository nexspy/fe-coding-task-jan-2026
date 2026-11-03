"use client";

/**
 * Portfolio balance donut chart
 *  - switch between allocation by asset class and by individual asset
 *  - the legend doubles as a data table so values never rely on colour alone
 */
import { useMemo, useState } from "react";
import { ArcElement, Chart as ChartJS, ChartData, ChartOptions, Tooltip } from "chart.js";
import { Doughnut } from "react-chartjs-2";

import { Card } from "../common/Card";
import { EmptyState, ErrorState } from "../common/ErrorState";
import { SegmentedControl } from "../common/SegmentedControl";
import { LoadingState, Skeleton } from "../common/Skeleton";
import { useThemeTokens } from "@/hooks/useThemeTokens";
import { AllocationMode, getAllocation, Holding } from "@/utils/portfolio";
import { formatCompactCurrency, formatCurrency } from "@/utils/format";

ChartJS.register(ArcElement, Tooltip);

const MODE_OPTIONS = [
	{ value: "class" as const, label: "By class" },
	{ value: "asset" as const, label: "By asset" },
];

interface Props {
	holdings: Holding[];
	loading: boolean;
	error: Error | null;
	onRetry: () => void;
}

export const AllocationChart = ({ holdings, loading, error, onRetry }: Props) => {
	const [mode, setMode] = useState<AllocationMode>("class");
	const tokens = useThemeTokens();

	const slices = useMemo(() => getAllocation(holdings, mode), [holdings, mode]);
	const total = slices.reduce((sum, slice) => sum + slice.value, 0);
	const colorAt = (i: number) => tokens.chart[i % tokens.chart.length];

	const data: ChartData<"doughnut"> = {
		labels: slices.map((slice) => slice.label),
		datasets: [
			{
				data: slices.map((slice) => slice.value),
				backgroundColor: slices.map((_, i) => colorAt(i)),
				borderColor: tokens.surface,
				borderWidth: 3,
				borderRadius: 6,
				hoverOffset: 6,
			},
		],
	};

	const options: ChartOptions<"doughnut"> = {
		responsive: true,
		maintainAspectRatio: true,
		cutout: "72%",
		plugins: {
			legend: { display: false },
			tooltip: {
				backgroundColor: tokens.foreground,
				titleColor: tokens.surface,
				bodyColor: tokens.surface,
				cornerRadius: 12,
				padding: 10,
				titleFont: { family: tokens.fontFamily },
				bodyFont: { family: tokens.fontFamily },
				callbacks: {
					label: (context) => {
						const slice = slices[context.dataIndex];
						return `${formatCurrency(slice.value)} (${slice.percent.toFixed(1)}%)`;
					},
				},
			},
		},
	};

	const summary = `Portfolio allocation ${mode === "class" ? "by asset class" : "by asset"}: ${slices
		.map((slice) => `${slice.label} ${slice.percent.toFixed(1)}%`)
		.join(", ")}.`;

	return (
		<Card
			id="allocation"
			title="Portfolio balance"
			description="How your money is split"
			actions={
				<SegmentedControl
					label="Group allocation"
					options={MODE_OPTIONS}
					value={mode}
					onChange={setMode}
				/>
			}
		>
			{loading ? (
				<LoadingState label="Loading allocation">
					<Skeleton className="mx-auto aspect-square w-48 rounded-full" />
				</LoadingState>
			) : error ? (
				<ErrorState message="We couldn't load your allocation." onRetry={onRetry} />
			) : slices.length === 0 ? (
				<EmptyState message="You don't hold any assets yet." />
			) : (
				<div className="flex flex-col gap-6">
					<div className="relative mx-auto w-full max-w-56">
						<Doughnut data={data} options={options} role="img" aria-label={summary} />
						<div
							aria-hidden="true"
							className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center"
						>
							<span className="text-xs text-muted-foreground">Total</span>
							<span className="text-xl font-semibold">{formatCompactCurrency(total)}</span>
						</div>
					</div>

					<ul className="flex flex-col gap-2.5">
						{slices.map((slice, i) => (
							<li key={slice.label} className="flex items-center gap-3 text-sm">
								<span
									aria-hidden="true"
									className="size-3 shrink-0 rounded-full"
									style={{ backgroundColor: colorAt(i) }}
								/>
								<span className="flex-1 truncate">{slice.label}</span>
								<span className="text-muted-foreground">{formatCurrency(slice.value)}</span>
								<span className="w-14 text-right font-semibold">
									{slice.percent.toFixed(1)}%
								</span>
							</li>
						))}
					</ul>
				</div>
			)}
		</Card>
	);
};
