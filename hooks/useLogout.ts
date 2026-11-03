"use client";

import { useRouter } from "next/navigation";

import { useAuth } from "@/components/AuthProvider";

/**
 * Hook: useLogout()
 *  - clears the session and returns the user to the login page
 */
export const useLogout = () => {
	const router = useRouter();
	const { logout } = useAuth();

	return () => {
		logout();
		router.push("/");
	};
};
