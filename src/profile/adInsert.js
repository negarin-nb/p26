import React, { useState } from "react";
import {
  TextField,
  Button,
  Paper,
  Typography,
  Stack,
  Grid,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
} from "@mui/material";
import subscrptionApi from "../api/subscrption";

export default function AdInsert() {
  const productList = [
    "تیرآهن",
    "میلگرد",
    "ورق",
    "لوله",
    "پروفیل",
    "نبشی و ناودانی",
    "تجهیزات",
    "سیم و کابل",
    "استیل",
    "گریتینگ و تسمه",
    "محصولات مفتولی",
    "فلزات غیرآهنی",
    "پشم شیشه",
    "پشم سنگ",
    "اتصالات",
  ];
  const [productName, setProductName] = useState("");
  const titleStyle = {
    marginBlock: "20px",
    textAlign: "left",
  };

  const inputStyle = {
    justifyContent: "flex-start",
    "& .MuiFormControl-root": {
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
            <FormControl fullWidth>
              <InputLabel sx={{ color: "text.main" }} id="select-label">
                محصول
              </InputLabel>
              <Select
                sx={{ textAlign: "left" }}
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={productName}
                label="محصول"
                onChange={(event) => {
                  setProductName(event.target.value);
                }}
              >
                {productList.map((product) => (
                  <MenuItem dir="rtl" value={product}>
                    {product}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>

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
