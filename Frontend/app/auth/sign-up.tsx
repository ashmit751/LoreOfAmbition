import { View, Text } from 'react-native'
import React from 'react'
import { Link } from 'expo-router'

export default function SignUp() {
  return (
    <View>
      <Text>sign-up</Text>
      <Link href ="/auth/sign-in" className="bg-background text-white p-4 rounded-lg">
        Already have an account? Sign in
      </Link>
    </View>
  )
}
 