import { Tabs } from 'expo-router';
import { StyleSheet } from 'react-native';
import { Activity, ChartBar as BarChart, Chrome as Home, User, Scroll } from 'lucide-react-native';
import { BlurView } from 'expo-blur';

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarStyle: styles.tabBar,
        tabBarActiveTintColor: '#FF4E4E',
        tabBarInactiveTintColor: '#5A5A5A',
        tabBarBackground: () => (
          <BlurView 
            intensity={20} 
            tint="dark" 
            style={StyleSheet.absoluteFill} 
          />
        ),
        tabBarLabelStyle: styles.tabBarLabel,
      }}>
      <Tabs.Screen
        name="index"
        options={{
          title: 'HOME',
          tabBarIcon: ({ color, size }) => (
            <Home color={color} size={size} />
          ),
        }}
      />
      <Tabs.Screen
        name="acts"
        options={{
          title: 'ACTS',
          tabBarIcon: ({ color, size }) => (
            <Scroll color={color} size={size} />
          ),
        }}
      />
      <Tabs.Screen
        name="habits"
        options={{
          title: 'HABITS',
          tabBarIcon: ({ color, size }) => (
            <Activity color={color} size={size} />
          ),
        }}
      />
      <Tabs.Screen
        name="stats"
        options={{
          title: 'STATS',
          tabBarIcon: ({ color, size }) => (
            <BarChart color={color} size={size} />
          ),
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: 'PROFILE',
          tabBarIcon: ({ color, size }) => (
            <User color={color} size={size} />
          ),
        }}
      />
    </Tabs>
  );
}

const styles = StyleSheet.create({
  tabBar: {
    backgroundColor: 'rgba(15, 15, 15, 0.8)',
    borderTopColor: '#5A5A5A',
    borderTopWidth: 1,
    height: 60,
  },
  tabBarLabel: {
    fontFamily: 'Rajdhani-Medium',
    fontSize: 10,
    letterSpacing: 1,
  },
});