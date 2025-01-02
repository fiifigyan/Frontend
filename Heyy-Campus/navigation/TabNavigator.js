import React from 'react'
import { Image } from 'react-native'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import HomeScreen from '../screens/tabs/HomeScreen';
import CalendarScreen from '../screens/tabs/CalendarScreen';
import ProfileScreen from '../screens/tabs/ProfileScreen';
import NotificationScreen from '../screens/tabs/NotificationScreen';

import SCREENS from '../screens/index';
import ICONS from '../assets/index';


const Tab = createBottomTabNavigator();
const TabNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={{ 
        headerShown: true
      }}
    >
      <Tab.Screen
        name={SCREENS.HOME}
        component={HomeScreen}
        options={{
          title: 'Home',
          tabBarIcon: ({ focused }) => (
            <Image
              source={ICONS.HOME}
              style={{
                height: 30,
                width: 30,
                tintColor: focused ? '#007AFF' : '#000',
              }}
            />
          ),
        }}
      />
      <Tab.Screen
        name={SCREENS.CALENDAR}
        component={CalendarScreen}
        options={{
          title: 'Calendar',
          tabBarIcon: ({ focused }) => (
            <Image
              source={ICONS.CALENDER}
              style={{
                height: 30,
                width: 30,
                tintColor: focused ? '#007AFF' : '#000',
              }}
            />
          ),
        }}
      />
      <Tab.Screen
        name={SCREENS.PROFILE}
        component={ProfileScreen}
        options={{
          title: 'Profile',
          tabBarIcon: ({ focused }) => (
            <Image
              source={ICONS.PROFILE}
              style={{
                height: 30,
                width: 30,
                tintColor: focused ? '#007AFF' : '#000',
              }}
            />
          ),
        }}
      />
      <Tab.Screen
        name={SCREENS.NOTIFICATION}
        component={NotificationScreen}
        options={{
          title: 'Notifications',
          tabBarIcon: ({ focused }) => (
            <Image
              source={ICONS.NOTIFICATION}
              style={{
                height: 30,
                width: 30,
                tintColor: focused ? '#007AFF' : '#000',
              }}
            />
          ),
        }}
      />
    </Tab.Navigator>
  );
}

export default TabNavigator;