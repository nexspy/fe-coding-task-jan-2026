"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { AuthService } from "@/services/Auth.service";
import { AuthProvider } from "./AuthProvider";

export default function ProtectedRoute({
	children,
}: {
	children: React.ReactNode;
}) {
	const router = useRouter();
	const [isAuthenticated, setIsAuthenticated] = useState(false);
	const [isLoading, setIsLoading] = useState(true);

	useEffect(() => {
		// check authentication status of user
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

	// wrapping children with AuthProvider to provide auth context (making user available throughout the app)
	return <AuthProvider>{children}</AuthProvider>;
}
