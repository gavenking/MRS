import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Switch, Alert } from 'react-native';
import { db } from '../firebase';
import { doc, getDoc, setDoc } from 'firebase/firestore';

export default function SystemSettingsScreen() {
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);
  const [maintenanceMode, setMaintenanceMode] = useState(false);
  const [loading, setLoading] = useState(true);

  const settingsRef = doc(db, 'settings', 'system');

  useEffect(() => {
    const loadSettings = async () => {
      try {
        const snapshot = await getDoc(settingsRef);
        if (snapshot.exists()) {
          const data = snapshot.data();
          setNotificationsEnabled(data.notificationsEnabled ?? true);
          setMaintenanceMode(data.maintenanceMode ?? false);
        }
      } catch (error) {
        console.error('Failed to load settings:', error);
        Alert.alert('Error', 'Could not load settings.');
      } finally {
        setLoading(false);
      }
    };

    loadSettings();
  }, []);

  const updateSetting = async (field, value) => {
    try {
      await setDoc(
        settingsRef,
        { [field]: value },
        { merge: true } // don't overwrite other fields
      );
    } catch (error) {
      console.error(`Failed to update ${field}:`, error);
      Alert.alert('Error', `Could not update ${field} setting.`);
    }
  };

  const handleToggleNotifications = (value) => {
    setNotificationsEnabled(value);
    updateSetting('notificationsEnabled', value);
  };

  const handleToggleMaintenance = (value) => {
    setMaintenanceMode(value);
    updateSetting('maintenanceMode', value);
  };

  if (loading) return null;

  return (
    <View style={styles.container}>
      <Text style={styles.title}>System Settings</Text>

      <View style={styles.settingRow}>
        <Text style={styles.settingText}>Enable Notifications</Text>
        <Switch value={notificationsEnabled} onValueChange={handleToggleNotifications} />
      </View>

      <View style={styles.settingRow}>
        <Text style={styles.settingText}>Maintenance Mode</Text>
        <Switch value={maintenanceMode} onValueChange={handleToggleMaintenance} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f2f4f7',
    padding: 24,
  },
  title: {
    fontSize: 26,
    fontWeight: '600',
    color: '#333',
    marginBottom: 30,
    textAlign: 'center',
  },
  settingRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#fff',
    padding: 16,
    marginBottom: 16,
    borderRadius: 10,
    elevation: 2,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
  },
  settingText: {
    fontSize: 16,
    color: '#333',
  },
});
