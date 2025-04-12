import React from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';
import { useLocalSearchParams } from 'expo-router';

const schedules: Record<string, string[]> = {
  'Post Surgery': [
    '8:00 AM - Medication A',
    '10:00 AM - Walk (15 mins)',
    '12:30 PM - Light Meal',
    '2:00 PM - Nap',
    '6:00 PM - Physiotherapy',
  ],
  'Heart Disease': [
    '7:00 AM - BP Check',
    '8:00 AM - Light Breakfast',
    '9:00 AM - 30 min Walk',
    '1:00 PM - Medication B',
    '8:00 PM - Meditation',
  ],
  'Blood Pressure': [
    '8:00 AM - Medication',
    '10:00 AM - Hydration Reminder',
    '1:00 PM - Low Sodium Lunch',
    '6:00 PM - Walk',
  ],
  'Diabetes': [
    '7:30 AM - Blood Sugar Check',
    '8:00 AM - Insulin',
    '12:30 PM - Balanced Meal',
    '5:00 PM - Snack',
    '9:00 PM - Final Check',
  ],
  Arthritis: [
    '8:00 AM - Hot Pack Therapy',
    '9:00 AM - Morning Stretch',
    '2:00 PM - Pain Medication',
    '6:00 PM - Light Exercise',
  ],
  Asthma: [
    '7:30 AM - Inhaler',
    '11:00 AM - Breathing Exercise',
    '3:00 PM - Steam Inhalation',
    '9:00 PM - Medication',
  ],
};

const ScheduleChartScreen: React.FC = () => {
  const { condition } = useLocalSearchParams();
  const conditionName = Array.isArray(condition) ? condition[0] : condition;
  const reminders = conditionName ? schedules[conditionName] || [] : [];

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{conditionName} Schedule</Text>
      <FlatList
        data={reminders}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => (
          <View style={styles.reminderBox}>
            <Text style={styles.reminderText}>⏰ {item}</Text>
          </View>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: '#fefefe',
    flex: 1,
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 15,
    textAlign: 'center',
  },
  reminderBox: {
    backgroundColor: '#e2f0cb',
    padding: 15,
    borderRadius: 10,
    marginVertical: 8,
  },
  reminderText: {
    fontSize: 16,
    color: '#333',
  },
});

export default ScheduleChartScreen;
