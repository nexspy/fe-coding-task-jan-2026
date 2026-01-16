import { describe, it, expect, afterEach } from "vitest";
import { cleanup, render, screen } from "@testing-library/react";
import "@testing-library/jest-dom/vitest";

import { Tag } from "@/components/common/Tag";

describe("Tag Component", () => {
	afterEach(() => {
		cleanup();
	});

	it("render the children correctly", () => {
		render(<Tag>Test Tag</Tag>);

		const tagElement = screen.queryByText("Test Tag");
		expect(tagElement).toBeInTheDocument();
	});

	it("should fail if the children text do not match", () => {
		render(<Tag>Wrong Tag</Tag>);

		const tagElement = screen.queryByText("Test Tag");
		expect(tagElement).toBeNull();
	});
});
