import { Account, Client, ID, Databases } from "appwrite";
import config from "../config/config";

export class AuthService {
  client = new Client();
  account;
  databases; // Add databases property

  constructor() {
    this.client
      .setEndpoint(config.appwriteUrl)
      .setProject(config.appwriteProjectId);

    this.account = new Account(this.client);
    this.databases = new Databases(this.client); // Initialize database service
  }

  // Create an account
  async createAccount({ email, password, name }) {
    try {
      const userAccount = await this.account.create(
        ID.unique(),
        email,
        password,
        name
      );

      if (userAccount) {
        return this.login({ email, password });
      } else {
        return userAccount;
      }
    } catch (error) {
      throw error;
    }
  }

  // Login
  async login({ email, password }) {
    try {
      const userLogin = await this.account.createEmailPasswordSession(
        email,
        password
      );
      console.log("Login response:", userLogin);

      // Verify if userLogin contains userId
      if (userLogin.userId) {
        sessionStorage.setItem("userId", userLogin.userId);
      } else {
        console.error("userId not found in login response");
      }

      return userLogin;
    } catch (error) {
      throw error;
    }
  }

  // Check if user is logged in
  async isLogedIn() {
    try {
      const logStatus = await this.account.get();
      console.log(logStatus.$id);
      return logStatus;
    } catch (error) {
      throw error;
    }
  }

  // Logout
  async logout() {
    try {
      // Clear the user ID from sessionStorage
      sessionStorage.removeItem("userId");
      return await this.account.deleteSessions();
    } catch (error) {
      throw error;
    }
  }

  // Get list of user documents (Admin functionality)
  async listUserDocuments() {
    try {
      const userDocuments = await this.databases.listDocuments(
        config.appwriteDatabaseId,
        config.appwriteArticlesId
      );
      return userDocuments;
    } catch (error) {
      throw error;
    }
  }
}

const authService = new AuthService();
export default authService;
