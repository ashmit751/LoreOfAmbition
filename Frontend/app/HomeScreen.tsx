import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  SafeAreaView,
  FlatList,
  TextInput,
  ScrollView,
  Image,
} from 'react-native';

const colors = {
  background: '#08111F',
  surface: '#151B2D',
  elevated: '#0E1A2E',
  primary: '#4D8BFF',
  textPrimary: '#FFFFFF',
  textSecondary: 'rgba(255, 255, 255, 0.7)',
  textMuted: 'rgba(255, 255, 255, 0.45)',
  border: 'rgba(255, 255, 255, 0.08)',
};

const nicheColors: { [key: string]: string } = {
  Programming: '#4D8BFF',
  Design: '#5CC994',
  Startups: '#C864DC',
  Fitness: '#FF9650',
  Art: '#FF5A78',
  Music: '#F5C542',
  AI: '#4DD9FF',
  Gaming: '#A78BFA',
};

interface Post {
  id: string;
  author: string;
  avatar: string;
  niche: string;
  handle: string;
  time: string;
  content: string;
  likes: number;
  comments: number;
  reposts: number;
  liked: boolean;
  image?: string;
}

const SAMPLE_POSTS: Post[] = [
  {
    id: '1',
    author: 'devraj',
    avatar: 'DV',
    niche: 'Programming',
    handle: 'day 14 of building in public',
    time: '2h',
    content:
      'finally got authentication working after 3 days of banging my head against supabase. small win but it feels massive 🔥\n#buildinpublic #indie',
    likes: 48,
    comments: 12,
    reposts: 6,
    liked: true,
  },
  {
    id: '2',
    author: 'sara.r',
    avatar: 'SR',
    niche: 'Design',
    handle: 'UI/UX · week 3',
    time: '5h',
    content:
      'redesigned my portfolio landing page for the 4th time. i think this is the one. posting to nobody but still posting.',
    likes: 31,
    comments: 8,
    reposts: 3,
    liked: false,
    image: 'placeholder',
  },
  {
    id: '3',
    author: 'mike.j',
    avatar: 'MJ',
    niche: 'Startups',
    handle: 'day 1 of building my startup',
    time: '9h',
    content:
      'quit my job today. terrified. excited. let\'s go. first goal: talk to 10 potential users this week.\n#startuplife #day1',
    likes: 94,
    comments: 27,
    reposts: 18,
    liked: false,
  },
];

interface HomeScreenProps {
  onCreatePostPress?: () => void;
  onProfilePress?: () => void;
  onDiscoverPress?: () => void;
  onPostPress?: (postId: string) => void;
}

