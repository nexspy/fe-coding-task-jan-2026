/**
 * Hook: usePortfolios()
 */
import { useState, useEffect } from "react";
import { PortfolioService } from "@/services/Portfolio.service";
import { Portfolio } from "@/types/portfolio/Portfolio";

export const usePortfolios = () => {
	const [portfolios, setPortfolios] = useState<Portfolio[]>([]);
	const [loading, setLoading] = useState<boolean>(true);
	const [error, setError] = useState<string | null>(null);

	const fetchPortfolios = async () => {
		try {
			setLoading(true);

			const data = await PortfolioService.getAllPortfolios();

			setPortfolios(data);
			setError(null);
		} catch (err) {
			setError(
				err instanceof Error
					? err.message
					: "Failed to fetch portfolios"
			);
			setPortfolios([]);
		} finally {
			setLoading(false);
		}
	};

	useEffect(() => {
		fetchPortfolios();
	}, []);

	return { portfolios, loading, error, fetchPortfolios };
};
