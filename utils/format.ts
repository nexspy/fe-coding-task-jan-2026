/**
 * Number formatting helpers.
 * All prices from the API are in USD, so the currency is fixed here in one place.
 */

const CURRENCY = "USD";
const LOCALE = "en-US";

const currency = new Intl.NumberFormat(LOCALE, {
	style: "currency",
	currency: CURRENCY,
	minimumFractionDigits: 2,
	maximumFractionDigits: 2,
});

const compactCurrency = new Intl.NumberFormat(LOCALE, {
	style: "currency",
	currency: CURRENCY,
	notation: "compact",
	maximumFractionDigits: 1,
});

const quantity = new Intl.NumberFormat(LOCALE, { maximumFractionDigits: 4 });

const shortDate = new Intl.DateTimeFormat(LOCALE, {
	month: "short",
	day: "numeric",
});

const longDate = new Intl.DateTimeFormat(LOCALE, {
	month: "short",
	day: "numeric",
	year: "numeric",
});

export const formatCurrency = (value: number) => currency.format(value);

export const formatCompactCurrency = (value: number) =>
	compactCurrency.format(value);

export const formatQuantity = (value: number) => quantity.format(value);

/** 4.236 -> "+4.24%", -1 -> "-1.00%" */
export const formatPercent = (value: number, { signed = true } = {}) => {
	const sign = signed && value > 0 ? "+" : "";
	return `${sign}${value.toFixed(2)}%`;
};

/** 120.5 -> "+$120.50", -3 -> "-$3.00" */
export const formatSignedCurrency = (value: number) => {
	const sign = value > 0 ? "+" : value < 0 ? "-" : "";
	return `${sign}${currency.format(Math.abs(value))}`;
};

export const formatShortDate = (date: Date) => shortDate.format(date);

export const formatLongDate = (date: Date) => longDate.format(date);
