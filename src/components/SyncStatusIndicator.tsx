import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import type { SyncStatus } from '@noctilumina/task-manager-shared';

export function SyncStatusIndicator({ status }: { status: SyncStatus }) {
  if (status === 'idle') return null;
  return (
    <View style={[s.bar, status === 'error' ? s.error : s.syncing]}>
      <Text style={s.text}>{status === 'syncing' ? 'Syncing...' : 'Sync failed. Retrying...'}</Text>
    </View>
  );
}

const s = StyleSheet.create({
  bar: { padding: 6, alignItems: 'center' },
  syncing: { backgroundColor: '#E3F2FD' },
  error: { backgroundColor: '#FFEBEE' },
  text: { fontSize: 12, fontWeight: '500' },
});
