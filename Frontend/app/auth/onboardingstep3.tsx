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
import { APP_ICON } from '@/constants/icons';
import '@/global.css';

const LOOKING_FOR_OPTIONS = [
  'Video Editor',
  'Music Producer',
  'Collaborator',
  'Developer',
  'Feedback',
  'Beta Tester',
];

const CAN_HELP_WITH_OPTIONS = [
  'Photoshop',
  'Video Editing',
  'React',
  'Branding',
  'YouTube Thumbnails',
  'Writing',
];

export default function OnboardingStep3() {
  const router = useRouter();
  const [projectName, setProjectName] = useState('Lore of Ambition');
  const [projectGoal, setProjectGoal] = useState('Finish authentication module');
  const [selectedLookingFor, setSelectedLookingFor] = useState<string[]>(['Developer', 'Feedback']);
  const [selectedCanHelpWith, setSelectedCanHelpWith] = useState<string[]>(['React', 'Branding']);

  const toggleItem = (list: string[], setList: (val: string[]) => void, item: string) => {
    if (list.includes(item)) {
      setList(list.filter((i) => i !== item));
    } else {
      setList([...list, item]);
    }
  };

  const hardTopPadding = Platform.OS === 'android' ? (StatusBar.currentHeight || 28) + 24 : 32;

  return (
    <SafeAreaView className="flex-1 bg-[#08111F]">
      <StatusBar barStyle="light-content" backgroundColor="#08111F" />

      {/* Instagram-style Top Header Bar with Hard Top Margin & Logo */}
      <View
        style={{ paddingTop: hardTopPadding }}
        className="flex-row items-center justify-center border-b border-white/5 bg-[#08111F] px-5 pb-3.5">
        <View className="flex-row items-center gap-2">
          <Image source={APP_ICON} className="h-7 w-7 rounded-lg" resizeMode="contain" />
          <Text className="text-xl font-extrabold tracking-wider text-white">Lore</Text>
        </View>
      </View>

      <ScrollView className="flex-1 px-6 pt-4" showsVerticalScrollIndicator={false}>
        {/* Step indicator */}
        <View className="mt-1 mb-6 items-center">
          <View className="mb-3 flex-row items-center gap-2">
            <View className="h-1 w-10 rounded-full bg-[#4D8BFF]" />
            <View className="h-1 w-10 rounded-full bg-[#4D8BFF]" />
            <View className="h-1 w-10 rounded-full bg-[#4D8BFF]" />
          </View>
          <Text className="text-xs font-medium text-white/50">Step 3 of 3</Text>
        </View>
        <Text className="mb-1 text-2xl font-bold text-white">Your Project & Goals</Text>
        <Text className="mb-6 text-xs text-white/50">
          What are you building right now? What do you need — and what can you offer?
        </Text>

        {/* Starting Project Card */}
        <View className="mb-6 rounded-[18px] border border-[#4D8BFF]/20 bg-[#4D8BFF]/[0.08] p-4">
          <Text className="mb-2 text-[10px] font-semibold tracking-wider text-[#4D8BFF] uppercase">
            Starting Project
          </Text>

          <View className="mb-3">
            <Text className="mb-1 text-[10px] text-white/60">Project Name</Text>
            <TextInput
              placeholder="e.g. Lore of Ambition"
              placeholderTextColor="rgba(255,255,255,0.4)"
              value={projectName}
              onChangeText={setProjectName}
              className="w-full rounded-xl border border-[#4D8BFF]/15 bg-[#151B2D] px-3.5 py-2.5 text-xs text-white"
            />
          </View>

          <View>
            <Text className="mb-1 text-[10px] text-white/60">Today&apos;s Goal</Text>
            <TextInput
              placeholder="e.g. Finish landing page"
              placeholderTextColor="rgba(255,255,255,0.4)"
              value={projectGoal}
              onChangeText={setProjectGoal}
              className="w-full rounded-xl border border-[#4D8BFF]/15 bg-[#151B2D] px-3.5 py-2.5 text-xs text-white"
            />
          </View>
        </View>

        {/* Looking For */}
        <Text className="mb-2 text-[10px] font-semibold text-white/60 uppercase">
          Looking For (Select all that apply)
        </Text>
        <View className="mb-6 flex-row flex-wrap gap-2">
          {LOOKING_FOR_OPTIONS.map((item) => {
            const active = selectedLookingFor.includes(item);
            return (
              <TouchableOpacity
                key={item}
                onPress={() => toggleItem(selectedLookingFor, setSelectedLookingFor, item)}
                className={`rounded-xl border px-3 py-1.5 ${
                  active ? 'border-[#4D8BFF] bg-[#4D8BFF]' : 'border-[#4D8BFF]/15 bg-[#151B2D]'
                }`}>
                <Text
                  className={`text-xs ${active ? 'font-semibold text-white' : 'text-white/60'}`}>
                  {item}
                </Text>
              </TouchableOpacity>
            );
          })}
        </View>

        {/* Can Help With */}
        <Text className="mb-2 text-[10px] font-semibold text-white/60 uppercase">
          Can Help With (Your Superpowers)
        </Text>
        <View className="mb-8 flex-row flex-wrap gap-2">
          {CAN_HELP_WITH_OPTIONS.map((item) => {
            const active = selectedCanHelpWith.includes(item);
            return (
              <TouchableOpacity
                key={item}
                onPress={() => toggleItem(selectedCanHelpWith, setSelectedCanHelpWith, item)}
                className={`rounded-xl border px-3 py-1.5 ${
                  active ? 'border-[#4D8BFF] bg-[#4D8BFF]' : 'border-[#4D8BFF]/15 bg-[#151B2D]'
                }`}>
                <Text
                  className={`text-xs ${active ? 'font-semibold text-white' : 'text-white/60'}`}>
                  {item}
                </Text>
              </TouchableOpacity>
            );
          })}
        </View>

        {/* Enter App */}
        <TouchableOpacity
          onPress={() => router.replace('/tabs')}
          className="mb-8 w-full items-center justify-center rounded-xl bg-[#4D8BFF] py-3.5">
          <Text className="text-xs font-bold text-white">Let&apos;s go →</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}
