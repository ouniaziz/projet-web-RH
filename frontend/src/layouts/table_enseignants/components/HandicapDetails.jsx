import {useState} from "react";
import styles from "../assets/addModalStyle.module.css"
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogActions from '@mui/material/DialogActions';
import Button from '@mui/material/Button';
import Autocomplete, { createFilterOptions } from '@mui/material/Autocomplete';
import PropTypes from "prop-types";
import MenuItem from "@mui/material/MenuItem";
import {PlusIcon} from "lucide-react";

const filter = createFilterOptions();

HandicapAutoComplete.propTypes={
    value: PropTypes.any,
    setValue: PropTypes.func.isRequired,
    toggleOpen: PropTypes.func.isRequired,
    setDialogValue: PropTypes.func.isRequired,
    handicaps: PropTypes.array.isRequired,
    open: PropTypes.bool.isRequired,
    handleClose: PropTypes.func.isRequired,
    handleDialogSubmit: PropTypes.func.isRequired,
    dialogValue: PropTypes.object.isRequired
}
const handicaps=[
    {
        handicapName: "Motor impairement",
        handicapDesc: "You can't move, can you?",
    },
    {
        handicapName: "Speech impairement",
        handicapDesc: "You can't speak properly, can you?",
    },
    {
        handicapName: "Missing hand",
        handicapDesc: "High five!.... WAIT!",
    }
]
function HandicapAutoComplete({ value, setValue, toggleOpen,setDialogValue, handicaps,dialogValue, handleDialogSubmit, handleClose, open}){
    return(
        <>
            <Autocomplete
                className={styles.span2}
                value={value}
                onChange={(event, newValue) => {
                    if (typeof newValue === 'string') {
                        // timeout to avoid instant validation of the dialog's form.
                        setTimeout(() => {
                            toggleOpen(true);
                            setDialogValue({
                                handicapName: newValue,
                                handicapDesc: '',
                            });
                        });
                    } else if (newValue && newValue.inputValue) {
                        toggleOpen(true);
                        setDialogValue({
                            handicapName: newValue.inputValue,
                            handicapDesc: '',
                        });
                    } else {
                        setValue(newValue);
                    }
                }}
                filterOptions={(options, params) => {
                    const filtered = filter(options, params);

                    if (params.inputValue !== '') {
                        filtered.push({
                            inputValue: params.inputValue,
                            handicapName: `Add "${params.inputValue}"`,
                        });
                    }

                    return filtered;
                }}
                options={handicaps}
                getOptionLabel={(option) => {
                    // for example value selected with enter, right from the input
                    if (typeof option === 'string') {
                        return option;
                    }
                    if (option.inputValue) {
                        return option.inputValue;
                    }
                    return option.handicapName;
                }}
                selectOnFocus
                clearOnBlur
                handleHomeEndKeys
                renderOption={(props, option) => {
                    // eslint-disable-next-line react/prop-types
                    const { key, ...optionProps } = props;
                    return (
                        // eslint-disable-next-line react/jsx-props-no-spreading
                        <li key={key} {...optionProps}>
                            {option.handicapName}
                        </li>
                    );
                }}
                freeSolo
                renderInput={(params) =>
                    (<TextField
                        {...params}
                        label="Handicappe"
                        sx={{
                            '& .MuiInputBase-root': {
                                height: 45, // Match your other TextFields
                            },
                        }}
                    />)
                }
            />
            <Dialog open={open} onClose={handleClose}>
                <form onSubmit={handleDialogSubmit}>
                    <DialogTitle>Add a new handicap</DialogTitle>
                    <DialogContent>
                        <TextField
                            autoFocus
                            margin="dense"
                            id="name"
                            value={dialogValue.handicapName}
                            onChange={(event) =>
                                setDialogValue({
                                    ...dialogValue,
                                    handicapName: event.target.value,
                                })
                            }
                            label="Nom de l'handicappe"
                            type="text"
                            variant="standard"
                        />
                        <TextField
                            margin="dense"
                            id="name"
                            value={dialogValue.handicapDesc}
                            onChange={(event) =>
                                setDialogValue({
                                    ...dialogValue,
                                    handicapDesc: event.target.value,
                                })
                            }
                            label="Description de l'handicappe"
                            variant="standard"
                        />
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={handleClose}>Cancel</Button>
                        <Button type="submit">Add</Button>
                    </DialogActions>
                </form>
            </Dialog>
        </>
    )
}


