import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Linking,
} from 'react-native';

const TherapyScreen: React.FC = () => {
  const [showMental, setShowMental] = useState(false);
  const [showPhysical, setShowPhysical] = useState(false);

  const openLink = async (url: string) => {
    const supported = await Linking.canOpenURL(url);
    if (supported) {
      await Linking.openURL(url);
    } else {
      alert("Can't open this URL");
    }
  };

  const mentalTherapies = [
    {
      title: 'You Are Strong – Inspiring Speech on Depression',
      url: 'https://www.youtube.com/watch?v=-GXfLY4-d8w',
    },
    {
      title: 'When You Feel Like Quitting – Mental Health Motivation',
      url: 'https://www.youtube.com/watch?v=2NZDp0E-HFc',
    },
   
    {
      title: 'You Matter – Mental Health Motivation',
      url: 'https://www.youtube.com/watch?v=4pLUleLdwY4',
    },
    {
      title: 'I Had a Black Dog – Depression Story by WHO',
      url: 'https://www.youtube.com/watch?v=XiCrniLQGYc',
    },
  ];
  

  const physicalTherapies = [
    {
      title: 'Knee Replacement Recovery – 8 Best Exercises',
      url: 'https://www.youtube.com/watch?v=hw_yl3qmO88',
    },
    {
      title: 'Knee Replacement: Week 1–2 Exercises',
      url: 'https://www.youtube.com/watch?v=Qw4CWf-woSo',
    },
    {
      title: 'Hip Replacement Recovery – 8 Best Exercises',
      url: 'https://www.youtube.com/watch?v=Tp-JGRH5hsQ',
    },
    {
      title: 'Hip Replacement: Week 1–4 Exercises',
      url: 'https://www.youtube.com/watch?v=0F8VcqYCq-8',
    },
    {
      title: 'Shoulder Surgery Recovery – 0–12 Weeks',
      url: 'https://www.youtube.com/watch?v=WyWD8m5b97Y',
    },
  ];
  

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.header}>Therapy Options</Text>

      <TouchableOpacity
        style={styles.toggleButton}
        onPress={() => setShowMental(!showMental)}
      >
        <Text style={styles.toggleButtonText}>🧠 Mental Therapy</Text>
      </TouchableOpacity>
      {showMental &&
        mentalTherapies.map((item, index) => (
          <TouchableOpacity
            key={index}
            style={styles.linkButton}
            onPress={() => openLink(item.url)}
          >
            <Text style={styles.linkText}>{item.title}</Text>
          </TouchableOpacity>
        ))}

      <TouchableOpacity
        style={styles.toggleButton}
        onPress={() => setShowPhysical(!showPhysical)}
      >
        <Text style={styles.toggleButtonText}>🏋 Physical Therapy</Text>
      </TouchableOpacity>
      {showPhysical &&
        physicalTherapies.map((item, index) => (
          <TouchableOpacity
            key={index}
            style={styles.linkButton}
            onPress={() => openLink(item.url)}
          >
            <Text style={styles.linkText}>{item.title}</Text>
          </TouchableOpacity>
        ))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: '#f0f4f7',
    flex: 1,
  },
  header: {
    fontSize: 28,
    fontWeight: '700',
    textAlign: 'center',
    marginBottom: 20,
    color: '#333',
  },
  toggleButton: {
    backgroundColor: '#4E9F3D',
    padding: 15,
    borderRadius: 10,
    marginVertical: 10,
    alignItems: 'center',
  },
  toggleButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '600',
  },
  linkButton: {
    backgroundColor: '#d9f3e3',
    padding: 12,
    borderRadius: 8,
    marginVertical: 6,
  },
  linkText: {
    color: '#1c3d2c',
    fontSize: 16,
    fontWeight: '500',
    textAlign: 'center',
  },
});

export default TherapyScreen;