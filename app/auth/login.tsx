import { useState } from 'react';
import { View, Text, TextInput, Alert, ActivityIndicator, StyleSheet, ImageBackground, TouchableOpacity } from 'react-native';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../../config/firebaseConfig';
import { router } from 'expo-router';
import { FontAwesome5 } from '@expo/vector-icons';
import { getFirestore, collection, query, where, getDocs } from 'firebase/firestore';

const db = getFirestore();

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState<'patient' | 'doctor' | null>(null);
  const [loading, setLoading] = useState(false);

  const validateEmail = (email: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  const handleLogin = async () => {
    if (!email || !password) return Alert.alert('Error', 'Please fill in all fields');
    if (!validateEmail(email)) return Alert.alert('Error', 'Invalid email format');
    if (password.length < 6) return Alert.alert('Error', 'Password must be at least 6 characters');
    if (!role) return Alert.alert('Error', 'Please select a role (Patient/Doctor)');

    setLoading(true);

    try {
      const loginRef = collection(db, 'login_details');
      const q = query(loginRef, where('email', '==', email), where('password', '==', password));
      const querySnapshot = await getDocs(q);

      if (querySnapshot.empty) {
        return Alert.alert('Error', 'Invalid email or password');
      }

      const userData = querySnapshot.docs[0].data();
      const storedRole = userData.role;

      // Check for role mismatch
      if (storedRole !== role) {
        console.log(`Selected Role: ${role}, Stored Role: ${storedRole}`);
        Alert.alert('Error', 'Incorrect role selected. Please select the correct role.');
        setLoading(false);
        return;
      }

      await signInWithEmailAndPassword(auth, email, password);

      if (role === 'patient') {
        router.push('/screens/patientscreen');
      } else if (role === 'doctor') {
        router.push('/screens/doctorscreen');
      }

    } catch (error: any) {
      let errorMessage = 'Login failed. Please try again.';
      switch (error.code) {
        case 'auth/invalid-credential': errorMessage = 'Invalid email or password'; break;
        case 'auth/user-not-found': errorMessage = 'User not found'; break;
        case 'auth/too-many-requests': errorMessage = 'Too many attempts. Try again later'; break;
      }
      Alert.alert('Error', errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <ImageBackground
      source={require('../../assets/images/bg-login.jpg')}
      style={styles.background}
      resizeMode="cover"
    >
      <View style={styles.overlay}>
        <Text style={styles.title}>Welcome Back</Text>

        <TextInput
          style={styles.input}
          placeholder="Email"
          placeholderTextColor="#999"
          autoCapitalize="none"
          keyboardType="email-address"
          value={email}
          onChangeText={setEmail}
        />

        <TextInput
          style={styles.input}
          placeholder="Password"
          placeholderTextColor="#999"
          secureTextEntry
          value={password}
          onChangeText={setPassword}
        />

        <View style={styles.roleContainer}>
          <TouchableOpacity
            style={[styles.roleBox, role === 'patient' && styles.selectedRole]}
            onPress={() => setRole('patient')}
          >
            <FontAwesome5 name="user" size={40} color="#4285F4" />
            <Text style={styles.roleText}>Patient</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.roleBox, role === 'doctor' && styles.selectedRole]}
            onPress={() => setRole('doctor')}
          >
            <FontAwesome5 name="user-md" size={40} color="#34A853" />
            <Text style={styles.roleText}>Doctor</Text>
          </TouchableOpacity>
        </View>

        {loading ? (
          <ActivityIndicator size="large" color="#8B5E3C" />
        ) : (
          <TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
            <Text style={styles.loginButtonText}>Login</Text>
          </TouchableOpacity>
        )}

        <TouchableOpacity onPress={() => router.push('/auth/register')}>
          <Text style={styles.registerText}>Don't have an account? <Text style={{ fontWeight: 'bold' }}>Sign up</Text></Text>
        </TouchableOpacity>
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  background: { flex: 1 },
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(255,255,255,0.8)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 30,
  },
  title: {
    fontSize: 30,
    color: '#4E342E',
    fontWeight: 'bold',
    marginBottom: 30,
  },
  input: {
    width: '100%',
    height: 50,
    backgroundColor: '#EFE7DD',
    borderRadius: 10,
    paddingHorizontal: 15,
    marginBottom: 20,
    borderColor: '#8B5E3C',
    borderWidth: 1,
  },
  roleContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
    width: '100%',
  },
  roleBox: {
    backgroundColor: '#ffffff',
    borderRadius: 12,
    padding: 20,
    alignItems: 'center',
    width: '45%',
    elevation: 4,
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowOffset: { width: 0, height: 3 },
    shadowRadius: 5,
  },
  selectedRole: {
    borderColor: '#8B5E3C',
    borderWidth: 2,
  },
  roleText: {
    marginTop: 10,
    fontSize: 16,
    fontWeight: '600',
    color: '#2c3e50',
    textAlign: 'center',
  },
  loginButton: {
    width: '100%',
    backgroundColor: '#6D4C41',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginVertical: 15,
  },
  loginButtonText: {
    color: '#FFF',
    fontWeight: 'bold',
    fontSize: 16,
  },
  registerText: {
    color: '#5D4037',
    fontSize: 14,
  },
});

export default Login;
