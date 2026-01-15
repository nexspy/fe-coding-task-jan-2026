"use client";

import ProtectedRoute from "@/components/ProtectedRoute";

const PageContent = () => {
	return (
		<div className="flex px-4">
			<div className="w-full max-w-md rounded-lg p-8">
				<h1>Dashboard</h1>
			</div>
		</div>
	);
};

export default function Dashboard() {
	return (
		<ProtectedRoute>
			<PageContent />
		</ProtectedRoute>
	);
}
