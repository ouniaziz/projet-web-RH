import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";

import AddIcon from "@mui/icons-material/Add";
import Modal from "@mui/material/Modal";
import {useEffect, useState } from "react";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Paper from "@mui/material/Paper";
import { DataGrid } from "@mui/x-data-grid/DataGrid";

import { ThemeProvider, useTheme } from "@mui/material/styles";
import { useMaterialUIController } from "context";

import themeDark from "assets/theme-dark";
// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDAvatar from "components/MDAvatar";
// Images
import team2 from "assets/images/team-2.jpg";

// Material Dashboard 2 React example components
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";
import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";
// 
import DeleteIcon from "@mui/icons-material/Delete";
import IconButton from "@mui/material/IconButton";
import { myApi } from "../../service/myApi";
import { Chip } from "@mui/material";


function Table_enseignants() {
  const [controller] = useMaterialUIController();
  const { darkMode } = controller;
  const theme = useTheme();
  const defaultImage="url(${user})";
  const isDarkMode = theme.palette.mode === "dark";
  const delete_row = (params) => {
    if (!params || !params.row) {
      console.error("Impossible de supprimer : les données de la ligne sont invalides.");
      return;
    }
    const idToDelete = params.row.cin;
    setEnseignants((prevEnseignant) => prevEnseignant.filter((enseignant) => enseignant.cin !== idToDelete));
  };
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setNewEnseignant((prev) => ({ ...prev, image: reader.result.split(',')[1] })); // stocke uniquement les données base64
      };
      reader.readAsDataURL(file);
    }
  };
  const enseignants_columns = [
    {
      field: "nom",
      headerName: "profile ",
      sortable: false,
      width: 210,
      renderCell: (params) => (
        <Author
          image={params.row.image || defaultImage}
          name={params.row.nom+(params.row.prenom ? " " + params.row.prenom : "")}
          email={params.row.email}
        />
      ),
    },
    {
      field: "cin",
      headerName: "CIN",
      sortable: false,
      width: 0,
    },
    {
      field: "adresse",
      headerName: "adresse",
      sortable: false,
      width: 100,
    },
    {
      field: "telephone",
      headerName: "telephone",
      sortable: false,
      type: "number",
      width: 100,
    },
    {
      field: "grad",
      headerName: "Grade",
      sortable: false,
      width: 100,
    },
    {
      field: "dateN",
      headerName: "date naissance",
      sortable: false,
      width: 160,
    },
    {
      field: "sexe",
      headerName: "sexe",
      sortable: false,
      width: 90,
    },
    {
      field: "departement",
      headerName: "département",
      sortable: false,
      width: 130,
    },
    {
      field: "anciennete",
      headerName: "ancienneté",
      sortable: false,
      width: 120,
    },
    {
      field: "hasHandicaps",
      headerName: "handicap",
      sortable: false,
      width: 100,
    },
    {
      "field": "status",
      "headerName": "Status",
      "sortable": false,
      "width": 100,
        "renderCell": (params)=>(<Chip  label={params.row.status?"Actif":"Inactif"} variant={"outlined"} color={params.row.status?"success":"error"}/>)
    },
    {
      field: "actions",
      headerName: "",
      sortable: false,
      width: 70,
      renderCell: (params) => (
        <>
        <IconButton size={"medium"} style={{ color: "red" }} onClick={(e) =>{e.stopPropagation();delete_row(params);}}>
          <DeleteIcon fontSize={"inherit"} />
        </IconButton>
        </>
      ),
    },
  ];

  const [enseignants,   setEnseignants] = useState([]);
  const [newEnseignant, setNewEnseignant] = useState({
    image: null,
    nom: "",
    email: "",
    cin: "",
    adresse: "",
    telephone: "",
    grad: "",
    dateN: "",
    sexe: "",
    departement: "",
    anciennete: "",
    hasHandicaps: "",
  });
  const handleChange = (e) => {
    setNewEnseignant({ ...newEnseignant, [e.target.name]: e.target.value });
  };
  const handleAddEnseignant = (e) => {
    e.preventDefault();
    if (
      !newEnseignant.nom ||
      !newEnseignant.cin ||
      !newEnseignant.email ||
      !newEnseignant.adresse ||
      !newEnseignant.grad ||
      !newEnseignant.hasHandicaps ||
      !newEnseignant.dateN ||
      !newEnseignant.sexe ||
      !newEnseignant.telephone ||
      !newEnseignant.departement ||
      !newEnseignant.anciennete
    ) {
      alert("Veuillez remplir tous les champs obligatoires ");
      return;
    }
    setEnseignants([...enseignants, { ...newEnseignant}]);
    setNewEnseignant({
      image: null,
      nom: "",
      email: "",
      cin: "",
      adresse: "",
      telephone: "",
      grad: "",
      dateN: "",
      sexe: "",
      departement: "",
      anciennete: "",
      hasHandicaps: "",
    });
    handleClose1();
  };
  // ---------------------------------------------------------------------------------------------------------
  const [open1, setOpen1] = useState(false);
  const handleOpen1 = () => setOpen1(true);
  const handleClose1 = () => setOpen1(false);
  const paginationModel = { page: 0, pageSize: 5 };
  const displayImgFromB64 = (image) => {
    const mimeType = "application/octet-stream"; // ou "image/jpeg", "image/png", etc.
    return image ? `data:${mimeType};base64,${image}` : defaultImage;
  };
  const Author = ({ image, name, email }) => {
    return (
      <MDBox display="flex" alignItems="center" lineHeight={1}>
        <MDAvatar src={displayImgFromB64(image)} name={name} size="md" />
        <MDBox ml={2} lineHeight={1}>
          <MDTypography display="block" variant="button" fontWeight="medium">
            {name}
          </MDTypography>
          <MDTypography variant="caption">{email}</MDTypography>
        </MDBox>
      </MDBox>
    );
  };
  
  Author.propTypes = {
    image: PropTypes.object.isRequired,
    name: PropTypes.string.isRequired,
    email: PropTypes.string.isRequired,
  };
  const handleEdit = (row) => {
    console.log("Édition de :", row);
  };
  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    bgcolor: "background.paper",
    border: "2px solid #000",
    boxShadow: 24,
    p: 4,
  };
  const navigate = useNavigate();
  const handleRowClick = (params, event) => {
    if (event.target.closest('button[color="red"]')) {
      return;
    }
    navigate(`/main/profile_enseignant/`, { state: params.row });
  };
  const [isLoading, setIsLoading] = useState(false);
  useEffect(() => {
    setIsLoading(true)
    myApi.getEnseignants().then(enseignants=>{
      setEnseignants(enseignants.data);
    }).catch(err=>{
      console.error("Error while fetching records", err)
    }).finally(()=>{
      setIsLoading(false)
    })
  }, []);
  return (
    <DashboardLayout>
      <DashboardNavbar />
      <MDBox pt={6} pb={3}>
        <Grid container spacing={6}>
          <Grid item xs={12}>
            <Card>
              <MDBox
                mx={2}
                mt={-3}
                py={3}
                px={2}
                variant="gradient"
                bgColor="info"
                borderRadius="lg"
                coloredShadow="info"
                style={{ display: "flex", justifyContent: "space-between" }}
              >
                <MDTypography variant="h5" color="white">
                  Les enseignants
                </MDTypography>
                <IconButton size="large" aria-label="add" onClick={handleOpen1}>
                  <AddIcon color="white" fontSize="inherit"/>
                </IconButton>

                <Modal
                  open={open1}
                  onClose={handleClose1}
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
                    borderRadius="2px"
                    style={{ backgroundColor: "white" }}
                  >
                    <MDTypography id="modal-title" variant="h6" mb={3}>
                      Ajouter un enseignant
                    </MDTypography>
                    <MDBox
                      component="form"
                      onSubmit={(e) => {
                        e.preventDefault();
                        handleClose();
                      }}
                      display="flex"
                      flexDirection="row"
                      alignItems="center"
                      justifyContent="center"
                      transform="translate(-50%, -50%)"
                      boxShadow={10}
                      p={28}
                      borderRadius="2px"
                      style={{ backgroundColor: "white" }}
                    >
                      <MDBox
                        display="flex"
                        flexDirection="column"
                        alignItems="center"
                        justifyContent="center"
                        position="absolute"
                        left="80px"
                        top="64px"
                        width={300}
                      >
                        <TextField
                          fullWidth
                          label="Nom et prenom"
                          name="nom"
                          value={newEnseignant.nom}
                          onChange={handleChange}
                          variant="outlined"
                          margin="normal"
                          required
                        />
                        <MDBox style={{ display: "flex", flexDirection: "row", gap: "10px" }}>
                          <input
                            accept="image/*"
                            type="file"
                            id="upload-photo"
                            style={{ display: "none" }}
                            onChange={handleImageChange}
                            required
                          />
                          <label htmlFor="upload-photo">
                            <Button
                              variant="contained"
                              component="span"
                              color="secondary"
                              sx={{ mt: 1 }}
                              style={{ width: 210, height: "50px", color: "white" }}
                            >
                              Upload Photo
                            </Button>
                          </label>
                          {newEnseignant.image && (
                            <img
                              src={displayImgFromB64(newEnseignant.image)}
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
                          type="number"
                          name="cin"
                          value={newEnseignant.cin}
                          onChange={handleChange}
                          variant="outlined"
                          margin="normal"
                          required
                        />
                        <TextField
                          fullWidth
                          label="Email"
                          type="email"
                          name="email"
                          value={newEnseignant.email}
                          onChange={handleChange}
                          variant="outlined"
                          margin="normal"
                          required
                        />
                        <TextField
                          fullWidth
                          label="adresse"
                          name="adresse"
                          value={newEnseignant.adresse}
                          onChange={handleChange}
                          variant="outlined"
                          margin="normal"
                          required
                        />
                        <TextField
                          fullWidth
                          label="Grade"
                          name="grad"
                          value={newEnseignant.grad}
                          onChange={handleChange}
                          variant="outlined"
                          margin="normal"
                          required
                        />
                        
                      </MDBox>
                      <MDBox
                        display="flex"
                        flexDirection="column"
                        alignItems="center"
                        justifyContent="center"
                        position="absolute"
                        right="80px"
                        top="64px"
                        width={300}
                      >
                        <TextField
                          fullWidth
                          label="date de naissance"
                          name="dateN"
                          value={newEnseignant.dateN}
                          onChange={handleChange}
                          type="date"
                          variant="outlined"
                          margin="normal"
                          required
                          InputLabelProps={{
                            shrink: true,
                          }}
                        />
                        <RadioGroup
                          aria-labelledby="demo-radio-buttons-group-label"
                          defaultValue="male"
                          name="sexe"
                          value={newEnseignant.sexe}
                          onChange={handleChange}
                          style={{
                            display: "flex",
                            flexDirection: "row",
                            height: "30px",
                            margin: "14px",
                          }}
                        >
                          <FormControlLabel value="Homme" control={<Radio />} label="Homme" />
                          <FormControlLabel value="Femme" control={<Radio />} label="Femme" />
                        </RadioGroup>
                        <TextField
                          fullWidth
                          label="telephone"
                          name="telephone"
                          value={newEnseignant.telephone}
                          onChange={handleChange}
                          type="tel"
                          variant="outlined"
                          margin="normal"
                          required
                        />
                        <TextField
                          fullWidth
                          label="département"
                          name="departement"
                          value={newEnseignant.departement}
                          onChange={handleChange}
                          variant="outlined"
                          margin="normal"
                          required
                        />
                        <TextField
                          fullWidth
                          label="ancienneté"
                          name="anciennete"
                          value={newEnseignant.anciennete}
                          onChange={handleChange}
                          type="number"
                          variant="outlined"
                          margin="normal"
                          required
                        />
                        <TextField
                          fullWidth
                          label="handicap"
                          name="hasHandicaps"
                          value={newEnseignant.hasHandicaps}
                          onChange={handleChange}
                          variant="outlined"
                          margin="normal"
                          required
                        />
                        <Button
                          type="submit"
                          color="primary"
                          variant="contained"
                          onClick={handleAddEnseignant}
                          sx={{ mt: 3}}
                          style={{ width: 300, color: "white" }}
                        >
                          Ajouter
                        </Button>
                      </MDBox>
                    </MDBox>
                  </MDBox>
                </Modal>
              </MDBox>
              <MDBox pt={3}>
                <ThemeProvider theme={darkMode ? themeDark : theme}>
                  <Paper sx={{ height: 400, width: "100%" }}>
                    <DataGrid
                      rows={enseignants}
                      columns={enseignants_columns}
                      initialState={{ pagination: { paginationModel } }}
                      pageSizeOptions={[5, 10]}
                      sx={{ border: 0 }}
                      getRowId={(row) => row.cin}
                      onRowClick={handleRowClick}
                      style={{ cursor: 'pointer' }}
                      loading={isLoading}
                      slotProps={{
                        loadingOverlay: {
                          variant: 'skeleton',
                          noRowsVariant: 'skeleton',
                        },
                      }}
                    />
                  </Paper>
                </ThemeProvider>
              </MDBox>
            </Card>
          </Grid>
        </Grid>
      </MDBox>
      <Footer />
    </DashboardLayout>
  );
}

export default Table_enseignants;
