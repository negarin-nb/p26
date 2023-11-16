import React, { useState, useEffect } from "react";
import {
  TextField,
  Button,
  Typography,
  Stack,
  Grid,
  Snackbar,
  Alert,
  IconButton,
  Divider,
} from "@mui/material";
import { useProfile } from "../contex/profileContext";
import profileApi from "../api/profile";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import { Link } from "react-router-dom";

export default function ProfileInfo() {
  const [profile, setProfile] = useState({
    firstName: "",
    lastName: "",
    email: "",
    address: "",
    phoneNumber: "",
    coTel: "",
    coAdress: "",
    coWebsite: "",
    shopName: "",
  });
  const profileCtx = useProfile();

  const [open, setOpen] = useState(false);
  const [severity, setSeverity] = useState("");
  const [message, setMessage] = useState("");
  const handleClose = () => {
    setOpen(false);
  };
  const openAlert = (s, m) => {
    setSeverity(s);
    setMessage(m);
    setOpen(true);
  };

  const fetchProfile = async () => {
    const response = await profileApi.getProfile();
    //  console.log(response.data);
    const userData = {
      firstName: response.data.Item.first_name,
      lastName: response.data.Item.last_name,
      email: response.data.Item.email,
      address: "",
      phoneNumber: response.data.Item.phone_number,
      coTel: response.data.Item.co_tell,
      coWebsite: response.data.Item.co_site,
      coAdress: response.data.Item.co_address,
      shopName: response.data.Item.shop_name,
    };
    setProfile(userData);
    profileCtx.setProfile(userData);
  };

  useEffect(() => {
    // console.log(profileCtx.userProfile);
    if (!profileCtx.userProfile.shopName) {
      fetchProfile();
    } else setProfile(profileCtx.userProfile);
  }, []);

  const handleEditProfile = async (profile) => {
    try {
      const response = await profileApi.editProfile(profile);
      profileCtx.setProfile(profile);
      console.log(response.data);
      openAlert("success", "ویرایش حساب کاربری با موفقیت انجام شد.");
    } catch (error) {
      openAlert("error", "عملیات با خطا مواجه شده است.");
      console.log(error);
    }
  };

  const titleStyle = {
    marginBlock: "20px",
    textAlign: "left",
  };

  const inputStyle = {
    justifyContent: "flex-start",
    "& .MuiTextField-root": {
      paddingBottom: "15px",
      fontSize: "10px",
    },
    "& .MuiButton-root": {
      fontSize: "12px",
      px: 4,
      py: 1.5,
      my: "30px",
      justifyContent: "flex-start",
      alignItems: "flex-start",
    },
    "& .MuiButtonBase-root-MuiButton-root": {
      alignItems: "flex-start",
    },
  };

  return (
    <>
      <Stack
        direction="row"
        justifyContent="flex-end"
        alignItems="center"
        display={{ xs: "flex", md: "none" }}
      >
        <Typography variant="h3">اطلاعات حساب کاربری</Typography>
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
      <form>
        {/* <Stack  direction="row" spacing={5} > */}
        <Typography sx={titleStyle} variant="h3">
          مشخصات فردی
        </Typography>
        <Grid sx={inputStyle} dir="rtl" container spacing={2}>
          <Grid container item xs={6} direction="column">
            <TextField
              value={profile.firstName}
              onChange={(event) => {
                setProfile({
                  ...profile,
                  firstName: event.target.value,
                });
              }}
              fullWidth
              label="نام"
              variant="outlined"
            />

            <TextField
              value={profile.email}
              onChange={(event) => {
                setProfile({
                  ...profile,
                  email: event.target.value,
                });
              }}
              fullWidth
              label="ایمیل"
              variant="outlined"
            />
            <TextField
              value={profile.coTel}
              onChange={(event) => {
                setProfile({
                  ...profile,
                  coTel: event.target.value,
                });
              }}
              fullWidth
              label="تلفن ثابت"
              variant="outlined"
            />
          </Grid>

          <Grid container item xs={6} direction="column">
            <TextField
              value={profile.lastName}
              onChange={(event) => {
                setProfile({
                  ...profile,
                  lastName: event.target.value,
                });
              }}
              fullWidth
              label=" نام‌خانوادگی"
              variant="outlined"
            />
            <TextField fullWidth label="آدرس" variant="outlined" />
            <TextField
              value={profile.phoneNumber}
              onChange={(event) => {
                setProfile({
                  ...profile,
                  phoneNumber: event.target.value,
                });
              }}
              fullWidth
              label="تلفن همراه"
              variant="outlined"
            />
          </Grid>
        </Grid>

        <Typography sx={titleStyle} variant="h3">
          مشخصات فروشگاه
        </Typography>
        <Grid sx={inputStyle} dir="rtl" container spacing={2}>
          <Grid container item xs={6} direction="column">
            <TextField
              value={profile.shopName}
              onChange={(event) => {
                setProfile({
                  ...profile,
                  shopName: event.target.value,
                });
              }}
              fullWidth
              label="نام فروشگاه "
              variant="outlined"
            />
          </Grid>

          <Grid container item xs={6} direction="column">
            <TextField
              value={profile.coWebsite}
              onChange={(event) => {
                setProfile({
                  ...profile,
                  coWebsite: event.target.value,
                });
              }}
              fullWidth
              label="آدرس سایت فروشگاه "
              variant="outlined"
            />
          </Grid>
        </Grid>
        <Grid container item xs={12} direction="column">
          <TextField
            dir="rtl"
            value={profile.coAdress}
            onChange={(event) => {
              setProfile({
                ...profile,
                coAdress: event.target.value,
              });
            }}
            fullWidth
            label="آدرس فروشگاه "
            variant="outlined"
          />
        </Grid>
        <Stack
          sx={{
            alignItems: "flex-end",
            my: "30px",
          }}
        >
          <Button
            // type="submit"
            variant="contained"
            color="primary"
            size="large"
            onClick={() => handleEditProfile(profile)}
          >
            ویرایش اطلاعات
          </Button>

          <Snackbar
            dir="rtl"
            open={open}
            autoHideDuration={4000}
            onClose={handleClose}
          >
            <Alert
              onClose={handleClose}
              severity={severity}
              sx={{ width: "100%" }}
            >
              {message}
            </Alert>
          </Snackbar>
        </Stack>
      </form>
    </>
  );
}
