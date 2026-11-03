import Link from "next/link";

import { Logo } from "@/components/common/Logo";

export default function NotFound() {
	return (
		<main className="flex min-h-dvh flex-col items-center justify-center gap-6 px-4 text-center">
			<Logo />
			<p className="text-7xl font-semibold tracking-tight text-accent">404</p>
			<div>
				<h1 className="text-xl font-semibold">Page not found</h1>
				<p className="mt-1 text-sm text-muted-foreground">
					We couldn&apos;t find the page you were looking for.
				</p>
			</div>
			<Link
				href="/"
				className="rounded-full bg-pill px-5 py-2.5 text-sm font-semibold text-pill-foreground hover:opacity-90"
			>
				Back to home
			</Link>
		</main>
	);
}
