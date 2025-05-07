import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import AddIcon from "@mui/icons-material/Add";
import {useEffect, useState } from "react";

import Paper from "@mui/material/Paper";
import { DataGrid } from "@mui/x-data-grid/DataGrid";

import { ThemeProvider, useTheme } from "@mui/material/styles";
import { useMaterialUIController } from "context";

import themeDark from "assets/theme-dark";
// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDAvatar from "components/MDAvatar";
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
import AddModal from "./components/AddModal";
import placeholderImg from "assets/img_placeholder.jpg"
import {useNotificationStore} from "../../service/notificationService";


function Table_enseignants() {
  const [controller] = useMaterialUIController();
  const { darkMode } = controller;
  const theme = useTheme();
  const showNotification = useNotificationStore((state) => state.showNotification);
  const delete_row = async (params) => {
    if (!params || !params.row) {
      console.error("Impossible de supprimer : les données de la ligne sont invalides.");
      return;
    }
  
    const idToDelete = params.row.cin;
  
    try {
      await myApi.deleteEnseignant(idToDelete).then(()=>{
        setEnseignants((prevEnseignant) => prevEnseignant.filter((enseignant) => enseignant.cin !== idToDelete));
        showNotification({
          type:"success",
          title:"Suppression de l'enseignant",
          content:`Enseignant avec CIN ${idToDelete} supprimé.`
        })
      });
    } catch (error) {
      console.error("Erreur lors de la suppression de l'enseignant :", error);
    }
  };

  const enseignants_columns = [
    {
      field: "nom",
      headerName: "profile ",
      sortable: false,
      width: 270,
      renderCell: (params) => (
        <Author
          image={params.row.image}
          name={params.row.nom}
          prenom={params.row.prenom}
          email={params.row.email}
        />
      ),
    },
    {
      field: "cin",
      headerName: "CIN",
      sortable: false,
      width: 180,
    },
    {
      field: "adresse",
      headerName: "adresse",
      sortable: false,
      width: 100,
      "renderCell": (params)=>(params.row.adresse && params.row.adresse.trim() !== '' ? params.row.adresse : "⸻")
    },
    {
      field: "telephone",
      headerName: "telephone",
      sortable: false,
      width: 140,
      "renderCell": (params)=>(params.row.telephone && params.row.telephone.trim() !== '' ? params.row.telephone : "⸻")
    },
    {
      field: "grad",
      headerName: "Grade",
      sortable: false,
      width: 200,
      "renderCell": (params)=>(params.row.grad && params.row.grad.trim() !== '' ? params.row.grad : "⸻")
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
      "renderCell": (params)=>(params.row.departement && params.row.departement.trim() !== '' ? params.row.departement : "⸻")
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
      "renderCell": (params)=>(params.row.hasHandicaps?"Oui": "Non")
    },
    {
      "field": "status",
      "headerName": "Status",
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


  const addToEnseignant = (newEnseignant)=>{
    setEnseignants([...enseignants,{ ...newEnseignant}]);
  }
  // ---------------------------------------------------------------------------------------------------------
  const [open1, setOpen1] = useState(false);
  const handleOpen1 = () => setOpen1(true);
  const handleClose1 = () => setOpen1(false);
  const paginationModel = { page: 0, pageSize: 5 };
  const displayImgFromB64 = (image) => {
    const mimeType = "application/octet-stream"; // ou "image/jpeg", "image/png", etc.
    return image ? `data:${mimeType};base64,${image}` : placeholderImg;
  };
  const Author = ({ image, name, prenom, email }) => {
    return (
      <MDBox display="flex" alignItems="center" lineHeight={1}>
        <MDAvatar src={displayImgFromB64(image)} name={name} size="md" />
        <MDBox ml={2} lineHeight={1}>
          <MDTypography display="block" variant="button" fontWeight="medium">
            {prenom} {name}
          </MDTypography>
          <MDTypography variant="caption">{email}</MDTypography>
        </MDBox>
      </MDBox>
    );
  };
  
  Author.propTypes = {
    image: PropTypes.string,
    name: PropTypes.string.isRequired,
    prenom: PropTypes.string.isRequired,
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

  const [ handicaps , setHandicaps] = useState([{id_hand: '0', name_h: 'None',desc_h: 'None'}]);

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

                <AddModal
                    open1={open1}
                    handleClose1={handleClose1}
                    addToEnseignants={addToEnseignant}
                    b64ToImage={displayImgFromB64}
                    />
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
                      getRowId={(row) => row.cin || `temp-id-${Math.random()}`} 
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
