import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  SafeAreaView,
  TextInput,
  StatusBar,
} from 'react-native';
import { useRouter } from 'expo-router';
import '@/global.css';

export default function PostDetailScreen() {
  const router = useRouter();
  const [likes, setLikes] = useState(48);
  const [isLiked, setIsLiked] = useState(false);
  const [commentText, setCommentText] = useState('');
  const [comments, setComments] = useState([
    {
      id: 'c1',
      author: 'devraj',
      isCreator: true,
      text: '@mike.j Went with Supabase Auth. So much easier than rolling my own!',
      time: '30m ago',
    },
    {
      id: 'c2',
      author: 'sara.r',
      isCreator: false,
      text: 'Awesome! How long did the total setup take?',
      time: '1h ago',
    },
    {
      id: 'c3',
      author: 'mike.j',
      isCreator: false,
      text: 'Nice! Which auth provider did you use?',
      time: '45m ago',
    },
  ]);

  const handleAddComment = () => {
    if (!commentText.trim()) return;
    setComments([
      ...comments,
      {
        id: Date.now().toString(),
        author: 'devraj',
        isCreator: true,
        text: commentText.trim(),
        time: 'Just now',
      },
    ]);
    setCommentText('');
  };

  return (
    <SafeAreaView className="flex-1 bg-[#08111F]">
      <StatusBar barStyle="light-content" backgroundColor="#08111F" />

      {/* Topbar */}
      <View className="flex-row items-center gap-3 border-b border-white/5 px-4 py-3">
        <TouchableOpacity onPress={() => router.back()} className="-ml-2 rounded-full p-2">
          <Text className="text-base text-white">←</Text>
        </TouchableOpacity>
        <Text className="text-base font-bold text-white">Post</Text>
      </View>

      <ScrollView className="flex-1 px-4 pt-3" showsVerticalScrollIndicator={false}>
        {/* Badges Header */}
        <View className="mb-3.5 flex-row flex-wrap gap-1.5 border-b border-white/5 pb-3.5">
          <View className="rounded-full bg-[#4D8BFF]/15 px-2.5 py-1">
            <Text className="text-[10px] font-semibold text-[#4D8BFF]">Lore of Ambition</Text>
          </View>
          <View className="rounded-full bg-[#4D8BFF]/15 px-2.5 py-1">
            <Text className="text-[10px] font-semibold text-[#4D8BFF]">Programming</Text>
          </View>
          <View className="rounded-full bg-[#4D8BFF]/15 px-2.5 py-1">
            <Text className="text-[10px] font-semibold text-[#4D8BFF]">Day 14</Text>
          </View>
        </View>

        {/* Post Card */}
        <View className="mb-4 rounded-[18px] border border-[#4D8BFF]/10 bg-[#151B2D]/80 p-4">
          <View className="mb-3 flex-row items-center gap-3">
            <View className="h-10 w-10 items-center justify-center rounded-full bg-[#4D8BFF]/20">
              <Text className="text-sm font-bold text-white">DV</Text>
            </View>
            <View className="flex-1">
              <Text className="text-xs font-semibold text-white">devraj</Text>
              <Text className="text-[10px] text-white/50">2 hours ago</Text>
            </View>
          </View>

          <Text className="mb-4 text-xs leading-5 text-white/90">
            finally got authentication working after 3 days of debugging 🔥 so satisfying!
          </Text>

          {/* Action Row */}
          <View className="flex-row items-center justify-between border-t border-white/5 pt-2">
            <TouchableOpacity
              onPress={() => {
                setIsLiked(!isLiked);
                setLikes(isLiked ? likes - 1 : likes + 1);
              }}
              className="flex-row items-center gap-1.5">
              <Text className="text-xs">{isLiked ? '❤️' : '🤍'}</Text>
              <Text className="text-[11px] text-white/50">{likes}</Text>
            </TouchableOpacity>

            <View className="flex-row items-center gap-1.5">
              <Text className="text-xs">💬</Text>
              <Text className="text-[11px] text-white/50">{comments.length}</Text>
            </View>

            <View className="flex-row items-center gap-1.5">
              <Text className="text-xs">🔄</Text>
              <Text className="text-[11px] text-white/50">6</Text>
            </View>

            <Text className="text-xs text-white/40">🔖</Text>
            <Text className="text-xs text-white/40">↗️</Text>
          </View>
        </View>

        {/* Comments Section Label */}
        <Text className="mb-3 text-xs font-semibold tracking-wider text-white/50 uppercase">
          {comments.length} Comments
        </Text>

        {/* Comments List */}
        <View className="gap-2.5 pb-24">
          {comments.map((comment) => (
            <View
              key={comment.id}
              className={`rounded border-l-4 bg-[#0E1A2E]/50 p-3 ${
                comment.isCreator ? 'border-[#4D8BFF]' : 'border-[#4D8BFF]/30'
              }`}>
              <Text className="mb-1 text-[11px] font-semibold text-[#4D8BFF]">
                {comment.author}
              </Text>
              <Text className="mb-1.5 text-xs leading-5 text-white/85">{comment.text}</Text>
              <Text className="text-[9px] text-white/40">{comment.time}</Text>
            </View>
          ))}
        </View>
      </ScrollView>

      {/* Fixed Comment Input */}
      <View className="flex-row items-center gap-2 border-t border-[#4D8BFF]/15 bg-[#151B2D] p-3">
        <TextInput
          placeholder="Write a reply..."
          placeholderTextColor="rgba(255,255,255,0.4)"
          value={commentText}
          onChangeText={setCommentText}
          className="flex-1 rounded-xl border border-[#4D8BFF]/20 bg-[#08111F] px-3.5 py-2 text-xs text-white"
        />
        <TouchableOpacity
          onPress={handleAddComment}
          className="rounded-xl bg-[#4D8BFF] px-3.5 py-2">
          <Text className="text-xs font-bold text-white">Send</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}
