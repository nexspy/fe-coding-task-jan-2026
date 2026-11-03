"use client";

import { ReactNode } from "react";

import ProtectedRoute from "@/components/ProtectedRoute";
import { Sidebar } from "@/components/common/Sidebar";
import { Topbar } from "@/components/common/Topbar";

export default function DashboardLayout({ children }: { children: ReactNode }) {
	return (
		<ProtectedRoute>
			<a
				href="#main"
				className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-50 focus:rounded-full focus:bg-pill focus:px-4 focus:py-2 focus:text-pill-foreground"
			>
				Skip to content
			</a>
			<div className="flex min-h-dvh">
				<Sidebar />
				<div className="flex min-w-0 flex-1 flex-col">
					<Topbar />
					<main id="main" tabIndex={-1} className="flex-1 px-4 outline-none sm:px-6 lg:px-8">
						{children}
					</main>
				</div>
			</div>
		</ProtectedRoute>
	);
}
