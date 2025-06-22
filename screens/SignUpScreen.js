import React, { useState, useContext } from 'react';
import { View, Text, TextInput, Button, Alert, StyleSheet } from 'react-native';
import { AuthContext } from '../contexts/AuthContext';
import { auth, db } from '../firebase';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { doc, setDoc, serverTimestamp } from 'firebase/firestore';

export default function SignUpScreen({ navigation }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { setUser, setRole } = useContext(AuthContext);

  const handleSignUp = async () => {
    const trimmedEmail = email.trim().toLowerCase();

    if (!trimmedEmail || !password) {
      Alert.alert('Missing Info', 'Please enter both email and password.');
      return;
    }

    if (password.length < 6) {
      Alert.alert('Weak Password', 'Password must be at least 6 characters.');
      return;
    }

    try {
      const result = await createUserWithEmailAndPassword(auth, trimmedEmail, password);
      const user = result.user;

      await setDoc(doc(db, 'users', user.uid), {
        email: trimmedEmail,
        role: 'user',
        createdAt: serverTimestamp(), // better for Firestore queries
      });

      setUser(user);
      setRole('user');
      Alert.alert('Signup successful');
      navigation.navigate('Home');
    } catch (error) {
      console.error('Signup error:', error);
      Alert.alert('Signup failed', error.message);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Sign Up</Text>
      <TextInput
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        autoCapitalize="none"
        keyboardType="email-address"
        style={styles.input}
      />
      <TextInput
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
        style={styles.input}
      />
      <Button title="Sign Up" onPress={handleSignUp} />
      <Text style={styles.switchText} onPress={() => navigation.navigate('Login')}>
        Already have an account? Login
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', padding: 24, backgroundColor: '#eef1f5' },
  title: { fontSize: 28, textAlign: 'center', marginBottom: 24 },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 12,
    marginBottom: 16,
    borderRadius: 6,
    backgroundColor: '#fff',
  },
  switchText: {
    marginTop: 16,
    textAlign: 'center',
    color: 'blue',
  },
});
