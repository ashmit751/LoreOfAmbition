import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  SafeAreaView,
  ScrollView,
  Alert,
} from 'react-native';
import { useRouter } from 'expo-router';
import "@/global.css"

const PROJECTS = [
  'Lore of Ambition',
  'React Learning Path',
  'Design System V2',
];

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
        <View className="bg-[#08111F] rounded-t-[28px] p-5 border-t border-[#4D8BFF]/20">
          <Text className="text-base font-bold text-white mb-4">
            What do you want to create?
          </Text>

          {/* Option 1: Post */}
          <TouchableOpacity
            onPress={() => setSelectedType('post')}
            className={`p-3.5 rounded-xl border mb-2.5 flex-row items-center gap-3 ${
              selectedType === 'post'
                ? 'bg-[#4D8BFF]/15 border-[#4D8BFF]'
                : 'border-[#4D8BFF]/15 bg-[#151B2D]/60'
            }`}
          >
            <Text className="text-xl">📝</Text>
            <View className="flex-1">
              <Text className="text-xs font-semibold text-white">Post</Text>
              <Text className="text-[10px] text-white/50">Share your daily progress</Text>
            </View>
          </TouchableOpacity>

          {/* Option 2: Bulletin */}
          <TouchableOpacity
            onPress={() => setSelectedType('bulletin')}
            className={`p-3.5 rounded-xl border mb-2.5 flex-row items-center gap-3 ${
              selectedType === 'bulletin'
                ? 'bg-[#4D8BFF]/15 border-[#4D8BFF]'
                : 'border-[#4D8BFF]/15 bg-[#151B2D]/60'
            }`}
          >
            <Text className="text-xl">📌</Text>
            <View className="flex-1">
              <Text className="text-xs font-semibold text-white">Bulletin</Text>
              <Text className="text-[10px] text-white/50">Long-form project update</Text>
            </View>
          </TouchableOpacity>

          {/* Option 3: Challenge */}
          <TouchableOpacity
            onPress={() => setSelectedType('challenge')}
            className={`p-3.5 rounded-xl border mb-3 flex-row items-center gap-3 ${
              selectedType === 'challenge'
                ? 'bg-[#4D8BFF]/15 border-[#4D8BFF]'
                : 'border-[#4D8BFF]/15 bg-[#151B2D]/60'
            }`}
          >
            <Text className="text-xl">🏆</Text>
            <View className="flex-1">
              <Text className="text-xs font-semibold text-white">Challenge</Text>
              <Text className="text-[10px] text-white/50">Start a new challenge</Text>
            </View>
          </TouchableOpacity>

          {/* Current Project Selector */}
          <View className="p-3 bg-[#0E1A2E]/90 rounded-xl border border-[#4D8BFF]/15 mb-3.5">
            <Text className="text-[10px] text-white/50 font-semibold uppercase mb-1.5">
              Current Project
            </Text>
            
            <TouchableOpacity
              onPress={() => setShowProjectPicker(!showProjectPicker)}
              className="bg-[#151B2D] border border-[#4D8BFF]/25 rounded-lg p-2.5 flex-row items-center justify-between"
            >
              <Text className="text-xs font-medium text-white">{selectedProject}</Text>
              <Text className="text-xs text-white/60">{showProjectPicker ? '▲' : '▼'}</Text>
            </TouchableOpacity>

            {showProjectPicker && (
              <View className="mt-2 pt-2 border-t border-white/5 gap-1.5">
                {PROJECTS.map((proj) => (
                  <TouchableOpacity
                    key={proj}
                    onPress={() => {
                      setSelectedProject(proj);
                      setShowProjectPicker(false);
                    }}
                    className={`p-2 rounded-md ${
                      selectedProject === proj ? 'bg-[#4D8BFF]/20' : ''
                    }`}
                  >
                    <Text
                      className={`text-xs ${
                        selectedProject === proj ? 'text-[#4D8BFF] font-semibold' : 'text-white/80'
                      }`}
                    >
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
            className="bg-[#0E1A2E]/80 border border-[#4D8BFF]/15 rounded-xl p-3 text-xs text-white mb-3"
            style={{ textAlignVertical: 'top', minHeight: 70 }}
          />

          <TouchableOpacity
            onPress={handleCreate}
            className="w-full bg-[#4D8BFF] py-3 rounded-xl items-center justify-center"
          >
            <Text className="text-xs font-bold text-white">Publish to Lore</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
}