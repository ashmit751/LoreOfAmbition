import { View, Text } from 'react-native'
import React from 'react'
import { Link } from 'expo-router'

export default function OnboardingStep3() {
  return (
    <View className="flex-1 bg-background px-6 pt-16">
      {/* Step indicator */}
      <Text className="text-text-muted text-xs mb-2 tracking-widest uppercase">Step 3 of 3</Text>
      <Text className="text-2xl font-bold text-text mb-1">Your Project & Goals</Text>
      <Text className="text-text-muted text-sm mb-10">
        What are you building right now? What do you need — and what can you offer?
      </Text>

      {/* TODO: current project name + goal, looking-for tags, can-help-with tags */}

      {/* Finish onboarding → enter the app */}
      <Link
        href="/tabs"
        className="bg-primary text-white p-4 rounded-xl w-full text-center font-semibold mt-auto"
      >
        Let's go →
      </Link>
    </View>
  )
}