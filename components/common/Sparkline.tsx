/**
 * Sparkline
 *  - a tiny decorative SVG trend line for stat cards
 *  - hidden from screen readers; the card states the numbers in text
 */

interface Props {
	values: number[];
	/** Any CSS colour, e.g. "var(--positive)" */
	color?: string;
	className?: string;
}

const WIDTH = 120;
const HEIGHT = 40;
const PAD = 2;

export const Sparkline = ({
	values,
	color = "var(--accent)",
	className = "",
}: Props) => {
	if (values.length < 2) return null;

	const min = Math.min(...values);
	const max = Math.max(...values);
	const range = max - min || 1;

	const points = values.map((value, i) => {
		const x = (i / (values.length - 1)) * WIDTH;
		const y = PAD + (1 - (value - min) / range) * (HEIGHT - PAD * 2);
		return [x, y] as const;
	});

	const line = points
		.map(([x, y], i) => `${i === 0 ? "M" : "L"}${x.toFixed(1)},${y.toFixed(1)}`)
		.join(" ");
	const area = `${line} L${WIDTH},${HEIGHT} L0,${HEIGHT} Z`;

	return (
		<svg
			viewBox={`0 0 ${WIDTH} ${HEIGHT}`}
			preserveAspectRatio="none"
			aria-hidden="true"
			focusable="false"
			className={className}
		>
			<path d={area} fill={color} opacity={0.12} />
			<path
				d={line}
				fill="none"
				stroke={color}
				strokeWidth={1.75}
				strokeLinecap="round"
				strokeLinejoin="round"
				vectorEffect="non-scaling-stroke"
			/>
		</svg>
	);
};
