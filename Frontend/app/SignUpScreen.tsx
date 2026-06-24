import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  SafeAreaView,
  KeyboardAvoidingView,
  Platform,
  ActivityIndicator,
} from 'react-native';

const colors = {
  background: '#08111F',
  surface: '#151B2D',
  primary: '#4D8BFF',
  textPrimary: '#FFFFFF',
  textMuted: 'rgba(255, 255, 255, 0.45)',
  border: 'rgba(255, 255, 255, 0.08)',
};

interface SignUpScreenProps {
  onSignUpPress?: (email: string, username: string, password: string) => void;
  onSignInPress?: () => void;
  onGooglePress?: () => void;
}

export default function SignUpScreen({
  onSignUpPress,
  onSignInPress,
  onGooglePress,
}: SignUpScreenProps) {
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSignUp = async () => {
    if (!email || !username || !password) return;
    setLoading(true);
    // Add your auth logic here
    onSignUpPress?.(email, username, password);
    setLoading(false);
  };

  const isValid = email && username && password;

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
            {/* Logo */}
            <Text
              style={{
                fontSize: 16,
                fontWeight: '500',
                color: colors.textPrimary,
                textAlign: 'center',
                marginBottom: 4,
              }}
            >
              Lore
            </Text>

            {/* Tagline */}
            <Text
              style={{
                fontSize: 10,
                color: colors.textMuted,
                textAlign: 'center',
                marginBottom: 20,
                letterSpacing: 0.5,
              }}
            >
              Different creators. Same story.
            </Text>

            {/* Title */}
            <Text
              style={{
                fontSize: 18,
                fontWeight: '600',
                color: colors.textPrimary,
                textAlign: 'center',
                marginBottom: 3,
              }}
            >
              Create your account
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
              Join creators documenting their journey
            </Text>

            {/* Email Input */}
            <TextInput
              placeholder="Email"
              placeholderTextColor={colors.textMuted}
              value={email}
              onChangeText={setEmail}
              keyboardType="email-address"
              autoCapitalize="none"
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

            {/* Username Input */}
            <TextInput
              placeholder="Username"
              placeholderTextColor={colors.textMuted}
              value={username}
              onChangeText={setUsername}
              autoCapitalize="none"
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

            {/* Password Input */}
            <TextInput
              placeholder="Password"
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
                marginBottom: 18,
                color: colors.textPrimary,
                fontSize: 13,
              }}
            />

            {/* Create Account Button */}
            <TouchableOpacity
              onPress={handleSignUp}
              disabled={!isValid || loading}
              style={{
                backgroundColor: colors.primary,
                borderRadius: 10,
                paddingVertical: 12,
                marginBottom: 16,
                opacity: isValid ? 1 : 0.5,
              }}
            >
              {loading ? (
                <ActivityIndicator color={colors.textPrimary} />
              ) : (
                <Text
                  style={{
                    color: colors.textPrimary,
                    fontSize: 13,
                    fontWeight: '500',
                    textAlign: 'center',
                  }}
                >
                  Create account
                </Text>
              )}
            </TouchableOpacity>

            {/* Divider */}
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                marginBottom: 16,
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

            {/* Google Sign Up Button */}
            <TouchableOpacity
              onPress={onGooglePress}
              style={{
                backgroundColor: 'transparent',
                borderWidth: 1,
                borderColor: colors.border,
                borderRadius: 10,
                paddingVertical: 10,
                marginBottom: 18,
              }}
            >
              <Text
                style={{
                  color: colors.textPrimary,
                  fontSize: 12,
                  fontWeight: '500',
                  textAlign: 'center',
                }}
              >
                Continue with Google
              </Text>
            </TouchableOpacity>

            {/* Sign In Link */}
            <View style={{ flexDirection: 'row', justifyContent: 'center' }}>
              <Text
                style={{
                  fontSize: 11,
                  color: colors.textMuted,
                  textAlign: 'center',
                }}
              >
                Already a creator?{' '}
              </Text>
              <TouchableOpacity onPress={onSignInPress}>
                <Text
                  style={{
                    fontSize: 11,
                    color: colors.primary,
                    fontWeight: '500',
                  }}
                >
                  Log in
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
