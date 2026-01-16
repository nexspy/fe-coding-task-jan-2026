import { AssetType } from "@/types/portfolio/Asset";
import { Portfolio } from "@/types/portfolio/Portfolio";
import { generateUUID } from "@/utils/uuid";
import { NextRequest, NextResponse } from "next/server";
import { getMonthlyDates } from "@/utils/date";

/**
 * GET /api/portfolios
 * Returns list of all investor positions
 */
export async function GET(request: NextRequest) {
	// Get query params from URL
	const searchParams = request.nextUrl.searchParams;
	const companyId = searchParams.get("companyId");

	// throw error if companyId is missing
	if (!companyId) {
		return NextResponse.json(
			{
				success: false,
				message: "company ID is required",
				data: [],
			},
			{ status: 400 }
		);
	}

	// Simulate API delay
	await new Promise((resolve) => setTimeout(resolve, 500));

	// Get last six months date
	const lastMonths = getMonthlyDates(6);

	const portfolios: Portfolio[] = [];

	// portfolio position in last 6 months
	const portfolio: Portfolio = {
		id: "6a9775d1-950c-42c1-bf04-0ad6bd712345",
		name: "Retirement Fund",
		asOf: lastMonths[0],
		positions: [
			{
				id: generateUUID(),
				asset: {
					id: "1",
					name: "Apple Inc.",
					type: AssetType.STOCK,
					symbol: "AAPL",
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
				quantity: 100,
				price: 150.0,
				asOf: lastMonths[0],
			},
			{
				id: generateUUID(),
				asset: {
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
							price: 1100.0,
						},
					],
				},
				quantity: 50,
				price: 200.0,
				asOf: lastMonths[1],
			},
			{
				id: generateUUID(),
				asset: {
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
							price: 1100.0,
						},
					],
				},
				quantity: 50,
				price: 200.0,
				asOf: lastMonths[2],
			},
			{
				id: generateUUID(),
				asset: {
					id: generateUUID(),
					name: "Ethereum",
					symbol: "ETH",
					type: AssetType.CRYPTO,
					prices: [
						{
							id: generateUUID(),
							price: 500.0,
						},
						{
							id: generateUUID(),
							price: 800.0,
						},
					],
				},
				quantity: 50,
				price: 200.0,
				asOf: lastMonths[3],
			},
			{
				id: generateUUID(),
				asset: {
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
							price: 1100.0,
						},
					],
				},
				quantity: 50,
				price: 200.0,
				asOf: lastMonths[4],
			},
			{
				id: generateUUID(),
				asset: {
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
							price: 1100.0,
						},
					],
				},
				quantity: 50,
				price: 200.0,
				asOf: lastMonths[5],
			},
		],
	};

	portfolios.push(portfolio);

	return NextResponse.json({
		success: true,
		message: "Portfolios fetched successfully",
		data: portfolios,
	});
}
