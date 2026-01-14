import Link from "next/link";

export default function SignupPage() {
	return (
		<div className="flex min-h-screen items-center justify-center bg-background px-4">
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
				<form className="space-y-4">
					<div>
						<input
							type="text"
							id="name"
							className="mt-1 w-full rounded-md border border-border bg-background px-3 py-2 text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
							placeholder="Full Name"
						/>
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
						/>
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
						/>
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
						/>
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
					<Link
						href="/"
						className="text-primary hover:text-accent underline"
					>
						Log in
					</Link>
				</div>

				<div className="mt-4 text-center">
					<Link
						href="/"
						className="text-sm text-primary hover:text-accent underline"
					>
						← Back to Home
					</Link>
				</div>
			</div>
		</div>
	);
}
