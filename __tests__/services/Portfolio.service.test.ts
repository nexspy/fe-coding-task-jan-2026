import { describe, it, expect, beforeEach, afterEach, vi } from "vitest";
import { PortfolioService } from "@/services/Portfolio.service";
import { Portfolio } from "@/types/portfolio/Portfolio";

// Mock fetch (global fetch function/ built-in in browsers)
global.fetch = vi.fn();

describe("PortfolioService", () => {
	// mock portfolio data
	const mockPortfolios: Portfolio[] = [
		{
			id: "3f8bd6eb-e902-443c-b5f7-a86ce7bdb606",
			name: "Retirement Fund",
			asOf: new Date("2026-01-15"),
			positions: [
				{
					id: "d32b981b-76b7-4d0f-b36b-4e58d6f49d25",
					quantity: 10,
					price: 100,
					asOf: new Date("2026-01-15"),
					asset: {
						id: "5dd693ae-7644-496f-a70c-372060ba4c28",
						name: "Bitcoin",
						symbol: "BTC",
						type: "Cryptocurrency" as any,
						prices: [],
					},
				},
			],
		},
		{
			id: "4f413aba-c60c-4c87-a212-b6b330eff099",
			name: "Growth Portfolio",
			asOf: new Date("2026-01-15"),
			positions: [],
		},
	];

	beforeEach(() => {
		vi.clearAllMocks();
	});

	afterEach(() => {
		vi.restoreAllMocks();
	});

	describe("getAllPortfolios", () => {
		it("should fetch portfolios successfully", async () => {
			const mockResponse = {
				success: true,
				data: mockPortfolios,
			};

			// mock fetch to return successful response
			vi.mocked(fetch).mockResolvedValueOnce({
				json: async () => mockResponse,
			} as Response);

			// start calling the service method
			const result = await PortfolioService.getAllPortfolios();

			expect(fetch).toHaveBeenCalledWith("/api/portfolios?companyId=1");
			expect(result).toEqual(mockPortfolios);
		});

		it("should throw error when response is not successful", async () => {
			const mockResponse = {
				success: false,
				message: "Failed to fetch",
			};

			vi.mocked(fetch).mockResolvedValueOnce({
				json: async () => mockResponse,
			} as Response);

			await expect(PortfolioService.getAllPortfolios()).rejects.toThrow(
				"Failed to fetch portfolios"
			);
		});

		it("should throw error when fetch fails", async () => {
			vi.mocked(fetch).mockRejectedValueOnce(new Error("Network error"));

			await expect(PortfolioService.getAllPortfolios()).rejects.toThrow(
				"Network error"
			);
		});

		it("should use correct companyId in request", async () => {
			const mockResponse = {
				success: true,
				data: [],
			};

			vi.mocked(fetch).mockResolvedValueOnce({
				json: async () => mockResponse,
			} as Response);

			await PortfolioService.getAllPortfolios();

			expect(fetch).toHaveBeenCalledWith(
				expect.stringContaining("companyId=1")
			);
		});
	});
});
