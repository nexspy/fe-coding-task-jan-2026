/**
 * Get last N months dates count
 * @param monthsCount
 * @returns
 */
export const getMonthlyDates = (monthsCount: number): Date[] => {
	const dates: Date[] = [];
	const today = new Date();

	for (let i = 0; i < monthsCount; i++) {
		const date = new Date(today.getFullYear(), today.getMonth() - i, 1);
		dates.push(date);
	}

	return dates;
};

/**
 * Get last N months labels
 * @param monthsCount
 * @returns
 */
export const getLastMonthsLabels = (monthsCount: number): string[] => {
	const monthNames = [
		"Jan",
		"Feb",
		"Mar",
		"Apr",
		"May",
		"Jun",
		"Jul",
		"Aug",
		"Sep",
		"Oct",
		"Nov",
		"Dec",
	];

	const labels: string[] = [];
	const today = new Date();

	for (let i = 0; i < monthsCount; i++) {
		const date = new Date(today.getFullYear(), today.getMonth() - i, 1);
		const monthName = monthNames[date.getMonth()];
		const year = date.getFullYear();
		labels.push(`${monthName} ${year}`);
	}

	return labels;
};
