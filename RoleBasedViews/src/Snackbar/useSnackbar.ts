import { useSyncExternalStore } from 'react';

export type SnackType = 'success' | 'error';

export interface SnackItem {
  id: string;
  message: string;
  type: SnackType;
}

type Listener = () => void;

const listeners = new Set<Listener>();
let snapshot: SnackItem[] = [];  

const subscribe = (listener: Listener): (() => void) => {
  listeners.add(listener);
  return () => listeners.delete(listener);
};

const getSnapshot = (): SnackItem[] => snapshot;


const notify = () => {
  snapshot = [...snapshot]; 
  listeners.forEach(l => l());
};

const DURATION = 3500; 

export const snack = (message: string, type: SnackType = 'success') => {
  const id = `snack-${Date.now()}-${Math.random().toString(36).slice(2, 6)}`;
  snapshot = [...snapshot, { id, message, type }];
  notify();

  setTimeout(() => {
    snapshot = snapshot.filter(s => s.id !== id);
    notify();
  }, DURATION);
};

snack.success = (message: string) => snack(message, 'success');
snack.error = (message: string) => snack(message, 'error');

// react-toastify does exactly this in src/hooks/useToastContainer.ts:
//   const snapshot = useSyncExternalStore(subscribe, getSnapshot, getSnapshot)

export const useSnackbarStore = (): SnackItem[] => useSyncExternalStore(subscribe, getSnapshot, getSnapshot);
