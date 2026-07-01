import {Tabs} from "expo-router";
import "@/global.css"

const TabLayout = () => (
  <Tabs screenOptions={{headerShown: false}} className="bg-background">
    <Tabs.Screen name='index' options={{title: 'Home'}} />
  </Tabs>
)
export default TabLayout;