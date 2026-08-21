import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, SafeAreaView, Alert } from 'react-native';
import { useRouter } from 'expo-router';
import '@/global.css';

const PROJECTS = ['Lore of Ambition', 'React Learning Path', 'Design System V2'];

export default function CreateScreen() {
  const router = useRouter();
  const [selectedType, setSelectedType] = useState<'post' | 'bulletin' | 'challenge'>('post');
  const [selectedProject, setSelectedProject] = useState(PROJECTS[0]);
  const [showProjectPicker, setShowProjectPicker] = useState(false);
  const [content, setContent] = useState('');

  const handleCreate = () => {
    if (!content.trim()) {
      Alert.alert('Empty Entry', 'Please write something to share your progress.');
      return;
    }
    Alert.alert('Success', 'Your update has been dropped into your Lore!', [
      { text: 'OK', onPress: () => router.push('/tabs') },
    ]);
  };

  return (
    <SafeAreaView className="flex-1 bg-[#08111F]">
      <View className="flex-1 justify-end bg-black/50">
        <View className="rounded-t-[28px] border-t border-[#4D8BFF]/20 bg-[#08111F] p-5">
          <Text className="mb-4 text-base font-bold text-white">What do you want to create?</Text>

          {/* Option 1: Post */}
          <TouchableOpacity
            onPress={() => setSelectedType('post')}
            className={`mb-2.5 flex-row items-center gap-3 rounded-xl border p-3.5 ${
              selectedType === 'post'
                ? 'border-[#4D8BFF] bg-[#4D8BFF]/15'
                : 'border-[#4D8BFF]/15 bg-[#151B2D]/60'
            }`}>
            <Text className="text-xl">📝</Text>
            <View className="flex-1">
              <Text className="text-xs font-semibold text-white">Post</Text>
              <Text className="text-[10px] text-white/50">Share your daily progress</Text>
            </View>
          </TouchableOpacity>

          {/* Option 2: Bulletin */}
          <TouchableOpacity
            onPress={() => setSelectedType('bulletin')}
            className={`mb-2.5 flex-row items-center gap-3 rounded-xl border p-3.5 ${
              selectedType === 'bulletin'
                ? 'border-[#4D8BFF] bg-[#4D8BFF]/15'
                : 'border-[#4D8BFF]/15 bg-[#151B2D]/60'
            }`}>
            <Text className="text-xl">📌</Text>
            <View className="flex-1">
              <Text className="text-xs font-semibold text-white">Bulletin</Text>
              <Text className="text-[10px] text-white/50">Long-form project update</Text>
            </View>
          </TouchableOpacity>

          {/* Option 3: Challenge */}
          <TouchableOpacity
            onPress={() => setSelectedType('challenge')}
            className={`mb-3 flex-row items-center gap-3 rounded-xl border p-3.5 ${
              selectedType === 'challenge'
                ? 'border-[#4D8BFF] bg-[#4D8BFF]/15'
                : 'border-[#4D8BFF]/15 bg-[#151B2D]/60'
            }`}>
            <Text className="text-xl">🏆</Text>
            <View className="flex-1">
              <Text className="text-xs font-semibold text-white">Challenge</Text>
              <Text className="text-[10px] text-white/50">Start a new challenge</Text>
            </View>
          </TouchableOpacity>

          {/* Current Project Selector */}
          <View className="mb-3.5 rounded-xl border border-[#4D8BFF]/15 bg-[#0E1A2E]/90 p-3">
            <Text className="mb-1.5 text-[10px] font-semibold text-white/50 uppercase">
              Current Project
            </Text>

            <TouchableOpacity
              onPress={() => setShowProjectPicker(!showProjectPicker)}
              className="flex-row items-center justify-between rounded-lg border border-[#4D8BFF]/25 bg-[#151B2D] p-2.5">
              <Text className="text-xs font-medium text-white">{selectedProject}</Text>
              <Text className="text-xs text-white/60">{showProjectPicker ? '▲' : '▼'}</Text>
            </TouchableOpacity>

            {showProjectPicker && (
              <View className="mt-2 gap-1.5 border-t border-white/5 pt-2">
                {PROJECTS.map((proj) => (
                  <TouchableOpacity
                    key={proj}
                    onPress={() => {
                      setSelectedProject(proj);
                      setShowProjectPicker(false);
                    }}
                    className={`rounded-md p-2 ${
                      selectedProject === proj ? 'bg-[#4D8BFF]/20' : ''
                    }`}>
                    <Text
                      className={`text-xs ${
                        selectedProject === proj ? 'font-semibold text-[#4D8BFF]' : 'text-white/80'
                      }`}>
                      {proj}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>
            )}
          </View>

          {/* Input Field */}
          <TextInput
            placeholder={`What's your update for ${selectedProject}?`}
            placeholderTextColor="rgba(255,255,255,0.4)"
            multiline
            numberOfLines={3}
            value={content}
            onChangeText={setContent}
            className="mb-3 rounded-xl border border-[#4D8BFF]/15 bg-[#0E1A2E]/80 p-3 text-xs text-white"
            style={{ textAlignVertical: 'top', minHeight: 70 }}
          />

          <TouchableOpacity
            onPress={handleCreate}
            className="w-full items-center justify-center rounded-xl bg-[#4D8BFF] py-3">
            <Text className="text-xs font-bold text-white">Publish to Lore</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
}
