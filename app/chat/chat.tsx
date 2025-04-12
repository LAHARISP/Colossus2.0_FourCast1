import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  FlatList,
  TextInput,
  Button,
  ActivityIndicator,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  SafeAreaView,
  Alert,
  ImageBackground,
  TouchableOpacity,
  Image,
} from 'react-native';
import { auth, db } from '../../config/firebaseConfig';
import {
  collection,
  addDoc,
  doc,
  setDoc,
  onSnapshot,
  orderBy,
  query,
  serverTimestamp,
} from 'firebase/firestore';

interface Message {
  id: string;
  text: string;
  senderId: string;
  createdAt?: any;
}

export default function Chat() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [chatId, setChatId] = useState<string | null>(null);
  const [doctorId, setDoctorId] = useState('');
  const [patientId, setPatientId] = useState('');
  const [idsSubmitted, setIdsSubmitted] = useState(false);
  const [loadingMessages, setLoadingMessages] = useState(false);

  useEffect(() => {
    if (!chatId) return;

    const q = query(collection(db, 'chats', chatId, 'messages'), orderBy('createdAt'));
    setLoadingMessages(true);

    const unsubscribe = onSnapshot(q, (snapshot) => {
      setMessages(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Message)));
      setLoadingMessages(false);
    });

    return unsubscribe;
  }, [chatId]);

  const handleStartChat = () => {
    if (!doctorId.trim() || !patientId.trim()) {
      Alert.alert('Missing Info', 'Please enter both doctor and patient IDs.');
      return;
    }

    const generatedChatId = [doctorId, patientId].sort().join('_');
    setChatId(generatedChatId);
    setIdsSubmitted(true);
  };

  const sendMessage = async () => {
    if (!input.trim() || !auth.currentUser || !chatId) return;

    const newMessage = {
      text: input,
      senderId: auth.currentUser.uid,
      createdAt: serverTimestamp(),
    };

    try {
      await addDoc(collection(db, 'chats', chatId, 'messages'), newMessage);

      await setDoc(
        doc(db, 'chats', chatId),
        {
          patient_id: patientId,
          doctor_id: doctorId,
          frequent_message: input,
          last_updated: serverTimestamp(),
        },
        { merge: true }
      );

      setInput('');
    } catch (error) {
      console.error('Error sending message:', error);
      Alert.alert('Error', '❌ Failed to send message');
    }
  };

  if (!idsSubmitted) {
    return (
      <ImageBackground
        source={require('../../assets/images/chatbg.jpg')}
        style={styles.background}
        resizeMode="cover"
      >
        <SafeAreaView style={styles.overlay}>
          <Text style={styles.heading}>Start Chat</Text>
          <TextInput
            placeholder="Enter Doctor ID"
            value={doctorId}
            onChangeText={setDoctorId}
            style={styles.textInput}
            placeholderTextColor="#999"
          />
          <TextInput
            placeholder="Enter Patient ID"
            value={patientId}
            onChangeText={setPatientId}
            style={styles.textInput}
            placeholderTextColor="#999"
          />
          <TouchableOpacity style={styles.button} onPress={handleStartChat}>
            <Text style={styles.buttonText}>Start Chat</Text>
          </TouchableOpacity>
        </SafeAreaView>
      </ImageBackground>
    );
  }

  if (loadingMessages) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" color="#8B5E3C" />
        <Text style={{ color: '#4E342E', marginTop: 10 }}>Loading Chat...</Text>
      </View>
    );
  }

  return (
    <ImageBackground
      source={require('../../assets/images/bg-login.jpg')}
      style={styles.background}
      resizeMode="cover"
    >
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        keyboardVerticalOffset={Platform.OS === 'ios' ? 60 : 0}
      >
        <SafeAreaView style={styles.overlay}>
          <FlatList
            data={messages}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
              <Text
                style={[
                  styles.messageText,
                  item.senderId === auth.currentUser?.uid
                    ? styles.messageSelf
                    : styles.messageOther,
                ]}
              >
                {item.senderId === auth.currentUser?.uid ? '' : ''} {item.text}
              </Text>
            )}
            contentContainerStyle={{ paddingBottom: 80 }}
          />
          <View style={styles.inputContainer}>
            <TextInput
              placeholder="Type your message"
              value={input}
              onChangeText={setInput}
              style={styles.textInput}
              placeholderTextColor="#999"
            />
            <TouchableOpacity style={styles.sendButton} onPress={sendMessage}>
              {/* <Text style={styles.sendButtonText}></Text> */}
              <Image source={require('../../assets/images/send.png')}
               style={styles.sendIcon}
                />
            </TouchableOpacity>
          </View>
        </SafeAreaView>
      </KeyboardAvoidingView>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
  },
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(255,255,255,0.85)',
    padding: 20,
  },
  heading: {
    fontSize: 28,
    color: '#4E342E',
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFF8F0',
  },
  textInput: {
    backgroundColor: '#EFE7DD',
    borderRadius: 10,
    paddingHorizontal: 90,
    paddingVertical: 12,
    borderWidth: 1,
    borderColor: '#8B5E3C',
    marginBottom: 15,
    color: '#333',
  },
  button: {
    backgroundColor: '#6D4C41',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 10,
  },
  buttonText: {
    color: '#FFF',
    fontWeight: 'bold',
    fontSize: 16,
  },
  messageText: {
    fontSize: 16,
    padding: 10,
    borderRadius: 8,
    marginVertical: 5,
    maxWidth: '80%',
    alignSelf: 'flex-start',
  },
  messageSelf: {
    backgroundColor: '#D7CCC8',
    alignSelf: 'flex-end',
  },
  messageOther: {
    backgroundColor: '#F5F5F5',
    alignSelf: 'flex-start',
  },
  inputContainer: {
    position: 'absolute',
    bottom: 10,
    left: 20,
    right: 20,
    flexDirection: 'row',
    gap: 10,
    alignItems: 'center',
  },
  sendButton: {
    backgroundColor: '#8B5E3C',
    padding: 4, // smaller padding to create the border
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    width: 44, // fixed width/height to make it a square
    height: 44,
  },
  
  sendIcon: {
    width: '100%',
    height: '100%',
    borderRadius: 4, // optional, to match button's rounded edges
    resizeMode: 'contain', // ensures the image scales correctly
  },
  
  
  sendButtonText: {
    color: '#FFF',
    fontWeight: 'bold',
  },
});
