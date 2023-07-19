import React, { useState, useEffect } from "react";
import { Divider, Stack, Tab, Typography } from "@mui/material";
import Header from "../components/header";
import { getAds } from "../api/ads";
import { styled } from "@mui/material/styles";
import ListProducts from "../components/listProducts";
import { useLocation, useParams } from "react-router-dom";
import searchApi from "../api/search";

export default function SearchResult() {
  const [ads, setAds] = useState([]);
  const [value, setValue] = React.useState("1");

  let state = useLocation().state;
  console.log(state);

  const searchInput = useParams();
  console.log(searchInput);

  const fetchSearchResult = async () => {
    const response = await searchApi.search(searchInput);
    console.log(response.data);
    setAds(response.data.Item);
  };
  const fetchFilterResult = async () => {
    const response = await searchApi.filter(searchInput);
    console.log(response.data);
    setAds(response.data.Item);
  };
  useEffect(() => {
    if (state) fetchFilterResult();
    else fetchSearchResult();
  }, []);

  return (
    <div className="App">
      <Header />

      <Divider sx={{ my: "50px" }} />
      <Typography textAlign="left" mb="30px" dir="rtl" variant="h3">
        {state
          ? "دسته‌بندی: " + state.title
          : "نتیجه جستجو برای: " + searchInput.searchInput}
      </Typography>
      <Stack dir="rtl">
        {ads.length === 0 ? (
          <Typography dir="rtl" variant="h3">
            محصولی یافت نشد!
          </Typography>
        ) : (
          <ListProducts ads={ads} setAds={setAds} />
        )}
      </Stack>
    </div>
  );
}
