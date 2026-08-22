import React, { useState } from 'react';
import {
  View,
  Text,
  Image,
  TextInput,
  TouchableOpacity,
  SafeAreaView,
  ScrollView,
  StatusBar,
  Platform,
  Alert,
} from 'react-native';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { authApi } from '@/lib/api';
import { APP_ICON } from '@/constants/icons';
import '@/global.css';

export default function OnboardingStep1() {
  const router = useRouter();
  const params = useLocalSearchParams();
  const initialUsername = typeof params.username === 'string' ? params.username : '';

  const [displayName, setDisplayName] = useState(initialUsername);
  const [bio, setBio] = useState('');
  const [avatarUri, setAvatarUri] = useState<string | null>(null);

  const handlePickAvatar = () => {
    // In React Native/Expo, image picker can be triggered here
    setAvatarUri('picked');
    Alert.alert('Avatar Selected', 'Profile image avatar uploaded!');
  };

  const handleContinue = async () => {
    if (!displayName.trim()) {
      Alert.alert('Display Name', 'Please enter a display name for other creators to see.');
      return;
    }

    try {
      await authApi.saveOnboarding({
        display_name: displayName.trim(),
        bio: bio.trim(),
      });
    } catch (e) {
      console.warn(e);
    }

    router.push('/auth/onboardingstep2');
  };

  // Hard top margin for Android & iOS notches just like Instagram
  const hardTopPadding = Platform.OS === 'android' ? (StatusBar.currentHeight || 28) + 24 : 32;

  return (
    <SafeAreaView className="flex-1 bg-[#08111F]">
      <StatusBar barStyle="light-content" backgroundColor="#08111F" />

      {/* Instagram-style Top Header Bar with Hard Top Margin & Logo */}
      <View
        style={{ paddingTop: hardTopPadding }}
        className="flex-row items-center justify-center border-b border-white/5 bg-[#08111F] px-5 pb-3.5">
        <View className="flex-row items-center gap-2">
          <Image source={APP_ICON} className="h-7 w-7 rounded-lg" resizeMode="contain" />
          <Text className="text-xl font-extrabold tracking-wider text-white">Lore</Text>
        </View>
      </View>

      <ScrollView
        contentContainerStyle={{ flexGrow: 1 }}
        className="px-6 pt-4"
        showsVerticalScrollIndicator={false}>
        {/* Step Progress Indicators */}
        <View className="mt-1 mb-6 items-center">
          <View className="mb-3 flex-row items-center gap-2">
            <View className="h-1 w-10 rounded-full bg-[#4D8BFF]" />
            <View className="h-1 w-10 rounded-full bg-white/20" />
            <View className="h-1 w-10 rounded-full bg-white/20" />
          </View>
          <Text className="text-xs font-medium text-white/50">Step 1 of 3</Text>
        </View>

        {/* Heading */}
        <View className="mb-8 items-center">
          <Text className="mb-1.5 text-2xl font-bold text-white">About you</Text>
          <Text className="text-xs text-white/50">Tell other creators who you are</Text>
        </View>

        {/* Avatar Upload Placeholder with Camera Badge */}
        <View className="mb-8 items-center">
          <TouchableOpacity onPress={handlePickAvatar} activeOpacity={0.8} className="relative">
            <View className="h-24 w-24 items-center justify-center rounded-full border border-white/10 bg-[#151B2D]">
              {avatarUri ? (
                <Text className="text-3xl">👨‍💻</Text>
              ) : (
                <Text className="text-3xl text-white/20">👤</Text>
              )}
            </View>
            {/* Camera Badge Overlay */}
            <View className="absolute right-0 bottom-0 h-7 w-7 items-center justify-center rounded-full border-2 border-[#08111F] bg-[#4D8BFF]">
              <Text className="text-xs">📷</Text>
            </View>
          </TouchableOpacity>
        </View>

        {/* Input Fields */}
        <View className="mb-8 gap-4">
          {/* Display Name Input */}
          <View className="flex-row items-center rounded-2xl border border-[#4D8BFF]/20 bg-[#151B2D]/90 px-4 py-3.5">
            <Text className="mr-3 text-sm text-[#4D8BFF]">👤</Text>
            <TextInput
              placeholder="Display name"
              placeholderTextColor="rgba(255,255,255,0.4)"
              value={displayName}
              onChangeText={setDisplayName}
              className="flex-1 p-0 text-sm text-white"
            />
          </View>

          {/* Bio Input */}
          <View className="rounded-2xl border border-[#4D8BFF]/20 bg-[#151B2D]/90 px-4 py-3.5">
            <TextInput
              placeholder="Bio (optional)"
              placeholderTextColor="rgba(255,255,255,0.4)"
              multiline
              numberOfLines={4}
              value={bio}
              onChangeText={setBio}
              className="p-0 text-sm text-white"
              style={{ minHeight: 90, textAlignVertical: 'top' }}
            />
          </View>
        </View>

        {/* Continue Button */}
        <View className="mt-auto pb-4">
          <TouchableOpacity
            onPress={handleContinue}
            activeOpacity={0.85}
            className="w-full items-center justify-center rounded-2xl bg-[#4D8BFF] py-4 shadow-lg shadow-[#4D8BFF]/20">
            <Text className="text-sm font-bold text-white">Continue</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
