import Modal from "@mui/material/Modal";
import MDBox from "../../../components/MDBox";
import MDTypography from "../../../components/MDTypography";
import TextField from "@mui/material/TextField";
import PropTypes from "prop-types";
import {myApi} from "../../../service/myApi";
import {useRef, useState} from "react";
import styles from "../assets/addModalStyle.module.css"
import {Accordion, AccordionDetails, AccordionSummary, ToggleButton, ToggleButtonGroup} from "@mui/material";
import {styled} from "@mui/material/styles";
import {ExpandMore, Woman2, Man2, CommentBankOutlined} from '@mui/icons-material';
import Autocomplete from "@mui/material/Autocomplete";
import {AdditionalInfoDetails} from "./AdditionalInfoDetails";
import {HandicapDetails} from "./HandicapDetails";
import MDButton from "../../../components/MDButton";
import {useNotificationStore} from "../../../service/notificationService";

AddModal.propTypes={
    open1: PropTypes.bool.isRequired,
    handleClose1: PropTypes.func.isRequired,
    addToEnseignants: PropTypes.func.isRequired,
    b64ToImage: PropTypes.func.isRequired
}

// Custom toggle button
const StyledToggleButtonGroup = styled(ToggleButtonGroup)({
    position: 'relative',
    overflow: 'hidden',
    borderRadius: '10px',
    backgroundColor: '#f5f5f5',
    padding: '4px',
    '& .MuiToggleButtonGroup-grouped': {
        border: 'none',
        borderRadius: '10px !important',
        padding: '8px 16px',
        transition: 'all 0.3s ease',
        zIndex: 1,
    },
});

const StyledToggleButton = styled(ToggleButton)(({ theme, value }) => ({
    // Selected state: colored segment
    '&.Mui-selected': {
        color: value === 'Homme' ? '#fff' : '#fff', // White text for contrast
        backgroundColor:
            value === 'Homme' ? '#1976d2' :  // Male: blue
                '#d81b60',                      // Female: pink
        '&:hover': {
            backgroundColor:
                value === 'Homme' ? '#1565c0' : // Darker blue on hover
                    '#c2185b',                     // Darker pink on hover
        },
    },
    // Unselected state: gray segment
    '&:not(.Mui-selected)': {
        color: theme.palette.text.secondary,
        backgroundColor: '#f5f5f5 !important', // Force gray background
        '&:hover': {
            backgroundColor: '#e0e0e0 !important', // Slightly darker gray on hover
        },
    },
}));

// custom Accordion
const MyAccordion = styled(Accordion)(({ theme }) => ({
    width: "100%",
    boxShadow: 'rgba(0, 0, 0, 0.05) 0px 0px 0px 1px;',
    '&:not(:last-child)': {
        borderBottom: 0,
    },
    '&:before': {
        display: 'none',
    },
    '&.Mui-expanded': {
        margin: 'auto',
    },
}));

// Custom styled AccordionSummary with left chevron
const MyAccordionSummary = styled(AccordionSummary)(({ theme }) => ({
    flexDirection: 'row-reverse',
    minHeight: '48px !important', // Prevent height changes
    padding: '0 16px !important', // Lock padding
    '&.Mui-expanded': {
        minHeight: '48px !important', // Keep consistent when expanded
    },
    '& .MuiAccordionSummary-expandIconWrapper': {
        marginRight: theme.spacing(1),
        transform: 'rotate(-90deg)', // Start pointing down
        transition: theme.transitions.create('transform', {
            duration: theme.transitions.duration.shortest,
        }),
    },
    '& .MuiAccordionSummary-expandIconWrapper.Mui-expanded': {
        transform: 'rotate(0deg)', // Point right when expanded
    },
    '& .MuiAccordionSummary-content': {
        margin: '12px 0', // Consistent vertical margin
        display: 'flex', // Keep text aligned
        alignItems: 'center', // Center vertically
        '&.Mui-expanded': {
            margin: '12px 0', // Same as collapsed
        },
    },
}));

