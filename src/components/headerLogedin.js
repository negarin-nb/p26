import { Box, Button, Stack, Toolbar, Typography } from "@mui/material";
import React from "react";
import { Link, NavLink } from "react-router-dom";

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
  "&:hover": {
    bgcolor: "white",
    color: "secondary.main",
  },
  paddingRight: "10px",
};

export default function HeaderLogedin() {
  //const theme = useTheme();
  //const isMobile = useMediaQuery(theme.breakPoints.down("xs"))
  return (
    <Stack direction="row" sx={{ pt: "20px" }}>
      <Stack direction="row" sx={{ flex: 1 }}>
        <Box sx={ButtonStyle}
        
        
        
        
        
        
        
        
        
        
        >
          <img
            style={{ height: "35px", width: "35px" }}
            src={require("../assets/images/search.png")}
          />
        </Box>
        <Box sx={ButtonStyle} component={Link} to="/profile">
          <img
            style={{ height: "35px", width: "35px" }}
            src={require("../assets/images/Profile.png")}
          />
        </Box>
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
