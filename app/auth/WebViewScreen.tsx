import React, { useEffect } from 'react';
import { StyleSheet, View, ActivityIndicator, Linking } from 'react-native';

const WebViewScreen = () => {
  useEffect(() => {
    // Open the video call URL in the default browser
    Linking.openURL('https://morning-escarpment-67980.onrender.com/');
  }, []);

  return (
    <View style={styles.container}>
      <ActivityIndicator size="large" color="#007AFF" />
    </View>
  );
};

export default WebViewScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
