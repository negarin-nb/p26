import React from "react";
import { Stack, Typography, Button, IconButton, Divider } from "@mui/material";
import { Link } from "react-router-dom";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";

export default function Dashboard() {
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
        <Typography variant="h3">پیشخوان</Typography>
        <IconButton
          component={Link}
          to="/profile"
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
          src={require("../assets/images/search1.png")}
          style={{ width: "80px", paddingBottom: "30px" }}
        />
        <Typography variant="h3">هیچ آگهی تا کنون ثبت نشده است</Typography>
        <Button
          style={{ marginTop: "30px" }}
          type="submit"
          variant="contained"
          color="secondary"
          size="large"
          component={Link}
          to="/profile/insert-ad"
        >
          ثبت آگهی +
        </Button>
      </Stack>
    </>
  );
}
