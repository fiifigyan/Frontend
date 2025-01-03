import React, { useContext } from 'react';
import { StatusBar, SafeAreaView, StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import AuthStack from './navigation/AuthStack';
import { AuthProvider, AuthContext } from './context/AuthContext';
import DrawerNavigator from './navigation/StackNavigator';
import OnboardingScreen from './screens/tabs/OnboardingScreen';

function App() {
  const { isLoading, userInfo } = useContext(AuthContext);

  return (
    <AuthProvider>
      <SafeAreaView style={styles.safeArea}>
        <StatusBar barStyle="light-content" backgroundColor="#007AFF" />
        <NavigationContainer>
          {
            isLoading ? (
              <OnboardingScreen />
            ) : userInfo ? (
              <DrawerNavigator />
            ) : (
              <AuthStack />
            )
          }
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