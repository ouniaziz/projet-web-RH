import { Routes, Route, Navigate } from "react-router-dom";
import MainLayout from "layouts/MainLayout/MainLayout";
import Page_connexion from "features/Auth/views/Page_connexion";
import {employeRoutes, enseignantRoutes, superRoutes} from "routes";
import ProtectedRoute from "./ProtectedRoute";
import Page_reset from "features/reset_password/views/Page_reset";
import ActivateAccount from "features/ActivateAccount/views/Page_activation";
import {NotistackProvider} from "./components/NotificationProvider";
import {useStore} from "./service/store";


const getRoutes = (allRoutes) =>
  allRoutes.map((route) => <Route key={route.key} path={route.route} element={route.component} />);

export default function App() {
    const role = useStore(state=>state.role);
    return (
        <NotistackProvider>
            <Routes>
                  <Route path="/" element={<Page_connexion />} />
                  <Route path="/activation_compte" element={<ActivateAccount />} />
                  <Route path="/reset_password" element={<Page_reset />} />
                  <Route element={<ProtectedRoute />}>

                    <Route path="/main" element={

                            <MainLayout />
                    }>
                      {getRoutes((role==="Administrateur" || role==="Personnel RH")? superRoutes:(role==="Enseignant")? enseignantRoutes: employeRoutes)}
                    </Route>
                  </Route>
              {/* <Route path="*" element={<Navigate to="/" />} /> */}

            </Routes>
        </NotistackProvider>
    );
}
// {
//   type: "collapse",
//   name: "Profile",
//   key: "main/profile",
//   icon: <Icon fontSize="small">person</Icon>,
//   route: "profile",
//   component: <Profile />,
// },