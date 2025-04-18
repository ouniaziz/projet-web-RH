import React, { useState } from "react";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";
import {
  Grid,
  Card,
  Paper,
  Button
} from "@mui/material";
import { DataGrid } from "@mui/x-data-grid/DataGrid";
import { ThemeProvider, useTheme } from "@mui/material/styles";
import { useMaterialUIController } from "context";
import themeDark from "assets/theme-dark";
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";

function Mes_taches() {
  const [controller] = useMaterialUIController();
  const { darkMode } = controller;
  const theme = useTheme();
  
  // Colonnes du tableau de tâches
  const taches_columns = [
    {
      field: "id",
      headerName: "ID",
      width: 70,
    },
    {
      field: "titre",
      headerName: "Titre",
      width: 150,
    },
    {
      field: "description",
      headerName: "Description",
      width: 378,
    },
    {
      field: "date_obtention",
      headerName: "Date d'obtention",
      width: 170,
    },
    {
      field: "date_limite",
      headerName: "Date limite",
      width: 150,
    },
    {
      field: "statut",
      headerName: "Statut",
      width: 120,
      renderCell: (params) => (
        <span style={{
          color: params.value === 'Terminé' ? 'green' : 
                params.value === 'En cours' ? 'orange' : 'red',
          fontWeight: 'bold'
        }}>
          {params.value}
        </span>
      ),
    },
  ];

  // Données des tâches
  const taches_rows = [
    {
      id: 1,
      titre: "Rapport mensuel",
      description: "Préparer le rapport mensuel des activités",
      date_obtention: "2023-10-01",
      date_limite: "2023-10-15",
      statut: "Terminé"
    },
    {
      id: 2,
      titre: "Réunion d'équipe",
      description: "Organiser la réunion hebdomadaire de l'équipe",
      date_obtention: "2023-10-10",
      date_limite: "2023-10-12",
      statut: "En cours"
    },
    {
      id: 3,
      titre: "Audit interne",
      description: "Effectuer l'audit interne du département",
      date_obtention: "2023-10-05",
      date_limite: "2023-10-30",
      statut: "En attente"
    },
    {
      id: 4,
      titre: "Formation nouveaux outils",
      description: "Former les employés aux nouveaux outils logiciels",
      date_obtention: "2023-09-20",
      date_limite: "2023-11-15",
      statut: "En cours"
    },
    {
      id: 5,
      titre: "Évaluation des performances",
      description: "Compléter les évaluations de performance trimestrielles",
      date_obtention: "2023-10-15",
      date_limite: "2023-10-31",
      statut: "En attente"
    },
  ];

  const [taches, setTaches] = useState(taches_rows);
  const paginationModel = { page: 0, pageSize: 5 };

  return (

      
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
                sx={{ backgroundColor: "#80cbc4" }}
                borderRadius="lg"
                coloredShadow="info"
              >
                <MDTypography variant="h6" color="white" fontWeight="bold" style={{ textAlign: "center",  }}>
                  Mes Tâches
                </MDTypography>
              </MDBox>
              <MDBox pt={3}>
                <ThemeProvider theme={darkMode ? themeDark : theme}>
                  <Paper sx={{ height: 400, width: "100%" }}>
                    <DataGrid
                      rows={taches}
                      columns={taches_columns}
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


  );
}

export default Mes_taches;