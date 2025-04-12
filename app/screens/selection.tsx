import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { router } from 'expo-router';
import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

type RootStackParamList = {
  RoleSelection: undefined;
  PatientScreen: undefined;
  DoctorScreen: undefined;
};

type RoleSelectionNavigationProp = StackNavigationProp<RootStackParamList, 'RoleSelection'>;

const RoleSelection = () => {
  const navigation = useNavigation<RoleSelectionNavigationProp>();

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Select Your Role</Text>
      
      <TouchableOpacity 
        style={[styles.button, styles.patientButton]}
        onPress={() => router.push('/screens/patientscreen')}
      >
        <Text style={styles.buttonText}>Patient</Text>
      </TouchableOpacity>
      
      <TouchableOpacity 
        style={[styles.button, styles.doctorButton]}
        onPress={() => router.push('/screens/doctorscreen')}
      >
        <Text style={styles.buttonText}>Doctor</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f8f9fa',
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 40,
    color: '#2c3e50',
  },
  button: {
    padding: 15,
    borderRadius: 8,
    width: '80%',
    alignItems: 'center',
    marginBottom: 20,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },
  patientButton: {
    backgroundColor: '#4285F4', // Blue
  },
  doctorButton: {
    backgroundColor: '#34A853', // Green
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: '600',
  },
});

export default RoleSelection;