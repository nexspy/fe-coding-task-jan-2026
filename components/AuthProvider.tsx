"use client";

/**
 * Context provider for authentication
 */

import {
	createContext,
	useContext,
	useState,
	useEffect,
	ReactNode,
} from "react";
import { User } from "@/types/User";
import { AuthService } from "@/services/Auth.service";

interface AuthContextType {
	user: User | null;
	setUser: (user: User | null) => void;
	logout: () => void;
}

// Create the AuthContext
const AuthContext = createContext<AuthContextType | undefined>(undefined);

/**
 * Custom hook to use the AuthContext
 */
export const useAuth = () => {
	const context = useContext(AuthContext);
	if (!context) {
		throw new Error("useAuth must be used within AuthProvider");
	}
	return context;
};

/**
 * AuthProvider component
 */
export const AuthProvider = ({ children }: { children: ReactNode }) => {
	const [user, setUser] = useState<User | null>(null);

	useEffect(() => {
		const currentUser = AuthService.getCurrentUser();
		setUser(currentUser);
	}, []);

	const logout = () => {
		AuthService.logout();
		setUser(null);
	};

	return (
		<AuthContext.Provider value={{ user, setUser, logout }}>
			{children}
		</AuthContext.Provider>
	);
};
