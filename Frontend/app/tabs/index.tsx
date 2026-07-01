import { Text, View } from "react-native";
 import {Link} from "expo-router";
 import "@/global.css"

export default function App()  {
  return (
    <View className="flex-1 items-center justify-center bg-background">
      <Text className="text-xl font-bold text-blue-500">
        Lore of Ambition
      </Text>
      
      <Link href="/auth/sign-in" className="bg-surface text-white p-4 rounded-lg">
         Sign In
      </Link>
      <Link href="/auth/onboarding" className="bg-surface text-white p-4 rounded-lg">
        Get Started
      </Link>

    </View>
  );
}

