import React from "react";
import { TextField, Button, Paper, Typography, Stack } from "@mui/material";
import PN from "persian-number";

export default function PhoneNumberForm({
  resetPassword,
  phone,
  setPhone,
  handlePhoneNumber,
}) {
  const handleSubmitEnter = (e) => {
    if (e.key === "Enter") handlePhoneNumber();
  };

  const paperStyle = {
    padding: "45px",
    width: "28%",
    height: "300px",
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    alignItems: "center",
  };
  return (
    <Stack
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
        <Typography sx={{ color: "#000", direction: "ltr" }} variant="body1">
          شماره موبایل خود را وارد نمایید.
        </Typography>

        <TextField
          autoFocus
          value={phone}
          onChange={(e) => setPhone(PN.convertEnToPe(e.target.value))}
          fullWidth
          label="شماره موبایل"
          variant="outlined"
          onKeyDown={(e) => handleSubmitEnter(e)}
        />

        <Button
          type="submit"
          variant="contained"
          color="secondary"
          size="large"
          onClick={handlePhoneNumber}
        >
          ثبت
        </Button>
      </Paper>
    </Stack>
  );
}
