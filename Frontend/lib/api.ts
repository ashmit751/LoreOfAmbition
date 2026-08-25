import { Platform } from 'react-native';
import Constants from 'expo-constants';
import { sessionManager } from './session';

// ─── Base URL ───────────────────────────────────────────────────────────────
// Automatically resolves the local machine's IP address across Web, Emulators & Physical Phones on Expo Go
const getBaseUrl = () => {
  // If running in Expo Go (physical phone / simulator on local Wi-Fi), extract host machine IP
  const hostUri = Constants.expoConfig?.hostUri;
  if (hostUri) {
    const host = hostUri.split(':')[0];
    if (host && host !== 'localhost' && host !== '127.0.0.1') {
      return `http://${host}:4000`;
    }
  }

  // Android emulator fallback
  if (Platform.OS === 'android') {
    return 'http://10.0.2.2:4000';
  }

  // Web / iOS Simulator fallback
  return 'http://localhost:4000';
};

export const API_BASE_URL = getBaseUrl();

// ─── Payload types ───────────────────────────────────────────────────────────
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

// ─── Helper ──────────────────────────────────────────────────────────────────
async function apiPost<T>(path: string, body: object): Promise<T> {
  const url = `${API_BASE_URL}${path}`;
  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
    });

    const contentType = response.headers.get('content-type') || '';
    if (!contentType.includes('application/json')) {
      const text = await response.text();
      throw new Error(
        `Server returned non-JSON response from ${url}. Ensure the backend server is running on port 4000.\nResponse snippet: ${text.slice(0, 100)}`,
      );
    }

    const data = await response.json();
    if (!response.ok) {
      throw new Error(data.error || `Request failed with status ${response.status}`);
    }
    return data as T;
  } catch (err: any) {
    if (err.message?.includes('Network request failed')) {
      throw new Error(
        `Cannot reach backend at ${url}. Make sure your backend is running ('cd Backend && npm start') on the same Wi-Fi.`,
      );
    }
    throw err;
  }
}

// ─── Auth API ─────────────────────────────────────────────────────────────────
export const authApi = {
  /**
   * Creates a Supabase auth user + a profile row, then persists the session.
   */
  signUp: async (payload: SignUpPayload) => {
    const data = await apiPost<{
      user: { id: string; email: string };
      session: { access_token: string; refresh_token: string } | null;
      profile: { username: string; display_name: string };
    }>('/api/auth/signup', payload);

    // Persist session locally so the app knows who is logged in
    await sessionManager.setSession({
      userId: data.user.id,
      email: data.user.email,
      username: data.profile?.username,
      displayName: data.profile?.display_name,
      accessToken: data.session?.access_token,
      refreshToken: data.session?.refresh_token,
      isOnboarded: false,
    });

    return data;
  },

  /**
   * Signs in via Supabase Auth + fetches the profile, then persists the session.
   */
  signIn: async (payload: SignInPayload) => {
    const data = await apiPost<{
      user: { id: string; email: string };
      session: { access_token: string; refresh_token: string };
      profile: { username: string; display_name: string } | null;
    }>('/api/auth/signin', payload);

    await sessionManager.setSession({
      userId: data.user.id,
      email: data.user.email,
      username: data.profile?.username,
      displayName: data.profile?.display_name,
      accessToken: data.session?.access_token,
      refreshToken: data.session?.refresh_token,
      isOnboarded: true, // existing users are already onboarded
    });

    return data;
  },

  /**
   * Updates the profile row during onboarding steps 1-3.
   */
  saveOnboarding: async (payload: OnboardingPayload) => {
    const session = await sessionManager.getSession();
    const userId = payload.userId ?? session?.userId;

    if (!userId) {
      throw new Error('No user session found. Please sign up first.');
    }

    return apiPost('/api/auth/onboarding', { ...payload, userId });
  },

  /**
   * Signs out by clearing local session.
   */
  signOut: async () => {
    await sessionManager.clearSession();
  },
};
