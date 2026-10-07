import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  SafeAreaView,
  StatusBar,
  Platform,
  Alert,
  Modal,
  TextInput,
  Share,
} from 'react-native';
import { useRouter } from 'expo-router';
import { sessionManager, CreatorSession } from '@/lib/session';
import { authApi, profileApi } from '@/lib/api';
import '@/global.css';

interface UserProfileData {
  id?: string;
  username: string;
  display_name?: string;
  bio?: string;
  profile_image?: string;
  niche?: string;
  creator_level?: string;
  youtube_url?: string;
  instagram_url?: string;
  tiktok_url?: string;
  rank_points?: number;
}

export default function ProfileScreen() {
  const router = useRouter();

  // State
  const [session, setSession] = useState<CreatorSession | null>(null);
  const [profileData, setProfileData] = useState<UserProfileData | null>(null);
  const [activeTab, setActiveTab] = useState<'grid' | 'feed' | 'saved' | 'challenges'>('grid');

  // Modals
  const [settingsVisible, setSettingsVisible] = useState(false);
  const [editProfileVisible, setEditProfileVisible] = useState(false);
  const [insightsVisible, setInsightsVisible] = useState(false);

  // Edit Profile Form State
  const [editDisplayName, setEditDisplayName] = useState('');
  const [editBio, setEditBio] = useState('');
  const [editNiche, setEditNiche] = useState('');
  const [editLink, setEditLink] = useState('');
  const [isSavingProfile, setIsSavingProfile] = useState(false);

  // Load Session & Profile
  useEffect(() => {
    loadProfile();
  }, []);

  const loadProfile = async () => {
    const userSession = await sessionManager.getSession();
    setSession(userSession);

    if (userSession?.userId) {
      try {
        const res = await profileApi.getProfile(userSession.userId);
        if (res?.data) {
          setProfileData(res.data);
          setEditDisplayName(res.data.display_name || '');
          setEditBio(res.data.bio || '');
          setEditNiche(res.data.niche || '');
          setEditLink(res.data.youtube_url || res.data.instagram_url || '');
          return;
        }
      } catch {
        // Fallback to local session
      }
    }

    if (userSession) {
      setEditDisplayName(userSession.displayName || userSession.username || 'Creator');
    }
  };

  const handleSaveProfile = async () => {
    if (!session?.userId) return;
    setIsSavingProfile(true);

    try {
      await profileApi.updateProfile({
        userId: session.userId,
        display_name: editDisplayName,
        bio: editBio,
        niche: editNiche,
        youtube_url: editLink,
      });

      // Update local session
      await sessionManager.setSession({
        ...session,
        displayName: editDisplayName,
      });

      setProfileData((prev) => ({
        ...prev,
        username: session.username || 'creator',
        display_name: editDisplayName,
        bio: editBio,
        niche: editNiche,
        youtube_url: editLink,
      }));

      setEditProfileVisible(false);
      Alert.alert('Success', 'Profile updated successfully!');
    } catch (err: any) {
      Alert.alert('Error', err.message || 'Failed to update profile.');
    } finally {
      setIsSavingProfile(false);
    }
  };

  const handleShareProfile = async () => {
    try {
      const uname = profileData?.username || session?.username || 'creator';
      await Share.share({
        message: `Check out @${uname} on Lore of Ambition! Track builds, lore, and daily challenges.`,
      });
    } catch {
      // dismissed
    }
  };

  const handleSignOut = () => {
    setSettingsVisible(false);
    Alert.alert('Log Out', 'Are you sure you want to log out of Lore of Ambition?', [
      { text: 'Cancel', style: 'cancel' },
      {
        text: 'Log Out',
        style: 'destructive',
        onPress: async () => {
          await authApi.signOut();
          router.replace('/auth/sign-up');
        },
      },
    ]);
  };

  const hardTopPadding = Platform.OS === 'android' ? (StatusBar.currentHeight || 28) + 16 : 24;

  const username = profileData?.username || session?.username || 'creator';
  const displayName = profileData?.display_name || session?.displayName || username;
  const bio = profileData?.bio || 'Building in public • Sharing daily ambition & lessons learned 🔥';
  const niche = profileData?.niche || 'Software Engineer';
  const link = profileData?.youtube_url || profileData?.instagram_url || 'loreofambition.com';

  // Sample creator posts for the grid & feed
  const userPosts = [
    {
      id: '1',
      title: 'Auth Pipeline',
      tag: 'MILESTONE',
      snippet: 'Finally got Supabase authentication working with sessions! Day 14 🚀',
      likes: 48,
      comments: 12,
      time: '2h ago',
      color: '#4D8BFF',
    },
    {
      id: '2',
      title: 'UI Redesign',
      tag: 'DESIGN',
      snippet: 'Transformed the entire app shell into sleek Instagram aesthetics.',
      likes: 64,
      comments: 9,
      time: '1d ago',
      color: '#A855F7',
    },
    {
      id: '3',
      title: '30-Day Sprint',
      tag: 'CHALLENGE',
      snippet: 'Hit halfway on the building sprint. Consistency is compounding.',
      likes: 92,
      comments: 21,
      time: '3d ago',
      color: '#FF9650',
    },
    {
      id: '4',
      title: 'Database Schema',
      tag: 'BACKEND',
      snippet: 'Tables for lore posts, likes, comments, and creator profiles configured.',
      likes: 35,
      comments: 6,
      time: '5d ago',
      color: '#10B981',
    },
    {
      id: '5',
      title: 'Day 1 Launch',
      tag: 'FOUNDING',
      snippet: 'Started Lore of Ambition: a platform for builders to document the journey.',
      likes: 120,
      comments: 34,
      time: '14d ago',
      color: '#EC4899',
    },
    {
      id: '6',
      title: 'Indie Hacker',
      tag: 'MINDSET',
      snippet: 'Small daily steps beat occasional bursts of motivation every single time.',
      likes: 88,
      comments: 15,
      time: '18d ago',
      color: '#3B82F6',
    },
  ];

  return (
    <SafeAreaView className="flex-1 bg-[#08111F]">
      <StatusBar barStyle="light-content" backgroundColor="#08111F" />

      {/* ─── INSTAGRAM TOP BAR: Three Lines (Options) on Top Left ─── */}
      <View
        style={{ paddingTop: hardTopPadding }}
        className="flex-row items-center justify-between border-b border-white/5 bg-[#08111F] px-4 pb-3">
        {/* TOP LEFT: Three Lines Hamburger Menu */}
        <TouchableOpacity
          onPress={() => setSettingsVisible(true)}
          activeOpacity={0.7}
          className="h-10 w-10 items-center justify-center rounded-xl border border-white/10 bg-[#151B2D]">
          <View className="h-4 w-5 justify-between py-0.5">
            <View className="h-[2px] w-full rounded-full bg-white" />
            <View className="h-[2px] w-full rounded-full bg-white" />
            <View className="h-[2px] w-full rounded-full bg-white" />
          </View>
        </TouchableOpacity>

        {/* CENTER: Username & Lock / Badge */}
        <View className="flex-row items-center gap-1.5">
          <Text className="text-base font-bold text-white">@{username}</Text>
          <View className="rounded-full bg-[#4D8BFF]/20 px-1.5 py-0.5">
            <Text className="text-[10px] font-bold text-[#4D8BFF]">PRO</Text>
          </View>
        </View>

        {/* TOP RIGHT: Quick Actions (Create / Share) */}
        <View className="flex-row items-center gap-2">
          <TouchableOpacity
            onPress={handleShareProfile}
            activeOpacity={0.7}
            className="h-10 w-10 items-center justify-center rounded-xl border border-white/10 bg-[#151B2D]">
            <Text className="text-base">↗️</Text>
          </TouchableOpacity>
        </View>
      </View>

      <ScrollView className="flex-1" showsVerticalScrollIndicator={false}>
        {/* ─── INSTAGRAM PROFILE HEADER: Avatar + Stats ─── */}
        <View className="px-4 pt-4 pb-2">
          <View className="flex-row items-center justify-between">
            {/* Avatar with Story/Status Gradient Ring */}
            <View className="relative">
              <View className="h-20 w-20 items-center justify-center rounded-full border-2 border-[#4D8BFF] bg-gradient-to-tr from-[#151B2D] to-[#202F50] p-1">
                <View className="h-full w-full items-center justify-center rounded-full bg-[#151B2D]">
                  <Text className="text-3xl">👨‍💻</Text>
                </View>
              </View>
              {/* Online/Active Badge */}
              <View className="absolute right-0 bottom-0 h-5 w-5 items-center justify-center rounded-full border-2 border-[#08111F] bg-[#10B981]">
                <View className="h-2 w-2 rounded-full bg-white" />
              </View>
            </View>

            {/* Stats (Posts, Followers, Following) */}
            <View className="flex-1 flex-row items-center justify-around pl-4">
              <TouchableOpacity activeOpacity={0.7} className="items-center">
                <Text className="text-lg font-bold text-white">{userPosts.length}</Text>
                <Text className="text-xs text-white/60">Posts</Text>
              </TouchableOpacity>
              <TouchableOpacity activeOpacity={0.7} className="items-center">
                <Text className="text-lg font-bold text-white">248</Text>
                <Text className="text-xs text-white/60">Followers</Text>
              </TouchableOpacity>
              <TouchableOpacity activeOpacity={0.7} className="items-center">
                <Text className="text-lg font-bold text-white">182</Text>
                <Text className="text-xs text-white/60">Following</Text>
              </TouchableOpacity>
            </View>
          </View>

          {/* ─── Creator Bio & Identity ─── */}
          <View className="mt-3.5">
            <View className="flex-row items-center gap-2">
              <Text className="text-base font-bold text-white">{displayName}</Text>
              <View className="rounded bg-[#4D8BFF]/15 px-2 py-0.5">
                <Text className="text-[10px] font-semibold text-[#4D8BFF]">{niche}</Text>
              </View>
            </View>

            <Text className="mt-1.5 text-xs leading-5 text-white/80">{bio}</Text>

            {/* Clickable Link Pill */}
            {link ? (
              <TouchableOpacity activeOpacity={0.7} className="mt-2 flex-row items-center gap-1.5">
                <Text className="text-xs text-[#4D8BFF]">🔗</Text>
                <Text className="text-xs font-semibold text-[#4D8BFF]">{link}</Text>
              </TouchableOpacity>
            ) : null}
          </View>

          {/* ─── Action Buttons (Edit Profile, Share, Insights) ─── */}
          <View className="mt-4 flex-row items-center gap-2">
            <TouchableOpacity
              onPress={() => setEditProfileVisible(true)}
              activeOpacity={0.7}
              className="flex-1 items-center justify-center rounded-xl bg-[#4D8BFF] py-2.5 shadow-sm">
              <Text className="text-xs font-bold text-white">Edit Profile</Text>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={handleShareProfile}
              activeOpacity={0.7}
              className="flex-1 items-center justify-center rounded-xl border border-white/10 bg-[#151B2D] py-2.5">
              <Text className="text-xs font-semibold text-white">Share Profile</Text>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => setInsightsVisible(true)}
              activeOpacity={0.7}
              className="items-center justify-center rounded-xl border border-white/10 bg-[#151B2D] px-3.5 py-2.5">
              <Text className="text-xs font-semibold text-white">📊</Text>
            </TouchableOpacity>
          </View>

          {/* ─── Story Highlights / Pinned Ambitions ─── */}
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            className="mt-4 pb-2"
            contentContainerStyle={{ gap: 14 }}>
            <TouchableOpacity
              onPress={() => setEditProfileVisible(true)}
              activeOpacity={0.7}
              className="items-center">
              <View className="h-14 w-14 items-center justify-center rounded-full border border-dashed border-white/30 bg-[#151B2D]">
                <Text className="text-lg text-white/70">➕</Text>
              </View>
              <Text className="mt-1 text-[11px] text-white/60">New</Text>
            </TouchableOpacity>

            <View className="items-center">
              <View className="h-14 w-14 items-center justify-center rounded-full border border-[#4D8BFF]/40 bg-[#151B2D]">
                <Text className="text-xl">🚀</Text>
              </View>
              <Text className="mt-1 text-[11px] font-medium text-white/80">Lore App</Text>
            </View>

            <View className="items-center">
              <View className="h-14 w-14 items-center justify-center rounded-full border border-[#FF9650]/40 bg-[#151B2D]">
                <Text className="text-xl">🔥</Text>
              </View>
              <Text className="mt-1 text-[11px] font-medium text-white/80">Streaks</Text>
            </View>

            <View className="items-center">
              <View className="h-14 w-14 items-center justify-center rounded-full border border-[#10B981]/40 bg-[#151B2D]">
                <Text className="text-xl">🏆</Text>
              </View>
              <Text className="mt-1 text-[11px] font-medium text-white/80">Milestones</Text>
            </View>

            <View className="items-center">
              <View className="h-14 w-14 items-center justify-center rounded-full border border-[#A855F7]/40 bg-[#151B2D]">
                <Text className="text-xl">💡</Text>
              </View>
              <Text className="mt-1 text-[11px] font-medium text-white/80">Ideas</Text>
            </View>
          </ScrollView>
        </View>

        {/* ─── INSTAGRAM PROFILE TABS ─── */}
        <View className="flex-row border-y border-white/5 bg-[#08111F]">
          <TouchableOpacity
            onPress={() => setActiveTab('grid')}
            className={`flex-1 items-center justify-center py-3 border-b-2 ${
              activeTab === 'grid' ? 'border-[#4D8BFF]' : 'border-transparent'
            }`}>
            <Text
              className={`text-sm font-semibold ${
                activeTab === 'grid' ? 'text-[#4D8BFF]' : 'text-white/40'
              }`}>
              ▦ Grid
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => setActiveTab('feed')}
            className={`flex-1 items-center justify-center py-3 border-b-2 ${
              activeTab === 'feed' ? 'border-[#4D8BFF]' : 'border-transparent'
            }`}>
            <Text
              className={`text-sm font-semibold ${
                activeTab === 'feed' ? 'text-[#4D8BFF]' : 'text-white/40'
              }`}>
              ☵ Lore Feed
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => setActiveTab('saved')}
            className={`flex-1 items-center justify-center py-3 border-b-2 ${
              activeTab === 'saved' ? 'border-[#4D8BFF]' : 'border-transparent'
            }`}>
            <Text
              className={`text-sm font-semibold ${
                activeTab === 'saved' ? 'text-[#4D8BFF]' : 'text-white/40'
              }`}>
              🔖 Saved
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => setActiveTab('challenges')}
            className={`flex-1 items-center justify-center py-3 border-b-2 ${
              activeTab === 'challenges' ? 'border-[#4D8BFF]' : 'border-transparent'
            }`}>
            <Text
              className={`text-sm font-semibold ${
                activeTab === 'challenges' ? 'text-[#4D8BFF]' : 'text-white/40'
              }`}>
              ⚡ Challenges
            </Text>
          </TouchableOpacity>
        </View>

        {/* ─── TAB CONTENT: 1. GRID VIEW (3x3 Instagram Style) ─── */}
        {activeTab === 'grid' && (
          <View className="flex-row flex-wrap p-1">
            {userPosts.map((post) => (
              <TouchableOpacity
                key={post.id}
                activeOpacity={0.8}
                onPress={() => setActiveTab('feed')}
                style={{ width: '32.6%', aspectRatio: 1 }}
                className="m-[0.35%] rounded-xl border border-white/5 bg-[#151B2D] p-2.5 justify-between overflow-hidden">
                <View
                  style={{ backgroundColor: `${post.color}20` }}
                  className="self-start rounded-md px-1.5 py-0.5">
                  <Text style={{ color: post.color }} className="text-[9px] font-bold">
                    {post.tag}
                  </Text>
                </View>

                <Text numberOfLines={3} className="text-[11px] leading-4 font-medium text-white/90">
                  {post.snippet}
                </Text>

                <View className="flex-row items-center justify-between border-t border-white/5 pt-1">
                  <Text className="text-[9px] text-white/50">🤍 {post.likes}</Text>
                  <Text className="text-[9px] text-white/50">💬 {post.comments}</Text>
                </View>
              </TouchableOpacity>
            ))}
          </View>
        )}

        {/* ─── TAB CONTENT: 2. FEED / LIST VIEW ─── */}
        {activeTab === 'feed' && (
          <View className="gap-3 p-4">
            {userPosts.map((post) => (
              <React.Fragment key={post.id}>
                <View className="rounded-[18px] border border-white/5 bg-[#151B2D] p-4 shadow-sm">
                <View className="mb-2.5 flex-row items-center justify-between">
                  <View className="flex-row items-center gap-2">
                    <View className="h-8 w-8 items-center justify-center rounded-full bg-[#4D8BFF]/20">
                      <Text className="text-sm">👨‍💻</Text>
                    </View>
                    <View>
                      <Text className="text-xs font-bold text-white">{displayName}</Text>
                      <Text className="text-[10px] text-white/40">
                        @{username} • {post.time}
                      </Text>
                    </View>
                  </View>
                  <View
                    style={{ backgroundColor: `${post.color}20` }}
                    className="rounded-full px-2 py-0.5">
                    <Text style={{ color: post.color }} className="text-[10px] font-bold">
                      {post.tag}
                    </Text>
                  </View>
                </View>

                <Text className="mb-3 text-xs leading-5 text-white/90">{post.snippet}</Text>

                <View className="flex-row items-center justify-between border-t border-white/5 pt-2">
                  <View className="flex-row items-center gap-4">
                    <TouchableOpacity className="flex-row items-center gap-1">
                      <Text className="text-xs">🤍</Text>
                      <Text className="text-xs text-white/60">{post.likes}</Text>
                    </TouchableOpacity>
                    <TouchableOpacity className="flex-row items-center gap-1">
                      <Text className="text-xs">💬</Text>
                      <Text className="text-xs text-white/60">{post.comments}</Text>
                    </TouchableOpacity>
                    <TouchableOpacity>
                      <Text className="text-xs">↗️</Text>
                    </TouchableOpacity>
                  </View>
                  <TouchableOpacity>
                    <Text className="text-xs">🔖</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </React.Fragment>
            ))}
          </View>
        )}

        {/* ─── TAB CONTENT: 3. SAVED LORE ─── */}
        {activeTab === 'saved' && (
          <View className="p-4">
            <View className="mb-3 flex-row items-center justify-between">
              <Text className="text-xs font-semibold text-white/60 uppercase tracking-wider">
                All Saved Lore
              </Text>
              <Text className="text-xs text-[#4D8BFF]">1 Saved</Text>
            </View>

            <View className="rounded-[18px] border border-white/5 bg-[#151B2D] p-4">
              <View className="mb-2 flex-row items-center justify-between">
                <Text className="text-xs font-bold text-[#4D8BFF]">Indie Hacker Playbook</Text>
                <Text className="text-[10px] text-white/40">Saved 2d ago</Text>
              </View>
              <Text className="text-xs leading-5 text-white/80">
                "The secret to shipping consistently: shrink scope, publish daily progress, and stay
                accountable."
              </Text>
            </View>
          </View>
        )}

        {/* ─── TAB CONTENT: 4. CHALLENGES ─── */}
        {activeTab === 'challenges' && (
          <View className="gap-3 p-4">
            <View className="rounded-[18px] border border-[#FF9650]/20 bg-[#FF9650]/[0.08] p-4">
              <View className="flex-row items-center justify-between mb-2">
                <Text className="text-xs font-bold text-[#FF9650]">🔥 30-Day Ship Streak</Text>
                <Text className="text-[11px] font-semibold text-white">Day 14 / 30</Text>
              </View>
              <View className="h-2 w-full overflow-hidden rounded-full bg-white/10 mb-2">
                <View className="h-full w-[47%] bg-[#FF9650]" />
              </View>
              <Text className="text-[11px] text-white/60">
                You've documented 14 consecutive days of progress!
              </Text>
            </View>

            <View className="rounded-[18px] border border-[#4D8BFF]/20 bg-[#151B2D] p-4">
              <View className="flex-row items-center justify-between mb-2">
                <Text className="text-xs font-bold text-[#4D8BFF]">🚀 Project Launch Sprint</Text>
                <Text className="text-[11px] font-semibold text-[#10B981]">Active</Text>
              </View>
              <Text className="text-xs leading-5 text-white/80">
                Currently building Lore of Ambition mobile client with Supabase.
              </Text>
            </View>
          </View>
        )}

        <View className="h-16" />
      </ScrollView>

      {/* ═══════════════════════════════════════════════════════════════════════
          INSTAGRAM SETTINGS & OPTIONS MODAL ("with all setting and stuff")
          Triggered by top-left 3-lines icon
         ═══════════════════════════════════════════════════════════════════════ */}
      <Modal
        visible={settingsVisible}
        animationType="slide"
        transparent={true}
        onRequestClose={() => setSettingsVisible(false)}>
        <View className="flex-1 justify-end bg-black/60">
          <View className="max-h-[85%] rounded-t-[28px] border-t border-white/10 bg-[#0E1626] p-5 pb-8">
            {/* Drawer Handle */}
            <View className="mb-4 h-1 w-12 self-center rounded-full bg-white/20" />

            {/* Header */}
            <View className="mb-5 flex-row items-center justify-between border-b border-white/5 pb-3">
              <Text className="text-lg font-bold text-white">Settings and activity</Text>
              <TouchableOpacity
                onPress={() => setSettingsVisible(false)}
                className="h-8 w-8 items-center justify-center rounded-full bg-white/10">
                <Text className="text-xs font-bold text-white">✕</Text>
              </TouchableOpacity>
            </View>

            <ScrollView showsVerticalScrollIndicator={false}>
              {/* Account Overview Card */}
              <View className="mb-4 flex-row items-center gap-3 rounded-2xl border border-white/5 bg-[#151B2D] p-3.5">
                <View className="h-12 w-12 items-center justify-center rounded-full bg-[#4D8BFF]/20">
                  <Text className="text-xl">👨‍💻</Text>
                </View>
                <View className="flex-1">
                  <Text className="text-sm font-bold text-white">{displayName}</Text>
                  <Text className="text-xs text-white/50">@{username}</Text>
                </View>
                <TouchableOpacity
                  onPress={() => {
                    setSettingsVisible(false);
                    setEditProfileVisible(true);
                  }}
                  className="rounded-lg bg-[#4D8BFF]/20 px-3 py-1.5">
                  <Text className="text-xs font-semibold text-[#4D8BFF]">Edit</Text>
                </TouchableOpacity>
              </View>

              {/* SECTION: How you use Lore */}
              <Text className="mb-2 text-[11px] font-bold tracking-wider text-white/40 uppercase">
                How you use Lore of Ambition
              </Text>
              <View className="mb-4 overflow-hidden rounded-2xl border border-white/5 bg-[#151B2D]">
                <TouchableOpacity
                  onPress={() => {
                    setSettingsVisible(false);
                    setActiveTab('saved');
                  }}
                  className="flex-row items-center justify-between border-b border-white/5 p-3.5">
                  <View className="flex-row items-center gap-3">
                    <Text className="text-base">🔖</Text>
                    <Text className="text-xs font-medium text-white">Saved Lore</Text>
                  </View>
                  <Text className="text-xs text-white/30">›</Text>
                </TouchableOpacity>

                <TouchableOpacity
                  onPress={() => {
                    setSettingsVisible(false);
                    setInsightsVisible(true);
                  }}
                  className="flex-row items-center justify-between border-b border-white/5 p-3.5">
                  <View className="flex-row items-center gap-3">
                    <Text className="text-base">⏱️</Text>
                    <Text className="text-xs font-medium text-white">Your Activity & Streaks</Text>
                  </View>
                  <Text className="text-xs text-white/30">›</Text>
                </TouchableOpacity>

                <TouchableOpacity
                  onPress={() => {
                    setSettingsVisible(false);
                    router.push('/notifications');
                  }}
                  className="flex-row items-center justify-between p-3.5">
                  <View className="flex-row items-center gap-3">
                    <Text className="text-base">🔔</Text>
                    <Text className="text-xs font-medium text-white">Notifications</Text>
                  </View>
                  <Text className="text-xs text-white/30">›</Text>
                </TouchableOpacity>
              </View>

              {/* SECTION: For Creators */}
              <Text className="mb-2 text-[11px] font-bold tracking-wider text-white/40 uppercase">
                Creator Tools & Badges
              </Text>
              <View className="mb-4 overflow-hidden rounded-2xl border border-white/5 bg-[#151B2D]">
                <TouchableOpacity
                  onPress={() => {
                    setSettingsVisible(false);
                    setInsightsVisible(true);
                  }}
                  className="flex-row items-center justify-between border-b border-white/5 p-3.5">
                  <View className="flex-row items-center gap-3">
                    <Text className="text-base">📊</Text>
                    <Text className="text-xs font-medium text-white">Insights & Analytics</Text>
                  </View>
                  <Text className="text-xs text-white/30">›</Text>
                </TouchableOpacity>

                <TouchableOpacity
                  onPress={() => {
                    setSettingsVisible(false);
                    setActiveTab('challenges');
                  }}
                  className="flex-row items-center justify-between p-3.5">
                  <View className="flex-row items-center gap-3">
                    <Text className="text-base">🏆</Text>
                    <Text className="text-xs font-medium text-white">Challenges & Streaks</Text>
                  </View>
                  <Text className="text-xs text-white/30">›</Text>
                </TouchableOpacity>
              </View>

              {/* SECTION: Preferences */}
              <Text className="mb-2 text-[11px] font-bold tracking-wider text-white/40 uppercase">
                Preferences
              </Text>
              <View className="mb-4 overflow-hidden rounded-2xl border border-white/5 bg-[#151B2D]">
                <View className="flex-row items-center justify-between border-b border-white/5 p-3.5">
                  <View className="flex-row items-center gap-3">
                    <Text className="text-base">🌙</Text>
                    <Text className="text-xs font-medium text-white">Dark Theme</Text>
                  </View>
                  <Text className="text-xs font-semibold text-[#4D8BFF]">Active</Text>
                </View>

                <TouchableOpacity
                  onPress={() =>
                    Alert.alert(
                      'Account Details',
                      `Username: @${username}\nUser ID: ${session?.userId || 'N/A'}\nStatus: Active Creator`,
                    )
                  }
                  className="flex-row items-center justify-between p-3.5">
                  <View className="flex-row items-center gap-3">
                    <Text className="text-base">🛡️</Text>
                    <Text className="text-xs font-medium text-white">Account Details & Security</Text>
                  </View>
                  <Text className="text-xs text-white/30">›</Text>
                </TouchableOpacity>
              </View>

              {/* SECTION: Log In / Log Out */}
              <Text className="mb-2 text-[11px] font-bold tracking-wider text-white/40 uppercase">
                Account Actions
              </Text>
              <View className="overflow-hidden rounded-2xl border border-white/5 bg-[#151B2D]">
                <TouchableOpacity
                  onPress={handleSignOut}
                  className="flex-row items-center justify-between p-3.5">
                  <View className="flex-row items-center gap-3">
                    <Text className="text-base">🚪</Text>
                    <Text className="text-xs font-bold text-red-400">Log Out @{username}</Text>
                  </View>
                  <Text className="text-xs text-red-400">›</Text>
                </TouchableOpacity>
              </View>
            </ScrollView>
          </View>
        </View>
      </Modal>

      {/* ═══════════════════════════════════════════════════════════════════════
          EDIT PROFILE MODAL (Instagram Style)
         ═══════════════════════════════════════════════════════════════════════ */}
      <Modal
        visible={editProfileVisible}
        animationType="slide"
        transparent={true}
        onRequestClose={() => setEditProfileVisible(false)}>
        <View className="flex-1 justify-end bg-black/60">
          <View className="max-h-[90%] rounded-t-[28px] border-t border-white/10 bg-[#0E1626] p-5 pb-8">
            <View className="mb-4 h-1 w-12 self-center rounded-full bg-white/20" />

            <View className="mb-4 flex-row items-center justify-between border-b border-white/5 pb-3">
              <TouchableOpacity onPress={() => setEditProfileVisible(false)}>
                <Text className="text-xs text-white/60">Cancel</Text>
              </TouchableOpacity>
              <Text className="text-base font-bold text-white">Edit Profile</Text>
              <TouchableOpacity
                onPress={handleSaveProfile}
                disabled={isSavingProfile}
                className="rounded-lg bg-[#4D8BFF] px-3 py-1">
                <Text className="text-xs font-bold text-white">
                  {isSavingProfile ? 'Saving...' : 'Done'}
                </Text>
              </TouchableOpacity>
            </View>

            <ScrollView showsVerticalScrollIndicator={false}>
              {/* Avatar Changer */}
              <View className="my-3 items-center">
                <View className="h-20 w-20 items-center justify-center rounded-full border-2 border-[#4D8BFF] bg-[#151B2D]">
                  <Text className="text-3xl">👨‍💻</Text>
                </View>
                <TouchableOpacity className="mt-2">
                  <Text className="text-xs font-semibold text-[#4D8BFF]">Change Photo</Text>
                </TouchableOpacity>
              </View>

              {/* Fields */}
              <View className="gap-3.5 mt-2">
                <View>
                  <Text className="mb-1 text-xs text-white/50">Display Name</Text>
                  <TextInput
                    value={editDisplayName}
                    onChangeText={setEditDisplayName}
                    placeholder="Your Name"
                    placeholderTextColor="#55607A"
                    className="rounded-xl border border-white/10 bg-[#151B2D] px-3.5 py-2.5 text-xs text-white"
                  />
                </View>

                <View>
                  <Text className="mb-1 text-xs text-white/50">Username</Text>
                  <View className="rounded-xl border border-white/5 bg-[#151B2D]/50 px-3.5 py-2.5">
                    <Text className="text-xs text-white/40">@{username}</Text>
                  </View>
                </View>

                <View>
                  <Text className="mb-1 text-xs text-white/50">Niche / Title</Text>
                  <TextInput
                    value={editNiche}
                    onChangeText={setEditNiche}
                    placeholder="e.g. Software Engineer, Designer, Founder"
                    placeholderTextColor="#55607A"
                    className="rounded-xl border border-white/10 bg-[#151B2D] px-3.5 py-2.5 text-xs text-white"
                  />
                </View>

                <View>
                  <Text className="mb-1 text-xs text-white/50">Bio</Text>
                  <TextInput
                    value={editBio}
                    onChangeText={setEditBio}
                    multiline
                    numberOfLines={3}
                    placeholder="Tell other creators what you're building..."
                    placeholderTextColor="#55607A"
                    className="h-20 rounded-xl border border-white/10 bg-[#151B2D] px-3.5 py-2 text-xs text-white"
                  />
                </View>

                <View>
                  <Text className="mb-1 text-xs text-white/50">Link / Website</Text>
                  <TextInput
                    value={editLink}
                    onChangeText={setEditLink}
                    placeholder="https://yourportfolio.com"
                    placeholderTextColor="#55607A"
                    autoCapitalize="none"
                    className="rounded-xl border border-white/10 bg-[#151B2D] px-3.5 py-2.5 text-xs text-white"
                  />
                </View>
              </View>
            </ScrollView>
          </View>
        </View>
      </Modal>

      {/* ═══════════════════════════════════════════════════════════════════════
          CREATOR INSIGHTS MODAL
         ═══════════════════════════════════════════════════════════════════════ */}
      <Modal
        visible={insightsVisible}
        animationType="slide"
        transparent={true}
        onRequestClose={() => setInsightsVisible(false)}>
        <View className="flex-1 justify-end bg-black/60">
          <View className="max-h-[80%] rounded-t-[28px] border-t border-white/10 bg-[#0E1626] p-5 pb-8">
            <View className="mb-4 h-1 w-12 self-center rounded-full bg-white/20" />

            <View className="mb-4 flex-row items-center justify-between border-b border-white/5 pb-3">
              <Text className="text-base font-bold text-white">Creator Insights</Text>
              <TouchableOpacity
                onPress={() => setInsightsVisible(false)}
                className="h-7 w-7 items-center justify-center rounded-full bg-white/10">
                <Text className="text-xs text-white">✕</Text>
              </TouchableOpacity>
            </View>

            <View className="gap-3">
              <View className="rounded-2xl border border-[#4D8BFF]/20 bg-[#4D8BFF]/10 p-4">
                <Text className="text-xs text-[#4D8BFF] font-semibold">Account Reach (Last 30 Days)</Text>
                <Text className="mt-1 text-2xl font-bold text-white">1,480</Text>
                <Text className="text-[10px] text-white/50">+34% vs previous period</Text>
              </View>

              <View className="flex-row gap-3">
                <View className="flex-1 rounded-2xl border border-white/5 bg-[#151B2D] p-3.5">
                  <Text className="text-[11px] text-white/50">Total Impressions</Text>
                  <Text className="mt-1 text-lg font-bold text-white">3,892</Text>
                </View>
                <View className="flex-1 rounded-2xl border border-white/5 bg-[#151B2D] p-3.5">
                  <Text className="text-[11px] text-white/50">Engagement Rate</Text>
                  <Text className="mt-1 text-lg font-bold text-[#10B981]">8.4%</Text>
                </View>
              </View>
            </View>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
}
