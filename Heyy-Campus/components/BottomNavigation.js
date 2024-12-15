import React from 'react';
import { View, TouchableOpacity, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

const BottomNavigation = () => {
  return (
    <View style={styles.bottomNavigation}>
      <TouchableOpacity>
        <Icon name="home-outline" size={24} color="#fff" />
      </TouchableOpacity>
      <TouchableOpacity>
        <Icon name="calendar-outline" size={24} color="#fff" />
      </TouchableOpacity>
      <TouchableOpacity>
        <Icon name="person-outline" size={24} color="#fff" />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  bottomNavigation: {
    width: '95%',
    alignSelf: 'center',
    margin:5,
    backgroundColor: '#007bff',
    height: 60,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    borderRadius: 30,
  },
});

export default BottomNavigation;
