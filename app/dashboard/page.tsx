"use client";

import { AssetChart } from "@/components/dashboard/AssetChart";
import { ItemBox } from "@/components/dashboard/ItemBox";
import { PortfolioChart } from "@/components/dashboard/PortfolioChart";
import ProtectedRoute from "@/components/ProtectedRoute";

const PageContent = () => {
	return (
		<>
			<div className="flex px-4">
				<div className="w-full max-w-md rounded-lg p-4 md:p-8">
					<h1 className="font-bold text-2xl">Dashboard</h1>
				</div>
			</div>

			{/* Two charts */}
			<div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full mb-4">
				<ItemBox>
					<AssetChart />
				</ItemBox>

				<ItemBox>
					<PortfolioChart />
				</ItemBox>
			</div>
		</>
	);
};

export default function Dashboard() {
	return (
		<ProtectedRoute>
			<PageContent />
		</ProtectedRoute>
	);
}
