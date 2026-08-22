import React, { useState } from 'react';
import {
  View,
  Text,
  Image,
  TextInput,
  TouchableOpacity,
  SafeAreaView,
  StatusBar,
  ScrollView,
  ActivityIndicator,
  Alert,
  Platform,
} from 'react-native';
import { Link, useRouter } from 'expo-router';

import { PAGE_LOGO } from '@/constants/icons';
import { authApi } from '@/lib/api';
import '@/global.css';

export default function SignUp() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const hardTopPadding = Platform.OS === 'android' ? (StatusBar.currentHeight || 28) + 30 : 40;

  const handleSignUp = async () => {
    if (!email.trim() || !username.trim() || !password) {
      Alert.alert('Missing Fields', 'Please fill in email, username, and password.');
      return;
    }

    setLoading(true);
    try {
      await authApi.signUp({
        email: email.trim(),
        username: username.trim(),
        password,
      });
      router.push({
        pathname: '/auth/onboardingstep1',
        params: { username: username.trim() },
      });
    } catch (err: any) {
      Alert.alert('Sign Up Error', err.message || 'Something went wrong');
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView className="flex-1 bg-[#08111F]">
      <StatusBar barStyle="light-content" backgroundColor="#08111F" />
      <ScrollView
        contentContainerStyle={{
          flexGrow: 1,
          justifyContent: 'center',
          paddingTop: hardTopPadding,
        }}
        className="px-6 py-6"
        showsVerticalScrollIndicator={false}>
        {/* Brand Header */}
        <View className="mb-8 items-center">
          <Image
            source={PAGE_LOGO}
            style={{ height: 68, width: '85%', maxWidth: 340 }}
            resizeMode="contain"
          />
          <Text className="mt-3 text-xs font-normal tracking-wide text-white/50">
            Different creators. Same story.
          </Text>
        </View>

        {/* Form Title */}
        <View className="mb-6">
          <Text className="mb-1 text-xl font-bold text-white">Create your account</Text>
          <Text className="text-xs text-white/50">Join creators documenting their journey</Text>
        </View>

        {/* Input Fields */}
        <View className="mb-5 gap-3.5">
          {/* Email Input */}
          <View className="flex-row items-center rounded-2xl border border-[#4D8BFF]/20 bg-[#151B2D]/90 px-4 py-3.5">
            <Text className="mr-3 text-sm text-[#4D8BFF]">✉️</Text>
            <TextInput
              placeholder="Email"
              placeholderTextColor="rgba(255,255,255,0.4)"
              value={email}
              onChangeText={setEmail}
              autoCapitalize="none"
              keyboardType="email-address"
              className="flex-1 p-0 text-sm text-white"
            />
          </View>

          {/* Username Input */}
          <View className="flex-row items-center rounded-2xl border border-[#4D8BFF]/20 bg-[#151B2D]/90 px-4 py-3.5">
            <Text className="mr-3 text-sm text-[#4D8BFF]">👤</Text>
            <TextInput
              placeholder="Username"
              placeholderTextColor="rgba(255,255,255,0.4)"
              value={username}
              onChangeText={setUsername}
              autoCapitalize="none"
              className="flex-1 p-0 text-sm text-white"
            />
          </View>

          {/* Password Input */}
          <View className="flex-row items-center rounded-2xl border border-[#4D8BFF]/20 bg-[#151B2D]/90 px-4 py-3.5">
            <Text className="mr-3 text-sm text-[#4D8BFF]">🔒</Text>
            <TextInput
              placeholder="Password"
              placeholderTextColor="rgba(255,255,255,0.4)"
              value={password}
              onChangeText={setPassword}
              secureTextEntry
              className="flex-1 p-0 text-sm text-white"
            />
          </View>
        </View>

        {/* Primary CTA Button */}
        <TouchableOpacity
          onPress={handleSignUp}
          disabled={loading}
          activeOpacity={0.85}
          className="mb-5 w-full items-center justify-center rounded-2xl bg-[#4D8BFF] py-4 shadow-lg shadow-[#4D8BFF]/20">
          {loading ? (
            <ActivityIndicator color="#fff" />
          ) : (
            <Text className="text-sm font-bold text-white">Create account</Text>
          )}
        </TouchableOpacity>

        {/* Divider */}
        <View className="my-2 mb-5 flex-row items-center justify-center">
          <View className="h-[1px] flex-1 bg-white/10" />
          <Text className="px-3 text-xs font-medium text-white/40">or</Text>
          <View className="h-[1px] flex-1 bg-white/10" />
        </View>

        {/* Continue with Google */}
        <TouchableOpacity
          onPress={() => {
            Alert.alert(
              'Google Sign In',
              'Google authentication will be linked with your Supabase auth provider.'
            );
          }}
          activeOpacity={0.85}
          className="mb-7 w-full flex-row items-center justify-center gap-2.5 rounded-2xl border border-[#4D8BFF]/15 bg-[#151B2D]/80 py-3.5">
          <View className="h-5 w-5 items-center justify-center rounded-full bg-white">
            <Text className="text-xs font-bold text-[#08111F]">G</Text>
          </View>
          <Text className="text-xs font-semibold text-white">Continue with Google</Text>
        </TouchableOpacity>

        {/* Footer Link */}
        <View className="items-center">
          <Link href="/auth/sign-in" className="text-xs text-white/60">
            Already a creator? <Text className="font-semibold text-[#4D8BFF]">Log in</Text>
          </Link>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
