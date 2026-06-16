type Toast = {
    id: number;
    type: "success" | "error";
    message: string;
};

let toasts: Toast[] = [];

const listeners = new Set<() => void>();

export const toastStore = {
    subscribe(listener: () => void) {
        listeners.add(listener);

        return () => listeners.delete(listener);
    },

    getSnapshot() {
        return toasts;
    },

    add(toast: Toast) {
        toasts = [...toasts, toast];

        listeners.forEach((listener) => listener());
    },

    remove(id: number) {
        toasts = toasts.filter((t) => t.id !== id);

        listeners.forEach((listener) => listener());
    },
};