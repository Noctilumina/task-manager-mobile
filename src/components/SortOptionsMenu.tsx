import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import type { SortBy } from '@noctilumina/task-manager-shared';

const OPTIONS: { label: string; value: SortBy }[] = [
  { label: 'Due date', value: 'dueDate' },
  { label: 'Created', value: 'createdAt' },
];

export function SortOptionsMenu({ current, onChange }: { current: SortBy; onChange: (s: SortBy) => void }) {
  return (
    <View style={s.row}>
      <Text style={s.label}>Sort by:</Text>
      {OPTIONS.map(o => (
        <TouchableOpacity key={o.value} style={[s.opt, current === o.value && s.active]} onPress={() => onChange(o.value)}>
          <Text style={[s.optText, current === o.value && s.activeText]}>{o.label}</Text>
        </TouchableOpacity>
      ))}
    </View>
  );
}

const s = StyleSheet.create({
  row: { flexDirection: 'row', alignItems: 'center', marginBottom: 12, gap: 8 },
  label: { fontSize: 13, color: '#666' },
  opt: { paddingHorizontal: 10, paddingVertical: 5, borderRadius: 16, backgroundColor: '#F5F5F5', borderWidth: 1, borderColor: '#E0E0E0' },
  active: { backgroundColor: '#1a1a1a', borderColor: '#1a1a1a' },
  optText: { fontSize: 13, color: '#333' },
  activeText: { color: '#fff' },
});
