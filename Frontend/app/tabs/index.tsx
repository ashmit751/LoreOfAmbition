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

export default function HomeFeed() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<'explore' | 'following'>('explore');
  const [likes, setLikes] = useState<{ [key: string]: number }>({ post1: 48, post2: 31 });
  const [liked, setLiked] = useState<{ [key: string]: boolean }>({});

  const toggleLike = (postId: string) => {
    setLiked((prev) => {
      const isLiked = !prev[postId];
      setLikes((prevLikes) => ({
        ...prevLikes,
        [postId]: isLiked ? prevLikes[postId] + 1 : prevLikes[postId] - 1,
      }));
      return { ...prev, [postId]: isLiked };
    });
  };

  return (
    <SafeAreaView className="flex-1 bg-[#08111F]">
      <StatusBar barStyle="light-content" backgroundColor="#08111F" />
      
      {/* Topbar */}
      <View className="px-5 py-3 flex-row items-center justify-between border-b border-white/5">
        <Text className="text-xl font-bold text-white tracking-wide">Lore</Text>
        <TouchableOpacity
          onPress={() => router.push('/notifications')}
          className="p-2 bg-[#151B2D] border border-[#4D8BFF]/20 rounded-full"
        >
          <Text className="text-sm">🔔</Text>
        </TouchableOpacity>
      </View>

      <ScrollView className="flex-1 px-4 pt-3" showsVerticalScrollIndicator={false}>
        {/* Explore / Following Tab Switcher */}
        <View className="flex-row gap-2 mb-4">
          <TouchableOpacity
            onPress={() => setActiveTab('explore')}
            className={`flex-1 py-2.5 rounded-xl border items-center justify-center ${
              activeTab === 'explore'
                ? 'bg-[#4D8BFF] border-[#4D8BFF]'
                : 'bg-[#4D8BFF]/[0.08] border-[#4D8BFF]/15'
            }`}
          >
            <Text
              className={`text-xs font-semibold ${
                activeTab === 'explore' ? 'text-white' : 'text-white/60'
              }`}
            >
              Explore
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => setActiveTab('following')}
            className={`flex-1 py-2.5 rounded-xl border items-center justify-center ${
              activeTab === 'following'
                ? 'bg-[#4D8BFF] border-[#4D8BFF]'
                : 'bg-[#4D8BFF]/[0.08] border-[#4D8BFF]/15'
            }`}
          >
            <Text
              className={`text-xs font-semibold ${
                activeTab === 'following' ? 'text-white' : 'text-white/60'
              }`}
            >
              Following
            </Text>
          </TouchableOpacity>
        </View>

        {/* Pinned Activity Strip */}
        <View className="bg-[#3D5A9A]/15 border border-[#4D8BFF]/20 rounded-[14px] p-3 mb-3 flex-row items-center gap-2.5">
          <Text className="text-base">📌</Text>
          <Text className="text-xs text-white/90 font-medium flex-1">
            4 creators started new challenges today
          </Text>
        </View>

        {/* Project Log Post 1 */}
        <TouchableOpacity
          activeOpacity={0.9}
          onPress={() => router.push('/post/1')}
          className="bg-[#151B2D]/80 border border-[#4D8BFF]/10 rounded-[18px] p-4 mb-3"
        >
          {/* Project Badges */}
          <View className="flex-row flex-wrap gap-1.5 mb-2.5">
            <View className="bg-[#4D8BFF]/15 rounded-full px-2.5 py-1">
              <Text className="text-[10px] font-semibold text-[#4D8BFF]">Lore of Ambition</Text>
            </View>
            <View className="bg-[#4D8BFF]/15 rounded-full px-2.5 py-1">
              <Text className="text-[10px] font-semibold text-[#4D8BFF]">Programming</Text>
            </View>
            <View className="bg-[#4D8BFF]/15 rounded-full px-2.5 py-1">
              <Text className="text-[10px] font-semibold text-[#4D8BFF]">Day 14</Text>
            </View>
          </View>

          {/* Post Header */}
          <View className="flex-row items-center gap-3 mb-3">
            <View className="w-10 h-10 rounded-full bg-[#4D8BFF]/20 items-center justify-center">
              <Text className="text-sm font-bold text-white">DV</Text>
            </View>
            <View className="flex-1">
              <Text className="text-xs font-semibold text-white">devraj</Text>
              <Text className="text-[10px] text-white/50">2 hours ago</Text>
            </View>
          </View>

          {/* Post Body */}
          <Text className="text-xs text-white/90 leading-5 mb-3">
            finally got authentication working after 3 days 🔥
          </Text>

          {/* Post Actions */}
          <View className="flex-row items-center gap-5 pt-1 border-t border-white/5">
            <TouchableOpacity
              onPress={() => toggleLike('post1')}
              className="flex-row items-center gap-1.5"
            >
              <Text className="text-xs">{liked['post1'] ? '❤️' : '🤍'}</Text>
              <Text className="text-[11px] text-white/50">{likes['post1']}</Text>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => router.push('/post/1')}
              className="flex-row items-center gap-1.5"
            >
              <Text className="text-xs">💬</Text>
              <Text className="text-[11px] text-white/50">12</Text>
            </TouchableOpacity>

            <TouchableOpacity className="flex-row items-center gap-1.5">
              <Text className="text-xs">🔄</Text>
              <Text className="text-[11px] text-white/50">6</Text>
            </TouchableOpacity>
          </View>
        </TouchableOpacity>

        {/* Pinned Bullet 2 */}
        <View className="bg-[#3D5A9A]/15 border border-[#4D8BFF]/20 rounded-[14px] p-3 mb-3 flex-row items-center gap-2.5">
          <Text className="text-base">📌</Text>
          <Text className="text-xs text-white/90 flex-1">
            <Text className="font-semibold text-white">React Learning</Text> • Week 2: Components & Hooks
          </Text>
        </View>

        {/* Project Log Post 2 */}
        <TouchableOpacity
          activeOpacity={0.9}
          onPress={() => router.push('/post/2')}
          className="bg-[#151B2D]/80 border border-[#4D8BFF]/10 rounded-[18px] p-4 mb-5"
        >
          {/* Project Badges */}
          <View className="flex-row flex-wrap gap-1.5 mb-2.5">
            <View className="bg-[#4D8BFF]/15 rounded-full px-2.5 py-1">
              <Text className="text-[10px] font-semibold text-[#4D8BFF]">Design System V2</Text>
            </View>
            <View className="bg-[#4D8BFF]/15 rounded-full px-2.5 py-1">
              <Text className="text-[10px] font-semibold text-[#4D8BFF]">Design</Text>
            </View>
            <View className="bg-[#4D8BFF]/15 rounded-full px-2.5 py-1">
              <Text className="text-[10px] font-semibold text-[#4D8BFF]">Week 5</Text>
            </View>
          </View>

          {/* Post Header */}
          <View className="flex-row items-center gap-3 mb-3">
            <View className="w-10 h-10 rounded-full bg-[#5CC994]/20 items-center justify-center">
              <Text className="text-sm font-bold text-[#5CC994]">SR</Text>
            </View>
            <View className="flex-1">
              <Text className="text-xs font-semibold text-white">sara.r</Text>
              <Text className="text-[10px] text-white/50">5 hours ago</Text>
            </View>
          </View>

          {/* Post Body */}
          <Text className="text-xs text-white/90 leading-5 mb-3">
            redesigned landing page. Much happier with the flow 🎨
          </Text>

          {/* Post Actions */}
          <View className="flex-row items-center gap-5 pt-1 border-t border-white/5">
            <TouchableOpacity
              onPress={() => toggleLike('post2')}
              className="flex-row items-center gap-1.5"
            >
              <Text className="text-xs">{liked['post2'] ? '❤️' : '🤍'}</Text>
              <Text className="text-[11px] text-white/50">{likes['post2']}</Text>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => router.push('/post/2')}
              className="flex-row items-center gap-1.5"
            >
              <Text className="text-xs">💬</Text>
              <Text className="text-[11px] text-white/50">8</Text>
            </TouchableOpacity>

            <TouchableOpacity className="flex-row items-center gap-1.5">
              <Text className="text-xs">🔄</Text>
              <Text className="text-[11px] text-white/50">3</Text>
            </TouchableOpacity>
          </View>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}
