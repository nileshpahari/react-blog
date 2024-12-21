import config from "../config.js";
import { Client, Account, ID } from "appwrite"

export class AuthService {
    client = new Client();
    account;

    constructor() {
        this.client.setEndpoint(config.endpoint)
            .setProject(config.projectId);
        this.account = new Account(this.client);

    }
    async createUser({ fullName, email, password }) {
        try {
            const user = await this.account.create(ID.unique(), email, password, fullName);
            if (!user) {
                throw new Error("Failed to create user");
            }
            return this.loginUser({ email, password })
        } catch (error) {
            throw error;
        }

    };

    async loginUser({ email, password }) {
        try {
            return await this.account.createEmailPasswordSession(email, password);
        } catch (error) {
            throw error;
        }
    }

    async logoutUser() {
        try {
            await this.account.deleteSession("current");
            return true
        } catch (error) {
            throw error;
        }
    }
    async getCurrentUser() {
        try {
            return await this.account.get()
        } catch (error) {
            throw error;
        }
    }
}

const authService = new AuthService();
export default authService;