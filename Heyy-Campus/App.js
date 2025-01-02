import React, { useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { StatusBar, SafeAreaView, StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import AuthStack from './navigation/AuthStack';
import { isLoading, isLoggedIn } from './context/AuthContext';
import { AuthProvider } from './context/AuthContext';
import DrawerNavigator from './navigation/StackNavigator';
import OnboardingScreen from './screens/tabs/OnboardingScreen';

function App() {
  return (
    <AuthProvider>
      <SafeAreaView style={styles.safeArea}>
        <StatusBar barStyle="light-content" backgroundColor="#007AFF" />
        <NavigationContainer>
          {
            // We haven't finished checking for the token yet, show a splash screen
            isLoading ? (
              <OnboardingScreen/>
            ) :
            isLoggedIn ? ( 
            <DrawerNavigator /> 
            ) : (
            <AuthStack />
            )
          }
          {/* <DrawerNavigator /> */}
        </NavigationContainer>
      </SafeAreaView>
    </AuthProvider>
  );
}

export default App;

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#007AFF'
  },
});