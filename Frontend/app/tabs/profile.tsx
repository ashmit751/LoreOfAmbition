import React, { useState } from 'react';
import {
  View,
  Text,
  Image,
  ScrollView,
  TouchableOpacity,
  SafeAreaView,
  StatusBar,
  Platform,
} from 'react-native';
import { useRouter } from 'expo-router';
import { PAGE_LOGO } from '@/constants/icons';
import '@/global.css';

export default function ProfileScreen() {
  const router = useRouter();
  const [profileTab, setProfileTab] = useState<'posts' | 'bulletins' | 'challenges'>('posts');

  const hardTopPadding = Platform.OS === 'android' ? (StatusBar.currentHeight || 28) + 24 : 32;

  return (
    <SafeAreaView className="flex-1 bg-[#08111F]">
      <StatusBar barStyle="light-content" backgroundColor="#08111F" />

      {/* Instagram-style Top Header Bar with Logo & Hard Top Margin */}
      <View
        style={{ paddingTop: hardTopPadding }}
        className="flex-row items-center justify-between border-b border-white/5 bg-[#08111F] px-5 pb-3.5">
        <Image source={PAGE_LOGO} className="h-9 w-28" resizeMode="contain" />
        <TouchableOpacity
          onPress={() => router.push('/notifications')}
          className="rounded-full border border-[#4D8BFF]/20 bg-[#151B2D] p-2">
          <Text className="text-sm">🔔</Text>
        </TouchableOpacity>
      </View>

      <ScrollView className="flex-1 px-4 pt-3" showsVerticalScrollIndicator={false}>
        {/* CURRENT PROJECT CARD (Hero Component) */}
        <View className="mb-4 rounded-[18px] border border-[#4D8BFF]/20 bg-[#4D8BFF]/[0.08] p-4">
          <Text className="mb-1 text-[11px] font-semibold tracking-wider text-[#4D8BFF] uppercase">
            Current Project
          </Text>
          <Text className="mb-1 text-lg font-bold text-white">Lore of Ambition</Text>
          <Text className="mb-2.5 text-xs text-white/60">Started: 14 days ago</Text>

          <View className="mb-3 flex-row flex-wrap gap-1.5">
            <View className="rounded-full bg-[#4D8BFF]/15 px-2.5 py-1">
              <Text className="text-[10px] font-semibold text-[#4D8BFF]">Programming</Text>
            </View>
            <View className="rounded-full bg-[#4D8BFF]/15 px-2.5 py-1">
              <Text className="text-[10px] font-semibold text-[#4D8BFF]">Learning</Text>
            </View>
          </View>

          {/* Today's Goal */}
          <View className="rounded-r-xl border-l-4 border-[#4D8BFF] bg-[#4D8BFF]/[0.05] p-2.5">
            <Text className="mb-0.5 text-[11px] font-bold text-[#4D8BFF]">Today&apos;s Goal:</Text>
            <Text className="text-xs leading-4 text-white/80">Finish authentication module</Text>
          </View>
        </View>

        {/* Profile Header */}
        <View className="mb-4 items-center border-b border-white/5 pb-4">
          <View className="mb-3 h-16 w-16 items-center justify-center rounded-full border border-[#4D8BFF]/30 bg-[#4D8BFF]/20">
            <Text className="text-3xl">👨‍💻</Text>
          </View>
          <Text className="mb-1 text-base font-bold text-white">devraj</Text>
          <Text className="mb-3.5 text-xs text-white/50">@devraj • Building in public</Text>

          {/* Stats */}
          <View className="mb-4 w-full flex-row justify-around px-2">
            <View className="flex-1 items-center">
              <Text className="text-base font-bold text-[#4D8BFF]">28</Text>
              <Text className="mt-0.5 text-[10px] text-white/50">Posts</Text>
            </View>
            <View className="flex-1 items-center border-x border-white/5">
              <Text className="text-base font-bold text-[#4D8BFF]">156</Text>
              <Text className="mt-0.5 text-[10px] text-white/50">Followers</Text>
            </View>
            <View className="flex-1 items-center">
              <Text className="text-base font-bold text-[#4D8BFF]">89</Text>
              <Text className="mt-0.5 text-[10px] text-white/50">Following</Text>
            </View>
          </View>

          <TouchableOpacity className="w-full items-center justify-center rounded-xl bg-[#4D8BFF] py-2.5">
            <Text className="text-xs font-semibold text-white">Edit Profile</Text>
          </TouchableOpacity>
        </View>

        {/* Badges / Streaks */}
        <View className="mb-4 flex-row flex-wrap gap-2">
          <View className="rounded-full border border-[#FF9650]/20 bg-[#FF9650]/15 px-3 py-1.5">
            <Text className="text-[11px] font-semibold text-[#FF9650]">🔥 21 Day Streak</Text>
          </View>
          <View className="rounded-full border border-[#4D8BFF]/20 bg-[#4D8BFF]/15 px-3 py-1.5">
            <Text className="text-[11px] font-semibold text-[#4D8BFF]">🚀 3 Challenges</Text>
          </View>
        </View>

        {/* Profile Sub Tabs */}
        <View className="mb-3 flex-row gap-2">
          {(['posts', 'bulletins', 'challenges'] as const).map((tab) => (
            <TouchableOpacity
              key={tab}
              onPress={() => setProfileTab(tab)}
              className={`flex-1 items-center justify-center rounded-xl border py-2 capitalize ${
                profileTab === tab
                  ? 'border-[#4D8BFF] bg-[#4D8BFF]'
                  : 'border-[#4D8BFF]/15 bg-[#4D8BFF]/[0.08]'
              }`}>
              <Text
                className={`text-xs font-medium ${
                  profileTab === tab ? 'font-semibold text-white' : 'text-white/60'
                }`}>
                {tab}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* Tab Content */}
        {profileTab === 'posts' && (
          <View className="gap-3 pb-6">
            <View className="rounded-[18px] border border-[#4D8BFF]/10 bg-[#151B2D]/80 p-4">
              <Text className="mb-3 text-xs leading-5 text-white/90">
                just shipped notifications feature! 🎉
              </Text>
              <View className="flex-row items-center gap-4 border-t border-white/5 pt-1">
                <Text className="text-[11px] text-white/50">🤍 32</Text>
                <Text className="text-[11px] text-white/50">💬 8</Text>
              </View>
            </View>

            <View className="rounded-[18px] border border-[#4D8BFF]/10 bg-[#151B2D]/80 p-4">
              <Text className="mb-3 text-xs leading-5 text-white/90">
                hit day 14 of the 30 day challenge
              </Text>
              <View className="flex-row items-center gap-4 border-t border-white/5 pt-1">
                <Text className="text-[11px] text-white/50">🤍 48</Text>
                <Text className="text-[11px] text-white/50">💬 12</Text>
              </View>
            </View>
          </View>
        )}

        {profileTab === 'bulletins' && (
          <View className="gap-3 pb-6">
            <View className="rounded-[18px] border border-[#4D8BFF]/10 bg-[#151B2D]/80 p-4">
              <Text className="mb-1 text-xs font-semibold text-[#4D8BFF]">
                Looking for Teammates
              </Text>
              <Text className="mb-2 text-xs leading-5 text-white/90">
                Building a cross-platform creator tool. Looking for a designer with mobile UI
                experience!
              </Text>
              <Text className="text-[10px] text-white/40">3 days ago • 4 replies</Text>
            </View>
          </View>
        )}

        {profileTab === 'challenges' && (
          <View className="gap-3 pb-6">
            <View className="rounded-[18px] border border-[#4D8BFF]/10 bg-[#151B2D]/80 p-4">
              <Text className="mb-2 text-xs font-bold text-white">30 Day Build</Text>
              <View className="mb-2 h-1.5 w-full overflow-hidden rounded-full bg-[#4D8BFF]/10">
                <View className="h-full w-[14%] bg-[#4D8BFF]" />
              </View>
              <Text className="text-[10px] text-white/60">4 of 30 days completed</Text>
            </View>
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}
