import {Modal, TextField} from "@mui/material";
import PropTypes from "prop-types";
import MDBox from "../../../components/MDBox";
import MDTypography from "../../../components/MDTypography";
import {useEffect, useState} from "react";
import MenuItem from "@mui/material/MenuItem";
import styles from "../assets/addCongeModal.module.css"
import MDButton from "../../../components/MDButton";
import Typography from "@mui/material/Typography";
import {myApi} from "../../../service/myApi";
import {useNotificationStore} from "../../../service/notificationService";
import {useStore} from "../../../service/store";
AddCongeModal.propTypes= {
    open: PropTypes.bool.isRequired,
    onClose: PropTypes.func.isRequired,
    handleNewConge: PropTypes.func.isRequired,
    id: PropTypes.number.isRequired
}
//TODO: test this one out à tête reposée
export function AddCongeModal({open, onClose, handleNewConge, id}){
    const username = useStore(state=>state.username);
    const cin = useStore(state=>state.cin);

    const [newConge, setNewConge] = useState({
        personCin: cin,
        type:{
            id: 0,
            nom: "Congé annuelle"
        },
        dateDebut:"",
        dateFin: "",
        duree: 5,
        dateRetour:"",
    })
    const [typesConges, setTypesConges] = useState([])
    const [isLoading, setIsLoading] = useState(false)
    const showFloatingNotification = useNotificationStore((state)=>state.showFloatingNotification)

    const handleNewCongeChange = (e) => {
        setNewConge({ ...newConge, [e.target.name]: e.target.value });
    };

    const handleTypeCongeChange= (e)=>{
        const type = typesConges.find(type=> type.id === e.target.value)
        console.log(type)
        setNewConge({...newConge, type:{
                id: e.target.value,
                nom: type.nom
            }})
    }

    const handleCloseModal= ()=>{
        clearValues()
        onClose()
    }
    const fetchTypesConges=async ()=>{
        await myApi.getTypesConges().then((res)=>{
            console.log(res.data)
            setTypesConges(res.data)
        }).catch(err=>{
            console.error("Error fetching types conges",err)
        })
    }

    const fetchDateFinRetour = async()=>{
        const dateDebutDuree = {dateDebut: newConge.dateDebut, duree:newConge.duree}
        await myApi.getDateFinRetour(dateDebutDuree).then((dateFinRetour)=>{
            setNewConge({...newConge, dateFin: dateFinRetour.dateFin, dateRetour: dateFinRetour.dateRetour})
        }).catch(err=>{
            console.error("Error getting DateFinRetour",err)
        })
    }

    //TODO: Check if this doesn't bug out the system
    const clearValues =()=>{
        setNewConge({...newConge, dateDebut: "", duree: 5, type_id: 0})
    }
    const ajouterDemandeConge= async()=>{
        setIsLoading(true)
        const demandeConge={
            id: id,
            dateDebut: newConge.dateDebut,
            dateFin: newConge.dateFin,
            dateRetour: newConge.dateRetour,
            duree: newConge.duree,
            cin: newConge.personCin,
            type_id: newConge.type.id

        }
        await myApi.addDemandeConge(demandeConge).then(res=>{
            // notification showed for the user, not the Admin/RH
            showFloatingNotification({
                type:"success",
                content:res.message,
                title:"Demande Conge"
            })
            /* Add the new entry to the root congeList*/

            handleNewConge(newConge)
        }).catch(err=>{
            console.error("Error adding Conge", err)
        }).finally(()=>{
            setIsLoading(false)
            handleCloseModal();
        })
    }
    useEffect(() => {
        if(open){
         // Fetch types of Conges
            fetchTypesConges()
        }
    }, [open]);

    useEffect(() => {
        if(open && newConge.dateDebut!=="" && newConge.duree>0)
            fetchDateFinRetour()
    }, [newConge.dateDebut, newConge.duree]);
    return (
        <Modal
            open={open}
            onClose={handleCloseModal}
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
                    alignItems: "center",
                }}
            >
                <MDTypography id="modal-title" variant="h4" mb={3}>
                    Ajouter un congé
                </MDTypography>
                <MDBox
                    components={"form"}
                    onSubmit={(e)=>{
                        e.preventDefault();
                        handleCloseModal();
                    }}
                    sx={{
                        display: "flex",
                        flexDirection: "column",
                        gap:"15px"
                    }}
                >
                    <div className={styles.container}>
                        <Typography
                            component={"span"}
                            sx={{
                                position: "absolute",
                                top: 2, // Adjust to align with border
                                left: 8,
                                backgroundColor: "background.paper", // Prevents border overlap
                                px: 0.5,
                                fontSize: "0.75rem",
                                fontWeight: "bold",
                            }}>
                            Information personelle
                        </Typography>
                        <TextField
                            fullWidth
                            disabled
                            label={"Cin"}
                            name={"cin"}
                            value={newConge.personCin}
                            variant={"outlined"}
                            margin={"normal"}
                            InputLabelProps={{
                                shrink: true,
                            }}
                        />
                        <TextField
                            fullWidth
                            disabled
                            label={"Nom et prenom"}
                            value={username}
                            variant={"outlined"}
                            margin={"normal"}
                            InputLabelProps={{
                                shrink: true,
                            }}
                        />
                    </div>
                    <div className={styles.container}>
                        <Typography
                            component={"span"}
                            sx={{
                                position: "absolute",
                                top: 2, // Adjust to align with border
                                left: 8,
                                backgroundColor: "background.paper", // Prevents border overlap
                                px: 0.5,
                                fontSize: "0.75rem",
                                fontWeight: "bold",
                            }}>
                            Congé
                        </Typography>
                        <TextField
                            select={typesConges?.length>0}
                            fullWidth
                            value={newConge.type.id}
                            onChange={handleTypeCongeChange}
                            label="Type congé"
                            variant="outlined"
                            margin="normal"
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
                            InputLabelProps={{
                                shrink: true,
                            }}
                        >
                            {typesConges?.map((typeConge) => (
                                <MenuItem value={typeConge.id} key={typeConge.id} name={typeConge.nom}>
                                    {typeConge.nom}
                                </MenuItem>
                            ))}
                        </TextField>
                        <div className={styles.element}>
                            <TextField
                                fullWidth
                                type={"date"}
                                label="Date debut"
                                name={"dateDebut"}
                                variant="outlined"
                                margin="normal"
                                value={newConge.dateDebut}
                                onChange={handleNewCongeChange}
                                InputLabelProps={{
                                    shrink: true,
                                }}/>

                            <TextField
                                label={"Durée"}
                                name={"duree"}
                                value={newConge.duree}
                                variant="outlined"
                                margin="normal"
                                onChange={handleNewCongeChange}
                                InputLabelProps={{
                                    shrink: true,
                                }}
                                onBlur={(e) => {
                                    const val = parseFloat(e.target.value);
                                    if (!isNaN(val)) {
                                        handleNewCongeChange({
                                            target: {
                                                name: "duree",
                                                value: val
                                            }
                                        });
                                    }
                                }}
                            />
                        </div>
                        <div className={styles.element}>
                            <TextField
                                fullWidth
                                disabled
                                label={"Date fin"}
                                name={"dateFin"}
                                value={newConge.dateFin}
                                onChange={handleNewCongeChange}
                                variant={"outlined"}
                                margin={"normal"}
                                InputLabelProps={{
                                    shrink: true,
                                }}
                            />
                            <TextField

                                disabled
                                label={"Date retour"}
                                name={"dateRetour"}
                                value={newConge.dateRetour}
                                onChange={handleNewCongeChange}
                                variant={"outlined"}
                                margin={"normal"}
                                InputLabelProps={{
                                    shrink: true,
                                }}
                            />
                        </div>
                    </div>

                    <MDButton color={"info"} onClick={ajouterDemandeConge} loading={isLoading}>Ajouter</MDButton>

                </MDBox>

            </MDBox>
        </Modal>
    )
}