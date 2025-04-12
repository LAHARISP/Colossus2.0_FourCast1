import React from 'react';
import { View, Text, Alert, StyleSheet, TouchableOpacity } from 'react-native';
import { signOut } from 'firebase/auth';
import { auth } from '../../config/firebaseConfig';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';

const DoctorHome = () => {
  const user = auth.currentUser;
  const router = useRouter();

  const handleLogout = async () => {
    try {
      await signOut(auth);
      router.replace('/auth/login');
    } catch (error: any) {
      Alert.alert('Logout Error', error.message);
    }
  };

  const CustomButton = ({ title, onPress }: { title: string; onPress: () => void }) => (
    <TouchableOpacity style={styles.button} onPress={onPress}>
      <Text style={styles.buttonText}>{title}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.wrapper}>
      <View style={styles.container}>
        <Text style={styles.title}>Welcome Doctor!</Text>

        {user && (
          <View style={styles.userInfo}>
            <Text style={styles.userEmail}>Logged in as: {user.displayName}</Text>
          </View>
        )}

        <CustomButton title="Video Conference" onPress={() => router.push('/auth/WebViewScreen')} />
        <CustomButton title="Chat with Patients" onPress={() => router.push('/chat/chat')} />
        <CustomButton title="Appointment Details" onPress={() => router.push('/doctor/appointments')} />
        <CustomButton title="Doctor Profile" onPress={() => router.push('/doctor/profile')} />
        <CustomButton title="Logout" onPress={handleLogout} />
      </View>

      {/* Floating Chatbot Button */}
      <TouchableOpacity style={styles.chatbotIcon} onPress={() => router.push('/chatbot/ChatScreen')}>
        <Ionicons name="chatbubble-ellipses-outline" size={28} color="#fff" />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    backgroundColor: '#EDE7F6', // Light lavender
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
  },
  container: {
    backgroundColor: '#F5F5F5', // Pale sand
    padding: 20,
    borderRadius: 20,
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 10,
    elevation: 5,
    width: '90%',
    alignItems: 'center',
  },
  title: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#4E342E', // Deep brown
    marginBottom: 20,
  },
  userInfo: {
    marginBottom: 20,
    alignItems: 'center',
  },
  userEmail: {
    color: '#6D4C41',
    fontSize: 16,
  },
  button: {
    backgroundColor: '#D7CCC8', // Soft taupe
    paddingVertical: 14,
    paddingHorizontal: 30,
    borderRadius: 10,
    marginVertical: 8,
    width: '80%',
    alignItems: 'center',
  },
  buttonText: {
    color: '#4E342E',
    fontSize: 16,
    fontWeight: '600',
  },
  chatbotIcon: {
    position: 'absolute',
    bottom: 30,
    right: 30,
    backgroundColor: '#4E342E',
    padding: 16,
    borderRadius: 50,
    elevation: 8,
    shadowColor: '#000',
    shadowOpacity: 0.3,
    shadowOffset: { width: 2, height: 2 },
    shadowRadius: 5,
  },
});

export default DoctorHome;