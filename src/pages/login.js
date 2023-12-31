import React, { useState } from "react";
import {
  TextField,
  Button,
  Paper,
  Typography,
  Stack,
  Snackbar,
  Alert,
  //Link,
} from "@mui/material";
import Header from "../components/header";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputAdornment from "@mui/material/InputAdornment";
import IconButton from "@mui/material/IconButton";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import InputLabel from "@mui/material/InputLabel";
import FormControl from "@mui/material/FormControl";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../contex/authContext";
import authApi from "../api/auth";
import PN from "persian-number";

export default function Login() {
  const navigate = useNavigate();
  const authCtx = useAuth();
  const [showPassword, setShowPassword] = useState(false);
  const [userData, setUserData] = useState({
    username: "",
    password: "",
  });

  const [open, setOpen] = useState(false);
  const [severity, setSeverity] = useState("");
  const [message, setMessage] = useState("");

  const handleClose = () => {
    setOpen(false);
  };

  const openAlert = (s, m) => {
    setSeverity(s);
    setMessage(m);
    setOpen(true);
  };

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const handleLogin = async () => {
    try {
      const response = await authApi.login({
        ...userData,
        username: PN.convertPeToEn(userData.username),
      });
      if (response.data.access) {
        //openAlert("success", "عضویت با موفقیت انجام شد.");
        authCtx.setUserToken(response.data.access);
        console.log(response.data.access);
        localStorage.setItem("token", JSON.stringify(response.data.access));
      } else {
        setMessage("نام کاربری یا رمز عبور اشتباه است.");
      }
      navigate("/");
    } catch (e) {
      openAlert("error", "نام کاربری یا رمز عبور اشتباه است.");
      console.log(e);
    }
  };

  const handleSubmitEnter = (e) => {
    if (e.key === "Enter") handleLogin();
  };

  const paperStyle = {
    padding: "45px",
    width: { xs: "70%", sm: "50%", md: "30%" },
    height: "400px",
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    alignItems: "center",
  };

  const inputStyle = {
    "& .MuiTextField-root": {
      paddingBottom: "10px",
      fontSize: "10px",
    },
    "& .MuiButton-root": { fontSize: "12px", px: 4, py: 1.5 },
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
            ورود به حساب کاربری
          </Typography>
          <form>
            <TextField
              autoFocus
              sx={inputStyle}
              fullWidth
              label="شماره موبایل"
              variant="outlined"
              value={userData.username}
              onChange={(e) => {
                setUserData({
                  ...userData,
                  username: PN.convertEnToPe(e.target.value),
                });
              }}
            />

            <FormControl
              fullWidth
              onChange={(e) => {
                setUserData({ ...userData, password: e.target.value });
              }}
            >
              <InputLabel htmlFor="outlined-adornment-password">
                رمز عبور
              </InputLabel>
              <OutlinedInput
                id="outlined-adornment-password"
                type={showPassword ? "text" : "password"}
                onKeyDown={(e) => handleSubmitEnter(e)}
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={handleClickShowPassword}
                      onMouseDown={handleMouseDownPassword}
                      edge="end"
                    >
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                }
                label="رمز عبور"
              />
            </FormControl>
          </form>
          <Typography>
            ثبت نام نکرده‌اید؟
            <Typography variant="body2" component={Link} to="/register">
              ثبت‌نام
            </Typography>
          </Typography>
          <Typography
            variant="body2"
            to="/register"
            state={true}
            component={Link}
            sx={{ mt: "-50px" }}
          >
            فراموشی رمز عبور
          </Typography>
          <Button
            type="submit"
            variant="contained"
            color="primary"
            size="large"
            onClick={handleLogin}
          >
            ورود
          </Button>
        </Paper>
        <Snackbar open={open} autoHideDuration={4000} onClose={handleClose}>
          <Alert
            onClose={handleClose}
            severity={severity}
            sx={{ width: "100%" }}
          >
            {message}
          </Alert>
        </Snackbar>
      </Stack>
    </>
  );
}
