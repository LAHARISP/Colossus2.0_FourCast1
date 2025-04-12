import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { RootStackParamList } from '@/App';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

const conditions = [
  'Post Surgery',
  'Heart Disease',
  'Blood Pressure',
  'Diabetes',
  'Arthritis',
  'Asthma',
];

type NavigationProp = NativeStackNavigationProp<RootStackParamList, 'Reminder'>;

const ReminderScreen: React.FC = () => {
  const navigation = useNavigation<NavigationProp>();

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Select Your Condition</Text>
      {conditions.map((condition, index) => (
        <TouchableOpacity
          key={index}
          style={styles.button}
          onPress={() => navigation.navigate('ScheduleChart', { condition })}
        >
          <Text style={styles.buttonText}>{condition}</Text>
        </TouchableOpacity>
      ))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    alignItems: 'center',
    backgroundColor: '#f0f4f7',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  button: {
    backgroundColor: '#4E9F3D',
    padding: 15,
    marginVertical: 8,
    borderRadius: 10,
    width: '90%',
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    textAlign: 'center',
  },
});

export default ReminderScreen;