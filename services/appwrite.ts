import { Account, Client } from "react-native-appwrite";

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

export default client;