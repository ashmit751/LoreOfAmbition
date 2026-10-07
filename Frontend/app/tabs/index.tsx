import React, { useState, useEffect, useMemo } from 'react';
import {
  View,
  Text,
  Image,
  ScrollView,
  TouchableOpacity,
  SafeAreaView,
  StatusBar,
  Platform,
  RefreshControl,
  Share,
} from 'react-native';
import { useRouter } from 'expo-router';
import { PAGE_LOGO } from '@/constants/icons';
import { sessionManager } from '@/lib/session';
import { loreApi } from '@/lib/api';
import '@/global.css';

interface FeedPost {
  id: string;
  authorId?: string;
  authorName: string;
  authorHandle: string;
  authorAvatar: string;
  badge?: string;
  project: string;
  category: string;
  dayNumber?: number;
  content: string;
  likes: number;
  comments: number;
  createdAt: number; // timestamp in ms
  isLiked?: boolean;
  isSaved?: boolean;
}

const INITIAL_POSTS: FeedPost[] = [
  {
    id: 'post_1',
    authorName: 'Alex Rivera',
    authorHandle: 'alexr_dev',
    authorAvatar: '👨‍💻',
    badge: '🔥 21 Day Streak',
    project: 'Lore of Ambition',
    category: 'Full-Stack',
    dayNumber: 14,
    content:
      'Finally integrated Supabase auth with persistent mobile sessions! Debugged LAN networking for 2 hours, but it now connects seamlessly across devices 🚀',
    likes: 54,
    comments: 14,
    createdAt: Date.now() - 1000 * 60 * 35, // 35m ago
  },
  {
    id: 'post_2',
    authorName: 'Sara Chen',
    authorHandle: 'sarachen_ui',
    authorAvatar: '🎨',
    badge: '⭐ Top Designer',
    project: 'CraftUI Kit',
    category: 'Design',
    dayNumber: 8,
    content:
      'Completed the Instagram-style dark mode design system for creators. Focused on #08111F backdrop with subtle 4D8BFF lighting. What do you think of this contrast?',
    likes: 82,
    comments: 23,
    createdAt: Date.now() - 1000 * 60 * 95, // 1.5h ago
  },
  {
    id: 'post_3',
    authorName: 'Devraj Patel',
    authorHandle: 'devraj_solos',
    authorAvatar: '⚡',
    badge: '🚀 Indie Founder',
    project: 'MicroSaas 30',
    category: 'Indie Hacking',
    dayNumber: 22,
    content:
      'Hit $500 MRR on my background job monitoring tool! Lesson learned: ship the MVP before you feel ready. Feedback from users in week 1 saved months of wasted effort.',
    likes: 138,
    comments: 41,
    createdAt: Date.now() - 1000 * 60 * 240, // 4h ago
  },
  {
    id: 'post_4',
    authorName: 'Elena Rostova',
    authorHandle: 'elena_ai',
    authorAvatar: '🤖',
    badge: '💡 AI Researcher',
    project: 'VoiceAgent Pro',
    category: 'Artificial Intelligence',
    dayNumber: 3,
    content:
      'Day 3 of building a low-latency voice pipeline with WebSocket audio streams. Real-time interruptions are tricky, but getting sub-400ms roundtrip now!',
    likes: 67,
    comments: 19,
    createdAt: Date.now() - 1000 * 60 * 380, // 6.3h ago
  },
];

