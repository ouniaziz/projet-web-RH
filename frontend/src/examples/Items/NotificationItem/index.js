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

import { forwardRef } from "react";

// prop-types is a library for typechecking of props.
import PropTypes from "prop-types";

// @mui material components
import MenuItem from "@mui/material/MenuItem";
import Link from "@mui/material/Link";

// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";

// custom styles for the NotificationItem
import menuItem from "examples/Items/NotificationItem/styles";
import {CheckCircleOutlined, ErrorOutline} from "@mui/icons-material";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";

const typeToIcon=(severity)=>{
    switch (severity) {
        case "success":
            return <CheckCircleOutlined />
        case "error":
            return <ErrorOutline/>
    }
}

const NotificationItem = forwardRef(({ title, content, type, remove }, ref) => (
  <MenuItem ref={ref} sx={(theme) => menuItem(theme)} >
      <div style={{
          display: "flex",
          position: "relative",
          width: "inherit"
      }}>
          <MDTypography variant="h4" color="secondary" lineHeight={0.75} sx={{
              alignSelf:"center"
          }}>
              {typeToIcon(type)}
          </MDTypography>
          <div style={{
              display: "flex",
              flexDirection:"column",
              flex: "1"
          }}
          >
              <MDTypography variant="button" fontWeight="regular" sx={{ ml: 1 }}>
                  {title}
              </MDTypography>
              <MDTypography variant="button" fontWeight="light" sx={{ ml: 1 }}>
                  {content}
              </MDTypography>
          </div>

          <IconButton disableRipple onClick={remove}>
              <CloseIcon/>
          </IconButton>
      </div>
  </MenuItem>
));

// Typechecking props for the NotificationItem
NotificationItem.propTypes = {
    title: PropTypes.string.isRequired,
    content: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired,
    remove: PropTypes.func.isRequired
};

export default NotificationItem;

/*<MDBox component={Link} py={0.5} display="flex" alignItems="center" lineHeight={1}>
      <MDTypography variant="body1" color="secondary" lineHeight={0.75}>
        {icon}
      </MDTypography>
      <MDTypography variant="button" fontWeight="regular" sx={{ ml: 1 }}>
        {title}
      </MDTypography>
    </MDBox>
          <MDTypography variant="button" fontWeight="light" sx={{ ml: 1 }}>
              {content}
          </MDTypography>*/