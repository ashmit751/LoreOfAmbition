import React, { useState, useRef, useEffect } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  SafeAreaView,
  StatusBar,
  Platform,
  TextInput,
  KeyboardAvoidingView,
} from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import '@/global.css';

interface Message {
  id: string;
  sender: 'me' | 'them';
  text: string;
  time: string;
}

const DEFAULT_MESSAGES: Record<string, Message[]> = {
  conv_1: [
    {
      id: 'm1',
      sender: 'them',
      text: 'Hey! Saw your post on Lore of Ambition about shipping the auth module.',
      time: '10:14 AM',
    },
    {
      id: 'm2',
      sender: 'me',
      text: 'Thanks Sara! Debugging the mobile session token took some time, but it works smoothly now.',
      time: '10:18 AM',
    },
    {
      id: 'm3',
      sender: 'them',
      text: 'Love the dark mode layout! Are you open to collaborating on the design system?',
      time: '10:22 AM',
    },
  ],
};

const QUICK_STARTERS = [
  'Congrats on the launch! 🎉',
  'Want to collaborate on Lore? 🤝',
  'What stack are you using? 💻',
  'Following your 30-day challenge! 🔥',
];

export default function ChatConversationScreen() {
  const router = useRouter();
  const params = useLocalSearchParams<{
    id?: string;
    name?: string;
    handle?: string;
    avatar?: string;
  }>();

  const conversationId = params.id || 'conv_1';
  const creatorName = params.name || 'Sara Chen';
  const creatorHandle = params.handle || 'sarachen_ui';
  const creatorAvatar = params.avatar || '🎨';

  const [messages, setMessages] = useState<Message[]>(
    DEFAULT_MESSAGES[conversationId] || [
      {
        id: 'init_1',
        sender: 'them',
        text: `Hey there! Connecting from Lore of Ambition. How is your project build going?`,
        time: 'Just now',
      },
    ],
  );
  const [inputText, setInputText] = useState('');
  const scrollViewRef = useRef<ScrollView>(null);

  useEffect(() => {
    scrollViewRef.current?.scrollToEnd({ animated: true });
  }, [messages]);

  const handleSend = (textToSend?: string) => {
    const content = (textToSend || inputText).trim();
    if (!content) return;

    const newMessage: Message = {
      id: `msg_${Date.now()}`,
      sender: 'me',
      text: content,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    setMessages((prev) => [...prev, newMessage]);
    if (!textToSend) setInputText('');

    // Optional subtle creator auto-reply after 1.5s
    setTimeout(() => {
      const autoReply: Message = {
        id: `reply_${Date.now()}`,
        sender: 'them',
        text: 'Got your message! Let’s ship this together 🔥',
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };
      setMessages((prev) => [...prev, autoReply]);
    }, 1500);
  };

  const hardTopPadding = Platform.OS === 'android' ? (StatusBar.currentHeight || 28) + 16 : 20;

  return (
    <SafeAreaView className="flex-1 bg-[#08111F]">
      <StatusBar barStyle="light-content" backgroundColor="#08111F" />

      {/* ─── CHAT TOP HEADER ─── */}
      <View
        style={{ paddingTop: hardTopPadding }}
        className="flex-row items-center justify-between border-b border-white/5 bg-[#08111F] px-4 pb-3">
        {/* Back Button */}
        <TouchableOpacity
          onPress={() => router.back()}
          activeOpacity={0.7}
          className="h-10 w-10 items-center justify-center rounded-xl border border-white/10 bg-[#151B2D]">
          <Text className="text-base text-white">←</Text>
        </TouchableOpacity>

        {/* Creator Info */}
        <View className="flex-row items-center gap-2.5">
          <View className="relative">
            <View className="h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-[#151B2D]">
              <Text className="text-xl">{creatorAvatar}</Text>
            </View>
            <View className="absolute right-0 bottom-0 h-3 w-3 rounded-full border border-[#08111F] bg-[#10B981]" />
          </View>
          <View>
            <Text className="text-xs font-bold text-white">{creatorName}</Text>
            <Text className="text-[10px] text-[#10B981]">● Active now</Text>
          </View>
        </View>

        {/* Info / Creator Profile shortcut */}
        <TouchableOpacity
          onPress={() => router.push('/tabs/profile')}
          activeOpacity={0.7}
          className="h-10 w-10 items-center justify-center rounded-xl border border-white/10 bg-[#151B2D]">
          <Text className="text-sm">ℹ️</Text>
        </TouchableOpacity>
      </View>

      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        className="flex-1">
        {/* ─── MESSAGES SCROLL AREA ─── */}
        <ScrollView
          ref={scrollViewRef}
          className="flex-1 px-4 pt-3"
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingBottom: 16 }}>
          {/* Conversation Starter Banner */}
          <View className="my-3 items-center">
            <View className="h-16 w-16 items-center justify-center rounded-full border-2 border-[#4D8BFF]/30 bg-[#151B2D]">
              <Text className="text-3xl">{creatorAvatar}</Text>
            </View>
            <Text className="mt-2 text-sm font-bold text-white">{creatorName}</Text>
            <Text className="text-xs text-white/50">@{creatorHandle}</Text>
            <View className="mt-1 rounded-full bg-[#4D8BFF]/15 px-2.5 py-0.5">
              <Text className="text-[10px] font-semibold text-[#4D8BFF]">Builder on Lore</Text>
            </View>
            <View className="mt-3 h-[1px] w-full bg-white/5" />
          </View>

          {/* Messages List */}
          <View className="gap-3">
            {messages.map((m) => {
              const isMe = m.sender === 'me';
              return (
                <View
                  key={m.id}
                  className={`max-w-[78%] rounded-2xl p-3.5 shadow-sm ${isMe
                    ? 'self-end rounded-br-sm bg-[#4D8BFF]'
                    : 'self-start rounded-bl-sm border border-white/5 bg-[#151B2D]'
                    }`}>
                  <Text className="text-xs leading-5 text-white">{m.text}</Text>
                  <View className="mt-1 flex-row items-center justify-end gap-1">
                    <Text className="text-[9px] text-white/60">{m.time}</Text>
                    {isMe ? <Text className="text-[9px] text-white/80">✓✓</Text> : null}
                  </View>
                </View>
              );
            })}
          </View>
        </ScrollView>

        {/* ─── QUICK STARTER CHIPS ─── */}
        <View className="border-t border-white/5 bg-[#08111F] px-3 py-2">
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={{ gap: 8 }}>
            {QUICK_STARTERS.map((starter, idx) => (
              <TouchableOpacity
                key={idx}
                onPress={() => handleSend(starter)}
                activeOpacity={0.7}
                className="rounded-full border border-[#4D8BFF]/30 bg-[#4D8BFF]/10 px-3 py-1.5">
                <Text className="text-[11px] font-medium text-[#4D8BFF]">{starter}</Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>

        {/* ─── INPUT BAR ─── */}
        <View className="flex-row items-center gap-2 border-t border-white/5 bg-[#0E1626] p-3 pb-5">
          <TextInput
            value={inputText}
            onChangeText={setInputText}
            placeholder={`Message @${creatorHandle}...`}
            placeholderTextColor="#55607A"
            className="flex-1 rounded-2xl border border-white/10 bg-[#151B2D] px-4 py-3 text-xs text-white"
          />

          <TouchableOpacity
            onPress={() => handleSend()}
            disabled={!inputText.trim()}
            activeOpacity={0.8}
            className={`h-11 w-11 items-center justify-center rounded-2xl ${inputText.trim() ? 'bg-[#4D8BFF]' : 'bg-[#4D8BFF]/30'
              }`}>
            <Text className="text-sm font-bold text-white">➤</Text>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
