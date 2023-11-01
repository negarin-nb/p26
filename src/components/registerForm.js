import React from "react";
import { TextField, Button, Paper, Typography, Stack } from "@mui/material";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputAdornment from "@mui/material/InputAdornment";
import IconButton from "@mui/material/IconButton";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import InputLabel from "@mui/material/InputLabel";
import FormControl from "@mui/material/FormControl";

export default function RegisterForm({
  resetPassword,
  register,
  setRegister,
  handleRegister,
}) {
  const [showPassword, setShowPassword] = React.useState(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const handleSubmitEnter = (e) => {
    if (e.key === "Enter") handleRegister();
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
  return (
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
          {resetPassword ? "فراموشی رمز عبور" : "عضویت"}
        </Typography>
        <Typography sx={{ color: "#000" }} variant="body1">
          {resetPassword
            ? "رمز عبور جدید خود را وارد نمایید"
            : "مشخصات حساب کاربری خود را وارد نمایید."}
        </Typography>
        <form>
          {!resetPassword && (
            <TextField
              onChange={(e) => {
                setRegister({ ...register, userName: e.target.value });
              }}
              fullWidth
              label="نام کاربری"
              variant="outlined"
            />
          )}
          {!resetPassword && (
            <TextField
              onChange={(e) => {
                setRegister({ ...register, email: e.target.value });
              }}
              fullWidth
              label="ایمیل"
              variant="outlined"
            />
          )}

          <FormControl
            fullWidth
            onChange={(e) => {
              setRegister({ ...register, password: e.target.value });
            }}
          >
            <InputLabel htmlFor="outlined-adornment-password">
              {resetPassword ? "رمز عبور جدید" : "رمز عبور"}
            </InputLabel>
            <OutlinedInput
              id="outlined-adornment-password"
              onKeyDown={(e) => handleSubmitEnter(e)}
              type={showPassword ? "text" : "password"}
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
              label={resetPassword ? "رمز عبور جدید" : "رمز عبور"}
            />
          </FormControl>
        </form>
        <Button
          type="submit"
          variant="contained"
          color="secondary"
          size="large"
          onClick={handleRegister}
        >
          عضویت
        </Button>
      </Paper>
    </Stack>
  );
}
