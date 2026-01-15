"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { AuthService } from "@/services/Auth.service";

export default function ProtectedRoute({
	children,
}: {
	children: React.ReactNode;
}) {
	const router = useRouter();
	const [isAuthenticated, setIsAuthenticated] = useState(false);
	const [isLoading, setIsLoading] = useState(true);

	useEffect(() => {
		const authenticated = AuthService.isAuthenticated();
		if (!authenticated) {
			router.push("/");
		} else {
			setIsAuthenticated(true);
		}
		setIsLoading(false);
	}, [router]);

	if (isLoading || !isAuthenticated) {
		return (
			<div className="flex items-center justify-center min-h-screen">
				<div className="text-lg">Authenticating...</div>
			</div>
		);
	}

	return <>{children}</>;
}
