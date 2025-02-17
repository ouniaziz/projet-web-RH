import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import Fab from "@mui/material/Fab";
import AddIcon from "@mui/icons-material/Add";
import Modal from "@mui/material/Modal";
import { useState } from "react";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Paper from "@mui/material/Paper";
import { DataGrid } from "@mui/x-data-grid/DataGrid";
import { Input } from "@mui/material";
import { ThemeProvider, useTheme } from "@mui/material/styles";
import { useMaterialUIController } from "context";
import theme from "assets/theme";
import themeDark from "assets/theme-dark";
// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDAvatar from "components/MDAvatar";
// Images
import team2 from "assets/images/team-2.jpg";
import user from "assets/user.jpg";
// Material Dashboard 2 React example components
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";
import PropTypes from "prop-types";

function Table_employés() {
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
    const idToDelete = params.row.id;
    setEmployes((prevEmployes) => prevEmployes.filter((employe) => employe.id !== idToDelete));
  };
  
  const handleImageChange2 = (e) => {
    const file = e.target.files[0];
    if (file) {
      setNewEmploye({ ...newEmploye, image: URL.createObjectURL(file) });
    }
  };
  // ajout des employes-----------------------------------------------------------------------------------------------
  const employes_columns = [
    {
      field: "id",
      headerName: "ID",
      width: 70,
    },
    {
      field: "nom",
      headerName: "nom et prénom",
      sortable: false,
      width: 200,
      renderCell: (params) => (
        <Author image={params.row.image} name={params.row.nom} email={params.row.email} />
      ),
    },
    {
      field: "CIN",
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
      field: "age",
      headerName: "Age",
      width: 30,
    },
    {
      field: "telephone",
      headerName: "telephone",
      sortable: false,
      type: "number",
      width: 100,
    },
    {
      field: "Grade",
      headerName: "Grade",
      sortable: false,
      width: 100,
    },
    {
      field: "naissance",
      headerName: "naissance",
      sortable: false,
      width: 120,
    },
    {
      field: "sexe",
      headerName: "sexe",
      sortable: false,
      width: 70,
    },
    {
      field: "poste",
      headerName: "poste",
      sortable: false,
      width: 130,
    },
    {
      field: "ancienneté",
      headerName: "ancienneté",
      sortable: false,
      width: 120,
    },
    {
      field: "handicap",
      headerName: "handicap",
      sortable: false,
      width: 100,
    },
    {
      field: "edit",
      headerName: "",
      sortable: false,
      width: 100,
      renderCell: (params) => (
        <Button variant="text" onClick={() => handleEdit(params.row)}>
          Edit
        </Button>
      ),
    },
    {
      field: "delete",
      headerName: "",
      sortable: false,
      width: 100,
      renderCell: (params) => (
        <Button variant="text" style={{ color: "red" }} onClick={() => delete_row(params)}>
          delete
        </Button>
      ),
    },
  ];
  const employes_rows = [
    {
      id: 1,
      image: team2,
      nom: "John Michael",
      email: "john@creative-tim.com",
      CIN: "12345678",
      adresse: "sousse",
      age: "32",
      telephone: "29292501",
      Grade: "DOCTEUR",
      naissance: "15/02/1990",
      sexe: "H",
      poste: "assistant general",
      ancienneté: "15 ans",
      handicap: "non",
    },
  ];
  const [employes, setEmployes] = useState(employes_rows);
  const [newEmploye, setNewEmploye] = useState({
    id: employes.length + 1,
    image: null,
    nom: "",
    email: "",
    CIN: "",
    adresse: "",
    age: "",
    telephone: "",
    Grade: "",
    naissance: "",
    sexe: "",
    département: "",
    ancienneté: "",
    handicap: "",
  });
  const handleChange1 = (e) => {
    setNewEmploye({ ...newEmploye, [e.target.name]: e.target.value });
  };
  const handleAddEmploye = (e) => {
    e.preventDefault();
    if (
      !newEmploye.nom ||
      !newEmploye.CIN ||
      !newEmploye.email ||
      !newEmploye.adresse ||
      !newEmploye.Grade ||
      !newEmploye.handicap ||
      !newEmploye.naissance ||
      !newEmploye.age ||
      !newEmploye.sexe ||
      !newEmploye.telephone ||
      !newEmploye.poste ||
      !newEmploye.ancienneté
    ) {
      alert("Veuillez remplir tous les champs obligatoires ");
      return;
    }
    setEmployes([...employes, { ...newEmploye, id: employes.length + 1 }]);
    setNewEmploye({
      id: employes.length + 1,
      image: null,
      nom: "",
      email: "",
      CIN: "",
      adresse: "",
      age: "",
      telephone: "",
      Grade: "",
      naissance: "",
      sexe: "",
      poste: "",
      ancienneté: "",
      handicap: "",
    });
    handleClose();
  };
  // ---------------------------------------------------------------------------------------------------------
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const paginationModel = { page: 0, pageSize: 5 };
  const Author = ({ image, name, email }) => (
    <MDBox display="flex" alignItems="center" lineHeight={1}>
      <MDAvatar src={image} name={name} size="sm" />
      <MDBox ml={2} lineHeight={1}>
        <MDTypography display="block" variant="button" fontWeight="medium">
          {name}
        </MDTypography>
        <MDTypography variant="caption">{email}</MDTypography>
      </MDBox>
    </MDBox>
  );
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
                <MDTypography variant="h6" color="white">
                  Les employés
                </MDTypography>
                <Fab color="success" size="small" aria-label="add" onClick={handleOpen}>
                  <AddIcon color="white"/>
                </Fab>
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
                      Ajouter un employé
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
                      borderRadius={2}
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
                          value={newEmploye.nom}
                          onChange={handleChange1}
                          variant="outlined"
                          margin="normal"
                          required
                        />
                        <MDBox style={{ display: "flex", flexDirection: "row", gap: "10px" }}>
                          <input
                            accept="image/*"
                            type="file"
                            name="image"
                            id="upload-photo"
                            style={{ display: "none" }}
                            onChange={handleImageChange2}
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
                          {newEmploye.image && (
                            <img
                              src={newEmploye.image}
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
                          value={newEmploye.CIN}
                          onChange={handleChange1}
                          type="number"
                          variant="outlined"
                          margin="normal"
                          required
                        />
                        <TextField
                          fullWidth
                          label="Email"
                          type="email"
                          name="email"
                          value={newEmploye.email}
                          onChange={handleChange1}
                          variant="outlined"
                          margin="normal"
                          required
                        />
                        <TextField
                          fullWidth
                          name="adresse"
                          label="adresse"
                          value={newEmploye.adresse}
                          onChange={handleChange1}
                          variant="outlined"
                          margin="normal"
                          required
                        />
                        <TextField
                          fullWidth
                          label="Grade"
                          name="Grade"
                          value={newEmploye.Grade}
                          onChange={handleChange1}
                          variant="outlined"
                          margin="normal"
                          required
                        />
                        <TextField
                          fullWidth
                          label="handicap"
                          name="handicap"
                          value={newEmploye.handicap}
                          onChange={handleChange1}
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
                          type="date"
                          name="naissance"
                          value={newEmploye.naissance}
                          onChange={handleChange1}
                          variant="outlined"
                          margin="normal"
                          required
                          InputLabelProps={{
                            shrink: true,
                          }}
                        />
                        <TextField
                          fullWidth
                          label="age"
                          name="age"
                          value={newEmploye.age}
                          onChange={handleChange1}
                          type="number"
                          variant="outlined"
                          margin="normal"
                          required
                        />
                        <RadioGroup
                          aria-labelledby="demo-radio-buttons-group-label"
                          defaultValue="male"
                          name="sexe"
                          value={newEmploye.sexe}
                          onChange={handleChange1}
                          style={{
                            display: "flex",
                            flexDirection: "row",
                            height: "30px",
                            margin: "9px",
                          }}
                        >
                          <FormControlLabel value="male" control={<Radio />} label="Male" />
                          <FormControlLabel value="female" control={<Radio />} label="Female" />
                        </RadioGroup>
                        <TextField
                          fullWidth
                          label="telephone"
                          type="tel"
                          name="telephone"
                          value={newEmploye.telephone}
                          onChange={handleChange1}
                          variant="outlined"
                          margin="normal"
                          required
                        />
                        <TextField
                          fullWidth
                          label="poste"
                          name="poste"
                          value={newEmploye.poste}
                          onChange={handleChange1}
                          variant="outlined"
                          margin="normal"
                          required
                        />
                        <TextField
                          fullWidth
                          label="ancienneté"
                          name="ancienneté"
                          value={newEmploye.ancienneté}
                          onChange={handleChange1}
                          type="number"
                          variant="outlined"
                          margin="normal"
                          required
                        />
                        <Button
                          type="submit"
                          color="primary"
                          variant="contained"
                          onClick={handleAddEmploye}
                          sx={{ mt: 7 }}
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
                      rows={employes}
                      columns={employes_columns}
                      initialState={{ pagination: { paginationModel } }}
                      pageSizeOptions={[5, 10]}
                      sx={{ border: 0 }}
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

export default Table_employés;
