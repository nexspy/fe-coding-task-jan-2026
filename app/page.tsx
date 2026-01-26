"use client";

import { useEffect } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { useRouter } from "next/navigation";
import Link from "next/link";

import { LoginPayload } from "@/types/Auth";
import { User } from "@/types/User";
import { UserService } from "@/services/User.service";
import { AuthService } from "@/services/Auth.service";
import { ThemeToggle } from "@/components/common/ThemeToggle";
import { toast } from "react-toastify";

export default function Home() {
	const router = useRouter();

	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<LoginPayload>();

	const onSubmit: SubmitHandler<LoginPayload> = async (
		data: LoginPayload,
	) => {
		try {
			const response = await UserService.login(data);
			if (response && !response.success) {
				toast.error(response.message);
			} else {
				toast.success("Login successful!");

				// Save current user to local storage
				const user = response!.data as User;
				AuthService.saveCurrentUser(user);

				// direct to dashboard
				router.push("/dashboard");
			}
		} catch (error) {
			console.error("Error during login:", error);
		}
	};

	useEffect(() => {
		// Check if user is already logged in
		const user = AuthService.getCurrentUser();
		if (user) {
			router.push("/dashboard");
		}
	}, []);

	return (
		<div className="flex min-h-screen items-center justify-center bg-background bg-shadowImage px-4">
			{/* Theme toggle button */}
			<div className="fixed top-4 right-4">
				<ThemeToggle />
			</div>

			<div className="flex flex-col w-full max-w-md rounded-lg border border-border bg-box p-8 shadow-lg">
				{/* Header */}
				<div className="mb-6 text-center">
					<h1 className="text-3xl font-semibold text-white">
						<img
							src={"/images/vega.png"}
							alt="Investment Logo"
							className="mx-auto mb-4 w-17.75"
						/>
					</h1>

					<p className="text-white">Welcome to NovaFund</p>

					{/* Form */}
					<form
						className="space-y-4 text-left"
						onSubmit={handleSubmit(onSubmit)}
					>
						<div>
							<label
								htmlFor="email"
								className="block text-sm font-medium text-white"
							>
								Email
							</label>
							<input
								type="text"
								id="name"
								className="mt-1 w-full rounded-md border border-border bg-background px-3 py-2 text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
								placeholder="Email"
								{...register("email", {
									required: "Email is required",
									pattern: {
										value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
										message: "Invalid email address",
									},
								})}
							/>
							{errors.email && (
								<p className="text-sm text-red-500 mt-1">
									{errors.email.message}
								</p>
							)}
						</div>

						<div>
							<label
								htmlFor="password"
								className="block text-sm font-medium text-white"
							>
								Password
							</label>
							<input
								type="password"
								id="password"
								className="mt-1 w-full rounded-md border border-border bg-background px-3 py-2 text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
								placeholder="••••••••"
								{...register("password", {
									required: "Password is required",
									minLength: {
										value: 8,
										message:
											"Password must be at least 8 characters",
									},
								})}
							/>
							{errors.password && (
								<p className="text-sm text-red-500 mt-1">
									{errors.password.message}
								</p>
							)}
						</div>

						<button
							type="submit"
							className="cursor-pointer w-full rounded-md bg-primary px-4 py-2 font-semibold text-primary-foreground hover:bg-accent hover:text-black transition-colors"
						>
							Login
						</button>
					</form>
				</div>

				<Link
					href="/signup"
					className="text-sm text-center text-secondary hover:text-accent w-full"
				>
					Create Free Account
				</Link>
			</div>
		</div>
	);
}
