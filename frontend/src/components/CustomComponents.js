import {styled} from "@mui/material/styles";
import {Button, CircularProgress, InputLabel, OutlinedInput, TextField} from "@mui/material";
import React from "react";

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


export {IsimmButton, SuccessTextField, SuccessOutlinedInput, SuccessInputLabel}