export default function HomeScreen({
  onCreatePostPress,
  onProfilePress,
  onDiscoverPress,
  onPostPress,
}: HomeScreenProps) {
  const [selectedTab, setSelectedTab] = useState<'for-you' | 'following' | 'trending'>(
    'for-you'
  );
  const [posts, setPosts] = useState<Post[]>(SAMPLE_POSTS);
  const [likedPosts, setLikedPosts] = useState<Set<string>>(new Set(['1']));

  const toggleLike = (postId: string) => {
    const newLiked = new Set(likedPosts);
    if (newLiked.has(postId)) {
      newLiked.delete(postId);
    } else {
      newLiked.add(postId);
    }
    setLikedPosts(newLiked);
  };

  const renderPost = ({ item }: { item: Post }) => {
    const isLiked = likedPosts.has(item.id);
    const nicheColor = nicheColors[item.niche] || colors.primary;

    return (
      <TouchableOpacity
        onPress={() => onPostPress?.(item.id)}
        style={{
          paddingHorizontal: 16,
          paddingVertical: 14,
          borderBottomWidth: 1,
          borderBottomColor: colors.border,
        }}
      >
        {/* Post Header */}
        <View style={{ flexDirection: 'row', marginBottom: 10 }}>
          {/* Avatar */}
          <View
            style={{
              width: 34,
              height: 34,
              borderRadius: 17,
              backgroundColor: nicheColor,
              justifyContent: 'center',
              alignItems: 'center',
              marginRight: 10,
              opacity: 0.2,
            }}
          >
            <Text
              style={{
                fontSize: 12,
                fontWeight: '500',
                color: nicheColor,
              }}
            >
              {item.avatar}
            </Text>
          </View>

          {/* Meta */}
          <View style={{ flex: 1 }}>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                marginBottom: 2,
                gap: 6,
              }}
            >
              <Text
                style={{
                  fontSize: 12,
                  fontWeight: '500',
                  color: colors.textPrimary,
                }}
              >
                {item.author}
              </Text>
              <View
                style={{
                  backgroundColor: `${nicheColor}1F`,
                  borderWidth: 1,
                  borderColor: `${nicheColor}33`,
                  borderRadius: 20,
                  paddingHorizontal: 8,
                  paddingVertical: 2,
                }}
              >
                <Text
                  style={{
                    fontSize: 9,
                    color: nicheColor,
                    fontWeight: '500',
                  }}
                >
                  {item.niche}
                </Text>
              </View>
            </View>
            <Text
              style={{
                fontSize: 10,
                color: colors.textMuted,
              }}
            >
              {item.handle}
            </Text>
          </View>

          <Text
            style={{
              fontSize: 10,
              color: colors.textMuted,
            }}
          >
            {item.time}
          </Text>
        </View>

        {/* Post Body */}
        <Text
          style={{
            fontSize: 13,
            color: 'rgba(255, 255, 255, 0.85)',
            lineHeight: 20,
            marginBottom: 10,
          }}
        >
          {item.content}
        </Text>

        {/* Post Image Placeholder */}
        {item.image && (
          <View
            style={{
              width: '100%',
              height: 120,
              backgroundColor: colors.elevated,
              borderRadius: 12,
              marginBottom: 10,
              borderWidth: 1,
              borderColor: colors.border,
            }}
          />
        )}

        {/* Actions */}
        <View
          style={{
            flexDirection: 'row',
            gap: 16,
          }}
        >
          <TouchableOpacity
            onPress={() => toggleLike(item.id)}
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              gap: 5,
            }}
          >
            <Text
              style={{
                fontSize: 14,
                color: isLiked ? '#FF5E7A' : colors.textMuted,
              }}
            >
              {isLiked ? '❤️' : '🤍'}
            </Text>
            <Text
              style={{
                fontSize: 10,
                color: isLiked ? '#FF5E7A' : colors.textMuted,
              }}
            >
              {item.likes + (isLiked ? 1 : 0)}
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              gap: 5,
            }}
          >
            <Text style={{ fontSize: 14, color: colors.textMuted }}>💬</Text>
            <Text
              style={{
                fontSize: 10,
                color: colors.textMuted,
              }}
            >
              {item.comments}
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              gap: 5,
            }}
          >
            <Text style={{ fontSize: 14, color: colors.textMuted }}>🔄</Text>
            <Text
              style={{
                fontSize: 10,
                color: colors.textMuted,
              }}
            >
              {item.reposts}
            </Text>
          </TouchableOpacity>

          <TouchableOpacity style={{ marginLeft: 'auto' }}>
            <Text style={{ fontSize: 14, color: colors.textMuted }}>🔖</Text>
          </TouchableOpacity>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: colors.background }}>
      {/* Top Bar */}
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
          paddingHorizontal: 16,
          paddingVertical: 12,
        }}
      >
        <Text
          style={{
            fontSize: 18,
            fontWeight: '600',
            color: colors.textPrimary,
          }}
        >
          Lore
        </Text>
        <View style={{ flexDirection: 'row', gap: 14 }}>
          <TouchableOpacity>
            <Text style={{ fontSize: 18, color: colors.textSecondary }}>🔍</Text>
          </TouchableOpacity>
          <TouchableOpacity>
            <Text style={{ fontSize: 18, color: colors.textSecondary }}>🔔</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Tab Navigation */}
      <View
        style={{
          flexDirection: 'row',
          paddingHorizontal: 16,
          gap: 20,
          borderBottomWidth: 1,
          borderBottomColor: colors.border,
        }}
      >
        {(['for-you', 'following', 'trending'] as const).map((tab) => (
          <TouchableOpacity
            key={tab}
            onPress={() => setSelectedTab(tab)}
            style={{
              paddingBottom: 9,
              borderBottomWidth: selectedTab === tab ? 2 : 0,
              borderBottomColor: colors.primary,
            }}
          >
            <Text
              style={{
                fontSize: 12,
                color:
                  selectedTab === tab ? colors.textPrimary : colors.textMuted,
                fontWeight: selectedTab === tab ? '500' : '400',
              }}
            >
              {tab === 'for-you'
                ? 'For You'
                : tab === 'following'
                ? 'Following'
                : 'Trending'}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* Stories Bar */}
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        style={{
          paddingHorizontal: 16,
          paddingVertical: 12,
          borderBottomWidth: 1,
          borderBottomColor: colors.border,
        }}
        contentContainerStyle={{
          gap: 12,
        }}
      >
        {/* Your Story */}
        <View style={{ alignItems: 'center', gap: 5 }}>
          <TouchableOpacity
            style={{
              width: 46,
              height: 46,
              borderRadius: 23,
              borderWidth: 2,
              borderColor: colors.border,
              justifyContent: 'center',
              alignItems: 'center',
              backgroundColor: colors.elevated,
            }}
          >
            <Text style={{ fontSize: 20 }}>+</Text>
          </TouchableOpacity>
          <Text
            style={{
              fontSize: 9,
              color: colors.textMuted,
              maxWidth: 46,
              textAlign: 'center',
            }}
          >
            You
          </Text>
        </View>

        {/* Other Stories */}
        {['aryan.k', 'sara.r', 'mike.j', 'luna'].map((user) => (
          <View key={user} style={{ alignItems: 'center', gap: 5 }}>
            <View
              style={{
                width: 46,
                height: 46,
                borderRadius: 23,
                borderWidth: 2,
                borderColor: colors.primary,
                justifyContent: 'center',
                alignItems: 'center',
                backgroundColor: colors.elevated,
              }}
            >
              <Text
                style={{
                  fontSize: 11,
                  fontWeight: '500',
                  color: colors.primary,
                }}
              >
                {user[0].toUpperCase()}{user[1]}
              </Text>
            </View>
            <Text
              style={{
                fontSize: 9,
                color: colors.textMuted,
                maxWidth: 46,
                textAlign: 'center',
              }}
            >
              {user}
            </Text>
          </View>
        ))}
      </ScrollView>

      {/* Feed */}
      <FlatList
        data={posts}
        renderItem={renderPost}
        keyExtractor={(item) => item.id}
        scrollEnabled
      />

      {/* Compose Bar */}
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          gap: 10,
          paddingHorizontal: 16,
          paddingVertical: 10,
          borderTopWidth: 1,
          borderTopColor: colors.border,
          backgroundColor: colors.background,
        }}
      >
        <View
          style={{
            width: 28,
            height: 28,
            borderRadius: 14,
            backgroundColor: colors.primary,
            justifyContent: 'center',
            alignItems: 'center',
            flexShrink: 0,
          }}
        >
          <Text style={{ fontSize: 10, fontWeight: '500' }}>Y</Text>
        </View>
        <TextInput
          placeholder="What are you building today?"
          placeholderTextColor={colors.textMuted}
          editable={false}
          style={{
            flex: 1,
            backgroundColor: colors.surface,
            borderWidth: 1,
            borderColor: colors.border,
            borderRadius: 20,
            paddingHorizontal: 14,
            paddingVertical: 8,
            fontSize: 11,
            color: colors.textPrimary,
          }}
        />
        <TouchableOpacity
          onPress={onCreatePostPress}
          style={{
            backgroundColor: colors.primary,
            borderRadius: 20,
            paddingHorizontal: 14,
            paddingVertical: 8,
          }}
        >
          <Text
            style={{
              color: colors.textPrimary,
              fontSize: 11,
              fontWeight: '500',
            }}
          >
            Post
          </Text>
        </TouchableOpacity>
      </View>

      {/* Bottom Navigation */}
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-around',
          alignItems: 'center',
          paddingVertical: 10,
          borderTopWidth: 1,
          borderTopColor: colors.border,
          backgroundColor: colors.background,
        }}
      >
        <TouchableOpacity style={{ alignItems: 'center' }}>
          <Text style={{ fontSize: 20 }}>🏠</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={onDiscoverPress} style={{ alignItems: 'center' }}>
          <Text style={{ fontSize: 20, opacity: 0.5 }}>🧭</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={onCreatePostPress} style={{ alignItems: 'center' }}>
          <Text style={{ fontSize: 20, opacity: 0.5 }}>➕</Text>
        </TouchableOpacity>
        <TouchableOpacity style={{ alignItems: 'center' }}>
          <Text style={{ fontSize: 20, opacity: 0.5 }}>🔔</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={onProfilePress} style={{ alignItems: 'center' }}>
          <Text style={{ fontSize: 20, opacity: 0.5 }}>👤</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}
