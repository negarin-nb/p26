import React, { useState } from "react";
import {
  TextField,
  Button,
  Paper,
  Typography,
  Stack,
  Snackbar,
  Alert,
} from "@mui/material";
import Header from "../components/header";
import { Link, useNavigate } from "react-router-dom";
import RegisterForm from "../components/registerForm";
import VerificationCode from "../components/verificationCode";
import PhoneNumberForm from "../components/phoneNumberForm";
import authApi from "../api/auth";
import { useAuth } from "../contex/authContext";

export default function Register() {
  const navigate = useNavigate();
  const authCtx = useAuth();
  const [handler, setHandler] = useState({
    phone: true,
    code: false,
    register: false,
  });
  const [phone, setPhone] = useState("");
  const [otp, setOtp] = useState("");
  const [register, setRegister] = useState({
    userName: "",
    email: "",
    password: "",
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

  const handlePhoneNumber = async () => {
    try {
      const response = await authApi.sendPhone(phone);
      if (response.data.IsSuccess) {
        setHandler({ phone: false, code: true, register: false });
        openAlert("success", "کد تایید ارسال شد");
      } else setMessage(response.data.Message);
    } catch (e) {
      openAlert("error", message);
    }
  };
  const handleVerificationCode = async () => {
    try {
      const response = await authApi.sendPhone(phone);
      if (response.data.IsSuccess) {
        setHandler({ phone: false, code: false, register: true });
        openAlert("success", "کد تایید معتبر است");
      } else setMessage(response.data.Message);
    } catch (e) {
      openAlert("error", message);
    }
  };

  const handleRegister = async () => {
    try {
      const response = await authApi.register({ phone, otp, register });
      if (response.data.IsSuccess) {
        setHandler({ phone: false, code: false, register: true });
        openAlert("success", "عضویت با موفقیت انجام شد.");
        authCtx.setUserToken(response.data.Item.access);

        localStorage.setItem(
          "token",
          JSON.stringify(response.data.Item.access)
        );
      } else {
        setMessage(response.data.Message);
        console.log(response.data.Message);
      }
      navigate("/");
    } catch (e) {
      openAlert("error", message);
    }
  };
  return (
    <>
      <Header />
      {handler.phone && (
        <PhoneNumberForm
          phone={phone}
          setPhone={setPhone}
          handlePhoneNumber={handlePhoneNumber}
        />
      )}
      {handler.code && (
        <VerificationCode
          phone={phone}
          otp={otp}
          setOtp={setOtp}
          handleVerificationCode={handleVerificationCode}
        />
      )}
      {handler.register && (
        <RegisterForm
          phone={phone}
          otp={otp}
          register={register}
          setRegister={setRegister}
          handleRegister={handleRegister}
        />
      )}
      <Snackbar open={open} autoHideDuration={4000} onClose={handleClose}>
        <Alert onClose={handleClose} severity={severity} sx={{ width: "100%" }}>
          {message}
        </Alert>
      </Snackbar>
      ;
    </>
  );
}
