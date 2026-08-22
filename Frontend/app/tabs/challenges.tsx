import React from 'react';
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
import { APP_ICON } from '@/constants/icons';
import '@/global.css';

const CHALLENGES = [
  {
    id: '1',
    title: '30 Day Build',
    progress: 14,
    meta: '4 of 30 days • 156 members',
    isCompleted: false,
  },
  {
    id: '2',
    title: 'Design Daily',
    progress: 65,
    meta: '13 of 20 days • 89 members',
    isCompleted: false,
  },
  {
    id: '3',
    title: 'Consistency Week',
    progress: 100,
    meta: '7 of 7 completed! 🎉',
    isCompleted: true,
  },
];

export default function ChallengesScreen() {
  const router = useRouter();
  const hardTopPadding = Platform.OS === 'android' ? (StatusBar.currentHeight || 28) + 24 : 32;

  return (
    <SafeAreaView className="flex-1 bg-[#08111F]">
      <StatusBar barStyle="light-content" backgroundColor="#08111F" />

      {/* Instagram-style Top Header Bar with Logo & Hard Top Margin */}
      <View
        style={{ paddingTop: hardTopPadding }}
        className="flex-row items-center justify-between border-b border-white/5 bg-[#08111F] px-5 pb-3.5">
        <View className="flex-row items-center gap-2.5">
          <Image source={APP_ICON} className="h-7 w-7 rounded-lg" resizeMode="contain" />
          <Text className="text-xl font-bold tracking-wide text-white">Challenges</Text>
        </View>
        <TouchableOpacity
          onPress={() => router.push('/notifications')}
          className="rounded-full border border-[#4D8BFF]/20 bg-[#151B2D] p-2">
          <Text className="text-sm">🔔</Text>
        </TouchableOpacity>
      </View>

      <ScrollView className="flex-1 px-4 pt-3" showsVerticalScrollIndicator={false}>
        {/* Create Challenge Action */}
        <TouchableOpacity
          onPress={() => router.push('/tabs/create')}
          className="mb-4 w-full items-center justify-center rounded-xl bg-[#4D8BFF] py-2.5">
          <Text className="text-xs font-semibold text-white">+ Create Challenge</Text>
        </TouchableOpacity>

        {/* Challenges List */}
        <View className="gap-3 pb-6">
          {CHALLENGES.map((item) => (
            <View
              key={item.id}
              className="rounded-[14px] border border-[#4D8BFF]/20 bg-[#4D8BFF]/[0.08] p-3.5">
              <Text className="mb-2.5 text-xs font-bold text-white">{item.title}</Text>

              {/* Progress Bar */}
              <View className="mb-2 h-1.5 w-full overflow-hidden rounded-full bg-[#4D8BFF]/15">
                <View
                  style={{
                    width: `${item.progress}%`,
                    backgroundColor: item.isCompleted ? '#4CAF50' : '#4D8BFF',
                  }}
                  className="h-full rounded-full"
                />
              </View>

              <Text className="mb-2.5 text-[10px] text-white/60">{item.meta}</Text>

              {item.isCompleted ? (
                <TouchableOpacity
                  onPress={() => router.push(`/challenge/${item.id}`)}
                  className="w-full items-center justify-center rounded-[10px] bg-[#4CAF50]/80 py-2">
                  <Text className="text-[11px] font-semibold text-white">View Details</Text>
                </TouchableOpacity>
              ) : (
                <TouchableOpacity
                  onPress={() => router.push(`/challenge/${item.id}`)}
                  className="w-full items-center justify-center rounded-[10px] border border-[#4D8BFF]/30 bg-transparent py-2">
                  <Text className="text-[11px] font-semibold text-[#4D8BFF]">Continue →</Text>
                </TouchableOpacity>
              )}
            </View>
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
