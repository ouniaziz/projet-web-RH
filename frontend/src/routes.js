import Dashboard from "features/Dashboard";
import Table_employés from "layouts/table_employes";
import Table_enseignants from "layouts/table_enseignants";
import Billing from "layouts/billing";
import Notifications from "layouts/notifications";
import Profile from "layouts/profile";
import Profile_enseignant from "layouts/profile_enseignant";
import ProfilePage from "layouts/user_profile";
import Mes_taches from "layouts/mes_taches";
import Table_demandes from "layouts/Mes_demandes";
import Icon from "@mui/material/Icon";
import {CongeAdmin} from "./layouts/CongeAdmin";

const routes = [
  {
    type: "collapse",
    name: "dashboard ",
    key: "main/dashboard",
    icon: <Icon fontSize="small">dashboard</Icon>,
    route: "dashboard",
    component: <Dashboard />,
  },
  {
    type: "collapse",
    name: "Employés",
    key: "main/eployes",
    icon: <Icon fontSize="small">table_view</Icon>,
    route: "employes",
    component: <Table_employés />,
  },
  {
    type: "collapse",
    name: "Enseignants",
    key: "main/enseignants",
    icon: <Icon fontSize="small">table_view</Icon>,
    route: "enseignants",
    component: <Table_enseignants />,
  },
  {
    type: "collapse",
    name: "CongeAdmin",
    key: "main/conge_admin",
    icon: <Icon fontSize="small">calendar_today</Icon>,
    route: "conge_admin",
    component: <CongeAdmin />,
  },
  {
    type: "collapse",
    name: "Documents Administratifs",
    key: "main/DocumentsAdministratifs",
    icon: <Icon fontSize="small">receipt_long</Icon>,
    route: "DocumentsAdministratifs",
    component: <Billing />,
  },
  {
    type: "collapse",
    name: "Mes demandes",
    key: "main/Mes_demandes",
    icon: <Icon fontSize="small">receipt_long</Icon>,
    route: "Mes_demandes",
    component: <Table_demandes />,
  },
  {
    key: "main/profile",
    route: "profile",
    component: <Profile />,
  },
  {
    key: "main/profile_enseignant",
    route: "profile_enseignant",
    component: <Profile_enseignant />,
  },
  {
    key: "main/Mes_taches",
    route: "Mes_taches",
    component: <Mes_taches />,
  },

  {
    type: "collapse",
    name: "Profile",
    key: "main/mon_profile",
    icon: <Icon fontSize="small">person</Icon>,
    route: "mon_profile",
    component: <ProfilePage />,
  },

];

export default routes;
