import {Modal, TextField} from "@mui/material";
import PropTypes from "prop-types";
import MDBox from "../../../components/MDBox";
import MDTypography from "../../../components/MDTypography";
import {useEffect, useState} from "react";

import styles from "../assets/CongeDetailsModal.module.css"
import {statusToColor, statusToText} from "../index";
import MDButton from "../../../components/MDButton";

CongeDetailsModal.propTypes= {
    open: PropTypes.bool.isRequired,
    onClose: PropTypes.func.isRequired,
    conge: PropTypes.object
}
export function CongeDetailsModal({open, onClose, conge}){
    const [isLoading, setIsLoading] = useState(false)

    const handleCloseModal= ()=>{
        // Clear fields
        onClose()
    }



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
                    Détailles du congé
                </MDTypography>

                <div className={styles.container}>
                    <div className={styles.leftElement}>
                        <MDTypography variant="span" fontWeight={"bold"}  mb={3}>
                            CIN:
                        </MDTypography>
                    </div>
                    <div className={styles.rightElement}>
                        <MDTypography variant="span"  mb={3}>
                            {conge?.personCin}
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
                            {conge?.type.nom}
                        </MDTypography>
                        <MDTypography variant="span" mb={3}>
                            {conge?.dateDebut}
                        </MDTypography>
                        <MDTypography variant="span" mb={3}>
                            {conge?.duree} jours
                        </MDTypography>
                        <MDTypography variant="span" mb={3}>
                            {conge?.dateFin}
                        </MDTypography>
                        <MDTypography variant="span" mb={3}>
                            {conge?.dateRetour}
                        </MDTypography>
                        <MDTypography variant="span" color={statusToColor((conge?.statusConge))} mb={3}>
                            {statusToText(conge?.statusConge)}
                        </MDTypography>
                    </div>
                </div>
                <div className={styles.buttonContainer}>
                    <MDButton  color={"error"} disabled={isLoading || conge?.statusConge !==-1}>Refuser</MDButton>
                    <MDButton  color={"success"} disabled={isLoading || conge?.statusConge !==-1}>Accepter</MDButton>
                </div>
            </MDBox>
        </Modal>
    )
}