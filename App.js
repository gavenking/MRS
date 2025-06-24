// App.js
import React, { useContext } from 'react';
import { ActivityIndicator, View, StyleSheet } from 'react-native';
import { NavigationContainer }             from '@react-navigation/native';
import { createNativeStackNavigator }      from '@react-navigation/native-stack';

import { AuthProvider, AuthContext } from './contexts/AuthContext';

// Screens
import LoginScreen           from './screens/LoginScreen';
import SignUpScreen          from './screens/SignUpScreen';
import HomeScreen            from './screens/HomeScreen';
import SubmitRequestScreen   from './screens/SubmitRequestScreen';
import RequestListScreen     from './screens/RequestListScreen';
import RequestDetailScreen   from './screens/RequestDetailScreen';
import AdminPanelScreen      from './screens/AdminPanelScreen';
import ManageUsersScreen     from './screens/ManageUsersScreen';
import SystemSettingsScreen  from './screens/SystemSettingsScreen';

const Stack = createNativeStackNavigator();

function AppNavigation() {
  const { user, loading } = useContext(AuthContext);

  if (loading) {
    return (
      <View style={styles.loader}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      {user ? (
        <>
          <Stack.Screen name="Home"            component={HomeScreen} />
          <Stack.Screen name="SubmitRequest"   component={SubmitRequestScreen} />
          <Stack.Screen name="RequestList"     component={RequestListScreen} />
          <Stack.Screen name="RequestDetail"   component={RequestDetailScreen} />
          <Stack.Screen name="AdminPanel"      component={AdminPanelScreen} />
          <Stack.Screen name="ManageUsers"     component={ManageUsersScreen} />
          <Stack.Screen name="SystemSettings"  component={SystemSettingsScreen} />
        </>
      ) : (
        <>
          <Stack.Screen name="Login" component={LoginScreen} />
          <Stack.Screen name="SignUp" component={SignUpScreen} />
        </>
      )}
    </Stack.Navigator>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <NavigationContainer>
        <AppNavigation />
      </NavigationContainer>
    </AuthProvider>
  );
}

const styles = StyleSheet.create({
  loader: {
    flex: 1,
    justifyContent: 'center',
    alignItems:   'center',
  },
});