const MyAccordionDetails = styled(AccordionDetails)(({ theme }) => ({
    padding: theme.spacing(2),
    borderTop: '1px solid rgba(0, 0, 0, .125)',
}));

export default function AddModal({open1, handleClose1, addToEnseignants, b64ToImage}){
    const handiRef = useRef(null);
    const [newEnseignant, setNewEnseignant] = useState({
        image: null,
        nom: "",
        prenom: "",
        email: "",
        cin: "",
        adresse: "",
        telephone: "",
        gradId: "",
        dateN: "",
        sexe: "Homme",
        departement: "",
        anciennete: 0,
        handicaps:null,
        roleId:2
    });
    const [gender, setGender] = useState("Homme");
    const [expanded, setExpanded] = useState('0');
    const [isLoading, setIsLoading] = useState(false)

    const showNotification = useNotificationStore((state) => state.showNotification);

    const handleAddEnseignant = async () => {
        if (
            !newEnseignant.nom ||
            !newEnseignant.prenom ||
            !newEnseignant.cin ||
            !newEnseignant.email ||
            !newEnseignant.dateN
        ) {
            alert("Veuillez remplir tous les champs obligatoires ");
            return;
        }

        setIsLoading(true)
        try {
            // TODO: Display notification && validation
            await myApi.addEnseignant(newEnseignant).then((response)=>{
                if(response.status===201){
                    addToEnseignants(newEnseignant);
                    showNotification({
                        type: 'success',
                        content: response.message,
                        title: 'Une personne ajouté avec succes!',
                    })
                }

            });
            handleClose1();
        } catch (error) {
            console.error("Erreur lors de l’ajout de l’enseignant :", error);
            showNotification({
                type: 'error',
                content: "S'il vous plaît, contacter l'administrateur",
                title: "Une erreur est survenue lors de l’ajout",
            })
        }finally {
            setIsLoading(false)
        }
    };

    const handleNewEnsChange = (e) => {
        setNewEnseignant({ ...newEnseignant, [e.target.name]: e.target.value });
    };

    const handleAccordionChange= (panel)=>(e,newExpanded)=>{
        setExpanded(newExpanded? panel:"0")
    }
    const handleGenderChange = (event, newGender) => {
        console.log(newGender)
        if (newGender !== null) {
            setGender(newGender)
        }
    };

    const testNotification=()=>{
        showNotification({
            type: 'success',
            content: "response.message",
            title: 'Une personne ajouté avec succes!',
        })
    }

    const handleCloseModal = ()=>{
        handleClose1()
        setNewEnseignant({
            image: null,
            nom: "",
            prenom: "",
            email: "",
            cin: "",
            adresse: "",
            telephone: "",
            gradId: "",
            dateN: "",
            sexe: "",
            departement: "",
            anciennete: 0,
            handicaps:null,
            roleId:2
        })
    }

    const handleAjouter = ()=>{
        const handicapData =handiRef.current.getHandicaps()
            .filter(({handicap}) => handicap!=null).map(({handicap: {id_hand}, ...rest})=>({
            id: id_hand,
            ...rest
        }))
        setNewEnseignant(prev=>{
            const newState = {
                ...prev,
                sexe:gender,
                handicaps: handicapData
            }

            console.log(newState)
            return newState
        })

        handleAddEnseignant()
    }
    return(
        <Modal
            open={open1}
            onClose={handleCloseModal}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
            style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                backgroundColor: "rgba(142, 235, 248, 0.4)",
            }}
        >
            <MDBox
                bgColor={"white"}
                boxShadow={24}
                p={4}
                borderRadius="12px"
                sx={{

                    display:"flex",
                    justifyContent: "center",
                    flexDirection:"column",
                    alignItems: "center"
                }}
                >
                <MDTypography id="modal-title" variant="h4" mb={3}>
                    Ajouter un enseignant
                </MDTypography>
                <MDBox
                    components={"form"}
                    onSubmit={(e)=>{
                        e.preventDefault();
                        handleCloseModal();
                    }}>
                    <div className={styles.flexContainer} style={{gap: "10px"}}>
                        <div className={styles.flexRow}>
                            <TextField
                                className={styles.span2}
                                fullWidth
                                label="Email"
                                type="email"
                                name="email"
                                value={newEnseignant.email}
                                onChange={handleNewEnsChange}
                                variant="outlined"
                                margin="normal"
                                required
                            />
                            <TextField
                                className={styles.flexItem}
                                fullWidth
                                label="date de naissance"
                                name="dateN"
                                value={newEnseignant.dateN}
                                onChange={handleNewEnsChange}
                                type="date"
                                variant="outlined"
                                margin="normal"
                                required
                                InputLabelProps={{
                                    shrink: true,
                                }}
                            />
                        </div>
                        <div className={styles.flexRow}>
                            <TextField className={styles.flexItem}
                                fullWidth
                                label="CIN"
                                name="cin"
                                value={newEnseignant.cin}
                                onChange={handleNewEnsChange}
                                variant="outlined"
                                margin="normal"
                                required
                               inputProps={{
                                   maxLength: 8, // This provides visual feedback in the input
                               }}
                            />
                            <TextField
                                className={styles.flexItem}
                                fullWidth
                                label="Prenom"
                                name="prenom"
                                value={newEnseignant.prenom}
                                onChange={handleNewEnsChange}
                                variant="outlined"
                                margin="normal"
                                required
                            />
                            <TextField className={styles.flexItem}
                                fullWidth
                                label="Nom"
                                name="nom"
                                value={newEnseignant.nom}
                                onChange={handleNewEnsChange}
                                variant="outlined"
                                margin="normal"
                                required
                            />
                        </div>
                        <div>
                            <StyledToggleButtonGroup
                                value={gender}
                                onChange={handleGenderChange}
                                exclusive
                                aria-label="gender selection"
                            >
                                <StyledToggleButton value="Homme" aria-label="male">
                                    <Man2 fontSize={"medium"}/>
                                </StyledToggleButton>
                                <StyledToggleButton value="Femme" aria-label="female">
                                    <Woman2 fontSize={"medium"}/>
                                </StyledToggleButton>
                            </StyledToggleButtonGroup>
                        </div>
                        <MyAccordion expanded={expanded === "1"} onChange={handleAccordionChange("1")}>
                            <MyAccordionSummary
                                expandIcon={<ExpandMore />}
                                aria-controls="panel1-content"
                                id="panel1-header"
                            >
                                <MDTypography component="span">Additional Information</MDTypography>
                                <MDTypography component="span" color={"secondary"} sx={{marginLeft: "8px"}}>(optional)</MDTypography>
                            </MyAccordionSummary>
                            <MyAccordionDetails className={styles.additionalInfoContainer}>
                                <AdditionalInfoDetails
                                    b64ToImage={b64ToImage}
                                    newEnseignant={newEnseignant}
                                    handleNewEnsChange={handleNewEnsChange}
                                    setNewEnseignant={setNewEnseignant}
                                    />
                            </MyAccordionDetails>
                        </MyAccordion>

                        <MyAccordion expanded={expanded === "2"} onChange={handleAccordionChange("2")}>
                            <MyAccordionSummary

                                expandIcon={<ExpandMore />}
                                aria-controls="handicappe-content"
                                id="handicappe-header"
                            >
                                <MDTypography component="span">Handicappe</MDTypography>
                                <MDTypography component="span" color={"secondary"} sx={{marginLeft: "8px"}}>(optional)</MDTypography>
                            </MyAccordionSummary>
                            <MyAccordionDetails className={styles.handicappeContainer}>
                                <HandicapDetails ref={handiRef}/>
                            </MyAccordionDetails>
                        </MyAccordion>
                    </div>
                    {/* Buttons*/}
                    <div className={styles.buttonContainer}>
                        <MDButton color={"info"} onClick={handleAjouter} loading={isLoading}>Ajouter</MDButton>
                    </div>
                </MDBox>
            </MDBox>
        </Modal>
    )
}

