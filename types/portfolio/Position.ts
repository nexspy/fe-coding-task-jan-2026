/**
 * Type : Position
 *
 * Belongs to one portfolio and one asset.
 */

export type Position = {
	id: string;

	asset: string; // FK, asset id
	quantity: number;
	price: number;
	asOf: Date;
};
