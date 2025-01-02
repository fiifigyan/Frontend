import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { createContext, useEffect, useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import SCREENS from '../screens/index';
import {BASE_URL} from '../config'

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [userInfo, setUserInfo] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const register = async (firstName, lastName, email, password) => {
    setIsLoading(true);
    setError(null);

    try {
      console.log('Signup payload:', { firstName, lastName, email, password });
      const response = await fetch(`${BASE_URL}/register`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ firstName, lastName, email, password })
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Signup failed');
      }

      const userInfo = await response.json();
      console.log('Signup response:', userInfo);
      await AsyncStorage.setItem('userInfo', JSON.stringify(userInfo));
      setUserInfo(userInfo);
      setIsLoading(false);

      return userInfo;
    } catch (e) {
      console.error('Signup error:', e.message);
      setIsLoading(false);
      setError(e.message);
      throw e;
    }
  };

  const login = async (email, password) => {
    setIsLoading(true);
    setError(null);

    try {
      console.log('Login payload:', { email, password });
      const response = await fetch(`${BASE_URL}/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email, password })
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Login failed');
      }

      const userInfo = await response.json();
      await AsyncStorage.setItem('userInfo', JSON.stringify(userInfo));
      setUserInfo(userInfo);
      setIsLoading(false);

      return userInfo;
    } catch (e) {
      setIsLoading(false);
      setError(e.message);
      throw e;
    }
  };

  const logout = async () => {
    setIsLoading(true);
    setError(null);

    try {
      if (userInfo?.access_token) {
        const response = await fetch(`${BASE_URL}/logout`, {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${userInfo.access_token}`
          }
        });

        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.message || 'Logout failed');
        }
      }

      await AsyncStorage.removeItem('userInfo');
      setUserInfo(null);
      setIsLoading(false);
    } catch (e) {
      setIsLoading(false);
      setError(e.message);

      // Clear local storage even if logout request fails
      await AsyncStorage.removeItem('userInfo');
      setUserInfo(null);
    }
  };

  const isLoggedIn = async () => {
    try {
      const userInfoString = await AsyncStorage.getItem('userInfo');
      if (userInfoString) {
        const parsedUserInfo = JSON.parse(userInfoString);
        setUserInfo(parsedUserInfo);
      }
    } catch (e) {
      console.error('Error checking login status', e);
    }
  };

  useEffect(() => {
    isLoggedIn();
  }, []);

  return (
    <AuthContext.Provider
      value={{
        isLoading,
        userInfo,
        error,
        register,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};