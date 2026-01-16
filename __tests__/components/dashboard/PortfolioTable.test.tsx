import { describe, it, expect, beforeEach, vi } from "vitest";
import { render, screen, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom/vitest";
import { PortfolioTable } from "@/components/dashboard/PortfolioTable";
import { AssetType, AssetView } from "@/types/portfolio/Asset";
import { AssetService } from "@/services/Asset.service";

// Mock useAssets hook
vi.mock("@/hooks/useAssets", () => ({
	useAssets: vi.fn(),
}));

// Mock AssetService
vi.mock("@/services/Asset.service", () => ({
	AssetService: {
		calculatePriceChange: vi.fn(),
	},
}));

// Mock child components
vi.mock("@/components/dashboard/Loading", () => ({
	Loading: () => <div>Loading...</div>,
}));

vi.mock("@/components/dashboard/AssetAvatar", () => ({
	AssetAvatar: ({ asset }: { asset: AssetView }) => <div>{asset.name}</div>,
}));

vi.mock("@/components/common/Tag", () => ({
	Tag: ({ children }: { children: React.ReactNode }) => (
		<span>{children}</span>
	),
}));

vi.mock("@/components/common/FailedBox", () => ({
	FailedBox: ({ message }: { message: string }) => <div>{message}</div>,
}));

import { useAssets } from "@/hooks/useAssets";

describe("PortfolioTable Component", () => {
	const mockAssets: AssetView[] = [
		{
			id: "12a0c60f-40e3-4d64-b520-edb30c7fd4e6",
			name: "Bitcoin",
			symbol: "BTC",
			type: AssetType.CRYPTO,
			prices: [
				{
					id: "p1",
					price: 45000,
				},
				{
					id: "p2",
					price: 43000,
				},
			],
		},
		{
			id: "91e88a02-a4ce-486d-94ea-fef0db6e109b",
			name: "Apple Inc",
			symbol: "AAPL",
			type: AssetType.STOCK,
			prices: [
				{
					id: "p3",
					price: 175,
				},
				{
					id: "p4",
					price: 170,
				},
			],
		},
	];

	beforeEach(() => {
		vi.clearAllMocks();

		// Default mock for calculatePriceChange
		vi.mocked(AssetService.calculatePriceChange).mockImplementation(
			(asset) => ({
				priceChange: 2000,
				priceChangePercent: "4.65",
				latestPrice: 45000,
			})
		);
	});

	it("should render table with assets when data is loaded", () => {
		vi.mocked(useAssets).mockReturnValue({
			assets: mockAssets,
			loading: false,
			error: null,
		});

		render(<PortfolioTable />);

		expect(screen.getByText("Company's Portfolio")).toBeInTheDocument();
		expect(screen.getByText("Bitcoin")).toBeInTheDocument();
		expect(screen.getByText("Apple Inc")).toBeInTheDocument();
	});
});
