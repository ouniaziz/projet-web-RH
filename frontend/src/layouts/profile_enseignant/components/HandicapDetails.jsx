import {forwardRef, useEffect, useImperativeHandle, useState} from "react";
import styles from "../assests/addModalStyle.module.css"
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
import {MinusIcon, PlusIcon} from "lucide-react";
import {myApi} from "../../../service/myApi";
const filter = createFilterOptions();

HandicapAutoComplete.propTypes = {
    index: PropTypes.number.isRequired,
    handicapValue: PropTypes.any,
    setHandicapValue: PropTypes.func.isRequired,
    setIsDialogOpen: PropTypes.func.isRequired,
    setDialogValue: PropTypes.func.isRequired,
    handicaps: PropTypes.array.isRequired,
    isDialogOpen: PropTypes.bool.isRequired,
    handleClose: PropTypes.func.isRequired,
    handleDialogSubmit: PropTypes.func.isRequired,
    dialogValue: PropTypes.object.isRequired,
    newEnseignant: PropTypes.object.isRequired
}

function HandicapAutoComplete({index, handicapValue, setHandicapValue, setIsDialogOpen, setDialogValue, handicaps, dialogValue, handleDialogSubmit, handleClose, isDialogOpen}) {
    return(
        <>
            <Autocomplete
                className={styles.span2}
                value={handicapValue}
                onChange={(event, newValue) => {
                    if (typeof newValue === 'string') {
                        setTimeout(() => {
                            setIsDialogOpen(true);
                            setDialogValue({
                                name_h: newValue,
                                desc_h: '',
                            });
                        });
                    } else if (newValue && newValue.inputValue) {
                        setIsDialogOpen(true);
                        setDialogValue({
                            name_h: newValue.inputValue,
                            desc_h: '',
                        });
                    } else {
                        setHandicapValue(index, newValue);
                    }
                }}
                filterOptions={(options, params) => {
                    const filtered = filter(options, params);
                    const exactMatch = options.some(option =>
                        option.name_h.toLowerCase() === params.inputValue.toLowerCase()
                    );

                    if (params.inputValue !== '' && !exactMatch) {
                        filtered.push({
                            inputValue: params.inputValue,
                            name_h: `Add "${params.inputValue}"`,
                        });
                    }

                    return filtered;
                }}
                options={handicaps}
                getOptionLabel={(option) => {
                    if (typeof option === 'string') return option;
                    if (option.inputValue) return option.inputValue;
                    return option.name_h;
                }}
                selectOnFocus
                clearOnBlur
                handleHomeEndKeys
                renderOption={(props, option) => {
                    return (
                        <li {...props}>
                            {option.name_h}
                        </li>
                    );
                }}
                freeSolo
                renderInput={(params) => (
                    <TextField
                        {...params}
                        label="Handicappe"
                        sx={{
                            '& .MuiInputBase-root': {
                                height: 45,
                            },
                        }}
                    />
                )}
            />
            <Dialog open={isDialogOpen} onClose={handleClose}>
                <form>
                    <DialogTitle>Add a new handicap</DialogTitle>
                    <DialogContent>
                        <TextField
                            autoFocus
                            margin="dense"
                            id="name"
                            value={dialogValue.name_h}
                            onChange={(event) =>
                                setDialogValue({
                                    ...dialogValue,
                                    name_h: event.target.value,
                                })
                            }
                            label="Nom de l'handicappe"
                            type="text"
                            variant="standard"
                        />
                        <TextField
                            margin="dense"
                            id="name"
                            value={dialogValue.desc_h}
                            onChange={(event) =>
                                setDialogValue({
                                    ...dialogValue,
                                    desc_h: event.target.value,
                                })
                            }
                            label="Description de l'handicappe"
                            variant="standard"
                        />
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={handleClose}>Cancel</Button>
                        <Button onClick={() => handleDialogSubmit(index)}>Add</Button>
                    </DialogActions>
                </form>
            </Dialog>
        </>
    )
}