export function HandicapDetails(){
    const [value, setValue] = useState(null);
    const[selectedSeverity, setSelectedSeverity]= useState("")

    const [open, toggleOpen] = useState(false);

    const severityStyles = {
        Mild: {
            text: 'success.main',        // Green text
            hoverBg: 'rgba(76, 175, 80, 0.1)',  // 10% opacity dark green
        },
        Moderate: {
            text: 'warning.main',        // Orange text
            hoverBg: 'rgba(255, 152, 0, 0.1)',  // 10% opacity dark orange
        },
        Severe: {
            text: 'error.main',          // Red text
            hoverBg: 'rgba(244, 67, 54, 0.1)',  // 10% opacity dark red
        },
    };


    const handleSeverity = (event) => {
        const { value } = event.target;
        setSelectedSeverity(value);
    };
    const handleClose = () => {
        setDialogValue({
            handicapName: '',
            handicapDesc: '',
        });
        toggleOpen(false);
    };

    const [dialogValue, setDialogValue] = useState({
        handicapName: '',
        handicapDesc: '',
    });

    const handleDialogSubmit = (event) => {
        event.preventDefault();
        setValue({
            handicapName: dialogValue.title,
            handicapDesc: dialogValue.handicapDesc,
        });
        handleClose();
    };
    return(
        <>
            <div className={styles.handicappeRow}>
                <HandicapAutoComplete
                    setValue={setValue}
                    toggleOpen={toggleOpen}
                    setDialogValue={setDialogValue}
                    handicaps={handicaps}
                    dialogValue={dialogValue}
                    handleDialogSubmit={handleDialogSubmit}
                    handleClose={handleClose}
                    open={open}
                    />
                <TextField
                    className={styles.flexItem}
                    select
                    fullWidth
                    label="Severity"
                    name="severity"
                    variant="outlined"
                    value={selectedSeverity}
                    onChange={handleSeverity}
                    sx={{
                        '& .MuiOutlinedInput-root': {
                            '& .MuiSelect-select': {
                                height: 45,
                                paddingTop: '18px',
                                paddingBottom: '18px',
                                display: 'flex',
                                alignItems: 'center'
                            }
                        }
                    }}
                >
                    {['Mild', 'Moderate', 'Severe'].map((severity) => (
                        <MenuItem
                            key={severity}
                            value={severity}
                            sx={{
                                color: severityStyles[severity].text,  // Persistent text color
                                '&:hover': {
                                    backgroundColor: severityStyles[severity].hoverBg,  // Semi-transparent dark bg
                                },
                                '&.Mui-selected': {
                                    backgroundColor: severityStyles[severity].hoverBg,  // Keep style when selected
                                    '&:hover': {
                                        backgroundColor: severityStyles[severity].hoverBg,  // Override MUI defaults
                                    },
                                },
                            }}
                        >
                            {severity}
                        </MenuItem>
                        )
                    )}
                </TextField>
                <TextField
                    className={styles.span2}
                    fullWidth
                    name={"assistiveDevices"}
                    label={"Assistive devices"}
                    variant={"outlined"}
                />
            </div>

            <div>
                <Button
                    variant="outlined"
                    startIcon={<PlusIcon />}
                    sx={{
                        color: '#1565c0',        // Your custom blue
                        '&:hover': {
                            color: '#1565c0',      // Keeps text blue on hover
                            borderColor: '#1565c0 !important',  // Forces border to stay white
                            backgroundColor: 'rgba(255, 255, 255, 0.08)', // Optional: subtle hover effect
                        },
                    }}
                >
                    Ajouter handicappe
                </Button>
            </div>
        </>
    )
}