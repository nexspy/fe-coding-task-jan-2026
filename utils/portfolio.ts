/**
 * Pure functions that turn API data into what the dashboard displays.
 * Keeping them free of React makes them easy to unit test.
 */
import { AssetType, AssetView } from "@/types/portfolio/Asset";
import { Portfolio } from "@/types/portfolio/Portfolio";
import { PositionView } from "@/types/portfolio/Position";

export type HistoryPoint = {
	date: Date;
	value: number;
};

export type Change = {
	change: number;
	changePercent: number;
};

export type Holding = Change & {
	asset: Omit<AssetView, "prices">;
	quantity: number;
	price: number;
	value: number;
	costBasis: number;
	/** Share of total portfolio value, 0-100 */
	weight: number;
};

export type AllocationMode = "class" | "asset";

export type AllocationSlice = {
	label: string;
	value: number;
	/** 0-100 */
	percent: number;
};

/** The most recent price of an asset (the API returns prices latest first) */
export const latestPrice = (asset: Pick<AssetView, "prices">) =>
	asset.prices[0]?.price ?? 0;

/** The price before the latest one, falling back to the latest */
export const previousPrice = (asset: Pick<AssetView, "prices">) =>
	asset.prices[1]?.price ?? latestPrice(asset);

export const getChange = (current: number, previous: number): Change => {
	const change = current - previous;
	const changePercent = previous !== 0 ? (change / previous) * 100 : 0;
	return { change, changePercent };
};

export const getAssetChange = (asset: Pick<AssetView, "prices">) =>
	getChange(latestPrice(asset), previousPrice(asset));

export const positionValue = (position: PositionView) =>
	position.quantity * latestPrice(position.asset);

/** Calendar-day key so snapshots taken on the same day are grouped */
const dayKey = (date: Date) => date.toISOString().slice(0, 10);

const allPositions = (portfolios: Portfolio[]) =>
	portfolios.flatMap((portfolio) => portfolio.positions);

/**
 * Total value of all portfolios on each snapshot date, oldest first.
 * `asOf` arrives from JSON as a string, so it is normalised to a Date.
 */
export const getPortfolioHistory = (portfolios: Portfolio[]): HistoryPoint[] => {
	const totals = new Map<string, HistoryPoint>();

	for (const position of allPositions(portfolios)) {
		const date = new Date(position.asOf);
		const key = dayKey(date);
		const point = totals.get(key) ?? { date, value: 0 };
		point.value += positionValue(position);
		totals.set(key, point);
	}

	return [...totals.values()].sort(
		(a, b) => a.date.getTime() - b.date.getTime(),
	);
};

/** Price history of one asset across the portfolio snapshots, oldest first */
export const getAssetHistory = (
	portfolios: Portfolio[],
	assetId: string,
): HistoryPoint[] => {
	const points = new Map<string, HistoryPoint>();

	for (const position of allPositions(portfolios)) {
		if (position.asset.id !== assetId) continue;
		const date = new Date(position.asOf);
		points.set(dayKey(date), { date, value: latestPrice(position.asset) });
	}

	return [...points.values()].sort(
		(a, b) => a.date.getTime() - b.date.getTime(),
	);
};

/** Keep only the points within the last `months` months of the newest point */
export const filterHistoryByMonths = (
	history: HistoryPoint[],
	months: number,
): HistoryPoint[] => {
	if (history.length === 0) return history;

	const newest = history[history.length - 1].date;
	const cutoff = new Date(newest);
	cutoff.setMonth(cutoff.getMonth() - months);

	return history.filter((point) => point.date >= cutoff);
};

/** Change between the first and last point of a series */
export const getHistoryChange = (history: HistoryPoint[]): Change => {
	if (history.length < 2) return { change: 0, changePercent: 0 };
	return getChange(history[history.length - 1].value, history[0].value);
};

/**
 * Positions on the most recent snapshot date, merged by asset across
 * portfolios and sorted by value (largest first).
 */
export const getCurrentHoldings = (portfolios: Portfolio[]): Holding[] => {
	const positions = allPositions(portfolios);
	if (positions.length === 0) return [];

	const latestKey = positions
		.map((position) => dayKey(new Date(position.asOf)))
		.sort()
		.at(-1);

	const byAsset = new Map<string, Omit<Holding, "weight">>();

	for (const position of positions) {
		if (dayKey(new Date(position.asOf)) !== latestKey) continue;

		const { prices, ...asset } = position.asset;
		const price = latestPrice(position.asset);
		const existing = byAsset.get(asset.id);
		const quantity = (existing?.quantity ?? 0) + position.quantity;

		byAsset.set(asset.id, {
			asset,
			quantity,
			price,
			value: quantity * price,
			costBasis:
				(existing?.costBasis ?? 0) + position.quantity * position.price,
			...getChange(price, previousPrice({ prices })),
		});
	}

	const holdings = [...byAsset.values()];
	const total = holdings.reduce((sum, holding) => sum + holding.value, 0);

	return holdings
		.map((holding) => ({
			...holding,
			weight: total > 0 ? (holding.value / total) * 100 : 0,
		}))
		.sort((a, b) => b.value - a.value);
};

const ASSET_CLASS_LABELS: Record<AssetType, string> = {
	[AssetType.STOCK]: "Stocks",
	[AssetType.CRYPTO]: "Crypto",
	[AssetType.FIAT]: "Cash",
};

export const assetClassLabel = (type: AssetType) => ASSET_CLASS_LABELS[type];

/** Portfolio balance split by asset class or by individual asset (by value) */
export const getAllocation = (
	holdings: Holding[],
	mode: AllocationMode,
): AllocationSlice[] => {
	const totals = new Map<string, number>();

	for (const holding of holdings) {
		const label =
			mode === "class"
				? assetClassLabel(holding.asset.type)
				: holding.asset.symbol;
		totals.set(label, (totals.get(label) ?? 0) + holding.value);
	}

	const total = holdings.reduce((sum, holding) => sum + holding.value, 0);

	return [...totals.entries()]
		.map(([label, value]) => ({
			label,
			value,
			percent: total > 0 ? (value / total) * 100 : 0,
		}))
		.sort((a, b) => b.value - a.value);
};
