import React from "react";
import {
  TextField,
  Button,
  Paper,
  Typography,
  Stack,
  Snackbar,
  Alert,
} from "@mui/material";
import authApi from "../api/auth";

export default function PhoneNumberForm({
  phone,
  setPhone,
  handlePhoneNumber,
}) {
  const [open, setOpen] = React.useState(true);

  const handleClose = () => {};

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
          عضویت
        </Typography>
        <Typography sx={{ color: "#000", direction: "ltr" }} variant="body1">
          شماره موبایل خود را وارد نمایید.
        </Typography>

        <TextField
          onChange={(e) => setPhone(e.target.value)}
          fullWidth
          label="شماره موبایل"
          variant="outlined"
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
