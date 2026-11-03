"use client";

/**
 * Sidebar navigation
 *  - `SidebarContent` is shared by the desktop sidebar and the mobile drawer
 */
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import {
	FiActivity,
	FiBarChart2,
	FiGrid,
	FiList,
	FiLogOut,
	FiPieChart,
} from "react-icons/fi";

import { useAuth } from "@/components/AuthProvider";
import { useLogout } from "@/hooks/useLogout";
import { Avatar } from "./Avatar";
import { ConfirmationModal } from "./ConfirmationModal";
import { Logo } from "./Logo";

export type MenuItem = {
	name: string;
	href: string;
	icon: React.ReactNode;
};

const iconClass = "size-[18px]";

export const menuItems: MenuItem[] = [
	{ name: "Dashboard", href: "/dashboard", icon: <FiGrid className={iconClass} /> },
];

/** Shortcuts to the widgets on the dashboard */
export const sectionItems: MenuItem[] = [
	{ name: "Performance", href: "/dashboard#performance", icon: <FiActivity className={iconClass} /> },
	{ name: "Market movers", href: "/dashboard#movers", icon: <FiBarChart2 className={iconClass} /> },
	{ name: "Allocation", href: "/dashboard#allocation", icon: <FiPieChart className={iconClass} /> },
	{ name: "Holdings", href: "/dashboard#holdings", icon: <FiList className={iconClass} /> },
];

interface ContentProps {
	/** Called after a link is followed, e.g. to close the mobile drawer */
	onNavigate?: () => void;
}

export const SidebarContent = ({ onNavigate }: ContentProps) => {
	const pathname = usePathname();
	const { user } = useAuth();
	const logout = useLogout();
	const [showLogoutModal, setShowLogoutModal] = useState(false);

	const linkClass = (active: boolean) =>
		`flex items-center gap-3 rounded-full px-4 py-2.5 text-sm font-medium transition-colors ${
			active
				? "bg-accent text-accent-foreground"
				: "text-muted-foreground hover:bg-surface-hover hover:text-foreground"
		}`;

	return (
		<div className="flex h-full flex-col gap-8 p-5">
			<Link href="/dashboard" onClick={onNavigate} className="rounded-xl px-1">
				<Logo />
			</Link>

			<nav aria-label="Main" className="flex flex-1 flex-col gap-6 overflow-y-auto">
				<ul className="flex flex-col gap-1">
					{menuItems.map((item) => {
						const active = pathname === item.href;
						return (
							<li key={item.href}>
								<Link
									href={item.href}
									onClick={onNavigate}
									aria-current={active ? "page" : undefined}
									className={linkClass(active)}
								>
									<span aria-hidden="true">{item.icon}</span>
									{item.name}
								</Link>
							</li>
						);
					})}
				</ul>

				<div>
					<p className="mb-2 px-4 text-xs font-medium tracking-wide text-muted-foreground uppercase">
						On this page
					</p>
					<ul className="flex flex-col gap-1">
						{sectionItems.map((item) => (
							<li key={item.href}>
								<Link href={item.href} onClick={onNavigate} className={linkClass(false)}>
									<span aria-hidden="true">{item.icon}</span>
									{item.name}
								</Link>
							</li>
						))}
					</ul>
				</div>
			</nav>

			{user && (
				<div className="flex items-center gap-3 rounded-2xl border border-border bg-surface-raised p-3">
					<Avatar fullname={user.fullName} tone="accent" />
					<div className="min-w-0 flex-1">
						<p className="truncate text-sm font-medium">{user.fullName}</p>
						<p className="truncate text-xs text-muted-foreground">{user.email}</p>
					</div>
					<button
						type="button"
						onClick={() => setShowLogoutModal(true)}
						aria-label="Log out"
						title="Log out"
						className="grid size-9 shrink-0 place-items-center rounded-full text-muted-foreground hover:bg-surface-hover hover:text-foreground"
					>
						<FiLogOut aria-hidden="true" className="size-4" />
					</button>
				</div>
			)}

			<ConfirmationModal
				open={showLogoutModal}
				title="Log out?"
				text="You will need to sign in again to access your dashboard."
				textYes="Log out"
				onOpenChange={setShowLogoutModal}
				onConfirm={logout}
			/>
		</div>
	);
};

/** Fixed sidebar for large screens */
export const Sidebar = () => (
	<aside className="sticky top-0 hidden h-dvh w-64 shrink-0 border-r border-border bg-surface lg:block">
		<SidebarContent />
	</aside>
);
