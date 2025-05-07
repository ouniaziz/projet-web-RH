import React,{ useState } from 'react';
import {useEffect} from "react";
import "./assests/profile.css";
import "./assests/loader.css";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import { useLocation } from "react-router-dom";
import Handicaps from './components/Handicaps';
import {useNotificationStore} from "../.././service/notificationService";
import { CircularProgress } from '@mui/material';

import {
  Modal,
  TextField,
  Button,
  Radio,
  RadioGroup,
  FormControlLabel
} from "@mui/material";
import MDBox from "components/MDBox";
import { Box } from '@mui/material';
import MDTypography from "components/MDTypography";
import { myApi } from "../../service/myApi";
import AddModal from './components/AddModal';
import ListAltIcon from '@mui/icons-material/ListAlt';
import InsertDriveFileIcon from '@mui/icons-material/InsertDriveFile';
import ClearIcon from '@mui/icons-material/Clear';
import IconButton from '@mui/material/IconButton';
import { Document, Page } from 'react-pdf';
import 'react-pdf/dist/esm/Page/AnnotationLayer.css';
import 'react-pdf/dist/esm/Page/TextLayer.css';
import { pdfjs } from 'react-pdf';
import {useStore} from "../../service/store";
pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.min.js`;
function ProfilePage() {
  const location = useLocation();
  const [open, setOpen] = useState(false);
  const cin =useStore(state=>state.cin); //!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
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
  const showNotification = useNotificationStore((state) => state.showNotification); 
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [openAffecterEmploi, setOpenAffecterEmploi] = useState(false);
  const handleCloseAffecterEmploi = () => setOpenAffecterEmploi(false);
  const [selectedFile, setSelectedFile] = useState(null);
  const [emploiData, setEmploiData] = useState(null);
  const [emploiLoading, setEmploiLoading] = useState(false);
  const [emploiError, setEmploiError] = useState(null);
  const [numPages, setNumPages] = useState(null);
  const onDocumentLoadSuccess = ({ numPages }) => {
    setNumPages(numPages);
  };
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
    const handleOpenAffecterEmploi = async () => {
      setEmploiLoading(true);
      setEmploiError(null);
      
      try {
        const response = await myApi.GetEmploi(enseignant.cin);
        const blob = new Blob([response], { type: 'application/pdf' });
        const url = URL.createObjectURL(blob);
        setEmploiData(url);
        setOpenAffecterEmploi(true);
      } catch (error) {
        console.error("Erreur lors du chargement de l'emploi:", error);
        setEmploiError("Impossible de charger l'emploi du temps");
      } finally {
        setEmploiLoading(false);
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
                                            <Button variant="outlined" style={{ fontSize:"15px", color:"Highlight" }} onClick={handleOpenAffecterEmploi}disabled={emploiLoading}>
                                                        {emploiLoading ? "Chargement..." : "Consulter Emploi"}
                                            </Button>
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
                                              <h6 style={{ fontWeight: "bold", marginBottom: "1rem", fontSize: "25px",marginTop: "1rem",display: "flex"}}>Congés</h6>
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
  aria-labelledby="modal-consulter-emploi"
>
  <MDBox sx={{
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: "80%",
    maxWidth: 900,
    bgcolor: "background.paper",
    boxShadow: 24,
    p: 4,
    borderRadius: 2,
    display: "flex",
    flexDirection: "column",
    maxHeight: "80vh"
  }}>
    <MDTypography id="modal-consulter-emploi" variant="h6" component="h2">
      Emploi du temps - {enseignant.nom} {enseignant.prenom}
    </MDTypography>
    
    {emploiLoading ? (
      <MDBox display="flex" justifyContent="center" alignItems="center" py={6}>
        <CircularProgress />
      </MDBox>
    ) : emploiError ? (
      <MDTypography color="error" textAlign="center" py={2}>
        {emploiError}
      </MDTypography>
    ) : emploiData ? (
      <>
        <MDBox sx={{ 
          flex: 1, 
          overflow: "auto", 
          mt: 2,
          border: "1px solid #eee",
          borderRadius: 1,
          minHeight: "400px"
        }}>
          <Document
          file={emploiData}
          onLoadSuccess={onDocumentLoadSuccess}
          loading={
            <MDBox display="flex" justifyContent="center" alignItems="center" height="100%">
              <CircularProgress />
            </MDBox>
          }
        >
          {Array.from(new Array(numPages), (_, index) => (
            <Page 
              key={`page_${index + 1}`}
              pageNumber={index + 1}
              width={600}
            />
          ))}
        </Document>
        </MDBox>
        
        <MDBox display="flex" justifyContent="flex-end" mt={2}>
          <Button 
            variant="contained"
            startIcon={<InsertDriveFileIcon />}
            onClick={() => {
              const link = document.createElement('a');
              link.href = `data:application/pdf;base64,${emploiData}`;
              link.download = `emploi_${enseignant.cin}.pdf`;
              link.click();
            }}
            sx={{ mr: 1 }}
          >
            Télécharger
          </Button>
          
          <Button 
            onClick={handleCloseAffecterEmploi}
            variant="outlined"
          >
            Fermer
          </Button>
        </MDBox>
      </>
    ) : (
      <MDTypography textAlign="center" py={2}>
        Aucun emploi du temps disponible
      </MDTypography>
    )}
  </MDBox>
</Modal>
      </section>
    </DashboardLayout>
  );
}

export default ProfilePage;