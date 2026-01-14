"use client";

import ProtectedRoute from "@/components/ProtectedRoute";

const PageContent = () => {
	return (
		<div className="flex min-h-screen items-center justify-center  px-4">
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
