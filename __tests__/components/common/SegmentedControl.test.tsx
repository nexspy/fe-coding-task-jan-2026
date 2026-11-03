import { describe, it, expect, vi, afterEach } from "vitest";
import { cleanup, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import "@testing-library/jest-dom/vitest";

import { SegmentedControl } from "@/components/common/SegmentedControl";

const options = [
	{ value: "class", label: "By class" },
	{ value: "asset", label: "By asset" },
];

describe("SegmentedControl", () => {
	afterEach(cleanup);

	it("marks the selected option as pressed", () => {
		render(
			<SegmentedControl label="Group" options={options} value="class" onChange={() => {}} />,
		);

		expect(screen.getByRole("group", { name: "Group" })).toBeInTheDocument();
		expect(screen.getByRole("button", { name: "By class" })).toHaveAttribute("aria-pressed", "true");
		expect(screen.getByRole("button", { name: "By asset" })).toHaveAttribute("aria-pressed", "false");
	});

	it("calls onChange with the clicked value", async () => {
		const onChange = vi.fn();
		render(
			<SegmentedControl label="Group" options={options} value="class" onChange={onChange} />,
		);

		await userEvent.click(screen.getByRole("button", { name: "By asset" }));

		expect(onChange).toHaveBeenCalledWith("asset");
	});
});
