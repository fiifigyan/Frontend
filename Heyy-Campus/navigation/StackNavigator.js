import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Image } from 'react-native';

// Screens
import HomeScreen from '../screens/tabs/HomeScreen';
import ProfileScreen from '../screens/tabs/ProfileScreen';
import CalendarScreen from '../screens/tabs/CalendarScreen';
import CustomDrawer from '../components/CustomDrawer';
import SCREENS from '../screens/index';
import ICONS from '../assets/index';
import TabNavigator from './TabNavigator';

// Create the navigators
const Drawer = createDrawerNavigator();
const Stack = createNativeStackNavigator();

// Stack Navigator Component
export const MainStack = () => {
  return (
    <Stack.Navigator
    screenOptions={{
      headerShown: false,
      headerStyle: {
        backgroundColor: '#0074FF',
      },
      headerTintColor: '#fff',
      headerTitleStyle: {
        fontWeight: 'bold',
      },
    }}
    >
      <Stack.Screen
        name={SCREENS.HOME}
        component={HomeScreen}
        options={{
          title: 'Home',
        }}
      />
      <Stack.Screen
        name={SCREENS.CALENDAR}
        component={CalendarScreen}
        options={{
          title: 'Calendar',
        }}
      />
      <Stack.Screen
        name={SCREENS.PROFILE}
        component={ProfileScreen}
        options={{
          title: 'Profile',
        }}
      />
      <Stack.Screen
        name={SCREENS.NOTIFICATION}
        component={NotificationScreen}
        options={{
          title: 'Notification',
        }}
      />
      <Stack.Screen
        name={SCREENS.SETTINGS}
        component={SettingsScreen}
        options={{
          title: 'Settings',
        }}
      />
    </Stack.Navigator>
  );
};

// Main Drawer Navigator
const DrawerNavigator = () => {
  return (
    <Drawer.Navigator
      drawerContent={(props) => <CustomDrawer {...props} />}
      screenOptions={{
        headerShown: false,
        backgroundColor: '#0074FF',
        drawerStyle: {
          width: 300,
        },
        drawerActiveTintColor: '#007AFF',
        drawerInactiveTintColor: '#000',
        drawerLabelStyle: {
          fontSize: 16,
        },
      }}
      
    >
      <Drawer.Screen
        name="Home"
        component={TabNavigator}
        options={{
          drawerIcon: ({ focused }) => (
            <Image
              source={ICONS.HOME}
              style={{
                width: 22,
                height: 22,
                tintColor: focused ? '#007AFF' : '#000',
              }}
            />
          ),
        }}
      />
      <Drawer.Screen
        name="Profile"
        component={ProfileScreen}
        options={{
          drawerIcon: ({ focused }) => (
            <Image
              source={ICONS.PROFILE}
              style={{
                width: 22,
                height: 22,
                tintColor: focused ? '#007AFF' : '#000',
              }}
            />
          ),
        }}
      />
      <Drawer.Screen
        name="Calendar"
        component={CalendarScreen}
        options={{
          drawerIcon: ({ focused }) => (
            <Image
              source={ICONS.CALENDER}
              style={{
                width: 22,
                height: 22,
                tintColor: focused ? '#007AFF' : '#000',
              }}
            />
          ),
        }}
      />
    </Drawer.Navigator>
  );
};

export default DrawerNavigator;