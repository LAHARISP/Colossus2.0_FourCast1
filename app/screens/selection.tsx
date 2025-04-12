import { router } from 'expo-router';
import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { FontAwesome5 } from '@expo/vector-icons';

const RoleSelection = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Select Your Role</Text>

      <View style={styles.roleContainer}>
        {/* Patient Card */}
        <TouchableOpacity style={styles.roleBox} onPress={() => router.push('/screens/patientscreen')}>
          <FontAwesome5 name="user" size={40} color="#4285F4" />
          <Text style={styles.roleText}>Patient</Text>
        </TouchableOpacity>

        {/* Doctor Card */}
        <TouchableOpacity style={styles.roleBox} onPress={() => router.push('/screens/doctorscreen')}>
          <FontAwesome5 name="user-md" size={40} color="#34A853" />
          <Text style={styles.roleText}>Doctor</Text>
        </TouchableOpacity>
      </View>
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
    fontSize: 26,
    fontWeight: 'bold',
    marginBottom: 40,
    color: '#2c3e50',
  },
  roleContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 30,
  },
  roleBox: {
    backgroundColor: '#ffffff',
    borderRadius: 12,
    padding: 30,
    alignItems: 'center',
    elevation: 4,
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowOffset: { width: 0, height: 3 },
    shadowRadius: 5,
    width: 120,
  },
  roleText: {
    marginTop: 10,
    fontSize: 16,
    fontWeight: '600',
    color: '#2c3e50',
    textAlign: 'center',
  },
});

export default RoleSelection;
