"use client";

/**
 * SegmentedControl
 *  - a row of pill buttons where exactly one is selected
 *  - used for chart ranges and view toggles
 *  - each option is a toggle button (aria-pressed) inside a labelled group
 */

export type SegmentedOption<T extends string> = {
	value: T;
	label: string;
};

interface Props<T extends string> {
	label: string;
	options: SegmentedOption<T>[];
	value: T;
	onChange: (value: T) => void;
	size?: "sm" | "md";
}

export function SegmentedControl<T extends string>({
	label,
	options,
	value,
	onChange,
	size = "sm",
}: Props<T>) {
	const padding = size === "sm" ? "px-3 py-1.5 text-xs" : "px-4 py-2 text-sm";

	return (
		<div
			role="group"
			aria-label={label}
			className="inline-flex shrink-0 gap-1 rounded-full border border-border bg-surface-raised p-1"
		>
			{options.map((option) => {
				const selected = option.value === value;
				return (
					<button
						key={option.value}
						type="button"
						aria-pressed={selected}
						onClick={() => onChange(option.value)}
						className={`rounded-full font-medium transition-colors ${padding} ${
							selected
								? "bg-pill text-pill-foreground"
								: "text-muted-foreground hover:bg-surface-hover hover:text-foreground"
						}`}
					>
						{option.label}
					</button>
				);
			})}
		</div>
	);
}
