import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, ScrollView, Alert } from 'react-native';
import globalStyles from '../../shared/globalStyles';
import SCREENS from '../index';

const ResetPasswordScreen = ({ navigation }) => {
  const [formData, setFormData] = useState({
    password: '',
    confirmPassword: '',
  });
  const [touched, setTouched] = useState({
    password: false,
    confirmPassword: false,
  });
  const [errors, setErrors] = useState({});

  const validateField = (name, value) => {
    if (!value) {
      return `${name.charAt(0).toUpperCase() + name.slice(1)} is required`;
    }
    if (name === 'password' && value.length < 6) {
      return 'Password must be at least 6 characters';
    }
    if (name === 'confirmPassword' && value !== formData.password) {
      return 'Passwords do not match';
    }
    return '';
  };

  const validateForm = () => {
    const newErrors = {};
    Object.keys(formData).forEach((key) => {
      const error = validateField(key, formData[key]);
      if (error) {
        newErrors[key] = error;
      }
    });
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = () => {
    setTouched({ password: true, confirmPassword: true });
    if (validateForm()) {
      Alert.alert('Password Reset Successful', 'You can now log in with your new password', [{ text: 'OK' }]);
      navigation.navigate(SCREENS.LOGIN);
    }
  };

  const handleInputChange = (name, text) => {
    setFormData((prev) => ({ ...prev, [name]: text }));
    setErrors((prev) => ({ ...prev, [name]: '' }));
  };

  return (
      <ScrollView contentContainerStyle={globalStyles.container}>
        <View style={globalStyles.top}>
          <Text style={globalStyles.title}>Reset Password</Text>
          <Text style={globalStyles.paragraph}>Gain control over your account again.</Text>
        </View>
        <View style={globalStyles.form}>
          <View style={globalStyles.inputContainer}>
            <TextInput
              style={[
                globalStyles.input,
                touched.password && errors.password && globalStyles.errorInput,
              ]}
              placeholder="New Password"
              secureTextEntry
              value={formData.password}
              onChangeText={(text) => handleInputChange('password', text)}
              onBlur={() => setTouched((prev) => ({ ...prev, password: true }))}
            />
            {touched.password && errors.password && <Text style={globalStyles.errorText}>{errors.password}</Text>}
          </View>
          <View style={globalStyles.inputContainer}>
            <TextInput
              style={[
                globalStyles.input,
                touched.confirmPassword && errors.confirmPassword && globalStyles.errorInput,
              ]}
              placeholder="Confirm Password"
              secureTextEntry
              value={formData.confirmPassword}
              onChangeText={(text) => handleInputChange('confirmPassword', text)}
              onBlur={() => setTouched((prev) => ({ ...prev, confirmPassword: true }))}
            />
            {touched.confirmPassword && errors.confirmPassword && (
              <Text style={globalStyles.errorText}>{errors.confirmPassword}</Text>
            )}
          </View>
          <TouchableOpacity style={globalStyles.submitButton} onPress={handleSubmit}>
            <Text style={globalStyles.submitButtonText}>Reset Password</Text>
          </TouchableOpacity>
        </View>

        <View style={globalStyles.loginLinkContainer}>
          <Text style={globalStyles.loginText}>
            Rest assured, you're safe with us.
          </Text>
          <Text style={globalStyles.loginText}>
            We won't share your password with anyone.
          </Text>
        </View>
      </ScrollView>
  );
};
export default ResetPasswordScreen;