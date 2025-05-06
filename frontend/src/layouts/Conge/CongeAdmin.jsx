import DashboardNavbar from "../../examples/Navbars/DashboardNavbar";
import MDBox from "../../components/MDBox";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import MDTypography from "../../components/MDTypography";
import IconButton from "@mui/material/IconButton";
import AddIcon from "@mui/icons-material/Add";
import {styled, ThemeProvider, useTheme} from "@mui/material/styles";
import Paper from "@mui/material/Paper";
import {DataGrid} from "@mui/x-data-grid/DataGrid";
import Footer from "../../examples/Footer";
import DashboardLayout from "../../examples/LayoutContainers/DashboardLayout";
import {useEffect, useState} from "react";
import {AddCongeModal} from "./components/AddCongeModal";
import {myApi} from "../../service/myApi";
import {Chip} from "@mui/material";
import {Cancel, CheckCircle, Pending} from "@mui/icons-material";
import {CongeDetailsModal} from "./components/CongeDetailsModal";
import {useStore} from "../../service/store";

const StyledGridOverlay = styled('div')(({ theme }) => ({
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    height: '100%',
    '& .no-rows-primary': {
        fill: '#3D4751',
        ...theme.applyStyles('light', {
            fill: '#AEB8C2',
        }),
    },
    '& .no-rows-secondary': {
        fill: '#1D2126',
        ...theme.applyStyles('light', {
            fill: '#E8EAED',
        }),
    },
}));

function CustomNoRowsOverlay() {
    return (
        <StyledGridOverlay>
            <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                width={96}
                viewBox="0 0 452 257"
                aria-hidden
                focusable="false"
            >
                <path
                    className="no-rows-primary"
                    d="M348 69c-46.392 0-84 37.608-84 84s37.608 84 84 84 84-37.608 84-84-37.608-84-84-84Zm-104 84c0-57.438 46.562-104 104-104s104 46.562 104 104-46.562 104-104 104-104-46.562-104-104Z"
                />
                <path
                    className="no-rows-primary"
                    d="M308.929 113.929c3.905-3.905 10.237-3.905 14.142 0l63.64 63.64c3.905 3.905 3.905 10.236 0 14.142-3.906 3.905-10.237 3.905-14.142 0l-63.64-63.64c-3.905-3.905-3.905-10.237 0-14.142Z"
                />
                <path
                    className="no-rows-primary"
                    d="M308.929 191.711c-3.905-3.906-3.905-10.237 0-14.142l63.64-63.64c3.905-3.905 10.236-3.905 14.142 0 3.905 3.905 3.905 10.237 0 14.142l-63.64 63.64c-3.905 3.905-10.237 3.905-14.142 0Z"
                />
                <path
                    className="no-rows-secondary"
                    d="M0 10C0 4.477 4.477 0 10 0h380c5.523 0 10 4.477 10 10s-4.477 10-10 10H10C4.477 20 0 15.523 0 10ZM0 59c0-5.523 4.477-10 10-10h231c5.523 0 10 4.477 10 10s-4.477 10-10 10H10C4.477 69 0 64.523 0 59ZM0 106c0-5.523 4.477-10 10-10h203c5.523 0 10 4.477 10 10s-4.477 10-10 10H10c-5.523 0-10-4.477-10-10ZM0 153c0-5.523 4.477-10 10-10h195.5c5.523 0 10 4.477 10 10s-4.477 10-10 10H10c-5.523 0-10-4.477-10-10ZM0 200c0-5.523 4.477-10 10-10h203c5.523 0 10 4.477 10 10s-4.477 10-10 10H10c-5.523 0-10-4.477-10-10ZM0 247c0-5.523 4.477-10 10-10h231c5.523 0 10 4.477 10 10s-4.477 10-10 10H10c-5.523 0-10-4.477-10-10Z"
                />
            </svg>
            <MDBox sx={{ mt: 2 }}>Pas de congé...</MDBox>
        </StyledGridOverlay>
    );
}

function statusToText(status){
    switch (status) {
        case 0:
            return "Réfusée";
        case 1:
            return "acceptée";
        default:
            return "En cours";
    }
}

function statusToIcon(status){
    switch (status) {
        case 0:
            return <Cancel />;
        case 1:
            return <CheckCircle />;
        default:
            return <Pending />
    }
}

function statusToColor(status){
    switch (status) {
        case 0:
            return "error";
        case 1:
            return "success";
        default:
            return "warning";
    }
}
//TODO: To be developed

