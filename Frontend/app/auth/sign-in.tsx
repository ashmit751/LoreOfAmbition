import { View, Text } from 'react-native'
import React from 'react'
import { Link } from 'expo-router'

export default function SignIn() {
  return (
    <View>
      <Text>sign-in</Text>
      <Link href ="/auth/onboardingstep1" className="bg-background text-white p-4 rounded-lg">
        Don't have an account? Sign up
      </Link>
    </View>
  )
}

