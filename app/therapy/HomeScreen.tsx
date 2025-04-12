// screens/HomeScreen.tsx
import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { router } from 'expo-router';

const HomeScreen: React.FC = () => {
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Welcome to Veloria 💙</Text>
      <Text style={styles.subtitle}>Select your care module</Text>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Post Surgery Care</Text>
        <HomeButton label="🧘‍♀ Therapy" onPress={() => router.push('/therapy/TherapyScreen')} />
        <HomeButton label="🥗 Diet Plan" onPress={() => router.push('/therapy/DietPlanScreen')} />
        {/* <HomeButton label="⏰ Reminders" onPress={() => router.push('/therapy/RemainderScreen')} /> */}
      </View>

      {/* <View style={styles.section}>
        <Text style={styles.sectionTitle}>Heart/BP/Sugar</Text>
        <HomeButton label="❤ Heart Diet Plan" onPress={() => router.push('./therapy/ScheduleChart?condition=Heart%20Disease')} />
        <HomeButton label="💉 Diabetes Plan" onPress={() => router.push('./therapy/ScheduleChart?condition=Diabetes')} />
        <HomeButton label="🩺 BP Schedule" onPress={() => router.push('./therapy/ScheduleChart?condition=Blood%20Pressure')} />
      </View> */}

      {/* <View style={styles.section}>
        <Text style={styles.sectionTitle}>Mood Monitoring</Text>
        <HomeButton label="🧠 Mood Tracker" onPress={() => router.push('/MoodTracker')} />
      </View> */}
    </ScrollView>
  );
};

const HomeButton = ({ label, onPress }: { label: string; onPress: () => void }) => (
  <TouchableOpacity style={styles.button} onPress={onPress}>
    <Text style={styles.buttonText}>{label}</Text>
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  container: {
    paddingVertical: 30,
    paddingHorizontal: 20,
    backgroundColor: '#f5faff',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 20,
    color: '#666',
  },
  section: {
    marginBottom: 30,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '600',
    marginBottom: 10,
    color: '#2e3a59',
  },
  button: {
    backgroundColor: '#4E9F3D',
    padding: 14,
    borderRadius: 12,
    marginVertical: 6,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    textAlign: 'center',
  },
});

export default HomeScreen;
