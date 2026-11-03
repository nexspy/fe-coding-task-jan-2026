"use client";

import { useAuth } from "@/components/AuthProvider";
import { Avatar } from "./Avatar";
import { MobileNav } from "./MobileNav";
import { ThemeToggle } from "./ThemeToggle";
import { Logo } from "./Logo";

/**
 * Top bar of the dashboard
 *  - menu button + logo on small screens, theme toggle and user on the right
 */
export const Topbar = () => {
	const { user } = useAuth();

	return (
		<header className="sticky top-0 z-30 flex items-center gap-3 border-b border-border bg-background/80 px-4 py-3 backdrop-blur sm:px-6 lg:px-8">
			<MobileNav />
			<div className="lg:hidden">
				<Logo />
			</div>

			<div className="ml-auto flex items-center gap-2">
				<ThemeToggle />
				{user && (
					<div className="hidden items-center gap-2 rounded-full border border-border bg-surface py-1 pr-4 pl-1 sm:flex">
						<Avatar fullname={user.fullName} size="sm" tone="accent" />
						<span className="text-sm font-medium">{user.fullName}</span>
					</div>
				)}
			</div>
		</header>
	);
};
