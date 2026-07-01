import {Tabs} from "expo-router";
import "@/global.css"

const TabLayout = () => (
  <Tabs screenOptions={{headerShown: false}} className="bg-background">
  <Tabs.Screen name='index' options={{title: 'Home'}} />
  <Tabs.Screen name='Discover' options={{title: 'Discover'}} />
  <Tabs.Screen name='Create' options={{title: 'Create'}} />
  <Tabs.Screen name='Profile' options={{title: 'Profile'}} />
  <Tabs.Screen name='Challenges' options={{title: 'Challenges'}} />
  </Tabs>
)
export default TabLayout;