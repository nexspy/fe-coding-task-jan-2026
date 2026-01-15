"use client";

import { useAuth } from "@/components/AuthProvider";
import { AssetChart } from "@/components/dashboard/AssetChart";
import { ItemBox } from "@/components/dashboard/ItemBox";
import { PortfolioChart } from "@/components/dashboard/PortfolioChart";
import { PortfolioTable } from "@/components/dashboard/PortfolioTable";
import ProtectedRoute from "@/components/ProtectedRoute";

const PageContent = () => {
	const { user } = useAuth();
	const userName = user ? `, ${user.fullName}` : "User";

	return (
		<>
			<div className="flex px-4">
				<div className="w-full max-w-md rounded-lg py-6 md:py-8 md:px-2">
					<h1 className="font-bold text-2xl pb-1">
						Welcome {userName}
					</h1>
					<p>Here is an overview of your investments</p>
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

			{/* Single row grid with only table */}
			<div className="grid grid-cols-1 gap-4 w-full mb-4">
				<ItemBox>
					<PortfolioTable />
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
