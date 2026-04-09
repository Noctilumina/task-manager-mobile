import React, { useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import auth, { type FirebaseAuthTypes } from '@react-native-firebase/auth';
import { AppNavigator } from './navigation/AppNavigator';
import './firebase.config';

export default function App() {
  const [user, setUser] = useState<FirebaseAuthTypes.User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    return auth().onAuthStateChanged(u => { setUser(u); setLoading(false); });
  }, []);

  if (loading) return null;

  return (
    <NavigationContainer>
      <AppNavigator isAuthenticated={!!user} userId={user?.uid ?? null} />
    </NavigationContainer>
  );
}
