/**
 * Hook: usePortfolioSummary()
 *  - derives everything the dashboard shows from the portfolios query
 *  - memoised so charts don't re-render on unrelated state changes
 */
import { useMemo } from "react";

import { usePortfolios } from "./usePortfolios";
import {
	getCurrentHoldings,
	getPortfolioHistory,
} from "@/utils/portfolio";

export const usePortfolioSummary = () => {
	const { portfolios, loading, error, fetchPortfolios } = usePortfolios();

	const history = useMemo(() => getPortfolioHistory(portfolios), [portfolios]);
	const holdings = useMemo(() => getCurrentHoldings(portfolios), [portfolios]);

	return {
		portfolios,
		history,
		holdings,
		loading,
		error,
		retry: fetchPortfolios,
	};
};
