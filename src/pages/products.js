import React, { useState } from "react";
import {
  IconButton,
  InputBase,
  Paper,
  Stack,
  Divider,
  Grid,
  Tab,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import Header from "../components/header";
import { getAds } from "../api/ads";
import AdCard from "../components/adCard";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import ListView from "../assets/svgIcons/listView";
import GridView from "../assets/svgIcons/gridView";
import { styled } from "@mui/material/styles";
import ListProducts from "../components/listProducts";

export default function Products() {
  const [ads, setAds] = useState(getAds());
  const [value, setValue] = React.useState("1");

  const StyledTab = styled((props) => <Tab disableRipple {...props} />)(
    ({ theme }) => ({
      minWidth: 0,
      [theme.breakpoints.up("sm")]: {
        minWidth: 0,
      },

      padding: "5px",
      opacity: 0.3,
      transition: "0.3s",
      "&:hover": {
        opacity: 0.7,
        transition: "0.3s",
      },
      "&.Mui-selected": {
        opacity: 0.7,
        color: "transparent",
      },
      "&.Mui-focusVisible": {
        backgroundColor: "#d1eaff",
      },
    })
  );

  const svgIconStyle = {
    //color: "primary.main",
    //transition: "0.3s",
    fontSize: 16,
  };
  const TabPanelStyle = {
    padding: 0,
    paddingTop: "20px",
  };

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <div className="App">
      <Header />
      <Stack sx={{ justifyContent: "center", alignItems: "center" }}>
        <Paper
          component="form"
          elevation={3}
          sx={{
            p: "5px",
            display: "flex",
            alignItems: "center",
            width: { xs: 300, sm: 450, md: 500, lg: 630 },
            my: "50px",
          }}
        >
          <IconButton type="button" sx={{ p: "2px" }} aria-label="search">
            <SearchIcon sx={{ fontSize: { xs: 20, md: 25, lg: 30 } }} />
          </IconButton>
          <InputBase
            inputProps={{
              "aria-label": "search",
              style: { textAlign: "right" },
            }}
            sx={{ mx: 1, flex: 1 }}
            placeholder="جستجو"
          />
        </Paper>
      </Stack>
      <Divider sx={{ marginBottom: "30px" }} />

      <ListProducts />

      {/* <TabContext value={value}>
        <TabList
          dir="rtl"
          onChange={handleChange}
          centered
          indicatorColor="transparent"
        >
          <StyledTab
            icon={<GridView viewBox="0 0 17 17" sx={svgIconStyle} />}
            value="1"
          />
          <StyledTab
            icon={<ListView viewBox="0 0 16 14" sx={svgIconStyle} />}
            value="2"
          />
        </TabList>
        <Divider sx={{ marginTop: "-10px" }} />
        <TabPanel value="1" sx={TabPanelStyle}>
          <Grid container spacing={2} dir="rtl">
            {ads.map((ad) => (
              <AdCard item={ad} />
            ))}
          </Grid>
        </TabPanel>
        <TabPanel value="2" sx={TabPanelStyle}>
          <ListProducts />
        </TabPanel>
      </TabContext> */}
    </div>
  );
}
