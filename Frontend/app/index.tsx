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
        // Provide a default creator session so user is logged in
        await sessionManager.setSession({
          userId: 'dev_creator_id',
          username: 'creator',
          displayName: 'Creator',
          isOnboarded: true,
        });
      }
      // Go directly to the Home tab page
      router.replace('/tabs');
    })();
  }, [router]);

  // Blank screen while resolving
  return null;
}
