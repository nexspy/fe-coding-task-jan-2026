/**
 * Tag Component
 *  - small rounded label, e.g. for asset classes
 */

interface Props {
	children: React.ReactNode;
	className?: string;
}

export const Tag = ({
	children,
	className = "bg-surface-raised text-muted-foreground",
}: Props) => {
	return (
		<span
			className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium whitespace-nowrap ${className}`}
		>
			{children}
		</span>
	);
};
