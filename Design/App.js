import React from'react';
import { SafeAreaView } from 'react-native';
import StackNavigation from './navigation/navigationStack';
import { NavigationContainer } from '@react-navigation/native';
import { StatusBar } from 'expo-status-bar';
const App = () => {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <StatusBar style="light" />
      <NavigationContainer>
        <StackNavigation />
    </NavigationContainer>
    </SafeAreaView>
  );
}
export default App;