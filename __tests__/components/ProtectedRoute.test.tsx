// __tests__/components/ProtectedRoute.test.tsx
import { describe, it, expect, beforeEach, vi } from "vitest";
import { render, screen, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom/vitest";
import ProtectedRoute from "@/components/ProtectedRoute";
import { AuthService } from "@/services/Auth.service";

// Mock next/navigation
const mockPush = vi.fn();

// Mocking useRouter to return an object with push method
vi.mock("next/navigation", () => ({
	useRouter: () => ({
		push: mockPush,
	}),
}));

// Mock AuthService
vi.mock("@/services/Auth.service", () => ({
	AuthService: {
		isAuthenticated: vi.fn(),
		getCurrentUser: vi.fn(),
	},
}));

// Mock AuthProvider
vi.mock("@/components/AuthProvider", () => ({
	AuthProvider: ({ children }: { children: React.ReactNode }) => (
		<div data-testid="auth-provider">{children}</div>
	),
}));

describe("ProtectedRoute", () => {
	beforeEach(() => {
		// resets all mock calls before each test
		vi.clearAllMocks();
	});

	it("should redirect to home when user is not authenticated", async () => {
		vi.mocked(AuthService.isAuthenticated).mockReturnValue(false);

		render(
			<ProtectedRoute>
				<div>Protected Content</div>
			</ProtectedRoute>
		);

		await waitFor(() => {
			// mockPush (fake router.push function) should be called with "/"
			expect(mockPush).toHaveBeenCalledWith("/");
		});
	});

	it("should render children when authenticated", async () => {
		vi.mocked(AuthService.isAuthenticated).mockReturnValue(true);

		render(
			<ProtectedRoute>
				<div>Protected Content</div>
			</ProtectedRoute>
		);

		await waitFor(() => {
			expect(screen.getByText("Protected Content")).toBeInTheDocument();
		});
	});
});
