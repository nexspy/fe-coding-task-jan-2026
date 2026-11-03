import { NextResponse } from "next/server";

import { getAssets } from "../_data/market";

/**
 * GET /api/assets
 * Returns all assets with their latest and previous price (latest first)
 */
export async function GET() {
	// Simulate API delay
	await new Promise((resolve) => setTimeout(resolve, 500));

	return NextResponse.json({
		success: true,
		message: "Assets fetched successfully",
		data: getAssets(),
	});
}
