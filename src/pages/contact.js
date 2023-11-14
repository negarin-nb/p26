import React, { useState } from "react";
import Header from "../components/header";
import { Typography, Grid, TextField, Button, Stack } from "@mui/material";
import { Link } from "react-router-dom";

import mapImage from "../assets/images/map.png";

export default function Contact() {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  function handleSubmit(event) {
    event.preventDefault();
    console.log(name, phone, email, message);
  }

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
          تماس با ما
        </Typography>
      </Stack>
      <Grid
        minHeight="450px"
        height="50vh"
        dir="rtl"
        container
        spacing={6}
        pr={{ xs: "20px" }}
        pt={{ xs: "50px", sm: "80px", md: "50" }}
        pb={{ xs: "0", md: "30px" }}
      >
        <Grid item xs={12} md={6}>
          <Stack
            height={{ md: "100%" }}
            sx={{
              justifyContent: "flex-end",
            }}
          >
            <Typography
              variant="body1"
              textAlign={{ xs: "center", md: "left" }}
              pb="20px"
              sx={{
                fontSize: "16px",
                lineHeight: "30px",
              }}
            >
              <span style={{ color: "#FF4D00" }}>دفتر مرکزی: </span>
              تهران، خیابان وصال شیرازی، بالا تر از ایتالیا، نبش قائمی، پلاک ۵۶
              <br />
              <span style={{ color: "#FF4D00" }}>تلفن : </span>
              ۸۸۸۰۶۰۰۶-۰۲۱
              <br />
              <span style={{ color: "#FF4D00" }}>ایمیل : </span>
              info@p26.ir
            </Typography>
            <img src={mapImage} style={{ borderRadius: "4px" }} />
          </Stack>
        </Grid>
        <Grid item xs={12} md={6}>
          <Stack
            paddingLeft={{ sx: "0", md: "30px" }}
            borderLeft={{ sx: "none", md: "lightGray solid 1px" }}
            pb={{ xs: " 80px", md: "0" }}
            spacing={2}
            justifyContent={{ xs: "center", md: "flex-end" }}
            // alignItems={{ xs: "center", md: "flex-start" }}
            height={{ md: "100%" }}
          >
            <Typography
              variant="body1"
              textAlign={{ xs: "center", md: "left" }}
              pb={{ xs: " 20px" }}
              sx={{
                fontSize: "16px",
                lineHeight: "30px",
              }}
            >
              در صورت نیاز به مشاوره فرم زیر را پر کنید.
            </Typography>
            <form onSubmit={handleSubmit}>
              <TextField
                type="text"
                variant="outlined"
                color="secondary"
                label="نام و نام‌خانوادگی"
                onChange={(e) => setName(e.target.value)}
                value={name}
                fullWidth
                sx={{ mb: 2 }}
              />
              <Stack spacing={2} direction="row" sx={{ marginBottom: 2 }}>
                <TextField
                  type="text"
                  variant="outlined"
                  color="secondary"
                  label="ایمیل"
                  onChange={(e) => setEmail(e.target.value)}
                  value={email}
                  fullWidth
                  // required
                />
                <TextField
                  type="text"
                  variant="outlined"
                  color="secondary"
                  label="شماره تماس"
                  onChange={(e) => setPhone(e.target.value)}
                  value={phone}
                  fullWidth
                  // required
                />
              </Stack>

              <TextField
                type="text"
                multiline
                minRows={4}
                maxRows={4}
                variant="outlined"
                color="secondary"
                label="متن پیام"
                onChange={(e) => setMessage(e.target.value)}
                value={message}
                // required
                fullWidth
                sx={{ mb: 2 }}
              />

              <Button
                variant="contained"
                fullWidth
                color="secondary"
                type="submit"
              >
                ارسال
              </Button>
            </form>
          </Stack>
        </Grid>
      </Grid>
    </div>
  );
}
