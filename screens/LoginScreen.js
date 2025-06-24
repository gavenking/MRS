// screens/LoginScreen.js
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

export default function LoginScreen({ navigation }) {
  const [email, setEmail]       = useState('');
  const [password, setPassword] = useState('');
  const { login }               = useContext(AuthContext);

  const handleLogin = async () => {
    if (!email || !password) {
      Alert.alert('Missing Fields', 'Please enter both email and password.');
      return;
    }
    try {
      // 1) Sign in via AuthContext
      const { user } = await login(email.trim(), password);

      // 2) Dynamically import Firestore and fetch user role
      const {
        getFirestore,
        doc,
        getDoc
      } = await import('firebase/firestore');
      const db = getFirestore(app);
      const userDoc = await getDoc(doc(db, 'users', user.uid));
      const role = userDoc.exists() ? userDoc.data().role : 'user';

      // 3) Navigate into authenticated stack
      navigation.replace('Home', { role });

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

      <Button title="Log In" onPress={handleLogin} />

      <Text
        style={styles.switchText}
        onPress={() => navigation.navigate('SignUp')}
      >
        Don't have an account? Sign Up
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', padding: 24, backgroundColor: '#f9f9f9' },
  title:     { fontSize: 28, textAlign: 'center', marginBottom: 24, color: '#333' },
  input:     { borderWidth: 1, borderColor: '#ccc', padding: 12, marginBottom: 16, borderRadius: 6, backgroundColor: '#fff' },
  switchText:{ marginTop: 16, textAlign: 'center', color: 'blue' },
});
