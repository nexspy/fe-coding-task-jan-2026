/**
 * Avatar Component
 *  - displays user initials based on fullname prop
 */

interface Props {
	fullname: string;
}

export const Avatar = ({ fullname }: Props) => {
	const initials = fullname
		.split(" ")
		.map((name) => name.charAt(0).toUpperCase())
		.join("")
		.slice(0, 2);

	return (
		<div className="w-10 h-10 rounded-full bg-foreground flex items-center justify-center text-background font-bold">
			{initials}
		</div>
	);
};
