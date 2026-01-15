/**
 * Hook: useAssets()
 */
import { useQuery } from "@tanstack/react-query";

import { AssetView } from "@/types/portfolio/Asset";
import { AssetService } from "@/services/Asset.service";

export const useAssets = () => {
	const {
		data: assets = [],
		isLoading: loading,
		error,
	} = useQuery<AssetView[]>({
		queryKey: ["assets"],
		queryFn: async () => {
			const response = await AssetService.getAllAssets();
			return response;
		},
		// Refetch every 20 seconds
		refetchInterval: 20000,
	});

	return { assets, loading, error };
};
