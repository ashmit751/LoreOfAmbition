import React from 'react';
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

  return (
    <SafeAreaView className="flex-1 bg-[#08111F]">
      <StatusBar barStyle="light-content" backgroundColor="#08111F" />

      {/* Topbar */}
      <View className="px-5 py-3 flex-row items-center justify-between border-b border-white/5">
        <Text className="text-xl font-bold text-white tracking-wide">Challenges</Text>
        <TouchableOpacity
          onPress={() => router.push('/notifications')}
          className="p-2 bg-[#151B2D] border border-[#4D8BFF]/20 rounded-full"
        >
          <Text className="text-sm">🔔</Text>
        </TouchableOpacity>
      </View>

      <ScrollView className="flex-1 px-4 pt-3" showsVerticalScrollIndicator={false}>
        {/* Create Challenge Action */}
        <TouchableOpacity
          onPress={() => router.push('/tabs/create')}
          className="w-full bg-[#4D8BFF] py-2.5 rounded-xl items-center justify-center mb-4"
        >
          <Text className="text-xs font-semibold text-white">+ Create Challenge</Text>
        </TouchableOpacity>

        {/* Challenges List */}
        <View className="gap-3 pb-6">
          {CHALLENGES.map((item) => (
            <View
              key={item.id}
              className="bg-[#4D8BFF]/[0.08] border border-[#4D8BFF]/20 rounded-[14px] p-3.5"
            >
              <Text className="text-xs font-bold text-white mb-2.5">{item.title}</Text>
              
              {/* Progress Bar */}
              <View className="w-full h-1.5 bg-[#4D8BFF]/15 rounded-full overflow-hidden mb-2">
                <View
                  style={{
                    width: `${item.progress}%`,
                    backgroundColor: item.isCompleted ? '#4CAF50' : '#4D8BFF',
                  }}
                  className="h-full rounded-full"
                />
              </View>

              <Text className="text-[10px] text-white/60 mb-2.5">{item.meta}</Text>

              {item.isCompleted ? (
                <TouchableOpacity
                  onPress={() => router.push(`/challenge/${item.id}`)}
                  className="w-full bg-[#4CAF50]/80 py-2 rounded-[10px] items-center justify-center"
                >
                  <Text className="text-[11px] font-semibold text-white">View Details</Text>
                </TouchableOpacity>
              ) : (
                <TouchableOpacity
                  onPress={() => router.push(`/challenge/${item.id}`)}
                  className="w-full bg-transparent border border-[#4D8BFF]/30 py-2 rounded-[10px] items-center justify-center"
                >
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