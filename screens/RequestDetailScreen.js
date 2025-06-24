// screens/RequestDetailScreen.js
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function RequestDetailScreen({ route }) {
  const { request } = route.params;

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Request Details</Text>
      
      <View style={styles.card}>
        <Text style={styles.label}>Title:</Text>
        <Text style={styles.value}>{request.title || 'No Title'}</Text>

        <Text style={styles.label}>Description:</Text>
        <Text style={styles.value}>{request.description || 'No Description'}</Text>

        <Text style={styles.label}>Submitted By:</Text>
        <Text style={styles.value}>{request.userId || 'Unknown'}</Text>

        <Text style={styles.label}>Status:</Text>
        <Text
          style={
            request.status === 'pending'
              ? styles.valuePending
              : styles.value
          }
        >
          {request.status}
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f7f9fc',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  title: {
    fontSize: 26,
    fontWeight: '600',
    marginBottom: 30,
    color: '#333',
  },
  card: {
    backgroundColor: '#ffffff',
    padding: 20,
    borderRadius: 12,
    width: '90%',
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 6,
    elevation: 4,
  },
  label: {
    fontSize: 14,
    fontWeight: 'bold',
    marginTop: 10,
    color: '#555',
  },
  value: {
    fontSize: 16,
    color: '#000',
  },
  valuePending: {
    fontSize: 16,
    color: '#e67e22',
    fontWeight: 'bold',
  },
});
