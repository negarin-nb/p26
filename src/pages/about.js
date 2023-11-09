import React from "react";
import Header from "../components/header";
import { Typography, Box, Grid } from "@mui/material";
import { Stack } from "@mui/system";
import aboutUsImage from "../assets/images/aboutUs.JPG";

export default function About() {
  return (
    <div>
      <Header />
      <Stack
        sx={{
          bgcolor: "primary.main",
          mt: "50px",
          height: "120px",
          justifyContent: "center",
          alignItems: "flex-end",
          px: "40px",
          borderRadius: "4px",
        }}
      >
        <Typography variant="h1" sx={{ fontSize: "30px", color: "white" }}>
          درباره ما
        </Typography>
      </Stack>
      <Grid
        dir="rtl"
        container
        spacing={6}
        pt={{ xs: "50px", sm: "80px", md: "50" }}
        pb={{ xs: "0", md: "30px" }}
      >
        <Grid item xs={12} md={6}>
          <Stack height={{ md: "100%" }} sx={{ justifyContent: "flex-end" }}>
            <img src={aboutUsImage} style={{ borderRadius: "4px" }} />
          </Stack>
        </Grid>
        <Grid item xs={12} md={6}>
          <Stack
            spacing={2}
            justifyContent={{ xs: "center", md: "flex-end" }}
            alignItems={{ xs: "center", md: "flex-start" }}
            height={{ md: "100%" }}
          >
            <Typography
              variant="h2"
              textAlign={{ xs: "center", md: "left" }}
              sx={{ fontSize: "24px", color: "primary.main" }}
            >
              تیم پلاک ۲۶
            </Typography>
            <Typography
              variant="body1"
              textAlign={{ xs: "center", md: "left" }}
              pr={{ xs: "0", md: "100px" }}
              pb={{ xs: "80px", md: "0" }}
              sx={{
                //textAlign: "left",
                fontSize: "16px",
                // pr: "100px",
                lineHeight: "30px",
              }}
            >
              ما یک تیم جوان هستیم و یک کسب و کار چابک برپایه دانش و تجربیات
              قدیمی‌های بازار راه اندازی کرده‌ایم برای ارتباط با ما، با این
              شماره تماس بگیرید: ۸۸۸۰۶۰۰۶-۰۲۱
            </Typography>
          </Stack>
        </Grid>
      </Grid>
    </div>
  );
}
