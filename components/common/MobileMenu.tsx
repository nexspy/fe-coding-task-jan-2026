"use client";

import { useState } from "react";
import { HiMenuAlt3 } from "react-icons/hi";
import { IoClose } from "react-icons/io5";
import { MenuItem, menuItems } from "./Sidebar";
import { usePathname, useRouter } from "next/navigation";
import Link from "next/link";
import { useAuth } from "../AuthProvider";
import { AuthService } from "@/services/Auth.service";
import { ConfirmationModal } from "./ConfirmationModal";
import { MenuBottom } from "./MenuBottom";

export const MobileMenu = () => {
	const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

	return (
		<div>
			<div className="relative z-50">
				<button
					onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
					className="md:hidden p-2 rounded-lg burger-menu"
				>
					{isMobileMenuOpen ? (
						<IoClose size={24} className="text-foreground" />
					) : (
						<HiMenuAlt3 size={24} className="text-foreground" />
					)}
				</button>
			</div>

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
				<div className="md:hidden fixed inset-0 bg-black bg-opacity-50 z-30 opacity-30" />
			)}

			{/* Sidebar for small devices */}
			<div
				className={`flex flex-col md:hidden fixed inset-y-0 left-0 w-64 bg-sidebar z-40 mobile-menu-slide ${
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
