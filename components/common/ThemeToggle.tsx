"use client";

/**
 * A button to toggle between light and dark themes.
 * - we use localStorage to persist the user's theme preference.
 **/

import { useEffect, useState } from "react";
import { MdOutlineDarkMode } from "react-icons/md";
import { FiSun } from "react-icons/fi";

export enum ThemeMode {
	Light = "light",
	Dark = "dark",
}

const ICON_SIZE = 24;

export function ThemeToggle() {
	const [theme, setTheme] = useState<ThemeMode>(ThemeMode.Light);

	useEffect(() => {
		const root = document.documentElement;
		const savedTheme = localStorage.getItem("theme") as ThemeMode | null;

		if (savedTheme) {
			setTheme(savedTheme);
			root.classList.toggle("dark", savedTheme === ThemeMode.Dark);
		} else if (window.matchMedia("(prefers-color-scheme: dark)").matches) {
			setTheme(ThemeMode.Dark);
			root.classList.add("dark");
		}
	}, []);

	const toggleTheme = () => {
		const newTheme =
			theme === ThemeMode.Light ? ThemeMode.Dark : ThemeMode.Light;
		setTheme(newTheme);
		document.documentElement.classList.toggle("dark");
		localStorage.setItem("theme", newTheme);
	};

	return (
		<button
			onClick={toggleTheme}
			className="bg-primary text-primary-foreground px-4 py-2 rounded-lg hover:opacity-90 absolute top-4 right-16 md:right-4 "
		>
			{theme === ThemeMode.Light ? (
				<MdOutlineDarkMode size={ICON_SIZE} />
			) : (
				<FiSun size={ICON_SIZE} />
			)}
		</button>
	);
}
