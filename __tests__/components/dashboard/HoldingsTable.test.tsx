import { describe, it, expect, vi, afterEach } from "vitest";
import { cleanup, render, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import "@testing-library/jest-dom/vitest";

import { HoldingsTable } from "@/components/dashboard/HoldingsTable";
import { AssetType } from "@/types/portfolio/Asset";
import { Holding } from "@/utils/portfolio";

const holdings: Holding[] = [
	{
		asset: { id: "btc", name: "Bitcoin", symbol: "BTC", type: AssetType.CRYPTO },
		quantity: 0.5,
		price: 60000,
		value: 30000,
		costBasis: 25000,
		change: 1200,
		changePercent: 2.04,
		weight: 75,
	},
	{
		asset: { id: "aapl", name: "Apple Inc.", symbol: "AAPL", type: AssetType.STOCK },
		quantity: 50,
		price: 200,
		value: 10000,
		costBasis: 9000,
		change: -4,
		changePercent: -1.96,
		weight: 25,
	},
];

describe("HoldingsTable", () => {
	afterEach(cleanup);

	it("renders a row per holding with value and change", () => {
		render(<HoldingsTable holdings={holdings} loading={false} error={null} onRetry={() => {}} />);

		const rows = screen.getAllByRole("row");
		expect(rows).toHaveLength(3); // header + 2 holdings

		const btcRow = within(rows[1]);
		expect(btcRow.getByText("BTC")).toBeInTheDocument();
		expect(btcRow.getByText("Crypto")).toBeInTheDocument();
		expect(btcRow.getByText("$30,000.00")).toBeInTheDocument();
		expect(btcRow.getByText("+2.04%")).toBeInTheDocument();

		expect(within(rows[2]).getByText("-1.96%")).toBeInTheDocument();
		expect(screen.getByText("2 positions · $40,000.00")).toBeInTheDocument();
	});

	it("shows a loading state", () => {
		render(<HoldingsTable holdings={[]} loading error={null} onRetry={() => {}} />);

		expect(screen.getByRole("status")).toHaveTextContent("Loading holdings");
	});

	it("shows an error with a working retry button", async () => {
		const onRetry = vi.fn();
		render(
			<HoldingsTable holdings={[]} loading={false} error={new Error("boom")} onRetry={onRetry} />,
		);

		expect(screen.getByRole("alert")).toHaveTextContent("couldn't load your holdings");
		await userEvent.click(screen.getByRole("button", { name: /try again/i }));
		expect(onRetry).toHaveBeenCalledOnce();
	});

	it("shows an empty state when there are no holdings", () => {
		render(<HoldingsTable holdings={[]} loading={false} error={null} onRetry={() => {}} />);

		expect(screen.getByText("You don't hold any positions yet.")).toBeInTheDocument();
	});
});
