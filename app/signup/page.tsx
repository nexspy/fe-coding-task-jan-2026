"use client";

import Link from "next/link";
import { useForm, SubmitHandler } from "react-hook-form";
import { useRouter } from "next/navigation";

import { UserCreatePayload } from "@/types/User";
import { UserService } from "@/services/User.service";

export default function SignupPage() {
	const router = useRouter();

	const {
		register,
		handleSubmit,
		watch,
		formState: { errors },
	} = useForm<UserCreatePayload>();

	const onSubmit: SubmitHandler<UserCreatePayload> = async (data) => {
		try {
			const response = await UserService.save(data);
			if (response && !response.success) {
				alert(response.message);
			} else {
				alert("User registered successfully!");

				// navgigate to login page
				router.push("/");
			}
		} catch (error) {
			console.error("Error registering user:", error);
		}
	};

	return (
		<div className="flex min-h-screen items-center justify-center bg-bgColor bg-shadowImage px-4">
			<div className="w-full max-w-md rounded-lg border border-border bg-box p-8 shadow-lg">
				{/* Header */}
				<div className="mb-6 text-center">
					<h1 className="text-3xl font-semibold text-white">
						Sign Up
					</h1>
					<p className="mt-2 text-sm text-white">
						Create your account
					</p>
				</div>

				{/* Form */}
				<form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
					<div>
						<input
							type="text"
							id="name"
							className="mt-1 w-full rounded-md border border-border bg-background px-3 py-2 text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
							placeholder="Company Name"
							{...register("companyName", {
								required: "Company name is required",
								minLength: {
									value: 4,
									message:
										"Company name must be at least 4 characters",
								},
							})}
						/>
						{errors.companyName && (
							<p className="text-sm text-red-500 mt-1">
								{errors.companyName.message}
							</p>
						)}
					</div>

					<div>
						<input
							type="text"
							id="name"
							className="mt-1 w-full rounded-md border border-border bg-background px-3 py-2 text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
							placeholder="Full Name"
							{...register("fullName", {
								required: "Full name is required",
								minLength: {
									value: 6,
									message:
										"Full name must be at least 6 characters",
								},
							})}
						/>
						{errors.fullName && (
							<p className="text-sm text-red-500 mt-1">
								{errors.fullName.message}
							</p>
						)}
					</div>

					<div>
						<label
							htmlFor="email"
							className="block text-sm font-medium text-foreground"
						>
							Email
						</label>
						<input
							type="email"
							id="email"
							className="mt-1 w-full rounded-md border border-border bg-background px-3 py-2 text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
							placeholder="you@example.com"
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
							className="block text-sm font-medium text-foreground"
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

					<div>
						<label
							htmlFor="confirmPassword"
							className="block text-sm font-medium text-foreground"
						>
							Confirm Password
						</label>
						<input
							type="password"
							id="confirmPassword"
							className="mt-1 w-full rounded-md border border-border bg-background px-3 py-2 text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
							placeholder="••••••••"
							{...register("confirmPassword", {
								required: "Please confirm your password",
								validate: (value) =>
									value === watch("password") ||
									"Passwords do not match",
							})}
						/>
						{errors.confirmPassword && (
							<p className="text-sm text-red-500 mt-1">
								{errors.confirmPassword.message}
							</p>
						)}
					</div>

					<button
						type="submit"
						className="w-full rounded-md bg-primary px-4 py-2 font-semibold text-primary-foreground hover:bg-accent transition-colors"
					>
						Sign Up
					</button>
				</form>

				{/* Footer */}
				<div className="mt-6 text-center text-sm text-white">
					Already have an account?{" "}
					<Link href="/" className="text-primary hover:text-accent">
						Log in
					</Link>
				</div>

				<div className="mt-4 text-center">
					<Link
						href="/"
						className="text-sm text-primary hover:text-accent"
					>
						← Back to Home
					</Link>
				</div>
			</div>
		</div>
	);
}
