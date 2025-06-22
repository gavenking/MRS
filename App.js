// App.js
import React, { useContext } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { AuthProvider, AuthContext } from './contexts/AuthContext';

import LoginScreen from './screens/LoginScreen';
import SignUpScreen from './screens/SignUpScreen';
import HomeScreen from './screens/HomeScreen';
import SubmitRequestScreen from './screens/SubmitRequestScreen';
import RequestListScreen from './screens/RequestListScreen';
import AdminPanelScreen from './screens/AdminPanelScreen';

const Stack = createNativeStackNavigator();

function AppNavigation() {
  const { user } = useContext(AuthContext);

  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      {user ? (
        <>
          <Stack.Screen name="Home" component={HomeScreen} />
          <Stack.Screen name="Submit Request" component={SubmitRequestScreen} />
          <Stack.Screen name="Request List" component={RequestListScreen} />
          <Stack.Screen name="Admin Panel" component={AdminPanelScreen} />
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
