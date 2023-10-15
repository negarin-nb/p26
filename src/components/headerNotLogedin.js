import { Box, Button, Stack, Toolbar, Typography } from "@mui/material";
import React, { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";

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
};

export default function HeaderNotLogedin() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const drawerWidth = 240;
  const menuItems = [
    { text: "خانه", link: "/" },
    { text: "محصولات", link: "/products" },
    { text: "قیمت آنلاین", link: "/price" },
    { text: "درباره ما", link: "/about" },
    { text: "تماس با ما", link: "/contact" },
  ];

  const drawer = (
    <div>
      <Toolbar />

      <List>
        {menuItems.map((menuItem, index) => (
          <ListItem key={menuItem.text} disablePadding>
            <ListItemButton component={Link} to={menuItem.link}>
              <ListItemText
                primaryTypographyProps={{
                  color: "primary.main",
                  fontWeight: "500",
                }}
                primary={menuItem.text}
              />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </div>
  );
  //const theme = useTheme();
  //const isMobile = useMediaQuery(theme.breakPoints.down("xs"))
  return (
    <Stack direction="row" sx={{ pt: "20px" }}>
      <Stack direction="row" spacing={0} sx={{ flex: 1 }}>
        <Button
          sx={ButtonStyle}
          variant="outlined"
          component={Link}
          to="/register"
        >
          عضویت
        </Button>
        <Button sx={ButtonStyle} component={Link} to="/login">
          ورود
        </Button>
      </Stack>

      <Stack
        direction="row"
        dir="rtl"
        spacing={{ xs: "0px", sm: "30px", md: "30px", lg: "40px" }}
        sx={{
          flex: 2,
          justifyContent: "center",
          alignItems: "center",
          display: { xs: "none", md: "flex" },
        }}
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

      {/* desktop */}
      <Stack
        to={"/"}
        component={Link}
        direction="row"
        sx={{
          flex: 1,
          justifyContent: "flex-end",
          display: { xs: "none", md: "flex" },
        }}
      >
        <img
          style={{ width: "100%", maxWidth: "120px" }}
          src={require("../assets/images/Logo601.png")}
        />
      </Stack>

      {/* mobile */}
      <Stack
        direction="row"
        sx={{
          flex: 1,
          justifyContent: "flex-end",
          display: { xs: "flex", md: "none" },
        }}
      >
        <IconButton
          size="large"
          edge="start"
          color="primary"
          aria-label="open-drawer"
          onClick={handleDrawerToggle}
          sx={{ mr: 2 }}
        >
          <MenuIcon />
        </IconButton>
      </Stack>

      <Box component="nav">
        <Drawer
          anchor="left"
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
          SlideProps={{ direction: "left" }}
          sx={{
            display: { xs: "block", md: "none" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: drawerWidth,
            },
          }}
        >
          {drawer}
        </Drawer>
      </Box>
    </Stack>
  );
}
