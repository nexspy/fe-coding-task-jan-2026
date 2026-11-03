"use client";

/**
 * Hook: useThemeTokens()
 *  - Chart.js draws on a canvas, so it can't use CSS classes. This hook reads
 *    the design tokens from CSS variables and re-reads them when the theme
 *    class on <html> changes, keeping charts in sync with the theme and with
 *    any white-label overrides.
 */
import { useEffect, useState } from "react";

export type ThemeTokens = {
	accent: string;
	foreground: string;
	muted: string;
	surface: string;
	border: string;
	grid: string;
	positive: string;
	negative: string;
	chart: string[];
	/** Resolved app font, so canvas text matches the rest of the UI */
	fontFamily: string;
};

const FALLBACK: ThemeTokens = {
	accent: "#c6f432",
	foreground: "#f4f5f0",
	muted: "#a3a89c",
	surface: "#161815",
	border: "#2c3029",
	grid: "rgba(244,245,240,0.07)",
	positive: "#c6f432",
	negative: "#ff6b5b",
	chart: ["#c6f432", "#e9ece4", "#7f9a2e", "#6b7066", "#e4fb9a", "#3f4a2a"],
	fontFamily: "system-ui, sans-serif",
};

const readTokens = (): ThemeTokens => {
	const styles = getComputedStyle(document.documentElement);
	const read = (name: string, fallback: string) =>
		styles.getPropertyValue(name).trim() || fallback;

	return {
		accent: read("--accent", FALLBACK.accent),
		foreground: read("--foreground", FALLBACK.foreground),
		muted: read("--muted-foreground", FALLBACK.muted),
		surface: read("--surface", FALLBACK.surface),
		border: read("--border", FALLBACK.border),
		grid: read("--chart-grid", FALLBACK.grid),
		positive: read("--positive", FALLBACK.positive),
		negative: read("--negative", FALLBACK.negative),
		chart: FALLBACK.chart.map((color, i) => read(`--chart-${i + 1}`, color)),
		fontFamily: getComputedStyle(document.body).fontFamily || FALLBACK.fontFamily,
	};
};

export const useThemeTokens = () => {
	const [tokens, setTokens] = useState<ThemeTokens>(FALLBACK);

	useEffect(() => {
		setTokens(readTokens());

		const observer = new MutationObserver(() => setTokens(readTokens()));
		observer.observe(document.documentElement, {
			attributes: true,
			attributeFilter: ["class", "style"],
		});

		return () => observer.disconnect();
	}, []);

	return tokens;
};
