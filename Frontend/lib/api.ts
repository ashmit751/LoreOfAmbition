import { Platform } from 'react-native';
import { sessionManager } from './session';

// ─── Base URL ───────────────────────────────────────────────────────────────
// Android emulator → 10.0.2.2 (host machine), everything else → localhost
const getBaseUrl = () => {
  if (Platform.OS === 'android') {
    return 'http://10.0.2.2:4000';
  }
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
  const response = await fetch(`${API_BASE_URL}${path}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  });
  const data = await response.json();
  if (!response.ok) {
    throw new Error(data.error || `Request failed (${response.status})`);
  }
  return data as T;
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
