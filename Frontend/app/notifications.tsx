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

export default function NotificationsScreen() {
  const router = useRouter();

  return (
    <SafeAreaView className="flex-1 bg-[#08111F]">
      <StatusBar barStyle="light-content" backgroundColor="#08111F" />

      {/* Topbar */}
      <View className="flex-row items-center justify-between border-b border-white/5 px-4 pt-3 pb-3">
        <View className="flex-row items-center gap-2.5">
          <TouchableOpacity onPress={() => router.back()} className="-ml-1 rounded-full p-2">
            <Text className="text-base text-white">←</Text>
          </TouchableOpacity>
          <Image source={PAGE_LOGO} className="h-10 w-32" resizeMode="contain" />
        </View>
      </View>

      <ScrollView className="flex-1 px-4 pt-2" showsVerticalScrollIndicator={false}>
        {/* TODAY */}
        <Text className="mt-3 mb-2.5 text-[10px] font-semibold tracking-wider text-white/50 uppercase">
          Today
        </Text>

        <View className="mb-2.5 flex-row items-center gap-3 rounded-[14px] border border-[#4D8BFF]/10 bg-[#151B2D]/80 p-3">
          <Text className="text-lg">❤️</Text>
          <View className="flex-1">
            <Text className="mb-0.5 text-xs text-white/85">
              <Text className="font-semibold text-white">sara.r</Text> liked your post
            </Text>
            <Text className="text-[9px] text-white/40">2 minutes ago</Text>
          </View>
        </View>

        <View className="mb-2.5 flex-row items-center gap-3 rounded-[14px] border border-[#4D8BFF]/10 bg-[#151B2D]/80 p-3">
          <Text className="text-lg">💬</Text>
          <View className="flex-1">
            <Text className="mb-0.5 text-xs text-white/85">
              <Text className="font-semibold text-white">mike.j</Text> replied to your post
            </Text>
            <Text className="text-[9px] text-white/40">18 minutes ago</Text>
          </View>
        </View>

        {/* YESTERDAY */}
        <Text className="mt-3 mb-2.5 text-[10px] font-semibold tracking-wider text-white/50 uppercase">
          Yesterday
        </Text>

        <View className="mb-2.5 flex-row items-center gap-3 rounded-[14px] border border-[#4D8BFF]/10 bg-[#151B2D]/80 p-3">
          <Text className="text-lg">👥</Text>
          <View className="flex-1">
            <Text className="mb-0.5 text-xs text-white/85">
              <Text className="font-semibold text-white">alex_chen</Text> started following you
            </Text>
            <Text className="text-[9px] text-white/40">Yesterday 2:30 PM</Text>
          </View>
        </View>

        <View className="mb-2.5 flex-row items-center gap-3 rounded-[14px] border border-[#4D8BFF]/10 bg-[#151B2D]/80 p-3">
          <Text className="text-lg">🏆</Text>
          <View className="flex-1">
            <Text className="mb-0.5 text-xs text-white/85">
              You completed <Text className="font-semibold text-[#4D8BFF]">Consistency Week</Text>{' '}
              challenge!
            </Text>
            <Text className="text-[9px] text-white/40">Yesterday 11:45 AM</Text>
          </View>
        </View>

        {/* EARLIER */}
        <Text className="mt-3 mb-2.5 text-[10px] font-semibold tracking-wider text-white/50 uppercase">
          Earlier
        </Text>

        <View className="mb-6 flex-row items-center gap-3 rounded-[14px] border border-[#4D8BFF]/10 bg-[#151B2D]/80 p-3">
          <Text className="text-lg">🔥</Text>
          <View className="flex-1">
            <Text className="mb-0.5 text-xs text-white/85">
              You&apos;re on a <Text className="font-semibold text-[#4D8BFF]">28 day streak!</Text>{' '}
              Keep it up
            </Text>
            <Text className="text-[9px] text-white/40">3 days ago</Text>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
