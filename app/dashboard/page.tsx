"use client";

import { useAuth } from "@/components/AuthProvider";
import { AllocationChart } from "@/components/dashboard/AllocationChart";
import { HoldingsTable } from "@/components/dashboard/HoldingsTable";
import { MarketMovers } from "@/components/dashboard/MarketMovers";
import { PerformanceChart } from "@/components/dashboard/PerformanceChart";
import { StatCards } from "@/components/dashboard/StatCards";
import { usePortfolioSummary } from "@/hooks/usePortfolioSummary";
import { formatLongDate } from "@/utils/format";

export default function Dashboard() {
	const { user } = useAuth();
	const { portfolios, history, holdings, loading, error, retry } =
		usePortfolioSummary();

	const firstName = user?.fullName.split(" ")[0];
	const lastUpdated = history.at(-1)?.date;
	const retryPortfolios = () => void retry();

	return (
		<div className="mx-auto flex max-w-[1440px] flex-col gap-6 py-6 lg:py-8">
			<div className="flex flex-wrap items-end justify-between gap-4">
				<div>
					<h1 className="text-2xl font-semibold tracking-tight sm:text-3xl">
						{firstName ? `Welcome back, ${firstName}` : "Dashboard"}
					</h1>
					<p className="mt-1 text-sm text-muted-foreground">
						Here&apos;s how{" "}
						{user?.company?.name ? `${user.company.name}'s` : "your"} portfolio
						is doing.
					</p>
				</div>
				{lastUpdated && (
					<p className="inline-flex items-center gap-2 rounded-full border border-border bg-surface px-3 py-1.5 text-xs text-muted-foreground">
						<span aria-hidden="true" className="size-2 rounded-full bg-accent" />
						Updated {formatLongDate(lastUpdated)}
					</p>
				)}
			</div>

			<StatCards
				portfolios={portfolios}
				history={history}
				holdings={holdings}
				loading={loading}
			/>

			<div className="grid grid-cols-1 gap-6 xl:grid-cols-12">
				<div className="min-w-0 xl:col-span-8">
					<PerformanceChart
						history={history}
						loading={loading}
						error={error}
						onRetry={retryPortfolios}
					/>
				</div>
				<div className="min-w-0 xl:col-span-4">
					<MarketMovers />
				</div>

				<div className="min-w-0 xl:col-span-4">
					<AllocationChart
						holdings={holdings}
						loading={loading}
						error={error}
						onRetry={retryPortfolios}
					/>
				</div>
				<div className="min-w-0 xl:col-span-8">
					<HoldingsTable
						holdings={holdings}
						loading={loading}
						error={error}
						onRetry={retryPortfolios}
					/>
				</div>
			</div>
		</div>
	);
}
