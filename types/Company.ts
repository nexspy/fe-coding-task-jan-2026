export type Company = {
	id: string;
	name: string;
	createdAt: string;

	portfolios: string[]; // FK, portfolio ids
};

export type CompanyCreatePayload = {
	name: string;
};
