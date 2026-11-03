"use client";

/**
 * Mobile navigation drawer (below the lg breakpoint)
 *  - modal dialog with Escape to close, focus moved in and restored,
 *    and page scroll locked while open
 *  - rendered in a portal: the sticky top bar uses backdrop-filter, which
 *    would otherwise become the containing block for the fixed overlay
 */
import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { FiMenu, FiX } from "react-icons/fi";

import { SidebarContent } from "./Sidebar";

const DRAWER_ID = "mobile-navigation";

export const MobileNav = () => {
	const [open, setOpen] = useState(false);
	const closeRef = useRef<HTMLButtonElement>(null);
	const triggerRef = useRef<HTMLButtonElement>(null);

	useEffect(() => {
		if (!open) return;

		const trigger = triggerRef.current;
		closeRef.current?.focus();
		document.body.style.overflow = "hidden";

		const onKeyDown = (event: KeyboardEvent) => {
			if (event.key === "Escape") setOpen(false);
		};
		document.addEventListener("keydown", onKeyDown);

		return () => {
			document.body.style.overflow = "";
			document.removeEventListener("keydown", onKeyDown);
			trigger?.focus();
		};
	}, [open]);

	return (
		<>
			<button
				ref={triggerRef}
				type="button"
				onClick={() => setOpen(true)}
				aria-label="Open navigation"
				aria-expanded={open}
				aria-controls={DRAWER_ID}
				className="grid size-10 place-items-center rounded-full border border-border bg-surface hover:bg-surface-hover lg:hidden"
			>
				<FiMenu aria-hidden="true" className="size-5" />
			</button>

			{open &&
				createPortal(
				<div className="fixed inset-0 z-40 lg:hidden">
					<div
						aria-hidden="true"
						className="absolute inset-0 bg-black/60 backdrop-blur-sm"
						onClick={() => setOpen(false)}
					/>
					<div
						id={DRAWER_ID}
						role="dialog"
						aria-modal="true"
						aria-label="Navigation"
						className="absolute inset-y-0 left-0 w-72 max-w-[85vw] border-r border-border bg-surface"
					>
						<button
							ref={closeRef}
							type="button"
							onClick={() => setOpen(false)}
							aria-label="Close navigation"
							className="absolute top-5 right-4 grid size-9 place-items-center rounded-full hover:bg-surface-hover"
						>
							<FiX aria-hidden="true" className="size-5" />
						</button>
						<SidebarContent onNavigate={() => setOpen(false)} />
					</div>
				</div>,
				document.body,
			)}
		</>
	);
};
