"use client";

import { useEffect, useId, useRef } from "react";

/**
 * Confirmation modal
 *  - accessible dialog: labelled, closes on Escape / backdrop click,
 *    moves focus inside on open and restores it on close
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
	const titleId = useId();
	const textId = useId();
	const cancelRef = useRef<HTMLButtonElement>(null);

	useEffect(() => {
		if (!open) return;

		const previouslyFocused = document.activeElement as HTMLElement | null;
		cancelRef.current?.focus();

		const onKeyDown = (event: KeyboardEvent) => {
			if (event.key === "Escape") onOpenChange(false);
		};
		document.addEventListener("keydown", onKeyDown);

		return () => {
			document.removeEventListener("keydown", onKeyDown);
			previouslyFocused?.focus();
		};
	}, [open, onOpenChange]);

	if (!open) return null;

	return (
		<div className="fixed inset-0 z-50 grid place-items-center p-4">
			<div
				aria-hidden="true"
				className="absolute inset-0 bg-black/60 backdrop-blur-sm"
				onClick={() => onOpenChange(false)}
			/>

			<div
				role="alertdialog"
				aria-modal="true"
				aria-labelledby={titleId}
				aria-describedby={textId}
				className="relative w-full max-w-sm rounded-3xl border border-border bg-surface p-6 shadow-card"
			>
				<h2 id={titleId} className="text-lg font-semibold">
					{title}
				</h2>
				<p id={textId} className="mt-2 text-sm text-muted-foreground">
					{text}
				</p>

				<div className="mt-6 flex justify-end gap-3">
					<button
						ref={cancelRef}
						type="button"
						onClick={() => onOpenChange(false)}
						className="rounded-full border border-border px-4 py-2 text-sm font-medium hover:bg-surface-hover"
					>
						{textNo}
					</button>
					<button
						type="button"
						onClick={onConfirm}
						className="rounded-full bg-pill px-4 py-2 text-sm font-semibold text-pill-foreground hover:opacity-90"
					>
						{textYes}
					</button>
				</div>
			</div>
		</div>
	);
}
