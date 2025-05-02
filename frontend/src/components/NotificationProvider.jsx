import { useNotificationStore } from '../service/notificationService';
import MDSnackbar from 'components/MDSnackbar';
import PropTypes from "prop-types";
import { SnackbarProvider } from 'notistack';
import {forwardRef} from "react";
import CloseIcon from "@mui/icons-material/Close";
import {Alert} from "@mui/material";
import Fade from "@mui/material/Fade";
import IconButton from "@mui/material/IconButton";
import Icon from "@mui/material/Icon";
import Snackbar from "@mui/material/Snackbar";
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