// screens/SubmitRequestScreen.js
import React, { useState, useContext } from 'react';
import {
  View,
  Text,
  TextInput,
  Button,
  Alert,
  StyleSheet
} from 'react-native';
import { AuthContext } from '../contexts/AuthContext';
import app from '../firebaseConfig';

export default function SubmitRequestScreen({ navigation }) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const { user } = useContext(AuthContext);

  const handleSubmit = async () => {
    const trimmedTitle = title.trim();
    const trimmedDescription = description.trim();

    if (!trimmedTitle || !trimmedDescription) {
      Alert.alert('Missing Fields', 'Please fill out all fields.');
      return;
    }

    try {
      // Dynamic import of Firestore for Hermes compatibility
      const {
        getFirestore,
        collection,
        addDoc,
        serverTimestamp
      } = await import('firebase/firestore');
      const db = getFirestore(app);

      await addDoc(collection(db, 'requests'), {
        userId: user.uid,
        title: trimmedTitle,
        description: trimmedDescription,
        timestamp: serverTimestamp(),
        status: 'pending',
      });

      Alert.alert('Success', 'Your request has been submitted.');
      setTitle('');
      setDescription('');
      navigation.goBack();
    } catch (error) {
      console.error('Error submitting request:', error);
      Alert.alert('Error', 'Could not submit request.');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Submit Maintenance Request</Text>
      <TextInput
        placeholder="Title"
        value={title}
        onChangeText={setTitle}
        style={styles.input}
      />
      <TextInput
        placeholder="Description"
        value={description}
        onChangeText={setDescription}
        multiline
        numberOfLines={4}
        style={[styles.input, { height: 100 }]}
      />
      <Button title="Submit" onPress={handleSubmit} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 24, backgroundColor: '#f9f9f9' },
  title: { fontSize: 22, marginBottom: 16, textAlign: 'center' },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 6,
    padding: 12,
    marginBottom: 16,
    backgroundColor: '#fff',
  },
});
