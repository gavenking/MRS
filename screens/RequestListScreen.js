import React, { useEffect, useState, useContext } from 'react';
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  ActivityIndicator,
  TouchableOpacity,
} from 'react-native';
import { AuthContext } from '../contexts/AuthContext';
import { db } from '../firebase';
import { collection, query, where, getDocs, orderBy } from 'firebase/firestore';

export default function RequestListScreen({ navigation }) {
  const { user, role } = useContext(AuthContext);
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRequests = async () => {
      try {
        let q;
        if (role === 'admin') {
          q = query(collection(db, 'requests'), orderBy('timestamp', 'desc'));
        } else {
          q = query(
            collection(db, 'requests'),
            where('userId', '==', user.uid),
            orderBy('timestamp', 'desc')
          );
        }

        const snapshot = await getDocs(q);
        const data = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        setRequests(data);
      } catch (error) {
        console.error('Error fetching requests:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchRequests();
  }, [user, role]);

  if (loading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" color="#4a90e2" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {requests.length === 0 ? (
        <Text style={styles.emptyText}>No requests found.</Text>
      ) : (
        <FlatList
          data={requests}
          keyExtractor={item => item.id}
          renderItem={({ item }) => (
            <TouchableOpacity
              style={styles.card}
              onPress={() => navigation.navigate('RequestDetail', { request: item })}
            >
              <Text style={styles.title}>{item.title}</Text>
              <Text>{item.description}</Text>
              <Text style={styles.meta}>Status: {item.status}</Text>
            </TouchableOpacity>
          )}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, backgroundColor: '#f9f9f9' },
  center: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  emptyText: { textAlign: 'center', marginTop: 40, color: '#666' },
  card: {
    backgroundColor: '#fff',
    padding: 16,
    borderRadius: 8,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    elevation: 2,
  },
  title: { fontSize: 16, fontWeight: '600', marginBottom: 6 },
  meta: { marginTop: 8, color: '#888', fontSize: 12 },
});
