import React from 'react';
import { StatusBar, SafeAreaView, StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
// import StackNavigator from './navigation/StackNavigator';
import AuthStack from './navigation/AuthStack';

import { AuthProvider } from './context/AuthContext';

function App() {
  return (
    <AuthProvider>
      <SafeAreaView style={styles.safeArea}>
        <StatusBar barStyle="light-content" backgroundColor="#007AFF" />
        <NavigationContainer>
          <AuthStack />
          {/* StackNavigator will now be conditionally rendered based on AuthContext */}
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