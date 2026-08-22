import React, { useState } from 'react';
import {
  View,
  Text,
  Image,
  TextInput,
  TouchableOpacity,
  SafeAreaView,
  StatusBar,
  ActivityIndicator,
  Alert,
} from 'react-native';
import { Link, useRouter } from 'expo-router';
import { PAGE_LOGO } from '@/constants/icons';
import { authApi } from '@/lib/api';
import '@/global.css';

export default function SignIn() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSignIn = async () => {
    if (!email.trim() || !password) {
      Alert.alert('Missing Fields', 'Please enter both email and password.');
      return;
    }

    setLoading(true);
    try {
      await authApi.signIn({
        email: email.trim(),
        password,
      });
      router.replace('/tabs');
    } catch (err: any) {
      Alert.alert('Sign In Error', err.message || 'Invalid credentials or connection error');
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView className="flex-1 bg-[#08111F]">
      <StatusBar barStyle="light-content" backgroundColor="#08111F" />
      <View className="flex-1 items-center justify-center px-6">
        <Image
          source={PAGE_LOGO}
          style={{ height: 68, width: '85%', maxWidth: 340, marginBottom: 28 }}
          resizeMode="contain"
        />

        <Text className="mb-1.5 text-2xl font-bold text-white">Welcome back</Text>
        <Text className="mb-8 text-xs text-white/50">Build your lore.</Text>

        <View className="mb-5 w-full gap-3">
          <TextInput
            placeholder="Email address"
            placeholderTextColor="rgba(255,255,255,0.4)"
            value={email}
            onChangeText={setEmail}
            autoCapitalize="none"
            keyboardType="email-address"
            className="w-full rounded-xl border border-[#4D8BFF]/15 bg-[#151B2D] px-4 py-3 text-xs text-white"
          />
          <TextInput
            placeholder="Password"
            placeholderTextColor="rgba(255,255,255,0.4)"
            value={password}
            onChangeText={setPassword}
            secureTextEntry
            className="w-full rounded-xl border border-[#4D8BFF]/15 bg-[#151B2D] px-4 py-3 text-xs text-white"
          />
        </View>

        <TouchableOpacity
          onPress={handleSignIn}
          disabled={loading}
          className="mb-4 w-full items-center justify-center rounded-xl bg-[#4D8BFF] py-3.5">
          {loading ? (
            <ActivityIndicator size="small" color="#FFFFFF" />
          ) : (
            <Text className="text-xs font-bold text-white">Sign In</Text>
          )}
        </TouchableOpacity>

        <Link href="/auth/sign-up" className="text-xs text-white/50">
          Don&apos;t have an account? <Text className="font-semibold text-[#4D8BFF]">Sign up</Text>
        </Link>
      </View>
    </SafeAreaView>
  );
}
