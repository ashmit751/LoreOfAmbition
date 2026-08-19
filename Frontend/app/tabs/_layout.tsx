import { Tabs } from "expo-router";
import { Image, View } from "react-native";
import { NAV_ICONS } from "@/constants/icons";
import { cn } from "@/lib/utils";

function TabIcon({ focused, icon }: TabIconProps) {
  return (
    <View className={cn(
      'items-center justify-center',
      focused && 'opacity-100',
      !focused && 'opacity-40'
    )}>
      <Image
        source={icon}
        className="w-6 h-6"
        resizeMode="contain"
      />
    </View>
  );
}

const TabLayout = () => (
  <Tabs screenOptions={{ headerShown: false }}>
    <Tabs.Screen
      name="index"
      options={{
        title: 'Home',
        tabBarIcon: ({ focused }) => (
          <TabIcon focused={focused} icon={NAV_ICONS.home} />
        ),
      }}
    />
    <Tabs.Screen
      name="discover"
      options={{
        title: 'Discover',
        tabBarIcon: ({ focused }) => (
          <TabIcon focused={focused} icon={NAV_ICONS.discover} />
        ),
      }}
    />
    <Tabs.Screen
      name="create"
      options={{
        title: 'Create',
        tabBarIcon: ({ focused }) => (
          <TabIcon focused={focused} icon={NAV_ICONS.create} />
        ),
      }}
    />
    <Tabs.Screen
      name="profile"
      options={{
        title: 'Profile',
        tabBarIcon: ({ focused }) => (
          <TabIcon focused={focused} icon={NAV_ICONS.profile} />
        ),
      }}
    />
    <Tabs.Screen
      name="challenges"
      options={{
        title: 'Growth Board',
        tabBarIcon: ({ focused }) => (
          <TabIcon focused={focused} icon={NAV_ICONS.challenges} />
        ),
      }}
    />
  </Tabs>
);

export default TabLayout;