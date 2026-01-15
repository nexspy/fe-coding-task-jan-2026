"use client";

/**
 * Bottom component in sidebar menu that shows user info and logout option
 */

import { User } from "@/types/User";
import { RiLogoutBoxLine } from "react-icons/ri";

interface Props {
	user: User;
	onLogoutClick: () => void;
}

export const MenuBottom = ({ user, onLogoutClick }: Props) => {
	const userInitials = user
		? user.fullName
				.split(" ")
				.map((namePart) => namePart.charAt(0).toUpperCase())
				.join("")
		: "";
	return (
		<div className="p-4 border-t border-gray-800">
			<div className="flex items-center">
				<div className="w-10 h-10 rounded-full bg-gray-700 flex items-center justify-center">
					<span className="text-white font-semibold">
						{userInitials}
					</span>
				</div>
				<div className="ml-3 flex flex-col gap-1 text-foreground">
					<p className="text-sm font-medium ">{user?.fullName}</p>
					<p className="text-xs text-foreground">{user?.email}</p>
					<p className="flex items-center gap-1 text-sm ">
						<RiLogoutBoxLine />
						<button
							type="button"
							onClick={onLogoutClick}
							className="cursor-pointer"
						>
							Logout
						</button>
					</p>
				</div>
			</div>
		</div>
	);
};
