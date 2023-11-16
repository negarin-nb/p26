import React from "react";
import { Stack, Typography, IconButton, Divider } from "@mui/material";
import { Link } from "react-router-dom";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";

export default function Support() {
  const container = {
    height: { xs: "85vh", md: "100%" },
    justifyContent: "center",
    alignItems: "center",
  };
  return (
    <>
      <Stack
        direction="row"
        justifyContent="flex-end"
        alignItems="center"
        display={{ xs: "flex", md: "none" }}
      >
        <Typography variant="h3">پشتیبانی</Typography>
        <IconButton
          component={Link}
          to={"/profile"}
          color="primary"
          sx={{
            marginBlock: "10px",
            mr: "10px",
          }}
        >
          <ArrowForwardIcon fontSize="small" />
        </IconButton>
      </Stack>
      <Divider
        sx={{
          marginBottom: "20px",
          display: { xs: "flex", md: "none" },
        }}
      />

      <Stack sx={container}>
        <img
          src={require("../assets/images/support.png")}
          style={{ width: "50px", paddingBottom: "30px" }}
        />
        <Typography style={{ lineHeight: "40px" }} variant="h4">
          در صورت بروز هر گونه مشکل با شماره
          <Typography variant="h3">۰۲۱-۲۶۲۶ </Typography>
          تماس حاصل فرمایید
        </Typography>
      </Stack>
    </>
  );
}
