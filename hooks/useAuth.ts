"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { AuthService } from "@/services/Auth.service";

export function useAuth() {
	const router = useRouter();

	useEffect(() => {
		const currentUser = AuthService.getCurrentUser();

		if (!currentUser) {
			router.push("/");
		}
	}, [router]);
}
