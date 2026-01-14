/**
 * User service to handle user-related operations.
 */
import { LoginPayload } from "@/types/Auth";
import { CompanyCreatePayload } from "@/types/Company";
import { ServerResponse } from "@/types/Server";
import { User, UserCreatePayload } from "@/types/User";
import { generateUUID } from "@/utils/uuid";

export class UserService {
	private static readonly USERS_KEY = "users";

	static getKeys(): string[] {
		return Object.keys(localStorage);
	}

	/**
	 * Get all users from local storage
	 * @returns
	 */
	static async getAllUsers(): Promise<User[]> {
		const users = localStorage.getItem(this.USERS_KEY);
		return users ? JSON.parse(users) : [];
	}

	/**
	 * User Login by checking email and password
	 * @param data
	 * @returns
	 */
	static async login(data: LoginPayload): Promise<ServerResponse | null> {
		const users = await this.getAllUsers();

		// check if email and password match
		const user = users.find(
			(u) => u.email === data.email && u.password === data.password
		);

		if (user) {
			return {
				success: true,
				message: "Login successful",
				data: user,
			};
		} else {
			return {
				success: false,
				message: "Invalid email or password",
			};
		}
	}

	/**
	 * Save all users in local storage
	 * @param users
	 */
	static async saveUsers(users: User[]): Promise<void> {
		localStorage.setItem(this.USERS_KEY, JSON.stringify(users));
	}

	/**
	 * Save a new user
	 * @param data
	 * @returns
	 */
	static async save(data: UserCreatePayload): Promise<ServerResponse | null> {
		let users = await this.getAllUsers();

		// Check if user already exists
		if (users.find((u) => u.email === data.email)) {
			return {
				success: false,
				message: "User already exists with this email",
			};
		}

		let newCompanyCreateData: CompanyCreatePayload = {
			name: data.companyName,
		};

		let newCompany = {
			...newCompanyCreateData,
			id: generateUUID(),
			createdAt: new Date().toISOString(),
		};

		let newUser: User = {
			id: generateUUID(),
			fullName: data.fullName,
			email: data.email,
			//TODO hash the password before saving
			password: data.password,
			company: newCompany,
			createdAt: new Date().toISOString(),
			updatedAt: new Date().toISOString(),
		};

		users.push(newUser);

		await this.saveUsers(users);

		return {
			success: true,
			message: "User created successfully",
			data: newUser,
		};
	}
}
