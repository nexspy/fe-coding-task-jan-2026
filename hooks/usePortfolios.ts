/**
 * Hook: usePortfolios()
 */
import { useQuery } from "@tanstack/react-query";
import { PortfolioService } from "@/services/Portfolio.service";
import { Portfolio } from "@/types/portfolio/Portfolio";

export const usePortfolios = () => {
	const {
		data: portfolios = [],
		isLoading: loading,
		error,
		refetch: fetchPortfolios,
	} = useQuery<Portfolio[]>({
		queryKey: ["portfolios"],
		queryFn: async () => {
			const response = await PortfolioService.getAllPortfolios();
			return response;
		},
		// Refetch every 20 seconds
		refetchInterval: 20000,
	});

	return { portfolios, loading, error, fetchPortfolios };
};
