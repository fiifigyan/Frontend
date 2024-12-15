import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import SCREENS from '../screens/index';

const ICONS = {
  HAMBURGER: require('../assets/images/hamburger.png'),
  NOTIFICATION: require('../assets/images/notification.png')
};

const Header = ({ title, onNotificationPress }) => {
  const navigation = useNavigation();
  
  return (
    <View style={styles.header}>
       {/* Hamburger Icon */}
       <TouchableOpacity onPress={() => navigation.toggleDrawer()}>
        <Image source={ICONS.HAMBURGER} style={styles.icon} />
      </TouchableOpacity>

      {/* Title */}
      <Text style={styles.title}>{title}</Text>

      {/* Notification Icon */}
      <TouchableOpacity onPress={() => navigation.navigate(SCREENS.NOTIFICATION)} >
        <Image source={ICONS.NOTIFICATION} style={styles.icon} />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    backgroundColor: '#007bff',
    height: 60,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 15,
  },
  icon: {
    width: 24,
    height: 24,
    tintColor: '#fff',
  },
  headerTitle: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default Header;
