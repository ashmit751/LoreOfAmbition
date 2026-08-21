import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  ScrollView,
  TouchableOpacity,
  SafeAreaView,
  StatusBar,
} from 'react-native';
import { useRouter } from 'expo-router';
import "@/global.css"

const NICHES = ['Programming', 'Design', 'Writing', 'Fitness', 'Business'];

const CREATORS = [
  {
    id: '1',
    name: 'Alex Chen',
    avatar: '🧑‍💻',
    niche: 'Building AI tools',
    streak: 152,
  },
  {
    id: '2',
    name: 'Maya Design',
    avatar: '🎨',
    niche: 'UX/UI Designer',
    streak: 87,
  },
  {
    id: '3',
    name: 'Startup Soul',
    avatar: '🚀',
    niche: 'Indie Hacker',
    streak: 204,
  },
  {
    id: '4',
    name: 'Elena Rostova',
    avatar: '🎬',
    niche: 'Filmmaker & Storyteller',
    streak: 42,
  },
];

export default function DiscoverScreen() {
  const router = useRouter();
  const [search, setSearch] = useState('');
  const [selectedNiche, setSelectedNiche] = useState('Programming');
  const [followingMap, setFollowingMap] = useState<{ [key: string]: boolean }>({});

  const toggleFollow = (id: string) => {
    setFollowingMap((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  return (
    <SafeAreaView className="flex-1 bg-[#08111F]">
      <StatusBar barStyle="light-content" backgroundColor="#08111F" />

      {/* Topbar */}
      <View className="px-5 py-3 flex-row items-center justify-between border-b border-white/5">
        <Text className="text-xl font-bold text-white tracking-wide">Discover</Text>
        <TouchableOpacity
          onPress={() => router.push('/notifications')}
          className="p-2 bg-[#151B2D] border border-[#4D8BFF]/20 rounded-full"
        >
          <Text className="text-sm">🔔</Text>
        </TouchableOpacity>
      </View>

      <ScrollView className="flex-1 px-4 pt-3" showsVerticalScrollIndicator={false}>
        {/* Search Bar */}
        <View className="bg-[#0E1A2E]/80 border border-[#4D8BFF]/15 rounded-xl px-3.5 py-2.5 mb-3.5 flex-row items-center">
          <Text className="text-sm mr-2 text-white/50">🔍</Text>
          <TextInput
            placeholder="Search creators..."
            placeholderTextColor="rgba(255,255,255,0.4)"
            value={search}
            onChangeText={setSearch}
            className="flex-1 text-xs text-white p-0"
          />
        </View>

        {/* Niche Filter Pills */}
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          className="mb-4 flex-row"
        >
          <View className="flex-row gap-2">
            {NICHES.map((niche) => (
              <TouchableOpacity
                key={niche}
                onPress={() => setSelectedNiche(niche)}
                className={`px-3 py-1.5 rounded-[10px] border ${
                  selectedNiche === niche
                    ? 'bg-[#4D8BFF] border-[#4D8BFF]'
                    : 'bg-[#4D8BFF]/10 border-[#4D8BFF]/20'
                }`}
              >
                <Text
                  className={`text-[10px] font-medium ${
                    selectedNiche === niche ? 'text-white font-semibold' : 'text-white/60'
                  }`}
                >
                  {niche}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </ScrollView>

        {/* Creator Cards */}
        <View className="gap-3 pb-6">
          {CREATORS.map((creator) => {
            const isFollowing = !!followingMap[creator.id];
            return (
              <View
                key={creator.id}
                className="bg-[#151B2D]/80 border border-[#4D8BFF]/10 rounded-[18px] p-4 items-center"
              >
                <Text className="text-3xl mb-2">{creator.avatar}</Text>
                <Text className="text-xs font-semibold text-white mb-0.5">
                  {creator.name}
                </Text>
                <Text className="text-[10px] text-white/50 mb-1.5">
                  {creator.niche}
                </Text>
                <Text className="text-[10px] text-[#FF9650] font-medium mb-3">
                  🔥 {creator.streak} Day Streak
                </Text>

                <TouchableOpacity
                  onPress={() => toggleFollow(creator.id)}
                  className={`w-full py-2 rounded-[10px] items-center justify-center ${
                    isFollowing
                      ? 'bg-transparent border border-[#4D8BFF]/40'
                      : 'bg-[#4D8BFF]'
                  }`}
                >
                  <Text
                    className={`text-xs font-semibold ${
                      isFollowing ? 'text-[#4D8BFF]' : 'text-white'
                    }`}
                  >
                    {isFollowing ? 'Following' : '+ Follow'}
                  </Text>
                </TouchableOpacity>
              </View>
            );
          })}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}