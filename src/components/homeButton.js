import React, { useEffect } from "react";
import { Typography, ButtonBase } from "@mui/material";
import { Link } from "react-router-dom";

export default function HomeButton({
  svgIcon,
  title,
  id,
  onClickResult,
  stateTitle,
}) {
  const homeButtonStyle = {
    "&:hover": {
      "& .Button-title, .svg": {
        color: "secondary.main",
      },
    },
  };
  const activeHomeButtonStyle = {
    "& .Button-title, .svg": {
      color: "secondary.main",
    },
  };
  return (
    <Link
      to={id === 0 ? "/products" : `/results/${id}`}
      state={{ type: "number", title: title }}
      onClick={() => onClickResult(id)}
    >
      <ButtonBase
        sx={stateTitle === title ? activeHomeButtonStyle : homeButtonStyle}
      >
        {svgIcon()}
        <Typography
          className="Button-title"
          variant="h5"
          component="h2"
          marginTop={{ md: "90px", xs: "80px" }}
          sx={{ transition: "0.3s", position: "absolute" }}
        >
          {title}
        </Typography>
      </ButtonBase>
    </Link>
  );
}
