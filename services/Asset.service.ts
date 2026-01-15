import { Asset, AssetType } from "@/types/portfolio/Asset";
import { ServerResponse } from "@/types/Server";

export class AssetService {
	/**
	 * Get all assets
	 * @returns List of assets
	 */
	static async getAllAssets(): Promise<Asset[]> {
		//TODO : remove the mock timer delay
		await new Promise((resolve) => setTimeout(resolve, 2000));

		//TODO : Replace with real data fetching logic using Nextjs API routes or database queries
		const assets: Asset[] = [
			{
				id: "1",
				name: "Bitcoin",
				symbol: "BTC",
				type: AssetType.STOCK,
				prices: ["101", "102"],
			},
			{
				id: "2",
				name: "Ethereum",
				symbol: "ETH",
				type: AssetType.CRYPTO,
				prices: ["201", "202"],
			},
			{
				id: "3",
				name: "US Dollar",
				symbol: "USD",
				type: AssetType.FLAT,
				prices: ["301", "302"],
			},
		];

		return assets;
	}
}
