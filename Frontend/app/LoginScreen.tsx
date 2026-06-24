import React, { useState, useRef, useMemo } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  SafeAreaView,
  KeyboardAvoidingView,
  Platform,
  ActivityIndicator,
  StyleSheet,
} from 'react-native';
import { Canvas, useFrame, extend } from '@react-three/fiber';
import { OrbitControls, Effects } from '@react-three/drei';
import { UnrealBloomPass } from 'three-stdlib';
import * as THREE from 'three';

extend({ UnrealBloomPass });

const colors = {
  background: '#08111F',
  surface: '#151B2D',
  primary: '#4D8BFF',
  textPrimary: '#FFFFFF',
  textMuted: 'rgba(255, 255, 255, 0.45)',
  border: 'rgba(255, 255, 255, 0.08)',
};

interface LoginScreenProps {
  onSignInPress?: () => void;
  onSignUpPress?: () => void;
  onGooglePress?: () => void;
}

export default function LoginScreen({
  onSignInPress,
  onSignUpPress,
  onGooglePress,
}: LoginScreenProps) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSignIn = async () => {
    if (!username || !password) return;
    setLoading(true);
    // Add your auth logic here
    onSignInPress?.();
    setLoading(false);
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: colors.background }}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={{ flex: 1 }}
      >
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
            {/* Logo/Title */}
            <Text
              style={{
                fontSize: 28,
                fontWeight: '600',
                color: colors.textPrimary,
                textAlign: 'center',
                marginBottom: 4,
              }}
            >
              LOG IN
            </Text>

            {/* Subtitle */}
            <Text
              style={{
                fontSize: 13,
                color: colors.textMuted,
                textAlign: 'center',
                marginBottom: 28,
              }}
            >
              Back to your journey
            </Text>

            {/* Username Input */}
            <TextInput
              placeholder="username"
              placeholderTextColor={colors.textMuted}
              value={username}
              onChangeText={setUsername}
              style={{
                backgroundColor: colors.surface,
                borderWidth: 1,
                borderColor: colors.border,
                borderRadius: 10,
                paddingHorizontal: 14,
                paddingVertical: 12,
                marginBottom: 14,
                color: colors.textPrimary,
                fontSize: 14,
              }}
            />

            {/* Password Input */}
            <TextInput
              placeholder="password"
              placeholderTextColor={colors.textMuted}
              value={password}
              onChangeText={setPassword}
              secureTextEntry
              style={{
                backgroundColor: colors.surface,
                borderWidth: 1,
                borderColor: colors.border,
                borderRadius: 10,
                paddingHorizontal: 14,
                paddingVertical: 12,
                marginBottom: 20,
                color: colors.textPrimary,
                fontSize: 14,
              }}
            />

            {/* Sign In Button */}
            <TouchableOpacity
              onPress={handleSignIn}
              disabled={!username || !password || loading}
              style={{
                backgroundColor: colors.primary,
                borderRadius: 10,
                paddingVertical: 12,
                marginBottom: 18,
                opacity: username && password ? 1 : 0.5,
              }}
            >
              {loading ? (
                <ActivityIndicator color={colors.textPrimary} />
              ) : (
                <Text
                  style={{
                    color: colors.textPrimary,
                    fontSize: 14,
                    fontWeight: '500',
                    textAlign: 'center',
                  }}
                >
                  Sign In
                </Text>
              )}
            </TouchableOpacity>

            {/* Divider */}
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                marginBottom: 18,
              }}
            >
              <View
                style={{
                  flex: 1,
                  height: 1,
                  backgroundColor: colors.border,
                }}
              />
              <Text
                style={{
                  marginHorizontal: 10,
                  fontSize: 11,
                  color: colors.textMuted,
                }}
              >
                or
              </Text>
              <View
                style={{
                  flex: 1,
                  height: 1,
                  backgroundColor: colors.border,
                }}
              />
            </View>

            {/* Google Sign In Button */}
            <TouchableOpacity
              onPress={onGooglePress}
              style={{
                backgroundColor: 'transparent',
                borderWidth: 1,
                borderColor: colors.border,
                borderRadius: 10,
                paddingVertical: 11,
                marginBottom: 20,
                flexDirection: 'row',
                justifyContent: 'center',
                alignItems: 'center',
              }}
            >
              <Text
                style={{
                  color: colors.textPrimary,
                  fontSize: 12,
                  fontWeight: '500',
                }}
              >
                Sign in with Google
              </Text>
            </TouchableOpacity>

            {/* Sign Up Link */}
            <View style={{ flexDirection: 'row', justifyContent: 'center' }}>
              <Text
                style={{
                  fontSize: 11,
                  color: colors.textMuted,
                  textAlign: 'center',
                }}
              >
                New to Lore?{' '}
              </Text>
              <TouchableOpacity onPress={onSignUpPress}>
                <Text
                  style={{
                    fontSize: 11,
                    color: colors.primary,
                    fontWeight: '500',
                  }}
                >
                  Sign up
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
