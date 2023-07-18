import React from "react";
import { Typography, ButtonBase } from "@mui/material";

export default function HomeButton({ svgIcon, title, onClick }) {
  return (
    <ButtonBase
      onClick={onClick}
      sx={{
        "&:hover": {
          "& .Button-title, .svg": {
            color: "secondary.main",
          },
        },
      }}
    >
      {svgIcon()}
      <Typography
        className="Button-title"
        variant="h5"
        component="h2"
        marginTop={"90px"}
        sx={{ transition: "0.3s", position: "absolute" }}
      >
        {title}
      </Typography>
    </ButtonBase>
  );
}
