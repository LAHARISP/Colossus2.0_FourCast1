import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  Alert,
  StyleSheet,
  TouchableOpacity,
  ScrollView
} from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { addDoc, collection, Timestamp } from 'firebase/firestore';
import { db } from '../../config/firebaseConfig';
import moment from 'moment';

export default function BookAppointment() {
  const [form, setForm] = useState({
    patient_id: '',
    patient_name: '',
    doctor_id: '',
    doctor_name: '',
  });

  const [selectedDate, setSelectedDate] = useState('');
  const [selectedTime, setSelectedTime] = useState('');
  const [availableDates, setAvailableDates] = useState<string[]>([]);
  const [availableTimes, setAvailableTimes] = useState<string[]>([]);

  useEffect(() => {
    const dates = [];
    for (let i = 1; i <= 14; i++) {
      dates.push(moment().add(i, 'days').format('YYYY-MM-DD'));
    }
    setAvailableDates(dates);

    const times: string[] = [];
    for (let hour = 10; hour <= 17; hour++) {
        times.push(`${hour}:00`);
        times.push(`${hour}:30`);
        
    }
    setAvailableTimes(times);
  }, []);

  const handleSubmit = async () => {
    if (!selectedDate || !selectedTime) {
      return Alert.alert('Missing', 'Please select date and time');
    }

    const appointmentDateTime = moment(`${selectedDate} ${selectedTime}`, 'YYYY-MM-DD HH:mm').toDate();

    try {
      await addDoc(collection(db, 'appointments'), {
        ...form,
        appointment_datetime: Timestamp.fromDate(appointmentDateTime),
      });
      Alert.alert('Success', '✅ Appointment booked!');
      setForm({ patient_id: '', patient_name: '', doctor_id: '', doctor_name: '' });
    } catch (error) {
      Alert.alert('Error', '❌ Failed to book appointment');
    }
  };

  const CustomButton = ({ title, onPress }: { title: string; onPress: () => void }) => (
    <TouchableOpacity style={styles.button} onPress={onPress}>
      <Text style={styles.buttonText}>{title}</Text>
    </TouchableOpacity>
  );

  return (
    <ScrollView style={styles.scroll}>
      <View style={styles.container}>
        <Text style={styles.heading}>📅 Book Appointment</Text>

        <TextInput
          style={styles.input}
          placeholder="Patient ID"
          value={form.patient_id}
          onChangeText={(text) => setForm({ ...form, patient_id: text })}
          placeholderTextColor="#4E342E"
        />
        <TextInput
          style={styles.input}
          placeholder="Patient Name"
          value={form.patient_name}
          onChangeText={(text) => setForm({ ...form, patient_name: text })}
          placeholderTextColor="#4E342E"
        />
        <TextInput
          style={styles.input}
          placeholder="Doctor ID"
          value={form.doctor_id}
          onChangeText={(text) => setForm({ ...form, doctor_id: text })}
          placeholderTextColor="#4E342E"
        />
        <TextInput
          style={styles.input}
          placeholder="Doctor Name"
          value={form.doctor_name}
          onChangeText={(text) => setForm({ ...form, doctor_name: text })}
          placeholderTextColor="#4E342E"
        />

        <Text style={styles.label}>Select Date</Text>
        <View style={styles.pickerWrapper}>
          <Picker
            selectedValue={selectedDate}
            onValueChange={(value) => setSelectedDate(value)}
            style={styles.picker}
          >
            <Picker.Item label="Select date" value="" />
            {availableDates.map((date) => (
              <Picker.Item key={date} label={date} value={date} />
            ))}
          </Picker>
        </View>

        <Text style={styles.label}>Select Time</Text>
        <View style={styles.pickerWrapper}>
          <Picker
            selectedValue={selectedTime}
            onValueChange={(value) => setSelectedTime(value)}
            style={styles.picker}
          >
            <Picker.Item label="Select time" value="" />
            {availableTimes.map((time) => (
              <Picker.Item key={time} label={time} value={time} />
            ))}
          </Picker>
        </View>

        <CustomButton title="✅ Book Now" onPress={handleSubmit} />
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  scroll: {
    flex: 1,
    backgroundColor: '#F5F5F5',
  },
  container: {
    padding: 20,
    marginTop: 40,
    backgroundColor: '#F5F5F5',
  },
  heading: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#4E342E',
    marginBottom: 20,
    textAlign: 'center',
  },
  input: {
    borderWidth: 1,
    borderColor: '#D7CCC8',
    borderRadius: 10,
    backgroundColor: '#EFE7DD',
    padding: 12,
    marginBottom: 12,
    color: '#4E342E',
  },
  label: {
    fontWeight: '600',
    color: '#4E342E',
    marginBottom: 5,
    marginTop: 10,
  },
  pickerWrapper: {
    borderWidth: 1,
    borderColor: '#D7CCC8',
    borderRadius: 10,
    backgroundColor: '#EFE7DD',
    marginBottom: 15,
  },
  picker: {
    color: '#4E342E',
  },
  button: {
    backgroundColor: '#D7CCC8',
    paddingVertical: 14,
    borderRadius: 10,
    marginTop: 20,
    alignItems: 'center',
  },
  buttonText: {
    color: '#4E342E',
    fontWeight: 'bold',
    fontSize: 16,
  },
});