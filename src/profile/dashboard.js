import React from "react";
import { Stack, Typography, Link, Button } from "@mui/material";
export default function Dashboard() {
  const container = {
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
  };
  return (
    <>
      <Stack style={container}>
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
          to="insert-ad"
        >
          ثبت آگهی +
        </Button>
      </Stack>
    </>
  );
}
