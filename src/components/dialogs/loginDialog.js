import React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";

export default function LoginDialog({ handleClose, open, handleSubmitLogin }) {
  return (
    <Dialog
      sx={{
        "& .MuiDialog-paper": { width: "20%", maxHeight: 435, padding: "20px" },
      }}
      dir="rtl"
      maxWidth="lg"
      open={open}
      onClose={handleClose}
    >
      <DialogTitle variant="h3">ورود به حساب کاربری</DialogTitle>
      <DialogContent>
        <DialogContentText>
          لطفا ابتدا به وارد حساب کاربری خود شوید.
        </DialogContentText>
      </DialogContent>
      <DialogActions sx={{ justifyContent: "center" }}>
        <Button variant="contained" onClick={handleSubmitLogin}>
          ورود
        </Button>
        <Button variant="outlined" onClick={handleClose}>
          بستن
        </Button>
      </DialogActions>
    </Dialog>
  );
}
