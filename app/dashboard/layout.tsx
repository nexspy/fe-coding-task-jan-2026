"use client";

import { ReactNode } from "react";

import ProtectedRoute from "@/components/ProtectedRoute";
import { Sidebar } from "@/components/common/Sidebar";
import { MobileMenu } from "@/components/common/MobileMenu";

interface DashboardLayoutProps {
	children: ReactNode;
}

export default function DashboardLayout({ children }: DashboardLayoutProps) {
	return (
		<ProtectedRoute>
			<div className="flex h-screen">
				<MobileMenu />

				<Sidebar />

				<main className="flex-1 overflow-y-auto p-8">{children}</main>
			</div>
		</ProtectedRoute>
	);
}
