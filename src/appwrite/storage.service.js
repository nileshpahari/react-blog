import config from "../config/config.js";
import { Client, ID, Storage } from "appwrite"

export class StorageService {
    client = new Client();
    storage;

    constructor() {
        this.client.setEndpoint(config.endpoint)
            .setProject(config.projectId);
        this.storage = new Storage(this.client);
    }

    async uploadFile(file) {
        try {
            return await this.storage.createFile(
                config.bucketId,
                ID.unique(),
                file
            )
        } catch (error) {
            throw new Error("failed to upload the file");
        }
    }

    async deleteFile(fileId) {
        try {
            await this.storage.deleteFile(
                config.bucketId,
                fileId,
            )
            return true;
        } catch (error) {
            throw new Error("failed to delete the file");
        }
    }

    previewFile(fileId) {
        try {
            return this.storage.getFilePreview(
                config.bucketId,
                fileId
            )
        } catch (error) {
            throw new Error("failed to preview the file");
        }
    }

}

const storageService = new StorageService();
export default storageService;