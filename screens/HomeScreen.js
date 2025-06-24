// screens/HomeScreen.js
import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import app from '../firebaseConfig';

export default function HomeScreen({ navigation }) {
  const handleTestWrite = async () => {
    try {
      const {
        getFirestore,
        collection,
        addDoc,
        serverTimestamp
      } = await import('firebase/firestore');

      const db = getFirestore(app);
      await addDoc(collection(db, 'requests'), {
        userId: 'testUser',
        message: 'Test Firestore Write',
        createdAt: serverTimestamp(),
      });

      Alert.alert('Success', 'Test document written to Firestore');
    } catch (err) {
      console.error('Firestore write error:', err);
      Alert.alert('Error', 'Failed to write to Firestore');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Maintenance Requests</Text>

      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate('AdminPanel')}
      >
        <Text style={styles.buttonText}>Admin Panel</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={[styles.button, styles.successButton]}
        onPress={handleTestWrite}
      >
        <Text style={styles.buttonText}>Test Firestore Write</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#eef1f5',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 24,
  },
  title: {
    fontSize: 28,
    fontWeight: '600',
    marginBottom: 24,
  },
  button: {
    backgroundColor: '#007BFF',
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 6,
  },
  successButton: {
    marginTop: 16,
    backgroundColor: '#28a745',
  },
  buttonText: {
    color: '#ffffff',
    fontSize: 16,
  },
});
