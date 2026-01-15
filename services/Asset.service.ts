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
			throw error;
		}
	}

	/**
	 * Calculate price change and percentage for an asset
	 *  - this analyzes the latest two price points to determine the change
	 *  - also, returns the latest price
	 * @param asset
	 * @returns
	 */
	static calculatePriceChange(asset: AssetView): {
		priceChange: number;
		priceChangePercent: string;
		latestPrice: number;
	} {
		const latestPrice = asset.prices?.[0]?.price || 0;
		const previousPrice = asset.prices?.[1]?.price || latestPrice;
		const priceChange = latestPrice - previousPrice;
		const priceChangePercent =
			previousPrice > 0
				? ((priceChange / previousPrice) * 100).toFixed(2)
				: "0.00";

		return { priceChange, priceChangePercent, latestPrice };
	}
}
