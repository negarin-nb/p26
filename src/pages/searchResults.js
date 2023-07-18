import React, { useState, useEffect } from "react";
import { Divider, Tab, Typography } from "@mui/material";
import Header from "../components/header";
import { getAds } from "../api/ads";
import { styled } from "@mui/material/styles";
import ListProducts from "../components/listProducts";
import { useParams } from "react-router-dom";
import searchApi from "../api/search";

export default function SearchResult() {
  const [ads, setAds] = useState([]);
  const [value, setValue] = React.useState("1");

  const searchInput = useParams();

  const fetchSearchResult = async () => {
    const response = await searchApi.search(searchInput);
    console.log(response.data);
    setAds(response.data.Item);
  };
  useEffect(() => {
    fetchSearchResult();
  }, []);

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

      <Divider sx={{ my: "50px" }} />
      {ads.length === 0 ? (
        <Typography dir="rtl" variant="h3">
          محصولی یافت نشد!
        </Typography>
      ) : (
        <ListProducts ads={ads} />
      )}

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
