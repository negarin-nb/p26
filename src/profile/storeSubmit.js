import React from "react";
import {
  TextField,
  Button,
  Paper,
  Typography,
  Stack,
  Grid,
} from "@mui/material";

export default function adInsert() {
  const titleStyle = {
    marginBlock: "20px",
    textAlign: "left",
  };

  const inputStyle = {
    justifyContent: "flex-start",
    "& .MuiTextField-root": {
      paddingBottom: "10px",
      fontSize: "10px",
    },
    "& .MuiButton-root": {
      fontSize: "12px",
      px: 4,
      py: 1.5,
      my: "30px",
      justifyContent: "flex-start",
      alignItems: "flex-start",
    },
    "& .MuiButtonBase-root-MuiButton-root": {
      alignItems: "flex-start",
    },
  };

  return (
    <>
      <form>
        {/* <Stack  direction="row" spacing={5} > */}
        <Typography sx={titleStyle} variant="h3">
          مشخصات فردی
        </Typography>
        <Grid sx={inputStyle} dir="rtl" container spacing={2}>
          <Grid container item xs={6} direction="column">
            <TextField fullWidth label="نام" variant="outlined" />

            <TextField fullWidth label="ایمیل" variant="outlined" />
            <TextField fullWidth label="تلفن ثابت" variant="outlined" />
          </Grid>

          <Grid container item xs={6} direction="column">
            <TextField fullWidth label=" نام‌خانوادگی" variant="outlined" />
            <TextField fullWidth label="آدرس" variant="outlined" />
            <TextField fullWidth label="تلفن همراه" variant="outlined" />
          </Grid>
        </Grid>

        <Grid sx={inputStyle} dir="rtl" container spacing={2}>
          <Grid container item xs={6} direction="column">
            <TextField fullWidth label="نام فروشگاه " variant="outlined" />
            <TextField fullWidth label="نام فروشگاه " variant="outlined" />
          </Grid>

          <Grid container item xs={6} direction="column">
            <TextField
              fullWidth
              label="آدرس سایت فروشگاه "
              variant="outlined"
            />
            <TextField
              fullWidth
              label="آدرس سایت فروشگاه "
              variant="outlined"
            />
          </Grid>
        </Grid>
        <Stack
          sx={{
            alignItems: "flex-end",
            my: "30px",
          }}
        >
          <Button
            type="submit"
            variant="contained"
            color="primary"
            size="large"
          >
            ثبت اطلاعات
          </Button>
        </Stack>
      </form>
    </>
  );
}
