import { User } from "@/types/User";

export class AuthService {
	private static readonly CURRENT_USER_KEY = "currentUser";

	/**
	 * Get currently logged in user
	 * @returns User
	 */
	static getCurrentUser(): User | null {
		const user = localStorage.getItem(this.CURRENT_USER_KEY);
		return user ? JSON.parse(user) : null;
	}

	/**
	 * Save current user to local storage
	 * @param User
	 */
	static saveCurrentUser(user: User): User {
		localStorage.setItem(this.CURRENT_USER_KEY, JSON.stringify(user));
		return user;
	}

	/**
	 * Remove current user from local storage
	 */
	static removeCurrentUser(): void {
		localStorage.removeItem(this.CURRENT_USER_KEY);
	}

	/**
	 * Check if user is authenticated
	 * @returns boolean
	 */
	static isAuthenticated(): boolean {
		return this.getCurrentUser() !== null;
	}
}
