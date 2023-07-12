import React, { useState } from "react";
import { styled } from "@mui/material/styles";
import { getProducts } from "../api/products";
import PN from "persian-number";
import {
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Box,
  Stack,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Typography,
} from "@mui/material";
import { Link } from "react-router-dom";

export default function ListProducts({ ads }) {
  const StyledTableCell = styled(TableCell)(({ theme }) => ({
    backgroundColor: theme.palette.custom.main,
    color: theme.palette.primary.main,
    fontSize: "12px",
    fontWeight: 600,
    padding: "5px",
    textAlign: "center",
    borderStyle: "solid",
    borderWidth: "2px",
    borderColor: "white",
  }));
  const BodyTableCell = styled(TableCell)(({ theme }) => ({
    fontSize: "12px",
    color: theme.palette.primary.main,
    fontWeight: 600,
    textAlign: "center",
    padding: "10px",
    borderWidthBottom: "0.5px",
  }));
  const StyldedTableRow = styled(TableRow)(({ theme }) => ({
    "&:hover": {
      backgroundColor: theme.palette.custom.main,
    },
  }));

  const FormControlStyle = {
    backgroundColor: "custom.main",
    borderRadius: "5px",
    marginBottom: "8px",
  };

  const [products, setProducts] = useState(ads);

  const [location, setLocation] = useState("");
  const [size, setSize] = useState("");
  const [thickness, setThickness] = useState("");
  const [length, setLength] = useState("");
  const [supplier, setSupplier] = useState("");
  const [producer, setProducer] = useState("");

  const filterProducts = (filterName) => {
    products.filter((product) => product.filterName);
  };

  return (
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
                دسته‌بندی
              </InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={location}
                label="دسته‌بندی"
                onChange={(event) => {
                  setLocation(event.target.value);
                  filterProducts(location);
                }}
              >
                <MenuItem dir="rtl" value={10}>
                  کارخانه
                </MenuItem>
                <MenuItem dir="rtl" value={20}>
                  کارخانه 2
                </MenuItem>
              </Select>
            </FormControl>

            <FormControl fullWidth sx={FormControlStyle}>
              <InputLabel sx={{ color: "text.main" }} id="select-label2">
                سایز
              </InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={size}
                label="سایز"
                onChange={(event) => setSize(event.target.value)}
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
                ضخامت
              </InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={thickness}
                label="ضخامت"
                onChange={(event) => setThickness(event.target.value)}
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
                طول
              </InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={length}
                label="طول"
                onChange={(event) => setLength(event.target.value)}
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

      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <StyledTableCell style={{ width: "5%" }}>ردیف</StyledTableCell>
              <StyledTableCell>عنوان</StyledTableCell>
              <StyledTableCell>تولیدکننده</StyledTableCell>
              <StyledTableCell>عرضه‌کننده</StyledTableCell>
              {/* <StyledTableCell>طول</StyledTableCell>
              <StyledTableCell>سایز</StyledTableCell>
              <StyledTableCell>نوع</StyledTableCell> */}
              <StyledTableCell>قیمت</StyledTableCell>
              <StyledTableCell>تاریخ به‌روز رسانی</StyledTableCell>
              <StyledTableCell>خرید</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {products.map((product, index) => (
              <StyldedTableRow key={index}>
                <BodyTableCell>{PN.convertEnToPe(index + 1)}</BodyTableCell>
                <BodyTableCell
                  sx={{
                    "&:hover": {
                      color: "secondary.main",
                    },
                  }}
                >
                  {product.title}
                </BodyTableCell>
                <BodyTableCell>{product.producer}</BodyTableCell>
                <BodyTableCell>{product.supplier}</BodyTableCell>
                <BodyTableCell>{product.price}</BodyTableCell>
                <BodyTableCell>{product.updateDate}</BodyTableCell>
                <BodyTableCell>
                  <Typography
                    variant="h5"
                    component={Link}
                    to={"/product-detail"}
                  >
                    ثبت سفارش
                  </Typography>
                </BodyTableCell>
              </StyldedTableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Stack>
  );
}
