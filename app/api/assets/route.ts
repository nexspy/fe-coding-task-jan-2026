import { AssetType, AssetView } from "@/types/portfolio/Asset";
import { generateUUID } from "@/utils/uuid";
import { NextResponse } from "next/server";

/**
 * GET /api/assets
 * Returns all assets
 */
export async function GET() {
	// Simulate API delay
	await new Promise((resolve) => setTimeout(resolve, 500));

	const assets: AssetView[] = [
		{
			id: generateUUID(),
			name: "Bitcoin",
			symbol: "BTC",
			type: AssetType.CRYPTO,
			prices: [
				{
					id: generateUUID(),
					price: 4000.0,
				},
				{
					id: generateUUID(),
					price: 3100.0,
				},
			],
		},
		{
			id: generateUUID(),
			name: "Ethereum",
			symbol: "ETH",
			type: AssetType.CRYPTO,
			prices: [
				{
					id: generateUUID(),
					price: 1000.0,
				},
				{
					id: generateUUID(),
					price: 2100.0,
				},
			],
		},
		{
			id: generateUUID(),
			name: "US Dollar",
			symbol: "USD",
			type: AssetType.FLAT,
			prices: [
				{
					id: generateUUID(),
					price: 3000.0,
				},
				{
					id: generateUUID(),
					price: 8100.0,
				},
			],
		},
		{
			id: generateUUID(),
			name: "Apple Inc.",
			symbol: "AAPL",
			type: AssetType.STOCK,
			prices: [
				{
					id: generateUUID(),
					price: 4000.0,
				},
				{
					id: generateUUID(),
					price: 4100.0,
				},
			],
		},
		{
			id: generateUUID(),
			name: "Tesla Inc.",
			symbol: "TSLA",
			type: AssetType.STOCK,
			prices: [
				{
					id: generateUUID(),
					price: 2000.0,
				},
				{
					id: generateUUID(),
					price: 2100.0,
				},
			],
		},
	];

	return NextResponse.json({
		success: true,
		message: "Assets fetched successfully",
		data: assets,
	});
}
