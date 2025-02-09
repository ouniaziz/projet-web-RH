/**
=========================================================
* Material Dashboard 2 React - v2.2.0
=========================================================

* Product Page: https://www.creative-tim.com/product/material-dashboard-react
* Copyright 2023 Creative Tim (https://www.creative-tim.com)

Coded by www.creative-tim.com

 =========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
*/

// @mui material components
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
import TableContainer from "@mui/material/TableContainer";
import Paper from "@mui/material/Paper";
import { DataGrid } from "@mui/x-data-grid/DataGrid";

// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";

// Material Dashboard 2 React example components
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";
import DataTable from "examples/Tables/DataTable";

// Data
import authorsTableData from "layouts/tables/data/authorsTableData";
import projectsTableData from "layouts/tables/data/projectsTableData";
import { ShortText } from "@mui/icons-material";

function Tables() {
  const { columns, rows } = authorsTableData();
  const { columns: pColumns, rows: pRows } = projectsTableData();
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [open1, setOpen1] = useState(false);
  const handleOpen1 = () => setOpen1(true);
  const handleClose1 = () => setOpen1(false);
  const paginationModel = { page: 0, pageSize: 5 };
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
                  <AddIcon />
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
                    top="15%"
                    left="30%"
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
                        handleClose(); // Close modal after submission
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
                          variant="outlined"
                          margin="normal"
                          required
                        />
                        <TextField
                          fullWidth
                          label="Email"
                          type="email"
                          variant="outlined"
                          margin="normal"
                          required
                        />
                        <TextField
                          fullWidth
                          label="adresse"
                          variant="outlined"
                          margin="normal"
                          required
                        />
                        <TextField
                          fullWidth
                          label="Grade"
                          variant="outlined"
                          margin="normal"
                          required
                        />
                        <TextField
                          fullWidth
                          label="handicap"
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
                          type="number"
                          variant="outlined"
                          margin="normal"
                          required
                        />
                        <RadioGroup
                          aria-labelledby="demo-radio-buttons-group-label"
                          defaultValue="male"
                          name="radio-buttons-group"
                          style={{
                            display: "flex",
                            flexDirection: "row",
                            height: "60px",
                            margin: "4px",
                          }}
                        >
                          <FormControlLabel value="male" control={<Radio />} label="Male" />
                          <FormControlLabel value="female" control={<Radio />} label="Female" />
                        </RadioGroup>
                        <TextField
                          fullWidth
                          label="telephone"
                          type="tel"
                          variant="outlined"
                          margin="normal"
                          required
                        />
                        <TextField
                          fullWidth
                          label="poste"
                          variant="outlined"
                          margin="normal"
                          required
                        />
                        <TextField
                          fullWidth
                          label="ancienneté"
                          type="number"
                          variant="outlined"
                          margin="normal"
                          required
                        />
                        <Button
                          type="submit"
                          color="primary"
                          variant="contained"
                          sx={{ mt: 3 }}
                          style={{ width: 200, color: "white" }}
                        >
                          Ajouter
                        </Button>
                      </MDBox>
                    </MDBox>
                  </MDBox>
                </Modal>
              </MDBox>
              <MDBox pt={3}>
                <MDBox sx={{ fontSize: "12px" }}>
                  <DataTable
                    table={{ columns, rows }}
                    isSorted={false}
                    entriesPerPage={false}
                    showTotalEntries={false}
                    noEndBorder
                  />
                </MDBox>
              </MDBox>
            </Card>
          </Grid>
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
                  Les enseignants
                </MDTypography>
                <Fab color="success" size="small" aria-label="add" onClick={handleOpen1}>
                  <AddIcon />
                </Fab>
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
                    top="15%"
                    left="30%"
                    transform="translate(-50%, -50%)"
                    width={800}
                    boxShadow={24}
                    p={4}
                    borderRadius={2}
                    style={{ backgroundColor: "white" }}
                  >
                    <MDTypography id="modal-title" variant="h6" mb={3}>
                      Ajouter un enseignant
                    </MDTypography>
                    <MDBox
                      component="form"
                      onSubmit={(e) => {
                        e.preventDefault();
                        handleClose(); // Close modal after submission
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
                          variant="outlined"
                          margin="normal"
                          required
                        />
                        <TextField
                          fullWidth
                          label="Email"
                          type="email"
                          variant="outlined"
                          margin="normal"
                          required
                        />
                        <TextField
                          fullWidth
                          label="adresse"
                          variant="outlined"
                          margin="normal"
                          required
                        />
                        <TextField
                          fullWidth
                          label="Grade"
                          variant="outlined"
                          margin="normal"
                          required
                        />
                        <TextField
                          fullWidth
                          label="handicap"
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
                          type="number"
                          variant="outlined"
                          margin="normal"
                          required
                        />
                        <RadioGroup
                          aria-labelledby="demo-radio-buttons-group-label"
                          defaultValue="male"
                          name="radio-buttons-group"
                          style={{
                            display: "flex",
                            flexDirection: "row",
                            height: "60px",
                            margin: "4px",
                          }}
                        >
                          <FormControlLabel value="male" control={<Radio />} label="Male" />
                          <FormControlLabel value="female" control={<Radio />} label="Female" />
                        </RadioGroup>
                        <TextField
                          fullWidth
                          label="telephone"
                          type="tel"
                          variant="outlined"
                          margin="normal"
                          required
                        />
                        <TextField
                          fullWidth
                          label="département"
                          variant="outlined"
                          margin="normal"
                          required
                        />
                        <TextField
                          fullWidth
                          label="ancienneté"
                          type="number"
                          variant="outlined"
                          margin="normal"
                          required
                        />
                        <Button
                          type="submit"
                          color="primary"
                          variant="contained"
                          sx={{ mt: 3 }}
                          style={{ width: 200, color: "white" }}
                        >
                          Ajouter
                        </Button>
                      </MDBox>
                    </MDBox>
                  </MDBox>
                </Modal>
              </MDBox>
              <MDBox pt={3}>
                <Paper sx={{ height: 400, width: "100%" }}>
                  <DataGrid
                    rows={rows}
                    columns={columns}
                    initialState={{ pagination: { paginationModel } }}
                    pageSizeOptions={[5, 10]}
                    checkboxSelection
                    sx={{ border: 0 }}
                  />
                </Paper>
              </MDBox>
            </Card>
          </Grid>
        </Grid>
      </MDBox>
      <Footer />
    </DashboardLayout>
  );
}

export default Tables;
