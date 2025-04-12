import React from 'react';
import { View, Text, Alert, StyleSheet, TouchableOpacity } from 'react-native';
import { signOut } from 'firebase/auth';
import { auth } from '../../config/firebaseConfig';
import { useRouter } from 'expo-router';

const Home = () => {
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
    <View style={styles.container}>
      <Text style={styles.title}>Welcome to Home Screen!</Text>

      {user && (
        <View style={styles.userInfo}>
          <Text style={styles.userEmail}>Logged in as: {user.displayName}</Text>
        </View>
      )}

      <CustomButton title="Logout" onPress={handleLogout} />
      <CustomButton title="Go to Profile" onPress={() => router.push('/auth/Profile')} />
      <CustomButton title="Video Call" onPress={() => router.push('/auth/WebViewScreen')} />
      <CustomButton title="Chat" onPress={() => router.push('/chat/chat')} />
      <CustomButton title="Book Appointment" onPress={() => router.push('/patient/book_patient')} />

    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5', // Pale sand
    padding: 20,
    justifyContent: 'center',
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
});

export default Home;