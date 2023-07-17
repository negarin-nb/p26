import React, { useState, useEffect } from "react";
import {
  TextField,
  Button,
  Paper,
  Typography,
  Stack,
  Grid,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
} from "@mui/material";
import subscrptionApi from "../api/subscrption";
import productsApi from "../api/products";
import TextareaAutosize from "@mui/base/TextareaAutosize";

export default function AdInsert() {
  const [productList, setProductList] = useState([{}]);
  const [subCategories, setSubCategories] = useState([]);

  const [productData, setProductData] = useState({
    title: "",
    category: "",
    category_id: 0,
    subCategory: "",
    alloy: "",
    color: "",
    unit: "",
    mode: "",
    size: "",
    thickness: "",
    width: "",
    length: "",
    height: "",
    standard: "",
    weight: "",
    price: null,
    supplier: "",
    delivery: "",
    producer: "",
    link: "",
    tel: "",
    description: "",
  });

  const fetchCategories = async () => {
    const response = await productsApi.getCategories();
    setProductList(response.data.ListItems);
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  const handleCategorySelect = async (id) => {
    const response = await productsApi.getSubCategories(id);
    setSubCategories(response.data.ListItems);
  };

  const handleAdSubmit = async (productData) => {
    console.log(productData);
    const response = await productsApi.createProduct(productData);
    console.log(response.data);
  };

  const titleStyle = {
    marginBlock: "20px",
    textAlign: "left",
  };

  const inputStyle = {
    justifyContent: "flex-start",
    "& .MuiFormControl-root": {
      paddingBottom: "12px",
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
      <form>
        <Typography sx={titleStyle} variant="h3">
          درج آگهی
        </Typography>

        <Grid sx={inputStyle} dir="rtl" container spacing={2}>
          <Grid container item xs={6} direction="column">
            <TextField
              value={productData.title}
              onChange={(event) => {
                setProductData({
                  ...productData,
                  title: event.target.value,
                });
                console.log(productData);
              }}
              fullWidth
              label="عنوان"
              variant="outlined"
            />
            <FormControl fullWidth>
              <InputLabel sx={{ color: "text.main" }} id="select-label">
                محصول
              </InputLabel>
              <Select
                sx={{ textAlign: "left" }}
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                label="محصول"
                value={productData.category}
                onChange={(event) => {
                  setProductData({
                    ...productData,
                    category: event.target.value,
                    category_id: event.target.value.id,
                  });
                }}
              >
                {productList.map((product) => (
                  <MenuItem
                    onClick={() => {
                      handleCategorySelect(product.id);
                    }}
                    dir="rtl"
                    value={product}
                    key={product.id}
                  >
                    {product.title}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>

            <TextField
              value={productData.mode}
              onChange={(event) => {
                setProductData({
                  ...productData,
                  mode: event.target.value,
                });
                console.log(productData);
              }}
              fullWidth
              label="حالت"
              variant="outlined"
            />
            <TextField
              value={productData.alloy}
              onChange={(event) => {
                setProductData({
                  ...productData,
                  alloy: event.target.value,
                });
              }}
              fullWidth
              label="آلیاژ"
              variant="outlined"
            />
            <TextField
              value={productData.color}
              onChange={(event) => {
                setProductData({
                  ...productData,
                  color: event.target.value,
                });
              }}
              fullWidth
              label="رنگ"
              variant="outlined"
            />
            <TextField
              value={productData.delivery}
              onChange={(event) => {
                setProductData({
                  ...productData,
                  delivery: event.target.value,
                });
              }}
              fullWidth
              label="محل تحویل"
              variant="outlined"
            />
            <TextField
              value={productData.standard}
              onChange={(event) => {
                setProductData({
                  ...productData,
                  standard: event.target.value,
                });
              }}
              fullWidth
              label="استاندارد"
              variant="outlined"
            />
            <TextField
              value={productData.unit}
              onChange={(event) => {
                setProductData({
                  ...productData,
                  unit: event.target.value,
                });
              }}
              fullWidth
              label="واحد"
              variant="outlined"
            />

            <TextField
              value={productData.producer}
              onChange={(event) => {
                setProductData({
                  ...productData,
                  producer: event.target.value,
                });
              }}
              fullWidth
              label="تولیدکننده"
              variant="outlined"
            />

            <TextField
              value={productData.link}
              onChange={(event) => {
                setProductData({
                  ...productData,
                  link: event.target.value,
                });
              }}
              fullWidth
              label="لینک محصول"
              variant="outlined"
            />
          </Grid>

          <Grid container item xs={6} direction="column">
            <TextField
              value={productData.price}
              onChange={(event) => {
                setProductData({
                  ...productData,
                  price: event.target.value,
                });
              }}
              fullWidth
              label="قیمت (تومان)"
              variant="outlined"
            />
            <FormControl fullWidth>
              <InputLabel sx={{ color: "text.main" }} id="select-label">
                دسته‌بندی
              </InputLabel>
              <Select
                sx={{ textAlign: "left" }}
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                label="دسته‌بندی"
                value={productData.subCategory}
                onChange={(event) => {
                  setProductData({
                    ...productData,
                    subCategory: event.target.value,
                  });
                }}
              >
                {subCategories.map((subCategory) => (
                  <MenuItem dir="rtl" value={subCategory} key={subCategory.id}>
                    {subCategory.title}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            <TextField
              value={productData.size}
              onChange={(event) => {
                setProductData({
                  ...productData,
                  size: event.target.value,
                });
              }}
              fullWidth
              label="سایز"
              variant="outlined"
            />
            <TextField
              value={productData.thickness}
              onChange={(event) => {
                setProductData({
                  ...productData,
                  thickness: event.target.value,
                });
              }}
              fullWidth
              label="ضخامت"
              variant="outlined"
            />
            <TextField
              value={productData.width}
              onChange={(event) => {
                setProductData({
                  ...productData,
                  width: event.target.value,
                });
              }}
              fullWidth
              label="عرض"
              variant="outlined"
            />
            <TextField
              value={productData.height}
              onChange={(event) => {
                setProductData({
                  ...productData,
                  height: event.target.value,
                });
              }}
              fullWidth
              label="ارتفاع"
              variant="outlined"
            />
            <TextField
              value={productData.length}
              onChange={(event) => {
                setProductData({
                  ...productData,
                  length: event.target.value,
                });
              }}
              fullWidth
              label="طول"
              variant="outlined"
            />
            <TextField
              value={productData.weight}
              onChange={(event) => {
                setProductData({
                  ...productData,
                  weight: event.target.value,
                });
              }}
              fullWidth
              label="وزن"
              variant="outlined"
            />

            <TextField
              value={productData.supplier}
              onChange={(event) => {
                setProductData({
                  ...productData,
                  supplier: event.target.value,
                });
              }}
              fullWidth
              label="عرضه کننده"
              variant="outlined"
            />
            <TextField
              value={productData.tel}
              onChange={(event) => {
                setProductData({
                  ...productData,
                  tel: event.target.value,
                });
                console.log(productData);
              }}
              fullWidth
              label="شماره تماس"
              variant="outlined"
            />
          </Grid>
        </Grid>
        <TextField
          value={productData.description}
          onChange={(event) => {
            setProductData({
              ...productData,
              description: event.target.value,
            });
            console.log(productData);
          }}
          fullWidth
          dir="rtl"
          label="توضیحات"
          variant="outlined"
          multiline
          minRows={4}
        />

        <Stack
          sx={{
            alignItems: "flex-end",
            my: "30px",
          }}
        >
          <Button
            type="submit"
            variant="contained"
            color="primary"
            size="large"
            onClick={() => handleAdSubmit(productData)}
          >
            ثبت
          </Button>
        </Stack>
      </form>
    </>
  );
}
