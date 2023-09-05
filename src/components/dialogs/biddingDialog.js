import React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import FormControl from "@mui/material/FormControl";
import TextField from "@mui/material/TextField";

export default function BiddingDialog({
  handleClose,
  open,
  price,
  handlePrice,
  handleSubmitBidding,
}) {
  return (
    <Dialog
      sx={{
        "& .MuiDialog-paper": { width: "30%", maxHeight: 435, padding: "30px" },
      }}
      dir="rtl"
      maxWidth="lg"
      open={open}
      onClose={handleClose}
    >
      <DialogTitle variant="h3">پیشنهاد قیمت</DialogTitle>
      <DialogContent>
        <DialogContentText>
          قیمت پیشنهادی مورد نظر خود را وارد نمایید.
        </DialogContentText>
        <Box
          noValidate
          component="form"
          sx={{
            display: "flex",
            flexDirection: "column",
            m: "auto",
          }}
        >
          <FormControl fullWidth sx={{ mt: 2 }}>
            {/* <InputLabel htmlFor="max-width">قیمت</InputLabel> */}
            <TextField
              fullWidth
              autoFocus
              value={price}
              onChange={(e) => handlePrice(e.target.value)}
              label="قیمت"
              inputProps={{
                name: "max-width",
                id: "max-width",
              }}
            />
          </FormControl>
        </Box>
      </DialogContent>
      <DialogActions sx={{ justifyContent: "center" }}>
        <Button variant="contained" onClick={handleSubmitBidding}>
          ثبت
        </Button>
        <Button variant="outlined" onClick={handleClose}>
          بستن
        </Button>
      </DialogActions>
    </Dialog>
  );
}
