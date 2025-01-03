// import React from 'react'
// import { SafeAreaView, View, Text, TouchableOpacity } from 'react-native';

// import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

// import SCREENS from '../../screens/index';

// const OnboardingScreen = ({navigation}) => {
//   return (
//     <SafeAreaView
//       style={{
//         flex: 1,
//         justifyContent: 'center',
//         alignItems: 'center',
//         backgroundColor: '#fff',
//       }}>
//       <View style={{marginTop: 20}}>
//         <Text
//           style={{
//             fontFamily: 'Inter-Bold',
//             fontWeight: 'bold',
//             fontSize: 30,
//             color: '#20315f',
//           }}>
//           Heyy There
//         </Text>
//       </View>

//       <TouchableOpacity
//         style={{
//           backgroundColor: 'blue',
//           padding: 20,
//           width: '90%',
//           borderRadius: 10,
//           marginBottom: 50,
//           flexDirection: 'row',
//           justifyContent: 'space-between',
//         }}
//         onPress={() => navigation.navigate(SCREENS.LOGIN)}>
//         <Text
//           style={{
//             color: 'white',
//             fontSize: 18,
//             textAlign: 'center',
//             fontWeight: 'bold',
//             fontFamily: 'Roboto-MediumItalic',
//           }}>
//           Let's Begin
//         </Text>
//         <MaterialIcons name="arrow-forward-ios" size={22} color="#fff" />
//       </TouchableOpacity>
//     </SafeAreaView>
//   );
// };

// export default OnboardingScreen;


import React from 'react';
import { View, Text, StyleSheet, Image, Button } from 'react-native';
import AppIntroSlider from 'react-native-app-intro-slider';

import ICONS from '../../assets/index';
import SCREENS from '../../screens/index';

const slides = [
  {
    key: '1',
    title: 'Welcome to Heyy Campus',
    text: 'Simplify admissions and manage school life in one place.',
    image: ICONS.SPLASH1,
    backgroundColor: '#2196F3',
  },
  {
    key: '2',
    title: 'Simplified Admissions',
    text: 'Apply for admissions and track your application easily.',
    image: ICONS.SPLASH2,
    backgroundColor: '#2196F3',
  },
  {
    key: '3',
    title: 'Stay Connected',
    text: 'Get real-time updates and stay informed.',
    image: ICONS.SPLASH3,
    backgroundColor: '#2196F3',
  },
  {
    key: '4',
    title: 'Secure Document Storage',
    text: 'Store and access important documents anytime.',
    image: ICONS.SPLASH4,
    backgroundColor: '#2196F3',
  },
];

const OnboardingScreen = ({ navigation }) => {
  const renderItem = ({ item }) => (
    <View style={[styles.slide, { backgroundColor: item.backgroundColor }]}>
      <Image source={item.image} style={styles.image} />
      <Text style={styles.title}>{item.title}</Text>
      <Text style={styles.text}>{item.text}</Text>
    </View>
  );

  const onDone = () => {
    navigation.navigate(SCREENS.LOGIN);
  };

  const onSkip = () => {
    navigation.navigate(SCREENS.LOGIN);
  };

  return (
    <AppIntroSlider
      renderItem={renderItem}
      data={slides}
      onDone={onDone}
      showSkipButton={true} // Let's enables the skip button
      onSkip={onSkip} // Functionality for skip button
    />
  );
};

const styles = StyleSheet.create({
  slide: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  image: {
    width: 300,
    height: 300,
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
    textAlign: 'center',
    marginBottom: 10,
  },
  text: {
    fontSize: 16,
    color: '#fff',
    textAlign: 'center',
  },
});

export default OnboardingScreen;