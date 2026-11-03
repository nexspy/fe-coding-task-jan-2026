import { FiAlertTriangle, FiRefreshCw } from "react-icons/fi";

/**
 * ErrorState
 *  - shown inside a card when its data fails to load
 *  - offers a retry so the user isn't stuck
 */

interface Props {
	message: string;
	onRetry?: () => void;
}

export const ErrorState = ({ message, onRetry }: Props) => (
	<div
		role="alert"
		className="flex flex-1 flex-col items-center justify-center gap-3 py-10 text-center"
	>
		<span className="grid size-11 place-items-center rounded-full bg-negative-soft text-negative">
			<FiAlertTriangle aria-hidden="true" className="size-5" />
		</span>
		<p className="text-sm text-muted-foreground">{message}</p>
		{onRetry && (
			<button
				type="button"
				onClick={onRetry}
				className="inline-flex items-center gap-2 rounded-full bg-pill px-4 py-2 text-sm font-semibold text-pill-foreground hover:opacity-90"
			>
				<FiRefreshCw aria-hidden="true" className="size-4" />
				Try again
			</button>
		)}
	</div>
);

/**
 * EmptyState
 *  - shown when a request succeeds but there is nothing to display
 */
export const EmptyState = ({ message }: { message: string }) => (
	<p className="flex flex-1 items-center justify-center py-10 text-center text-sm text-muted-foreground">
		{message}
	</p>
);
