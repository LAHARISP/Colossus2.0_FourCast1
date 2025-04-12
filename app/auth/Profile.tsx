import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ActivityIndicator,
  ScrollView,
  ImageBackground,
} from 'react-native';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../../config/firebaseConfig';

interface PatientProfile {
  patient_name: string;
  patient_email: string;
  patient_id: string;
  patient_age: number;
  patient_dob: any;
  patient_phonenumber: number;
  surgery_name: string;
  surgery_date: any;
}

const ProfileScreen = () => {
  const [profile, setProfile] = useState<PatientProfile | null>(null);
  const [loading, setLoading] = useState(true);

  const fetchProfile = async () => {
    try {
      const docRef = doc(db, 'Patient Data', 'pat1');
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        const data = docSnap.data();
        setProfile(data as PatientProfile);
      } else {
        console.log('No such document!');
      }
    } catch (error) {
      console.error('Error fetching profile:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProfile();
  }, []);

  const formatDate = (timestamp: any) => {
    if (!timestamp?.toDate) return '';
    return timestamp.toDate().toDateString();
  };

  if (loading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" color="#8B5E3C" />
      </View>
    );
  }

  if (!profile) {
    return (
      <View style={styles.center}>
        <Text>No profile data found.</Text>
      </View>
    );
  }

  return (
    <ImageBackground
      source={require('../../assets/images/bg-login.jpg')}
      style={styles.background}
      resizeMode="cover"
    >
      <ScrollView contentContainerStyle={styles.overlay}>
        <Text style={styles.title}>Patient Profile</Text>

        <View style={styles.card}>
          <Text style={styles.label}>Patient Name:</Text>
          <Text style={styles.value}>{profile.patient_name}</Text>

          <Text style={styles.label}>Email:</Text>
          <Text style={styles.value}>{profile.patient_email}</Text>

          <Text style={styles.label}>Phone Number:</Text>
          <Text style={styles.value}>{profile.patient_phonenumber}</Text>

          <Text style={styles.label}>Age:</Text>
          <Text style={styles.value}>{profile.patient_age}</Text>

          <Text style={styles.label}>Date of Birth:</Text>
          <Text style={styles.value}>{formatDate(profile.patient_dob)}</Text>

          <Text style={styles.label}>Surgery Name:</Text>
          <Text style={styles.value}>{profile.surgery_name}</Text>

          <Text style={styles.label}>Surgery Date:</Text>
          <Text style={styles.value}>{formatDate(profile.surgery_date)}</Text>
        </View>
      </ScrollView>
    </ImageBackground>
  );
};

export default ProfileScreen;

const styles = StyleSheet.create({
  background: {
    flex: 1,
  },
  overlay: {
    flexGrow: 1,
    backgroundColor: 'rgba(255,255,255,0.85)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  title: {
    fontSize: 30,
    color: '#4E342E',
    fontWeight: 'bold',
    marginBottom: 20,
  },
  card: {
    width: '100%',
    backgroundColor: '#EFE7DD',
    borderRadius: 15,
    padding: 20,
    borderColor: '#8B5E3C',
    borderWidth: 1,
  },
  label: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginTop: 10,
  },
  value: {
    fontSize: 16,
    color: '#555',
    marginBottom: 5,
  },
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
