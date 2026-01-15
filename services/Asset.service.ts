import { Asset, AssetType, AssetView } from "@/types/portfolio/Asset";

export class AssetService {
	/**
	 * Get all assets
	 * @returns List of assets
	 */
	static async getAllAssets(): Promise<AssetView[]> {
		try {
			const response = await fetch("/api/assets");
			const result = await response.json();

			if (result.success) {
				return result.data;
			}

			throw new Error("Failed to fetch assets");
		} catch (error) {
			console.error("Error fetching assets:", error);
			return [];
		}
	}
}
