import { Redirect } from 'expo-router';

export default function Index() {
  // Entry: new users go through sign-up → onboarding → home
  return <Redirect href="/auth/sign-up" />;
}
