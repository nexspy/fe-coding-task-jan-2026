import { FiArrowDownRight, FiArrowUpRight } from "react-icons/fi";

import { formatPercent } from "@/utils/format";

/**
 * ChangeBadge
 *  - shows a percentage change with colour AND an arrow/sign, so the
 *    direction is never conveyed by colour alone
 */

interface Props {
	value: number;
	/**
	 * "pill" has a tinted background, "text" is inline,
	 * "inverse" is for use on an accent-coloured surface
	 */
	variant?: "pill" | "text" | "inverse";
	className?: string;
}

export const ChangeBadge = ({
	value,
	variant = "pill",
	className = "",
}: Props) => {
	const isUp = value >= 0;
	const Icon = isUp ? FiArrowUpRight : FiArrowDownRight;
	const styles = {
		pill: `rounded-full px-2 py-0.5 ${isUp ? "bg-positive-soft text-positive" : "bg-negative-soft text-negative"}`,
		text: isUp ? "text-positive" : "text-negative",
		inverse: "rounded-full px-2 py-0.5 bg-accent-foreground text-accent",
	}[variant];

	return (
		<span
			className={`inline-flex items-center gap-0.5 text-xs font-semibold whitespace-nowrap ${styles} ${className}`}
		>
			<Icon aria-hidden="true" className="size-3.5" />
			<span className="sr-only">{isUp ? "Up" : "Down"} </span>
			{formatPercent(value)}
		</span>
	);
};
