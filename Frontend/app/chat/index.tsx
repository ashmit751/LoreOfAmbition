import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  SafeAreaView,
  StatusBar,
  Platform,
  TextInput,
} from 'react-native';
import { useRouter } from 'expo-router';
import '@/global.css';

interface ChatConversation {
  id: string;
  name: string;
  handle: string;
  avatar: string;
  isOnline: boolean;
  lastMessage: string;
  time: string;
  unreadCount: number;
}

const INITIAL_CONVERSATIONS: ChatConversation[] = [
  {
    id: 'conv_1',
    name: 'Sara Chen',
    handle: 'sarachen_ui',
    avatar: '🎨',
    isOnline: true,
    lastMessage: 'Love the dark mode layout! Are you open to collaborating on the design system?',
    time: '12m',
    unreadCount: 2,
  },
  {
    id: 'conv_2',
    name: 'Devraj Patel',
    handle: 'devraj_solos',
    avatar: '⚡',
    isOnline: true,
    lastMessage: 'How did you handle the Supabase session persistence across restarts?',
    time: '1h',
    unreadCount: 0,
  },
  {
    id: 'conv_3',
    name: 'Alex Rivera',
    handle: 'alexr_dev',
    avatar: '👨‍💻',
    isOnline: false,
    lastMessage: 'Check out the new challenge on the growth board. We should do the 30-day build!',
    time: '3h',
    unreadCount: 0,
  },
  {
    id: 'conv_4',
    name: 'Elena Rostova',
    handle: 'elena_ai',
    avatar: '🤖',
    isOnline: false,
    lastMessage: 'Voice agent latency test results came back looking solid!',
    time: 'Yesterday',
    unreadCount: 0,
  },
];

export default function ChatInboxScreen() {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState('');
  const [conversations] = useState<ChatConversation[]>(INITIAL_CONVERSATIONS);

  const filteredConversations = conversations.filter(
    (c) =>
      c.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.handle.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.lastMessage.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  const hardTopPadding = Platform.OS === 'android' ? (StatusBar.currentHeight || 28) + 16 : 20;

  return (
    <SafeAreaView className="flex-1 bg-[#08111F]">
      <StatusBar barStyle="light-content" backgroundColor="#08111F" />

      {/* ─── TOP BAR: Back Button + Title + New Message Icon ─── */}
      <View
        style={{ paddingTop: hardTopPadding }}
        className="flex-row items-center justify-between border-b border-white/5 bg-[#08111F] px-4 pb-3">
        <TouchableOpacity
          onPress={() => router.back()}
          activeOpacity={0.7}
          className="h-10 w-10 items-center justify-center rounded-xl border border-white/10 bg-[#151B2D]">
          <Text className="text-base text-white">←</Text>
        </TouchableOpacity>

        <View className="items-center">
          <Text className="text-base font-bold text-white">Messages</Text>
          <Text className="text-[10px] text-[#4D8BFF]">Direct Creator Lore</Text>
        </View>

        <TouchableOpacity
          onPress={() => router.push('/chat/new')}
          activeOpacity={0.7}
          className="h-10 w-10 items-center justify-center rounded-xl border border-white/10 bg-[#151B2D]">
          <Text className="text-base text-white">✏️</Text>
        </TouchableOpacity>
      </View>

      <ScrollView className="flex-1" showsVerticalScrollIndicator={false}>
        {/* ─── SEARCH BAR ─── */}
        <View className="p-4 pb-2">
          <View className="flex-row items-center rounded-2xl border border-white/10 bg-[#151B2D] px-3.5 py-2.5">
            <Text className="mr-2 text-xs text-white/40">🔍</Text>
            <TextInput
              value={searchQuery}
              onChangeText={setSearchQuery}
              placeholder="Search creators and messages..."
              placeholderTextColor="#55607A"
              className="flex-1 text-xs text-white"
            />
            {searchQuery ? (
              <TouchableOpacity onPress={() => setSearchQuery('')}>
                <Text className="text-xs text-white/50">✕</Text>
              </TouchableOpacity>
            ) : null}
          </View>
        </View>

        {/* ─── ACTIVE NOW (Stories / Online Creators Bar) ─── */}
        <View className="py-2 pl-4">
          <Text className="mb-2.5 text-[11px] font-bold tracking-wider text-white/40 uppercase">
            Active Now
          </Text>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={{ gap: 14, paddingRight: 20 }}>
            {conversations.map((c) => (
              <TouchableOpacity
                key={c.id}
                onPress={() =>
                  router.push({
                    pathname: '/chat/[id]',
                    params: { id: c.id, name: c.name, handle: c.handle, avatar: c.avatar },
                  })
                }
                activeOpacity={0.7}
                className="items-center">
                <View className="relative">
                  <View className="h-14 w-14 items-center justify-center rounded-full border-2 border-[#4D8BFF]/40 bg-[#151B2D]">
                    <Text className="text-2xl">{c.avatar}</Text>
                  </View>
                  {c.isOnline ? (
                    <View className="absolute right-0 bottom-0 h-4 w-4 items-center justify-center rounded-full border-2 border-[#08111F] bg-[#10B981]">
                      <View className="h-1.5 w-1.5 rounded-full bg-white" />
                    </View>
                  ) : null}
                </View>
                <Text numberOfLines={1} className="mt-1 w-16 text-center text-[10px] text-white/70">
                  {c.name.split(' ')[0]}
                </Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>

        {/* ─── CONVERSATIONS LIST ─── */}
        <View className="p-4 pt-2">
          <Text className="mb-2.5 text-[11px] font-bold tracking-wider text-white/40 uppercase">
            Messages ({filteredConversations.length})
          </Text>

          <View className="gap-2.5">
            {filteredConversations.map((c) => (
              <TouchableOpacity
                key={c.id}
                onPress={() =>
                  router.push({
                    pathname: '/chat/[id]',
                    params: { id: c.id, name: c.name, handle: c.handle, avatar: c.avatar },
                  })
                }
                activeOpacity={0.8}
                className="flex-row items-center gap-3.5 rounded-2xl border border-white/5 bg-[#151B2D] p-3.5 shadow-sm">
                {/* Avatar with indicator */}
                <View className="relative">
                  <View className="h-12 w-12 items-center justify-center rounded-full border border-white/10 bg-[#0E1626]">
                    <Text className="text-2xl">{c.avatar}</Text>
                  </View>
                  {c.isOnline ? (
                    <View className="absolute right-0 bottom-0 h-3.5 w-3.5 rounded-full border-2 border-[#151B2D] bg-[#10B981]" />
                  ) : null}
                </View>

                {/* Details */}
                <View className="flex-1 justify-center">
                  <View className="flex-row items-center justify-between">
                    <Text className="text-xs font-bold text-white">{c.name}</Text>
                    <Text className="text-[10px] text-white/40">{c.time}</Text>
                  </View>
                  <Text numberOfLines={1} className="mt-1 text-xs text-white/60">
                    {c.lastMessage}
                  </Text>
                </View>

                {/* Unread badge */}
                {c.unreadCount > 0 ? (
                  <View className="h-5 w-5 items-center justify-center rounded-full bg-[#4D8BFF]">
                    <Text className="text-[10px] font-bold text-white">{c.unreadCount}</Text>
                  </View>
                ) : null}
              </TouchableOpacity>
            ))}
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
