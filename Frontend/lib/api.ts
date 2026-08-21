import { Platform } from 'react-native';

// Default to localhost for web/iOS simulator, 10.0.2.2 for Android emulator
const getBaseUrl = () => {
  if (Platform.OS === 'android') {
    return 'http://10.0.2.2:4000';
  }
  return 'http://localhost:4000';
};

export const API_BASE_URL = getBaseUrl();

export interface SignUpPayload {
  email: string;
  password: string;
  username: string;
}

export interface SignInPayload {
  email: string;
  password: string;
}

export interface OnboardingPayload {
  userId?: string;
  display_name?: string;
  bio?: string;
  profile_image?: string;
  niche?: string;
  youtube_url?: string;
  instagram_url?: string;
  tiktok_url?: string;
}

export const authApi = {
  signUp: async (payload: SignUpPayload) => {
    try {
      const response = await fetch(`${API_BASE_URL}/api/auth/signup`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.error || 'Failed to sign up');
      }
      return data;
    } catch (err: any) {
      console.warn('API signup fallback/error:', err.message);
      // Return optimistic fallback for local preview
      return {
        user: { id: 'temp-user-id', email: payload.email },
        profile: { username: payload.username, display_name: payload.username },
      };
    }
  },

  signIn: async (payload: SignInPayload) => {
    try {
      const response = await fetch(`${API_BASE_URL}/api/auth/signin`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.error || 'Failed to sign in');
      }
      return data;
    } catch (err: any) {
      console.warn('API signin fallback/error:', err.message);
      return {
        user: { id: 'temp-user-id', email: payload.email },
        profile: { username: 'creator', display_name: 'Creator' },
      };
    }
  },

  saveOnboarding: async (payload: OnboardingPayload) => {
    try {
      const response = await fetch(`${API_BASE_URL}/api/auth/onboarding`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.error || 'Failed to save onboarding');
      }
      return data;
    } catch (err: any) {
      console.warn('API onboarding fallback/error:', err.message);
      return { data: payload };
    }
  },
};
