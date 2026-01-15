"use client";
/**
 * Sidebar component
 * @returns
 */
import Link from "next/link";
import { FaHome } from "react-icons/fa";
import { RiLogoutBoxLine } from "react-icons/ri";
import { usePathname, useRouter } from "next/navigation";

import { AuthService } from "@/services/Auth.service";
import { useAuth } from "@/components/AuthProvider";
import { useMemo } from "react";

type MenuItem = {
	name: string;
	route: string;
	icon: React.ReactNode;
};

export const Sidebar = () => {
	const router = useRouter();
	const pathname = usePathname();
	const { user } = useAuth();

	const menuItems: MenuItem[] = [
		{ name: "Dashboard", route: "/dashboard", icon: <FaHome /> },
	];

	// use for avatar initials
	const userInitials = useMemo(() => {
		return user
			? user.fullName
					.split(" ")
					.map((namePart) => namePart.charAt(0).toUpperCase())
					.join("")
			: "";
	}, [user]);

	const handleLogoutClick = () => {
		try {
			AuthService.logout();

			// redirect to login page
			router.push("/");
		} catch (error) {
			console.error("Logout failed:", error);
		}
	};

	return (
		<div className="hidden md:flex flex-col w-64 bg-sidebar">
			{/* Logo */}
			<div className="flex items-center justify-center h-16 gap-2 bg-gray-400">
				<img
					src={"/images/vega.png"}
					alt="Vega Logo"
					className="w-10"
				/>
				<h1 className=" text-xl font-bold">Vega</h1>
			</div>

			{/* Navigation */}
			<nav className="flex-1 px-4 py-6 space-y-2">
				{menuItems.map((item: MenuItem) => {
					const isActive = pathname === item.route;
					return (
						<Link
							key={item.name}
							href={item.route}
							className={`flex items-center px-4 py-3 rounded-lg transition-colors gap-2 ${
								isActive
									? "bg-gray-200 active-menu"
									: "text-gray-400 hover:bg-gray-800 hover:text-white"
							}`}
						>
							{item.icon}
							<span className="font-medium">{item.name}</span>
						</Link>
					);
				})}
			</nav>

			{/* User Profile & Logout */}
			<div className="p-4 border-t border-gray-800">
				<div className="flex items-center">
					<div className="w-10 h-10 rounded-full bg-gray-700 flex items-center justify-center">
						<span className="text-white font-semibold">
							{userInitials}
						</span>
					</div>
					<div className="ml-3 flex flex-col gap-1">
						<p className="text-sm font-medium ">{user?.fullName}</p>
						<p className="text-xs text-gray-800">{user?.email}</p>
						<p className="flex items-center gap-1 text-sm">
							<RiLogoutBoxLine />
							<button
								type="button"
								onClick={handleLogoutClick}
								className="cursor-pointer"
							>
								Logout
							</button>
						</p>
					</div>
				</div>
			</div>
		</div>
	);
};
