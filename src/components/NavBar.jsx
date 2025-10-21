import React from "react";
import AppBar from "@mui/material/AppBar";
import Typography from "@mui/material/Typography";
import CodeIcon from "@mui/icons-material/Code";
import Box from "@mui/material/Box";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import Toolbar from "@mui/material/Toolbar";
import { supabase } from "../supabase/supabaseClient";
// import { height } from "@mui/system";

const styles = {
  logo: {
    mr: 2,
    display: { xs: "none", md: "flex" },
    fontFamily: "DM Sans",
    fontWeight: 800,
    fontSize: "24px",
    //     letterSpacing: ".3rem",
    color: "inherit",
    //     textDecoration: "none",
  },
  leftSection: {
    display: "flex",
    alignItems: "center", // vertical centering
    //   justifyContent: "center", // horizontal centering
    // height: "64px", // optional, ensure AppBar has height
  },
  rightSection: {
    display: "flex",
    alignItems: "center",
  },
  toolBar: {
    display: "flex",
    justifyContent: "space-between",
    height: "100%",
    minHeight: { xs: "auto", sm: "auto" }, // overrides default minHeight
    // padding: 0, // optional if you want no padding
  },
  avatar: {
    mr: 2,
    width: 35,
    height: 35,
  },
  email: {
    //     display: { xs: "none", md: "flex" },
    fontFamily: "DM Sans",
    fontWeight: 600,
    fontSize: "14px",
    mr: 2,
    //     letterSpacing: ".3rem",
    //     color: "inherit",
    //     textDecoration: "none",
  },
  codeIcon: {
    mr: 2,
  },
  appBar: {
    backgroundColor: "#68369B",
    height: 50,
  },
  logout: {
    backgroundColor: "#EA4335",
    cursor: "pointer",
  },
  logoutFont: {
    fontFamily: "DM Sans",
    fontWeight: 600,
    fontSize: "12px",
  },
};

const NavBar = ({ user }) => {
  const handleLogout = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) console.error("Logout error:", error);
  };

  return (
    <AppBar position="static" sx={styles.appBar}>
      <Toolbar sx={styles.toolBar}>
        <Box sx={styles.leftSection}>
          <CodeIcon sx={styles.codeIcon} />
          <Typography
            // variant="h6"
            noWrap
            // component="a"
            // href="#app-bar-with-responsive-menu"
            sx={styles.logo}
          >
            Code Sync
          </Typography>
        </Box>
        <Box sx={styles.rightSection}>
          <Avatar
            alt="Remy Sharp"
            src="frontend\note-app-frontend\src\assets\avatar.jpg"
            sx={styles.avatar}
          />
          <Typography
            // variant="h6"
            noWrap
            // component="a"
            // href="#app-bar-with-responsive-menu"
            sx={styles.email}
          >
            {user.email}
          </Typography>
          <Button variant="contained" sx={styles.logout} onClick={handleLogout}>
            <Typography
              // variant="h6"
              noWrap
              // component="a"
              // href="#app-bar-with-responsive-menu"
              sx={styles.logoutFont}
            >
              Logout
            </Typography>
          </Button>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default NavBar;
