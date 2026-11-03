/**
 * Mock market data shared by the API routes.
 *
 * Prices are generated deterministically (no Math.random) so the dashboard
 * looks the same on every load and the server/client never disagree.
 * One snapshot is produced per week for the last year.
 */
import { AssetType, AssetView } from "@/types/portfolio/Asset";
import { Portfolio } from "@/types/portfolio/Portfolio";
import { PositionView } from "@/types/portfolio/Position";

type AssetSeed = {
	id: string;
	name: string;
	symbol: string;
	type: AssetType;
	/** Price one year ago (USD) */
	start: number;
	/** Total drift over the year, e.g. 0.4 = +40% */
	drift: number;
	/** Size of the wave added on top of the drift */
	volatility: number;
	/** Shifts the wave so assets don't move in lockstep */
	phase: number;
	/** Units held in the portfolio (0 = tracked in markets only) */
	quantity: number;
	/** Average purchase price */
	cost: number;
};

const SEEDS: AssetSeed[] = [
	{ id: "aapl", name: "Apple Inc.", symbol: "AAPL", type: AssetType.STOCK, start: 172, drift: 0.24, volatility: 0.05, phase: 0.4, quantity: 120, cost: 168 },
	{ id: "tsla", name: "Tesla Inc.", symbol: "TSLA", type: AssetType.STOCK, start: 248, drift: -0.08, volatility: 0.12, phase: 2.1, quantity: 45, cost: 231 },
	{ id: "nvda", name: "NVIDIA Corp.", symbol: "NVDA", type: AssetType.STOCK, start: 92, drift: 0.62, volatility: 0.09, phase: 1.3, quantity: 80, cost: 101 },
	{ id: "msft", name: "Microsoft Corp.", symbol: "MSFT", type: AssetType.STOCK, start: 402, drift: 0.11, volatility: 0.04, phase: 3.2, quantity: 0, cost: 0 },
	{ id: "btc", name: "Bitcoin", symbol: "BTC", type: AssetType.CRYPTO, start: 58400, drift: 0.41, volatility: 0.14, phase: 0.9, quantity: 0.42, cost: 51200 },
	{ id: "eth", name: "Ethereum", symbol: "ETH", type: AssetType.CRYPTO, start: 3120, drift: -0.12, volatility: 0.16, phase: 2.6, quantity: 6.5, cost: 2650 },
	{ id: "sol", name: "Solana", symbol: "SOL", type: AssetType.CRYPTO, start: 138, drift: 0.18, volatility: 0.2, phase: 4.1, quantity: 0, cost: 0 },
	{ id: "usd", name: "US Dollar", symbol: "USD", type: AssetType.FIAT, start: 1, drift: 0, volatility: 0, phase: 0, quantity: 18500, cost: 1 },
	{ id: "gbp", name: "British Pound", symbol: "GBP", type: AssetType.FIAT, start: 1.27, drift: -0.015, volatility: 0.01, phase: 1.7, quantity: 0, cost: 0 },
];

export const WEEKS = 52;
const WEEK_MS = 7 * 24 * 60 * 60 * 1000;

const round = (value: number) =>
	value >= 1000 ? Math.round(value) : Math.round(value * 100) / 100;

/** Price of an asset `week` weeks into the year (0 = a year ago, WEEKS = now) */
const priceAt = (seed: AssetSeed, week: number) => {
	const t = week / WEEKS;
	const trend = 1 + seed.drift * t;
	const wave =
		seed.volatility *
		(Math.sin(week * 0.45 + seed.phase) * 0.6 +
			Math.sin(week * 0.13 + seed.phase * 2) * 0.4);
	return round(seed.start * (trend + wave));
};

/** Snapshot dates, oldest first, ending today (time stripped) */
const snapshotDates = (now = new Date()) => {
	const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
	return Array.from(
		{ length: WEEKS + 1 },
		(_, i) => new Date(today.getTime() - (WEEKS - i) * WEEK_MS),
	);
};

/** Assets with their latest and previous weekly price (latest first) */
export const getAssets = (): AssetView[] =>
	SEEDS.map((seed) => ({
		id: seed.id,
		name: seed.name,
		symbol: seed.symbol,
		type: seed.type,
		prices: [
			{ id: `${seed.id}-${WEEKS}`, price: priceAt(seed, WEEKS) },
			{ id: `${seed.id}-${WEEKS - 1}`, price: priceAt(seed, WEEKS - 1) },
		],
	}));

/**
 * A single portfolio holding one position per held asset per week.
 * Each position carries the asset's price on that date (latest first) so
 * the client can compute value history and week-on-week change.
 */
export const getPortfolios = (now = new Date()): Portfolio[] => {
	const dates = snapshotDates(now);
	const held = SEEDS.filter((seed) => seed.quantity > 0);

	const positions: PositionView[] = dates.flatMap((asOf, week) =>
		held.map((seed) => ({
			id: `${seed.id}-${week}`,
			quantity: seed.quantity,
			price: seed.cost,
			asOf,
			asset: {
				id: seed.id,
				name: seed.name,
				symbol: seed.symbol,
				type: seed.type,
				prices: [
					{ id: `${seed.id}-${week}`, price: priceAt(seed, week) },
					{
						id: `${seed.id}-${Math.max(week - 1, 0)}`,
						price: priceAt(seed, Math.max(week - 1, 0)),
					},
				],
			},
		})),
	);

	return [
		{
			id: "6a9775d1-950c-42c1-bf04-0ad6bd712345",
			name: "Growth Fund",
			asOf: dates[dates.length - 1],
			positions,
		},
	];
};
