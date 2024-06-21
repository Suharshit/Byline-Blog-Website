import conf from '../conf/conf'
import { Client, ID, Databases, Query, Storage } from "appwrite";


export class UserProfileService{
    client = new Client();
    databases;
    storage;

    constructor(){
        this.client
        .setEndpoint(conf.appwriteUrl)
        .setProject(conf.appwriteProjectId)
        this.databases = new Databases(this.client);
        this.storage = new Storage(this.client);
    }

    async createUserProfile({
        userProfileId,
        name,
        email,
        profileImage,
        bio,
    }){
        try {
            return await this.databases.createDocument(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionIdUsers,
                userProfileId,
                {
                    userProfileId,
                    name,
                    email,
                    profileImage,
                    bio,
                }
            )
        } catch (error) {
            console.log("Appwrite serive :: createUserProfile :: ", error);
        }
    }

    async updateUserProfile(
        userProfileId,
        {
            name,
            email,
            ProfileImage,
            bio,
        }
    ){
        try {
            return await this.databases.updateDocument(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionIdUsers,
                userProfileId,
                {
                    name,
                    email,
                    ProfileImage,
                    bio
                }
            )
        } catch (error) {
            console.log("Appwrite serive :: updateUserProfile :: ", error)
        }
    }

    async deleteUserProfile(userId){
        try {
            await this.databases.deleteDocument(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionIdUsers,
                userId
            )
            return true
        } catch (error) {
            console.log("Appwrite service :: deleteUserProfile :: ", error);
            return false
        }
    }

    async getUserProfile(userId){
        try {
            return await this.databases.getDocument(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionIdUsers,
                userId
            )
        } catch (error) {
            console.log("Appwrite service :: getUserProfile :: ", error);
        }
    }

    // UserProfile files storage

    async uploadUserProfileImage(file){
        try {
            return await this.storage.createFile(
                conf.appwriteBucketIdUsersImages,
                ID.unique(),
                file
            )
        } catch (error) {
            console.log("Appwrite service :: uploadUserProfileImage :: ", error);
        }
    }

    async deleteUserProfileImage(fileId){
        try {
            await this.storage.deleteFile(
                conf.appwriteBucketIdUsersImages,
                fileId
            )
            return true
        } catch (error) {
            console.log("Appwrite service :: deleteUserProfileImage :: ", error);
        }
    }

    getFilePreveiw(fileId){
        try {
            return this.storage.getFilePreview(
                conf.appwriteBucketIdUsersImages,
                fileId,
            )
        } catch (error) {
            console.log("Appwrite service :: getFilePreVeiw :: ", error);
        }
    }
}

const userProfileService = new UserProfileService();
export default userProfileService;