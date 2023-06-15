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
        <Typography sx={titleStyle} variant="h3">
          درج آگهی
        </Typography>
        <Grid sx={inputStyle} dir="rtl" container spacing={2}>
          <Grid container item xs={6} direction="column">
            <TextField fullWidth label="عنوان" variant="outlined" />
            <TextField fullWidth label="محصول" variant="outlined" />
            <TextField fullWidth label="دسته بندی" variant="outlined" />
            <TextField fullWidth label="تولیدکننده" variant="outlined" />
            <TextField fullWidth label="حالت" variant="outlined" />
            <TextField fullWidth label="آلیاژ" variant="outlined" />
            <TextField fullWidth label="رنگ" variant="outlined" />
            <TextField fullWidth label="محل تحویل" variant="outlined" />
            <TextField fullWidth label="واحد" variant="outlined" />
          </Grid>

          <Grid container item xs={6} direction="column">
            <TextField fullWidth label="عرضه کننده" variant="outlined" />
            <TextField fullWidth label="سایز" variant="outlined" />
            <TextField fullWidth label="ضخامت" variant="outlined" />
            <TextField fullWidth label="عرض" variant="outlined" />
            <TextField fullWidth label="ارتفاع" variant="outlined" />
            <TextField fullWidth label="طول" variant="outlined" />
            <TextField fullWidth label="استاندارد" variant="outlined" />
            <TextField fullWidth label="وزن" variant="outlined" />
            <TextField fullWidth label="قیمت" variant="outlined" />
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
            ثبت
          </Button>
        </Stack>
      </form>
    </>
  );
}
