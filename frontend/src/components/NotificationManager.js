import { useNotificationStore } from '../service/notificationService';
import MDSnackbar from 'components/MDSnackbar';
import {AnimatePresence, motion} from "framer-motion";

const getIconForType = (type) => {
    switch (type) {
        case 'success': return 'check';
        case 'error': return 'warning';
        case 'warning': return 'star';
        default: return 'notifications';
    }
};

export const NotificationManager = () => {
    const notifications = useNotificationStore((state) => state.notifications);
    const closeNotification = useNotificationStore((state) => state.closeNotification);

    return (
        <div style={{
            position: 'fixed',
            bottom: 20,
            right: 20,
            zIndex: 9999,
        }}>
            <AnimatePresence>
                {notifications.map((notification, index) => {
                    // Calculate vertical offset based on position in the stack
                    const offset = (notifications.length - 1 - index) * -70; // Adjust -70px per notification

                    return (
                        <motion.div
                            key={notification.id}
                            layout // Enables smooth layout transitions
                            initial={{ opacity: 0, y: 50, x: 0 }}
                            animate={{
                                opacity: 1,
                                y: offset, // Stack upward with negative margin
                                x: 0
                            }}
                            exit={{ opacity: 0, x: 100 }}
                            transition={{ type: "spring", damping: 25, stiffness: 300 }}
                            style={{
                                position: 'absolute',
                                bottom: 0,
                                right: 0,
                                width: 'auto', // Or set a fixed width
                            }}
                        >
                            <MDSnackbar
                                {...notification}
                                onClose={() => closeNotification(notification.id)}
                            />
                        </motion.div>
                    );
                })}
            </AnimatePresence>
        </div>
    );
};