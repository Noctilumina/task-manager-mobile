import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import type { Task } from '@noctilumina/task-manager-shared';

export function TaskCard({ task, onPress, onToggleComplete }: { task: Task; onPress: () => void; onToggleComplete: () => void }) {
  return (
    <TouchableOpacity style={[s.card, task.isFromCalendar && s.calCard]} onPress={onPress} activeOpacity={0.7}>
      <TouchableOpacity style={s.checkbox} onPress={onToggleComplete}>
        <Text style={s.check}>{task.isComplete ? '✓' : '○'}</Text>
      </TouchableOpacity>
      <View style={s.content}>
        <Text style={[s.title, task.isComplete && s.done]}>{task.title}</Text>
        {task.dueDate && <Text style={s.due}>{task.isFromCalendar ? '📅 ' : '🗓 '}{task.dueDate.toLocaleDateString()}</Text>}
        {task.isFromCalendar && <View style={s.badge}><Text style={s.badgeText}>Calendar</Text></View>}
      </View>
    </TouchableOpacity>
  );
}

const s = StyleSheet.create({
  card: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#fff', borderRadius: 8, padding: 12, marginBottom: 8, shadowColor: '#000', shadowOpacity: 0.05, shadowRadius: 4, elevation: 2 },
  calCard: { borderLeftWidth: 3, borderLeftColor: '#4285F4' },
  checkbox: { marginRight: 12 },
  check: { fontSize: 20, color: '#666' },
  content: { flex: 1 },
  title: { fontSize: 16, fontWeight: '500', color: '#1a1a1a' },
  done: { textDecorationLine: 'line-through', color: '#999' },
  due: { fontSize: 12, color: '#666', marginTop: 2 },
  badge: { marginTop: 4, backgroundColor: '#E8F0FE', borderRadius: 4, paddingHorizontal: 6, paddingVertical: 2, alignSelf: 'flex-start' },
  badgeText: { fontSize: 10, color: '#4285F4', fontWeight: '600' },
});
