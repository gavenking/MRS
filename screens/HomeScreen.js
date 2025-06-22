import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { db } from '../firebase';
import { addDoc, collection } from 'firebase/firestore';

export default function HomeScreen({ navigation }) {

  const handleTestWrite = async () => {
    try {
      await addDoc(collection(db, 'requests'), {
        userId: 'testUser',
        message: 'Test Firestore Write',
        createdAt: new Date(),
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
        onPress={() => navigation.navigate('Admin Panel')}
      >
        <Text style={styles.buttonText}>Admin Panel</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={[styles.button, { marginTop: 16, backgroundColor: '#28a745' }]}
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
  buttonText: {
    color: '#ffffff',
    fontSize: 16,
  },
});
