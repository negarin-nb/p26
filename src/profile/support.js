import React from "react";
import { Stack, Typography, Link, Button } from "@mui/material";

export default function Support() {
  const container = {
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
  };
  return (
    <>
      <Stack style={container}>
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
