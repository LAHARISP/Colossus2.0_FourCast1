import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth } from "../../config/firebaseConfig";
import { db } from "../../config/firebaseConfig"; // Import Firestore
import { setDoc, doc } from "firebase/firestore"; // Firestore functions
import React, { useState } from "react";
import { router } from "expo-router";
import {
  View,
  Text,
  TextInput,
  Alert,
  StyleSheet,
  TouchableOpacity,
  ImageBackground,
  ActivityIndicator,
} from "react-native";

const validateEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

const validatePhone = (phone: string): boolean => {
  const phoneRegex = /^[0-9]{10}$/;
  return phoneRegex.test(phone);
};

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [dob, setDob] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSignup = async () => {
    if (!name || !validateEmail(email) || !validatePhone(phone) || !dob || password.length < 6) {
      Alert.alert("Invalid Input", "Ensure all fields are correctly filled.");
      return;
    }

    try {
      setLoading(true);
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      await updateProfile(user, { displayName: name });

      await setDoc(doc(db, "users", user.uid), {
        name,
        email,
        phone,
        dob,
      });

      Alert.alert("Success", "Account created successfully!");
      console.log("Registered user:", user.uid);

      router.push("/auth/Home");
    } catch (error: any) {
      let message = "Registration failed:";
      switch (error.code) {
        case "auth/email-already-in-use":
          message = "Email already registered";
          break;
        case "auth/invalid-email":
          message = "Invalid email format";
          break;
        case "auth/weak-password":
          message = "Password must be 6+ characters";
          break;
        default:
          message = "An unknown error occurred";
      }
      Alert.alert("Error", message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <ImageBackground
      source={require("../../assets/images/bg-login.jpg")} // Use the same image as login screen
      style={styles.background}
      resizeMode="cover"
    >
      <View style={styles.overlay}>
        <Text style={styles.title}>Create an Account</Text>

        <TextInput style={styles.input} placeholder="Full Name" value={name} onChangeText={setName} placeholderTextColor="#777" />
        <TextInput style={styles.input} placeholder="Email" value={email} onChangeText={setEmail} keyboardType="email-address" placeholderTextColor="#777" />
        <TextInput style={styles.input} placeholder="Phone Number" value={phone} onChangeText={setPhone} keyboardType="phone-pad" placeholderTextColor="#777" />
        <TextInput style={styles.input} placeholder="Date of Birth (YYYY-MM-DD)" value={dob} onChangeText={setDob} placeholderTextColor="#777" />
        <TextInput style={styles.input} placeholder="Password" value={password} onChangeText={setPassword} secureTextEntry placeholderTextColor="#777" />

        {loading ? (
          <ActivityIndicator size="large" color="#8B5E3C" />
        ) : (
          <TouchableOpacity style={styles.signupButton} onPress={handleSignup}>
            <Text style={styles.signupButtonText}>Sign Up</Text>
          </TouchableOpacity>
        )}

        <TouchableOpacity onPress={() => router.push("/auth/login")}>
          <Text style={styles.loginRedirect}>Already have an account? <Text style={{ fontWeight: 'bold' }}>Login</Text></Text>
        </TouchableOpacity>
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  background: {
    flex: 1,
  },
  overlay: {
    flex: 1,
    backgroundColor: "rgba(255, 255, 255, 0.85)",
    justifyContent: "center",
    alignItems: "center",
    padding: 30,
  },
  title: {
    fontSize: 26,
    fontWeight: "bold",
    color: "#4E342E",
    marginBottom: 25,
  },
  input: {
    width: "100%",
    height: 50,
    backgroundColor: "#EFE7DD",
    borderRadius: 10,
    paddingHorizontal: 15,
    marginBottom: 15,
    borderColor: "#8B5E3C",
    borderWidth: 1,
    color: "#000",
  },
  signupButton: {
    width: "100%",
    backgroundColor: "#6D4C41",
    padding: 15,
    borderRadius: 10,
    alignItems: "center",
    marginVertical: 15,
  },
  signupButtonText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
  },
  loginRedirect: {
    color: "#5D4037",
    fontSize: 14,
  },
});

export default Register;