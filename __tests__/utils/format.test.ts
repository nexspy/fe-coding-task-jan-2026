import { describe, it, expect } from "vitest";

import {
	formatCompactCurrency,
	formatCurrency,
	formatPercent,
	formatSignedCurrency,
} from "@/utils/format";

describe("format utils", () => {
	it("formats USD amounts", () => {
		expect(formatCurrency(1234.5)).toBe("$1,234.50");
		expect(formatCompactCurrency(125_400)).toBe("$125.4K");
	});

	it("adds a sign to changes", () => {
		expect(formatPercent(4.236)).toBe("+4.24%");
		expect(formatPercent(-1)).toBe("-1.00%");
		expect(formatPercent(0)).toBe("0.00%");
		expect(formatSignedCurrency(120.5)).toBe("+$120.50");
		expect(formatSignedCurrency(-3)).toBe("-$3.00");
	});
});
