import React from 'react';
import { View, Text, Image, StyleSheet, ScrollView } from 'react-native';
import { ListItem } from 'react-native-elements';

const menuItems = [
  { name: 'Home', screen: 'Home' },
  { name: 'Daily Quiz', screen: 'DailyQuiz' },
  { name: 'Add Account', screen: 'AddAccount' },
  { name: 'Switch Account', screen: 'SwitchAccount' },
  { name: 'Teacher Profile', screen: 'TeacherProfile' },
  { name: 'Payment History', screen: 'PaymentHistory' },
  { name: 'Settings', screen: 'Settings' },
  { name: 'Help Center', screen: 'HelpCenter' }
];

const Sidebar = ({ navigation }) => {
  return (
    <View style={styles.sidebar}>
      <View style={styles.profile}>
        <Image source={{ uri: 'profile.jpg' }} style={styles.profileImage} />
        <Text style={styles.profileName}>Surya</Text>
        <Text style={styles.profileLink}>View profile</Text>
      </View>
      <ScrollView>
        {
          menuItems.map((item, index) => (
            <ListItem key={index} bottomDivider onPress={() => navigation.navigate(item.screen)}>
              <ListItem.Content>
                <ListItem.Title>{item.name}</ListItem.Title>
              </ListItem.Content>
            </ListItem>
          ))
        }
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  sidebar: {
    flex: 1,
    backgroundColor: '#2196F3',
    padding: 20
  },
  profile: {
    alignItems: 'center',
    marginBottom: 20
  },
  profileImage: {
    width: 80,
    height: 80,
    borderRadius: 40
  },
  profileName: {
    fontSize: 18,
    color: 'white',
    marginTop: 10
  },
  profileLink: {
    color: 'white',
    textDecorationLine: 'underline'
  }
});

export default Sidebar;