// @mui material components
import Grid from "@mui/material/Grid";

// Material Dashboard 2 React components
import MDBox from "components/MDBox";

// Material Dashboard 2 React example components
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";

import ComplexStatisticsCard from "../../examples/Cards/StatisticsCards/ComplexStatisticsCard";

// Data
import DefaultDoughnutChart from "../../examples/Charts/DoughnutCharts/DefaultDoughnutChart";
import reportsLineChartData from "./data/reportsLineChartData";
import VerticalBarChart from "../../examples/Charts/BarCharts/VerticalBarChart";

function Dashboard() {
  const { sales, tasks } = reportsLineChartData;

  return (
    <DashboardLayout>
      <DashboardNavbar />
      <MDBox py={3}>
        <Grid container spacing={3}>
          <Grid item xs={12} md={6} lg={3}>
            <MDBox mb={1.5}>
              <ComplexStatisticsCard
                icon={<span className="material-icons">manage_accounts</span>}
                color="dark"
                title="Administrateurs"
                count="3"
              />
            </MDBox>
          </Grid>
          <Grid item xs={12} md={6} lg={3}>
            <MDBox mb={1.5}>
              <ComplexStatisticsCard
                icon={<span className="material-icons">badge</span>}
                title="personnels RH"
                count="6"
              />
            </MDBox>
          </Grid>
          <Grid item xs={12} md={6} lg={3}>
            <MDBox mb={1.5}>
              <ComplexStatisticsCard
                color="success"
                icon={<span className="material-icons">group</span>}
                title="employés"
                count="25"
              />
            </MDBox>
          </Grid>
          <Grid item xs={12} md={6} lg={3}>
            <MDBox mb={1.5}>
              <ComplexStatisticsCard
                color="primary"
                icon={<span className="material-icons">school</span>}
                title="enseignants"
                count="42"
              />
            </MDBox>
          </Grid>
        </Grid>
        <MDBox
          mt={4.5}
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            marginLeft: "50px",
          }}
        >
          <Grid container spacing={1}>
            <Grid item xs={12} md={6} lg={6}>
              <MDBox mb={3}>
                <VerticalBarChart
                  icon={{ color: "info", component: "leaderboard" }}
                  title="nombre d'utilisateurs selon le type"
                  chart={{
                    labels: ["admin", "RH", "employe", "enseignant"],
                    datasets: [
                      {
                        label: "Sales by age",
                        color: "dark",
                        data: [15, 20, 12, 60, 20, 15],
                      },
                    ],
                  }}
                  style={{ width: "400px" }}
                />
              </MDBox>
            </Grid>
            <Grid item xs={12} md={6} lg={6}>
              <MDBox mb={3}>
                <DefaultDoughnutChart
                  icon={{ color: "info", component: "donut_large" }}
                  title="Nombre des enseignants par departement"
                  chart={{
                    labels: ["info", "technologie", "math"],
                    datasets: {
                      label: "nombre enseignant",
                      backgroundColors: ["info", "primary", "success"],
                      data: [15, 60, 25],
                    },
                  }}
                />
              </MDBox>
            </Grid>
          </Grid>
        </MDBox>
      </MDBox>
      <Footer />
    </DashboardLayout>
  );
}

export default Dashboard;
