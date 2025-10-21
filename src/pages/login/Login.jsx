import React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import CodeIcon from "@mui/icons-material/Code";
import Stack from "@mui/material/Stack";
import GoogleIcon from "@mui/icons-material/Google";
import EmailIcon from "@mui/icons-material/Email";
import { supabase } from "../../supabase/supabaseClient";

const styles = {
  cardWidth: { width: 420 },
  codeIcon: { mt: 4 },
  heading: { fontFamily: "DM Sans", fontSize: "48px", fontWeight: 800 },
  subHeading: {
    mt: 14,
    fontFamily: "DM Sans",
    fontSize: "12px",
    fontWeight: 550,
  },
  emailBtn: {
    width: "20rem",
    mt: 1,
    backgroundColor: "#68369B",
    color: "#fff",
    height: "3rem",
  },
  emailIcon: { mr: 1, fontSize: "medium" },
  emailFont: { fontFamily: "DM Sans", fontSize: "12px", fontWeight: 700 },
  googleBtn: { width: "20rem", mt: 1, height: "3rem", color: "#000" },
  googleIcon: {
    mr: 1,
    fontSize: "medium",
    color: "#EA4335",
  },
  googleFont: { fontFamily: "DM Sans", fontSize: "12px", fontWeight: 700 },
};

const Login = () => {
  const handleEmailLogin = () => {};

  const handleGoogleLogin = async () => {
    await supabase.auth.signInWithOAuth({
      provider: "google",
      options: { redirectTo: window.location.origin },
    });
  };
  const card = (
    <>
      <CardContent>
        <Stack alignItems="center">
          <CodeIcon sx={styles.codeIcon} />
          <Typography sx={styles.heading}>Code Sync</Typography>
          <Typography sx={styles.subHeading}>
            Please sign in to continue.
          </Typography>
          <Button sx={styles.emailBtn} onClick={handleEmailLogin}>
            <EmailIcon sx={styles.emailIcon} />
            <Typography sx={styles.emailFont}>Login with Email</Typography>
          </Button>
          <Button
            variant="outlined"
            sx={styles.googleBtn}
            onClick={handleGoogleLogin}
          >
            <GoogleIcon sx={styles.googleIcon} />
            <Typography sx={styles.googleFont}>Login with Google</Typography>
          </Button>
        </Stack>
      </CardContent>
    </>
  );
  return (
    <Grid container justifyContent="center" alignItems="center" height="97vh">
      <Card variant="outlined" sx={styles.cardWidth} elevation={8}>
        {card}
      </Card>
    </Grid>
  );
};

export default Login;
