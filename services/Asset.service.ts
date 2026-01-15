import { Asset, AssetType } from "@/types/portfolio/Asset";
import { ServerResponse } from "@/types/Server";

export class AssetService {
	/**
	 * Get all assets
	 * @returns List of assets
	 */
	static async getAllAssets(): Promise<Asset[]> {
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
