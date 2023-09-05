import React, { useState, useEffect } from "react";
import {
  IconButton,
  InputBase,
  Paper,
  Stack,
  Divider,
  Box,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Typography,
  Pagination,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import Header from "../components/header";
import ListProducts from "../components/listProducts";
import productsApi from "../api/products";
import PaginationCustom from "../components/pagination";

export default function Products() {
  const [products, setProducts] = useState([]);
  const [ads, setAds] = useState([]);

  const [categories, setCategories] = useState([]);
  const [category, setCategory] = useState("");

  const [subCategories, setSubCategories] = useState([]);
  const [subCategory, setSubCategory] = useState("");

  const [supplier, setSupplier] = useState("");
  const [producer, setProducer] = useState("");

  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage, setPostsPerPage] = useState(30);

  const fetchProducts = async () => {
    const response = await productsApi.getProducts();
    const _products = JSON.parse(JSON.stringify(response.data.ListItems));
    arrangePage(_products);
    setProducts(response.data.ListItems);
  };

  const fetchCategories = async () => {
    const response = await productsApi.getCategories();
    setCategories(response.data.ListItems);
  };

  const fetchSubCategories = async (id) => {
    const response = await productsApi.getSubCategories(id);
    setSubCategories(response.data.ListItems);
  };

  const handleCategorySelect = async (id) => {
    setSubCategories([]);
    const _products = [...products];
    const _ads = _products.filter((product) => product.category === id);
    setAds(_ads);
    fetchSubCategories(id);
  };

  const handleSubCategorySelect = async (subcategoryid, categoryid) => {
    const _products = [...products];
    console.log(_products);
    const _ads = _products.filter(
      (product) =>
        product.category === categoryid && product.subcategory === subcategoryid
    );
    setAds(_ads);
  };
  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const arrangePage = (products) => {
    const indexOfLastPost = currentPage * postsPerPage;
    const indexOfFirstPost = indexOfLastPost - postsPerPage;
    const currentProducts = products.slice(indexOfFirstPost, indexOfLastPost);
    setAds(currentProducts);
  };

  useEffect(() => {
    fetchProducts();
    fetchCategories();
  }, []);

  useEffect(() => {
    arrangePage(products);
  }, [currentPage]);

  const FormControlStyle = {
    backgroundColor: "custom.main",
    borderRadius: "5px",
    marginBottom: "8px",
  };

  return (
    <div className="App">
      <Header />
      <Stack sx={{ justifyContent: "center", alignItems: "center" }}>
        <Paper
          component="form"
          elevation={3}
          sx={{
            p: "5px",
            display: "flex",
            alignItems: "center",
            width: { xs: 300, sm: 450, md: 500, lg: 630 },
            my: "50px",
          }}
        >
          <IconButton type="button" sx={{ p: "2px" }} aria-label="search">
            <SearchIcon sx={{ fontSize: { xs: 20, md: 25, lg: 30 } }} />
          </IconButton>
          <InputBase
            inputProps={{
              "aria-label": "search",
              style: { textAlign: "right" },
            }}
            sx={{ mx: 1, flex: 1 }}
            placeholder="جستجو"
          />
        </Paper>
      </Stack>
      <Divider sx={{ marginBottom: "30px" }} />

      <Stack dir="rtl" direction="row">
        <div style={{ width: "30%" }}>
          <Box
            sx={{
              mr: "30px",
              backgroundColor: "custom.main",
              borderRadius: "5px",
              padding: "5px",
            }}
          >
            <Box
              sx={{
                backgroundColor: "#fff",
                paddingTop: "10px",
                paddingX: "10px",
                borderRadius: "5px",
              }}
            >
              <Typography variant="h6" sx={{ pb: "10px" }}>
                فیلتر گذاری
              </Typography>
              <FormControl fullWidth sx={FormControlStyle}>
                <InputLabel sx={{ color: "text.main" }} id="select-label">
                  نوع محصول
                </InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={category}
                  label="نوع محصول"
                  onChange={(event) => {
                    setCategory(event.target.value);
                  }}
                >
                  {categories.map((category) => (
                    <MenuItem
                      onClick={() => {
                        handleCategorySelect(category.id);
                      }}
                      dir="rtl"
                      value={category}
                      key={category.id}
                    >
                      {category.title}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>

              <FormControl fullWidth sx={FormControlStyle}>
                <InputLabel sx={{ color: "text.main" }} id="select-label">
                  دسته‌بندی
                </InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={subCategory}
                  label="دسته‌بندی"
                  onChange={(event) => {
                    setSubCategory(event.target.value);
                  }}
                >
                  {subCategories.map((subCategory) => (
                    <MenuItem
                      onClick={() => {
                        handleSubCategorySelect(subCategory.id, category.id);
                        console.log("subCategory.id");
                        console.log(subCategory.id);
                        console.log(category);
                      }}
                      dir="rtl"
                      value={subCategory}
                      key={subCategory.id}
                    >
                      {subCategory.title}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>

              <FormControl fullWidth sx={FormControlStyle}>
                <InputLabel sx={{ color: "text.main" }} id="select-label3">
                  عرضه‌کننده
                </InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={supplier}
                  label="عرضه‌کننده"
                  onChange={(event) => setSupplier(event.target.value)}
                >
                  <MenuItem dir="rtl" value={18}>
                    ۱۸
                  </MenuItem>
                  <MenuItem dir="rtl" value={20}>
                    ۲۰
                  </MenuItem>
                </Select>
              </FormControl>
              <FormControl fullWidth sx={FormControlStyle}>
                <InputLabel sx={{ color: "text.main" }} id="select-label3">
                  تولیدکننده
                </InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={producer}
                  label="تولیدکننده"
                  onChange={(event) => setProducer(event.target.value)}
                >
                  <MenuItem dir="rtl" value={18}>
                    ۱۸
                  </MenuItem>
                  <MenuItem dir="rtl" value={20}>
                    ۲۰
                  </MenuItem>
                </Select>
              </FormControl>
            </Box>
          </Box>
        </div>

        <ListProducts ads={ads} />
      </Stack>

      {
        <Stack justifyContent="center" py="40px" direction="row" ml="260px">
          <PaginationCustom
            postsPerPage={postsPerPage}
            totalPosts={products.length}
            currentPage={currentPage}
            paginate={paginate}
          />
        </Stack>
      }
      {/* <TabContext value={value}>
        <TabList
          dir="rtl"
          onChange={handleChange}
          centered
          indicatorColor="transparent"
        >
          <StyledTab
            icon={<GridView viewBox="0 0 17 17" sx={svgIconStyle} />}
            value="1"
          />
          <StyledTab
            icon={<ListView viewBox="0 0 16 14" sx={svgIconStyle} />}
            value="2"
          />
        </TabList>
        <Divider sx={{ marginTop: "-10px" }} />
        <TabPanel value="1" sx={TabPanelStyle}>
          <Grid container spacing={2} dir="rtl">
            {ads.map((ad) => (
              <AdCard item={ad} />
            ))}
          </Grid>
        </TabPanel>
        <TabPanel value="2" sx={TabPanelStyle}>
          <ListProducts />
        </TabPanel>
      </TabContext> */}
    </div>
  );
}
