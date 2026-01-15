"use client";

/**
 * A box component to wrap dashboard items
 *  - added padding, border, and rounded corners
 */

export const ItemBox = ({ children }: { children: React.ReactNode }) => {
	return (
		<div className="rounded-lg p-4 border border-dashed border-secondary min-h-48">
			{children}
		</div>
	);
};
