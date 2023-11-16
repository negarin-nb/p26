import React, { useState, useEffect } from "react";
import { styled } from "@mui/material/styles";
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
  Divider,
  Snackbar,
  Alert,
  IconButton,
} from "@mui/material";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { Link } from "react-router-dom";
import profileApi from "../api/profile";
import moment from "jalali-moment";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";

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
  const [deleteId, setDeleteId] = useState();

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

  const fetchProducts = async () => {
    const response = await profileApi.getMyProducts();
    setProducts(response.data.ListItems);
  };

  const deleteProduct = async (id) => {
    try {
      const response = await profileApi.deleteMyProduct(id);
      const _products = products.filter((product) => product.id !== id);
      setProducts(_products);
      handleCloseDelete();
      openAlert("success", "آگهی با موفقیت حذف شد.");
    } catch (error) {
      openAlert("error", "عملیات با خطا مواجه شده است.");
      console.log(error);
    }
  };

  const [openDelete, setOpenDelete] = useState(false);

  const handleClickOpenDelete = (id) => {
    setOpenDelete(true);
    setDeleteId(id);
  };

  const handleCloseDelete = () => {
    setOpenDelete(false);
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <>
      {/* <ListProducts ads={products} /> */}
      <Stack direction="row" justifyContent="flex-end" alignItems="center">
        <Typography sx={titleStyle} variant="h3">
          آگهی‌ها
        </Typography>
        <IconButton
          component={Link}
          to="/profile"
          color="primary"
          sx={{
            marginBlock: "10px",
            mr: "10px",
            display: { xs: "flex", md: "none" },
          }}
        >
          <ArrowForwardIcon fontSize="small" />
        </IconButton>
      </Stack>
      <Divider
        sx={{
          marginBottom: "20px",
          display: { xs: "flex", md: "none" },
        }}
      />

      <Stack dir="rtl" direction="row">
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <StyledTableCell style={{ width: "5%" }}>ردیف</StyledTableCell>
                <StyledTableCell>نام</StyledTableCell>
                <StyledTableCell
                  sx={{ display: { xs: "none", md: "table-cell" } }}
                >
                  عرضه‌کننده
                </StyledTableCell>
                <StyledTableCell
                  sx={{ display: { xs: "none", md: "table-cell" } }}
                >
                  تولیدکننده
                </StyledTableCell>
                <StyledTableCell>قیمت</StyledTableCell>
                <StyledTableCell
                  sx={{ display: { xs: "none", md: "table-cell" } }}
                >
                  تاریخ به روز رسانی
                </StyledTableCell>
                <StyledTableCell>مشاهده</StyledTableCell>
                <StyledTableCell>ویرایش</StyledTableCell>
                <StyledTableCell>حذف</StyledTableCell>
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
                  <BodyTableCell
                    sx={{ display: { xs: "none", md: "table-cell" } }}
                  >
                    {product.supplier}
                  </BodyTableCell>
                  <BodyTableCell
                    sx={{ display: { xs: "none", md: "table-cell" } }}
                  >
                    {product.producer}
                  </BodyTableCell>
                  <BodyTableCell>
                    {PN.convertEnToPe(product.price)}
                  </BodyTableCell>

                  <BodyTableCell
                    sx={{ display: { xs: "none", md: "table-cell" } }}
                  >
                    {PN.convertEnToPe(
                      moment(product.updated_at).format("YYYY/MM/DD")
                    )}
                  </BodyTableCell>
                  <BodyTableCell
                    sx={{
                      "&:hover": {
                        color: "secondary.main",
                      },
                    }}
                    to={`/product-detail/${product.id}`}
                    state={product}
                    component={Link}
                  >
                    مشاهده
                  </BodyTableCell>
                  <BodyTableCell
                    sx={{
                      "&:hover": {
                        color: "secondary.main",
                      },
                    }}
                    to="/profile/edit-ad"
                    state={product}
                    component={Link}
                  >
                    ویرایش
                  </BodyTableCell>
                  <BodyTableCell
                    sx={{
                      "&:hover": {
                        color: "secondary.main",
                        cursor: "pointer",
                      },
                    }}
                    onClick={() => handleClickOpenDelete(product.id)}
                  >
                    حذف
                  </BodyTableCell>
                </StyldedTableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        <Dialog
          sx={{
            "& .MuiDialog-paper": {
              width: "300px",
              maxHeight: 435,
              padding: "30px",
            },
          }}
          dir="rtl"
          open={openDelete}
          onClose={handleCloseDelete}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle variant="h3" id="alert-dialog-title">
            {"حذف آگهی"}
          </DialogTitle>
          <Divider />
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              آیا از حذف آگهی مورد نظر را مطمئن هستید؟
            </DialogContentText>
          </DialogContent>
          <DialogActions sx={{ justifyContent: "center" }}>
            <Button
              variant="outlined"
              onClick={() => {
                console.log(deleteId);
                deleteProduct(deleteId);
              }}
            >
              بله
            </Button>
            <Button variant="outlined" onClick={handleCloseDelete} autoFocus>
              خیر
            </Button>
          </DialogActions>
        </Dialog>

        <Snackbar
          dir="rtl"
          open={open}
          autoHideDuration={4000}
          onClose={handleClose}
        >
          <Alert
            onClose={handleClose}
            severity={severity}
            sx={{ width: "100%" }}
          >
            {message}
          </Alert>
        </Snackbar>
      </Stack>
    </>
  );
}
