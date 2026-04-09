import { useState, useEffect, useCallback } from 'react';
import { TaskService, FirebaseTaskRepository, type Task, type SortBy } from '@noctilumina/task-manager-shared';

const service = new TaskService(new FirebaseTaskRepository());

export function useTasks(userId: string, sortBy: SortBy) {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setLoading(true);
    return service.subscribeToTasks(userId, t => { setTasks(t); setLoading(false); });
  }, [userId, sortBy]);

  const createTask = useCallback(async (title: string, dueDate?: Date) => {
    try { await service.createTask(userId, { title, dueDate }); }
    catch { setError('Failed to create task.'); }
  }, [userId]);

  const toggleComplete = useCallback(async (taskId: string) => {
    const task = tasks.find(t => t.id === taskId);
    if (!task) return;
    try { await service.updateTask(userId, taskId, { isComplete: !task.isComplete }); }
    catch { setError('Failed to update task.'); }
  }, [userId, tasks]);

  const deleteTask = useCallback(async (taskId: string) => {
    try { await service.deleteTask(userId, taskId); }
    catch { setError('Failed to delete task.'); }
  }, [userId]);

  return { tasks, loading, error, createTask, toggleComplete, deleteTask };
}
