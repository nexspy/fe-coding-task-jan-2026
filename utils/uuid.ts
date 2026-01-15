/**
 * UUID Utility Functions
 */

/**
 * Generate a UUID similar to object id used by mongodb
 * @returns string UUID
 */
export const generateUUID = (): string => {
	return crypto.randomUUID();
};
