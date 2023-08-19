import React, { useState, useEffect } from "react";
import { styled } from "@mui/material/styles";
import { getProducts } from "../api/products";
import productsApi from "../api/products";
import PN from "persian-number";
import {
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Stack,
  Typography,
  InputLabel,
  MenuItem,
  Select,
} from "@mui/material";
import ListProducts from "../components/listProducts";
import { Link } from "react-router-dom";
import profileApi from "../api/profile";

export default function Ads() {
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
  const titleStyle = {
    marginBlock: "20px",
    textAlign: "left",
  };
  const [products, setProducts] = useState([]);

  const fetchProducts = async () => {
    const response = await profileApi.getMyProducts();
    setProducts(response.data.ListItems);
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <>
      {/* <ListProducts ads={products} /> */}
      <Typography sx={titleStyle} variant="h3">
        آگهی‌ها
      </Typography>
      <Stack dir="rtl" direction="row">
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <StyledTableCell style={{ width: "5%" }}>ردیف</StyledTableCell>
                <StyledTableCell>نام</StyledTableCell>
                <StyledTableCell>عرضه‌کننده</StyledTableCell>
                <StyledTableCell>تولیدکننده</StyledTableCell>
                <StyledTableCell>قیمت</StyledTableCell>
                <StyledTableCell>تاریخ به روز رسانی</StyledTableCell>

                <StyledTableCell>ویرایش</StyledTableCell>
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
                  <BodyTableCell>{product.supplier}</BodyTableCell>
                  <BodyTableCell>{product.producer}</BodyTableCell>
                  <BodyTableCell>
                    {PN.convertEnToPe(product.price)}
                  </BodyTableCell>

                  <BodyTableCell></BodyTableCell>
                  <BodyTableCell
                    sx={{
                      "&:hover": {
                        color: "secondary.main",
                      },
                    }}
                  >
                    <Link to="/profile/edit-ad" state={product}>
                      ویرایش
                    </Link>
                  </BodyTableCell>
                </StyldedTableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Stack>
    </>
  );
}
