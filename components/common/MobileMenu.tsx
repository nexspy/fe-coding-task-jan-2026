"use client";

import { useMemo, useState } from "react";
import { HiMenuAlt3 } from "react-icons/hi";
import { IoClose } from "react-icons/io5";
import { MenuItem, menuItems } from "./Sidebar";
import { usePathname, useRouter } from "next/navigation";
import Link from "next/link";
import { useAuth } from "../AuthProvider";
import { RiLogoutBoxLine } from "react-icons/ri";
import { AuthService } from "@/services/Auth.service";
import { ConfirmationModal } from "./ConfirmationModal";
import { MenuBottom } from "./MenuBottom";

export const MobileMenu = () => {
	const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

	return (
		<div>
			<button
				onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
				className="md:hidden fixed top-4 right-4 z-50 p-2 rounded-lg burger-menu"
			>
				{isMobileMenuOpen ? (
					<IoClose size={24} color="black" />
				) : (
					<HiMenuAlt3 size={24} color="black" />
				)}
			</button>

			<MobileMenuNav isMobileMenuOpen={isMobileMenuOpen} />
		</div>
	);
};

interface MenuProps {
	isMobileMenuOpen: boolean;
}

const MobileMenuNav = ({ isMobileMenuOpen }: MenuProps) => {
	const pathname = usePathname();
	const router = useRouter();
	const { user } = useAuth();

	const [showLogoutModal, setShowLogoutModal] = useState(false);

	// use for avatar initials
	const userInitials = useMemo(() => {
		return user
			? user.fullName
					.split(" ")
					.map((namePart) => namePart.charAt(0).toUpperCase())
					.join("")
			: "";
	}, [user]);

	// logout user using the service class
	const logoutUser = () => {
		try {
			AuthService.logout();
			// redirect to login page
			router.push("/");
		} catch (error) {
			console.error("Logout failed:", error);
		}
		setShowLogoutModal(false);
	};

	const handleLogoutClick = () => {
		setShowLogoutModal(true);
	};

	return (
		<>
			{/* Overlay */}
			{isMobileMenuOpen && (
				<div className="md:hidden fixed inset-0 bg-black bg-opacity-50 z-40 opacity-70" />
			)}

			{/* Sidebar for small devices */}
			<div
				className={`flex flex-col md:hidden fixed inset-y-0 left-0 w-64 bg-sidebar z-50 mobile-menu-slide ${
					isMobileMenuOpen ? "open" : ""
				}`}
			>
				{/* Logo */}
				<div className="flex items-center justify-center h-16 gap-2 bg-logo">
					<img
						src="/images/vega.png"
						alt="Vega Logo"
						className="w-10"
					/>
					<h1 className="text-xl font-bold">Vega</h1>
				</div>

				{/* Navigation */}
				<nav className="flex-1 px-4 py-6 space-y-2 overflow-y-auto">
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
				{user && (
					<MenuBottom user={user} onLogoutClick={handleLogoutClick} />
				)}
			</div>

			{/* Logout modal */}
			{showLogoutModal && (
				<ConfirmationModal
					open={showLogoutModal}
					title="Logout"
					text={
						"Do you want to logout? You will need to sign in again to access your dashboard."
					}
					textYes={"Logout"}
					onOpenChange={setShowLogoutModal}
					onConfirm={logoutUser}
				/>
			)}
		</>
	);
};
