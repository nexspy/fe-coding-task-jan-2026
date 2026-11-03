"use client";

/**
 * A button to toggle between the dark (default) and light themes.
 *  - the choice is persisted in localStorage
 *  - an inline script in the root layout applies it before first paint,
 *    so there is no flash of the wrong theme
 */

import { useEffect, useState } from "react";
import { FiMoon, FiSun } from "react-icons/fi";

export enum ThemeMode {
	Light = "light",
	Dark = "dark",
}

export const THEME_STORAGE_KEY = "theme";

export function ThemeToggle() {
	const [theme, setTheme] = useState<ThemeMode>(ThemeMode.Dark);

	useEffect(() => {
		setTheme(
			document.documentElement.classList.contains(ThemeMode.Light)
				? ThemeMode.Light
				: ThemeMode.Dark,
		);
	}, []);

	const toggleTheme = () => {
		const next = theme === ThemeMode.Dark ? ThemeMode.Light : ThemeMode.Dark;
		setTheme(next);
		document.documentElement.classList.toggle(
			ThemeMode.Light,
			next === ThemeMode.Light,
		);
		try {
			localStorage.setItem(THEME_STORAGE_KEY, next);
		} catch {
			// storage can be unavailable (private mode); the toggle still works
		}
	};

	const nextLabel = theme === ThemeMode.Dark ? "light" : "dark";

	return (
		<button
			type="button"
			onClick={toggleTheme}
			aria-label={`Switch to ${nextLabel} theme`}
			title={`Switch to ${nextLabel} theme`}
			className="grid size-10 place-items-center rounded-full border border-border bg-surface text-foreground hover:bg-surface-hover"
		>
			{theme === ThemeMode.Dark ? (
				<FiSun aria-hidden="true" className="size-[18px]" />
			) : (
				<FiMoon aria-hidden="true" className="size-[18px]" />
			)}
		</button>
	);
}
