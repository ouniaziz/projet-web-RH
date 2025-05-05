import { useNotificationStore } from '../service/notificationService';
import { SnackbarProvider } from 'notistack';
import {CustomNotification} from "./CustomComponents";



// eslint-disable-next-line react/prop-types
export const NotistackProvider = ({ children }) => {
    const setupSnackbar  = useNotificationStore((state)=>state.setupSnackbar);
    return (
        <SnackbarProvider
            maxSnack={3}
            anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
            ref={(provider) => {
                if (provider) {
                    setupSnackbar(provider.enqueueSnackbar, provider.closeSnackbar);
                }
            }}
            Components={{
                    success: CustomNotification,
                    error: CustomNotification,
                    info: CustomNotification
            }}
        >
            {children}
        </SnackbarProvider>
    );
};