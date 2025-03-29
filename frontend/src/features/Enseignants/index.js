import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";

import AddIcon from "@mui/icons-material/Add";
import Modal from "@mui/material/Modal";
import { useState } from "react";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Paper from "@mui/material/Paper";
import { DataGrid } from "@mui/x-data-grid";

import { ThemeProvider, useTheme } from "@mui/material/styles";
import { useMaterialUIController } from "../../context";

import themeDark from "../../assets/theme-dark";
// Material Dashboard 2 React components
import MDBox from "../../components/MDBox";
import MDTypography from "../../components/MDTypography";
import MDAvatar from "../../components/MDAvatar";
// Images
import team2 from "../../assets/images/team-2.jpg";
import user from "../../assets/user.jpg";
// Material Dashboard 2 React example components
import DashboardLayout from "../../examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "../../examples/Navbars/DashboardNavbar";
import Footer from "../../examples/Footer";
import PropTypes from "prop-types";
import IconButton from "@mui/material/IconButton";


function AddModal({open, handleClose, handleAddEnseignant}){
  const [newEnseignant, setNewEnseignant] = useState({
    image: null,
    nom: "",
    email: "",
    cin: "",
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

  const handleImageChange2 = (e) => {
    const file = e.target.files[0];
    if (file) {
      setNewEnseignant({ ...newEnseignant, image: URL.createObjectURL(file) });
    }
  };

  const handleChange1 = (e) => {
    setNewEnseignant({ ...newEnseignant, [e.target.name]: e.target.value });
  };

  const addEnseignant = (e)=>{
    e.preventDefault();
    if (!newEnseignant.nom ||!newEnseignant.cin || !newEnseignant.email || !newEnseignant.adresse || !newEnseignant.Grade || !newEnseignant.handicap || !newEnseignant.naissance || !newEnseignant.age || !newEnseignant.sexe || !newEnseignant.telephone || !newEnseignant.poste || !newEnseignant.ancienneté) {
      alert("Veuillez remplir tous les champs obligatoires ");
      return;
    }

    handleAddEnseignant(newEnseignant);

    setNewEnseignant({
      image: null,
      nom: "",
      email: "",
      cin: "",
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
  }
  return(
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
        position="relative"
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
              {newEnseignant.image && (
                <img
                  src={newEnseignant.image}
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
              label="cin"
              name="cin"
              value={newEnseignant.cin}
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
              value={newEnseignant.email}
              onChange={handleChange1}
              variant="outlined"
              margin="normal"
              required
            />
            <TextField
              fullWidth
              name="adresse"
              label="adresse"
              value={newEnseignant.adresse}
              onChange={handleChange1}
              variant="outlined"
              margin="normal"
              required
            />
            <TextField
              fullWidth
              label="Grade"
              name="Grade"
              value={newEnseignant.Grade}
              onChange={handleChange1}
              variant="outlined"
              margin="normal"
              required
            />
            <TextField
              fullWidth
              label="handicap"
              name="handicap"
              value={newEnseignant.handicap}
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
              value={newEnseignant.naissance}
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
              value={newEnseignant.age}
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
              value={newEnseignant.sexe}
              onChange={handleChange1}
              style={{
                display: "flex",
                flexDirection: "row",
                height: "30px",
                margin: "9px",
              }}
            >
              <FormControlLabel value="H" control={<Radio />} label="Male" />
              <FormControlLabel value="F" control={<Radio />} label="Female" />
            </RadioGroup>
            <TextField
              fullWidth
              label="telephone"
              type="tel"
              name="telephone"
              value={newEnseignant.telephone}
              onChange={handleChange1}
              variant="outlined"
              margin="normal"
              required
            />
            <TextField
              fullWidth
              label="poste"
              name="poste"
              value={newEnseignant.poste}
              onChange={handleChange1}
              variant="outlined"
              margin="normal"
              required
            />
            <TextField
              fullWidth
              label="ancienneté"
              name="ancienneté"
              value={newEnseignant.ancienneté}
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
              onClick={handleAddEnseignant}
              sx={{ mt: 7 }}
              style={{ width: 300, color: "white" }}
            >
              Ajouter
            </Button>
          </MDBox>
        </MDBox>
      </MDBox>
    </Modal>
  )
}

AddModal.propTypes={
  open: PropTypes.bool.isRequired,
  handleClose: PropTypes.func.isRequired,
  handleAddEnseignant: PropTypes.func.isRequired,

}

function Tableenseignants() {
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
    const cinToDelete = params.row.cin;
    setEnseignants((preEnseignants) => preEnseignants.filter((ens) => ens.cin !== cinToDelete));
  };
  


  // ajout des enseignants-----------------------------------------------------------------------------------------------
  const enseignants_columns = [
    {
      field: "cin",
      headerName: "cin",
      sortable: false,
      width: 0,
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
      field: "actions",
      headerName: "",
      sortable: false,
      width: 200,
      renderCell: (params) => (
        <>
        <Button variant="text" onClick={() => handleEdit(params.row)}>
          Edit
        </Button>
        <Button variant="text" style={{ color: "red" }} onClick={() => delete_row(params)}>
          delete
        </Button>
        </>
      ),
    },

  ];

  const enseignants_rows = [
    {
      cin: "12345678",
      image: team2,
      nom: "John Michael",
      email: "john@creative-tim.com",
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
    {
      cin: "02345678",
      image: team2,
      nom: "John Michael",
      email: "john@creative-tim.com",
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

  const [enseignants, setEnseignants] = useState(enseignants_rows);

  const handleAddEnseignant = (newEnseignant) => {
    setEnseignants([newEnseignant, ...enseignants ])
  };

  const [open, setOpen] = useState(false);
  const handleOpen = () => {
    setOpen(true);
  }
  const handleClose = () => setOpen(false);

  // ---------------------------------------------------------------------------------------------------------

  const paginationModel = { page: 0, pageSize: 50 };

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
    image: PropTypes.oneOfType([
      PropTypes.string, // Accepts string URLs
      PropTypes.object
    ]),
    name: PropTypes.string.isRequired,
    email: PropTypes.string.isRequired,
  };

  const handleEdit = (row) => {
    console.log("Édition de :", row);
  };

  return (
    <DashboardLayout>
      <DashboardNavbar />
      <MDBox pt={6} pb={3}>
        <Grid container spacing={6}>
          <Grid item xs={12}>
            <Card>
              {/* This is header*/}
              <MDBox
                mx={2}
                mt={-3}
                py={1}
                px={2}
                variant="gradient"
                bgColor="info"
                borderRadius="lg"
                coloredShadow="info"
                style={{ display: "flex", justifyContent: "space-between", alignItems:"center" }}
              >
                <MDTypography variant="h5" color="white">
                  Les Enseignants
                </MDTypography>
                <IconButton size="large" aria-label="add" onClick={handleOpen}>
                  <AddIcon color="white" fontSize="inherit"/>
                </IconButton>

                {/* This is a Modal*/}
                {/*<Modal
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
                    position="relative"
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
                          {newEnseignant.image && (
                            <img
                              src={newEnseignant.image}
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
                          label="cin"
                          name="cin"
                          value={newEnseignant.cin}
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
                          value={newEnseignant.email}
                          onChange={handleChange1}
                          variant="outlined"
                          margin="normal"
                          required
                        />
                        <TextField
                          fullWidth
                          name="adresse"
                          label="adresse"
                          value={newEnseignant.adresse}
                          onChange={handleChange1}
                          variant="outlined"
                          margin="normal"
                          required
                        />
                        <TextField
                          fullWidth
                          label="Grade"
                          name="Grade"
                          value={newEnseignant.Grade}
                          onChange={handleChange1}
                          variant="outlined"
                          margin="normal"
                          required
                        />
                        <TextField
                          fullWidth
                          label="handicap"
                          name="handicap"
                          value={newEnseignant.handicap}
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
                          value={newEnseignant.naissance}
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
                          value={newEnseignant.age}
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
                          value={newEnseignant.sexe}
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
                          value={newEnseignant.telephone}
                          onChange={handleChange1}
                          variant="outlined"
                          margin="normal"
                          required
                        />
                        <TextField
                          fullWidth
                          label="poste"
                          name="poste"
                          value={newEnseignant.poste}
                          onChange={handleChange1}
                          variant="outlined"
                          margin="normal"
                          required
                        />
                        <TextField
                          fullWidth
                          label="ancienneté"
                          name="ancienneté"
                          value={newEnseignant.ancienneté}
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
                </Modal>*/}
                <AddModal open={open} handleClose={handleClose} handleAddEnseignant={handleAddEnseignant} />
              </MDBox>
              <MDBox pt={3}>
                <ThemeProvider theme={darkMode ? themeDark : theme}>
                  <Paper sx={{ height: 400, width: "100%" }}>
                    <DataGrid
                      rows={enseignants}
                      columns={enseignants_columns}
                      initialState={{ pagination: { paginationModel } }}
                      pageSizeOptions={[50]}
                      sx={{ border: 0 }}
                      getRowId={(row) => row.cin}
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

export default Tableenseignants;
