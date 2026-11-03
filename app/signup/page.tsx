"use client";

import Link from "next/link";
import { useForm, SubmitHandler } from "react-hook-form";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";

import { UserCreatePayload } from "@/types/User";
import { UserService } from "@/services/User.service";
import { AuthShell } from "@/components/auth/AuthShell";
import { FormField, submitButtonClass } from "@/components/auth/FormField";

export default function SignupPage() {
	const router = useRouter();

	const {
		register,
		handleSubmit,
		getValues,
		formState: { errors, isSubmitting },
	} = useForm<UserCreatePayload>();

	const onSubmit: SubmitHandler<UserCreatePayload> = async (data) => {
		try {
			const response = await UserService.save(data);
			if (!response?.success) {
				toast.error(response?.message ?? "Sign up failed");
				return;
			}

			toast.success("Account created. Please log in.");
			router.push("/");
		} catch (error) {
			console.error("Error registering user:", error);
			toast.error("Something went wrong. Please try again.");
		}
	};

	return (
		<AuthShell
			title="Create your account"
			subtitle="Start tracking your company's portfolio."
			footer={
				<>
					Already have an account?{" "}
					<Link href="/" className="font-medium text-foreground underline-offset-4 hover:underline">
						Log in
					</Link>
				</>
			}
		>
			<form className="space-y-4" onSubmit={handleSubmit(onSubmit)} noValidate>
				<FormField
					id="companyName"
					label="Company name"
					autoComplete="organization"
					error={errors.companyName?.message}
					{...register("companyName", {
						required: "Company name is required",
						minLength: {
							value: 4,
							message: "Company name must be at least 4 characters",
						},
					})}
				/>
				<FormField
					id="fullName"
					label="Full name"
					autoComplete="name"
					error={errors.fullName?.message}
					{...register("fullName", {
						required: "Full name is required",
						minLength: {
							value: 6,
							message: "Full name must be at least 6 characters",
						},
					})}
				/>
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
					autoComplete="new-password"
					placeholder="At least 8 characters"
					error={errors.password?.message}
					{...register("password", {
						required: "Password is required",
						minLength: {
							value: 8,
							message: "Password must be at least 8 characters",
						},
					})}
				/>
				<FormField
					id="confirmPassword"
					label="Confirm password"
					type="password"
					autoComplete="new-password"
					error={errors.confirmPassword?.message}
					{...register("confirmPassword", {
						required: "Please confirm your password",
						validate: (value) =>
							value === getValues("password") || "Passwords do not match",
					})}
				/>
				<button type="submit" disabled={isSubmitting} className={`${submitButtonClass} mt-2`}>
					{isSubmitting ? "Creating account..." : "Create account"}
				</button>
			</form>
		</AuthShell>
	);
}
