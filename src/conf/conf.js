const conf = {
    //  appwrite config
    appwriteUrl: String(import.meta.env.VITE_APPWRITE_URL),
    appwriteProjectId: String(import.meta.env.VITE_APPWRITE_PROJECT_ID),
    appwriteDatabaseId: String(import.meta.env.VITE_APPWRITE_DATABASES_ID),
    appwriteCollectionIdArticles: String(import.meta.env.VITE_APPWRITE_COLLECTION_ID_ARTICLES),
    appwriteCollectionIdUsers: String(import.meta.env.VITE_APPWRITE_COLLECTION_ID_USERS),
    appwriteBucketIdArticleImages: String(import.meta.env.VITE_APPWRITE_BUCKET_ID_ARTICLESIMAGES),
    appwriteBucketIdUsersImages: String(import.meta.env.VITE_APPWRITE_BUCKET_ID_USERPROFILEIMAGES),
};

export default conf