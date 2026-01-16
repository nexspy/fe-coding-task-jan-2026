import { describe, it, expect, beforeEach, vi } from "vitest";
import { renderHook, waitFor } from "@testing-library/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { usePortfolios } from "@/hooks/usePortfolios";
import { PortfolioService } from "@/services/Portfolio.service";
import { Portfolio } from "@/types/portfolio/Portfolio";

// Mock PortfolioService
vi.mock("@/services/Portfolio.service", () => ({
	PortfolioService: {
		getAllPortfolios: vi.fn(),
	},
}));

describe("usePortfolios Hook", () => {
	let queryClient: QueryClient;

	const mockPortfolios: Portfolio[] = [
		{
			id: "12a0c60f-40e3-4d64-b520-edb30c7fd4e6",
			name: "Retirement Fund",
			asOf: new Date("2026-01-15"),
			positions: [],
		},
		{
			id: "91e88a02-a4ce-486d-94ea-fef0db6e109b",
			name: "Growth Portfolio",
			asOf: new Date("2026-01-15"),
			positions: [],
		},
	];

	beforeEach(() => {
		// Create a new QueryClient for each test
		queryClient = new QueryClient({
			defaultOptions: {
				queries: {
					retry: false, // Disable retries for tests
				},
			},
		});
		vi.clearAllMocks();
	});

	// Wrapper to provide QueryClient context
	const wrapper = ({ children }: { children: React.ReactNode }) => (
		<QueryClientProvider client={queryClient}>
			{children}
		</QueryClientProvider>
	);

	it("should fetch portfolios successfully", async () => {
		// mock service method call and return test data
		vi.mocked(PortfolioService.getAllPortfolios).mockResolvedValueOnce(
			mockPortfolios
		);

		const { result } = renderHook(() => usePortfolios(), { wrapper });

		// Initially loading
		expect(result.current.loading).toBe(true);
		expect(result.current.portfolios).toEqual([]);

		// Wait for data to load
		await waitFor(() => {
			expect(result.current.loading).toBe(false);
		});

		expect(result.current.portfolios).toEqual(mockPortfolios);
		expect(result.current.error).toBeNull();
	});

	it("should handle errors correctly", async () => {
		const error = new Error("Failed to fetch portfolios");
		vi.mocked(PortfolioService.getAllPortfolios).mockRejectedValueOnce(
			error
		);

		// mock custom hook "usePortfolios"
		const { result } = renderHook(() => usePortfolios(), { wrapper });

		await waitFor(() => {
			expect(result.current.loading).toBe(false);
		});

		expect(result.current.portfolios).toEqual([]);
		expect(result.current.error).toBeTruthy();
	});

	it("should return empty array when no portfolios exist", async () => {
		// our service will return an empty array
		vi.mocked(PortfolioService.getAllPortfolios).mockResolvedValueOnce([]);

		const { result } = renderHook(() => usePortfolios(), { wrapper });

		await waitFor(() => {
			expect(result.current.loading).toBe(false);
		});

		// result portfolios should be an empty array
		expect(result.current.portfolios).toEqual([]);
		expect(result.current.error).toBeNull();
	});

	it("should provide fetchPortfolios refetch function", async () => {
		vi.mocked(PortfolioService.getAllPortfolios).mockResolvedValueOnce(
			mockPortfolios
		);

		const { result } = renderHook(() => usePortfolios(), { wrapper });

		await waitFor(() => {
			expect(result.current.loading).toBe(false);
		});

		expect(result.current.fetchPortfolios).toBeDefined();
		expect(typeof result.current.fetchPortfolios).toBe("function");
	});

	it("should call PortfolioService.getAllPortfolios", async () => {
		vi.mocked(PortfolioService.getAllPortfolios).mockResolvedValueOnce(
			mockPortfolios
		);

		renderHook(() => usePortfolios(), { wrapper });

		await waitFor(() => {
			expect(PortfolioService.getAllPortfolios).toHaveBeenCalledTimes(1);
		});
	});
});
