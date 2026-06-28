import { Text, View } from "react-native";
 import {Link} from "expo-router";

export default function App() {
  return (
    <View className="flex-1 items-center justify-center bg-background">
      <Text className="text-xl font-bold text-blue-500">
        Welcome to Nativewind!
      </Text>

      <Link href="/accounts.tsx" className="bg-background text-white p-4 rounded-lg">
        Go to Accounts
      </Link>

    </View>
  );
}