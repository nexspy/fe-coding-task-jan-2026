import { AssetView } from "@/types/portfolio/Asset";

export class AssetService {
	/**
	 * Get all assets
	 * @returns List of assets
	 */
	static async getAllAssets(): Promise<AssetView[]> {
		try {
			const response = await fetch("/api/assets");
			const result = await response.json();

			if (response.ok && result.success) {
				return result.data;
			}

			throw new Error(result.message || "Failed to fetch assets");
		} catch (error) {
			console.error("Error fetching assets:", error);
			throw error;
		}
	}
}
