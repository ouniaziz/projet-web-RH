import React,{ useState } from 'react';
import {useEffect} from "react";
import "./assests/profile.css";
import "./assests/loader.css";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import { useLocation } from "react-router-dom";
import Handicaps from './components/Handicaps';
import {useNotificationStore} from "../.././service/notificationService";
import {
  Modal,
  TextField,
  Button,
  Radio,
  RadioGroup,
  FormControlLabel
} from "@mui/material";
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import { myApi } from "../../service/myApi";
import AddModal from './components/AddModal';
import ListAltIcon from '@mui/icons-material/ListAlt';
import IconButton from "@mui/material/IconButton";
import AddIcon from "@mui/icons-material/Add";
import {PDFPreviewModal} from "./components/PdfPreview";
import {AddSoldeModal} from "./components/AddSoldeModal";
import InsertDriveFileIcon from "@mui/icons-material/InsertDriveFile";
import ClearIcon from "@mui/icons-material/Clear";
function Profile_enseignant() {
  const location = useLocation();
  const [open, setOpen] = useState(false);
  const cin = location.state ? location.state.cin : null;
  const [enseignant, setEnseignant] = useState({
    cin: "",
    nom: "",
    prenom: "",
    sexe: "",
    date_n: "",
    anciennete: 0,
    email: "",
    role: {
      id_r: 2,
      nomRole: "Enseignant"
    },
    gradList: [
      {
        grad: {
          id: 4,
          nom: ""
        },
        endDate: null,
        start: ""
      }
    ],
    handicaps: [
      {
        severity: "non",
        handicapName: "Motor impairement",
        handicapId: 1,
        assistive_devices: "device"
      }
    ],
    soldeList: [
      {
        soldeRestant: 0,
        soldeCompRestant: null
      }
    ],
    depart: {
      nomDep: "",
      chefDep: null
    },
    image: null,
    status: 0,
    currentGrad: ""
  }
);

  const [showPdfPreview, setShowPdfPreview] = useState(false)
  const [showSoldModal, setShowSoldModal] = useState(false)

  const showNotification = useNotificationStore((state) => state.showNotification);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [openAffecterEmploi, setOpenAffecterEmploi] = useState(false);
  const handleOpenAffecterEmploi = () => setOpenAffecterEmploi(true);
  const handleCloseAffecterEmploi = () => setOpenAffecterEmploi(false);
  const [selectedFile, setSelectedFile] = useState(null);
  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };
  const [isUploading, setIsUploading] = useState(false);

