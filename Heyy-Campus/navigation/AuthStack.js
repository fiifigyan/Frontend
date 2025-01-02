import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import LoginScreen from '../screens/auth/LoginScreen';
import SignupScreen from '../screens/auth/SignupScreen';
import ForgotPasswordScreen from '../screens/auth/ForgotPasswordScreen'
import ResetPasswordScreen from '../screens/auth/ResetPasswordScreen'
import OnboardingScreen from '../screens/tabs/OnboardingScreen'

import SCREENS from '../screens/index';

const Stack = createNativeStackNavigator();

const AuthStack = () => {
  return (
    <Stack.Navigator
      initialRouteName={SCREENS.ONBOARD}
      screenOptions={{ headerShown: false }}
    >
    <Stack.Screen
      name={SCREENS.ONBOARD}
      component={OnboardingScreen}
      options={{ headerShown: false }}
    />
    <Stack.Screen
      name={SCREENS.SIGNUP}
      component={SignupScreen}
      options={{ headerShown: false }}
    />
    <Stack.Screen
      name={SCREENS.LOGIN}
      component={LoginScreen}
      options={{ headerShown: false }}
    />
    <Stack.Screen
      name={SCREENS.FORGOTPASSWORD}
      component={ForgotPasswordScreen}
      options={{ headerShown: false }}
    />
    <Stack.Screen
      name={SCREENS.RESETPASSWORD}
      component={ResetPasswordScreen}
      options={{ headerShown: false }}
    />
    </Stack.Navigator>
  )
}

export default AuthStack