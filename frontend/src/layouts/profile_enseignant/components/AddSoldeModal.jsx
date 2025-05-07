import PropTypes from "prop-types";
import {useState, useEffect} from "react"
import {useStore} from "../../../service/store";
import {myApi} from "../../../service/myApi";
import {Modal, TextareaAutosize, TextField} from "@mui/material";
import MDBox from "../../../components/MDBox";

import MDTypography from "../../../components/MDTypography";

import MDButton from "../../../components/MDButton";
import styles from "../assests/AddSoldeModal.module.css"
import MenuItem from "@mui/material/MenuItem";
import {useNotificationStore} from "../../../service/notificationService";
//TODO: Further develop this:
AddSoldeModal.propTypes={
    cin: PropTypes.string.isRequired,
    open: PropTypes.bool.isRequired,
    onCloseMethod: PropTypes.func.isRequired,
    updateSolde: PropTypes.func.isRequired
}

function AddSoldeModal({open, onCloseMethod, cin, updateSolde }){
    const [demandeSolde, setDemandeSolde] = useState({
        cin: cin,
        type:{
            id: 0,
            nom: "Congé annuelle"
        },
        soldeAjouter: 0,
        justification: ""
    })
    const [typesConges, setTypesConges] = useState([])
    const [isLoading, setIsLoading] = useState(false)
    const showFloatingNotification = useNotificationStore(state=>state.showFloatingNotification)

    const handleDemandeCongeChange = (e) => {
        setDemandeSolde({ ...demandeSolde, [e.target.name]: e.target.value });
    };

    const ajouterSolde = async()=>{
        setIsLoading(true)
        const demande = {
            cin: demandeSolde.cin,
            typeId: demandeSolde.type.id,
            soldeAjouter: demandeSolde.soldeAjouter,
            justification: demandeSolde.justification
        }
        await myApi.addDemandeSolde(demande).then(res=>{
            showFloatingNotification({
                type:"success",
                title:"Modification Solde Congé",
                content:`Le solde du ${cin} à été modifié!`
            })
            updateSolde(demandeSolde.type.id, parseInt(demandeSolde.soldeAjouter))
        }).catch(err=>{
            console.error("Error Demande Solde", err)
        }).finally(()=>{
            setIsLoading(false)
            handleCloseModal()
        })
    }

    const fetchTypesConges=async ()=>{
        await myApi.getTypesConges().then((res)=>{
            setTypesConges(res.data)
        }).catch(err=>{
            console.error("Error fetching types conges",err)
        })
    }

    const handleTypeCongeChange= (e)=>{
        const type = typesConges.find(type=> type.id === e.target.value)
        console.log(type)
        setDemandeSolde({...demandeSolde, type:{
                id: e.target.value,
                nom: type.nom
            }})
    }

    const clearValues =()=>{
        setDemandeSolde({
            cin: cin,
            type:{
                id: 0,
                nom: "Congé annuelle"
            },
            soldeAjouter: 0,
            justification: ""
        })
    }
    const handleCloseModal= ()=>{
        clearValues()
        onCloseMethod()
    }

    useEffect(() => {
        if(open){
            // Fetch types of Conges
            fetchTypesConges()
        }
    }, [open]);
    return (
        <Modal
            open={open}
            onClose={handleCloseModal}
            style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                backgroundColor: "rgba(142, 235, 248, 0.4)",
               }}>
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
                    Ajouter Solde Congé au {cin}
                </MDTypography>
                <div className={styles.flexContainer}>
                    <TextField
                        fullWidth
                        disabled
                        label={"Cin"}
                        name={"cin"}
                        value={demandeSolde.cin}
                        variant={"outlined"}
                        margin={"normal"}
                        InputLabelProps={{
                            shrink: true,
                        }}
                    />
                    <div className={styles.flexElement}>
                        <TextField
                            select={typesConges?.length>0}
                            fullWidth
                            value={demandeSolde.type.id}
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
                                },
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
                        <TextField
                            label={"Solde à ajouter"}
                            name={"soldeAjouter"}
                            value={demandeSolde.soldeAjouter}
                            variant="outlined"
                            margin="normal"
                            onChange={handleDemandeCongeChange}
                            InputLabelProps={{
                                shrink: true,
                            }}
                            onBlur={(e) => {
                                const val = parseFloat(e.target.value);
                                if (!isNaN(val)) {
                                    handleDemandeCongeChange({
                                        target: {
                                            name: "duree",
                                            value: val
                                        }
                                    });
                                }
                            }}
                        />
                    </div>
                    <TextareaAutosize
                        required
                        name={"justification"}
                        placeholder={"Justification"}
                        value={demandeSolde.justification}
                        onChange={handleDemandeCongeChange}
                    />
                </div>
                <MDButton
                    sx={{
                        alignSelf: "end",
                        marginTop: "10px"
                    }}
                    loading={isLoading}
                    color={"info"}
                    onClick={ajouterSolde}
                    loadingColor={"info"}
                    variant={"outlined"}>Effectuer</MDButton>
            </MDBox>
        </Modal>
    )
}

export {AddSoldeModal}