"use client";

import { useForm, SubmitHandler } from "react-hook-form";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { LoginPayload } from "@/types/Auth";
import { UserService } from "@/services/User.service";
import { AuthService } from "@/services/Auth.service";
import { User } from "@/types/User";

export default function Home() {
	const router = useRouter();

	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<LoginPayload>();

	const onSubmit: SubmitHandler<LoginPayload> = async (
		data: LoginPayload
	) => {
		try {
			const response = await UserService.login(data);
			if (response && !response.success) {
				alert(response.message);
			} else {
				alert("Login successful!");

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

	return (
		<div className="flex min-h-screen items-center justify-center bg-bgColor px-4">
			<div className="w-full max-w-md rounded-lg border border-border bg-box p-8 shadow-lg">
				{/* Header */}
				<div className="mb-6 text-center">
					<h1 className="text-3xl font-semibold text-white">
						<img
							src={"/images/vega.png"}
							alt="Vega Logo"
							className="mx-auto mb-4 w-17.75"
						/>
					</h1>

					<p className="text-white">Welcome to Vega</p>

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
							className="w-full rounded-md bg-primary px-4 py-2 font-semibold text-primary-foreground hover:bg-accent transition-colors"
						>
							Login
						</button>
					</form>
					<Link
						href="/signup"
						className="text-sm text-primary hover:underline"
					>
						Create Free Account
					</Link>
				</div>
			</div>
		</div>
	);
}
