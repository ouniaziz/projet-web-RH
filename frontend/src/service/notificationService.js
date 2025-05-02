import { create } from 'zustand';
import notifications from "../layouts/notifications";
import {useSnackbar} from "notistack";

export const useNotificationStore = create((set, get) => ({
    notifications: [],
    enqueueSnackbar: null,
    closeNotification: null,
    // Initialize notistack
    setupSnackbar: (enqueueFn, closeNotif) => set({ enqueueSnackbar: enqueueFn, closeNotification:closeNotif }),

    // Wrapper for showing notifications
    /* This is the PropTypes of notifications
    * notification:
    ** type: 'error' | "info" | "success",
    ** content: string,
    ** title: string,
    **/
    showNotification: (notification) => {
        const { enqueueSnackbar, notifications } = useNotificationStore.getState();
        set({
            notifications: [...notifications, notification]
        });

        if (enqueueSnackbar) {
            enqueueSnackbar(notification.content, {
                variant: notification.type || 'default',
                autoHideDuration: null, // Persistent until clicked
                anchorOrigin: {
                    vertical: 'bottom',
                    horizontal: 'right',
                },
                title: notification.title
            });
        }
    },

    /* This is the PropTypes of notifications
    * notification:
    ** type: 'error' | "info" | "success",
    ** content: string,
    ** title: string,
    **/
    showFloatingNotification: (notification) => {
        const { enqueueSnackbar} = useNotificationStore.getState();

        if (enqueueSnackbar) {
            enqueueSnackbar(notification.content, {
                variant: notification.type || 'default',
                autoHideDuration: null, // Persistent until clicked
                anchorOrigin: {
                    vertical: 'bottom',
                    horizontal: 'right',
                },
                title: notification.title
            });
        }
    },

    removeNotification: (index)=>{
        const {notifications} = useNotificationStore.getState()
        set({
            notifications: notifications.filter((_, i) => i!==index)
        })
    },

    clearAll: ()=>{
        set({
            notifications: []
        })
    }
}));