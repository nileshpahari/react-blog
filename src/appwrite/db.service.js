import config from "../config.js";
import { Client, Databases, Query } from "appwrite";

export class DbService {
    client = new Client();
    databases;

    constructor() {
        this.client.setEndpoint(config.endpoint).setProject(config.projectId);
        this.databases = new Databases(this.client);
    }

    async createPost({ userId, title, slug, content, featuredImage, status }) {
        try {
            return await this.databases.createDocument(
                config.databaseId,
                config.collectionId,
                slug,
                {
                    title,
                    content,
                    featuredImage,
                    status,
                    userId
                }
            )
        } catch (error) {
            throw new Error("failed to create the post");
        }
    };

    async updatePost(slug, { title, content, featuredImage, status }) {
        try {
            return await this.databases.updateDocument(
                config.databaseId,
                config.collectionId,
                slug,
                {
                    title,
                    content,
                    featuredImage,
                    status,
                    userId
                }
            )
        } catch (error) {
            throw new Error("failed to delete the post");
        }
    }

    async deletePost(slug) {
        try {
            await this.databases.deleteDocument(
                config.databaseId,
                config.collectionId,
                slug,
            )
            return true
        } catch (error) {
            throw new Error("failed to delete the post");
        }
    }

    async getPost(slug) {
        try {
            return await this.databases.getDocument(
                config.databaseId,
                config.collectionId,
                slug,
            )
        } catch (error) {
            throw new Error("failed to get the post");
        }
    }

    async getPosts(queries = [Query.equal("status", "active")]) {
        try {
            return await this.databases.listDocuments(
                config.databaseId,
                config.collectionId,
                queries
            )
        } catch (error) {
            throw new Error("failed to get the posts");
        }
    }


}



const dbService = new DbService()
export default dbService