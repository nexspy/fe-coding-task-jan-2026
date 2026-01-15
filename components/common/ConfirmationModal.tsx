"use client";

/**
 * Confirmation modal
 */

interface Props {
	open: boolean;
	title: string;
	text: string;
	textYes?: string;
	textNo?: string;
	onOpenChange: (open: boolean) => void;
	onConfirm: () => void;
}

export function ConfirmationModal({
	open,
	title,
	text,
	textYes = "Ok",
	textNo = "Cancel",
	onOpenChange,
	onConfirm,
}: Props) {
	if (!open) return null;

	return (
		<>
			<div
				className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm"
				onClick={() => onOpenChange(false)}
			/>

			<div className="fixed left-1/2 top-1/2 z-50 w-full max-w-md -translate-x-1/2 -translate-y-1/2 rounded-lg border border-border bg-background p-6 shadow-lg">
				<div className="space-y-4">
					{/* Header */}
					<div className="space-y-2">
						<h2 className="text-lg font-semibold text-foreground">
							{title}
						</h2>
						<p className="text-sm text-muted-foreground">{text}</p>
					</div>

					{/* Footer buttons */}
					<div className="flex justify-end gap-3">
						<button
							onClick={() => onOpenChange(false)}
							className="cursor-pointer rounded-md border border-input bg-background px-4 py-2 text-sm font-medium text-foreground transition-colors hover:bg-accent hover:text-accent-foreground"
						>
							{textNo}
						</button>
						<button
							onClick={onConfirm}
							className="cursor-pointer rounded-md bg-destructive px-4 py-2 text-sm font-medium text-destructive-foreground transition-colors hover:bg-destructive/90"
						>
							{textYes}
						</button>
					</div>
				</div>
			</div>
		</>
	);
}
