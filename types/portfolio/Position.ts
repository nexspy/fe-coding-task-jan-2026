/**
 * Type : Position
 *
 * Belongs to one portfolio and one asset.
 */

import { AssetView } from "./Asset";

export type Position = {
	id: string;

	asset: string; // FK, asset id
	quantity: number;
	price: number;
	asOf: Date;
};

export type PositionCreatePayload = Omit<Position, "id" | "asOf">;

// preload asset details for views
export type PositionView = Omit<Position, "asset"> & {
	asset: AssetView;
};
