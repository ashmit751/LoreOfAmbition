import { Platform } from 'react-native';

export interface CreatorSession {
  userId: string;
  email?: string;
  username?: string;
  displayName?: string;
  avatar?: string;
  isOnboarded: boolean;
}

// In-memory fallback / simple web storage
let memorySession: CreatorSession | null = null;

export const sessionManager = {
  getSession: async (): Promise<CreatorSession | null> => {
    if (Platform.OS === 'web' && typeof window !== 'undefined' && window.localStorage) {
      const stored = window.localStorage.getItem('lore_creator_session');
      if (stored) {
        try {
          return JSON.parse(stored);
        } catch {
          return null;
        }
      }
    }
    return memorySession;
  },

  setSession: async (session: Partial<CreatorSession>) => {
    const current = (await sessionManager.getSession()) || {
      userId: 'user_' + Date.now(),
      isOnboarded: false,
    };
    const updated: CreatorSession = {
      ...current,
      ...session,
    };
    memorySession = updated;

    if (Platform.OS === 'web' && typeof window !== 'undefined' && window.localStorage) {
      window.localStorage.setItem('lore_creator_session', JSON.stringify(updated));
    }
    return updated;
  },

  completeOnboarding: async () => {
    return sessionManager.setSession({ isOnboarded: true });
  },

  clearSession: async () => {
    memorySession = null;
    if (Platform.OS === 'web' && typeof window !== 'undefined' && window.localStorage) {
      window.localStorage.removeItem('lore_creator_session');
    }
  },
};
