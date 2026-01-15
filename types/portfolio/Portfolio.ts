/**
 * Type: Portfolio
 *
 * Belongs to one company and has many positions.
 */
import { PositionView } from "./Position";

export type PortfolioBase = {
	id: string;
	name: string; // e.g., "Retirement Fund"
	asOf: Date; // when the portfolio was last updated

	positions: string[]; // FK, position ids
};

// use this for creating portfolio (like in creating new user, add default portfolio for that company)
export type PortfolioCreatePayload = Omit<PortfolioBase, "id" | "asOf">;

// used in views
export type Portfolio = Omit<PortfolioBase, "positions"> & {
	positions: PositionView[];
};
