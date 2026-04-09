import { useState, useEffect } from 'react';
import { SyncService, FirebaseTaskRepository, type SyncStatus } from '@noctilumina/task-manager-shared';

const repo = new FirebaseTaskRepository();
const syncService = new SyncService(repo, repo);

export function useSync(userId: string) {
  const [status, setStatus] = useState<SyncStatus>('idle');
  useEffect(() => syncService.onStatusChange(setStatus), []);
  const triggerSync = () => syncService.sync(userId).catch(console.error);
  return { status, triggerSync };
}
