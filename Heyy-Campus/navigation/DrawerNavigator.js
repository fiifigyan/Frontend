import React from 'react';
import {
  View,
  StyleSheet,
} from 'react-native';
import {
  DrawerContentScrollView,
  DrawerItemList,
  createDrawerNavigator,
} from '@react-navigation/drawer';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Ionicons';
import {
  Text,
  Image,
  TouchableOpacity,
  SafeAreaView,
} from 'react-native';

import TabNavigator from './TabNavigator';
import ProfileScreen from '../screens/tabs/ProfileScreen';
import Calendar from '../screens/tabs/CalenderScreen';
import Header from '../components/Header';
import ICONS from '../assets/index';

const CustomDrawer = (props) => {
  const navigation = useNavigation();

  return (
    <SafeAreaView style={styles.container}>
      {/* Drawer Header */}
      <View style={styles.drawerHeader}>
        <Image
          source={ICONS.LOGO} // Replace with your logo
          style={styles.logo}
          resizeMode="contain"
        />
        <Text style={styles.appName}>SCHOOL IN</Text>
      </View>

      {/* User Profile Section */}
      <View style={styles.profileSection}>
        <Image
          source={ICONS.AVATAR} // Replace with user avatar
          style={styles.avatar}
        />
        <View>
          <Text style={styles.userName}>John Doe</Text>
          <Text style={styles.userRole}>Student</Text>
        </View>
        <TouchableOpacity 
          style={styles.editProfileButton}
          onPress={() => navigation.navigate('Profile')}
        >
          <Icon name="create-outline" size={20} color="#007AFF" />
        </TouchableOpacity>
      </View>

      {/* Drawer Items */}
      <DrawerContentScrollView {...props}>
        <DrawerItemList {...props} />
      </DrawerContentScrollView>

      {/* Drawer Footer */}
      <View style={styles.drawerFooter}>
        <TouchableOpacity 
          style={styles.footerItem}
          onPress={() => {/* Implement settings navigation */}}
        >
          <Icon name="settings-outline" size={20} color="#000" />
          <Text style={styles.footerItemText}>Settings</Text>
        </TouchableOpacity>
        
        <TouchableOpacity 
          style={styles.footerItem}
          onPress={() => {/* Implement logout functionality */}}
        >
          <Icon name="log-out-outline" size={20} color="#FF3B30" />
          <Text style={styles.footerItemText}>Logout</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const Drawer = createDrawerNavigator();
const DrawerNavigator = ({ navigation }) => {
  return (
    <View style={styles.container}>
      {/* Add the Custom Header */}
      <Header
        title="SCHOOL IN"
        onMenuPress={() => navigation.toggleDrawer()}
        onNotificationPress={() => console.log('Notification Pressed')}
      />

      <Drawer.Navigator
        drawerContent={(props) => <CustomDrawer {...props} />} // Added drawerContent prop
        screenOptions={{
          headerShown: false,
          drawerStyle: {
            backgroundColor: '#f5f5f5',
            width: 250,
          },
          drawerActiveTintColor: '#007AFF',
          drawerInactiveTintColor: '#000',
          drawerLabelStyle: { fontSize: 16 },
        }}
      >
        <Drawer.Screen name="Home" component={TabNavigator} />
        <Drawer.Screen name="Profile" component={ProfileScreen} />
        <Drawer.Screen name="Calendar" component={Calendar} />
      </Drawer.Navigator>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  drawerHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#E5E5E5',
  },
  logo: {
    width: 40,
    height: 40,
    marginRight: 10,
  },
  appName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#007AFF',
  },
  profileSection: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#E5E5E5',
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 15,
  },
  userName: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  userRole: {
    fontSize: 14,
    color: '#666',
  },
  editProfileButton: {
    marginLeft: 'auto',
  },
  drawerFooter: {
    borderTopWidth: 1,
    borderTopColor: '#E5E5E5',
    padding: 20,
  },
  footerItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
  },
  footerItemText: {
    marginLeft: 10,
    fontSize: 16,
  },
});

export default DrawerNavigator;