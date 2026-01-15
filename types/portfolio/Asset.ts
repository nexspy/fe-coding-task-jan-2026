/**
 * Type: Asset
 *
 * Can belong to many positions.
 * Has many prices and can be of different types (stock, crypto, fiat).
 */

export enum AssetType {
	STOCK = "stock",
	CRYPTO = "cryptocurrency",
	FLAT = "fiat",
}

export type Asset = {
	id: string;
	name: string;
	symbol: string; // e.g., BTC, ETH
	type: AssetType;

	prices?: string[]; // FK, price ids
};
