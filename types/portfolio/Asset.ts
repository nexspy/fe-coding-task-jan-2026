/**
 * Type: Asset
 *
 * Can belong to many positions.
 * Has many prices and can be of different types (stock, crypto, fiat).
 */

import { PriceInAsset } from "./Price";

export enum AssetType {
	STOCK = "Stock",
	CRYPTO = "Cryptocurrency",
	FLAT = "Flat",
}

export type Asset = {
	id: string;
	name: string;
	symbol: string; // e.g., BTC, ETH
	type: AssetType;

	prices?: string[]; // FK, price ids
};

export type AssetView = Omit<Asset, "prices"> & {
	prices: PriceInAsset[];
};
