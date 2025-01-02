import React from 'react';
import { View, StyleSheet } from 'react-native';
import { DrawerContentScrollView, DrawerItemList, createDrawerNavigator,
} from '@react-navigation/drawer';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Ionicons';
import { Text, Image, TouchableOpacity, SafeAreaView } from 'react-native';

import SCREENS from '../screens/index';
import ICONS from '../assets/index';

const CustomDrawer = (props) => {
  const navigation = useNavigation();

  return (
    <SafeAreaView style={styles.container}>
      {/* Drawer Items */}
      <DrawerContentScrollView {...props}>
        <View style={styles.drawerHeader}>
          <Image
            source={ICONS.LOGO} // Replace with your logo
            style={styles.logo}
            resizeMode="cover"
          />
          <Text style={styles.appName}>Heyy Campus</Text>
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
        <DrawerItemList {...props} />
      </DrawerContentScrollView>

      {/* Drawer Footer */}
      <View style={styles.drawerFooter}>
        <TouchableOpacity 
          style={styles.footerItem}
          onPress={() => {/* Implement settings navigation */}}
        >
          <Image
              source={ICONS.SETTINGS}
              style={{
                width: 22,
                height: 22
              }}
            />
          <Text style={styles.footerItemText}>Settings</Text>
        </TouchableOpacity>
        
        <TouchableOpacity 
          style={styles.footerItem}
          onPress={() => {/* Implement logout functionality */}}
        >
          <Image
              source={ICONS.LOGOUT}
              style={{
                width: 22,
                height: 22
              }}
            />
          <Text style={styles.footerItemText}>Logout</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
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

export default CustomDrawer;