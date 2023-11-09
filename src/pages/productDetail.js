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
  const [owner, setOwner] = useState({});
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
    if (!!authCtx.token) {
      setOpenBid(true);
    } else {
      setOpenLogin(true);
    }
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

  const handleCallButton = (id) => {
    if (!!authCtx.token) {
      const _s = [...showPhoneNumber];
      _s[id] = true;
      setShowPhoneNumber(_s);
    } else {
      setOpenLogin(true);
    }
  };

  const handleCloseLogin = () => {
    setOpenLogin(false);
  };

  const handleSubmitLogin = () => {
    handleCloseLogin();
    navigation("/login");
  };

  const fetchProduct = async (productId) => {
    const response = await productsApi.getProduct(productId);

    const _product = {
      ...response.data.Item,
      categoryid: response.data.Item.category.id,
      categorytitle: response.data.Item.category.title,
      subcategoryid: response.data.Item.subcategory.id,
      subcategorytitle: response.data.Item.subcategory.title,
    };
    setProduct(_product);
    setOwner(response.data.Item.owner);
    if (response.data.Item.biddings) setBiddings(response.data.Item.biddings);
  };

  useEffect(() => {
    console.log(id);
    fetchProduct(id);
  }, []);

  const imageColumn = {
    backgroundColor: "custom.main",
    height: "330px",
    justifyContent: "center",
    alignItems: "center",
  };
  const titleColumn = {
    // paddingInline: "30px",
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
    alignItems: "flex-start",
    mb: "20px",
  };
  const iconStyle = {
    width: "20px",
    height: "20px",
    marginLeft: "20px",
  };
  const PositionStyle = {
    marginBlock: "15px",
    justifyContent: "space-between",
    alignItems: "center",
  };
  const tableStyle = {
    width: { xs: "100%", md: "400px" },
    marginBlock: "15px",
    justifyContent: "space-between",
    alignItems: "center",
    px: { xs: "0", md: "10px" },
  };

  return (
    <>
      <Header />
      <Stack dir="rtl">
        <Divider sx={{ paddingTop: "40px" }} />
        <div>
          <Typography sx={{ textAlign: "left", paddingY: "20px" }}>
            خانه {`>`} {product.categorytitle} {`>`} {product.subcategorytitle}{" "}
            {`>`} {product.title}
          </Typography>
          <Grid
            container
            spacing={{ xs: 2, md: 3 }}
            sx={{ marginBlock: "10px" }}
          >
            <Grid item xs={12} sm={6} md={4}>
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
            <Grid sx={titleColumn} item xs={12} sm={6} md={4}>
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
                    marginTop: { xs: "30px", sm: "160px" },
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
            <Grid item xs={12} sm={12} md={4}>
              <Box sx={sellerColumn}>
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
                  <Stack direction="row">
                    <img
                      style={iconStyle}
                      src={require("../assets/images/Vector3.png")}
                    />
                    <Typography variant="h6">فروشنده</Typography>
                  </Stack>
                  <Typography variant="h6">{owner.shop_name}</Typography>
                </Stack>
                <Divider />

                <Stack direction="row" sx={PositionStyle}>
                  <Stack direction="row">
                    <img
                      style={iconStyle}
                      src={require("../assets/images/Vector3.png")}
                    />
                    <Typography variant="h6"> محل تحویل</Typography>
                  </Stack>
                  <Typography variant="h6">{product.delivery}</Typography>
                </Stack>
                <Divider />

                <Stack direction="row" sx={PositionStyle}>
                  <Stack direction="row">
                    <img
                      style={iconStyle}
                      src={require("../assets/images/Vector3.png")}
                    />
                    <Typography variant="h6"> شماره تماس </Typography>
                  </Stack>
                  <Typography variant="h6">{product.tel}</Typography>
                </Stack>

                <Divider />
                <Stack direction="row" sx={PositionStyle}>
                  <Stack direction="row">
                    <img
                      style={iconStyle}
                      src={require("../assets/images/Vector3.png")}
                    />

                    <Typography variant="h6">قیمت فروشنده</Typography>
                  </Stack>
                  <Typography variant="h6">
                    {PN.convertEnToPe(product.price)} تومان
                  </Typography>
                </Stack>
                <Divider />

                <Stack direction="row" sx={PositionStyle}>
                  <Stack direction="row">
                    <img
                      style={iconStyle}
                      src={require("../assets/images/Vector3.png")}
                    />
                    <Typography variant="h6">تاریخ به روزرسانی</Typography>
                  </Stack>
                  <Typography variant="h6">
                    {PN.convertEnToPe(
                      moment(product.updated_at).format("YYYY/MM/DD")
                    )}
                  </Typography>
                </Stack>
              </Box>
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
                minHeight="30px"
                key={bidding.id}
                direction={"row"}
                sx={sellersRow}
              >
                <Grid
                  minHeight="40px"
                  container
                  columns={{ xs: 5, md: 10 }}
                  spacing={{ xs: 4, md: 1 }}
                  sx={{ alignItems: "center" }}
                >
                  <Grid item xs={5} md={1}>
                    <Typography variant="h3" sx={{ textAlign: "left" }}>
                      {bidding.bidder.shop_name}
                    </Typography>
                  </Grid>
                  <Grid item xs={5} md={3.5}>
                    <Typography
                      sx={{
                        // width: "340px",
                        textAlign: { xs: "left", md: "center" },
                        color: "black",
                      }}
                      variant="h6"
                    >
                      {bidding.bidder.description}
                    </Typography>
                  </Grid>

                  <Grid item xs={2.5} md={1.5}>
                    <Typography
                      variant="h4"
                      sx={{
                        color: "secondary.main",
                        textAlign: { xs: "left", md: "center" },
                      }}
                    >
                      {PN.convertEnToPe(bidding.price)}
                    </Typography>
                  </Grid>
                  <Grid
                    item
                    xs={2.5}
                    md={1.5}
                    display={"flex"}
                    justifyContent={{ xs: "flex-end", md: "center" }}
                    alignItems={"center"}
                    minHeight="70px"
                    // alignItems={{ xs: "flex-end", md: "center" }}
                  >
                    {showPhoneNumber[bidding.id] ? (
                      <Typography variant="h5">
                        {PN.convertEnToPe(bidding.bidder.co_tell)}
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
                  <Grid item xs={5} md={2.5}>
                    <Typography
                      variant="h6"
                      textAlign={{ xs: "left", md: "center" }}
                    >
                      آخرین تغییر قیمت فروشگاه:{" "}
                      {PN.convertEnToPe(
                        moment(bidding.updated_at).format("jYYYY/jMM/jDD")
                      )}
                    </Typography>
                  </Grid>
                </Grid>
              </Stack>
            ))}
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

          <Stack sx={sellersRow}>
            {product.alloy && (
              <>
                <Stack direction="row" sx={tableStyle}>
                  <Typography variant="h6">آلیاژ</Typography>
                  <Typography variant="body1">{product.alloy}</Typography>
                </Stack>
                <Divider sx={{ width: { xs: "100%", md: "420px" } }} />
              </>
            )}
            {product.mode && (
              <>
                <Stack direction="row" sx={tableStyle}>
                  <Typography variant="h6">حالت</Typography>
                  <Typography variant="body1">{product.mode}</Typography>
                </Stack>
                <Divider sx={{ width: { xs: "100%", md: "420px" } }} />
              </>
            )}
            {product.color && (
              <>
                <Stack direction="row" sx={tableStyle}>
                  <Typography variant="h6">رنگ</Typography>
                  <Typography variant="body1">{product.color}</Typography>
                </Stack>
                <Divider sx={{ width: { xs: "100%", md: "420px" } }} />
              </>
            )}
            {product.size && (
              <>
                <Stack direction="row" sx={tableStyle}>
                  <Typography variant="h6">سایز</Typography>
                  <Typography variant="body1">{product.size}</Typography>
                </Stack>
                <Divider sx={{ width: { xs: "100%", md: "420px" } }} />
              </>
            )}
            {product.thickness && (
              <>
                <Stack direction="row" sx={tableStyle}>
                  <Typography variant="h6">ضخامت</Typography>
                  <Typography variant="body1">{product.thickness}</Typography>
                </Stack>
                <Divider sx={{ width: { xs: "100%", md: "420px" } }} />
              </>
            )}
            {product.height && (
              <>
                <Stack direction="row" sx={tableStyle}>
                  <Typography variant="h6">ارتفاع</Typography>
                  <Typography variant="body1">{product.height}</Typography>
                </Stack>
                <Divider sx={{ width: { xs: "100%", md: "420px" } }} />
              </>
            )}
            {product.width && (
              <>
                <Stack direction="row" sx={tableStyle}>
                  <Typography variant="h6">عرض</Typography>
                  <Typography variant="body1">{product.width}</Typography>
                </Stack>
                <Divider sx={{ width: { xs: "100%", md: "420px" } }} />
              </>
            )}
            {product.length && (
              <>
                <Stack direction="row" sx={tableStyle}>
                  <Typography variant="h6">طول</Typography>
                  <Typography variant="body1">{product.length}</Typography>
                </Stack>
                <Divider sx={{ width: { xs: "100%", md: "420px" } }} />
              </>
            )}
            {product.unit && (
              <>
                <Stack direction="row" sx={tableStyle}>
                  <Typography variant="h6">واحد</Typography>
                  <Typography variant="body1">{product.unit}</Typography>
                </Stack>
                <Divider sx={{ width: { xs: "100%", md: "420px" } }} />
              </>
            )}
            {product.weight && (
              <>
                <Stack direction="row" sx={tableStyle}>
                  <Typography variant="h6">وزن</Typography>
                  <Typography variant="body1">{product.weight}</Typography>
                </Stack>
                <Divider sx={{ width: { xs: "100%", md: "420px" } }} />
              </>
            )}
          </Stack>
        </Stack>
        <Stack sx={[sellerColumn, { mb: "30px" }]}>
          <Typography
            variant="h4"
            sx={{
              textAlign: "left",
              paddingBottom: "10px",
              color: "black",
            }}
          >
            توضیحات محصول
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

          <Stack sx={sellersRow}>
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
