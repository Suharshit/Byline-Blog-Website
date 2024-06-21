import conf from '../conf/conf'
import { Client, Databases, ID, Query, Storage } from 'appwrite'

export class ArticleService{
    client = new Client();
    databases;
    storage;

    constructor(){
        this.client
        .setEndpoint(conf.appwriteUrl)
        .setProject(conf.appwriteProjectId)
        this.databases = new Databases(this.client)
        this.storage = new Storage(this.client)
    }

    async createPost({
        slug,
        title,
        content,
        featuredImage,
        status,
        userId
    }){
        try {
            return await this.databases.createDocument(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionIdArticles,
                slug,
                {
                    title,
                    slug,
                    content,
                    featuredImage,
                    status,
                    userId
                }
            )
        } catch (error) {
            console.log("Appwrite Article Service :: createPost :: ", error)
        }
    }

    async updatePost(slug, {
        title,
        content,
        featuredImage,
        status
    }){
        try {
            return await this.databases.updateDocument(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionIdArticles,
                slug,
                {
                    title,
                    content,
                    featuredImage,
                    status
                }
            )
        } catch (error) {
            console.log("Appwrite Article Service :: UpdatePost :: ", error)
        }
    }

    async deletePost(slug){
        try {
            await this.databases.deleteDocument(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionIdArticles,
                slug
            )
            return true
        } catch (error) {
            console.log("Appwrite Article Service :: deletePost :: ", error)
        }
    }

    async getPost(slug){
        try {
            return await this.databases.getDocument(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionIdArticles,
                slug
            )
        } catch (error) {
            console.log("Appwrite Article Service :: getPost :: ", error)
            return false
        }
    }

    async getPosts(
        queries = [Query.equal("status","active")]
    ){
        try {
            return await this.databases.listDocuments(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionIdArticles,
                queries
            )
        } catch (error) {
            console.log("Appwrite Article Service :: getPosts :: ", error)
            return false
        }
    }

    async getUserPosts(
        userId
    ) {
        try {
            return await this.databases.listDocuments(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionIdArticles,
                [
                    Query.equal("status","active"),
                    Query.equal("userId", userId)
                ]
            )
        } catch (error) {
            console.log("Appwrite Article Service :: getUserPosts :: ", error)
            return false
        }
    }

    // file upload services

    async uploadFile(file){
        try {
            return await this.storage.createFile(
                conf.appwriteBucketIdArticleImages,
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
                conf.appwriteBucketIdArticleImages,
                fileId
            )
            return true
        } catch (error) {
            console.log("Appwrite serive :: deleteFile :: error", error);
            return false
        }
    }

    getFilePreview(fileId){
        try {
            return this.storage.getFilePreview(
                conf.appwriteBucketIdArticleImages,
                fileId
            )
        } catch (error) {
            console.log("appwrite Error :: getFilePreveiw :: ", error);
        }
    }
}

const articleService = new ArticleService()
export default articleService