// TypeScript may complain about side-effect CSS imports in this React Native / Expo project.
// Ignore the missing module/type declarations for now.
// @ts-ignore: Implicit any for CSS import
import "./global.css"
import { Text, View } from "react-native";
 
export default function App() {
  return (
    <View className="flex-1 items-center justify-center bg-white">
      <Text className="text-xl font-bold text-blue-500">
        Welcome to Nativewind!
      </Text>
    </View>
  );
}