const handleClearFile = () => {
  setSelectedFile(null);
};
  const handleChange = (e) => {
    const { name, value } = e.target;
    setEnseignant(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64String = reader.result.split(',')[1]; // On garde uniquement la partie base64
        setEnseignant((prev) => ({
          ...prev,
          image: base64String,
        }));
      };
      reader.readAsDataURL(file); // Lecture du fichier en base64
    }
  };

  const formatDate = (dateString) => {
    if (!dateString) return "";

    if (typeof dateString === 'string' && dateString.includes('/')) {
      const [day, month, year] = dateString.split('/');
      return `${year}-${month.padStart(2, '0')}-${day.padStart(2, '0')}`;
    }
    
    return dateString; // Retourne la valeur originale si ce n'est pas une date avec slash
  };
  const displayImgFromB64 = (image) => {
    const mimeType = "application/octet-stream";
    const defaultImage="https://www.shutterstock.com/image-vector/default-avatar-profile-icon-social-600nw-1906669723.jpg"; 
    return image ? `data:${mimeType};base64,${image}` : defaultImage;
  };
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    setLoading(true);
      myApi.getPerson(cin).then(person=>{
        setEnseignant(person.data);
      }).catch(err=>{
        console.error("Error while fetching records", err)
      }).finally(() => setLoading(false));
    }, []);
    console.log(enseignant);
    const editfrontEnseignant = (updatedEnseignant) => {
      setEnseignant(prev => ({
        ...prev,
        ...updatedEnseignant,
        // Mise à jour explicite des champs importants
        nom: updatedEnseignant.nom || prev.nom,
        prenom: updatedEnseignant.prenom || prev.prenom,
        gradList: updatedEnseignant.gradList || prev.gradList,
        currentGrad: updatedEnseignant.currentGrad || prev.currentGrad,
        depart: updatedEnseignant.depart || prev.depart,
        handicaps: updatedEnseignant.handicaps || prev.handicaps,
        image: updatedEnseignant.image || prev.image
      }));
    };
    const handleAffecterEmploi = async () => {
      if (!selectedFile || isUploading) return;

      setIsUploading(true);

      const formData = new FormData();
      formData.append("file", selectedFile);

      try {
        const response = await myApi.AffecterEmploi(enseignant.cin, formData);

        showNotification({
          type: 'success',
          content: "L'emploi du temps a été affecté avec succès",
          title: 'Succès',
        });

        handleCloseAffecterEmploi();
        setSelectedFile(null);
      } catch (error) {
        console.error("Erreur API:", error);

        showNotification({
          type: 'error',
          content: error.response?.data?.message || "Veuillez contacter l'administrateur",
          title: "Erreur lors de l'affectation",
        });
      } finally {
        setIsUploading(false);
      }
    };
    if (loading) {
        return (
            <DashboardLayout>
                <DashboardNavbar />
                <div className="loader"></div>
            </DashboardLayout>
        );
    }

  const updateSoldeEns = (typeId, soldeAjouter)=>{
      //TODO: To develop even further beyond!!
      setEnseignant(prev => {
          // Create a new object to maintain immutability
          const newEnseignant = { ...prev };

          // Make sure soldeList exists and has at least one item
          if (!newEnseignant.soldeList || newEnseignant.soldeList.length === 0) {
              console.warn("soldeList is empty or undefined");
              return prev; // Return unchanged if invalid
          }

          // Create a new soldeList array with the updated item
          newEnseignant.soldeList = [...newEnseignant.soldeList];
          newEnseignant.soldeList[0] = { ...newEnseignant.soldeList[0] };

          // Update the appropriate field
          if (typeId === 0) {
              newEnseignant.soldeList[0].soldeRestant += soldeAjouter;
          } else {
              newEnseignant.soldeList[0].soldeCompRestant += soldeAjouter;
          }

          return newEnseignant;
      });
  }
  return (
    <DashboardLayout>
      <DashboardNavbar />  
      <section style={{ backgroundColor: "#f4f5f7", padding: "20px" }}>
                        <div style={{ display: "flex", flexDirection: "row",backgroundColor: "#fff",borderRadius: "0.5rem",overflow: "hidden"}}>    

                                  <div style={{width: "25%",backgroundColor: "#f4f5f7",padding: "2rem",display: "flex",flexDirection: "column",alignItems: "center",justifyContent: "center",textAlign: "center"}} className="gradient-custom ">
                                            <img src={displayImgFromB64(enseignant.image)} alt="Avatar" style={{ width: "120px",height:"125px", borderRadius: "50%", marginBottom: "1rem"}}/>
                                            <h5 style={{ margin: "0.5rem 0", fontWeight: "bold" }}>{enseignant.nom+" "+enseignant.prenom}</h5>
                                            <p style={{ margin: 0, color: "#6c757d" }}>{enseignant.currentGrad}</p>
                                            <i className="far fa-edit"style={{marginTop:"20px",cursor:"pointer" }}onClick={handleOpen}></i>
                                            <br/>
                                            <Button variant="outlined" style={{ fontSize:"15px",color:"Highlight" }} onClick={handleOpenAffecterEmploi}>Affecter Emploi</Button>
                                  </div>
                                  
                                  <div style={{ width: "75%", padding: "2rem"}}>
                                            <h6 style={{ fontWeight: "bold", marginBottom: "1rem",fontSize:"25px"}}>Informations Personnelles</h6>
                                            <hr style={{ margin: "0 0 1rem 0" }}/>
                            
                                            <div style={{ display: "flex", marginBottom: "1.5rem" }}>
                                                      <div style={{ width: "50%" }}>
                                                        <h6 style={{ fontSize: "0.8rem", color: "#6c757d", marginBottom: "0.5rem" }}>Email</h6>
                                                        <p style={{fontSize: "0.9rem", margin: 0 }}>{enseignant.email}</p>
                                                      </div>
                                                      <div style={{ width: "50%" }}>
                                                        <h6 style={{ fontSize: "0.8rem", color: "#6c757d", marginBottom: "0.5rem" }}>Telephone</h6>
                                                        <p style={{ fontSize: "0.9rem",margin: 0 }}>{enseignant.telephone}</p>
                                                      </div>
                                                      
                                            </div>
                                            <div style={{ display: "flex", marginBottom: "1.5rem" }}>
                                                      <div style={{ width: "50%" }}>
                                                        <h6 style={{ fontSize: "0.8rem", color: "#6c757d", marginBottom: "0.5rem" }}>CIN </h6>
                                                        <p style={{ fontSize: "0.9rem",margin: 0 }}>{enseignant.cin}</p>
                                                      </div>
                                                      <div style={{ width: "50%" }}>
                                                        <h6 style={{ fontSize: "0.8rem", color: "#6c757d", marginBottom: "0.5rem" }}>Adresse</h6>
                                                        <p style={{ fontSize: "0.9rem",margin: 0 }}>{enseignant.adresse}</p>
                                                      </div>
                                                      
                                            </div>
                                            <div style={{ display: "flex", marginBottom: "1.5rem" }}>
                                                      <div style={{ width: "50%" }}>
                                                        <h6 style={{ fontSize: "0.8rem", color: "#6c757d", marginBottom: "0.5rem" }}>Date de naissance</h6>
                                                        <p style={{ fontSize: "0.9rem",margin: 0 }}>{formatDate(enseignant.date_n)}</p>
                                                      </div>
                                                      <div style={{ width: "50%" }}>
                                                        <h6 style={{ fontSize: "0.8rem", color: "#6c757d", marginBottom: "0.5rem" }}>Sexe </h6>
                                                        <p style={{ fontSize: "0.9rem",margin: 0 }}>{enseignant.sexe}</p>
                                                      </div>                                                                                                                
                                            </div>
                              
                                            <h6 style={{ fontWeight: "bold", marginBottom: "1rem",fontSize:"25px" }}>Informations Professionnelles</h6>
                                            <hr style={{ margin: "0 0 1rem 0" }}/>
                            
                                            <div style={{ display: "flex" }}>
                                                      <div style={{ width: "50%" }}>
                                                        <h6 style={{ fontSize: "0.8rem", color: "#6c757d", marginBottom: "0.5rem" }}>Département</h6>
                                                        <p style={{  fontSize: "0.9rem",margin: 0 }}>{enseignant.depart ? enseignant.depart.nomDep : ""}</p>
                                                      </div>
                                                      <div style={{ width: "50%" }}>
                                                        <h6 style={{ fontSize: "0.8rem", color: "#6c757d", marginBottom: "0.5rem" }}>Ancienneté</h6>
                                                        <p style={{ fontSize: "0.9rem", margin: 0 }}>{enseignant.anciennete} ans</p>
                                                      </div>
                                            </div>
                                            {enseignant.soldeList.length > 0 && (
                                              <>
                                              <h6 style={{ fontWeight: "bold", marginBottom: "1rem", fontSize: "25px",marginTop: "1rem",display: "flex"}}>
                                                  Congés
                                                  <IconButton size={"medium"} onClick={()=>setShowPdfPreview(true)}>
                                                      <ListAltIcon />
                                                  </IconButton>
                                                  <IconButton size={"medium"} onClick={()=>setShowSoldModal(true)}>
                                                      <AddIcon />
                                                  </IconButton>
                                              </h6>
                                              <hr style={{ margin: "0 0 1rem 0" }} />
                                              <p style={{ fontSize: "0.9rem", margin: 0 }}><b>Solde Restant :</b> {enseignant.soldeList[0]?.soldeRestant}</p>
                                              <p style={{ fontSize: "0.9rem", margin: 0 }}><b>Solde compensation Restant :</b> {enseignant.soldeList[0]?.soldeCompRestant}</p>
                                            </>
                                            )}
                                            {enseignant.handicaps.length > 0 && (
                                                <>
                                                  <h6 style={{ fontWeight: "bold", marginBottom: "1rem", fontSize: "25px",marginTop: "1rem" }}>Handicaps</h6>
                                                  <hr style={{ margin: "0 0 1rem 0" }} />
                                                  <Handicaps handicaps={enseignant.handicaps}/>
                                                </>
                                            )}

                                  </div>
                        </div>

              <PDFPreviewModal
                  cin={enseignant.cin}
                  username={`${enseignant.prenom} ${enseignant.nom}`}
                  onCloseMethod={() => setShowPdfPreview(false)}
                  open={showPdfPreview}/>
              <AddSoldeModal
                  open={showSoldModal}
                  onCloseMethod={()=>setShowSoldModal(false)}
                  cin={enseignant.cin}
                  updateSolde={updateSoldeEns}/>

                <AddModal
                    open1={open}
                    handleClose1={handleClose}
                    b64ToImage={displayImgFromB64}
                    enseignantToEdit={enseignant}
                    Modifieenseignant={editfrontEnseignant}

                    />
                <Modal
                  open={openAffecterEmploi}
                  onClose={handleCloseAffecterEmploi}
                  aria-labelledby="modal-affecter-emploi"
                  aria-describedby="modal-affecter-emploi-description"
                >
                  <MDBox
                    sx={{
                      position: "absolute",
                      top: "50%",
                      left: "50%",
                      transform: "translate(-50%, -50%)",
                      width: 400,
                      bgcolor: "background.paper",
                      boxShadow: 24,
                      p: 4,
                      borderRadius: 2,
                    }}
                  >
                    <MDTypography id="modal-affecter-emploi" variant="h6" component="h2">
                      Affecter un emploi du temps
                    </MDTypography>
                    <MDBox component="form" sx={{ mt: 2 }}>
                      <input
                        accept=".pdf,.doc,.docx,.xls,.xlsx"
                        style={{ display: 'none' }}
                        id="file-upload"
                        type="file"
                        onChange={handleFileChange}
                      />
                      <label htmlFor="file-upload">
                        <Button
                          variant="outlined"
                          component="span"
                          fullWidth
                          startIcon={<InsertDriveFileIcon />}
                          sx={{
                            mb: 2,
                            py: 2,
                            borderStyle: 'dashed',
                            borderWidth: 2,
                            borderColor: selectedFile ? 'primary.main' : 'text.disabled',
                            backgroundColor: selectedFile ? 'rgba(25, 118, 210, 0.04)' : 'inherit',
                          }}
                        >
                          {selectedFile ? selectedFile.name : 'Choisir un fichier'}
                        </Button>
                      </label>

                      {selectedFile && (
                        <MDBox
                          sx={{
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'space-between',
                            p: 1,
                            mb: 2,
                            border: 1,
                            borderColor: 'primary.main',
                            borderRadius: 1,
                            backgroundColor: 'rgba(25, 118, 210, 0.08)',
                          }}
                        >
                          <InsertDriveFileIcon color="primary" sx={{ mr: 1 }} />
                          <MDTypography variant="body2" sx={{ flexGrow: 1 }}>
                            {selectedFile.name}
                          </MDTypography>
                          <IconButton
                            size="small"
                            onClick={handleClearFile}
                            color="error"
                          >
                            <ClearIcon fontSize="small" />
                          </IconButton>
                        </MDBox>
                      )}




                      <MDBox sx={{ display: "flex", justifyContent: "flex-end", mt: 2 }}>
                        <Button
                          onClick={handleCloseAffecterEmploi}
                          sx={{ mr: 1 }}
                        >
                          Annuler
                        </Button>
                        <Button
                          variant="contained"
                          disabled={!selectedFile || isUploading}
                          style={{ backgroundColor: selectedFile ? "#1976d2" : "#ccc",color: "white" }}
                          onClick={handleAffecterEmploi}
                        >
                            {isUploading ? "Envoi en cours..." : "Enregistrer"}
                        </Button>
                      </MDBox>
                    </MDBox>
                  </MDBox>
                </Modal>
      </section>
    </DashboardLayout>
  );
}

export default Profile_enseignant;