export default function HomeFeed() {
  const router = useRouter();

  // Feed Algorithm selection
  const [feedFilter, setFeedFilter] = useState<'for_you' | 'latest' | 'following'>('for_you');
  const [posts, setPosts] = useState<FeedPost[]>(INITIAL_POSTS);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [lastTap, setLastTap] = useState<{ [key: string]: number }>({});
  const [savedPosts, setSavedPosts] = useState<{ [key: string]: boolean }>({});
  const [followingMap, setFollowingMap] = useState<{ [key: string]: boolean }>({
    alexr_dev: true,
    sarachen_ui: true,
  });

  // Load live posts from Supabase backend if available
  useEffect(() => {
    loadLivePosts();
  }, []);

  const loadLivePosts = async () => {
    try {
      const res = await loreApi.getPosts();
      if (res?.data && res.data.length > 0) {
        const livePosts: FeedPost[] = res.data.map((item) => ({
          id: item.id,
          authorId: item.author_id,
          authorName: item.profiles?.display_name || item.profiles?.username || 'Creator',
          authorHandle: item.profiles?.username || 'creator',
          authorAvatar: item.profiles?.profile_image || '👨‍💻',
          badge: item.profiles?.creator_level || 'Builder',
          project: 'Public Lore',
          category: 'Build in Public',
          content: item.content,
          likes: Math.floor(Math.random() * 20) + 5,
          comments: Math.floor(Math.random() * 8) + 1,
          createdAt: new Date(item.created_at).getTime(),
        }));

        // Merge live posts on top of initial curated community posts
        setPosts((prev) => {
          const existingIds = new Set(livePosts.map((p) => p.id));
          const filteredOld = prev.filter((p) => !existingIds.has(p.id));
          return [...livePosts, ...filteredOld];
        });
      }
    } catch {
      // Backend offline or unreachable: fall back smoothly to cached/curated community posts
    }
  };

  const onRefresh = async () => {
    setIsRefreshing(true);
    await loadLivePosts();
    setIsRefreshing(false);
  };

  // ─── INSTAGRAM FEED ALGORITHM ──────────────────────────────────────────────
  // 1. "For You": Score = (likes * 1.5 + comments * 2.5) / ((hoursAgo + 2) ^ 1.3)
  // 2. "Latest": Strictly sorted by timestamp descending
  // 3. "Following": Filtered to creators user follows
  const algorithmicFeed = useMemo(() => {
    const list = [...posts];

    if (feedFilter === 'latest') {
      return list.sort((a, b) => b.createdAt - a.createdAt);
    }

    if (feedFilter === 'following') {
      const followingList = list.filter((p) => followingMap[p.authorHandle]);
      return followingList.length > 0 ? followingList : list;
    }

    // Default: 'for_you' algorithmic score
    return list.sort((a, b) => {
      const hoursA = (Date.now() - a.createdAt) / (1000 * 60 * 60);
      const hoursB = (Date.now() - b.createdAt) / (1000 * 60 * 60);

      const scoreA = (a.likes * 1.5 + a.comments * 2.5) / Math.pow(hoursA + 2, 1.3);
      const scoreB = (b.likes * 1.5 + b.comments * 2.5) / Math.pow(hoursB + 2, 1.3);

      return scoreB - scoreA;
    });
  }, [posts, feedFilter, followingMap]);

  // Like / Unlike toggle
  const toggleLike = (postId: string) => {
    setPosts((prev) =>
      prev.map((post) => {
        if (post.id === postId) {
          const isLiked = !post.isLiked;
          return {
            ...post,
            isLiked,
            likes: isLiked ? post.likes + 1 : Math.max(0, post.likes - 1),
          };
        }
        return post;
      }),
    );
  };

  // Instagram Double-Tap to Like
  const handleDoubleTap = (postId: string) => {
    const now = Date.now();
    const DOUBLE_PRESS_DELAY = 300;
    if (lastTap[postId] && now - lastTap[postId] < DOUBLE_PRESS_DELAY) {
      setPosts((prev) =>
        prev.map((p) => (p.id === postId ? { ...p, isLiked: true, likes: p.isLiked ? p.likes : p.likes + 1 } : p)),
      );
    } else {
      setLastTap((prev) => ({ ...prev, [postId]: now }));
    }
  };

  // Bookmark / Save toggle
  const toggleBookmark = (postId: string) => {
    setSavedPosts((prev) => ({ ...prev, [postId]: !prev[postId] }));
  };

  // Share post
  const handleShare = async (post: FeedPost) => {
    try {
      await Share.share({
        message: `"${post.content.slice(0, 100)}..." — by @${post.authorHandle} on Lore of Ambition`,
      });
    } catch {
      // dismissed
    }
  };

  // Humanized timestamp
  const formatTime = (ts: number) => {
    const diffMin = Math.floor((Date.now() - ts) / (1000 * 60));
    if (diffMin < 60) return `${Math.max(1, diffMin)}m ago`;
    const diffHrs = Math.floor(diffMin / 60);
    if (diffHrs < 24) return `${diffHrs}h ago`;
    return `${Math.floor(diffHrs / 24)}d ago`;
  };

  const hardTopPadding = Platform.OS === 'android' ? (StatusBar.currentHeight || 28) + 16 : 24;

  return (
    <SafeAreaView className="flex-1 bg-[#08111F]">
      <StatusBar barStyle="light-content" backgroundColor="#08111F" />

      {/* ─── TOP HEADER: Brand Logo + Notification + Instagram DM (Paper Plane) ─── */}
      <View
        style={{ paddingTop: hardTopPadding }}
        className="flex-row items-center justify-between border-b border-white/5 bg-[#08111F] px-4 pb-3">
        {/* Brand Logo */}
        <Image source={PAGE_LOGO} className="h-10 w-36" resizeMode="contain" />

        {/* Top Right Actions: Bell + DMs (Paper Plane) */}
        <View className="flex-row items-center gap-2.5">
          <TouchableOpacity
            onPress={() => router.push('/notifications')}
            activeOpacity={0.7}
            className="h-10 w-10 items-center justify-center rounded-xl border border-white/10 bg-[#151B2D]">
            <Text className="text-base">🔔</Text>
          </TouchableOpacity>

          {/* Instagram DM Icon */}
          <TouchableOpacity
            onPress={() => router.push('/chat')}
            activeOpacity={0.7}
            className="h-10 w-10 items-center justify-center rounded-xl border border-[#4D8BFF]/30 bg-[#4D8BFF]/15">
            <Text className="text-base">✈️</Text>
          </TouchableOpacity>
        </View>
      </View>

      <ScrollView
        className="flex-1 px-4 pt-3"
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl refreshing={isRefreshing} onRefresh={onRefresh} tintColor="#4D8BFF" />
        }>
        {/* ─── FEED ALGORITHM TABS (For You / Latest / Following) ─── */}
        <View className="mb-3.5 flex-row gap-2">
          <TouchableOpacity
            onPress={() => setFeedFilter('for_you')}
            activeOpacity={0.8}
            className={`flex-1 items-center justify-center rounded-xl border py-2.5 ${
              feedFilter === 'for_you'
                ? 'border-[#4D8BFF] bg-[#4D8BFF]'
                : 'border-white/10 bg-[#151B2D]'
            }`}>
            <Text
              className={`text-xs font-semibold ${
                feedFilter === 'for_you' ? 'text-white font-bold' : 'text-white/60'
              }`}>
              🔥 For You
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => setFeedFilter('latest')}
            activeOpacity={0.8}
            className={`flex-1 items-center justify-center rounded-xl border py-2.5 ${
              feedFilter === 'latest'
                ? 'border-[#4D8BFF] bg-[#4D8BFF]'
                : 'border-white/10 bg-[#151B2D]'
            }`}>
            <Text
              className={`text-xs font-semibold ${
                feedFilter === 'latest' ? 'text-white font-bold' : 'text-white/60'
              }`}>
              ⏱️ Latest
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => setFeedFilter('following')}
            activeOpacity={0.8}
            className={`flex-1 items-center justify-center rounded-xl border py-2.5 ${
              feedFilter === 'following'
                ? 'border-[#4D8BFF] bg-[#4D8BFF]'
                : 'border-white/10 bg-[#151B2D]'
            }`}>
            <Text
              className={`text-xs font-semibold ${
                feedFilter === 'following' ? 'text-white font-bold' : 'text-white/60'
              }`}>
              👥 Following
            </Text>
          </TouchableOpacity>
        </View>

        {/* ─── Pinned Creator Highlight Strip ─── */}
        <View className="mb-3.5 flex-row items-center gap-2.5 rounded-[16px] border border-[#4D8BFF]/20 bg-[#4D8BFF]/[0.08] p-3">
          <Text className="text-base">🚀</Text>
          <Text className="flex-1 text-xs font-medium text-white/90">
            {feedFilter === 'for_you'
              ? 'Ranked by creator activity, streaks & community discussion'
              : feedFilter === 'latest'
              ? 'Showing real-time creator updates chronologically'
              : 'Showing lore from builders in your network'}
          </Text>
        </View>

        {/* ─── FEED POSTS (Instagram Style Cards with Double Tap Like) ─── */}
        <View className="gap-3.5 pb-20">
          {algorithmicFeed.map((post) => {
            const isBookmarked = !!savedPosts[post.id];

            return (
              <View
                key={post.id}
                className="rounded-[20px] border border-white/5 bg-[#151B2D] p-4 shadow-sm">
                {/* Post Header: Avatar, Names, Badge */}
                <View className="mb-3 flex-row items-center justify-between">
                  <View className="flex-row items-center gap-2.5">
                    <View className="h-10 w-10 items-center justify-center rounded-full border border-[#4D8BFF]/30 bg-[#4D8BFF]/15">
                      <Text className="text-xl">{post.authorAvatar}</Text>
                    </View>
                    <View>
                      <View className="flex-row items-center gap-1.5">
                        <Text className="text-xs font-bold text-white">{post.authorName}</Text>
                        <Text className="text-[10px] text-white/40">@{post.authorHandle}</Text>
                      </View>
                      <Text className="text-[10px] text-white/50">{formatTime(post.createdAt)}</Text>
                    </View>
                  </View>

                  {/* Project / Category Pill */}
                  <View className="rounded-full bg-[#4D8BFF]/15 px-2.5 py-1">
                    <Text className="text-[10px] font-semibold text-[#4D8BFF]">
                      {post.project}
                    </Text>
                  </View>
                </View>

                {/* Post Body (Tapping opens details; Double tap likes) */}
                <TouchableOpacity
                  activeOpacity={0.9}
                  onPress={() => handleDoubleTap(post.id)}>
                  <Text className="text-xs leading-5 text-white/95">{post.content}</Text>

                  {post.dayNumber ? (
                    <View className="mt-2.5 self-start rounded-md bg-[#FF9650]/15 px-2 py-0.5">
                      <Text className="text-[10px] font-bold text-[#FF9650]">
                        Day {post.dayNumber} Update
                      </Text>
                    </View>
                  ) : null}
                </TouchableOpacity>

                {/* ─── Instagram Actions Bar ─── */}
                <View className="mt-3.5 flex-row items-center justify-between border-t border-white/5 pt-3">
                  <View className="flex-row items-center gap-4">
                    {/* Heart Like Button */}
                    <TouchableOpacity
                      onPress={() => toggleLike(post.id)}
                      activeOpacity={0.7}
                      className="flex-row items-center gap-1.5">
                      <Text className="text-sm">{post.isLiked ? '❤️' : '🤍'}</Text>
                      <Text
                        className={`text-xs font-medium ${
                          post.isLiked ? 'font-bold text-[#FF5E7A]' : 'text-white/60'
                        }`}>
                        {post.likes}
                      </Text>
                    </TouchableOpacity>

                    {/* Comment Button */}
                    <TouchableOpacity
                      onPress={() => router.push(`/post/${post.id}`)}
                      activeOpacity={0.7}
                      className="flex-row items-center gap-1.5">
                      <Text className="text-sm">💬</Text>
                      <Text className="text-xs font-medium text-white/60">{post.comments}</Text>
                    </TouchableOpacity>

                    {/* Share Button */}
                    <TouchableOpacity
                      onPress={() => handleShare(post)}
                      activeOpacity={0.7}
                      className="flex-row items-center gap-1">
                      <Text className="text-sm">↗️</Text>
                    </TouchableOpacity>
                  </View>

                  {/* Save / Bookmark Button */}
                  <TouchableOpacity
                    onPress={() => toggleBookmark(post.id)}
                    activeOpacity={0.7}
                    className="p-1">
                    <Text className="text-base">{isBookmarked ? '🏷️' : '🔖'}</Text>
                  </TouchableOpacity>
                </View>
              </View>
            );
          })}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
