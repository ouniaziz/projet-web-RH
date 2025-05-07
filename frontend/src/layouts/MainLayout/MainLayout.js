import { useState, useEffect } from "react";
import { Outlet, useLocation, Navigate } from "react-router-dom";
import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";

import Sidenav from "examples/Sidenav";
import Configurator from "examples/Configurator";

import theme from "assets/theme";
import {superRoutes, employeRoutes, enseignantRoutes} from "routes";
import { useMaterialUIController, setMiniSidenav, setOpenConfigurator } from "context";
import {useNotificationStore} from "../../service/notificationService";
import {useStore} from "../../service/store";


export default function MainLayout() {
  const [controller, dispatch] = useMaterialUIController();
  const role = useStore(state=>state.role)
  const cin = useStore(state=>state.cin)
  const showNotification = useNotificationStore((state)=>state.showNotification)
  const {
    miniSidenav,
    layout,
    openConfigurator,
    sidenavColor,
    transparentSidenav,
    whiteSidenav,
    darkMode,
  } = controller;
  const [onMouseEnter, setOnMouseEnter] = useState(false);
  const { pathname } = useLocation();

  useEffect(() => {
    document.documentElement.scrollTop = 0;
    document.scrollingElement.scrollTop = 0;
  }, [pathname]);

  const handleOnMouseEnter = () => {
    if (miniSidenav && !onMouseEnter) {
      setMiniSidenav(dispatch, false);
      setOnMouseEnter(true);
    }
  };

  const handleOnMouseLeave = () => {
    if (onMouseEnter) {
      setMiniSidenav(dispatch, true);
      setOnMouseEnter(false);
    }
  };

  const handleConfiguratorOpen = () => setOpenConfigurator(dispatch, !openConfigurator);

  // Establir connection SSE (Server-side-event) pour la notification
  useEffect(() => {
    const es = new EventSource(`http://localhost:8080/notify/user/${cin}`)
    es.onopen = ()=> {
      console.info("Connection established")
    };
    es.onerror = (e)=> {
      showNotification({
        type:"error",
        title: "An error produced",
        content: "Couldn't establish connection with the server"
      })
      console.error("An error produced", e)
    };
    es.onmessage = (msg) => {
      const data = JSON.parse(msg.data)
      showNotification({
        type:data.color,
        title:data.title,
        content:data.desc
      })
    };

    return () => es.close();
  }, []);

  return (
    <ThemeProvider theme={theme}> {/* Removed Dark mode: theme={darkMode ? themeDark : theme} */}
      <CssBaseline />
      {layout === "dashboard" && (
        <>
          <Sidenav
            color={sidenavColor}
            brandName="ISIMM"
            routes={(role==="Administrateur" || role==="Personnel RH")? superRoutes:(role==="Enseignant")? enseignantRoutes: employeRoutes}
            onMouseEnter={handleOnMouseEnter}
            onMouseLeave={handleOnMouseLeave}
          /> {/* Removed Dark mode: brand={(transparentSidenav && !darkMode) || whiteSidenav ? brandDark : brandWhite}*/}
          {/*<Configurator />
          {configsButton}*/}
          {/* Removed configureator, for now*/}

        </>
      )}
      {layout === "vr" && <Configurator />}
      <Outlet /> {/* Rend les pages enfants ici */}
    </ThemeProvider>
  );
}

/*
* const configsButton = (
    <MDBox
      display="flex"
      justifyContent="center"
      alignItems="center"
      width="3.25rem"
      height="3.25rem"
      bgColor="white"
      shadow="sm"
      borderRadius="50%"
      position="fixed"
      right="2rem"
      bottom="2rem"
      zIndex={99}
      color="dark"
      sx={{ cursor: "pointer" }}
      onClick={handleConfiguratorOpen}
    >
      <Icon fontSize="small" color="inherit">
        settings
      </Icon>
    </MDBox>
  );
* */