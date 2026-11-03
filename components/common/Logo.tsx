/**
 * Logo
 *  - brand mark + word mark; colours come from the theme tokens
 */

interface Props {
	name?: string;
	/** Use on accent-coloured backgrounds */
	inverted?: boolean;
}

export const Logo = ({ name = "FlowVest", inverted = false }: Props) => (
	<span className="flex items-center gap-2.5">
		<span
			aria-hidden="true"
			className={`grid size-9 place-items-center rounded-xl ${
				inverted ? "bg-accent-foreground text-accent" : "bg-accent text-accent-foreground"
			}`}
		>
			<svg viewBox="0 0 24 24" className="size-5" fill="none">
				<path
					d="M4 16.5 9 11l3.5 3.5L20 7"
					stroke="currentColor"
					strokeWidth="2.4"
					strokeLinecap="round"
					strokeLinejoin="round"
				/>
				<path
					d="M15 7h5v5"
					stroke="currentColor"
					strokeWidth="2.4"
					strokeLinecap="round"
					strokeLinejoin="round"
				/>
			</svg>
		</span>
		<span className="text-lg font-semibold tracking-tight">{name}</span>
	</span>
);
