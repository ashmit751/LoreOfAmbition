import { Text, View } from "react-native";
 import {Link} from "expo-router";
 import "@/global.css"

export default function App()  {
  return (
    <View className="flex-1 items-center justify-center bg-background">
      <Text className="text-xl font-bold text-blue-500">
        Lore of Ambition
      </Text>

      <Link href="/(app)/accounts.tsx" className="bg-surface text-white p-4 rounded-lg">
        Go to Accounts
      </Link>
      <Link href="/(auth)/sign-in" className="bg-surface text-white p-4 rounded-lg">
        Go to Sign In
      </Link>
      <Link href="/(auth)/sign-up" className="bg-surface text-white p-4 rounded-lg">
        Go to Sign Up
      </Link>

    </View>
  );
}

