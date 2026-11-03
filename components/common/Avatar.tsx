/**
 * Avatar Component
 *  - displays initials based on the fullname prop
 */

interface Props {
	fullname: string;
	size?: "sm" | "md";
	/** "accent" for the current user, "neutral" for assets */
	tone?: "accent" | "neutral";
}

export const getInitials = (fullname: string) =>
	fullname
		.split(" ")
		.filter(Boolean)
		.map((name) => name.charAt(0).toUpperCase())
		.join("")
		.slice(0, 2);

export const Avatar = ({ fullname, size = "md", tone = "neutral" }: Props) => {
	const sizes = size === "sm" ? "size-8 text-xs" : "size-10 text-sm";
	const tones =
		tone === "accent"
			? "bg-accent text-accent-foreground"
			: "bg-surface-raised text-foreground border border-border";

	return (
		<span
			aria-hidden="true"
			className={`grid shrink-0 place-items-center rounded-full font-semibold ${sizes} ${tones}`}
		>
			{getInitials(fullname)}
		</span>
	);
};
