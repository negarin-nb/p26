import React, { useState, useEffect } from "react";
import {
  Box,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Typography,
} from "@mui/material";

import ListProducts from "../components/listProducts";
import productsApi from "../api/products";

export default function FilterProduct({
  categories,
  subCategories,
  onCategory,
  onSubCategory,
}) {
  const [products, setProducts] = useState();
  const [ads, setAds] = useState([]);

  //const [categories, setCategories] = useState([]);
  const [category, setCategory] = useState("");

  //const [subCategories, setSubCategories] = useState([]);
  const [subCategory, setSubCategory] = useState("");

  const [supplier, setSupplier] = useState("");
  const [producer, setProducer] = useState("");

  //   const fetchCategories = async () => {
  //     const response = await productsApi.getCategories();
  //     setCategories(response.data.ListItems);
  //   };

  //   const fetchSubCategories = async (id) => {
  //     const response = await productsApi.getSubCategories(id);
  //     setSubCategories(response.data.ListItems);
  //   };

  //   const handleSubCategorySelect = async (id) => {
  //     console.log(id);
  //     const _products = [...products];
  //     const _ads = _products.filter((product) => product.subCategory === id);
  //     setAds(_ads);
  //     // fetchSubCategories(id);
  //   };

  //   const handleCategorySelect = async (id) => {
  //     const _products = [...products];
  //     const _ads = _products.filter((product) => product.category === id);
  //     setAds(_ads);
  //     fetchSubCategories(id);
  //   };

  //   useEffect(() => {
  //     console.log(ads);
  //     //  setProducts(ads);
  //     if (categoryId) {
  //       console.log("categoryId");
  //       console.log(categoryId);
  //       fetchSubCategories(categoryId);
  //     } else fetchCategories();
  //   }, []);

  const FormControlStyle = {
    backgroundColor: "custom.main",
    borderRadius: "5px",
    marginBottom: "8px",
  };
  return (
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
          {!!categories[0] && (
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
                      onCategory(category.id);
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
          )}

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
                    onSubCategory(subCategory.id);
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
  );
}
