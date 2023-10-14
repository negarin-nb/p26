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
  Snackbar,
  Alert,
  Autocomplete,
} from "@mui/material";
import subscrptionApi from "../api/subscrption";
import productsApi from "../api/products";
import profileApi from "../api/profile";

import TextareaAutosize from "@mui/base/TextareaAutosize";
import PN from "persian-number";

export default function AdInsert({ editData }) {
  const [productList, setProductList] = useState([{}]);
  const [subCategories, setSubCategories] = useState([]);

  const form = new FormData();
  const formdata = new FormData();

  const [productDataList, setProductDataList] = useState({
    alloy: [],
    producer: [],
    supplier: [],
    mode: [],
    color: [],
    unit: [],
    mode: [],
    size: [],
    thickness: [],
    length: [],
    height: [],
    weight: [],
    width: [],
    standard: [],
  });

  const [productData, setProductData] = useState({
    image: null,
    title: "",
    category: "",
    category_id: 0,
    subCategory: "",
    subCategory_id: 0,
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
    price: "",
    supplier: "",
    delivery: "",
    producer: "",
    link: "",
    tel: "",
    description: "",
  });

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

  const fetchProductDataLists = async (field, content) => {
    const response = await productsApi.autoComplete(field, content);

    switch (field) {
      case "alloy":
        setProductDataList({
          ...productDataList,
          alloy: [...response.data.ListItems],
        });
        console.log(productDataList);
        console.log("alloy");
        break;
      case "mode":
        setProductDataList({
          ...productDataList,
          mode: [...response.data.ListItems],
        });
        console.log(productDataList);
        console.log("mode");
        break;
      case "size":
        setProductDataList({
          ...productDataList,
          size: [...response.data.ListItems],
        });
        console.log(productDataList);
        console.log("size");
        break;
      case "unit":
        setProductDataList({
          ...productDataList,
          unit: [...response.data.ListItems],
        });
        console.log(productDataList);
        console.log("unit");
        break;
      case "color":
        setProductDataList({
          ...productDataList,
          color: [...response.data.ListItems],
        });
        break;
      case "producer":
        setProductDataList({
          ...productDataList,
          producer: [...response.data.ListItems],
        });
        console.log("producer");
        break;
      case "supplier":
        setProductDataList({
          ...productDataList,
          supplier: [...response.data.ListItems],
        });
        console.log("supplier");
        break;

      case "weight":
        setProductDataList({
          ...productDataList,
          weight: [...response.data.ListItems],
        });
        console.log("weight");
        break;
      case "height":
        setProductDataList({
          ...productDataList,
          height: [...response.data.ListItems],
        });
        console.log("height");
        break;
      case "length":
        setProductDataList({
          ...productDataList,
          length: [...response.data.ListItems],
        });
        console.log("length");
        break;
      case "width":
        setProductDataList({
          ...productDataList,
          width: [...response.data.ListItems],
        });
        console.log("width");
        break;
      case "thickness":
        setProductDataList({
          ...productDataList,
          thickness: [...response.data.ListItems],
        });
        console.log("thickness");
        break;
      case "standard":
        setProductDataList({
          ...productDataList,
          standard: [...response.data.ListItems],
        });
        console.log("standard");
        break;
    }
  };

  const fetchCategories = async () => {
    const response = await productsApi.getCategories();
    setProductList(response.data.ListItems);
  };

  useEffect(() => {
    if (editData) {
      console.log(editData);
      setProductData(editData);
      setProductData({
        ...editData,
        price: PN.convertEnToPe(editData.price),
      });
    }
    fetchCategories();
  }, []);

  const handleCategorySelect = async (id) => {
    const response = await productsApi.getSubCategories(id);
    setSubCategories(response.data.ListItems);
  };

  const handleAdSubmit = async () => {
    const formData = new FormData();
    formData.append("title", productData.title);
    formData.append("description", productData.description);
    formData.append("alloy", productData.alloy);
    formData.append("color", productData.color);
    formData.append("link", productData.link);
    formData.append("length", productData.length);
    formData.append("height", productData.height);
    formData.append("width", productData.width);
    formData.append("weight", productData.weight);
    formData.append("delivery", productData.delivery);
    formData.append("producer", productData.producer);
    formData.append("supplier", productData.supplier);
    let _price = PN.convertPeToEn(productData.price);
    formData.append("price", parseInt(_price, 10));
    formData.append("mode", productData.mode);
    formData.append("tel", productData.tel);
    formData.append("thickness", productData.thickness);
    formData.append("size", productData.size);
    formData.append("unit", productData.unit);
    formData.append("standard", productData.standard);
    formData.append("subcategory_id", productData.subCategory_id);
    formData.append("category_id", productData.category_id);
    formData.append("image", productData.image);

    // for (const value of formData.values()) {
    //   console.log(value);
    // }

    let response = "";
    console.log("editData");
    console.log(editData);

    try {
      if (!!editData) {
        formData.append("id", editData.id);
        console.log("formData");
        for (const value of formData.entries()) {
          console.log(value[0] + "-" + value[1]);
        }
        response = await profileApi.editMyProduct(formData);
        openAlert("success", "تغییرات با موفقیت ثبت شد.");
      } else {
        response = await productsApi.createProduct(formData);
        console.log(response.data);
        openAlert("success", "آگهی با موفقیت ثبت شد.");
        setProductData({
          image: null,
          title: "",
          category: "",
          category_id: 0,
          subCategory: "",
          subCategory_id: 0,
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
          price: "",
          supplier: "",
          delivery: "",
          producer: "",
          link: "",
          tel: "",
          description: "",
        });
      }
    } catch (error) {
      openAlert("error", "مشکلی پیش آمده است.");
      console.log(error);
    }
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
      fontSize: "15px",
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

  const imageSelectHandler = (event) => {
    console.log(event.target.files[0]);
  };

  return (
    <>
      <form>
        <Typography sx={titleStyle} variant="h3">
          {editData ? "ویرایش آگهی" : "درج آگهی"}
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
                value={productData.category.title}
                onChange={(event) => {
                  //  form.append("category", event.target.value);
                  formdata.append("category_id", event.target.value.id);
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

            <Autocomplete
              disablePortal
              freeSolo
              id="combo-box-demo"
              options={productDataList.mode}
              inputValue={productData.mode}
              onInputChange={(event, newInputValue) => {
                fetchProductDataLists("mode", newInputValue);
                setProductData({
                  ...productData,
                  mode: newInputValue,
                });
              }}
              renderInput={(params) => <TextField {...params} label="حالت" />}
            />
            <Autocomplete
              disablePortal
              freeSolo
              id="combo-box-demo"
              options={productDataList.size}
              inputValue={productData.size}
              onInputChange={(event, newInputValue) => {
                fetchProductDataLists("size", newInputValue);
                setProductData({
                  ...productData,
                  size: newInputValue,
                });
              }}
              renderInput={(params) => <TextField {...params} label="سایز" />}
            />
            <Autocomplete
              disablePortal
              freeSolo
              id="combo-box-demo"
              options={productDataList.color}
              inputValue={productData.color}
              onInputChange={(event, newInputValue) => {
                fetchProductDataLists("color", newInputValue);
                setProductData({
                  ...productData,
                  color: newInputValue,
                });
              }}
              renderInput={(params) => <TextField {...params} label="رنگ" />}
            />

            <Autocomplete
              disablePortal
              freeSolo
              id="combo-box-demo"
              options={productDataList.standard}
              inputValue={productData.standard}
              onInputChange={(event, newInputValue) => {
                fetchProductDataLists("standard", newInputValue);
                setProductData({
                  ...productData,
                  standard: newInputValue,
                });
              }}
              renderInput={(params) => (
                <TextField {...params} label="استاندارد" />
              )}
            />

            <Autocomplete
              disablePortal
              freeSolo
              id="combo-box-demo"
              options={productDataList.unit}
              inputValue={productData.unit}
              onInputChange={(event, newInputValue) => {
                fetchProductDataLists("unit", newInputValue);
                setProductData({
                  ...productData,
                  unit: newInputValue,
                });
              }}
              renderInput={(params) => <TextField {...params} label="واحد" />}
            />

            <TextField
              value={productData.delivery}
              onChange={(event) => {
                setProductData({
                  ...productData,
                  delivery: event.target.value,
                });
                formdata.append("delivery", event.target.value);
              }}
              fullWidth
              label="محل تحویل"
              variant="outlined"
            />

            <TextField
              value={productData.producer}
              onChange={(event) => {
                setProductData({
                  ...productData,
                  producer: event.target.value,
                });
                formdata.append("producer", event.target.value);
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
                formdata.append("link", event.target.value);
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
                  price: PN.convertEnToPe(event.target.value),
                });
                formdata.append("price", event.target.value);
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
                    subCategory_id: event.target.value.id,
                  });
                  formdata.append("subCategory_id", event.target.value.id);
                }}
              >
                {subCategories.map((subCategory) => (
                  <MenuItem dir="rtl" value={subCategory} key={subCategory.id}>
                    {subCategory.title}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            <Autocomplete
              disablePortal
              freeSolo
              id="combo-box-demo"
              options={productDataList.alloy}
              inputValue={productData.alloy}
              onInputChange={(event, newInputValue) => {
                fetchProductDataLists("alloy", newInputValue);
                setProductData({
                  ...productData,
                  alloy: newInputValue,
                });
              }}
              renderInput={(params) => <TextField {...params} label="آلیاژ" />}
            />
            <Autocomplete
              disablePortal
              freeSolo
              id="combo-box-demo"
              options={productDataList.thickness}
              inputValue={productData.thickness}
              onInputChange={(event, newInputValue) => {
                fetchProductDataLists("thickness", newInputValue);
                setProductData({
                  ...productData,
                  thickness: newInputValue,
                });
              }}
              renderInput={(params) => <TextField {...params} label="ضخامت" />}
            />
            <Autocomplete
              disablePortal
              freeSolo
              id="combo-box-demo"
              options={productDataList.width}
              inputValue={productData.width}
              onInputChange={(event, newInputValue) => {
                fetchProductDataLists("width", newInputValue);
                setProductData({
                  ...productData,
                  width: newInputValue,
                });
              }}
              renderInput={(params) => <TextField {...params} label="عرض" />}
            />

            <Autocomplete
              disablePortal
              freeSolo
              id="combo-box-demo"
              options={productDataList.height}
              inputValue={productData.height}
              onInputChange={(event, newInputValue) => {
                fetchProductDataLists("height", newInputValue);
                setProductData({
                  ...productData,
                  height: newInputValue,
                });
              }}
              renderInput={(params) => <TextField {...params} label="ارتفاع" />}
            />

            <Autocomplete
              disablePortal
              freeSolo
              id="combo-box-demo"
              options={productDataList.length}
              inputValue={productData.length}
              onInputChange={(event, newInputValue) => {
                fetchProductDataLists("length", newInputValue);
                setProductData({
                  ...productData,
                  length: newInputValue,
                });
              }}
              renderInput={(params) => <TextField {...params} label="طول" />}
            />

            <Autocomplete
              disablePortal
              freeSolo
              id="combo-box-demo"
              options={productDataList.weight}
              inputValue={productData.weight}
              onInputChange={(event, newInputValue) => {
                fetchProductDataLists("weight", newInputValue);
                setProductData({
                  ...productData,
                  weight: newInputValue,
                });
              }}
              renderInput={(params) => <TextField {...params} label="وزن" />}
            />

            <TextField
              value={productData.supplier}
              onChange={(event) => {
                setProductData({
                  ...productData,
                  supplier: event.target.value,
                });
                form.append("supplier", event.target.value);
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
                formdata.append("tel", event.target.value);
                console.log(productData);
              }}
              fullWidth
              label="شماره تماس"
              variant="outlined"
            />
          </Grid>
        </Grid>

        <Stack dir={"rtl"} mt="10px" mb="20px">
          <label
            style={{
              textAlign: "right",
              alignContent: "flex-start",
              justifyContent: "flex-start",
              // border: "1px solid #ccc",
              // borderRadius: "5px",
              // padding: "12px",
              cursor: "pointer",
            }}
          >
            {!productData.image && (
              <>
                <img
                  width={"50px"}
                  //borderRadius={"10px"}
                  style={{ opacity: "0.5" }}
                  src={require("../assets/images/uploadImage.png")}
                />
                <Typography sx={{ "&:hover": { color: "black" } }} mt="10px">
                  آپلود تصویر
                </Typography>
              </>
            )}
            <input
              style={{ display: "none" }}
              type="file"
              onChange={(event) => {
                setProductData({
                  ...productData,
                  image: event.target.files[0],
                });
              }}
            />
          </label>
          {productData.image && (
            <>
              <img
                width={"150px"}
                style={{ borderRadius: "5px" }}
                //borderRadius={"10px"}
                src={
                  editData
                    ? editData.image
                    : URL.createObjectURL(productData.image)
                }
              />
              <Typography
                sx={{
                  cursor: "pointer",
                  width: "100px",
                  "&:hover": { color: "black" },
                }}
                textAlign={"left"}
                onClick={() => {
                  setProductData({
                    ...productData,
                    image: null,
                  });
                }}
                mt="10px"
              >
                حذف تصویر
              </Typography>
            </>
          )}
        </Stack>

        <TextField
          value={productData.description}
          onChange={(event) => {
            setProductData({
              ...productData,
              description: event.target.value,
            });
            formdata.append("description", event.target.value);
            console.log(form);
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
            //   type="submit"
            variant="contained"
            color="primary"
            size="large"
            onClick={() => handleAdSubmit()}
          >
            {editData ? "ویرایش" : "ثبت"}
          </Button>
        </Stack>
      </form>
      <Snackbar open={open} autoHideDuration={4000} onClose={handleClose}>
        <Alert
          dir="rtl"
          onClose={handleClose}
          severity={severity}
          sx={{ width: "100%" }}
        >
          {message}
        </Alert>
      </Snackbar>
    </>
  );
}
