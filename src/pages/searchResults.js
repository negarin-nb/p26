import React, { useState, useEffect } from "react";
import { Divider, Stack, Tab, Typography } from "@mui/material";
import Header from "../components/header";
import { getAds } from "../api/ads";
import { styled } from "@mui/material/styles";
import ListProducts from "../components/listProducts";
import {
  useLocation,
  useNavigate,
  useNavigation,
  useParams,
} from "react-router-dom";
import searchApi from "../api/search";
import buttonIcons from "../assets/buttonIcons/ButtonIcons";
import HomeButton from "../components/homeButton";
import FilterProduct from "../components/filterProduct";
import productsApi from "../api/products";
import Pagination from "../components/pagination";

export default function SearchResult() {
  const [products, setProducts] = useState([]);
  const [ads, setAds] = useState([]);
  const [searchIn, setSearchIn] = useState("");
  const [value, setValue] = React.useState("1");

  const [categories, setCategories] = useState([]);
  const [subCategories, setSubCategories] = useState([]);

  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage] = useState(20);
  const [numOfPages, setNumOfPages] = useState(1);

  //determine category filter
  let state = useLocation().state;
  console.log("state");
  console.log(state);

  // for searching is word and for category filter is number
  const { searchInput } = useParams();
  console.log(searchInput);

  const fetchSearchResult = async () => {
    const response = await searchApi.search(
      searchInput,
      currentPage,
      postsPerPage
    );
    setNumOfPages(response.data.Item["number of pages"]);
    setProducts(response.data.ListItems);
    setAds(response.data.ListItems);
    const _ads = JSON.parse(JSON.stringify(response.data.ListItems));
  };
  const fetchFilterResult = async (id) => {
    const response = await searchApi.filter(id, currentPage, postsPerPage);
    setNumOfPages(response.data.Item["number of pages"]);
    setProducts(response.data.ListItems);
    setAds(response.data.ListItems);
    const _ads = JSON.parse(JSON.stringify(response.data.ListItems));
  };

  const handlePageChange = (value) => {
    setCurrentPage(value);
    console.log(currentPage);
    //   fetchFilterResult(searchInput);
  };

  const fetchCategories = async () => {
    const response = await productsApi.getCategories();
    setCategories(response.data.ListItems);
  };

  const fetchSubCategories = async (id) => {
    const response = await productsApi.getSubCategories(id);
    setSubCategories(response.data.ListItems);
  };

  const handleSubCategorySelect = async (id) => {
    console.log(id);
    const _products = [...ads];
    const _ads = _products.filter((product) => product.subcategory === id);
    setAds(_ads);
    // fetchSubCategories(id);
  };

  const handleCategorySelect = async (id) => {
    const _products = [...ads];
    const _ads = _products.filter((product) => product.category === id);
    setAds(_ads);
    fetchSubCategories(id);
  };

  const onClickResult = (id) => {
    setCurrentPage(1);
    setCategories([]);
    fetchFilterResult(id);
    fetchSubCategories(id);
  };

  useEffect(() => {
    if (state) {
      fetchFilterResult(searchInput);
      fetchSubCategories(searchInput);
    } else {
      fetchSearchResult();
      fetchCategories();
    }
  }, []);

  useEffect(() => {
    if (state) fetchFilterResult(searchInput);
    else fetchSearchResult();
  }, [currentPage]);

  // useEffect(() => {
  //   fetchSubCategories(searchInput);
  // }, [searchIn]);

  return (
    <div className="App">
      <Header />
      <Stack
        dir="rtl"
        direction="row"
        spacing={{ xs: 2, sm: 3.8, lg: 5.5 }}
        mt={"60px"}
        justifyContent="center"
      >
        {buttonIcons.map((buttonIcon) => (
          <HomeButton
            svgIcon={buttonIcon.svg}
            title={buttonIcon.title}
            id={buttonIcon.id}
            stateTitle={state ? state.title : null}
            onClickResult={onClickResult}
          />
        ))}
      </Stack>

      <Stack my="60px">
        <Divider />

        <Typography textAlign="left" my="20px" dir="rtl" variant="h3">
          {state ? "محصول: " + state.title : "نتیجه جستجو برای: " + searchInput}
        </Typography>
        <Stack dir="rtl">
          {ads.length === 0 ? (
            <Typography dir="rtl" variant="h3">
              محصولی یافت نشد!
            </Typography>
          ) : (
            <Stack direction="row">
              <FilterProduct
                categories={categories}
                subCategories={subCategories}
                onCategory={handleCategorySelect}
                onSubCategory={handleSubCategorySelect}
              />
              <ListProducts
                ads={ads}
                postsPerPage={postsPerPage}
                currentPage={currentPage}
              />
            </Stack>
          )}

          {
            <Stack
              dir="ltr"
              justifyContent="center"
              py="40px"
              direction="row"
              ml="260px"
            >
              {numOfPages === 1 ? null : (
                <Pagination
                  postsPerPage={postsPerPage}
                  numOfPages={numOfPages}
                  currentPage={currentPage}
                  handlePageChange={handlePageChange}
                />
              )}
            </Stack>
          }
        </Stack>
      </Stack>
    </div>
  );
}
