import { useSnackbarStore, type SnackItem } from './useSnackbar';

function SnackBar({ item }: { item: SnackItem }) {
  return (
    <div role="status" aria-live="polite">
      {item.message}
    </div>
  );
}

export function SnackbarContainer() {
  const snacks = useSnackbarStore();

  return (
    <div>
      {snacks.map(item => (
        <SnackBar key={item.id} item={item} />
      ))}
    </div>
  );
}