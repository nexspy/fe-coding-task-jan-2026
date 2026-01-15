import { ReactNode } from "react";
import { Sidebar } from "@/components/common/Sidebar";
import ProtectedRoute from "@/components/ProtectedRoute";

interface DashboardLayoutProps {
	children: ReactNode;
}

export default function DashboardLayout({ children }: DashboardLayoutProps) {
	return (
		<ProtectedRoute>
			<div className="flex h-screen bg-gray-100">
				<Sidebar />
				<main className="flex-1 overflow-y-auto p-8">{children}</main>
			</div>
		</ProtectedRoute>
	);
}
