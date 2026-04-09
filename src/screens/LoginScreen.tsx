import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Alert, ActivityIndicator } from 'react-native';
import auth from '@react-native-firebase/auth';
import { GoogleSignin } from '@react-native-google-signin/google-signin';

GoogleSignin.configure({ webClientId: process.env.GOOGLE_WEB_CLIENT_ID });

export function LoginScreen() {
  const [loading, setLoading] = useState(false);

  const signIn = async () => {
    setLoading(true);
    try {
      await GoogleSignin.hasPlayServices();
      const { idToken } = await GoogleSignin.signIn();
      await auth().signInWithCredential(auth.GoogleAuthProvider.credential(idToken));
    } catch (err) {
      Alert.alert('Sign-in failed', 'Could not sign in with Google. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={s.container}>
      <Text style={s.title}>Task Manager</Text>
      <Text style={s.sub}>Capture tasks instantly, sync everywhere</Text>
      {loading ? <ActivityIndicator size="large" /> : (
        <TouchableOpacity style={s.btn} onPress={signIn}>
          <Text style={s.btnText}>Sign in with Google</Text>
        </TouchableOpacity>
      )}
    </View>
  );
}

const s = StyleSheet.create({
  container: { flex: 1, alignItems: 'center', justifyContent: 'center', padding: 24 },
  title: { fontSize: 32, fontWeight: 'bold', marginBottom: 8 },
  sub: { fontSize: 16, color: '#666', marginBottom: 48, textAlign: 'center' },
  btn: { backgroundColor: '#4285F4', paddingHorizontal: 32, paddingVertical: 14, borderRadius: 8, width: '100%', alignItems: 'center' },
  btnText: { color: '#fff', fontSize: 16, fontWeight: '600' },
});
