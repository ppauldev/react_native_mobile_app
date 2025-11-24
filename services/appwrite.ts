import { Account, Client, Databases, Query } from "react-native-appwrite";

const client = new Client()
  .setProject(process.env.EXPO_PUBLIC_APPWRITE_PROJECT_ID!)
  .setEndpoint(process.env.EXPO_PUBLIC_APPWRITE_ENDPOINT!)

export const account = new Account(client);

// Function to verify Appwrite connection
export const pingAppwrite = async () => {
  try {
    const user = await account.get();
    console.log('✅ Appwrite ping successful - user authenticated:', user.email || user.name);
    return true;
  } catch (error) {
    console.log('ℹ️ Appwrite ping - no authenticated user (this is normal for new sessions)');
    return false;
  }
};

const DATABASE_ID = process.env.EXPO_PUBLIC_APPWRITE_DATABASE_ID!;
const TABLE_ID = process.env.EXPO_PUBLIC_APPWRITE_TABLE_ID!;

const database = new Databases(client);

export const updateSearchCount = async (query: string, movie: Movie) => {
  try {
    const result = await database.listDocuments(DATABASE_ID, TABLE_ID,
      [Query.equal("searchTerm", query)]
    );

    console.log(result);
  } catch (error) {
    console.error('❌ Error updating search count:', error);
    throw error;
  }
};

export default client;