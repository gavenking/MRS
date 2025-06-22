import React, { useState, useContext } from 'react';
import { View, Text, TextInput, Button, Alert, StyleSheet } from 'react-native';
import { AuthContext } from '../contexts/AuthContext';
import { db } from '../firebase';
import { doc, getDoc } from 'firebase/firestore';

export default function LoginScreen({ navigation }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { setUser, setRole } = useContext(AuthContext);

  const handleLogin = async () => {
    if (!email || !password) {
      Alert.alert('Missing Fields', 'Please enter both email and password.');
      return;
    }

    try {
      // Dynamically import Auth to ensure it's registered under Hermes
      const { getAuth, signInWithEmailAndPassword } = await import('firebase/auth');
      const auth = getAuth();

      const result = await signInWithEmailAndPassword(auth, email, password);
      const user = result.user;

      setUser(user);

      const userDoc = await getDoc(doc(db, 'users', user.uid));
      setRole(userDoc.exists() ? userDoc.data().role : 'user');

      navigation.navigate('Home');

    } catch (error) {
      console.error('Login error:', error);
      Alert.alert('Login failed', error.message);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Login</Text>
      <TextInput
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        style={styles.input}
        autoCapitalize="none"
        keyboardType="email-address"
      />
      <TextInput
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
        style={styles.input}
      />
      <Button title="Login" onPress={handleLogin} />
      <Text style={styles.switchText} onPress={() => navigation.navigate('SignUp')}>
        Don’t have an account? Sign up
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 24,
    backgroundColor: '#f9f9f9',
  },
  title: {
    fontSize: 28,
    textAlign: 'center',
    marginBottom: 24,
    color: '#333',
  },
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
