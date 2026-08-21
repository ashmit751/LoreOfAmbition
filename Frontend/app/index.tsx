import { Redirect } from 'expo-router';

export default function Index() {
  // Temporary: direct to Onboarding Step 1 for active preview
  return <Redirect href="/auth/onboardingstep1" />;
}
