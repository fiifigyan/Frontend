import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, ScrollView, Alert} from 'react-native';
import globalStyles from '../../shared/globalStyles';
import SCREENS from '../index';
// import TabNavigator from '../../navigation/navigationStack';

const LoginScreen = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = () => {
    const userEmail = "test@example.com";
    const userPassword = "123456";

    const isValidLogin = email === userEmail && password === userPassword;
    if (isValidLogin) {
      navigation.navigate(SCREENS.HOME);
    } else {
      Alert.alert('Error', 'Invalid login credentials');
    }
  };

  return (
      <ScrollView contentContainerStyle={globalStyles.container}>
        <View style={globalStyles.top}>
          <Text style={globalStyles.title}>Heyy, Welcome!</Text>  
          <Text style={globalStyles.paragraph}>Sign In and get started</Text>
        </View>
        
        <View style={globalStyles.form}>
          <View style={globalStyles.inputContainer}>
            <TextInput
              style={globalStyles.input}
              placeholder="Email"
              value={email}
              onChangeText={setEmail}
              keyboardType="email-address"
            />
          </View>
          <View style={globalStyles.inputContainer}>
            <TextInput
              style={globalStyles.input}
              placeholder="Password"
              value={password}
              onChangeText={setPassword}
              secureTextEntry
            />
          </View>
          <TouchableOpacity 
            style={globalStyles.submitButton} 
            onPress={handleLogin}
          >
            <Text style={globalStyles.submitButtonText}>Login</Text>
          </TouchableOpacity>
        </View>

        <View style={globalStyles.loginLinkContainer}>
          <Text 
            style={globalStyles.loginLink}
            onPress={() => navigation.navigate(SCREENS.FORGOTPASSWORD)}
          >
            {' '}Forgot Password?
          </Text>
          <Text style={globalStyles.loginText}>
            Don't have an account? 
            <Text 
              style={globalStyles.loginLink}
              onPress={() => navigation.navigate(SCREENS.SIGNUP)}
            >
              {' '}Sign Up
            </Text>
          </Text>
        </View>
      </ScrollView>
  );
};
export default LoginScreen;