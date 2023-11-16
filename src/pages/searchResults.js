import React, { useState, useEffect } from "react";
import {
  Divider,
  Stack,
  Button,
  Typography,
  Box,
  Drawer,
  IconButton,
  Grid,
} from "@mui/material";
import Header from "../components/header";
import { getAds } from "../api/ads";
import { styled } from "@mui/material/styles";
import ListProducts from "../components/listProducts";
import { useLocation, useParams } from "react-router-dom";
import searchApi from "../api/search";
import buttonIcons from "../assets/buttonIcons/ButtonIcons";
import HomeButton from "../components/homeButton";
import FilterProduct from "../components/filterProduct";
import productsApi from "../api/products";
import Pagination from "../components/pagination";
import ProductsFilters from "../components/productsFilters";
import FilterListIcon from "@mui/icons-material/FilterList";
import CloseIcon from "@mui/icons-material/Close";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

export default function SearchResult() {
  const [products, setProducts] = useState([]);
  const [ads, setAds] = useState([]);
  const [searchIn, setSearchIn] = useState("");
  const [value, setValue] = React.useState("1");

  const [categories, setCategories] = useState([]);
  const [subCategories, setSubCategories] = useState([]);

  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage] = useState(20);
  const [numOfPages, setNumOfPages] = useState(1);

  const [mobileOpen, setMobileOpen] = useState(false);
  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  //determine category filter, state true it is categoryPage
  let state = useLocation().state;
  // console.log("state");
  // console.log(state);

  // for searching is word and for category filter is number
  const { searchInput } = useParams();
  //console.log(searchInput);

  const [selectedFields, setSelectedFields] = useState({
    category_id: "",
    subcategory_id: "",
    alloy: "",
    producer: "",
    supplier: "",
    mode: "",
    size: "",
    color: "",
    weight: "",
    height: "",
    width: "",
    length: "",
  });

  const fetchSearchResult = async () => {
    const response = await searchApi.search(
      searchInput,
      currentPage,
      postsPerPage
    );
    setNumOfPages(response.data.Item["number of pages"]);
    setProducts(response.data.ListItems);
    setAds(response.data.ListItems);
    const _ads = JSON.parse(JSON.stringify(response.data.ListItems));
  };
  const fetchFilterResult = async (id) => {
    //id is category_id
    const response = await searchApi.filter(id, currentPage, postsPerPage, {
      ...selectedFields,
      category_id: id,
    }); // we need to fetch products by category id as soon as the component is mounted, so we shoud set and pass category_id like this
    console.log(response);
    setNumOfPages(response.data.Item["number of pages"]);
    setProducts(response.data.ListItems);
    setAds(response.data.ListItems);
    const _ads = JSON.parse(JSON.stringify(response.data.ListItems));
  };

  const handlePageChange = (value) => {
    setCurrentPage(value);
    console.log(currentPage);
    //   fetchFilterResult(searchInput);
  };

  const fetchCategories = async () => {
    const response = await productsApi.getCategories();
    setCategories(response.data.ListItems);
  };

  const fetchSubCategories = async (id) => {
    const response = await productsApi.getSubCategories(id);
    setSubCategories(response.data.ListItems);
  };

  const handleSubCategorySelect = async (id) => {
    console.log(id);
    const _products = [...ads];
    const _ads = _products.filter((product) => product.subcategory === id);
    setAds(_ads);
    // fetchSubCategories(id);
  };

  const handleCategorySelect = async (id) => {
    const _products = [...ads];
    const _ads = _products.filter((product) => product.category === id);
    setAds(_ads);
    fetchSubCategories(id);
  };

  const onClickResult = (id) => {
    setCurrentPage(1);
    setCategories([]);
    setSelectedFields({
      subcategory_id: "",
      alloy: "",
      producer: "",
      supplier: "",
      mode: "",
      size: "",
      color: "",
      weight: "",
      height: "",
      width: "",
      length: "",
      category_id: id,
    });
    // fetchFilterResult(id);
    fetchSubCategories(id);
    setSearchIn(id);
  };

  useEffect(() => {
    if (state) {
      setSelectedFields({
        subcategory_id: "",
        alloy: "",
        producer: "",
        supplier: "",
        mode: "",
        size: "",
        color: "",
        weight: "",
        height: "",
        width: "",
        length: "",
        category_id: searchInput,
      });
      fetchFilterResult(searchInput);
      setSearchIn(searchInput);
      // fetchSubCategories(searchInput);
    } else {
      fetchSearchResult();
      //  fetchCategories();
    }
  }, []);

  useEffect(() => {
    if (state) fetchFilterResult(searchInput);
    else fetchSearchResult();
  }, [currentPage]);

  useEffect(() => {
    if (state) {
      console.log("searchResult->useEffect with selectedField dependency");
      fetchFilterResult(searchInput);
      setCurrentPage(1);
    } else {
      fetchSearchResult();
      fetchFilterResult(selectedFields.category_id);
    }
  }, [selectedFields]);

  // useEffect(() => {
  //   fetchSubCategories(searchInput);
  // }, [searchIn]);

  return (
    <div className="App">
      <Header />
      <Stack
        dir="rtl"
        direction="row"
        spacing={{ xs: 4, lg: 5.5 }}
        mt={"60px"}
        justifyContent="center"
      >
        <Grid
          dir="rtl"
          container
          spacing={{ xs: 0 }}
          columns={{ xs: 8, sm: 8, md: 9 }}
          mt={"25px"}
          paddingX={{ xs: "0", md: "100px" }}
        >
          {buttonIcons.map((buttonIcon) => (
            <Grid item xs={2} sm={2} md={1} marginBottom="60px">
              <HomeButton
                svgIcon={buttonIcon.svg}
                title={buttonIcon.title}
                id={buttonIcon.id}
                stateTitle={state ? state.title : null}
                onClickResult={onClickResult}
              />
            </Grid>
          ))}
        </Grid>
      </Stack>

      <Stack marginBottom="20px">
        <Divider />

        <Stack dir="rtl">
          <>
            <Stack
              bgcolor="custom.main"
              dir="rtl"
              direction="row"
              justifyContent="space-between"
              alignItems="center"
              spacing={1}
              my={{ xs: "10px", md: "10px" }}
              mb={{ xs: "5px", md: "10px" }}
              mt={{ xs: "10px", md: "10px" }}
              //sx={{ marginY: "10px" }}
            >
              <Typography
                bgcolor="custom.main"
                p="10px"
                textAlign="left"
                mb={{ xs: "0", md: "10px" }}
                mt={{ xs: "10px", md: "10px" }}
                dir="rtl"
                variant="h3"
              >
                {state
                  ? "محصول: " + state.title
                  : "نتیجه جستجو برای: " + searchInput}
              </Typography>
              <Box display={{ xs: "block", md: "none" }}>
                <Button
                  width="50px"
                  //variant="outlined"
                  textAlign="left"
                  onClick={handleDrawerToggle}
                  color="text"
                  fontSize="12px"
                  startIcon={<FilterListIcon />}
                >
                  فیلتر
                </Button>
              </Box>
            </Stack>
            <Stack direction="row">
              <Stack
                width="30%"
                direction="row"
                display={{ xs: "none", md: "flex" }}
              >
                <ProductsFilters
                  categoryPage={{ is: !!state, catId: searchIn }}
                  selectedFields={selectedFields}
                  setSelectedFields={setSelectedFields}
                  fetchFilterResult={fetchFilterResult}
                />
              </Stack>

              {ads.length === 0 ? (
                <Stack width="100%">
                  <Typography dir="rtl" variant="h3">
                    محصولی یافت نشد!
                  </Typography>
                </Stack>
              ) : (
                <ListProducts
                  ads={ads}
                  postsPerPage={postsPerPage}
                  currentPage={currentPage}
                />
              )}
            </Stack>
          </>

          <Box component="filter">
            <Drawer
              dir="rtl"
              anchor="left"
              variant="temporary"
              open={mobileOpen}
              onClose={handleDrawerToggle}
              ModalProps={{
                keepMounted: true, // Better open performance on mobile.
              }}
              SlideProps={{ direction: "left" }}
              sx={{
                display: { xs: "block", md: "none" },
                "& .MuiDrawer-paper": {
                  boxSizing: "border-box",
                  width: "100%",
                },
              }}
            >
              <Stack direction="row" justifyContent="space-between">
                <IconButton
                  size="large"
                  // edge="end"
                  color="text"
                  aria-label="open-drawer"
                  onClick={handleDrawerToggle}
                  sx={{ mx: 2 }}
                >
                  <CloseIcon />
                </IconButton>
                <IconButton
                  size="large"
                  // edge="end"
                  color="text"
                  aria-label="open-drawer"
                  onClick={handleDrawerToggle}
                  sx={{ mx: 2 }}
                >
                  <ArrowBackIcon />
                </IconButton>
              </Stack>

              <ProductsFilters
                categoryPage={{ is: false, catId: null }}
                selectedFields={selectedFields}
                setSelectedFields={setSelectedFields}
              />
            </Drawer>
          </Box>

          {
            <Stack
              dir="ltr"
              justifyContent="center"
              py="40px"
              direction="row"
              ml={{ xs: "0", md: "260px" }}
            >
              {numOfPages === 1 ? null : (
                <Pagination
                  postsPerPage={postsPerPage}
                  numOfPages={numOfPages}
                  currentPage={currentPage}
                  handlePageChange={handlePageChange}
                />
              )}
            </Stack>
          }
        </Stack>
      </Stack>
    </div>
  );
}
