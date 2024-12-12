import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, ScrollView, Alert } from 'react-native';
import globalStyles from '../../shared/globalStyles';
import SCREENS from '../index';

const ForgotPasswordScreen = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [touched, setTouched] = useState(false);
  const [error, setError] = useState('');

  const validateEmail = () => {
    if (!email) {
      return 'Email is required';
    }
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(email)) {
      return 'Invalid email format';
    }
    return '';
  };

  const handleSubmit = () => {
    setTouched(true);
    const emailError = validateEmail();
    if (emailError) {
      setError(emailError);
    } else {
      Alert.alert('Password Reset', 'Check your email for reset instructions', [{ text: 'OK' }]);
      console.log('Password reset email sent to:', email);
      navigation.navigate(SCREENS.RESETPASSWORD);
    }
  };

  return (
      <ScrollView contentContainerStyle={globalStyles.container}>
        <View style={globalStyles.top}>
          <Text style={globalStyles.title}>Forgot Password</Text>
          <Text style={globalStyles.paragraph}>Enter your email to reset your password.</Text>
        </View>
        <View style={globalStyles.form}>
          <View style={globalStyles.inputContainer}>
            <TextInput
              style={[
                globalStyles.input,
                touched && error && globalStyles.errorInput,
              ]}
              placeholder="Enter your email"
              value={email}
              keyboardType="email-address"
              onChangeText={(text) => {
                setEmail(text);
                setTouched(false);
                setError('');
              }}
              onBlur={() => setTouched(true)}
            />
            {touched && error && <Text style={globalStyles.errorText}>{error}</Text>}
          </View>
          <TouchableOpacity style={globalStyles.submitButton} onPress={handleSubmit}>
            <Text style={globalStyles.submitButtonText}>Send</Text>
          </TouchableOpacity>
        </View>

        <View style={globalStyles.loginLinkContainer}>
          <Text style={globalStyles.loginText}>
            Don't Panic, Okay?
          </Text>
          <Text style={globalStyles.loginText}>
            You'll get you account back in no time.
          </Text>
        </View>

      </ScrollView>
  );
};
export default ForgotPasswordScreen;