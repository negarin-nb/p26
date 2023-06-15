import React from "react";
import { Paper, Grid, Typography, Stack } from "@mui/material";


export default function AdCard({item}) {
  return (
    <Grid item xs={12} sm={3} md={2.4} lg={2.4}>
      <Paper elevation={6}>
        <Stack
          sx={{
            justifyContent: "center",
            alignItems: "flex-start",

            p: "12px",
          }}
        >
          <img
            src={require("../assets/images/girder.jpeg")}
            style={{ width: "100%", paddingBottom: "5px" }}
          />
          <Typography variant="h6" component="h2" sx={{ py: "10px" }}>
            {item.title}
          </Typography>
          <Typography variant="h5" component="p" sx={{ py: "10px" }}>
            {item.totalePrice + " تومان"}
          </Typography>

          <Grid
            container
            spacing={0}
            sx={{
              alignItems: "center",
              pt: "10px",
            }}
          >
            <Grid item xs={6}>
              <Typography
                variant="caption"
                component="p"
                sx={{ textAlign: "left" }}
              >
                {item.store}
              </Typography>
            </Grid>
            <Grid item xs={6} sx={{}}>
              <Stack
                direction="row"
                spacing={1}
                sx={{ justifyContent: "flex-end", alignItems: "center" }}
              >
                <Typography variant="caption" component="p" sx={{ pt: "3px" }}>
                  {item.liked}
                </Typography>
                <img
                  src={require("../assets/images/Heart.png")}
                  style={{ width: "15px", height: "12.8px" }}
                />

                <img
                  src={require("../assets/images/Star.png")}
                  style={{ width: "15px", height: "14px" }}
                />
              </Stack>
            </Grid>
          </Grid>
        </Stack>
      </Paper>
    </Grid>
  );
}
