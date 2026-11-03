import { ReactNode, useId } from "react";

/**
 * Card
 *  - the base surface for every dashboard widget
 *  - renders a labelled <section> so screen readers can jump between widgets
 */

interface Props {
	title: string;
	/** Optional line under the title */
	description?: ReactNode;
	/** Controls shown on the right of the header (tabs, links, ...) */
	actions?: ReactNode;
	id?: string;
	className?: string;
	children: ReactNode;
}

export const Card = ({
	title,
	description,
	actions,
	id,
	className = "",
	children,
}: Props) => {
	const headingId = useId();

	return (
		<section
			id={id}
			aria-labelledby={headingId}
			className={`flex h-full min-w-0 scroll-mt-24 flex-col rounded-3xl border border-border bg-surface p-5 shadow-card sm:p-6 ${className}`}
		>
			<header className="mb-5 flex flex-wrap items-start justify-between gap-3">
				<div className="min-w-0">
					<h2 id={headingId} className="text-base font-semibold">
						{title}
					</h2>
					{description && (
						<p className="mt-0.5 text-sm text-muted-foreground">
							{description}
						</p>
					)}
				</div>
				{actions}
			</header>
			<div className="flex min-h-0 flex-1 flex-col">{children}</div>
		</section>
	);
};
