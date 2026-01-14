import { Company, CompanyCreatePayload } from "./Company";

export type User = {
	id: string;
	fullName: string;
	email: string;
	company: Company;
	createdAt: string;
	updatedAt: string;
};

// use this to create a new user (on form submit)
export type UserCreatePayload = {
	fullName: string;
	email: string;
	password: string;
	confirmPassword: string;
	company: CompanyCreatePayload;
};