function CongeAdmin(){
    const [congeList, setCongeList] = useState([])
    const [openAddModal, setOpenAddModal] = useState(false);
    const [openDetailsModal, setOpenDetailsModal] = useState(false);
    const [selectedConge, setSelectedConge] = useState(null)
    const [isLoading, setIsLoading] = useState(false);

    const role = useStore(state=>state.role);

    const theme = useTheme();
    const congeColumns = [
        {
            field: "id",
            headerName: "Id",
            flex: 1, // This column will grow/shrink
            maxWidth: 80
        },
        {
            field: "personCin",
            headerName: "CIN",
            sortable: false,
            flex: 1, // This column will grow/shrink
            maxWidth: 100
        },
        {
            field: "dateDebut",
            headerName: "Date de debut",
            sortable: false,
            flex: 1, // This column will grow/shrink
            minWidth: 100
        },
        {
            field: "duree",
            headerName: "Durée",
            sortable: true,
            flex: 1, // This column will grow/shrink
            maxWidth: 100,
            renderCell: (params)=>(params.row.duree+" jours")

        },
        {
            field: "dateFin",
            headerName: "Date de fin",
            sortable: false,
            flex: 1, // This column will grow/shrink
            minWidth: 100
        },
        {
            field: "dateRetour",
            headerName: "Date de retour",
            sortable: false,
            flex: 1, // This column will grow/shrink
            minWidth: 100
        },
        {
            field: "type",
            headerName: "Type Conge",
            flex: 1, // This column will grow/shrink
            minWidth: 100,
            renderCell: (params)=>(params.row.type.nom)
        },
        {
            field: "statusConge",
            headerName: "Status Congé",
            flex: 1, // This column will grow/shrink
            minWidth: 100,
            renderCell:(param)=>(<Chip variant={"outlined"} label={statusToText(param.row.statusConge)} color={statusToColor(param.row.statusConge)} icon={statusToIcon(param.row.statusConge)}/>)
        },
    ];
    const paginationModel = { page: 0, pageSize: 10 };

    const addToCongeList = (newConge)=>{
        console.log(newConge)
        setCongeList([...congeList, {...newConge, id:congeList.length, statusConge:-1}])
    }

    const fetchConges = async()=>{
        setIsLoading(true)
        // Administrateur
        // Personnel RH
        if(role === "Administrateur" || role==="Personnel RH"){
            await myApi.getDemandesConges().then((res)=>{
                setCongeList(res.data)
            }).catch(err=>{
                console.error("Error fetching congés", err)
            }).finally(()=>setIsLoading(false))
        }
    }

    const showCongeDetail= (params, e)=>{
        setSelectedConge(params.row)
        setOpenDetailsModal(true)
    }

    const updateCongeStatus= (congeId, status)=>{
        setCongeList(prev=>
            prev.map((conge, i)=>
                conge.id ===congeId ? {...conge, statusConge: status}: conge
            )
        )
    }
    useEffect(() => {
        fetchConges()
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
                                <MDTypography variant="h5" color="white">Les congés</MDTypography>
                                <IconButton size="large" aria-label="add" onClick={()=>setOpenAddModal(true)}>
                                    <AddIcon color="white" fontSize="inherit"/>
                                </IconButton>
                                <AddCongeModal id={congeList.length} open={openAddModal} onClose={()=>setOpenAddModal(false)} handleNewConge={addToCongeList} />
                                <CongeDetailsModal updateCongeStatus={updateCongeStatus} open={openDetailsModal} onClose={()=>setOpenDetailsModal(false)} conge={selectedConge} />
                            </MDBox>
                            <MDBox pt={3}>
                                <ThemeProvider theme={theme}>
                                    <Paper sx={{ height: 400, width: "100%" }}>
                                        {/*TODO: increase items per page*/}
                                        <DataGrid
                                            rows={congeList}
                                            columns={congeColumns}
                                            pageSizeOptions={[5, 10]}
                                            getRowId={(row) => row.id || `temp-id-${Math.random()}`}
                                            onRowClick={showCongeDetail}
                                            style={{ cursor: 'pointer' }}
                                            loading={isLoading}
                                            slotProps={{
                                                loadingOverlay: {
                                                    variant: 'skeleton',
                                                    noRowsVariant: 'skeleton',
                                                }
                                            }}
                                            slots={{
                                                noRowsOverlay: CustomNoRowsOverlay,
                                            }}

                                            initialState={{
                                                columns: {
                                                    columnVisibilityModel: {
                                                        // Hide any columns you don't want visible
                                                    },
                                                },
                                                pagination: { paginationModel }
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
    )
}
export {CongeAdmin, statusToColor, statusToIcon, statusToText}

/*
    columnHeaderHeight={46}
    disableColumnMenu
    disableColumnFilter
    disableColumnSelector
    disableDensitySelector
    disableRowSelectionOnClick
*/