import { useEffect } from 'react';
import { useRouter } from 'expo-router';
import { sessionManager } from '@/lib/session';

/**
 * App entry point — decides where to send the user:
 *  1. No session         → Sign Up (first-time user)
 *  2. Session, not onboarded → Onboarding Step 1
 *  3. Session, onboarded → Home Feed (returning user)
 */
export default function Index() {
  const router = useRouter();

  useEffect(() => {
    (async () => {
      const session = await sessionManager.getSession();

      if (!session || !session.userId || session.userId === 'unknown') {
        // No valid session → show sign-up
        router.replace('/auth/sign-up');
      } else if (!session.isOnboarded) {
        // Logged in but hasn't finished onboarding
        router.replace('/auth/onboardingstep1');
      } else {
        // Fully logged in and onboarded → home feed
        router.replace('/tabs');
      }
    })();
  }, [router]);

  // Blank screen while resolving
  return null;
}
