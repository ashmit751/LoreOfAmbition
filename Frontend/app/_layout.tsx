import { Stack ,Link } from 'expo-router';
// @ts-ignore
import "@/global.css"
import { View,Text } from 'react-native';

export default function RootLayout() {
  return (
   <View className="flex-1 items-center justify-center bg-background" >
    <Text className="text-xl text-text">
      Layout
    </Text>
    <Link  href="/account.tsx" className="bg-primary text-white p-4 rounded-lg">
      Go to Home
    </Link>
    </View> 
  )
}
