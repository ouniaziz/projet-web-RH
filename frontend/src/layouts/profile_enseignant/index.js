import React,{ useState } from 'react';
import {useEffect} from "react";
import "./assests/profile.css";
import "./assests/loader.css";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import { useLocation } from "react-router-dom";
import Handicaps from './components/Handicaps';
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
        id: {
          handicapId: 1,
          cin: ""
        },
        severity: "",
        assistive_devices: ""
      }
    ],
    soldeList: [
      {
        id: {
          annee: 2025,
          cin: ""
        },
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
  });
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

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
  
  const handleSubmit = (e) => {
    e.preventDefault();
    handleClose();
    // Ici vous pourriez ajouter une logique pour sauvegarder les modifications
    // par exemple une requête API pour mettre à jour l'employé en base de données
  };
  const formatDate = (dateString) => {
    if (!dateString) return ""; // Retourne une chaîne vide si dateString est undefined/null
    
    // Vérifie si dateString est une chaîne avant d'appeler includes()
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
                                                        <p style={{  fontSize: "0.9rem",margin: 0 }}>{enseignant.depart.nomDep}</p>
                                                      </div>
                                                      <div style={{ width: "50%" }}>
                                                        <h6 style={{ fontSize: "0.8rem", color: "#6c757d", marginBottom: "0.5rem" }}>Ancienneté</h6>
                                                        <p style={{ fontSize: "0.9rem", margin: 0 }}>{enseignant.anciennete} ans</p>
                                                      </div>
                                            </div>
                                            {enseignant.handicaps && (
                                                <>
                                                  <h6 style={{ fontWeight: "bold", marginBottom: "1rem", fontSize: "25px",marginTop: "1rem" }}>Handicaps</h6>
                                                  <hr style={{ margin: "0 0 1rem 0" }} />
                                                  <Handicaps handicaps={enseignant.handicaps}/>
                                                </>
                                            )}

                                  </div>
                        </div>




                   <Modal
                    open={open}
                    onClose={handleClose}
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
                      <MDTypography id="modal-title" variant="h6" mb={3}>
                        Modifier le profil
                      </MDTypography>
                      <MDBox
                        component="form"
                        onSubmit={handleSubmit}
                        display="flex"
                        flexDirection="row"
                        width="100%"
                      >
                        <MDBox width="50%" pr={2}>
                          <TextField
                            fullWidth
                            label="Nom et prénom"
                            name="nom"
                            value={enseignant.nom}
                            onChange={handleChange}
                            margin="normal"
                            required
                          />
                          <MDBox style={{ display: "flex", flexDirection: "row", gap: "10px" }}>
                            <input
                              accept="image/*"
                              type="file"
                              id="upload-photo"
                              name="image"
                              style={{ display: "none" }}
                              onChange={handleImageChange}
                            />
                            <label htmlFor="upload-photo">
                              <Button
                                variant="contained"
                                component="span"
                                color="secondary"
                                sx={{ mt: 1 }}
                                style={{height: "50px", color: "white",width: "260px"}}
                              >
                                Changer la photo
                              </Button>
                            </label>
                            <img
                              src={displayImgFromB64(enseignant.image)}
                              alt="photo actuelle"
                              style={{
                                marginTop: "10px",
                                width: "80px",
                                height: "50px",
                                objectFit: "cover",
                                borderRadius: "10px",
                              }}
                            />
                          </MDBox>
                          <TextField
                            fullWidth
                            label="CIN"
                            name="cin"
                            value={enseignant.cin}
                            onChange={handleChange}
                            margin="normal"
                            required
                          />
                          <TextField
                            fullWidth
                            label="Email"
                            name="email"
                            value={enseignant.email}
                            onChange={handleChange}
                            margin="normal"
                            required
                          />
                          <TextField
                            fullWidth
                            label="Adresse"
                            name="adresse"
                            value={enseignant.adresse}
                            onChange={handleChange}
                            margin="normal"
                            required
                          />
                          <TextField
                            fullWidth
                            label="Grade"
                            name="grad"
                            value={enseignant.grad}
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
                            name="dateN"
                            value={formatDate(enseignant.dateN)}
                            onChange={handleChange}
                            margin="normal"
                            InputLabelProps={{ shrink: true }}
                            required
                          />
                          <RadioGroup
                            aria-labelledby="demo-radio-buttons-group-label"
                            name="sexe"
                            value={enseignant.sexe}
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
                            <FormControlLabel value="Homme" control={<Radio />} label="Homme" />
                            <FormControlLabel value="Femme" control={<Radio />} label="Femme" />
                          </RadioGroup>
                          <TextField
                            fullWidth
                            label="Téléphone"
                            name="telephone"
                            value={enseignant.telephone}
                            onChange={handleChange}
                            margin="normal"
                            required
                          />
                          <TextField
                            fullWidth
                            label="département"
                            name="departement"
                            value={enseignant.departement}
                            onChange={handleChange}
                            margin="normal"
                            required
                          />
                          <TextField
                            fullWidth
                            label="Ancienneté (années)"
                            name="anciennete"
                            value={enseignant.anciennete}
                            onChange={handleChange}
                            margin="normal"
                            required
                          />
                           <TextField
                            fullWidth
                            label="handicap"
                            name="hasHandicaps"
                            value={enseignant.hasHandicaps}
                            onChange={handleChange}
                            variant="outlined"
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



      </section>
    </DashboardLayout>
  );
}

export default Profile_enseignant;