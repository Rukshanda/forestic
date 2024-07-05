import { Client, Databases, ID, Query } from "appwrite";
import config from "../config/config";

export class Services {
  client = new Client();
  databases;

  constructor() {
    this.client = new Client()
      .setEndpoint(config.appwriteUrl)
      .setProject(config.appwriteProjectId);
    this.databases = new Databases(this.client);
  }

  async createPost({ title, postImage, content, userId, userName, status }) {
    try {
      const uniqueId = ID.unique();
      return await this.databases.createDocument(
        config.appwriteDatabaseId,
        config.appwriteArticlesId,
        uniqueId,
        {
          title,
          content,
          postImage,
          status,
          userId,
          userName,
        }
      );
    } catch (error) {
      console.log("Appwrite service :: createPost :: error", error);
    }
  }

  async updatePost(id, { title, content, postImage, status }) {
    try {
      return await this.databases.updateDocument(
        config.appwriteDatabaseId,
        config.appwriteArticlesId,
        id,
        {
          title,
          content,
          postImage,
          status,
        }
      );
    } catch (error) {
      console.log("Appwrite service :: updatePost :: error", error);
    }
  }

  async deletePost(id) {
    try {
      await this.databases.deleteDocument(
        config.appwriteDatabaseId,
        config.appwriteArticlesId,
        id
      );
      return true;
    } catch (error) {
      console.log("Appwrite service :: deletePost :: error", error);
      return false;
    }
  }

  async getPost(id) {
    try {
      const response = await this.databases.getDocument(
        config.appwriteDatabaseId,
        config.appwriteArticlesId,
        id
      );
      return response;
    } catch (error) {
      console.error("Appwrite service :: getPost :: error", error);
      return null;
    }
  }
  

  async getPosts(queries = [Query.equal("status", "active")]) {
    try {
      console.log("Executing getPosts with queries:", queries);
      const result = await this.databases.listDocuments(
        config.appwriteDatabaseId,
        config.appwriteArticlesId,
        queries
      );
      console.log("Received posts:", result);
      return result;
    } catch (error) {
      console.error("Appwrite service :: getPosts :: error", error);
      return false;
    }
  }
  
}

const postServices = new Services();

export default postServices;
