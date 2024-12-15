import React, { useState, useContext } from 'react';
import { View, Text, TextInput, TouchableOpacity, ScrollView, Alert, ActivityIndicator } from 'react-native';
import globalStyles from '../../shared/globalStyles';
import SCREENS from '../index';
import { AuthContext } from '../../context/AuthContext';

const LoginScreen = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { login, isLoading, error } = useContext(AuthContext);

  const handleLogin = async () => {
    // Basic validation
    if (!email || !password) {
      Alert.alert('Error', 'No Credentials! Fields cannot be empty.');
      return;
    }

    try {
      // Use the login method from AuthContext
      await login(email, password);
      // Navigation will be handled by the AuthProvider in App.js
    } catch (e) {
      // Show error from the API or a generic error message
      Alert.alert('Login Failed', error || 'Unable to log in. Please try again.');
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
            autoCapitalize="none"
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
        
        {isLoading ? (
          <ActivityIndicator size="large" color="#007AFF" />
        ) : (
          <TouchableOpacity 
            style={globalStyles.submitButton} 
            onPress={handleLogin}
          >
            <Text style={globalStyles.submitButtonText}>Login</Text>
          </TouchableOpacity>
        )}
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