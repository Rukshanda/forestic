import config from "../config/config";
import { Client, ID, Storage, Permission, Role } from "appwrite";
import authService from "../appwrite/authServices";

export class Service {
  client = new Client();
  storage;

  constructor() {
    this.client
      .setEndpoint(config.appwriteUrl)
      .setProject(config.appwriteProjectId);
    this.storage = new Storage(this.client);
  }

  // Methods

     async uploadFile(file){
        try {
            return await this.storage.createFile(
                config.appwriteStorageId,
                ID.unique(),
                file
            )
        } catch (error) {
            console.log("Appwrite serive :: uploadFile :: error", error);
            return false
        }
    }

    async deleteFile(fileId){
        try {
            await this.storage.deleteFile(
                config.appwriteStorageId,
                fileId
            )
            return true
        } catch (error) {
            console.log("Appwrite serive :: deleteFile :: error", error);
            return false
        }
    }

    getFilePreview(fileId){
        return this.storage.getFilePreview(
            config.appwriteStorageId,
            fileId
        )
    }
}

const fileServices = new Service();
export default fileServices;
