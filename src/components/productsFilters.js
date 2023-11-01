import React, { useState, useEffect } from "react";
import {
  Box,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Typography,
  Autocomplete,
  TextField,
} from "@mui/material";
import productsApi from "../api/products";

export default function ProductsFilters({
  selectedFields,
  setSelectedFields,
  categoryPage,
  fetchFilterResult,
}) {
  const [filteringFields, setFilteringFields] = useState({
    categories: [{}],
    subCategories: [{ title: "نوع محصول را انتخاب کنید" }],
    alloy: [""],
    producer: [""],
    supplier: [""],
    mode: [""],
    size: [""],
    color: [""],
    weight: [""],
    height: [""],
    width: [""],
    length: [""],
  });

  const [inputFields, setInputFields] = useState({
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
  const fetchCategories = async () => {
    const response = await productsApi.getCategories();
    setFilteringFields({
      ...filteringFields,
      categories: [...response.data.ListItems],
    });
    // console.log("fetchCategories");
    // console.log(response);
    //setCategories(response.data.ListItems);
  };

  const fetchSubCategories = async (id) => {
    const response = await productsApi.getSubCategories(id);
    setFilteringFields({
      ...filteringFields,
      subCategories: [...response.data.ListItems],
    });
    // console.log("fetchSubCategories");
    // console.log(response);
    //setSubCategories(response.data.ListItems);
  };

  useEffect(() => {
    if (categoryPage.is) {
      console.log("useeffect to fetch category");
      console.log(categoryPage.catId);
      fetchSubCategories(categoryPage.catId);
    } else fetchCategories();
  }, []);

  useEffect(() => {
    if (categoryPage.is) {
      console.log("useeffect to fetch subcategory");
      console.log(categoryPage.catId);
      fetchSubCategories(categoryPage.catId);
    } else fetchCategories();
  }, [categoryPage.catId]);

  const FormControlStyle = {
    backgroundColor: "custom.main",
    borderRadius: "5px",
    marginBottom: "8px",
  };
  return (
    <div style={{ width: "100%" }}>
      <Box
        sx={{
          marginX: { xs: "20px", md: "0" },
          marginBottom: { xs: "20px", md: "0" },
          mr: { md: "30px" },
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
          <Typography variant="h6" sx={{ pb: "20px" }}>
            فیلتر گذاری
          </Typography>
          {!categoryPage.is && (
            <Autocomplete
              disablePortal
              id="combo-box-demo"
              sx={FormControlStyle}
              options={filteringFields.categories}
              getOptionLabel={(option) => {
                if (option.hasOwnProperty("title")) {
                  return option.title;
                }
                return option;
              }}
              noOptionsText={"موردی یافت نشد"}
              value={inputFields.category_id}
              onChange={(event, newValue) => {
                if (newValue === null) {
                  setSelectedFields({
                    ...selectedFields,
                    category_id: "",
                    subcategory_id: "",
                  });
                  setFilteringFields({
                    ...filteringFields,
                    // category_id: "",
                    subCategories: [],
                  });
                } else {
                  setSelectedFields({
                    ...selectedFields,
                    category_id: newValue.id,
                    subcategory_id: "",
                  });
                  fetchSubCategories(newValue.id);
                }
              }}
              inputValue={inputFields.category_id}
              onInputChange={(event, newInputValue) => {
                setInputFields({
                  ...inputFields,
                  category_id: newInputValue,
                  subcategory_id: "",
                });
              }}
              renderInput={(params) => (
                <TextField {...params} label="نوع محصول" />
              )}
            />
            // <FormControl fullWidth sx={FormControlStyle}>
            //   <InputLabel sx={{ color: "text.main" }} id="select-label">
            //     نوع محصول
            //   </InputLabel>
            //   <Select
            //     labelId="demo-simple-select-label"
            //     id="demo-simple-select"
            //     value={selectedFields.category}
            //     label="نوع محصول"
            //     onChange={(event) => {
            //       setSelectedFields({
            //         ...selectedFields,
            //         category_id: event.target.value.id,
            //         subcategory_id: "",
            //       });
            //       //setCategory(event.target.value);
            //     }}
            //   >
            //     {filteringFields.categories.map((category) => (
            //       <MenuItem
            //         onClick={() => {
            //           fetchSubCategories(category.id);
            //           //   setSelectedFields({
            //           //     ...selectedFields,
            //           //     category: category,
            //           //   });
            //         }}
            //         dir="rtl"
            //         value={category}
            //         key={category.id}
            //       >
            //         {category.title}
            //       </MenuItem>
            //     ))}
            //   </Select>
            // </FormControl>
          )}

          <Autocomplete
            disablePortal
            id="combo-box-demo"
            sx={FormControlStyle}
            options={filteringFields.subCategories}
            getOptionLabel={(option) => {
              if (option.hasOwnProperty("title")) {
                return option.title;
              }
              return option;
            }}
            noOptionsText={"نوع محصول را انتخاب کنید"}
            value={inputFields.subcategory_id}
            onChange={(event, newValue) => {
              if (newValue === null) {
                setSelectedFields({
                  ...selectedFields,
                  // category_id: "",
                  subcategory_id: "",
                });
              } else {
                setSelectedFields({
                  ...selectedFields,
                  // category_id: newValue.id,
                  subcategory_id: newValue.id,
                });
              }
              // fetchSubCategories(newValue.id);
            }}
            inputValue={inputFields.subcategory_id}
            onInputChange={(event, newInputValue) => {
              setInputFields({
                ...inputFields,
                // category_id: newInputValue,
                subcategory_id: newInputValue,
              });
            }}
            renderInput={(params) => (
              <TextField {...params} label="دسته‌بندی" />
            )}
          />

          {/* <FormControl fullWidth sx={FormControlStyle}>
            <InputLabel sx={{ color: "text.main" }} id="select-label">
              دسته‌بندی
            </InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={selectedFields.subCategory}
              label="دسته‌بندی"
              onChange={(event) => {
                setSelectedFields({
                  ...selectedFields,
                  subcategory_id: event.target.value.id,
                });
              }}
            >
              {filteringFields.subCategories.map((subCategory) => (
                <MenuItem
                  onClick={() => {}}
                  dir="rtl"
                  value={subCategory}
                  key={subCategory.id}
                >
                  {subCategory.title}
                </MenuItem>
              ))}
            </Select>
          </FormControl> */}

          <Autocomplete
            disablePortal
            id="combo-box-demo"
            sx={FormControlStyle}
            onOpen={() => {
              fetchFilteringFields("producer", "");
            }}
            options={filteringFields.producer}
            noOptionsText={"موردی یافت نشد"}
            value={selectedFields.producer}
            onChange={(event, newValue) => {
              setSelectedFields({
                ...selectedFields,
                producer: newValue,
              });
              console.log("onChange");
              //
            }}
            inputValue={inputFields.producer}
            onInputChange={(event, newInputValue) => {
              fetchFilteringFields("producer", newInputValue);
              setInputFields({
                ...inputFields,
                producer: newInputValue,
              });
            }}
            renderInput={(params) => (
              <TextField {...params} label="تولیدکننده" />
            )}
          />

          <Autocomplete
            disablePortal
            id="combo-box-demo"
            sx={FormControlStyle}
            onOpen={() => {
              fetchFilteringFields("supplier", "");
            }}
            options={filteringFields.supplier}
            noOptionsText={"موردی یافت نشد"}
            value={selectedFields.supplier}
            onChange={(event, newValue) => {
              setSelectedFields({
                ...selectedFields,
                supplier: newValue,
              });
              //
            }}
            inputValue={inputFields.supplier}
            onInputChange={(event, newInputValue) => {
              //  console.log(newInputValue);
              // setInputValue(newInputValue);
              fetchFilteringFields("supplier", newInputValue);
              setInputFields({
                ...inputFields,
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
            onOpen={() => {
              fetchFilteringFields("alloy", "");
            }}
            options={filteringFields.alloy}
            noOptionsText={"موردی یافت نشد"}
            value={selectedFields.alloy}
            onChange={(event, newValue) => {
              setSelectedFields({
                ...selectedFields,
                alloy: newValue,
              });
            }}
            inputValue={inputFields.alloy}
            onInputChange={(event, newInputValue) => {
              fetchFilteringFields("alloy", newInputValue);
              setInputFields({
                ...inputFields,
                alloy: newInputValue,
              });
            }}
            renderInput={(params) => <TextField {...params} label="آلیاژ" />}
          />

          <Autocomplete
            disablePortal
            id="combo-box-demo"
            sx={FormControlStyle}
            onOpen={() => {
              fetchFilteringFields("mode", "");
            }}
            options={filteringFields.mode}
            noOptionsText={"موردی یافت نشد"}
            value={selectedFields.mode}
            onChange={(event, newValue) => {
              setSelectedFields({
                ...selectedFields,
                mode: newValue,
              });
              //
            }}
            inputValue={inputFields.mode}
            onInputChange={(event, newInputValue) => {
              fetchFilteringFields("mode", newInputValue);
              setInputFields({
                ...inputFields,
                mode: newInputValue,
              });
            }}
            renderInput={(params) => <TextField {...params} label="حالت" />}
          />

          <Autocomplete
            disablePortal
            id="combo-box-demo"
            sx={FormControlStyle}
            onOpen={() => {
              fetchFilteringFields("weight", "");
            }}
            options={filteringFields.weight}
            noOptionsText={"موردی یافت نشد"}
            value={selectedFields.weight}
            onChange={(event, newValue) => {
              setSelectedFields({
                ...selectedFields,
                weight: newValue,
              });
            }}
            inputValue={inputFields.weight}
            onInputChange={(event, newInputValue) => {
              fetchFilteringFields("weight", newInputValue);
              setInputFields({
                ...inputFields,
                weight: newInputValue,
              });
            }}
            renderInput={(params) => <TextField {...params} label="وزن" />}
          />

          <Autocomplete
            disablePortal
            id="combo-box-demo"
            sx={FormControlStyle}
            onOpen={() => {
              fetchFilteringFields("height", "");
            }}
            options={filteringFields.height}
            noOptionsText={"موردی یافت نشد"}
            value={selectedFields.height}
            onChange={(event, newValue) => {
              setSelectedFields({
                ...selectedFields,
                height: newValue,
              });
            }}
            inputValue={inputFields.height}
            onInputChange={(event, newInputValue) => {
              fetchFilteringFields("height", newInputValue);
              setInputFields({
                ...inputFields,
                height: newInputValue,
              });
              console.log(selectedFields);
            }}
            renderInput={(params) => <TextField {...params} label="ارتفاع" />}
          />

          <Autocomplete
            disablePortal
            id="combo-box-demo"
            sx={FormControlStyle}
            onOpen={() => {
              fetchFilteringFields("length", "");
            }}
            options={filteringFields.length}
            noOptionsText={"موردی یافت نشد"}
            value={selectedFields.length}
            onChange={(event, newValue) => {
              setSelectedFields({
                ...selectedFields,
                length: newValue,
              });
            }}
            inputValue={inputFields.length}
            onInputChange={(event, newInputValue) => {
              fetchFilteringFields("length", newInputValue);
              setInputFields({
                ...inputFields,
                length: newInputValue,
              });
              console.log(inputFields);
            }}
            renderInput={(params) => <TextField {...params} label="طول" />}
          />

          <Autocomplete
            disablePortal
            id="combo-box-demo"
            sx={FormControlStyle}
            onOpen={() => {
              fetchFilteringFields("width", "");
            }}
            options={filteringFields.width}
            noOptionsText={"موردی یافت نشد"}
            value={selectedFields.width}
            onChange={(event, newValue) => {
              setSelectedFields({
                ...selectedFields,
                width: newValue,
              });
            }}
            inputValue={inputFields.width}
            onInputChange={(event, newInputValue) => {
              //  console.log(newInputValue);
              // setInputValue(newInputValue);
              fetchFilteringFields("width", newInputValue);
              setInputFields({
                ...inputFields,
                width: newInputValue,
              });
              console.log(inputFields);
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
  );
}
