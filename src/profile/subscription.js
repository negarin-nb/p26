import React, { useEffect, useState } from "react";
import { styled } from "@mui/material/styles";
import { Grid, Paper, Stack, Typography, Button, Divider } from "@mui/material";
import subscrptionApi from "../api/subscrption";

export default function Subscription() {
  const [adSubscription, setAdSubscription] = useState([]);
  const [callSubscription, setCallSubscription] = useState([]);

  const fetchPacks = async () => {
    const response = await subscrptionApi.getPacks();
    console.log(response.data.ListItems);

    setAdSubscription(
      response.data.ListItems.filter((item) => item.type === 2)
    );

    setCallSubscription(
      response.data.ListItems.filter((item) => item.type === 1)
    );

    // console.log(callSubscription);
  };

  useEffect(() => {
    fetchPacks();
  }, []);

  const iconStyle = {
    width: "20px",
  };
  const cardStyle = {
    height: "230px",
    justifyContent: "center",
    alignItems: "center",
    padding: "20px",
  };
  const cardTitle = { color: "white", marginBlock: "20px" };
  return (
    <>
      <Typography
        sx={{ textAlign: "left", marginTop: "20px", marginBottom: "100px" }}
        variant="h2"
      >
        موجودی : ۰
      </Typography>
      <Divider sx={{ marginBlock: "50px" }} />
      <Typography sx={{ textAlign: "left", marginBlock: "20px" }} variant="h2">
        بسته‌ها
      </Typography>

      <Grid dir="rtl" container spacing={2}>
        <Grid item xs={4}>
          <Paper sx={[cardStyle, { backgroundColor: "#FF4D00B2" }]}>
            <img
              style={iconStyle}
              src={require("../assets/images/Vector9.png")}
            />
            <Typography sx={cardTitle} variant="h1">
              اشتراک سه ماهه
            </Typography>
            <Divider
              variant="middle"
              sx={{
                borderColor: "white",
                opacity: 0.5,
              }}
            />
            <Typography sx={cardTitle} variant="h1">
              ۵۰۰,۰۰۰ تومان
            </Typography>

            <Button
              type="submit"
              variant="outlined"
              color="myWhite"
              size="large"
            >
              خرید
            </Button>
          </Paper>
        </Grid>
        <Grid item xs={4}>
          <Paper sx={[cardStyle, { backgroundColor: "#FF4D00CC" }]}>
            <img
              style={iconStyle}
              src={require("../assets/images/Vector9.png")}
            />
            <Typography sx={cardTitle} variant="h1">
              اشتراک شش ماهه
            </Typography>
            <Divider
              variant="middle"
              sx={{
                borderColor: "white",
                opacity: 0.5,
              }}
            />
            <Typography sx={cardTitle} variant="h1">
              ۹۰۰,۰۰۰ تومان
            </Typography>
            <Button
              type="submit"
              variant="outlined"
              color="myWhite"
              size="large"
            >
              خرید
            </Button>
          </Paper>
        </Grid>
        <Grid item xs={4}>
          <Stack>
            <Paper sx={[cardStyle, { backgroundColor: "#FF4D00" }]}>
              <img
                style={iconStyle}
                src={require("../assets/images/Vector9.png")}
              />
              <Typography sx={cardTitle} variant="h1">
                اشتراک یک ساله
              </Typography>
              <Divider
                variant="middle"
                sx={{
                  borderColor: "white",
                  opacity: 0.5,
                }}
              />
              <Typography sx={cardTitle} variant="h1">
                ۱,۵۰۰,۰۰۰ تومان
              </Typography>
              <Button
                type="submit"
                variant="outlined"
                color="myWhite"
                size="large"
              >
                خرید
              </Button>
            </Paper>
          </Stack>
        </Grid>
      </Grid>
    </>
  );
}
