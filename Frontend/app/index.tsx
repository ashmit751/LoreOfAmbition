import { Redirect } from 'expo-router';
import { Image } from 'react-native';
import { NAV_ICONS } from '@/constants/icons';

<Image 
  source={NAV_ICONS.home}
  className="w-6 h-6"
  resizeMode="contain"
/>

export default function Index() {
  return <Redirect href="/tabs" />;
}