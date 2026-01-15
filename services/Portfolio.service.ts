import { Portfolio } from "@/types/portfolio/Portfolio";

export class PortfolioService {
	/**
	 * Get all portfolios of a company
	 * @returns
	 */
	static async getAllPortfolios(): Promise<Portfolio[]> {
		try {
			//TODO: replace with actual companyId
			const companyId = 1;
			const response = await fetch(
				`/api/portfolios?companyId=${companyId}`
			);
			const result = await response.json();

			if (result.success) {
				return result.data;
			}

			throw new Error("Failed to fetch portfolios");
		} catch (error) {
			console.error("Error fetching portfolios:", error);
			return [];
		}
	}
}
