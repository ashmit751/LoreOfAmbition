import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  SafeAreaView,
  KeyboardAvoidingView,
  Platform,
  Image,
  ScrollView,
} from 'react-native';

const colors = {
  background: '#08111F',
  surface: '#151B2D',
  elevated: '#0E1A2E',
  primary: '#4D8BFF',
  textPrimary: '#FFFFFF',
  textMuted: 'rgba(255, 255, 255, 0.45)',
  border: 'rgba(255, 255, 255, 0.08)',
};

interface AboutYouScreenProps {
  onContinue?: (displayName: string, bio: string) => void;
}

export default function AboutYouScreen({ onContinue }: AboutYouScreenProps) {
  const [displayName, setDisplayName] = useState('');
  const [bio, setBio] = useState('');

  const handleContinue = () => {
    onContinue?.(displayName, bio);
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: colors.background }}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={{ flex: 1 }}
      >
        <ScrollView contentContainerStyle={{ flexGrow: 1, justifyContent: 'center' }}>
          <View className="flex-1 justify-center items-center px-6">
            {/* Card Container */}
            <View
              style={{
                width: '100%',
                maxWidth: 340,
                backgroundColor: colors.background,
                borderRadius: 26,
                borderWidth: 1,
                borderColor: colors.border,
                padding: 28,
              }}
            >
              {/* Step Indicator */}
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'center',
                  gap: 7,
                  marginBottom: 10,
                }}
              >
                <View
                  style={{
                    width: 26,
                    height: 4,
                    borderRadius: 2,
                    backgroundColor: colors.primary,
                  }}
                />
                <View
                  style={{
                    width: 26,
                    height: 4,
                    borderRadius: 2,
                    backgroundColor: 'rgba(255, 255, 255, 0.15)',
                  }}
                />
                <View
                  style={{
                    width: 26,
                    height: 4,
                    borderRadius: 2,
                    backgroundColor: 'rgba(255, 255, 255, 0.15)',
                  }}
                />
              </View>

              <Text
                style={{
                  textAlign: 'center',
                  fontSize: 11,
                  color: 'rgba(255, 255, 255, 0.4)',
                  marginBottom: 18,
                }}
              >
                Step 1 of 3
              </Text>

              {/* Title */}
              <Text
                style={{
                  fontSize: 15,
                  fontWeight: '500',
                  color: colors.textPrimary,
                  textAlign: 'center',
                  marginBottom: 3,
                }}
              >
                About you
              </Text>

              {/* Subtitle */}
              <Text
                style={{
                  fontSize: 11,
                  color: colors.textMuted,
                  textAlign: 'center',
                  marginBottom: 18,
                }}
              >
                Tell other creators who you are
              </Text>

              {/* Profile Picture */}
              <View
                style={{
                  justifyContent: 'center',
                  alignItems: 'center',
                  marginBottom: 18,
                }}
              >
                <View
                  style={{
                    position: 'relative',
                    width: 60,
                    height: 60,
                  }}
                >
                  <View
                    style={{
                      width: 60,
                      height: 60,
                      borderRadius: 30,
                      backgroundColor: colors.elevated,
                      borderWidth: 1,
                      borderColor: colors.border,
                    }}
                  />
                  <TouchableOpacity
                    style={{
                      position: 'absolute',
                      bottom: -4,
                      right: -4,
                      width: 24,
                      height: 24,
                      borderRadius: 12,
                      backgroundColor: colors.primary,
                      justifyContent: 'center',
                      alignItems: 'center',
                      borderWidth: 2,
                      borderColor: colors.background,
                    }}
                  >
                    <Text style={{ fontSize: 12, color: colors.textPrimary }}>
                      📷
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>

              {/* Display Name Input */}
              <TextInput
                placeholder="Display name"
                placeholderTextColor={colors.textMuted}
                value={displayName}
                onChangeText={setDisplayName}
                style={{
                  backgroundColor: colors.surface,
                  borderWidth: 1,
                  borderColor: colors.border,
                  borderRadius: 10,
                  paddingHorizontal: 14,
                  paddingVertical: 12,
                  marginBottom: 12,
                  color: colors.textPrimary,
                  fontSize: 13,
                }}
              />

              {/* Bio Input */}
              <TextInput
                placeholder="Bio (optional)"
                placeholderTextColor={colors.textMuted}
                value={bio}
                onChangeText={setBio}
                multiline
                numberOfLines={4}
                style={{
                  backgroundColor: colors.surface,
                  borderWidth: 1,
                  borderColor: colors.border,
                  borderRadius: 10,
                  paddingHorizontal: 14,
                  paddingVertical: 12,
                  marginBottom: 18,
                  color: colors.textPrimary,
                  fontSize: 13,
                  textAlignVertical: 'top',
                }}
              />

              {/* Continue Button */}
              <TouchableOpacity
                onPress={handleContinue}
                disabled={!displayName}
                style={{
                  backgroundColor: colors.primary,
                  borderRadius: 10,
                  paddingVertical: 12,
                  opacity: displayName ? 1 : 0.5,
                }}
              >
                <Text
                  style={{
                    color: colors.textPrimary,
                    fontSize: 13,
                    fontWeight: '500',
                    textAlign: 'center',
                  }}
                >
                  Continue
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
