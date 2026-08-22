import React from 'react';
import {
  View,
  Text,
  Image,
  ScrollView,
  TouchableOpacity,
  SafeAreaView,
  StatusBar,
} from 'react-native';
import { useRouter } from 'expo-router';
import { PAGE_LOGO } from '@/constants/icons';
import '@/global.css';

export default function ChallengeDetailScreen() {
  const router = useRouter();

  return (
    <SafeAreaView className="flex-1 bg-[#08111F]">
      <StatusBar barStyle="light-content" backgroundColor="#08111F" />

      {/* Topbar with App Logo & Hard Top Margin */}
      <View className="flex-row items-center justify-between border-b border-white/5 px-4 pt-3 pb-3">
        <View className="flex-row items-center gap-2.5">
          <TouchableOpacity onPress={() => router.back()} className="-ml-1 rounded-full p-2">
            <Text className="text-base text-white">←</Text>
          </TouchableOpacity>
          <Image source={PAGE_LOGO} className="h-10 w-32" resizeMode="contain" />
        </View>
      </View>

      <ScrollView className="flex-1 px-4 pt-4" showsVerticalScrollIndicator={false}>
        {/* Progress Card */}
        <View className="mb-4 rounded-[18px] border border-[#4D8BFF]/15 bg-[#151B2D]/80 p-4">
          <Text className="mb-2 text-xs font-semibold text-white">Progress</Text>
          <View className="mb-2 h-1.5 w-full overflow-hidden rounded-full bg-[#4D8BFF]/15">
            <View className="h-full w-[14%] rounded-full bg-[#4D8BFF]" />
          </View>
          <Text className="text-[10px] text-white/60">4 of 30 days</Text>
        </View>

        {/* About Card */}
        <Text className="mb-2 text-[10px] font-semibold tracking-wider text-white/50 uppercase">
          About
        </Text>
        <View className="mb-4 rounded-[18px] border border-[#4D8BFF]/10 bg-[#151B2D]/80 p-3.5">
          <Text className="text-xs leading-5 text-white/80">
            Build something for 30 consecutive days. Share your progress daily and stay accountable.
          </Text>
        </View>

        {/* Details Cards */}
        <Text className="mb-2 text-[10px] font-semibold tracking-wider text-white/50 uppercase">
          Details
        </Text>
        <View className="mb-6 gap-2.5">
          <View className="rounded-[14px] border border-[#4D8BFF]/10 bg-[#151B2D]/80 p-3">
            <Text className="mb-0.5 text-[10px] text-white/50">Creator</Text>
            <Text className="text-xs font-semibold text-white">devraj</Text>
          </View>

          <View className="rounded-[14px] border border-[#4D8BFF]/10 bg-[#151B2D]/80 p-3">
            <Text className="mb-0.5 text-[10px] text-white/50">Members</Text>
            <Text className="text-xs font-semibold text-white">156 joined</Text>
          </View>

          <View className="rounded-[14px] border border-[#4D8BFF]/10 bg-[#151B2D]/80 p-3">
            <Text className="mb-0.5 text-[10px] text-white/50">Your Status</Text>
            <Text className="text-xs font-semibold text-[#4D8BFF]">On track (4 days)</Text>
          </View>
        </View>

        {/* Action Button */}
        <TouchableOpacity
          onPress={() => router.push('/tabs/create')}
          className="mb-8 w-full items-center justify-center rounded-xl bg-[#4D8BFF] py-3">
          <Text className="text-xs font-bold text-white">Continue →</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}
