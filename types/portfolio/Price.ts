/**
 * Type: Price
 *
 * Belongs to one asset.
 */

import { Asset } from "./Asset";

export type Price = {
	id: string;
	asset: string; // FK, asset id
	price: number;
};

// use for viewing prices with asset details
export type PriceView = Omit<Price, "asset"> & {
	asset: Omit<Asset, "prices">;
};

// use for viewing prices with asset details (prices are removed from the asset to avoid circular ref)
export type PriceInAsset = Omit<Price, "asset">;
