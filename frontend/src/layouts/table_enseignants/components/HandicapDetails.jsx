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
    index: PropTypes.number.isRequired,
    handicapValue: PropTypes.any,
    setHandicapValue: PropTypes.func.isRequired,
    setIsDialogOpen: PropTypes.func.isRequired,
    setDialogValue: PropTypes.func.isRequired,
    handicaps: PropTypes.array.isRequired,
    isDialogOpen: PropTypes.bool.isRequired,
    handleClose: PropTypes.func.isRequired,
    handleDialogSubmit: PropTypes.func.isRequired,
    dialogValue: PropTypes.object.isRequired
}
const handicapsValue=[
    {
        id: 1,
        handicapName: "Motor impairement",
        handicapDesc: "You can't move, can you?",
    },
    {
        id: 2,
        handicapName: "Speech impairement",
        handicapDesc: "You can't speak properly, can you?",
    },
    {
        id: 3,
        handicapName: "Missing hand",
        handicapDesc: "High five!.... WAIT!",
    }
]
function HandicapAutoComplete({index, handicapValue, setHandicapValue, setIsDialogOpen,setDialogValue, handicaps,dialogValue, handleDialogSubmit, handleClose, isDialogOpen}){
    return(
        <>
            <Autocomplete

                className={styles.span2}
                value={handicapValue}
                onChange={(event, newValue) => {
                    if (typeof newValue === 'string') {
                        // timeout to avoid instant validation of the dialog's form.
                        setTimeout(() => {
                            setIsDialogOpen(true);
                            setDialogValue({
                                handicapName: newValue,
                                handicapDesc: '',
                            });
                        });
                    } else if (newValue && newValue.inputValue) {
                        setIsDialogOpen(true);
                        setDialogValue({
                            handicapName: newValue.inputValue,
                            handicapDesc: '',
                        });
                    } else {
                        setHandicapValue(index, newValue);
                    }
                }}
                filterOptions={(options, params) => {
                    const filtered = filter(options, params);

                    const exactMatch = options.some(option =>
                        option.handicapName.toLowerCase() === params.inputValue.toLowerCase()
                    );

                    if (params.inputValue !== '' && !exactMatch) {
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
            <Dialog open={isDialogOpen} onClose={handleClose}>
                <form>
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
                        <Button onClick={handleDialogSubmit}>Add</Button>
                    </DialogActions>
                </form>
            </Dialog>
        </>
    )
}

// TODO: make the handicapList a prop to inject from AddModal component
export function HandicapDetails(){
    /*const [handicapValue, setHandicapValue] = useState(null);
    const[selectedSeverity, setSelectedSeverity]= useState("")*/
    const [dialogValue, setDialogValue] = useState({
        handicapName: '',
        handicapDesc: '',
    });
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [handicapsList, setHandicapsList] = useState([
        {
            handicap: null,
            severity: "",
            assistiveDevices:""
        }
    ])

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

    const addHandicap = () => {
        setHandicapsList([...handicapsList, {
            handicap: null,
            severity: "",
            assistiveDevices:""
        }]);
    };

    // ==================================Handle Handicappe Values===================================
    const handleHandicapValue=(index, newValue)=>{
        setHandicapsList(prev => prev.map((handicapElement, i) =>
            i === index ? {
                ...handicapElement,
                handicap: {
                    id: newValue.id || null,
                    handicapName: newValue.handicapName || newValue.inputValue || '',
                    handicapDesc: newValue.handicapDesc || '',
                }
            } : handicapElement
        ));
    }

    const handleSeverity = (index, value) => {
        setHandicapsList(prev => prev.map((item, i) =>
            i === index ? { ...item, severity: value } : item
        ));
    };

    const handleAssistiveChange = (index, value)=>{
        setHandicapsList(prev => prev.map((item, i) =>
            i === index ? { ...item, assistiveDevices: value } : item
        ));
    }
    const handleClose = () => {
        setDialogValue({
            handicapName: '',
            handicapDesc: '',
        });
        setIsDialogOpen(false);
    };

    const handleDialogSubmit = (index) => {
        setHandicapsList(prev=>prev.map((handicap,i)=>
            i===index ? {handicap:{
                    id: handicapsValue.length+1,
                    handicapName: dialogValue.handicapName,
                    handicapDesc: dialogValue.handicapDesc,
                },
                ...handicap
            } : handicap)
        )
        /*setHandicapValue({
            id: handicapsValue.length+1,
            handicapName: dialogValue.handicapName,
            handicapDesc: dialogValue.handicapDesc,
        });*/
        handleClose();
    };
    return(
        <>
            {handicapsList.map((handicapElement, index) => (
                <div key={index} className={styles.handicappeRow}>
                    <HandicapAutoComplete
                        index={index}
                        setHandicapValue={handleHandicapValue}
                        handicapValue={handicapElement.handicap}
                        setIsDialogOpen={setIsDialogOpen}
                        setDialogValue={setDialogValue}
                        handicaps={handicapsValue}
                        dialogValue={dialogValue}
                        handleDialogSubmit={handleDialogSubmit}
                        handleClose={handleClose}
                        isDialogOpen={isDialogOpen}
                        />
                    <TextField
                        className={styles.flexItem}
                        select
                        fullWidth
                        label="Severity"
                        name="severity"
                        variant="outlined"
                        value={handicapElement.severity}
                        onChange={(e)=>handleSeverity(index, e.target.value)}
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
                        value={handicapElement.assistiveDevices}
                        onChange={(e)=>handleAssistiveChange(index,e.target.value)}
                    />
                </div>

            ))}

            <div>
                <Button variant="outlined" startIcon={<PlusIcon />} onClick={(e)=> {
                    console.log(handicapsList);
                    addHandicap();
                }}
                    sx={{
                        color: '#1565c0',
                        '&:hover': {
                            color: '#1565c0',
                            borderColor: '#1565c0 !important',
                            backgroundColor: 'rgba(255, 255, 255, 0.08)',
                        },
                    }}
                >
                    Ajouter handicappe
                </Button>
            </div>
        </>
    )
}