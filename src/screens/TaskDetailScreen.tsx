import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, SafeAreaView, Alert } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import type { StackNavigationProp } from '@react-navigation/stack';
import type { RouteProp } from '@react-navigation/native';
import { TaskService, FirebaseTaskRepository, CalendarService } from '@noctilumina/task-manager-shared';
import type { RootStackParamList } from '../navigation/AppNavigator';

const service = new TaskService(new FirebaseTaskRepository());
const calendarService = new CalendarService();

type Props = {
  navigation: StackNavigationProp<RootStackParamList, 'TaskDetail'>;
  route: RouteProp<RootStackParamList, 'TaskDetail'>;
};

export function TaskDetailScreen({ navigation, route }: Props) {
  const { userId, taskId } = route.params;
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [dueDate, setDueDate] = useState<Date | undefined>(undefined);
  const [showPicker, setShowPicker] = useState(false);

  useEffect(() => {
    if (taskId) {
      service.getTasks(userId, 'createdAt').then(tasks => {
        const t = tasks.find(t => t.id === taskId);
        if (t) { setTitle(t.title); setDescription(t.description ?? ''); setDueDate(t.dueDate); }
      });
    }
  }, [taskId, userId]);

  const save = async () => {
    if (!title.trim()) { Alert.alert('Title required'); return; }
    try {
      if (!taskId) {
        const task = await service.createTask(userId, { title, description, dueDate });
        if (dueDate) await calendarService.pushTaskToCalendar(userId, task);
      } else {
        await service.updateTask(userId, taskId, { title, description, dueDate });
      }
      navigation.goBack();
    } catch { Alert.alert('Error', 'Could not save task.'); }
  };

  const remove = () => Alert.alert('Delete task?', undefined, [
    { text: 'Cancel' },
    { text: 'Delete', style: 'destructive', onPress: async () => { await service.deleteTask(userId, taskId!); navigation.goBack(); } },
  ]);

  return (
    <SafeAreaView style={s.container}>
      <View style={s.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}><Text style={s.back}>← Back</Text></TouchableOpacity>
        {taskId && <TouchableOpacity onPress={remove}><Text style={s.del}>Delete</Text></TouchableOpacity>}
      </View>
      <View style={s.form}>
        <TextInput style={s.titleInput} value={title} onChangeText={setTitle} placeholder="Task title" autoFocus={!taskId} />
        <TextInput style={s.descInput} value={description} onChangeText={setDescription} placeholder="Description (optional)" multiline />
        <TouchableOpacity style={s.dateRow} onPress={() => setShowPicker(true)}>
          <Text style={s.dateLabel}>Due date: </Text>
          <Text style={s.dateVal}>{dueDate ? dueDate.toLocaleDateString() : 'None'}</Text>
        </TouchableOpacity>
        {showPicker && <DateTimePicker value={dueDate ?? new Date()} mode="date" onChange={(_, d) => { setShowPicker(false); setDueDate(d); }} />}
        <TouchableOpacity style={s.saveBtn} onPress={save}>
          <Text style={s.saveText}>{!taskId ? 'Add Task' : 'Save Changes'}</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const s = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },
  header: { flexDirection: 'row', justifyContent: 'space-between', padding: 16, borderBottomWidth: 1, borderBottomColor: '#eee' },
  back: { fontSize: 16 },
  del: { fontSize: 16, color: '#D32F2F' },
  form: { padding: 16 },
  titleInput: { fontSize: 22, fontWeight: '600', marginBottom: 12 },
  descInput: { fontSize: 16, color: '#333', marginBottom: 16, minHeight: 60 },
  dateRow: { flexDirection: 'row', alignItems: 'center', marginBottom: 24 },
  dateLabel: { fontSize: 16, color: '#666' },
  dateVal: { fontSize: 16, fontWeight: '500' },
  saveBtn: { backgroundColor: '#1a1a1a', borderRadius: 8, paddingVertical: 14, alignItems: 'center' },
  saveText: { color: '#fff', fontSize: 16, fontWeight: '600' },
});
