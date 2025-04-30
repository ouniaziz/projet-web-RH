import { create } from 'zustand';

export const useNotificationStore = create((set) => ({
    notifications: [],

    // Show a new notification
    showNotification: (notification) => {
        const id = Date.now();
        set((state) => ({
            notifications: [...state.notifications, { ...notification, id, open: true }],
        }));

       /* // Auto-close after 5 seconds
        setTimeout(() => {
            useNotificationStore.getState().closeNotification(id);
        }, 5000);*/
    },

    // Close a notification by ID
    closeNotification: (id) => {
        set((state) => ({
            notifications: state.notifications.map((notif) =>
                notif.id === id ? { ...notif, open: false } : notif
            ),
        }));

        /*// Remove from state after fade-out
        setTimeout(() => {
            set((state) => ({
                notifications: state.notifications.filter((notif) => notif.id !== id),
            }));
        }, 300);*/
    },
}));