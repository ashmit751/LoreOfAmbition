import { Redirect } from 'expo-router';

export default function Index() {
  // TODO: check Supabase session — redirect to /tabs if already signed in
  return <Redirect href="/auth/sign-in" />;
}
