import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { createContext, useEffect, useState } from 'react';
import { BASE_URL } from '../config';
import axios from 'axios';

export const AuthContext = createContext();

// Axios interceptor to add the authorization header
axios.interceptors.request.use(
  async (config) => {
    const userInfoString = await AsyncStorage.getItem('userInfo');
    if (userInfoString) {
      const userInfo = JSON.parse(userInfoString);
      if (userInfo?.access_token) {
        config.headers['Authorization'] = `Bearer ${userInfo.access_token}`;
      }
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export const AuthProvider = ({ children }) => {
  const [userInfo, setUserInfo] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const register = async (firstName, lastName, email, password) => {
    setIsLoading(true);
    setError(null);

    try {
      console.log('Signup payload:', { firstName, lastName, email, password });
      const response = await axios.post(`${BASE_URL}/register`, {
        firstName,
        lastName,
        email,
        password
      });

      const userInfo = response.data;
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
      const response = await axios.post(`${BASE_URL}/login`, {
        email,
        password
      });

      const userInfo = response.data;
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
        await axios.post(`${BASE_URL}/logout`);
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