/**
 * Hook: useAssets()
 */
import { useState, useEffect } from "react";
import { Asset } from "@/types/portfolio/Asset";
import { AssetService } from "@/services/Asset.service";

export const useAssets = () => {
	const [assets, setAssets] = useState<Asset[]>([]);
	const [loading, setLoading] = useState<boolean>(true);
	const [error, setError] = useState<string | null>(null);

	const fetchAssets = async () => {
		try {
			setLoading(true);

			const data = await AssetService.getAllAssets();

			setAssets(data);
			setError(null);
		} catch (err) {
			setError(
				err instanceof Error ? err.message : "Failed to fetch assets"
			);
			setAssets([]);
		} finally {
			setLoading(false);
		}
	};

	useEffect(() => {
		fetchAssets();
	}, []);

	return { assets, loading, error, fetchAssets };
};
