import { toastStore } from "./toastStore";

export const toast = {
    success(message: string) {
        const id = Date.now();

        toastStore.add({
            id,
            type: "success",
            message,
        });

        setTimeout(() => {
            toastStore.remove(id);
        }, 3000);
    },

    error(message: string) {
        const id = Date.now();

        toastStore.add({
            id,
            type: "error",
            message,
        });

        setTimeout(() => {
            toastStore.remove(id);
        }, 3000);
    },
};