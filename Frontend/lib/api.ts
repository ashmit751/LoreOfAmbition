import { Platform } from 'react-native';
import Constants from 'expo-constants';
import { sessionManager } from './session';

// ─── Machine LAN IP ─────────────────────────────────────────────────────────
// Your local network IP address
const LOCAL_MACHINE_IP = '192.168.1.5';

export const getBaseUrl = (): string => {
  // 1. Try to dynamically extract host machine IP from Expo bundler
  const hostUri =
    Constants.expoConfig?.hostUri ||
    (Constants.manifest as any)?.debuggerHost ||
    (Constants.manifest2 as any)?.extra?.expoClient?.hostUri;

  if (hostUri) {
    const host = hostUri.split(':')[0];
    if (host && host !== 'localhost' && host !== '127.0.0.1') {
      return `http://${host}:4000`;
    }
  }

  // 2. Android emulator (when not on physical device)
  if (Platform.OS === 'android') {
    return `http://${LOCAL_MACHINE_IP}:4000`;
  }

  // 3. iOS device / Simulator / Web
  if (Platform.OS === 'ios') {
    return `http://${LOCAL_MACHINE_IP}:4000`;
  }

  // 4. Web browser running on the same computer
  return 'http://localhost:4000';
};

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
  const baseUrl = getBaseUrl();
  const url = `${baseUrl}${path}`;
  console.log(`[Lore API] POST -> ${url}`);

  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    });

    const responseText = await response.text();
    console.log(`[Lore API] Status: ${response.status} from ${url}`);

    let data: any;
    try {
      data = JSON.parse(responseText);
    } catch {
      throw new Error(
        `Backend at ${url} returned invalid response (Status ${response.status}). Make sure the backend is running.\n\nRaw response: ${responseText.slice(0, 120)}`,
      );
    }

    if (!response.ok) {
      throw new Error(data.error || `Server error (${response.status})`);
    }

    return data as T;
  } catch (err: any) {
    console.error(`[Lore API Error] ${url}:`, err.message);
    if (err.message?.includes('Network request failed') || err.message?.includes('Failed to fetch')) {
      throw new Error(
        `Cannot reach backend server at ${url}.\n\nPlease ensure your backend is running ('cd Backend && npm start') and your phone & PC are on the same Wi-Fi.`,
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
