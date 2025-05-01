import {styled} from "@mui/material/styles";
import {Alert, AlertTitle, Button, CircularProgress, InputLabel, OutlinedInput, TextField} from "@mui/material";
import React, {forwardRef} from "react";
import {useNotificationStore} from "../service/notificationService";

const isimm_main = "#115eee"
const isimm_dark = "#0a4bc4"
const isimm_text = "#fff"

const SuccessOutlinedInput = styled(({ success, ...props }) => (
    <OutlinedInput {...props} />
))(({ theme, success }) => ({
    '& .MuiOutlinedInput-notchedOutline': {
        borderWidth: success? '2px' : '1px',  // Thicker border when valid
        borderColor: success? theme.palette.success.main : undefined,
    },
    '&:hover .MuiOutlinedInput-notchedOutline': {
        borderWidth: success ? '2px' : '1px',
        borderColor: success ? theme.palette.success.main : undefined,
    },
    '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
        borderWidth: '2px',
        borderColor: success ? theme.palette.success.main: theme.palette.error.main,
    },
}));
const SuccessTextField = styled(({ success, ...props }) => (
    <TextField {...props} />
))(({ theme, success }) => ({
    '& .MuiOutlinedInput-root': {
        '& fieldset': {
            borderWidth: success ? '2px' : '1px',
            borderColor: success ? theme.palette.success.main : undefined,
        },
        '&:hover fieldset': {
            borderWidth: success ? '2px' : '1px',
            borderColor: success ? theme.palette.success.main : undefined,
        },
        '&.Mui-focused fieldset': {
            borderWidth: '2px',
            borderColor: success ? theme.palette.success.main : undefined,
        },
    },
    '& .MuiInputLabel-root': {
        color: success ? theme.palette.success.main : undefined,
        '&.Mui-focused': {
            color: success ? theme.palette.success.main :undefined,
        }
    }
}));
const SuccessInputLabel = styled(({ success, ...props }) => (
    <InputLabel {...props} />
))(({ theme, success }) => ({
    '&.MuiInputLabel-root': {
        color: success ? theme.palette.success.main : undefined,
        '&.Mui-focused': {
            color: success ? theme.palette.success.main : theme.palette.error.main,
        }
    }
}));


const IsimmButton = styled(({ loading, children, ...props }) => (
    <Button {...props}>
        {loading ? (
            <CircularProgress size={24} color="inherit" />
        ) : (
            children
        )}
    </Button>
))(({ theme }) => ({
    backgroundColor: isimm_main,
    color: isimm_text,
    padding: '10px 24px',
    borderRadius: '8px',
    fontWeight: 600,
    textTransform: 'none',

    '&:hover': {
        backgroundColor: isimm_dark,
        boxShadow: '0 4px 12px rgba(17, 94, 238, 0.3)',
    },

    '&.Mui-disabled': {
        backgroundColor: 'rgba(17, 94, 238, 0.5)',
        color: 'rgba(255, 255, 255, 0.7)',
    },

    // Ripple effect color
    '& .MuiTouchRipple-root': {
        color: 'rgba(255, 255, 255, 0.5)',
    },
}));

const StyledAlert = styled(Alert)(({ theme, severity }) => ({
    width: '360px',
    borderRadius: '12px',
    boxShadow: theme.shadows[4],
    borderLeft: `6px solid ${theme.palette[severity].dark}`,
    borderBottomLeftRadius: "25px",
    borderTopLeftRadius: "25px",
    backgroundColor: theme.palette.background.paper,
    color: theme.palette.text.primary,
    padding: theme.spacing(1.5, 2),
    marginBottom: theme.spacing(1.5),
    backdropFilter: 'blur(4px)',
    overflow: 'hidden',
    position: 'relative',

    '&:hover': {
        boxShadow: theme.shadows[8],
    },

    '&::before': {
        content: '""',
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        height: '3px',
        background: `linear-gradient(90deg, ${theme.palette[severity].dark}, transparent)`,
        opacity: 0.2,
    },

    '& .MuiAlert-icon': {
        fontSize: '28px',
        padding: theme.spacing(0.5),
        marginRight: theme.spacing(1.5),
        color: theme.palette[severity].dark,
    },

    '& .MuiAlert-message': {
        padding: theme.spacing(0.5, 0),
        width: '100%',
    },

    '& .MuiAlert-action': {
        paddingLeft: theme.spacing(2),
        alignItems: 'flex-start',
        '& button': {
            transition: 'all 0.2s ease',
            '&:hover': {
                backgroundColor: theme.palette.action.hover,
                transform: 'scale(1.1)',
            },
        },
    },
}));

const StyledAlertTitle = styled(AlertTitle)(({ theme, severity }) => ({
    fontWeight: 600,
    marginBottom: theme.spacing(0.5),
    letterSpacing: '0.3px',
    color: theme.palette[severity].dark,
}));

// eslint-disable-next-line react/prop-types
const CustomNotification = forwardRef(({ id, title, message, variant }, ref) => {
    const closeNotification = useNotificationStore((state) => state.closeNotification);

    return (
        <StyledAlert
            ref={ref}
            key={id}
            severity={variant}
            onClose={() => closeNotification(id)}
        >
            {title && <StyledAlertTitle severity={variant}>{title}</StyledAlertTitle>}
            {message}
        </StyledAlert>
    );
});

export {CustomNotification, IsimmButton, SuccessTextField, SuccessOutlinedInput, SuccessInputLabel}