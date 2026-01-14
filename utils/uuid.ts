/**
 * UUID Utility Functions
 */

/**
 * Generate a UUID similar to object id used by mongodb
 * @returns string UUID
 */
export const generateUUID = (): string => {
	const timestamp = Math.floor(Date.now() / 1000)
		.toString(16)
		.padStart(8, "0");
	const randomBytes = Array.from({ length: 16 }, () =>
		Math.floor(Math.random() * 256)
			.toString(16)
			.padStart(2, "0")
	).join("");

	return timestamp + randomBytes;
};
