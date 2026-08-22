import React, { useState } from 'react';
import {
  View,
  Text,
  Image,
  TextInput,
  TouchableOpacity,
  SafeAreaView,
  ScrollView,
  StatusBar,
  Platform,
} from 'react-native';
import { useRouter } from 'expo-router';
import { PAGE_LOGO } from '@/constants/icons';
import '@/global.css';

const NICHES = [
  'Programming',
  'Design',
  'Writing',
  'Fitness',
  'Business',
  'Art & Animation',
  'Music & Audio',
  'Filmmaking',
];

export default function OnboardingStep2() {
  const router = useRouter();
  const [selectedNiche, setSelectedNiche] = useState(NICHES[0]);
  const [youtube, setYoutube] = useState('');
  const [twitter, setTwitter] = useState('');
  const [github, setGithub] = useState('');
  const [instagram, setInstagram] = useState('');

  const hardTopPadding = Platform.OS === 'android' ? (StatusBar.currentHeight || 28) + 24 : 32;

  return (
    <SafeAreaView className="flex-1 bg-[#08111F]">
      <StatusBar barStyle="light-content" backgroundColor="#08111F" />

      {/* Top Header Bar – Logo fills the bar */}
      <View
        style={{ paddingTop: hardTopPadding, paddingBottom: 14 }}
        className="items-center justify-center border-b border-white/5 bg-[#08111F] px-8">
        <Image
          source={PAGE_LOGO}
          style={{ height: 52, width: '80%', maxWidth: 300 }}
          resizeMode="contain"
        />
      </View>

      <ScrollView className="flex-1 px-6 pt-4" showsVerticalScrollIndicator={false}>
        {/* Step indicator */}
        <View className="mt-1 mb-6 items-center">
          <View className="mb-3 flex-row items-center gap-2">
            <View className="h-1 w-10 rounded-full bg-[#4D8BFF]" />
            <View className="h-1 w-10 rounded-full bg-[#4D8BFF]" />
            <View className="h-1 w-10 rounded-full bg-white/20" />
          </View>
          <Text className="text-xs font-medium text-white/50">Step 2 of 3</Text>
        </View>
        <Text className="mb-1 text-2xl font-bold text-white">Your Creator World</Text>
        <Text className="mb-6 text-xs text-white/50">
          What niche are you in? Link up to 4 platforms.
        </Text>

        {/* Niche Selector */}
        <Text className="mb-2.5 text-[10px] font-semibold text-white/60 uppercase">
          Select Primary Niche
        </Text>
        <View className="mb-6 flex-row flex-wrap gap-2">
          {NICHES.map((niche) => (
            <TouchableOpacity
              key={niche}
              onPress={() => setSelectedNiche(niche)}
              className={`rounded-xl border px-3.5 py-2 ${
                selectedNiche === niche
                  ? 'border-[#4D8BFF] bg-[#4D8BFF]'
                  : 'border-[#4D8BFF]/15 bg-[#151B2D]'
              }`}>
              <Text
                className={`text-xs ${
                  selectedNiche === niche ? 'font-semibold text-white' : 'text-white/60'
                }`}>
                {niche}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* Social Links */}
        <Text className="mb-2.5 text-[10px] font-semibold text-white/60 uppercase">
          Connected Platforms (Corners of Hexagon)
        </Text>
        <View className="mb-8 gap-3">
          <TextInput
            placeholder="YouTube (e.g. youtube.com/@channel)"
            placeholderTextColor="rgba(255,255,255,0.4)"
            value={youtube}
            onChangeText={setYoutube}
            autoCapitalize="none"
            className="w-full rounded-xl border border-[#4D8BFF]/15 bg-[#151B2D] px-4 py-3 text-xs text-white"
          />
          <TextInput
            placeholder="X / Twitter (e.g. x.com/username)"
            placeholderTextColor="rgba(255,255,255,0.4)"
            value={twitter}
            onChangeText={setTwitter}
            autoCapitalize="none"
            className="w-full rounded-xl border border-[#4D8BFF]/15 bg-[#151B2D] px-4 py-3 text-xs text-white"
          />
          <TextInput
            placeholder="GitHub (e.g. github.com/username)"
            placeholderTextColor="rgba(255,255,255,0.4)"
            value={github}
            onChangeText={setGithub}
            autoCapitalize="none"
            className="w-full rounded-xl border border-[#4D8BFF]/15 bg-[#151B2D] px-4 py-3 text-xs text-white"
          />
          <TextInput
            placeholder="Instagram (e.g. instagram.com/username)"
            placeholderTextColor="rgba(255,255,255,0.4)"
            value={instagram}
            onChangeText={setInstagram}
            autoCapitalize="none"
            className="w-full rounded-xl border border-[#4D8BFF]/15 bg-[#151B2D] px-4 py-3 text-xs text-white"
          />
        </View>

        <TouchableOpacity
          onPress={() => router.push('/auth/onboardingstep3')}
          className="mb-8 w-full items-center justify-center rounded-xl bg-[#4D8BFF] py-3">
          <Text className="text-xs font-bold text-white">Continue</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}
