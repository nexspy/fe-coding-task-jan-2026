// __tests__/components/AuthProvider.test.tsx
import { describe, it, expect, beforeEach, vi } from "vitest";
import { render, screen, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom/vitest";
import { AuthProvider, useAuth } from "@/components/AuthProvider";
import { AuthService } from "@/services/Auth.service";
import { User } from "@/types/User";

// Mock AuthService (replacing with fake implementations)
vi.mock("@/services/Auth.service", () => ({
	AuthService: {
		getCurrentUser: vi.fn(),
		logout: vi.fn(),
	},
}));

describe("AuthProvider Component", () => {
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
		// resets all mock calls before each test
		vi.clearAllMocks();
	});

	it("should provide user from localStorage on mount", async () => {
		// returns mock user when getCurrentUser is called
		vi.mocked(AuthService.getCurrentUser).mockReturnValue(mockUser);

		// Test component to consume AuthProvider context
		const TestComponent = () => {
			const { user } = useAuth();
			return <div>{user ? user.fullName : "No user"}</div>;
		};

		render(
			<AuthProvider>
				<TestComponent />
			</AuthProvider>,
		);

		// wait for the component to update with user data
		await waitFor(() => {
			expect(screen.getByText("John Doe")).toBeInTheDocument();
		});
	});

	it("should provide null user when not authenticated", async () => {
		vi.mocked(AuthService.getCurrentUser).mockReturnValue(null);

		const TestComponent = () => {
			const { user } = useAuth();
			return <div>{user ? user.fullName : "No user"}</div>;
		};

		render(
			<AuthProvider>
				<TestComponent />
			</AuthProvider>,
		);

		await waitFor(() => {
			expect(screen.getByText("No user")).toBeInTheDocument();
		});
	});
});
