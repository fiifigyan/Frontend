import React, { useState, useContext } from 'react';
import { View, Text, TextInput, TouchableOpacity, ScrollView, Alert, ActivityIndicator } from 'react-native';
import globalStyles from '../../shared/globalStyles';
import SCREENS from '../../screens/index';
import { AuthContext } from '../../context/AuthContext';

const SignupScreen = ({ navigation }) => {
  const [userInfo, setUserInfo] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: ''
  });

  const [touched, setTouched] = useState({
    firstName: false,
    lastName: false,
    email: false,
    password: false,
    confirmPassword: false
  });

  const [errors, setErrors] = useState({});
  const { register, isLoading, error } = useContext(AuthContext);

  const validationRules = {
    firstName: {
      required: true,
      minLength: 2,
      errorMessage: 'First name must be at least 2 characters'
    },
    lastName: {
      required: true,
      minLength: 2,
      errorMessage: 'Last name must be at least 2 characters'
    },
    email: {
      required: true,
      pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
      errorMessage: 'Invalid email format'
    },
    password: {
      required: true,
      pattern: /^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
      errorMessage: 'Password must be at least 8 characters, with at least one capital letter, one symbol, and one number'
    },
    confirmPassword: {
      required: true,
      match: 'password',
      errorMessage: 'Passwords do not match'
    }
  };

  const validateField = (name, value) => {
    const rule = validationRules[name];
    
    if (rule.required && !value) {
      return `${name.charAt(0).toUpperCase() + name.slice(1)} is required`;
    }

    if (!rule.required && !value) {
      return '';
    }

    if (rule.minLength && value.length < rule.minLength) {
      return rule.errorMessage;
    }

    if (rule.pattern && !rule.pattern.test(value)) {
      return rule.errorMessage;
    }

    if (rule.match && value !== userInfo[rule.match]) {
      return rule.errorMessage;
    }

    return '';
  };

  const validateForm = () => {
    const newErrors = {};
    
    Object.keys(userInfo).forEach(key => {
      const error = validateField(key, userInfo[key]);
      if (error) {
        newErrors[key] = error;
      }
    });

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async () => {
    setTouched({
      firstName: true,
      lastName: true,
      email: true,
      password: true,
      confirmPassword: true
    });
  
    if (validateForm()) {
      try {
        const { firstName, lastName, email, password } = userInfo;
        await register(firstName, lastName, email, password);
        
        Alert.alert(
          'Sign Up Successful', 
          `Welcome, ${firstName} ${lastName}!`, 
          [{ text: 'OK' }]
        );
      } catch (e) {
        console.error('Signup submission error:', e);
        Alert.alert(
          'Sign Up Failed', 
          error || e.message || 'Unable to create account. Please try again.'
        );
      }
    }
  };

  const handleInputChange = (name, text) => {
    setUserInfo(prev => ({...prev, [name]: text}));
    
    if (text.length > 0) {
      setTouched(prev => ({...prev, [name]: false}));
    }
  };

  const renderInputField = (name, placeholder, secureTextEntry = false) => {
    return (
      <View style={globalStyles.inputContainer}>
        <TextInput
          style={[
            globalStyles.input, 
            touched[name] && errors[name] && globalStyles.errorInput
          ]}
          placeholder={placeholder}
          value={userInfo[name]}
          secureTextEntry={secureTextEntry}
          keyboardType={name === 'email' ? 'email-address' : 'default'}
          autoCapitalize={name === 'email' ? 'none' : 'words'}
          onChangeText={(text) => handleInputChange(name, text)}
          onFocus={() => setTouched(prev => ({...prev, [name]: true}))}
          onBlur={() => setTouched(prev => ({...prev, [name]: true}))}
        />
        {touched[name] && errors[name] && (
          <Text style={globalStyles.errorText}>{errors[name]}</Text>
        )}
      </View>
    );
  };

  return (
    <ScrollView contentContainerStyle={globalStyles.container}>
      <View style={globalStyles.top}>
        <Text style={globalStyles.title}>New Account</Text>
        <Text style={globalStyles.paragraph}>Sign Up and get started</Text>
      </View>
      <View style={globalStyles.form}>
        {renderInputField('firstName', 'First Name')}
        {renderInputField('lastName', 'Last Name')}
        {renderInputField('email', 'Email')}
        {renderInputField('password', 'Password', true)}
        {renderInputField('confirmPassword', 'Confirm Password', true)}

        {isLoading ? (
          <ActivityIndicator size="large" color="#007AFF" />
        ) : (
          <TouchableOpacity 
            style={globalStyles.submitButton} 
            onPress={handleSubmit}
          >
            <Text style={globalStyles.submitButtonText}>Sign Up</Text>
          </TouchableOpacity>
        )}
      </View>

      <View style={globalStyles.loginLinkContainer}>
        <Text style={globalStyles.loginText}>
          Have an account already? 
          <Text 
            style={globalStyles.loginLink}
            onPress={() => navigation.navigate(SCREENS.LOGIN)}
          >
            {' '}Login
          </Text>
        </Text>
      </View>
    </ScrollView>
  );
};
export default SignupScreen;