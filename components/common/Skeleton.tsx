/**
 * Skeleton
 *  - placeholder block shown while data loads
 */

export const Skeleton = ({ className = "" }: { className?: string }) => (
	<div
		aria-hidden="true"
		className={`animate-pulse rounded-xl bg-surface-raised ${className}`}
	/>
);

/**
 * LoadingState
 *  - announces loading to assistive tech and shows skeleton content
 */
export const LoadingState = ({
	label,
	children,
}: {
	label: string;
	children: React.ReactNode;
}) => (
	<div role="status" aria-busy="true" className="flex flex-1 flex-col">
		<span className="sr-only">{label}</span>
		{children}
	</div>
);
