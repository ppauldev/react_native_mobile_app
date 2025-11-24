import { router } from "expo-router";
import { createContext, useContext, useEffect, useState } from "react";
import { ID, Models } from "react-native-appwrite";
import { account, pingAppwrite } from "../../services/appwrite";

const UserContext = createContext<{ current: Models.User | null, login: (email: string, password: string) => Promise<void>, logout: () => Promise<void>, register: (email: string, password: string) => Promise<void> }>({ current: null, login: async () => {}, logout: async () => {}, register: async () => {} });

export function useUser() {
  return useContext(UserContext);
}

export function UserProvider(props: { children: React.ReactNode }) {
  const [user, setUser] = useState<Models.Session | null>(null);

  async function login(email: string, password: string) {
    console.log('🔐 Attempting login for:', email);
    try {
      const loggedIn = await account.createEmailPasswordSession({
          email,
          password
      });
      setUser(loggedIn);
      console.log('✅ Login successful for:', email);
      await pingAppwrite(); // Ping after successful login
      router.replace("/");
    } catch (error) {
      console.error('❌ Login failed for:', email, error);
      throw error;
    }
  }

  async function logout() {
    console.log('🚪 Attempting logout');
    try {
      await account.deleteSession({
          sessionId: "current"
      });
      setUser(null);
      console.log('✅ Logout successful');
    } catch (error) {
      console.error('❌ Logout failed:', error);
      throw error;
    }
  }

  async function register(email: string, password: string) {
    console.log('📝 Attempting registration for:', email);
    try {
      await account.create({
          userId: ID.unique(),
          email,
          password
      });
      console.log('✅ Registration successful for:', email);
      await login(email, password);
    } catch (error) {
      console.error('❌ Registration failed for:', email, error);
      throw error;
    }
  }

  async function init() {
    console.log('🚀 Initializing user authentication...');

    // Initial ping to check Appwrite connection
    console.log('📡 Sending initial Appwrite ping...');
    await pingAppwrite();

    try {
      console.log('🔍 Checking for existing user session...');
      // Try to get existing session
      const loggedIn = await account.get() as unknown as Models.Session;
      setUser(loggedIn);
      console.log('✅ Found existing session, user authenticated');
    } catch (err) {
      console.log('ℹ️ No existing session found, creating anonymous user...');
      // No existing session, create anonymous user automatically
      try {
        const userId = ID.unique();
        const email = `user_${userId}@app.local`; // Generate unique email
        const password = userId; // Use userId as password

        console.log('📝 Creating anonymous user account:', email);

        // Try to create account (register)
        await account.create({
          userId: userId,
          email: email,
          password: password
        });

        console.log('🔐 Logging in anonymous user...');

        // Login with the new account
        const session = await account.createEmailPasswordSession({
          email,
          password
        });

        setUser(session);
        console.log('✅ Anonymous user authentication complete');

        // Final ping to verify everything worked
        console.log('📡 Sending verification ping...');
        await pingAppwrite();

      } catch (registerError) {
        console.error('❌ Auto registration failed:', registerError);
        setUser(null);
      }
    }

    console.log('🎉 User authentication initialization complete');
  }

  useEffect(() => {
    init();
  }, []);

  return (
    <UserContext.Provider value={{ current: user as Models.User | null, login, logout, register }}>
      {props.children}
    </UserContext.Provider>
  );
};