import { Box, Button, Stack, Toolbar, Typography } from "@mui/material";
import React from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../contex/authContext";

const TypographyStyle = {
  fontWeight: 600,

  textDecoration: "none",
  "&:hover": {
    color: "secondary.main",
  },
};
const ButtonStyle = {
  fontWeight: 600,
  fontSize: "14px",
  textDecoration: "none",
  bgcolor: "custom.main",
  "&:hover": {
    bgcolor: "custom.dark",
  },
  marginRight: "5px",
  my: "0px",
  p: "7px",
  borderRadius: "3px",
  justifyContent: "center",
  cursor: "pointer",
};

export default function HeaderLogedin() {
  const authCtx = useAuth();
  const navigate = useNavigate();
  //const theme = useTheme();
  //const isMobile = useMediaQuery(theme.breakPoints.down("xs"))
  return (
    <Stack direction="row" sx={{ pt: "20px" }}>
      <Stack direction="row" sx={{ flex: 1, my: "10px" }}>
        <Stack
          sx={ButtonStyle}
          onClick={() => {
            authCtx.logout();
            navigate("/");
          }}
        >
          <img
            style={{ width: "18px" }}
            src={require("../assets/images/Vector7.png")}
          />
        </Stack>
        <Stack
          sx={[ButtonStyle, { px: "11px" }]}
          component={Link}
          to="/profile"
        >
          <img
            style={{ height: "18px" }}
            src={require("../assets/icons/profile.png")}
          />
        </Stack>
      </Stack>

      <Stack
        direction="row"
        dir="rtl"
        spacing={{ xs: "0px", sm: "30px", md: "30px", lg: "40px" }}
        sx={{ flex: 2, justifyContent: "center", alignItems: "center" }}
      >
        <Typography
          sx={TypographyStyle}
          variant="h3"
          component={NavLink}
          to="/"
        >
          خانه
        </Typography>
        <Typography
          sx={TypographyStyle}
          variant="h3"
          component={NavLink}
          to="/products"
        >
          محصولات
        </Typography>
        <Typography
          sx={TypographyStyle}
          variant="h3"
          component={NavLink}
          to="/price"
        >
          قیمت آنلاین
        </Typography>
        <Typography
          sx={TypographyStyle}
          variant="h3"
          component={NavLink}
          to="/about"
        >
          درباره ما
        </Typography>
        <Typography
          sx={TypographyStyle}
          variant="h3"
          component={NavLink}
          to="/contact"
        >
          تماس با ما
        </Typography>
      </Stack>
      <Stack
        to={"/"}
        component={Link}
        direction="row"
        sx={{ flex: 1, justifyContent: "flex-end" }}
      >
        <img
          style={{ width: "100%", maxWidth: "120px" }}
          src={require("../assets/images/Logo601.png")}
        />
      </Stack>
    </Stack>
  );
}