export const HandicapDetails = forwardRef(({ newEnseignant }, ref) => {
    const [storedHandicaps, setStoredHandicaps] = useState([]);
    const [dialogValue, setDialogValue] = useState({
        name_h: '',
        desc_h: '',
    });
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    
    // Initialize with existing handicaps if they exist
    const [handicapsList, setHandicapsList] = useState(
        newEnseignant?.handicaps?.length > 0 
            ? newEnseignant.handicaps.map(h => ({
                handicap: {
                    id_hand: h.handicapId,
                    name_h: h.handicapName,
                    desc_h: h.desc_h || ""
                },
                severity: h.severity,
                assistiveDevice: h.assistive_devices || h.assistiveDevice || ""
            })) 
            : [{
                handicap: null,
                severity: "",
                assistiveDevice: ""
            }]
    );

    const severityStyles = {
        Mild: {
            text: 'success.main',
            hoverBg: 'rgba(76, 175, 80, 0.1)',
        },
        Moderate: {
            text: 'warning.main',
            hoverBg: 'rgba(255, 152, 0, 0.1)',
        },
        Severe: {
            text: 'error.main',
            hoverBg: 'rgba(244, 67, 54, 0.1)',
        },
    };

    const addHandicap = () => {
        setHandicapsList([...handicapsList, {
            handicap: null,
            severity: "",
            assistiveDevice: ""
        }]);
    };

    const popHandicap = () => {
        if (handicapsList.length > 1) {
            setHandicapsList(prev => prev.slice(0, -1));
        }
    };

    const handleHandicaps = (index, newValue) => {
        setHandicapsList(prev => prev.map((handicapElement, i) =>
            i === index ? {
                ...handicapElement,
                handicap: {
                    id_hand: newValue?.id_hand || null,
                    name_h: newValue?.name_h || newValue?.inputValue || '',
                    desc_h: newValue?.desc_h || '',
                }
            } : handicapElement
        ));
    };

    const handleSeverity = (index, value) => {
        setHandicapsList(prev => prev.map((item, i) =>
            i === index ? { ...item, severity: value } : item
        ));
    };

    const handleAssistiveChange = (index, value) => {
        setHandicapsList(prev => prev.map((item, i) =>
            i === index ? { ...item, assistiveDevice: value } : item
        ));
    };

    const handleClose = () => {
        setDialogValue({
            name_h: '',
            desc_h: '',
        });
        setIsDialogOpen(false);
    };

    const handleDialogSubmit = (index) => {
        const newHandicap = {
            id_hand: storedHandicaps.length + 1,
            name_h: dialogValue.name_h,
            desc_h: dialogValue.desc_h,
        };

        myApi.addHandicap(newHandicap).then(response => {
            if (response.status === 200) {
                setStoredHandicaps(prev => [...prev, newHandicap]);
                setHandicapsList(prev => prev.map((handicapElement, i) =>
                    i === index ? {
                        ...handicapElement,
                        handicap: {
                            id_hand: storedHandicaps.length + 1,
                            name_h: dialogValue.name_h,
                            desc_h: dialogValue.desc_h,
                        }
                    } : handicapElement
                ));
            } else {
                console.log("Error occurred", response);
            }
        });

        handleClose();
    };

    useImperativeHandle(ref, () => ({
        getHandicaps: () => handicapsList
    }));

    useEffect(() => {
        myApi.getHandicaps().then(handicaps => {
            setStoredHandicaps(prev => [...prev, ...handicaps.data]);
        }).catch(err => {
            console.error("Error while fetching records", err);
        });
    }, []);

    return(
        <>
            {handicapsList.map((handicapElement, index) => (
                <div key={index} className={styles.handicappeRow}>
                    <HandicapAutoComplete
                        index={index}
                        setHandicapValue={handleHandicaps}
                        handicapValue={handicapElement.handicap}
                        setIsDialogOpen={setIsDialogOpen}
                        setDialogValue={setDialogValue}
                        handicaps={storedHandicaps}
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
                        onChange={(e) => handleSeverity(index, e.target.value)}
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
                                    color: severityStyles[severity].text,
                                    '&:hover': {
                                        backgroundColor: severityStyles[severity].hoverBg,
                                    },
                                    '&.Mui-selected': {
                                        backgroundColor: severityStyles[severity].hoverBg,
                                        '&:hover': {
                                            backgroundColor: severityStyles[severity].hoverBg,
                                        },
                                    },
                                }}
                            >
                                {severity}
                            </MenuItem>
                        ))}
                    </TextField>
                    <TextField
                        className={styles.span2}
                        fullWidth
                        name={"assistiveDevice"}
                        label={"Assistive devices"}
                        variant={"outlined"}
                        value={handicapElement.assistiveDevice}
                        onChange={(e) => handleAssistiveChange(index, e.target.value)}
                    />
                </div>
            ))}

            <div style={{display: "flex", gap: "10px"}}>
                <Button 
                    variant="outlined" 
                    startIcon={<PlusIcon />} 
                    onClick={addHandicap}
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

                <Button 
                    variant="outlined" 
                    startIcon={<MinusIcon />} 
                    onClick={popHandicap}
                    sx={{
                        color: '#c01515',
                        borderColor: '#c01515 !important',
                        '&:hover': {
                            color: '#c01515',
                            borderColor: '#c01515 !important',
                            backgroundColor: 'rgba(255, 255, 255, 0.08)',
                        },
                    }}
                >
                    Supprimer
                </Button>
            </div>
        </>
    )
});
HandicapDetails.propTypes = {
    newEnseignant: PropTypes.shape({
      handicaps: PropTypes.arrayOf(
        PropTypes.shape({
          handicapId: PropTypes.number,
          handicapName: PropTypes.string,
          severity: PropTypes.string,
          assistive_devices: PropTypes.string,
          desc_h: PropTypes.string
        })
      )
    })
  };
  
  HandicapDetails.defaultProps = {
    newEnseignant: {
      handicaps: []
    }
  };