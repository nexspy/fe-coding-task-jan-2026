import { ReactNode } from "react";

import { Logo } from "../common/Logo";
import { ThemeToggle } from "../common/ThemeToggle";
import { Sparkline } from "../common/Sparkline";

/**
 * Layout for the login and signup pages:
 * a brand panel on large screens and the form card.
 */

const PREVIEW_TREND = [42, 44, 43, 47, 46, 51, 49, 55, 58, 56, 62, 66];

interface Props {
	title: string;
	subtitle: string;
	children: ReactNode;
	footer: ReactNode;
}

export const AuthShell = ({ title, subtitle, children, footer }: Props) => (
	<div className="grid min-h-dvh lg:grid-cols-2">
		{/* Brand panel */}
		<aside className="relative hidden flex-col justify-between overflow-hidden bg-accent p-12 text-accent-foreground lg:flex">
			<Logo inverted />
			<div className="max-w-md">
				<p className="text-4xl leading-tight font-semibold tracking-tight">
					Every position, every market, one clear view.
				</p>
				<p className="mt-4 text-accent-foreground/75">
					Track performance, allocation and market movers in real time.
				</p>
			</div>
			<div className="max-w-sm rounded-3xl bg-accent-foreground p-5 text-white">
				<p className="text-sm text-white/60">Portfolio value</p>
				<div className="mt-1 flex items-end justify-between gap-4">
					<p className="text-2xl font-semibold">$124,560.75</p>
					<Sparkline values={PREVIEW_TREND} color="var(--accent)" className="h-10 w-28" />
				</div>
			</div>
		</aside>

		{/* Form */}
		<main className="relative flex items-center justify-center px-4 py-16 sm:px-6">
			<div className="absolute top-4 right-4">
				<ThemeToggle />
			</div>
			<div className="w-full max-w-sm">
				<div className="mb-8 lg:hidden">
					<Logo />
				</div>
				<h1 className="text-2xl font-semibold tracking-tight">{title}</h1>
				<p className="mt-1 text-sm text-muted-foreground">{subtitle}</p>
				<div className="mt-8">{children}</div>
				<div className="mt-6 text-center text-sm text-muted-foreground">{footer}</div>
			</div>
		</main>
	</div>
);
