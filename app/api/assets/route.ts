import { Asset, AssetType } from "@/types/portfolio/Asset";
import { NextResponse } from "next/server";

/**
 * GET /api/assets
 * Returns all assets
 */
export async function GET() {
	// Simulate API delay
	await new Promise((resolve) => setTimeout(resolve, 500));

	const assets: Asset[] = [
		{
			id: "1",
			name: "Bitcoin",
			symbol: "BTC",
			type: AssetType.CRYPTO,
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
		{
			id: "4",
			name: "Apple Inc.",
			symbol: "AAPL",
			type: AssetType.STOCK,
			prices: ["401", "402"],
		},
		{
			id: "5",
			name: "Tesla Inc.",
			symbol: "TSLA",
			type: AssetType.STOCK,
			prices: ["501", "502"],
		},
	];

	return NextResponse.json({
		success: true,
		data: assets,
	});
}
