import React,{ useState } from 'react';
import "./assests/profile.css";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import { useLocation } from "react-router-dom";
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
function Profile() {
  const location = useLocation();
  const [open, setOpen] = useState(false);
  const [employee, setEmployee] = useState(location.state || {
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSsb_V_Ha4XAl47doWf_2lF-actuld60ssYew&s",
    nom: "Marie Horwitz",
    email: "info@example.com",
    telephone: "123 456 789",
    CIN: "12345678",
    adresse: "Adresse par défaut",
    age: "30",
    naissance: "01/01/1990",
    sexe: "Femme",
    handicap: "Non",
    poste: "Poste par défaut",
    ancienneté: "5 ans"
  });
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEmployee(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setEmployee(prev => ({
        ...prev,
        image: imageUrl
      }));
    }
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    handleClose();
    // Ici vous pourriez ajouter une logique pour sauvegarder les modifications
    // par exemple une requête API pour mettre à jour l'employé en base de données
  };
  const formatDate = (dateString) => {
    if (dateString.includes('/')) {
      const [day, month, year] = dateString.split('/');
      return `${year}-${month.padStart(2, '0')}-${day.padStart(2, '0')}`;
    }
    return dateString;
  };
  return (
    <DashboardLayout>
      <DashboardNavbar />  
      <section style={{ backgroundColor: "#f4f5f7", padding: "20px" }}>
                        <div style={{ display: "flex", flexDirection: "row",backgroundColor: "#fff",borderRadius: "0.5rem",overflow: "hidden"}}>    

                                  <div style={{width: "25%",backgroundColor: "#f4f5f7",padding: "2rem",display: "flex",flexDirection: "column",alignItems: "center",justifyContent: "center",textAlign: "center"}} className="gradient-custom ">
                                            <img src={employee.image} alt="Avatar" style={{ width: "120px",height:"125px", borderRadius: "50%", marginBottom: "1rem"}}/>
                                            <h5 style={{ margin: "0.5rem 0", fontWeight: "bold" }}>{employee.nom}</h5>
                                            <p style={{ margin: 0, color: "#6c757d" }}>{employee.poste}</p>
                                            <i className="far fa-edit"style={{marginTop:"20px",cursor:"pointer" }}onClick={handleOpen}></i>
                                  </div>
                                  
                                  <div style={{ width: "75%", padding: "2rem"}}>
                                            <h6 style={{ fontWeight: "bold", marginBottom: "1rem",fontSize:"25px"}}>Informations Personnelles</h6>
                                            <hr style={{ margin: "0 0 1rem 0" }}/>
                            
                                            <div style={{ display: "flex", marginBottom: "1.5rem" }}>
                                                      <div style={{ width: "50%" }}>
                                                        <h6 style={{ fontSize: "0.8rem", color: "#6c757d", marginBottom: "0.5rem" }}>Email</h6>
                                                        <p style={{fontSize: "0.9rem", margin: 0 }}>{employee.email}</p>
                                                      </div>
                                                      <div style={{ width: "50%" }}>
                                                        <h6 style={{ fontSize: "0.8rem", color: "#6c757d", marginBottom: "0.5rem" }}>Phone</h6>
                                                        <p style={{ fontSize: "0.9rem",margin: 0 }}>{employee.telephone}</p>
                                                      </div>
                                                      
                                            </div>
                                            <div style={{ display: "flex", marginBottom: "1.5rem" }}>
                                                      <div style={{ width: "50%" }}>
                                                        <h6 style={{ fontSize: "0.8rem", color: "#6c757d", marginBottom: "0.5rem" }}>CIN </h6>
                                                        <p style={{ fontSize: "0.9rem",margin: 0 }}>{employee.CIN}</p>
                                                      </div>
                                                      <div style={{ width: "50%" }}>
                                                        <h6 style={{ fontSize: "0.8rem", color: "#6c757d", marginBottom: "0.5rem" }}>Adresse</h6>
                                                        <p style={{ fontSize: "0.9rem",margin: 0 }}>{employee.adresse}</p>
                                                      </div>
                                                      
                                            </div>
                                            <div style={{ display: "flex", marginBottom: "1.5rem" }}>
                                                      <div style={{ width: "50%" }}>
                                                        <h6 style={{ fontSize: "0.8rem", color: "#6c757d", marginBottom: "0.5rem" }}>Age </h6>
                                                        <p style={{ fontSize: "0.9rem",margin: 0 }}>{employee.age}</p>
                                                      </div>
                                                      <div style={{ width: "50%" }}>
                                                        <h6 style={{ fontSize: "0.8rem", color: "#6c757d", marginBottom: "0.5rem" }}>Date de naissance</h6>
                                                        <p style={{ fontSize: "0.9rem",margin: 0 }}>{formatDate(employee.naissance)}</p>
                                                      </div>
                                                      
                                            </div>
                                            <div style={{ display: "flex", marginBottom: "1.5rem" }}>
                                                      <div style={{ width: "50%" }}>
                                                        <h6 style={{ fontSize: "0.8rem", color: "#6c757d", marginBottom: "0.5rem" }}>Sexe </h6>
                                                        <p style={{ fontSize: "0.9rem",margin: 0 }}>{employee.sexe}</p>
                                                      </div>
                                                      <div style={{ width: "50%" }}>
                                                        <h6 style={{ fontSize: "0.8rem", color: "#6c757d", marginBottom: "0.5rem" }}>Handicap</h6>
                                                        <p style={{ fontSize: "0.9rem",margin: 0 }}>{employee.handicap}</p>
                                                      </div>
                                                      
                                            </div>
                              
                                            <h6 style={{ fontWeight: "bold", marginBottom: "1rem",fontSize:"25px" }}>Informations Professionnelles</h6>
                                            <hr style={{ margin: "0 0 1rem 0" }}/>
                            
                                            <div style={{ display: "flex" }}>
                                                      <div style={{ width: "50%" }}>
                                                        <h6 style={{ fontSize: "0.8rem", color: "#6c757d", marginBottom: "0.5rem" }}>Grade</h6>
                                                        <p style={{  fontSize: "0.9rem",margin: 0 }}>{employee.Grade}</p>
                                                      </div>
                                                      <div style={{ width: "50%" }}>
                                                        <h6 style={{ fontSize: "0.8rem", color: "#6c757d", marginBottom: "0.5rem" }}>Ancienneté</h6>
                                                        <p style={{ fontSize: "0.9rem", margin: 0 }}>{employee.ancienneté} ans</p>
                                                      </div>
                                            </div>
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
                            value={employee.nom}
                            onChange={handleChange}
                            margin="normal"
                            required
                          />
                          <MDBox style={{ display: "flex", flexDirection: "row", gap: "10px"}}>
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
                              src={employee.image}
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
                            name="CIN"
                            value={employee.CIN}
                            onChange={handleChange}
                            margin="normal"
                            required
                          />
                          <TextField
                            fullWidth
                            label="Email"
                            name="email"
                            value={employee.email}
                            onChange={handleChange}
                            margin="normal"
                            required
                          />
                          <TextField
                            fullWidth
                            label="Adresse"
                            name="adresse"
                            value={employee.adresse}
                            onChange={handleChange}
                            margin="normal"
                            required
                          />
                          <TextField
                            fullWidth
                            label="Grade"
                            name="Grade"
                            value={employee.Grade}
                            onChange={handleChange}
                            variant="outlined"
                            margin="normal"
                            required
                          />
                          <TextField
                            fullWidth
                            label="handicap"
                            name="handicap"
                            value={employee.handicap}
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
                            value={formatDate(employee.naissance)}
                            onChange={handleChange}
                            margin="normal"
                            InputLabelProps={{ shrink: true }}
                            required
                          />
                          <TextField
                            fullWidth
                            label="Âge"
                            name="age"
                            value={employee.age}
                            onChange={handleChange}
                            margin="normal"
                            required
                          />
                          <RadioGroup
                            aria-labelledby="demo-radio-buttons-group-label"
                            name="sexe"
                            value={employee.sexe}
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
                            value={employee.telephone}
                            onChange={handleChange}
                            margin="normal"
                            required
                          />
                          <TextField
                            fullWidth
                            label="Poste"
                            name="poste"
                            value={employee.poste}
                            onChange={handleChange}
                            margin="normal"
                            required
                          />
                          <TextField
                            fullWidth
                            label="Ancienneté (années)"
                            name="ancienneté"
                            value={employee.ancienneté}
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



      </section>
    </DashboardLayout>
  );
}

export default Profile;