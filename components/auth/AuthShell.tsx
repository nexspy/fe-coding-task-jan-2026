import { ReactNode } from "react";

import { Logo } from "../common/Logo";
import { ThemeToggle } from "../common/ThemeToggle";
import { FiActivity, FiPieChart, FiTrendingUp } from "react-icons/fi";

/**
 * Layout for the login and signup pages:
 * a brand panel on large screens and the form card.
 */

// Shown before login, so it describes features and never shows figures
// that could be mistaken for account data.
const FEATURES = [
	{ icon: FiActivity, text: "Portfolio performance over 1M to 1Y" },
	{ icon: FiPieChart, text: "Allocation by asset class or asset" },
	{ icon: FiTrendingUp, text: "Market movers and weekly changes" },
];

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
			<ul className="flex max-w-sm flex-col gap-3">
				{FEATURES.map(({ icon: Icon, text }) => (
					<li key={text} className="flex items-center gap-3 text-sm font-medium">
						<span
							aria-hidden="true"
							className="grid size-9 shrink-0 place-items-center rounded-full bg-accent-foreground text-accent"
						>
							<Icon className="size-4" />
						</span>
						{text}
					</li>
				))}
			</ul>
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
