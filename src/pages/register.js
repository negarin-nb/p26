import React from "react";
import { TextField, Button, Paper, Typography, Stack } from "@mui/material";
import Header from "../components/header";
import { Link } from "react-router-dom";

export default function Register() {
  const paperStyle = {
    padding: "45px",
    width: "28%",
    height: "400px",
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    alignItems: "center",
  };
  return (
    <>
      <Header />
      <Stack
        dir="rtl"
        direction="row"
        spacing={5}
        sx={{
          minHeight: "800px",
          height: "100vh",
          mt: "-64px",
          justifyContent: "center",
          alignItems: "center",
          "& .MuiTextField-root": {
            paddingBottom: "10px",
            fontSize: "10px",
          },
          "& .MuiButton-root": { fontSize: "12px", px: 4, py: 1.5 },
        }}
      >
        <Paper sx={paperStyle} elevation={7}>
          <Typography sx={{ color: "#000" }} variant="h1">
            ساخت حساب کاربری
          </Typography>
          <form>
            <TextField fullWidth label="نام کاربری" variant="outlined" />
            <TextField fullWidth label="ایمیل" variant="outlined" />
            <TextField fullWidth label="رمز عبور" variant="outlined" />
          </form>
          <Button
            type="submit"
            variant="contained"
            color="secondary"
            size="large"
            component={Link}
            to="/home"
          >
            عضویت
          </Button>
        </Paper>
      </Stack>
    </>
  );
}
