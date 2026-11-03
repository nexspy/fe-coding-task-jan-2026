// __tests__/services/Auth.service.test.ts
import { describe, it, expect, beforeEach } from "vitest";
import { AuthService } from "@/services/Auth.service";
import { User } from "@/types/User";

describe("AuthService", () => {
	// test user object
	const mockUser: User = {
		id: "123",
		fullName: "John Doe",
		email: "john@example.com",
		password: "hashedpassword",
		company: {
			id: "1",
			name: "Test Company",
			createdAt: "2026-01-01",
			portfolios: [],
		},
		createdAt: "2026-01-01",
		updatedAt: "2026-01-01",
	};

	beforeEach(() => {
		// Clear localStorage before each test
		localStorage.clear();
	});

	describe("saveCurrentUser()", () => {
		it("should save user to localStorage", () => {
			const result = AuthService.saveCurrentUser(mockUser);

			expect(result).toEqual(mockUser);

			// check value from local storage
			const stored = localStorage.getItem("currentUser");
			expect(stored).toBeTruthy();
			expect(JSON.parse(stored!)).toEqual(mockUser);
		});

		it("should overwrite existing user", () => {
			AuthService.saveCurrentUser(mockUser);

			const newUser = { ...mockUser, fullName: "Jane Doe" };
			AuthService.saveCurrentUser(newUser);

			const stored = localStorage.getItem("currentUser");
			expect(JSON.parse(stored!).fullName).toBe("Jane Doe");
		});
	});

	describe("isAuthenticated", () => {
		it("should return true when user is stored", () => {
			// set mock user as currentUser
			localStorage.setItem("currentUser", JSON.stringify(mockUser));

			// check if authenticated returns true
			expect(AuthService.isAuthenticated()).toBe(true);
		});

		it("should return false when no user is stored", () => {
			expect(AuthService.isAuthenticated()).toBe(false);
		});
	});

	describe("logout", () => {
		it("should remove current user from localStorage", () => {
			// get current user from local storage
			localStorage.setItem("currentUser", JSON.stringify(mockUser));

			// logout user
			AuthService.logout();

			// now current user should be null
			expect(localStorage.getItem("currentUser")).toBeNull();
			expect(AuthService.isAuthenticated()).toBe(false);
		});
	});
});
