import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  SafeAreaView,
  ScrollView,
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

const NICHES = [
  'Programming',
  'AI',
  'Startups',
  'Fitness',
  'Gaming',
  'Design',
  'Writing',
  'Art',
  'Music',
  'Marketing',
  'Business',
  'Content Creation',
  'Education',
  'Self Improvement',
];

interface OnboardingStep2Props {
  onContinue?: (selectedNiches: string[]) => void;
}

export default function OnboardingStep2({ onContinue }: OnboardingStep2Props) {
  const [selectedNiches, setSelectedNiches] = useState<string[]>([]);

  const toggleNiche = (niche: string) => {
    setSelectedNiches((prev) =>
      prev.includes(niche)
        ? prev.filter((n) => n !== niche)
        : [...prev, niche]
    );
  };

  const handleContinue = () => {
    if (selectedNiches.length > 0) {
      onContinue?.(selectedNiches);
    }
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: colors.background }}>
      <ScrollView contentContainerStyle={{ flexGrow: 1, justifyContent: 'center' }}>
        <View className="flex-1 justify-center items-center px-6 py-8">
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
            </View>

            <Text
              style={{
                textAlign: 'center',
                fontSize: 11,
                color: 'rgba(255, 255, 255, 0.4)',
                marginBottom: 18,
              }}
            >
              Step 2 of 3
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
              What do you create?
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
              Pick everything that fits — you can change this later
            </Text>

            {/* Chips Grid */}
            <View
              style={{
                flexDirection: 'row',
                flexWrap: 'wrap',
                gap: 8,
                marginBottom: 20,
                justifyContent: 'center',
              }}
            >
              {NICHES.map((niche) => {
                const isSelected = selectedNiches.includes(niche);
                return (
                  <TouchableOpacity
                    key={niche}
                    onPress={() => toggleNiche(niche)}
                    style={{
                      backgroundColor: isSelected
                        ? `${colors.primary}1F`
                        : colors.surface,
                      borderWidth: 1,
                      borderColor: isSelected
                        ? colors.primary
                        : colors.border,
                      borderRadius: 20,
                      paddingHorizontal: 12,
                      paddingVertical: 6,
                    }}
                  >
                    <Text
                      style={{
                        fontSize: 12,
                        color: isSelected ? colors.primary : colors.textSecondary,
                        fontWeight: isSelected ? '500' : '400',
                      }}
                    >
                      {niche}
                    </Text>
                  </TouchableOpacity>
                );
              })}
            </View>

            {/* Continue Button */}
            <TouchableOpacity
              onPress={handleContinue}
              disabled={selectedNiches.length === 0}
              style={{
                backgroundColor: colors.primary,
                borderRadius: 10,
                paddingVertical: 12,
                opacity: selectedNiches.length > 0 ? 1 : 0.5,
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
    </SafeAreaView>
  );
}
