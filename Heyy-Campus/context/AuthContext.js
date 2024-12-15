import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import React, {createContext, useEffect, useState} from 'react';
import {BASE_URL} from '../config';

export const AuthContext = createContext();

export const AuthProvider = ({children}) => {
  const [userInfo, setUserInfo] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const signup = async (firstName, lastName, email, password) => {
    setIsLoading(true);
    setError(null);
  
    try {
      console.log('Signup payload:', { firstName, lastName, email, password }); // Add logging
      const response = await axios.post(`${BASE_URL}/signup`, { 
        firstName, 
        lastName, 
        email, 
        password 
      });
  
      const userInfo = response.data;
      console.log('Signup response:', userInfo); // Add logging
      await AsyncStorage.setItem('userInfo', JSON.stringify(userInfo));
      setUserInfo(userInfo);
      setIsLoading(false);
      return userInfo;
    } 
    catch (e) {
      console.error('Signup error:', e.response?.data || e.message);
      setIsLoading(false);
      setError(e.response?.data?.message || 'Signup failed');
      throw e;
    }
  };

  const login = async (email, password) => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await axios.post(`${BASE_URL}/login`, {
        email,
        password,
      });

      const userInfo = response.data;
      await AsyncStorage.setItem('userInfo', JSON.stringify(userInfo));
      setUserInfo(userInfo);
      setIsLoading(false);
      return userInfo;
    } catch (e) {
      setIsLoading(false);
      setError(e.response?.data?.message || 'Login failed');
      throw e;
    }
  };

  const logout = async () => {
    setIsLoading(true);
    setError(null);

    try {
      // Only send logout request if there's a token
      if (userInfo?.access_token) {
        await axios.post(
          `${BASE_URL}/logout`,
          {},
          {
            headers: {Authorization: `Bearer ${userInfo.access_token}`},
          },
        );
      }

      // Clear user info from storage and state
      await AsyncStorage.removeItem('userInfo');
      setUserInfo(null);
      setIsLoading(false);
    } catch (e) {
      setIsLoading(false);
      setError(e.response?.data?.message || 'Logout failed');
      // Even if logout request fails, clear local storage
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
        signup,
        login,
        logout,
      }}>
      {children}
    </AuthContext.Provider>
  );
};





// import AsyncStorage from '@react-native-async-storage/async-storage';
// import axios from 'axios';
// import React, {createContext, useEffect, useState} from 'react';
// import {BASE_URL} from '../config';
// import { ActivityIndicator } from 'react-native-web';

// export const AuthContext = createContext();

// export const AuthProvider = ({children}) => {
//   const [userInfo, setUserInfo] = useState({});
//   const [isLoading, setIsLoading] = useState(false);
//   const [splashLoading, setSplashLoading] = useState(false);

//   const signup = (
//     firstName, middleName, lastName, email, password) => {
//     setIsLoading(true);

//     axios
//       .post(`${BASE_URL}/signup`, { 
//         firstName, middleName, lastName, email, password, })
//       .then(res => {
//         let userInfo = res.data;
//         setUserInfo(userInfo);
//         AsyncStorage.setItem('userInfo', JSON.stringify(userInfo));
//         setIsLoading(false);
//         console.log(userInfo);
//       })
//       .catch(e => {
//         console.log(`signup error ${e}`);
//         setIsLoading(false);
//       });
//   };

//   const login = (email, password) => {
//     setIsLoading(true);

//     axios
//       .post(`${BASE_URL}/login`, {
//         email,
//         password,
//       })
//       .then(res => {
//         let userInfo = res.data;
//         console.log(userInfo);
//         setUserInfo(userInfo);
//         AsyncStorage.setItem('userInfo', JSON.stringify(userInfo));
//         setIsLoading(false);
//       })
//       .catch(e => {
//         console.log(`login error ${e}`);
//         setIsLoading(false);
//       });
//   };

//   const logout = () => {
//     setIsLoading(true);

//     axios
//       .post(
//         `${BASE_URL}/logout`,
//         {},
//         {
//           headers: {Authorization: `Bearer ${userInfo.access_token}`},
//         },
//       )
//       .then(res => {
//         console.log(res.data);
//         AsyncStorage.removeItem('userInfo');
//         setUserInfo({});
//         setIsLoading(false);
//       })
//       .catch(e => {
//         console.log(`logout error ${e}`);
//         setIsLoading(false);
//       });
//   };

//   const isLoggedIn = async () => {
//     try {
//       setSplashLoading(true);

//       let userInfo = await AsyncStorage.getItem('userInfo');
//       userInfo = JSON.parse(userInfo);

//       if (userInfo) {
//         setUserInfo(userInfo);
//       }

//       setSplashLoading(false);
//     } catch (e) {
//       setSplashLoading(false);
//       console.log(`is logged in error ${e}`);
//     }
//   };

//   useEffect(() => {
//     isLoggedIn();
//   }, []);

//   return (
//     <AuthContext.Provider
//       value={{
//         isLoading,
//         userInfo,
//         splashLoading,
//         signup,
//         login,
//         logout,
//       }}>
//       {children}
//     </AuthContext.Provider>
//   );
// };