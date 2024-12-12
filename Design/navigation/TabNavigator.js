import { View, Text } from 'react-native'
import React from 'react'

import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';

const Tab = createMaterialTopTabNavigator();

const TabNavigator = () => {
  return (
    <View>
      <Text>TabNavigator</Text>
    </View>
  )
}

export default TabNavigator