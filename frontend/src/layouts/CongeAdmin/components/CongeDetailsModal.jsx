import {Modal, TextField} from "@mui/material";
import PropTypes from "prop-types";
import MDBox from "../../../components/MDBox";
import MDTypography from "../../../components/MDTypography";
import {useState} from "react";

import styles from "../assets/CongeDetailsModal.module.css"
import {statusToColor, statusToText} from "../index";
import MDButton from "../../../components/MDButton";
import {myApi} from "../../../service/myApi";
import {useNotificationStore} from "../../../service/notificationService";
import {useStore} from "../../../service/store";

CongeDetailsModal.propTypes= {
    open: PropTypes.bool.isRequired,
    onClose: PropTypes.func.isRequired,
    conge: PropTypes.object,
    updateCongeStatus: PropTypes.func.isRequired,
}

export function CongeDetailsModal({open, onClose, conge, updateCongeStatus}){
    const [isLoading, setIsLoading] = useState(false)
    const showFloatingNotification = useNotificationStore((state)=>state.showFloatingNotification)

    const acceptDemande=async()=>{
        setIsLoading(true)
        await myApi.acceptDemande(conge.id).then((res)=>{
            showFloatingNotification({
                title:"Conge",
                content:res.message,
                type:"success"
            })
            updateCongeStatus(conge.id, 1)
        }).catch(err=>{
            console.error("Error Accepting demande", err)
        }).finally(()=>{
            setIsLoading(false)
            onClose()
        })
    }

    const refuseDemande=async()=>{
        setIsLoading(true)
        await myApi.refuseDemande(conge.id).then((res)=>{
            showFloatingNotification({
                title:"Conge",
                content:res.message,
                type:"success"
            })
            updateCongeStatus(conge.id ,0)
        }).catch(err=>{
            console.error("Error Refusing demande", err)
        }).finally(()=>{
            setIsLoading(false)
            onClose()
        })
    }
    return (
        <Modal
            open={open}
            onClose={onClose}
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
                    Demande du congé #{conge?.id}
                </MDTypography>

                <div className={styles.container}>
                    <div className={styles.leftElement}>
                        <MDTypography variant="span" fontWeight={"bold"}  mb={3}>
                            CIN:
                        </MDTypography>
                    </div>
                    <div className={styles.rightElement}>
                        <MDTypography variant="span"  mb={3}>
                            {conge?.personCin ?? "[CIN]"}
                        </MDTypography>
                    </div>
                </div>

                <div className={styles.container}>
                    <div className={styles.leftElement}>
                        <MDTypography variant="span"  fontWeight={"bold"}  mb={3}>
                            Type congé:
                        </MDTypography>
                        <MDTypography variant="span"  fontWeight={"bold"}  mb={3}>
                            Date debut:
                        </MDTypography>
                        <MDTypography variant="span"  fontWeight={"bold"}  mb={3}>
                            durée:
                        </MDTypography>
                        <MDTypography variant="span"  fontWeight={"bold"}  mb={3}>
                            Date fin:
                        </MDTypography>
                        <MDTypography variant="span"  fontWeight={"bold"}  mb={3}>
                            Date retour:
                        </MDTypography>
                        <MDTypography variant="span"  fontWeight={"bold"}  mb={3}>
                            status:
                        </MDTypography>
                    </div>
                    <div className={styles.rightElement}>
                        <MDTypography variant="span" mb={3}>
                            {conge?.type.nom?? "[NOM TYPE CONGE]"}
                        </MDTypography>
                        <MDTypography variant="span" mb={3}>
                            {conge?.dateDebut ?? "[DATE DEBUT]"}
                        </MDTypography>
                        <MDTypography variant="span" mb={3}>
                            {conge?.duree} jours
                        </MDTypography>
                        <MDTypography variant="span" mb={3}>
                            {conge?.dateFin ?? "[DATE FIN]"}
                        </MDTypography>
                        <MDTypography variant="span" mb={3}>
                            {conge?.dateRetour ?? "[DATE RETOUR]"}
                        </MDTypography>
                        <MDTypography variant="span" color={statusToColor((conge?.statusConge))} mb={3}>
                            {statusToText(conge?.statusConge)}
                        </MDTypography>
                    </div>
                </div>
                <div className={styles.buttonContainer}>
                    <MDButton  color={"error"} disabled={isLoading || conge?.statusConge !==-1} onClick={refuseDemande}>Refuser</MDButton>
                    <MDButton  color={"success"} disabled={isLoading || conge?.statusConge !==-1} onClick={acceptDemande}>Accepter</MDButton>
                </div>
            </MDBox>
        </Modal>
    )
}