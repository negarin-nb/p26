import React, { useEffect, useState } from "react";
import { styled } from "@mui/material/styles";
import { Grid, Paper, Stack, Typography, Button, Divider } from "@mui/material";
import subscrptionApi from "../api/subscrption";
import moment from "jalali-moment";
import PN from "persian-number";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
export default function Subscription() {
  const [adSubscription, setAdSubscription] = useState([]);
  const [callSubscription, setCallSubscription] = useState([]);
  const [credit, setCredit] = useState();
  const [timeCredit, setTimeCredit] = useState("");
  const [buyId, setBuyId] = useState();
  const [open, setOpen] = useState(false);

  const handleBuySubscription = (id) => {
    setOpen(true);
    setBuyId(id);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const packData = [
    { color: "#FF4D00B2" },
    { color: "#FF4D00CC" },
    { color: "#FF4D00" },
  ];

  const fetchPacks = async () => {
    const response = await subscrptionApi.getPacks();
    console.log(response.data.ListItems);

    const _adSubscription1 = response.data.ListItems.filter(
      (item) => item.type === 2
    );
    const _adSubscription2 = _adSubscription1.map((item, i) => ({
      ...item,
      ...packData[i],
    }));
    setAdSubscription(_adSubscription2);

    const _callSubscription1 = response.data.ListItems.filter(
      (item) => item.type == 1
    );
    const _callSubscription2 = _callSubscription1.map((item, i) => ({
      ...item,
      ...packData[i],
    }));
    setCallSubscription(_callSubscription2);
  };

  const fetchWallet = async () => {
    const response = await subscrptionApi.getWallet();
    //console.log(response.data.ListItems);
    setCredit(response.data.ListItems.credit);
    let date = moment(new Date());
    const endDate = moment(response.data.ListItems.time_credit);
    const numDays = endDate.diff(date, "days");
    setTimeCredit(numDays);
  };

  const buySubscription = async (id) => {
    const response = await subscrptionApi.buyPack(id);
    fetchWallet();
    //  console.log(response.data);
  };

  useEffect(() => {
    fetchPacks();
    console.log(adSubscription);
    fetchWallet();
    // console.log(credit);
    //  console.log(timeCredit);
  }, []);

  const iconStyle = {
    width: "20px",
  };
  const cardStyle = {
    justifyContent: "center",
    alignItems: "center",
    padding: "20px",
  };
  const cardTitle = { color: "white", marginBlock: "20px" };
  return (
    <>
      <Typography sx={{ textAlign: "left", marginTop: "20px" }} variant="h2">
        اعتبار اشتراک آگهی : {PN.convertEnToPe(timeCredit)} روز
      </Typography>
      <Typography sx={{ textAlign: "left", marginTop: "20px" }} variant="h2">
        موجودی اشتراک تماس : {PN.convertEnToPe(credit)} تومان
      </Typography>
      <Divider sx={{ marginBlock: "30px" }} />
      <Typography sx={{ textAlign: "left", marginBlock: "20px" }} variant="h2">
        بسته‌های اشتراک آگهی
      </Typography>

      <Grid dir="rtl" container spacing={2}>
        {adSubscription.map((item) => (
          <Grid item xs={4}>
            <Paper sx={[cardStyle, { backgroundColor: item.color }]}>
              <img
                style={iconStyle}
                src={require("../assets/images/Vector9.png")}
              />
              <Typography sx={cardTitle} variant="h1">
                اشتراک {item.title}
              </Typography>
              <Divider
                variant="middle"
                sx={{
                  borderColor: "white",
                  opacity: 0.5,
                }}
              />
              <Typography sx={cardTitle} variant="h1">
                {PN.convertEnToPe(item.price)} تومان
              </Typography>
              <Button
                type="submit"
                variant="outlined"
                color="myWhite"
                size="large"
                onClick={() => handleBuySubscription(item.id)}
              >
                خرید
              </Button>
            </Paper>
          </Grid>
        ))}
      </Grid>

      <Typography
        sx={{ textAlign: "left", mb: "20px", mt: "40px" }}
        variant="h2"
      >
        بسته‌های اشتراک تماس
      </Typography>

      <Grid dir="rtl" container spacing={2}>
        {callSubscription.map((item) => (
          <Grid item xs={4}>
            <Paper sx={[cardStyle, { backgroundColor: item.color }]}>
              <img
                style={iconStyle}
                src={require("../assets/images/Vector9.png")}
              />
              <Typography sx={cardTitle} variant="h1">
                اشتراک {item.title}
              </Typography>
              {/* <Divider
                variant="middle"
                sx={{
                  borderColor: "white",
                  opacity: 0.5,
                }}
              />
              <Typography sx={cardTitle} variant="h1">
                {item.price} تومان
              </Typography> */}
              <Button
                type="submit"
                variant="outlined"
                color="myWhite"
                size="large"
                onClick={() => handleBuySubscription(item.id)}
              >
                خرید
              </Button>
              <Dialog
                sx={{
                  "& .MuiModal-backdrop": { backgroundColor: "#0000003b" },
                  "& .MuiDialog-paper": {
                    width: "300px",
                    maxHeight: 435,
                    padding: "20px",
                  },
                }}
                dir="rtl"
                open={open}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
              >
                <DialogTitle
                  bgcolor="custom.main"
                  marginBottom="20px"
                  variant="h3"
                  id="alert-dialog-title"
                >
                  {"خرید اشتراک"}
                </DialogTitle>

                <DialogContent>
                  <DialogContentText id="alert-dialog-description">
                    آیا از خرید اشتراک مورد نظر را مطمئن هستید؟
                  </DialogContentText>
                </DialogContent>
                <DialogActions sx={{ justifyContent: "center" }}>
                  <Button
                    variant="outlined"
                    onClick={() => {
                      console.log(buyId);
                      buySubscription(buyId);
                    }}
                  >
                    بله
                  </Button>
                  <Button variant="outlined" onClick={handleClose} autoFocus>
                    خیر
                  </Button>
                </DialogActions>
              </Dialog>
            </Paper>
          </Grid>
        ))}
      </Grid>
    </>
  );
}
