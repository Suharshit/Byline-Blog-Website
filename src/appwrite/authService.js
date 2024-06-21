import conf from "../conf/conf";
import { Client, Account, ID} from "appwrite";

export class AuthService{
    client = new Client();
    account;

    constructor() {
        this.client
            .setEndpoint(conf.appwriteUrl)
            .setProject(conf.appwriteProjectId)
        this.account = new Account(this.client);
    }

    async createAccount({email, password, name}) {
        try {
            const userAccount =  await this.account.create(ID.unique(), email, password, name)
            if(userAccount){
                return this.login({email, password})
            } else {
                console.log("account not create");
            }
        } catch (error) {
            console.log("AppwriteError :: createAccount :: ", error);
        }
    }

    async login({email, password}) {
        try {
            return await this.account.createEmailPasswordSession(email, password)
        } catch (error) {
            console.log("AppwriteError :: login :: ", error);
        }
    }

    getCurrentUser() {
        try {
            return this.account.get();
        } catch (error) {
            console.log("AppwriteError :: getCurrentUser :: ", error);
        }
    }

    async logout() {
        try {
            await this.account.deleteSessions();
        } catch (error) {
            console.log("AppwriteError :: logout :: ", error);
        }
    }


    // user functionalities

    async deleteUser(userId){
        try {
            await this.account.deleteIdentity(userId);
            return true
        } catch (error) {
            console.log("AppwriteError :: deleteUser :: ", error);
            return false
        }
    }

    async updateEmail({email, password}){
        try {
            return await this.account.updateEmail({email, password})
        } catch (error) {
            console.log("AppwriteError :: updateEmail :: ", error);
        }
    }

    async updateName(name){
        try {
            return await this.account.updateName(name)
        } catch (error) {
            console.log("AppwriteError :: updateName :: ", error);
        }
    }

    async updatePassword(password){
        try {
            return await this.account.updatePassword(password)
        } catch (error) {
            console.log("AppwriteError :: updatePassword :: ", error);
        }
    }
}

const authService = new AuthService();
export default authService;