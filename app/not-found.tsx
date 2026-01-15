import Link from "next/link";

export default function NotFound() {
	return (
		<div className="flex min-h-screen items-center justify-center bg-background font-sans">
			<main className="flex w-full max-w-3xl flex-col items-center justify-center px-16 py-32 text-center">
				<div className="flex flex-col items-center gap-6">
					{/* 404 Large Text */}
					<h1 className="text-4xl font-bold text-primary dark:text-primary-foreground">
						404
					</h1>

					{/* Error Message */}
					<div className="flex flex-col gap-2">
						<h2 className="text-xl font-semibold tracking-tight text-foreground">
							Page Not Found
						</h2>
						<p className="text-lg text-primary dark:text-foreground/60">
							Could not find the requested resource
						</p>
					</div>

					{/* Return Home Button */}
					<Link
						href="/"
						className="mt-4 rounded-lg bg-primary px-6 py-3 font-semibold text-primary-foreground transition-all hover:bg-primary/90 hover:scale-105"
					>
						Return Home
					</Link>
				</div>
			</main>
		</div>
	);
}
