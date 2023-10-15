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
  Autocomplete,
  TextField,
  Pagination,
  PaginationItem,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import SearchIcon from "@mui/icons-material/Search";
import Header from "../components/header";
import ListProducts from "../components/listProducts";
import productsApi from "../api/products";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import PN from "persian-number";
import PaginationCustom from "../components/pagination";

export default function Products() {
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [ads, setAds] = useState([]);

  const [categories, setCategories] = useState([]);
  const [category, setCategory] = useState("");

  const [subCategories, setSubCategories] = useState([]);
  const [subCategory, setSubCategory] = useState("");

  const [supplier, setSupplier] = useState("");
  const [producer, setProducer] = useState("");

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

  const [filteringFields, setFilteringFields] = useState({
    alloy: ["یک حرف وارد کنید."],
    producer: ["یک حرف وارد کنید."],
    supplier: ["یک حرف وارد کنید."],
    mode: ["یک حرف وارد کنید."],
    size: ["یک عدد وارد کنید."],
    color: ["یک حرف وارد کنید."],
    weight: ["یک عدد وارد کنید."],
    height: ["یک عدد وارد کنید."],
    width: ["یک عدد وارد کنید."],
    length: ["یک عدد وارد کنید."],
  });

  const [selectedFields, setSelectedFields] = useState({
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
  const options = ["The Godfather", "Pulp Fiction"];

  const fetchFilteringFields = async (field, content) => {
    const response = await productsApi.autoComplete(field, content);

    switch (field) {
      case "alloy":
        let _filteringFields = {
          ...filteringFields,
          alloy: [...response.data.ListItems],
        };
        setFilteringFields(_filteringFields);
        //console.log(filteringFields);
        console.log("alloy");
        break;
      case "producer":
        setFilteringFields({
          ...filteringFields,
          producer: [...response.data.ListItems],
        });
        console.log("producer");
        break;
      case "supplier":
        setFilteringFields({
          ...filteringFields,
          supplier: [...response.data.ListItems],
        });
        console.log("supplier");
        break;
      case "mode":
        setFilteringFields({
          ...filteringFields,
          mode: [...response.data.ListItems],
        });
        console.log("mode");
        break;
      case "size":
        setFilteringFields({
          ...filteringFields,
          size: [...response.data.ListItems],
        });
        console.log("size");
        break;
      case "color":
        setFilteringFields({
          ...filteringFields,
          color: [...response.data.ListItems],
        });
        console.log("color");
        break;
      case "weight":
        setFilteringFields({
          ...filteringFields,
          weight: [...response.data.ListItems],
        });
        console.log("weight");
        break;
      case "height":
        setFilteringFields({
          ...filteringFields,
          height: [...response.data.ListItems],
        });
        console.log("height");
        break;
      case "width":
        setFilteringFields({
          ...filteringFields,
          width: [...response.data.ListItems],
        });
        console.log("width");
        break;
      case "length":
        setFilteringFields({
          ...filteringFields,
          length: [...response.data.ListItems],
        });
        console.log("length");
        break;
    }
  };

  const fetchProducts = async () => {
    const response = await productsApi.getProducts(currentPage, postsPerPage);
    //const response = await productsApi.getProducts(currentPage,postsPerPage);
    const _products = JSON.parse(JSON.stringify(response.data.ListItems));
    // arrangePage(_products);
    setNumOfPages(response.data.Item["number of pages"]);
    setProducts(response.data.ListItems);
    setAds(response.data.ListItems);
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

  // const arrangePage = (products) => {
  //   const indexOfLastPost = currentPage * postsPerPage;
  //   const indexOfFirstPost = indexOfLastPost - postsPerPage;
  //   const currentProducts = products.slice(indexOfFirstPost, indexOfLastPost);
  //   setAds(currentProducts);
  // };

  useEffect(() => {
    fetchProducts(currentPage, postsPerPage);
    fetchCategories();
  }, []);

  useEffect(() => {
    fetchProducts(currentPage, postsPerPage);
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

              {/* <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={selectedFields.alloy}
                  label="آلیاژ"
                  onChange={(event) =>
                    setSelectedFields({
                      ...selectedFields,
                      alloy: event.target.value,
                    })
                  }
                >
                  <TextField
                    inputProps={{
                      "aria-label": "search",
                      style: { textAlign: "right" },
                    }}
                    sx={{ mx: 1, flex: 1 }}
                    placeholder="جستجو"
                    // value={searchInput}
                    onChange={(e) => {
                      fetchFilteringFields("alloy", e.target.value);
                    }}
                    //  onKeyDown={(e) => handleSubmitEnter(e)}
                  />
                </Select> */}
            </Box>
          </Box>
        </div>

        <ListProducts
          ads={ads}
          postsPerPage={postsPerPage}
          currentPage={currentPage}
        />
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
      <Stack justifyContent="center" py="40px" direction="row" ml="260px">
        <PaginationCustom
          postsPerPage={postsPerPage}
          numOfPages={numOfPages}
          currentPage={currentPage}
          handlePageChange={handlePageChange}
        />
      </Stack>
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
