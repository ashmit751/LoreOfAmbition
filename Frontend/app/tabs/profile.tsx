import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  SafeAreaView,
  StatusBar,
} from 'react-native';
import { useRouter } from 'expo-router';
import "@/global.css"

export default function ProfileScreen() {
  const router = useRouter();
  const [profileTab, setProfileTab] = useState<'posts' | 'bulletins' | 'challenges'>('posts');
  const [following, setFollowing] = useState(false);

  return (
    <SafeAreaView className="flex-1 bg-[#08111F]">
      <StatusBar barStyle="light-content" backgroundColor="#08111F" />

      {/* Topbar */}
      <View className="px-5 py-3 flex-row items-center justify-between border-b border-white/5">
        <Text className="text-xl font-bold text-white tracking-wide">Profile</Text>
        <TouchableOpacity
          onPress={() => router.push('/notifications')}
          className="p-2 bg-[#151B2D] border border-[#4D8BFF]/20 rounded-full"
        >
          <Text className="text-sm">🔔</Text>
        </TouchableOpacity>
      </View>

      <ScrollView className="flex-1 px-4 pt-3" showsVerticalScrollIndicator={false}>
        {/* CURRENT PROJECT CARD (Hero Component) */}
        <View className="bg-[#4D8BFF]/[0.08] border border-[#4D8BFF]/20 rounded-[18px] p-4 mb-4">
          <Text className="text-[11px] font-semibold text-[#4D8BFF] uppercase tracking-wider mb-1">
            Current Project
          </Text>
          <Text className="text-lg font-bold text-white mb-1">
            Lore of Ambition
          </Text>
          <Text className="text-xs text-white/60 mb-2.5">
            Started: 14 days ago
          </Text>

          <View className="flex-row flex-wrap gap-1.5 mb-3">
            <View className="bg-[#4D8BFF]/15 rounded-full px-2.5 py-1">
              <Text className="text-[10px] font-semibold text-[#4D8BFF]">Programming</Text>
            </View>
            <View className="bg-[#4D8BFF]/15 rounded-full px-2.5 py-1">
              <Text className="text-[10px] font-semibold text-[#4D8BFF]">Learning</Text>
            </View>
          </View>

          {/* Today's Goal */}
          <View className="bg-[#4D8BFF]/[0.05] border-l-4 border-[#4D8BFF] rounded-r-xl p-2.5">
            <Text className="text-[11px] font-bold text-[#4D8BFF] mb-0.5">Today's Goal:</Text>
            <Text className="text-xs text-white/80 leading-4">Finish authentication module</Text>
          </View>
        </View>

        {/* Profile Header */}
        <View className="items-center pb-4 mb-4 border-b border-white/5">
          <View className="w-16 h-16 rounded-full bg-[#4D8BFF]/20 items-center justify-center mb-3 border border-[#4D8BFF]/30">
            <Text className="text-3xl">👨‍💻</Text>
          </View>
          <Text className="text-base font-bold text-white mb-1">devraj</Text>
          <Text className="text-xs text-white/50 mb-3.5">@devraj • Building in public</Text>

          {/* Stats */}
          <View className="flex-row justify-around w-full mb-4 px-2">
            <View className="items-center flex-1">
              <Text className="text-base font-bold text-[#4D8BFF]">28</Text>
              <Text className="text-[10px] text-white/50 mt-0.5">Posts</Text>
            </View>
            <View className="items-center flex-1 border-x border-white/5">
              <Text className="text-base font-bold text-[#4D8BFF]">156</Text>
              <Text className="text-[10px] text-white/50 mt-0.5">Followers</Text>
            </View>
            <View className="items-center flex-1">
              <Text className="text-base font-bold text-[#4D8BFF]">89</Text>
              <Text className="text-[10px] text-white/50 mt-0.5">Following</Text>
            </View>
          </View>

          <TouchableOpacity className="w-full bg-[#4D8BFF] py-2.5 rounded-xl items-center justify-center">
            <Text className="text-xs font-semibold text-white">Edit Profile</Text>
          </TouchableOpacity>
        </View>

        {/* Badges / Streaks */}
        <View className="flex-row flex-wrap gap-2 mb-4">
          <View className="bg-[#FF9650]/15 border border-[#FF9650]/20 rounded-full px-3 py-1.5">
            <Text className="text-[11px] font-semibold text-[#FF9650]">🔥 21 Day Streak</Text>
          </View>
          <View className="bg-[#4D8BFF]/15 border border-[#4D8BFF]/20 rounded-full px-3 py-1.5">
            <Text className="text-[11px] font-semibold text-[#4D8BFF]">🚀 3 Challenges</Text>
          </View>
        </View>

        {/* Profile Sub Tabs */}
        <View className="flex-row gap-2 mb-3">
          {(['posts', 'bulletins', 'challenges'] as const).map((tab) => (
            <TouchableOpacity
              key={tab}
              onPress={() => setProfileTab(tab)}
              className={`flex-1 py-2 rounded-xl border items-center justify-center capitalize ${
                profileTab === tab
                  ? 'bg-[#4D8BFF] border-[#4D8BFF]'
                  : 'bg-[#4D8BFF]/[0.08] border-[#4D8BFF]/15'
              }`}
            >
              <Text
                className={`text-xs font-medium ${
                  profileTab === tab ? 'text-white font-semibold' : 'text-white/60'
                }`}
              >
                {tab}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* Tab Content */}
        {profileTab === 'posts' && (
          <View className="gap-3 pb-6">
            <View className="bg-[#151B2D]/80 border border-[#4D8BFF]/10 rounded-[18px] p-4">
              <Text className="text-xs text-white/90 leading-5 mb-3">
                just shipped notifications feature! 🎉
              </Text>
              <View className="flex-row items-center gap-4 pt-1 border-t border-white/5">
                <Text className="text-[11px] text-white/50">🤍 32</Text>
                <Text className="text-[11px] text-white/50">💬 8</Text>
              </View>
            </View>

            <View className="bg-[#151B2D]/80 border border-[#4D8BFF]/10 rounded-[18px] p-4">
              <Text className="text-xs text-white/90 leading-5 mb-3">
                hit day 14 of the 30 day challenge
              </Text>
              <View className="flex-row items-center gap-4 pt-1 border-t border-white/5">
                <Text className="text-[11px] text-white/50">🤍 48</Text>
                <Text className="text-[11px] text-white/50">💬 12</Text>
              </View>
            </View>
          </View>
        )}

        {profileTab === 'bulletins' && (
          <View className="gap-3 pb-6">
            <View className="bg-[#151B2D]/80 border border-[#4D8BFF]/10 rounded-[18px] p-4">
              <Text className="text-xs font-semibold text-[#4D8BFF] mb-1">Looking for Teammates</Text>
              <Text className="text-xs text-white/90 leading-5 mb-2">
                Building a cross-platform creator tool. Looking for a designer with mobile UI experience!
              </Text>
              <Text className="text-[10px] text-white/40">3 days ago • 4 replies</Text>
            </View>
          </View>
        )}

        {profileTab === 'challenges' && (
          <View className="gap-3 pb-6">
            <View className="bg-[#151B2D]/80 border border-[#4D8BFF]/10 rounded-[18px] p-4">
              <Text className="text-xs font-bold text-white mb-2">30 Day Build</Text>
              <View className="w-full h-1.5 bg-[#4D8BFF]/10 rounded-full overflow-hidden mb-2">
                <View className="h-full bg-[#4D8BFF] w-[14%]" />
              </View>
              <Text className="text-[10px] text-white/60">4 of 30 days completed</Text>
            </View>
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}