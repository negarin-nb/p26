import React, { useState } from "react";
import { Box, Stack, Toolbar, Typography } from "@mui/material";
import { Link, NavLink, useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../contex/authContext";
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

  const [mobileOpen, setMobileOpen] = useState(false);
  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  let { pathname } = useLocation();

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
        spacing={{ xs: "0px", sm: "10px", md: "30px", lg: "40px" }}
        justifyContent={pathname === "/" ? "flex-start" : "center"}
        sx={{
          flex: 2,
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
      {pathname === "/" ? null : (
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
      )}

      {/* mobile */}
      <Stack
        direction="row"
        sx={{
          flex: 1,
          justifyContent: "flex-end",
          alignItems: "center",
          display: { xs: "flex", md: "none" },
        }}
      >
        {pathname === "/" ? null : (
          <Link to={"/"}>
            <img
              style={{ width: "90px", height: "37px" }}
              src={require("../assets/images/Logo601.png")}
            />
          </Link>
        )}
        <IconButton
          size="large"
          edge="start"
          color="primary"
          aria-label="open-drawer"
          onClick={handleDrawerToggle}
          sx={{ mr: "2px" }}
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
