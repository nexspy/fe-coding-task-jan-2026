import { NextRequest, NextResponse } from "next/server";

import { getPortfolios } from "../_data/market";

/**
 * GET /api/portfolios?companyId=1
 * Returns the company's portfolios with a weekly position history
 */
export async function GET(request: NextRequest) {
	const companyId = request.nextUrl.searchParams.get("companyId");

	if (!companyId) {
		return NextResponse.json(
			{
				success: false,
				message: "company ID is required",
				data: [],
			},
			{ status: 400 },
		);
	}

	// Simulate API delay
	await new Promise((resolve) => setTimeout(resolve, 500));

	return NextResponse.json({
		success: true,
		message: "Portfolios fetched successfully",
		data: getPortfolios(),
	});
}
