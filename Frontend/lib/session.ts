import AsyncStorage from '@react-native-async-storage/async-storage';

const SESSION_KEY = 'lore_creator_session';

export interface CreatorSession {
  userId: string;
  email?: string;
  username?: string;
  displayName?: string;
  avatar?: string;
  accessToken?: string;
  refreshToken?: string;
  isOnboarded: boolean;
}

export const sessionManager = {
  getSession: async (): Promise<CreatorSession | null> => {
    try {
      const stored = await AsyncStorage.getItem(SESSION_KEY);
      if (stored) {
        return JSON.parse(stored) as CreatorSession;
      }
      return null;
    } catch {
      return null;
    }
  },

  setSession: async (session: Partial<CreatorSession>): Promise<CreatorSession> => {
    const current = await sessionManager.getSession();
    const updated: CreatorSession = {
      userId: current?.userId ?? 'unknown',
      isOnboarded: current?.isOnboarded ?? false,
      ...current,
      ...session,
    };
    await AsyncStorage.setItem(SESSION_KEY, JSON.stringify(updated));
    return updated;
  },

  completeOnboarding: async (): Promise<CreatorSession> => {
    return sessionManager.setSession({ isOnboarded: true });
  },

  clearSession: async (): Promise<void> => {
    await AsyncStorage.removeItem(SESSION_KEY);
  },
};
