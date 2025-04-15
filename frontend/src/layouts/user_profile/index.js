import React, { useState } from "react";
import { User } from "lucide-react";
import "./assets/user_profile.css";
import PropTypes from "prop-types";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import "./assets/emploi.png";
import CloseIcon from '@mui/icons-material/Close';
import {
    Modal,
    TextField,
    Button,
    Radio,
    RadioGroup,
    FormControlLabel,
  } from "@mui/material";
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
// Exemple de données pour démonstration
const ROLE = "employe"; // ou "employe" selon le rôle de l'utilisateur
const PROFILE = {
  image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSsb_V_Ha4XAl47doWf_2lF-actuld60ssYew&s",
  nom: "Jean Dupont",
  email: "jean.dupont@example.com",
  CIN: "AB123456",
  adresse: "123 Rue de la Paix",
  age: "35",
  telephone: "0612345678",
  Grade: "Senior",
  naissance: "1988-05-15",
  sexe: "Homme",
  ancienneté: "8",
  handicap: "Non",
  poste: ROLE === "employe" ? "Responsable RH" : undefined,
  département: ROLE !== "employe" ? "Informatique" : undefined,
};

const ProfilePage = () => {
  const role = ROLE;
  const [profile, setProfile] = useState(PROFILE);
  const [open, setOpen] = useState(false);
  const [editedProfile, setEditedProfile] = useState({ ...profile });
  const [openPdfModal, setOpenPdfModal] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const handleOpenPdfModal = () => setOpenPdfModal(true);
  const handleClosePdfModal = () => setOpenPdfModal(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditedProfile(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setEditedProfile(prev => ({
        ...prev,
        image: imageUrl
      }));
    }
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    setProfile(editedProfile);
    handleClose();
  };

  return (
    <DashboardLayout>
      <DashboardNavbar />
                <div className="profile-container">
                <div className="profile-card">
                    <div className="profile-header">
                            <div className="profile-header-content">
                                {profile.image ? (
                                <img
                                    src={profile.image}
                                    alt={profile.nom}
                                    className="profile-image"
                                />
                                ) : (
                                <div className="profile-image-container">
                                    <User className="profile-icon" />
                                </div>
                                )}
                                <div className="profile-title">
                                    <h1 className="profile-name">{profile.nom}</h1>
                                    <p className="profile-role">
                                        {role === "employe" ? "Employé Administratif" : "Enseignant"}
                                    </p>
                                </div>
                            </div>
                            <Button style={{color: "white",backgroundColor:"#00796b ",fontSize:"15px",height:"55px"}}  onClick={handleOpenPdfModal}>
                                    {role === "employe" ? "Mes taches" : "Emploi de temps"}
                            </Button>

                    </div>

                    <div className="profile-details">
                    <div className="profile-grid">
                        <div style={{ display: "flex", justifyContent: "space-between" }}>
                            <h6 style={{ fontWeight: "bold", marginBottom: "0.1rem",fontSize:"20px"}}>Informations Personnelles</h6>
                            <div style={{ display: "flex", gap:"0.5rem",alignItems:"center"}}>
                                    <label style={{fontSize:"15px",color:"#FF1818"}}>Modifier profile</label>
                                    <i className="far fa-edit"style={{cursor:"pointer",color:"#FF1818",fontWeight: "bold",position:"relative",fontSize: "24px", }} onClick={handleOpen}></i>
                            </div>    
                        </div>
                        <hr style={{ margin: "0 0 1rem 0" }}/>
                        <div className="info-column">
                            <div style={{ display: "flex", flexDirection: "column" ,gap:"1rem"}}>
                                <InfoField label="Email" value={profile.email} />
                                <InfoField label="CIN" value={profile.CIN} />
                                <InfoField label="Adresse" value={profile.adresse} />
                                <InfoField label="Age" value={profile.age} />
                            </div>
                            <div style={{ display: "flex", flexDirection: "column", gap:"1rem"}}>    
                                <InfoField label="Téléphone" value={profile.telephone} />
                                <InfoField label="Date de naissance" value={profile.naissance} />
                                <InfoField label="Sexe" value={profile.sexe} />
                                <InfoField label="Handicap" value={profile.handicap} />
                            </div>    
                        </div>
                        <h6 style={{ fontWeight: "bold", marginBottom: "0.1rem",fontSize:"20px"}}>Informations Professionnelles</h6>
                        <hr style={{ margin: "0 0 1rem 0" }}/>
                        <div className="info-column">
                            <div style={{ display: "flex", flexDirection: "column" ,gap:"1rem"}}>
                                    {role === "employe" ? (
                                        <InfoField label="Poste" value={profile.poste || ""} />
                                    ) : (
                                        <InfoField label="Département" value={profile.département || ""} />
                                    )}
                                    <InfoField label="Grade" value={profile.Grade} />
                            </div>
                            <div style={{ display: "flex", flexDirection: "column", gap:"1rem"}}>        
                                <InfoField label="Ancienneté" value={`${profile.ancienneté} ans`} />
                            </div>        
                        </div>
                    </div>
                    </div>
                </div>
                </div>




               <Modal open={open} onClose={handleClose} aria-labelledby="modal-modal-title" aria-describedby="modal-modal-description"
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                      backgroundColor: "rgba(142, 235, 248, 0.4)",
                    }}
                >
                                <MDBox
                                    display="flex"
                                    flexDirection="column"
                                    alignItems="center"
                                    justifyContent="center"
                                    position="absolute"
                                    top="8%"
                                    left="27%"
                                    transform="translate(-50%, -50%)"
                                    width={800}
                                    boxShadow={24}
                                    p={4}
                                    borderRadius={2}
                                    style={{ backgroundColor: "white" }}
                                >
                                <MDTypography id="modal-modal-title" variant="h6" component="h2" mb={3}>
                                    Modifier le profil
                                </MDTypography>
                                <MDBox component="form" onSubmit={handleSubmit} display="flex" flexDirection="row">
                                    <MDBox width="50%" pr={2}>
                                    <TextField
                                        fullWidth
                                        label="Nom et prénom"
                                        name="nom"
                                        value={editedProfile.nom}
                                        onChange={handleChange}
                                        margin="normal"
                                        required
                                    />
                                    <MDBox style={{ display: "flex", flexDirection: "row", gap: "10px"}}>
                                        <input
                                        accept="image/*"
                                        type="file"
                                        id="upload-photo"
                                        style={{ display: "none" }}
                                        onChange={handleImageChange}
                                        />
                                        <label htmlFor="upload-photo">
                                        <Button
                                            variant="contained"
                                            component="span"
                                            color="secondary"
                                            style={{height: "50px", color: "white",width: "260px",marginTop: "10px"}}
                                        >
                                            Changer la photo
                                        </Button>
                                        </label>
                                        {editedProfile.image && (
                                        <img
                                            src={editedProfile.image}
                                            alt="Preview"
                                            style={{
                                            marginTop: "10px",
                                            width: "80px",
                                            height: "50px",
                                            objectFit: "cover",
                                            borderRadius: "10px",
                                            }}
                                        />
                                        )}
                                    </MDBox>
                                    <TextField
                                        fullWidth
                                        label="CIN"
                                        name="CIN"
                                        value={editedProfile.CIN}
                                        onChange={handleChange}
                                        margin="normal"
                                        required
                                    />
                                    <TextField
                                        fullWidth
                                        label="Email"
                                        name="email"
                                        value={editedProfile.email}
                                        onChange={handleChange}
                                        margin="normal"
                                        required
                                    />
                                    <TextField
                                        fullWidth
                                        label="Adresse"
                                        name="adresse"
                                        value={editedProfile.adresse}
                                        onChange={handleChange}
                                        margin="normal"
                                        required
                                    />
                                    <TextField
                                        fullWidth
                                        label="Grade"
                                        name="Grade"
                                        value={editedProfile.Grade}
                                        onChange={handleChange}
                                        margin="normal"
                                        required
                                    />
                                    <TextField
                                        fullWidth
                                        label="handicap"
                                        name="handicap"
                                        value={editedProfile.handicap}
                                        onChange={handleChange}
                                        variant="outlined"
                                        margin="normal"
                                        required
                                    />
                                    </MDBox>

                                    <MDBox width="50%" pl={2}>
                                    <TextField
                                        fullWidth
                                        label="Date de naissance"
                                        type="date"
                                        name="naissance"
                                        value={editedProfile.naissance}
                                        onChange={handleChange}
                                        margin="normal"
                                        InputLabelProps={{ shrink: true }}
                                        required
                                    />
                                    <TextField
                                        fullWidth
                                        label="Âge"
                                        name="age"
                                        value={editedProfile.age}
                                        onChange={handleChange}
                                        margin="normal"
                                        required
                                    />
                                    <RadioGroup
                                        aria-labelledby="demo-radio-buttons-group-label"
                                        name="sexe"
                                        value={editedProfile.sexe}
                                        onChange={handleChange}
                                        row
                                        style={{
                                            display: "flex",
                                            flexDirection: "row",
                                            height: "30px",
                                            margin: "15px",
                                            marginLeft: "20%",
                                          }}
                                    >
                                        <FormControlLabel 
                                        value="Homme" 
                                        control={<Radio />} 
                                        label="Homme" 
                                        />
                                        <FormControlLabel 
                                        value="Femme" 
                                        control={<Radio />} 
                                        label="Femme" 
                                        />
                                    </RadioGroup>
                                    <TextField
                                        fullWidth
                                        label="Téléphone"
                                        name="telephone"
                                        value={editedProfile.telephone}
                                        onChange={handleChange}
                                        margin="normal"
                                        required
                                    />
                                    {role === "employe" ? (
                                        <TextField
                                        fullWidth
                                        label="Poste"
                                        name="poste"
                                        value={editedProfile.poste || ""}
                                        onChange={handleChange}
                                        margin="normal"
                                        />
                                    ) : (
                                        <TextField
                                        fullWidth
                                        label="Département"
                                        name="département"
                                        value={editedProfile.département || ""}
                                        onChange={handleChange}
                                        margin="normal"
                                        />
                                    )}
                                    <TextField
                                        fullWidth
                                        label="Ancienneté (années)"
                                        name="ancienneté"
                                        value={editedProfile.ancienneté}
                                        onChange={handleChange}
                                        margin="normal"
                                        required
                                    />
                                    <Button
                                        type="submit"
                                        variant="contained"
                                        color="primary"
                                        fullWidth
                                        style={{color: "white" ,marginTop: "15px"}}
                                    >
                                        Enregistrer
                                    </Button>
                                    </MDBox>
                                </MDBox>
                                </MDBox>
                </Modal> 
                {/* Modal pour le PDF */}
                <Modal
                        open={openPdfModal}
                        onClose={handleClosePdfModal}
                        aria-labelledby="pdf-viewer-modal"
                        style={{
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                            backgroundColor: "rgba(0,0,0,0.7)",
                        }}
                        >
                        <MDBox
                            sx={{
                            width: "80%",
                            height: "90%",
                            bgcolor: "background.paper",
                            boxShadow: 24,
                            p: 4,
                            borderRadius: 2,
                            display: "flex",
                            flexDirection: "column",
                            }}
                        >
                              <CloseIcon
                                 variant="contained"
                                 color="primary"
                                 onClick={handleClosePdfModal}
                                 style={{ marginTop: "0px",alignSelf: "flex-end" ,cursor: "pointer",color:"red",fontSize:"30px" }}
                              ></CloseIcon>
                            <MDTypography variant="h6" component="h2" mb={2}>
                                {role === "enseignant" ? "Emploi du temps" : ""}
                            </MDTypography>
                            
                            <div style={{ flex: 1, display: "flex", justifyContent: "center" }}>
                            {role === "employe" ? (
                                <iframe
                                        src="http://localhost:3000/main/Mes_taches" // Remplacez par le lien de votre PDF
                                        width="100%"
                                        height="100%"
                                        style={{ border: "none" }}
                                        title="PDF Viewer"
                                    >
                                        <p>Votre navigateur ne supporte pas les PDF. Vous pouvez <a>télécharger le PDF</a>.</p>
                                    </iframe>
                            ) : (
                                // Afficher le PDF pour les enseignants
                                <div style={{ width: "100%", height: "100%", display: "flex", justifyContent: "center", alignItems: "center",overflow: 'auto' }}>
                                    <img 
                                        src={require("./assets/emploi.png")} 
                                        alt="Emploi du temps" 
                                        style={{ maxWidth: "100%", maxHeight: "100%", objectFit: "contain" }}
                                    />
                                </div>   
                                )}
                            </div>
                          
                        </MDBox>
                </Modal>
                
    </DashboardLayout>
  );
};

const InfoField = ({ label, value }) => (
    <dl className="info-field">
      <dt>{label}</dt>
      <dd>{value}</dd>
    </dl>
  );
  InfoField.propTypes = {
    label: PropTypes.string.isRequired,
    value: PropTypes.string.isRequired,
  };

export default ProfilePage;
