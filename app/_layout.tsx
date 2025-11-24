import { UserProvider } from "@/lib/context/user";
import { Stack } from "expo-router";
import "./globals.css";

export default function RootLayout() {
  return (
    <UserProvider>
      <Stack>
      <Stack.Screen
        name="(tabs)"
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="movies/[id]"
        options={{
          headerShown: false,
        }}
      />
      </Stack>
    </UserProvider>
  );
}
