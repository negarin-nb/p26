import React, { useState, useEffect } from "react";
import HeaderLogedin from "../components/headerLogedin";
import { Box, Divider, Paper, Stack, Typography } from "@mui/material";
import Grid from "@mui/material/Grid";
import { Link, Outlet, useNavigate } from "react-router-dom";
import authApi from "../api/auth";
import auth from "../api/auth";
import { useAuth } from "../contex/authContext";
import { useProfile } from "../contex/profileContext";
import profileApi from "../api/profile";
import PN from "persian-number";

export default function Profile() {
  const authCtx = useAuth();
  const navigate = useNavigate();
  const [phoneNumber, setPhoneNumber] = useState("");

  const profileCtx = useProfile();
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
    const convert = PN.convertEnToPe(userData.phoneNumber);
    setPhoneNumber(convert);
    profileCtx.setProfile(userData);
  };

  useEffect(() => {
    // console.log(profileCtx.userProfile);
    if (!profileCtx.userProfile.shopName) {
      fetchProfile();
    } else phoneNumber(profileCtx.userProfile.phoneNumber);
  }, []);

  const ContainerStyle = {
    marginTop: "20px",
    marginBottom: "50px",
    padding: "10px",
    backgroundColor: "#F0F0F0",
  };
  const ColumnStyle = {
    backgroundColor: "white",
    borderRadius: "3px",
    padding: "20px",
    justifyContent: "flex-start",
  };
  const iconStyle = {
    width: "20px",
    height: "20px",
    marginLeft: "20px",
  };
  const PositionStyle = {
    padding: "10px",
    marginBlock: "5px",
    justifyContent: "flex-end",
    alignItems: "center",
    "&:hover": {
      bgcolor: "custom.main",
    },
  };

  return (
    <>
      <HeaderLogedin />
      <Divider sx={{ marginTop: "40px" }} />
      <Paper sx={ContainerStyle} elevation={5}>
        <Grid container sx={{}} spacing={0}>
          <Grid item xs={6} md={9} sx={{ paddingLeft: "5px", height: "100%" }}>
            <Box sx={[ColumnStyle, { height: "600px", overflow: "auto" }]}>
              <Outlet />
            </Box>
          </Grid>

          <Grid item xs={6} md={3}>
            <Stack
              direction="row"
              sx={[ColumnStyle, { justifyContent: "flex-end", mb: "5px" }]}
            >
              <Box>
                <Typography variant="h5">به پلاک ۲۶ خوش آمدید</Typography>
                <Typography sx={{ mt: "10px", textAlign: "left" }} variant="h5">
                  {phoneNumber}
                </Typography>
              </Box>
              <img
                style={{
                  width: "40px",
                  height: "40px",
                  marginLeft: "30px",
                  borderRadius: "100px",
                }}
                src={require("../assets/images/Profile.png")}
              />
            </Stack>
            <Stack sx={[ColumnStyle, { height: "512px" }]}>
              <Stack
                direction="row"
                sx={PositionStyle}
                component={Link}
                to="dashboard"
              >
                <Box>
                  <Typography underline="none" variant="body1">
                    پیشخوان
                  </Typography>
                </Box>
                <img
                  style={iconStyle}
                  src={require("../assets/images/Vector.png")}
                />
              </Stack>

              <Stack
                direction="row"
                sx={PositionStyle}
                component={Link}
                to="subscription"
              >
                <Box>
                  <Typography variant="body1"> اشتراک</Typography>
                </Box>
                <img
                  style={iconStyle}
                  src={require("../assets/images/Vector2.png")}
                />
              </Stack>
              <Stack
                direction="row"
                sx={PositionStyle}
                component={Link}
                to="ads"
              >
                <Box>
                  <Typography variant="body1">آگهی‌ها</Typography>
                </Box>
                <img
                  style={iconStyle}
                  src={require("../assets/images/Vector3.png")}
                />
              </Stack>
              <Stack
                direction="row"
                sx={PositionStyle}
                component={Link}
                to="insert-ad"
              >
                <Box>
                  <Typography variant="body1"> درج آگهی </Typography>
                </Box>
                <img
                  style={iconStyle}
                  src={require("../assets/images/Vector4.png")}
                />
              </Stack>
              <Stack
                direction="row"
                sx={PositionStyle}
                component={Link}
                to="support"
              >
                <Box>
                  <Typography variant="body1">پشتیبانی</Typography>
                </Box>
                <img
                  style={iconStyle}
                  src={require("../assets/images/Vector5.png")}
                />
              </Stack>
              <Divider sx={{ marginBlock: "20px" }} />
              <Stack
                direction="row"
                sx={PositionStyle}
                component={Link}
                to="profile-info"
              >
                <Box>
                  <Typography variant="body1"> حساب کاربری</Typography>
                </Box>
                <img
                  style={iconStyle}
                  src={require("../assets/images/Vector6.png")}
                />
              </Stack>
              <Stack direction="row" sx={PositionStyle}>
                <Box
                  sx={{ cursor: "pointer" }}
                  onClick={() => {
                    authCtx.logout();
                    navigate("/");
                  }}
                >
                  <Typography variant="body1">خروج از حساب</Typography>
                </Box>
                <img
                  style={iconStyle}
                  src={require("../assets/images/Vector7.png")}
                />
              </Stack>
            </Stack>
          </Grid>
        </Grid>
      </Paper>
    </>
  );
}
