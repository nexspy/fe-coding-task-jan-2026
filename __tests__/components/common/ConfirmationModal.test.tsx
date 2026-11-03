import { describe, it, expect, vi, afterEach } from "vitest";
import { cleanup, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import "@testing-library/jest-dom/vitest";

import { ConfirmationModal } from "@/components/common/ConfirmationModal";

const renderModal = (onOpenChange = vi.fn(), onConfirm = vi.fn()) =>
	render(
		// rendered inside a sticky container, like the sidebar
		<aside data-testid="sidebar" style={{ position: "sticky" }}>
			<ConfirmationModal
				open
				title="Log out?"
				text="You will need to sign in again."
				textYes="Log out"
				onOpenChange={onOpenChange}
				onConfirm={onConfirm}
			/>
		</aside>,
	);

describe("ConfirmationModal", () => {
	afterEach(cleanup);

	it("renders on <body>, outside its parent's stacking context", () => {
		renderModal();

		const dialog = screen.getByRole("alertdialog", { name: "Log out?" });
		expect(screen.getByTestId("sidebar")).not.toContainElement(dialog);
		expect(dialog).toHaveAccessibleDescription("You will need to sign in again.");
	});

	it("focuses cancel, closes on Escape and confirms", async () => {
		const onOpenChange = vi.fn();
		const onConfirm = vi.fn();
		renderModal(onOpenChange, onConfirm);

		expect(screen.getByRole("button", { name: "Cancel" })).toHaveFocus();

		await userEvent.keyboard("{Escape}");
		expect(onOpenChange).toHaveBeenCalledWith(false);

		await userEvent.click(screen.getByRole("button", { name: "Log out" }));
		expect(onConfirm).toHaveBeenCalledOnce();
	});
});
