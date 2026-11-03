import { describe, it, expect } from "vitest";

import { AssetType } from "@/types/portfolio/Asset";
import { Portfolio } from "@/types/portfolio/Portfolio";
import {
	filterHistoryByMonths,
	getAllocation,
	getAssetChange,
	getCurrentHoldings,
	getHistoryChange,
	getPortfolioHistory,
} from "@/utils/portfolio";

const position = (
	id: string,
	type: AssetType,
	asOf: string,
	quantity: number,
	prices: number[],
) => ({
	id: `${id}-${asOf}`,
	quantity,
	price: prices[prices.length - 1],
	// dates arrive from the API as strings
	asOf: asOf as unknown as Date,
	asset: {
		id,
		name: id.toUpperCase(),
		symbol: id.toUpperCase(),
		type,
		prices: prices.map((price, i) => ({ id: `${id}-${i}`, price })),
	},
});

const portfolios: Portfolio[] = [
	{
		id: "p1",
		name: "Growth",
		asOf: new Date("2026-03-01"),
		positions: [
			position("aapl", AssetType.STOCK, "2026-01-01", 10, [100, 90]),
			position("btc", AssetType.CRYPTO, "2026-01-01", 1, [1000, 1000]),
			position("aapl", AssetType.STOCK, "2026-03-01", 10, [110, 100]),
			position("btc", AssetType.CRYPTO, "2026-03-01", 1, [900, 1000]),
			position("usd", AssetType.FIAT, "2026-03-01", 500, [1]),
		],
	},
];

describe("portfolio utils", () => {
	it("sums position values per snapshot date, oldest first", () => {
		const history = getPortfolioHistory(portfolios);

		expect(history.map((point) => point.value)).toEqual([2000, 2500]);
		expect(history[0].date.toISOString().slice(0, 10)).toBe("2026-01-01");
	});

	it("returns the latest holdings sorted by value with weights", () => {
		const holdings = getCurrentHoldings(portfolios);

		expect(holdings.map((h) => h.asset.symbol)).toEqual(["AAPL", "BTC", "USD"]);
		expect(holdings[0].value).toBe(1100);
		expect(holdings[0].changePercent).toBeCloseTo(10);
		expect(holdings[1].changePercent).toBeCloseTo(-10);
		expect(holdings.reduce((sum, h) => sum + h.weight, 0)).toBeCloseTo(100);
	});

	it("merges the same asset held in several portfolios", () => {
		const holdings = getCurrentHoldings([
			...portfolios,
			{ ...portfolios[0], id: "p2" },
		]);

		expect(holdings.find((h) => h.asset.id === "aapl")?.quantity).toBe(20);
	});

	it("groups allocation by asset class or by asset", () => {
		const holdings = getCurrentHoldings(portfolios);

		const byClass = getAllocation(holdings, "class");
		expect(byClass.map((s) => s.label)).toEqual(["Stocks", "Crypto", "Cash"]);
		expect(byClass[0].percent).toBeCloseTo(44);

		const byAsset = getAllocation(holdings, "asset");
		expect(byAsset).toHaveLength(3);
		expect(byAsset.reduce((sum, s) => sum + s.percent, 0)).toBeCloseTo(100);
	});

	it("filters history to a time range and computes the change", () => {
		const history = getPortfolioHistory(portfolios);

		const lastMonth = filterHistoryByMonths(history, 1);
		expect(lastMonth).toHaveLength(1);

		const all = filterHistoryByMonths(history, 12);
		expect(getHistoryChange(all)).toEqual({ change: 500, changePercent: 25 });
	});

	it("handles empty input and missing prices", () => {
		expect(getPortfolioHistory([])).toEqual([]);
		expect(getCurrentHoldings([])).toEqual([]);
		expect(getHistoryChange([])).toEqual({ change: 0, changePercent: 0 });
		expect(getAssetChange({ prices: [] })).toEqual({ change: 0, changePercent: 0 });
	});
});
