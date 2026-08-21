import { Stack } from 'expo-router';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { StatusBar } from 'react-native';
import '@/global.css';

export default function RootLayout() {
  return (
    <SafeAreaProvider>
      <StatusBar barStyle="light-content" backgroundColor="#08111F" translucent />
      <Stack screenOptions={{ headerShown: false, contentStyle: { backgroundColor: '#08111F' } }} />
    </SafeAreaProvider>
  );
}
