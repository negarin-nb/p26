import React, { useState, useEffect } from "react";
import {
  Grid,
  Stack,
  Typography,
  Button,
  Box,
  Divider,
  Paper,
} from "@mui/material";

import productsApi from "../api/products";
import moment from "jalali-moment";
import PN from "persian-number";
import { useNavigate, useParams } from "react-router-dom";
import Header from "../components/header";
import biddingApi from "../api/bidding";
import { useAuth } from "../contex/authContext";
import LoginDialog from "../components/dialogs/loginDialog";
import BiddingDialog from "../components/dialogs/biddingDialog";

export default function ProductDetail() {
  const [product, setProduct] = useState({});
  const [biddings, setBiddings] = useState([]);
  const [openBid, setOpenBid] = useState(false);
  const [openLogin, setOpenLogin] = useState(false);
  const [price, setPrice] = useState("");
  const [showPhoneNumber, setShowPhoneNumber] = useState([false]);
  const { id } = useParams();
  const authCtx = useAuth();
  const navigation = useNavigate();

  const handlePrice = (p) => {
    setPrice(PN.convertEnToPe(p));
  };

  const handleClickOpenBid = () => {
    setOpenBid(true);
  };
  const handleCloseBid = () => {
    setOpenBid(false);
    setPrice("");
  };
  const handleSubmitBidding = async () => {
    let _price = PN.convertPeToEn(price);
    const response = await biddingApi.createBid({
      id,
      price: parseInt(_price, 10),
    });
    console.log(response.data);
    handleCloseBid();
  };

  const handleCloseLogin = () => {
    setOpenLogin(false);
  };

  const handleSubmitLogin = () => {
    handleCloseLogin();
    navigation("/login");
  };

  const handleCallButton = (id) => {
    if (!!authCtx.token) {
      const _s = [...showPhoneNumber];
      _s[id] = true;
      setShowPhoneNumber(_s);
    } else {
      setOpenLogin(true);
    }
  };
  const fetchProduct = async (productId) => {
    const response = await productsApi.getProduct(productId);
    console.log(response.data);
    //setProduct(response.data.Item);
    const _product = {
      ...response.data.Item,
      categoryid: response.data.Item.category.id,
      categorytitle: response.data.Item.category.title,
      subcategoryid: response.data.Item.subcategory.id,
      subcategorytitle: response.data.Item.subcategory.title,
    };
    setProduct(_product);
    if (response.data.Item.biddings) setBiddings(response.data.Item.biddings);
    // console.log(product.biddings);
  };
  // const fetchProfile = async () => {
  //   const response = await profileApi.getProfile();
  //   // console.log(response.data);
  //   // setShopName(response.data.Item.shop_name);
  //   // profileCtx.setProfile(response.data.Item);
  // };
  useEffect(() => {
    console.log(id);
    fetchProduct(id);
    // console.log("userProfile");
    // console.log(profileCtx.userProfile);
    // if (!profileCtx.userProfile.shopName) {
    //   fetchProfile();
    // }
  }, []);

  const imageColumn = {
    backgroundColor: "custom.main",
    height: "330px",
    justifyContent: "center",
    alignItems: "center",
  };
  const titleColumn = {
    paddingInline: "30px",
  };
  const sellerColumn = {
    backgroundColor: "custom.main",
    padding: "30px",
    pb: "15px",
    borderRadius: "5px",
  };
  const sellersRow = {
    backgroundColor: "myWhite.main",
    padding: "30px",
    borderRadius: "5px",
    flexDirction: "row",
    alignItems: "center",
    mb: "20px",
  };
  const iconStyle = {
    width: "20px",
    height: "20px",
    marginLeft: "20px",
  };
  const PositionStyle = {
    marginBlock: "15px",
    justifyContent: "flex-start",
    alignItems: "center",
    "&:hover": {
      bgcolor: "custom.main",
    },
  };

  return (
    <>
      <Header />
      <Stack dir="rtl">
        <Divider sx={{ paddingTop: "40px" }} />
        <div>
          <Typography sx={{ textAlign: "left", paddingTop: "20px" }}>
            خانه {`>`} {product.categorytitle} {`>`} {product.subcategorytitle}{" "}
            {`>`} {product.title}
          </Typography>
          <Grid container sx={{ marginBlock: "30px" }}>
            <Grid item xs={4}>
              <Paper elevation={2} sx={imageColumn}>
                <Stack
                  sx={
                    product.image && {
                      backgroundImage: `url(${product.image})`,
                      backgroundSize: "cover",
                    }
                  }
                  width="100%"
                  height="330px"
                  justifyContent="center"
                  alignItems="center"
                >
                  {product.image ? (
                    <img
                      src={""}
                      style={{
                        maxWidth: "100%",
                        objectFit: "cover",
                        overflow: "hidden",
                      }}
                    />
                  ) : (
                    <img
                      src={require("../assets/images/empty.png")}
                      style={{
                        width: "30%",
                        opacity: "0.3",
                      }}
                    />
                  )}
                </Stack>
              </Paper>
            </Grid>
            <Grid sx={titleColumn} item xs={4}>
              <Stack
                sx={{
                  justifyContent: "space-between",
                  alignItems: "space-between",
                }}
              >
                <Typography variant="h2" sx={{ textAlign: "left" }}>
                  {product.title}
                </Typography>

                <Typography
                  variant="h1"
                  sx={{
                    textAlign: "left",
                    marginTop: "160px",
                    marginBottom: "45px",
                  }}
                >
                  از {PN.convertEnToPe(product.min_price)} تومان تا{" "}
                  {PN.convertEnToPe(product.max_price)} تومان
                </Typography>

                <Button
                  type="submit"
                  variant="contained"
                  color="primary"
                  size="large"
                >
                  خرید با کمترین قیمت
                </Button>
                <Button
                  sx={{ marginTop: "10px" }}
                  variant="outlined"
                  onClick={handleClickOpenBid}
                >
                  پیشنهاد قیمت
                </Button>
              </Stack>
            </Grid>
            <Grid sx={sellerColumn} item xs={4}>
              <Typography
                variant="h2"
                sx={{
                  textAlign: "left",
                  paddingBottom: "10px",
                  color: "black",
                }}
              >
                فروشنده
              </Typography>
              <Stack direction="row" sx={PositionStyle}>
                <img
                  style={iconStyle}
                  src={require("../assets/images/Vector3.png")}
                />
                <Box>
                  <Typography variant="h6">فروشنده : </Typography>
                </Box>
              </Stack>
              <Divider />
              <Stack direction="row" sx={PositionStyle}>
                <img
                  style={iconStyle}
                  src={require("../assets/images/Vector3.png")}
                />
                <Box>
                  <Typography variant="h6">
                    محل تحویل: {product.delivery}
                  </Typography>
                </Box>
              </Stack>
              <Divider />
              <Stack direction="row" sx={PositionStyle}>
                <img
                  style={iconStyle}
                  src={require("../assets/images/Vector3.png")}
                />
                <Box>
                  <Typography variant="h6">
                    شماره تماس : {product.tel}
                  </Typography>
                </Box>
              </Stack>

              <Divider />
              <Stack direction="row" sx={PositionStyle}>
                <img
                  style={iconStyle}
                  src={require("../assets/images/Vector3.png")}
                />
                <Box>
                  <Typography variant="h6">
                    قیمت فروشنده: {PN.convertEnToPe(product.price)} تومان
                  </Typography>
                </Box>
              </Stack>
              <Divider />

              <Stack direction="row" sx={PositionStyle}>
                <img
                  style={iconStyle}
                  src={require("../assets/images/Vector3.png")}
                />
                <Typography variant="h6">
                  تاریخ به روزرسانی:
                  {PN.convertEnToPe(
                    moment(product.updated_at).format("YYYY/MM/DD")
                  )}
                </Typography>
              </Stack>
            </Grid>
          </Grid>
        </div>
        <Stack mb="20px"></Stack>
        <Stack sx={[sellerColumn, { mb: "30px" }]}>
          <Typography
            variant="h4"
            sx={{
              textAlign: "left",
              paddingBottom: "10px",
              color: "black",
            }}
          >
            فروشندگان
          </Typography>
          <Divider />
          <Divider
            sx={{
              backgroundColor: "secondary.main",
              width: "72px",
              height: "2px",
              mb: "20px",
            }}
          />

          {/* biddings */}

          {!!biddings[0] &&
            biddings.map((bidding) => (
              <Stack
                height="30px"
                key={bidding.id}
                direction={"row"}
                sx={sellersRow}
              >
                <Grid container sx={{ alignItems: "center" }}>
                  <Grid item xs={1}>
                    <Typography variant="h3" sx={{ textAlign: "left" }}>
                      {bidding.bidder.shop_name}
                    </Typography>
                  </Grid>
                  <Grid item>
                    <Typography
                      xs={6}
                      sx={{
                        width: "340px",
                        textAlign: "center",
                        color: "black",
                      }}
                      variant="h6"
                    >
                      {bidding.bidder.description}
                    </Typography>
                  </Grid>

                  <Grid item xs={2}>
                    <Typography variant="h4" sx={{ color: "secondary.main" }}>
                      {PN.convertEnToPe(bidding.price)}
                    </Typography>
                  </Grid>
                  <Grid item xs={2}>
                    {showPhoneNumber[bidding.id] ? (
                      <Typography variant="h5">
                        {PN.convertEnToPe(bidding.bidder.phone_number)}
                      </Typography>
                    ) : (
                      <Button
                        type="submit"
                        variant="outlined"
                        color="primary"
                        size="small"
                        onClick={() => handleCallButton(bidding.id)}
                      >
                        تماس با فروشنده
                      </Button>
                    )}
                  </Grid>
                  <Grid item xs={3}>
                    <Typography variant="h6">
                      آخرین تغییر قیمت فروشگاه:{" "}
                      {PN.convertEnToPe(
                        moment(bidding.updated_at).format("jYYYY/jMM/jDD")
                      )}
                    </Typography>
                  </Grid>
                </Grid>
              </Stack>
            ))}

          {/* <Stack direction={"row"} sx={sellersRow}>
            <Grid container sx={{ alignItems: "center" }}>
              <Grid item xs={1}>
                <Typography variant="h3" sx={{ textAlign: "left" }}>
                  آهنگ
                </Typography>
              </Grid>
              <Grid item>
                <Typography
                  sx={{ width: "340px", textAlign: "left", color: "black" }}
                  xs={6}
                  variant="h6"
                >
                  تیرآهن 14 ذوب آهن اصفهان 12 متری
                </Typography>
              </Grid>

              <Grid item xs={2}>
                <Typography variant="h4" sx={{ color: "secondary.main" }}>
                  ۷,۸۰۰,۰۰۰
                </Typography>
              </Grid>
              <Grid item xs={2}>
                <Button
                  type="submit"
                  variant="outlined"
                  color="primary"
                  size="small"
                >
                  تماس با فروشنده
                </Button>
              </Grid>
              <Grid item xs={3}>
                <Typography variant="h6">
                  آخرین تغییر قیمت فروشگاه: دیروز
                </Typography>
              </Grid>
            </Grid>
          </Stack> */}
        </Stack>

        {/* description */}

        <Stack sx={[sellerColumn, { mb: "30px" }]}>
          <Typography
            variant="h4"
            sx={{
              textAlign: "left",
              paddingBottom: "10px",
              color: "black",
            }}
          >
            مشخصات محصول
          </Typography>
          <Divider />
          <Divider
            sx={{
              backgroundColor: "secondary.main",
              width: "72px",
              height: "2px",
              mb: "20px",
            }}
          />
          <Stack direction={"row"} sx={sellersRow}>
            <Typography
              variant="body1"
              sx={{
                textAlign: "right",
                paddingBottom: "10px",
                color: "black",
              }}
            >
              {product.description}
            </Typography>
          </Stack>
        </Stack>
      </Stack>
      <BiddingDialog
        open={openBid}
        handleClose={handleCloseBid}
        price={price}
        handlePrice={handlePrice}
        handleSubmitBidding={handleSubmitBidding}
      />
      <LoginDialog
        open={openLogin}
        handleClose={handleCloseLogin}
        handleSubmitLogin={handleSubmitLogin}
      />
    </>
  );
}
