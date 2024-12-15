import React, { useState, useEffect } from 'react';
import { View, Text, Image, TouchableOpacity, ScrollView, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';


const HomeScreen = () => {
  // State for profile data
  const [profile, setProfile] = useState({
    name: '',
    details: '',
    imageUri: '',
    performance: 0,
  });

  // Simulate fetching user profile data (e.g., from an API)
  useEffect(() => {
    // Replace with your API call
    const fetchProfileData = async () => {
      const fetchedProfile = {
        name: 'Fiifi Gyan',
        details: 'Class XI-B | Roll no: 04',
        imageUri: '../assets/splash-icon.png',
        performance: 80,
      };
      setProfile(fetchedProfile);
    };

    fetchProfileData();
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      {/* <Header title="HEYY CAMPUS" /> */}
      {/* Main Content */}
      <ScrollView contentContainerStyle={styles.content}>
        {/* Profile Section */}
        <View style={styles.profileCard}>
          <View style={styles.profileInfo}>
            <Image
              source={{ uri: profile.imageUri }}
              style={styles.profileImage}
            />
            <View>
              <Text style={styles.profileName}>{profile.name}</Text>
              <Text style={styles.profileDetails}>{profile.details}</Text>
            </View>
          </View>
          <View style={styles.performanceBar}>
            <Text style={styles.performanceText}>
              Overall Performance: {profile.performance}%
            </Text>
            <View style={styles.progressBar}>
              <View style={[styles.progress, { width: `${profile.performance}%` }]} />
            </View>
          </View>
        </View>

        {/* Academics Section */}
        <View style={styles.academicsCard}>
          <Text style={styles.sectionTitle}>Academics</Text>
          <View style={styles.academicOptions}>
            <TouchableOpacity style={styles.academicItem}>
              <Text>Attendance</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.academicItem}>
              <Text>Fees</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.academicItem}>
              <Text>Ask Doubt</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.academicItem}>
              <Text>Live Tracking</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Updates Section */}
        <View style={styles.updateCard}>
          <Text style={styles.sectionTitle}>Updates</Text>
          <View style={styles.updateItem}>
            <Text style={styles.updateText}>Live location</Text>
            <TouchableOpacity>
              <Text style={styles.trackNow}>Track Now</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Upcoming Events Section */}
        <View style={styles.eventsCard}>
          <Text style={styles.sectionTitle}>Upcoming Events</Text>
          <Image
            source={{ uri: '../assets/splash-icon.png' }}
            style={styles.eventImage}
          />
        </View>
      </ScrollView>

      {/* Bottom Navigation */}
      {/* <BottomNavigation /> */}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  content: {
    padding: 15,
  },
  profileCard: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 15,
    marginBottom: 15,
    elevation: 3,
  },
  profileInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  profileImage: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 15,
  },
  profileName: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  profileDetails: {
    fontSize: 14,
    color: '#777',
  },
  performanceBar: {
    marginTop: 10,
  },
  performanceText: {
    fontSize: 14,
    color: '#555',
  },
  progressBar: {
    height: 5,
    backgroundColor: '#ddd',
    borderRadius: 5,
    marginTop: 5,
  },
  progress: {
    height: 5,
    backgroundColor: '#007bff',
    borderRadius: 5,
  },
  academicsCard: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 15,
    marginBottom: 15,
    elevation: 3,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  academicOptions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  academicItem: {
    alignItems: 'center',
  },
  updateCard: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 15,
    marginBottom: 15,
    elevation: 3,
  },
  updateItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  updateText: {
    fontSize: 14,
    color: '#555',
  },
  trackNow: {
    color: '#007bff',
    fontWeight: 'bold',
  },
  eventsCard: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 15,
    elevation: 3,
  },
  eventImage: {
    width: '100%',
    height: 150,
    borderRadius: 10,
  },
});

export default HomeScreen;