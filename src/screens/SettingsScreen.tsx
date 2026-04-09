import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, SafeAreaView, Alert } from 'react-native';
import auth from '@react-native-firebase/auth';
import type { StackNavigationProp } from '@react-navigation/stack';
import type { RootStackParamList } from '../navigation/AppNavigator';

export function SettingsScreen({ navigation }: { navigation: StackNavigationProp<RootStackParamList, 'Settings'> }) {
  const signOut = () => Alert.alert('Sign out?', undefined, [
    { text: 'Cancel' },
    { text: 'Sign out', style: 'destructive', onPress: () => auth().signOut() },
  ]);

  return (
    <SafeAreaView style={s.container}>
      <View style={s.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}><Text style={s.back}>← Back</Text></TouchableOpacity>
        <Text style={s.title}>Settings</Text>
      </View>
      <View style={s.section}>
        <Text style={s.sectionTitle}>Account</Text>
        <TouchableOpacity style={s.row} onPress={signOut}>
          <Text style={s.rowText}>Sign out</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const s = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F9F9F9' },
  header: { flexDirection: 'row', alignItems: 'center', padding: 16, borderBottomWidth: 1, borderBottomColor: '#eee', gap: 12 },
  back: { fontSize: 16 },
  title: { fontSize: 20, fontWeight: 'bold' },
  section: { padding: 16 },
  sectionTitle: { fontSize: 12, color: '#999', textTransform: 'uppercase', marginBottom: 8 },
  row: { backgroundColor: '#fff', padding: 14, borderRadius: 8, borderWidth: 1, borderColor: '#eee' },
  rowText: { fontSize: 16, color: '#D32F2F' },
});
