import React, { useState } from "react";
import {
  Grid,
  Stack,
  Typography,
  Button,
  Box,
  Divider,
  Paper,
} from "@mui/material";
import HeaderLogedin from "../components/headerLogedin";
import { getProducts } from "../api/products";

export default function ProductDetail() {
  const imageColumn = {};
  const titleColumn = {
    paddingInline: "30px",
  };
  const sellerColumn = {
    backgroundColor: "custom.main",
    padding: "30px",
    borderRadius: "5px",
  };
  const sellersRow = {
    backgroundColor: "myWhite.main",
    padding: "30px",
    borderRadius: "5px",
    flexDirction: "row",
    alignItems: "center",
    mb: "20px",
  };
  const iconStyle = {
    width: "20px",
    height: "20px",
    marginLeft: "20px",
  };
  const PositionStyle = {
    marginBlock: "15px",
    justifyContent: "flex-start",
    alignItems: "center",
    "&:hover": {
      bgcolor: "custom.main",
    },
  };

  const [product, setProduct] = useState(getProducts()[0]);
  return (
    <>
      <HeaderLogedin />
      <Stack dir="rtl">
        <Divider sx={{ paddingTop: "40px" }} />
        <div>
          <Typography sx={{ textAlign: "left", paddingTop: "20px" }}>
            خانه {`>`} تیرآهن {`>`} {product.title}
          </Typography>
          <Grid container sx={{ marginBlock: "30px" }}>
            <Grid sx={imageColumn} item xs={4}>
              <Paper elevation={2}>
                <img
                  src={require("../assets/images/girder.jpeg")}
                  style={{ width: "100%", paddingBottom: "5px" }}
                />
              </Paper>
            </Grid>
            <Grid sx={titleColumn} item xs={4}>
              <Stack
                sx={{
                  justifyContent: "space-between",
                  alignItems: "space-between",
                }}
              >
                <Typography variant="h2" sx={{ textAlign: "left" }}>
                  {product.title}
                </Typography>

                <Typography
                  variant="h1"
                  sx={{
                    textAlign: "left",
                    marginTop: "180px",
                    marginBottom: "60px",
                  }}
                >
                  از ۶,۰۰۰,۰۰۰ تومان تا ۸,۰۰۰,۰۰۰ تومان
                </Typography>

                <Button
                  type="submit"
                  variant="contained"
                  color="primary"
                  size="large"
                >
                  خرید با کمترین قیمت
                </Button>
              </Stack>
            </Grid>
            <Grid sx={sellerColumn} item xs={4}>
              <Typography
                variant="h2"
                sx={{
                  textAlign: "left",
                  paddingBottom: "30px",
                  color: "black",
                }}
              >
                فروشنده
              </Typography>
              <Stack direction="row" sx={PositionStyle}>
                <img
                  style={iconStyle}
                  src={require("../assets/images/Vector3.png")}
                />
                <Box>
                  <Typography variant="h6">فولاد آریا</Typography>
                </Box>
              </Stack>
              <Divider />
              <Stack direction="row" sx={PositionStyle}>
                <img
                  style={iconStyle}
                  src={require("../assets/images/Vector3.png")}
                />
                <Box>
                  <Typography variant="h6">محل تحویل: کارخانه</Typography>
                </Box>
              </Stack>
              <Divider />
              <Stack direction="row" sx={PositionStyle}>
                <img
                  style={iconStyle}
                  src={require("../assets/images/Vector3.png")}
                />
                <Box>
                  <Typography variant="h6">شماره تماس : ۰۹۱۲۴۳۵۶۶۸۸</Typography>
                </Box>
              </Stack>
              <Divider />
              <Stack direction="row" sx={PositionStyle}>
                <img
                  style={iconStyle}
                  src={require("../assets/images/Vector3.png")}
                />
                <Box>
                  <Typography variant="h6">قیمت فروشنده: ۸,۰۰۰,۰۰۰</Typography>
                </Box>
              </Stack>
              <Divider />
            </Grid>
          </Grid>
        </div>
        <Stack sx={[sellerColumn, { mb: "30px" }]}>
          <Typography
            variant="h4"
            sx={{
              textAlign: "left",
              paddingBottom: "10px",
              color: "black",
            }}
          >
            فروشندگان
          </Typography>
          <Divider />
          <Divider
            sx={{
              backgroundColor: "secondary.main",
              width: "72px",
              height: "2px",
              mb: "20px",
            }}
          />

          <Stack direction={"row"} sx={sellersRow}>
            <Grid container sx={{ alignItems: "center" }}>
              <Grid item xs={1}>
                <Typography variant="h3" sx={{ textAlign: "left" }}>
                  فرامت
                </Typography>
              </Grid>
              <Grid item>
                <Typography
                  xs={6}
                  sx={{ width: "340px", textAlign: "left", color: "black" }}
                  variant="h6"
                >
                  تیرآهن بال نیم پهن مدل ST37-2 - سایز 14 - 12 متری ذوب آهن
                  اصفهان
                </Typography>
              </Grid>

              <Grid item xs={2}>
                <Typography variant="h4" sx={{ color: "secondary.main" }}>
                  ۷,۵۰۰,۰۰۰
                </Typography>
              </Grid>
              <Grid item xs={2}>
                <Button
                  type="submit"
                  variant="outlined"
                  color="primary"
                  size="small"
                >
                  تماس با فروشنده
                </Button>
              </Grid>
              <Grid item xs={3}>
                <Typography variant="h6">
                  آخرین تغییر قیمت فروشگاه: دیروز
                </Typography>
              </Grid>
            </Grid>
          </Stack>

          <Stack direction={"row"} sx={sellersRow}>
            <Grid container sx={{ alignItems: "center" }}>
              <Grid item xs={1}>
                <Typography variant="h3" sx={{ textAlign: "left" }}>
                  آهنگ
                </Typography>
              </Grid>
              <Grid item>
                <Typography
                  sx={{ width: "340px", textAlign: "left", color: "black" }}
                  xs={6}
                  variant="h6"
                >
                  تیرآهن 14 ذوب آهن اصفهان 12 متری
                </Typography>
              </Grid>

              <Grid item xs={2}>
                <Typography variant="h4" sx={{ color: "secondary.main" }}>
                  ۷,۸۰۰,۰۰۰
                </Typography>
              </Grid>
              <Grid item xs={2}>
                <Button
                  type="submit"
                  variant="outlined"
                  color="primary"
                  size="small"
                >
                  تماس با فروشنده
                </Button>
              </Grid>
              <Grid item xs={3}>
                <Typography variant="h6">
                  آخرین تغییر قیمت فروشگاه: دیروز
                </Typography>
              </Grid>
            </Grid>
          </Stack>
        </Stack>
        <Stack sx={[sellerColumn, { mb: "30px" }]}>
          <Typography
            variant="h4"
            sx={{
              textAlign: "left",
              paddingBottom: "10px",
              color: "black",
            }}
          >
            مشخصات محصول
          </Typography>
          <Divider />
          <Divider
            sx={{
              backgroundColor: "secondary.main",
              width: "72px",
              height: "2px",
              mb: "20px",
            }}
          />
          <Stack direction={"row"} sx={sellersRow}>
            <Typography
              variant="body1"
              sx={{
                textAlign: "left",
                paddingBottom: "10px",
                color: "black",
              }}
            >
              تیرآهن 16 ناب تبریز مشمول استاندارد IPE یا همان استاندارد اروپا و
              ایران می باشد و در رده بندی تیرآهن های معمولی قرار می گیرد. تیرآهن
              16 فولاد ناب تبریز دارای دو اندازه کوتاه و بلند بوده و کیلویی به
              فروش می رسد.
            </Typography>
          </Stack>
        </Stack>
      </Stack>
    </>
  );
}
