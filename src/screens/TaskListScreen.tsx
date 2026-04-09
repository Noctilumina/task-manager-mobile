import React, { useState } from 'react';
import { View, FlatList, Text, TouchableOpacity, StyleSheet, SafeAreaView } from 'react-native';
import type { StackNavigationProp } from '@react-navigation/stack';
import type { RouteProp } from '@react-navigation/native';
import type { SortBy } from '@noctilumina/task-manager-shared';
import type { RootStackParamList } from '../navigation/AppNavigator';
import { useTasks } from '../hooks/useTasks';
import { useSync } from '../hooks/useSync';
import { TaskCard } from '../components/TaskCard';
import { TaskInput } from '../components/TaskInput';
import { SortOptionsMenu } from '../components/SortOptionsMenu';
import { SyncStatusIndicator } from '../components/SyncStatusIndicator';

type Props = {
  navigation: StackNavigationProp<RootStackParamList, 'TaskList'>;
  route: RouteProp<RootStackParamList, 'TaskList'>;
};

export function TaskListScreen({ navigation, route }: Props) {
  const { userId } = route.params;
  const [sortBy, setSortBy] = useState<SortBy>('dueDate');
  const { tasks, loading, error, createTask, toggleComplete } = useTasks(userId, sortBy);
  const { status } = useSync(userId);

  return (
    <SafeAreaView style={s.container}>
      <SyncStatusIndicator status={status} />
      <View style={s.header}>
        <Text style={s.title}>My Tasks</Text>
        <TouchableOpacity onPress={() => navigation.navigate('Settings', { userId })}>
          <Text style={s.gear}>⚙️</Text>
        </TouchableOpacity>
      </View>
      <View style={s.content}>
        <TaskInput onSubmit={createTask} />
        <SortOptionsMenu current={sortBy} onChange={setSortBy} />
        {error && <Text style={s.error}>{error}</Text>}
        <FlatList
          data={tasks}
          keyExtractor={t => t.id}
          renderItem={({ item }) => (
            <TaskCard task={item}
              onPress={() => navigation.navigate('TaskDetail', { userId, taskId: item.id })}
              onToggleComplete={() => toggleComplete(item.id)} />
          )}
          ListEmptyComponent={!loading ? <Text style={s.empty}>No tasks yet. Add one above!</Text> : null}
        />
      </View>
    </SafeAreaView>
  );
}

const s = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F9F9F9' },
  header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: 16, paddingVertical: 12 },
  title: { fontSize: 28, fontWeight: 'bold' },
  gear: { fontSize: 22 },
  content: { flex: 1, paddingHorizontal: 16 },
  error: { color: '#D32F2F', fontSize: 13, marginBottom: 8 },
  empty: { textAlign: 'center', color: '#999', marginTop: 40, fontSize: 16 },
});
