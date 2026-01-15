/**
 * Type: Price
 *
 * Belongs to one asset.
 */

export type Price = {
	id: string;
	asset: string; // FK, asset id
	price: number;
};
