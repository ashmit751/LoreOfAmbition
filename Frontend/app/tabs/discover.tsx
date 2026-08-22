import React, { useState } from 'react';
import {
  View,
  Text,
  Image,
  TextInput,
  ScrollView,
  TouchableOpacity,
  SafeAreaView,
  StatusBar,
  Platform,
} from 'react-native';
import { useRouter } from 'expo-router';
import { APP_ICON } from '@/constants/icons';
import '@/global.css';

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
          <Text className="text-xl font-bold tracking-wide text-white">Discover</Text>
        </View>
        <TouchableOpacity
          onPress={() => router.push('/notifications')}
          className="rounded-full border border-[#4D8BFF]/20 bg-[#151B2D] p-2">
          <Text className="text-sm">🔔</Text>
        </TouchableOpacity>
      </View>

      <ScrollView className="flex-1 px-4 pt-3" showsVerticalScrollIndicator={false}>
        {/* Search Bar */}
        <View className="mb-3.5 flex-row items-center rounded-xl border border-[#4D8BFF]/15 bg-[#0E1A2E]/80 px-3.5 py-2.5">
          <Text className="mr-2 text-sm text-white/50">🔍</Text>
          <TextInput
            placeholder="Search creators..."
            placeholderTextColor="rgba(255,255,255,0.4)"
            value={search}
            onChangeText={setSearch}
            className="flex-1 p-0 text-xs text-white"
          />
        </View>

        {/* Niche Filter Pills */}
        <ScrollView horizontal showsHorizontalScrollIndicator={false} className="mb-4 flex-row">
          <View className="flex-row gap-2">
            {NICHES.map((niche) => (
              <TouchableOpacity
                key={niche}
                onPress={() => setSelectedNiche(niche)}
                className={`rounded-[10px] border px-3 py-1.5 ${
                  selectedNiche === niche
                    ? 'border-[#4D8BFF] bg-[#4D8BFF]'
                    : 'border-[#4D8BFF]/20 bg-[#4D8BFF]/10'
                }`}>
                <Text
                  className={`text-[10px] font-medium ${
                    selectedNiche === niche ? 'font-semibold text-white' : 'text-white/60'
                  }`}>
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
                className="items-center rounded-[18px] border border-[#4D8BFF]/10 bg-[#151B2D]/80 p-4">
                <Text className="mb-2 text-3xl">{creator.avatar}</Text>
                <Text className="mb-0.5 text-xs font-semibold text-white">{creator.name}</Text>
                <Text className="mb-1.5 text-[10px] text-white/50">{creator.niche}</Text>
                <Text className="mb-3 text-[10px] font-medium text-[#FF9650]">
                  🔥 {creator.streak} Day Streak
                </Text>

                <TouchableOpacity
                  onPress={() => toggleFollow(creator.id)}
                  className={`w-full items-center justify-center rounded-[10px] py-2 ${
                    isFollowing ? 'border border-[#4D8BFF]/40 bg-transparent' : 'bg-[#4D8BFF]'
                  }`}>
                  <Text
                    className={`text-xs font-semibold ${
                      isFollowing ? 'text-[#4D8BFF]' : 'text-white'
                    }`}>
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
