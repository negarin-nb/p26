import React, { useState, useEffect } from "react";
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
  Typography,
} from "@mui/material";
import { Link } from "react-router-dom";
import productsApi from "../api/products";

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

  return (
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
          {ads.map((product, index) => (
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
                  sx={{
                    "&:hover": {
                      color: "secondary.main",
                    },
                  }}
                  variant="h5"
                  component={Link}
                  to={`/product-detail/${product.id}`}
                >
                  ثبت سفارش
                </Typography>
              </BodyTableCell>
            </StyldedTableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
