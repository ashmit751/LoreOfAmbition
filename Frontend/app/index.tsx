
import { View, Text } from 'react-native'
import React from 'react'
import { Link } from "expo-router"

const index = () => {
  return (
    <View className="flex-1 items-center justify-center">
      <Text >index</Text>
      <Link href="/_layout.tsx" className="" bg-color="background">Get Started</Link>
    </View>
  )
}

export default index