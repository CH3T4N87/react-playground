import { useSyncExternalStore } from "react";
import { toastStore } from "./toastStore";

export default function ToastContainer() {
    const toasts = useSyncExternalStore(
        toastStore.subscribe,
        toastStore.getSnapshot
    );

    return (
        <div className="toast-container">
            {toasts.map((toast) => (
                <div key={toast.id}>
                    {toast.message}
                </div>
            ))}
        </div>
    );
}