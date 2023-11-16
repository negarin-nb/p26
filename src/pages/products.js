import React, { useState, useEffect } from "react";
import {
  IconButton,
  InputBase,
  Paper,
  Stack,
  Divider,
  Box,
  Button,
  Drawer,
  Typography,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import SearchIcon from "@mui/icons-material/Search";
import Header from "../components/header";
import ListProducts from "../components/listProducts";
import productsApi from "../api/products";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import PN from "persian-number";
import PaginationCustom from "../components/pagination";
import ProductsFilters from "../components/productsFilters";
import FilterListIcon from "@mui/icons-material/FilterList";
import CloseIcon from "@mui/icons-material/Close";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import searchApi from "../api/search";

export default function Products() {
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [ads, setAds] = useState([]);

  const [mobileOpen, setMobileOpen] = useState(false);
  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage] = useState(20);
  const [numOfPages, setNumOfPages] = useState(1);

  const handlePageChange = (value) => {
    setCurrentPage(value);
    console.log(currentPage);
  };

  const [value, setValue] = useState("");
  const [inputValue, setInputValue] = useState("");

  const [searchInput, setSearchInput] = useState("");

  const handleSubmitButton = () => {
    navigate(`/results/${searchInput}`);
  };
  const handleSubmitEnter = (e) => {
    if (e.key === "Enter") navigate(`/results/${searchInput}`);
  };

  const [selectedFields, setSelectedFields] = useState({
    category_id: "",
    subCategory_id: "",
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

  const fetchProducts = async () => {
    const response = await productsApi.getProducts(currentPage, postsPerPage);
    //const response = await productsApi.getProducts(currentPage,postsPerPage);
    const _products = JSON.parse(JSON.stringify(response.data.ListItems));
    // arrangePage(_products);
    setNumOfPages(response.data.Item["number of pages"]);
    setProducts(response.data.ListItems);
    setAds(response.data.ListItems);
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
  };

  const fetchSubCategories = async (id) => {
    const response = await productsApi.getSubCategories(id);
    //setSubCategories(response.data.ListItems);
  };

  const handleCategorySelect = async (id) => {
    //setSubCategories([]);
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

  useEffect(() => {
    fetchProducts(currentPage, postsPerPage);
    //fetchCategories();
  }, []);

  useEffect(() => {
    //fetchProducts(currentPage, postsPerPage);
    fetchFilterResult(selectedFields.category_id);
  }, [currentPage]);

  useEffect(() => {
    console.log("products->useEffect with selectedField dependency");
    fetchFilterResult(selectedFields.category_id);
    setCurrentPage(1);
  }, [selectedFields]);

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
            width: { xs: "100%", sm: 450, md: 500, lg: 630 },
            my: { xs: "30px", md: "50px" },
          }}
        >
          <IconButton
            type="button"
            sx={{ p: "2px" }}
            aria-label="search"
            onClick={handleSubmitButton}
          >
            <SearchIcon sx={{ fontSize: { xs: 20, md: 25, lg: 30 } }} />
          </IconButton>

          <InputBase
            inputProps={{
              "aria-label": "search",
              style: { textAlign: "right" },
            }}
            sx={{ mx: 1, flex: 1 }}
            placeholder="جستجو"
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
            onKeyDown={(e) => handleSubmitEnter(e)}
          />
        </Paper>
      </Stack>
      <Divider sx={{ marginBottom: { xs: "10px", md: "20px" } }} />
      <Stack
        display={{ xs: "flex", md: "none" }}
        dir="rtl"
        direction="row"
        alignItems="center"
        spacing={1}
        sx={{ marginBottom: "10px" }}
      >
        <Button
          variant="outlined"
          onClick={handleDrawerToggle}
          color="text"
          fontSize="12px"
          startIcon={<FilterListIcon />}
        >
          فیلتر
        </Button>
      </Stack>

      <Stack dir="rtl" direction="row">
        <Stack width="30%" direction="row" display={{ xs: "none", md: "flex" }}>
          <ProductsFilters
            categoryPage={{ is: false, catId: null }}
            selectedFields={selectedFields}
            setSelectedFields={setSelectedFields}
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
        {/* <Box
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
                paddingBottom: "5px",
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

              <Autocomplete
                disablePortal
                id="combo-box-demo"
                sx={FormControlStyle}
                options={filteringFields.producer}
                noOptionsText={"موردی یافت نشد"}
                inputValue={selectedFields.producer}
                onInputChange={(event, newInputValue) => {
                  //  console.log(newInputValue);
                  // setInputValue(newInputValue);
                  fetchFilteringFields("producer", newInputValue);
                  setSelectedFields({
                    ...selectedFields,
                    producer: newInputValue,
                  });
                  console.log(selectedFields);
                }}
                renderInput={(params) => (
                  <TextField {...params} label="تولیدکننده" />
                )}
              />

              <Autocomplete
                disablePortal
                id="combo-box-demo"
                sx={FormControlStyle}
                options={filteringFields.supplier}
                noOptionsText={"موردی یافت نشد"}
                inputValue={selectedFields.supplier}
                onInputChange={(event, newInputValue) => {
                  //  console.log(newInputValue);
                  // setInputValue(newInputValue);
                  fetchFilteringFields("supplier", newInputValue);
                  setSelectedFields({
                    ...selectedFields,
                    supplier: newInputValue,
                  });
                  console.log(selectedFields);
                }}
                renderInput={(params) => (
                  <TextField {...params} label="عرضه‌کننده" />
                )}
              />

              <Autocomplete
                disablePortal
                id="combo-box-demo"
                sx={FormControlStyle}
                options={filteringFields.alloy}
                value={selectedFields.alloy}
                noOptionsText={"موردی یافت نشد"}
                // onChange={(event, newValue) => {
                //   fetchFilteringFields("alloy", newValue);
                //   setSelectedFields({
                //     ...selectedFields,
                //     alloy: newValue,
                //   });
                // }}
                inputValue={selectedFields.alloy}
                onInputChange={(event, newInputValue) => {
                  //  console.log(newInputValue);
                  // setInputValue(newInputValue);
                  fetchFilteringFields("alloy", newInputValue);
                  setSelectedFields({
                    ...selectedFields,
                    alloy: newInputValue,
                  });
                }}
                renderInput={(params) => (
                  <TextField {...params} label="آلیاژ" />
                )}
              />

              <Autocomplete
                disablePortal
                id="combo-box-demo"
                sx={FormControlStyle}
                options={filteringFields.mode}
                noOptionsText={"موردی یافت نشد"}
                inputValue={selectedFields.mode}
                onInputChange={(event, newInputValue) => {
                  //  console.log(newInputValue);
                  // setInputValue(newInputValue);
                  fetchFilteringFields("mode", newInputValue);
                  setSelectedFields({
                    ...selectedFields,
                    mode: newInputValue,
                  });
                  console.log(selectedFields);
                }}
                renderInput={(params) => <TextField {...params} label="حالت" />}
              />

              <Autocomplete
                disablePortal
                id="combo-box-demo"
                sx={FormControlStyle}
                options={filteringFields.weight}
                noOptionsText={"موردی یافت نشد"}
                inputValue={selectedFields.weight}
                onInputChange={(event, newInputValue) => {
                  //  console.log(newInputValue);
                  // setInputValue(newInputValue);
                  fetchFilteringFields("weight", newInputValue);
                  setSelectedFields({
                    ...selectedFields,
                    weight: newInputValue,
                  });
                  console.log(selectedFields);
                }}
                renderInput={(params) => <TextField {...params} label="وزن" />}
              />

              <Autocomplete
                disablePortal
                id="combo-box-demo"
                sx={FormControlStyle}
                options={filteringFields.height}
                noOptionsText={"موردی یافت نشد"}
                inputValue={selectedFields.height}
                onInputChange={(event, newInputValue) => {
                  //  console.log(newInputValue);
                  // setInputValue(newInputValue);
                  fetchFilteringFields("height", newInputValue);
                  setSelectedFields({
                    ...selectedFields,
                    height: newInputValue,
                  });
                  console.log(selectedFields);
                }}
                renderInput={(params) => (
                  <TextField {...params} label="ارتفاع" />
                )}
              />

              <Autocomplete
                disablePortal
                id="combo-box-demo"
                sx={FormControlStyle}
                options={filteringFields.length}
                noOptionsText={"موردی یافت نشد"}
                inputValue={selectedFields.length}
                onInputChange={(event, newInputValue) => {
                  //  console.log(newInputValue);
                  // setInputValue(newInputValue);
                  fetchFilteringFields("length", newInputValue);
                  setSelectedFields({
                    ...selectedFields,
                    length: newInputValue,
                  });
                  console.log(selectedFields);
                }}
                renderInput={(params) => <TextField {...params} label="طول" />}
              />

              <Autocomplete
                disablePortal
                id="combo-box-demo"
                sx={FormControlStyle}
                options={filteringFields.width}
                noOptionsText={"موردی یافت نشد"}
                inputValue={selectedFields.width}
                onInputChange={(event, newInputValue) => {
                  //  console.log(newInputValue);
                  // setInputValue(newInputValue);
                  fetchFilteringFields("width", newInputValue);
                  setSelectedFields({
                    ...selectedFields,
                    width: newInputValue,
                  });
                  console.log(selectedFields);
                }}
                renderInput={(params) => <TextField {...params} label="عرض" />}
              />
            </Box>
          </Box> */}
      </Stack>

      {
        // <Stack justifyContent="center" py="40px" direction="row" ml="260px">
        //   <Pagination
        //     dir="rtl"
        //     sx={{ color: "blue" }}
        //     count={10}
        //     page={currentPage}
        //     onChange={handlePageChange}
        //     renderItem={(item) => (
        //       <PaginationItem
        //         slots={{ next: ArrowBackIcon, previous: ArrowForwardIcon }}
        //         page={PN.convertEnToPe(item.page)}
        //         {...item}
        //       />
        //     )}
        //   />
        // </Stack>
      }
      <Stack
        justifyContent="center"
        py="40px"
        direction="row"
        ml={{ xs: "0", md: "260px" }}
      >
        {numOfPages === 1 ? null : (
          <PaginationCustom
            postsPerPage={postsPerPage}
            numOfPages={numOfPages}
            currentPage={currentPage}
            handlePageChange={handlePageChange}
          />
        )}
      </Stack>

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
