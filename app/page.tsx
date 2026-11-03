"use client";

import { useEffect } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { toast } from "react-toastify";

import { LoginPayload } from "@/types/Auth";
import { UserService } from "@/services/User.service";
import { AuthService } from "@/services/Auth.service";
import { AuthShell } from "@/components/auth/AuthShell";
import { FormField, submitButtonClass } from "@/components/auth/FormField";

export default function Home() {
	const router = useRouter();

	const {
		register,
		handleSubmit,
		formState: { errors, isSubmitting },
	} = useForm<LoginPayload>();

	const onSubmit: SubmitHandler<LoginPayload> = async (data) => {
		try {
			const response = await UserService.login(data);
			if (!response?.success || !response.data) {
				toast.error(response?.message ?? "Login failed");
				return;
			}

			AuthService.saveCurrentUser(response.data);
			toast.success("Login successful!");
			router.push("/dashboard");
		} catch (error) {
			console.error("Error during login:", error);
			toast.error("Something went wrong. Please try again.");
		}
	};

	useEffect(() => {
		// Skip the form if the user is already logged in
		if (AuthService.getCurrentUser()) {
			router.push("/dashboard");
		}
	}, [router]);

	return (
		<AuthShell
			title="Welcome back"
			subtitle="Log in to see your portfolio."
			footer={
				<>
					New here?{" "}
					<Link href="/signup" className="font-medium text-foreground underline-offset-4 hover:underline">
						Create a free account
					</Link>
				</>
			}
		>
			<form className="space-y-4" onSubmit={handleSubmit(onSubmit)} noValidate>
				<FormField
					id="email"
					label="Email"
					type="email"
					autoComplete="email"
					placeholder="you@example.com"
					error={errors.email?.message}
					{...register("email", {
						required: "Email is required",
						pattern: {
							value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
							message: "Invalid email address",
						},
					})}
				/>
				<FormField
					id="password"
					label="Password"
					type="password"
					autoComplete="current-password"
					placeholder="••••••••"
					error={errors.password?.message}
					{...register("password", {
						required: "Password is required",
						minLength: {
							value: 8,
							message: "Password must be at least 8 characters",
						},
					})}
				/>
				<button type="submit" disabled={isSubmitting} className={`${submitButtonClass} mt-2`}>
					{isSubmitting ? "Logging in..." : "Log in"}
				</button>
			</form>
		</AuthShell>
	);
}
