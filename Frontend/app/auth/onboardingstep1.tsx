import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  SafeAreaView,
  ScrollView,
  StatusBar,
} from 'react-native';
import { useRouter } from 'expo-router';
import '@/global.css';

const AVATARS = ['👨‍💻', '🎨', '🚀', '🎬', '✍️', '⚡'];

export default function OnboardingStep1() {
  const router = useRouter();
  const [name, setName] = useState('');
  const [username, setUsername] = useState('');
  const [bio, setBio] = useState('');
  const [selectedAvatar, setSelectedAvatar] = useState(AVATARS[0]);

  return (
    <SafeAreaView className="flex-1 bg-[#08111F]">
      <StatusBar barStyle="light-content" backgroundColor="#08111F" />
      <ScrollView className="flex-1 px-6 pt-6" showsVerticalScrollIndicator={false}>
        {/* Step indicator */}
        <Text className="mb-1.5 text-[10px] font-semibold tracking-widest text-[#4D8BFF] uppercase">
          Step 1 of 3
        </Text>
        <Text className="mb-1 text-2xl font-bold text-white">About You</Text>
        <Text className="mb-6 text-xs text-white/50">
          Tell us who you are and what you&apos;re building.
        </Text>

        {/* Avatar Picker */}
        <Text className="mb-2 text-[10px] font-semibold text-white/60 uppercase">
          Choose Avatar
        </Text>
        <View className="mb-5 flex-row flex-wrap gap-3">
          {AVATARS.map((av) => (
            <TouchableOpacity
              key={av}
              onPress={() => setSelectedAvatar(av)}
              className={`h-12 w-12 items-center justify-center rounded-2xl border ${
                selectedAvatar === av
                  ? 'border-[#4D8BFF] bg-[#4D8BFF]/25'
                  : 'border-white/5 bg-[#151B2D]'
              }`}>
              <Text className="text-xl">{av}</Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* Input Fields */}
        <View className="mb-8 gap-3.5">
          <View>
            <Text className="mb-1.5 text-[10px] font-semibold text-white/60">Display Name</Text>
            <TextInput
              placeholder="e.g. Devraj Sharma"
              placeholderTextColor="rgba(255,255,255,0.4)"
              value={name}
              onChangeText={setName}
              className="w-full rounded-xl border border-[#4D8BFF]/15 bg-[#151B2D] px-4 py-3 text-xs text-white"
            />
          </View>

          <View>
            <Text className="mb-1.5 text-[10px] font-semibold text-white/60">Username</Text>
            <TextInput
              placeholder="e.g. devraj"
              placeholderTextColor="rgba(255,255,255,0.4)"
              value={username}
              onChangeText={setUsername}
              autoCapitalize="none"
              className="w-full rounded-xl border border-[#4D8BFF]/15 bg-[#151B2D] px-4 py-3 text-xs text-white"
            />
          </View>

          <View>
            <Text className="mb-1.5 text-[10px] font-semibold text-white/60">Bio</Text>
            <TextInput
              placeholder="Building in public, learning full stack..."
              placeholderTextColor="rgba(255,255,255,0.4)"
              multiline
              numberOfLines={2}
              value={bio}
              onChangeText={setBio}
              className="w-full rounded-xl border border-[#4D8BFF]/15 bg-[#151B2D] px-4 py-3 text-xs text-white"
              style={{ textAlignVertical: 'top' }}
            />
          </View>
        </View>

        <TouchableOpacity
          onPress={() => router.push('/auth/onboardingstep2')}
          className="mb-8 w-full items-center justify-center rounded-xl bg-[#4D8BFF] py-3">
          <Text className="text-xs font-bold text-white">Continue</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}
