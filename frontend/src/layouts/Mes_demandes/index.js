import { useState } from "react";
import {
  Grid, Card, Fab, Modal, TextField, Button, Paper, Select, MenuItem,
  InputLabel, FormControl,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import { DataGrid } from "@mui/x-data-grid";
import { ThemeProvider } from "@mui/material/styles";
import { useMaterialUIController } from "context";
import theme from "assets/theme";
import themeDark from "assets/theme-dark";
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";

function Table_demandes() {
  const [controller] = useMaterialUIController();
  const { darkMode } = controller;

  const [demandes, setDemandes] = useState([
    { id: 1, titre: "Demande de congé", date: "2025-04-01",message: "j'ai besoin pour une chose urgente " ,statut: "En attente" },
  ]);
  const [newDemande, setNewDemande] = useState({
    id: demandes.length + 1,
    titre: "",
    date: "",
    message: "",
    statut: "",
  });

  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleChange = (e) => {
    setNewDemande({ ...newDemande, [e.target.name]: e.target.value });
  };

  const handleAddDemande = (e) => {
    e.preventDefault();
    if (!newDemande.titre || !newDemande.message) {
      alert("Tous les champs sont obligatoires.");
      return;
    }
  
    const today = new Date().toISOString().split("T")[0];
  
    setDemandes([
      ...demandes,
      {
        ...newDemande,
        id: demandes.length + 1,
        date: today, // on ajoute la date actuelle automatiquement
        statut: "En attente", // statut par défaut
      },
    ]);
  
    setNewDemande({ id: demandes.length + 2, titre: "", message: "", statut: "" });
    handleClose();
  };
  

  const demandes_columns = [
    { field: "id", headerName: "ID", width: 70 },
    { field: "titre", headerName: "Titre de la demande", width: 250 },
    { field: "date", headerName: "Date de demande", width: 175 },
    { field: "message", headerName: "Message", width: 400 },
    { 
        field: "statut",
        headerName: "Statut",
        width: 150,
        renderCell: (params) => (
            <span style={{
                color: params.value === 'En attente' ? 'orange' : 
                      params.value === 'Accepté' ? 'green' : 'red',
                fontWeight: 'bold'
            }}>
                {params.value}
            </span>
        ),

    },
  ];

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
                  Les demandes des employés
                </MDTypography>
                <Fab color="success" size="small" onClick={handleOpen}>
                  <AddIcon />
                </Fab>
              </MDBox>
              <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    backgroundColor: "rgba(0,0,0,0.7)",
                }}
              >
                <MDBox
                  width={400}
                  p={4}
                  bgcolor="white"
                  borderRadius={2}
                  boxShadow={24}
                  sx={{
                    width: "30%",
                    height: "6  0%",
                    bgcolor: "background.paper",
                    boxShadow: 24,
                    p: 4,
                    borderRadius: 2,
                    display: "flex",
                    flexDirection: "column",
                    }}
                >
                  <MDTypography variant="h6" mb={2}style={{ textAlign: "center" }}>
                    Nouvelle Demande
                  </MDTypography>
                  <form onSubmit={handleAddDemande}>
                        <FormControl fullWidth margin="normal">
                            <InputLabel>Titre</InputLabel>
                            <Select name="titre" value={newDemande.titre} onChange={handleChange} required style={{height: "40px"}}>
                            <MenuItem value="Attestation de travail">Attestation de travail</MenuItem>
                            <MenuItem value="Attestation de salaire">Attestation de salaire</MenuItem>
                            <MenuItem value="Demande de congé">Demande de congé</MenuItem>
                            <MenuItem value="Demande de formation">Demande de formation</MenuItem>
                            <MenuItem value="Demande de mutation">Demande de mutation</MenuItem>
                            <MenuItem value="Relevé de service">Relevé de service</MenuItem>
                            <MenuItem value="Attestation de présence">Attestation de présence</MenuItem>
                            </Select>
                        </FormControl>

                        <TextField
                            fullWidth
                            label="Message / Justificatif"
                            name="message"
                            value={newDemande.message}
                            onChange={handleChange}
                            margin="normal"
                            multiline
                            rows={4}
                            required
                        />

                        <Button
                            type="submit"
                            variant="contained"
                            fullWidth
                            sx={{ mt: 2 }}
                            style={{
                                backgroundColor: "#4CAF50", // Couleur verte
                                color: "white",
                                "&:hover": {
                                    backgroundColor: "#45a049", // Couleur verte plus foncée au survol
                                },
                            }}
                        >
                            Ajouter
                        </Button>
                        </form>

                </MDBox>
                </Modal>
              <MDBox pt={3}>
                <ThemeProvider theme={darkMode ? themeDark : theme}>
                  <Paper sx={{ height: 400, width: "100%" }}>
                    <DataGrid
                      rows={demandes}
                      columns={demandes_columns}
                      pageSizeOptions={[5]}
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

export default Table_demandes;
