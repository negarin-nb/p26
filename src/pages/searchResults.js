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
  const [postsPerPage, setPostsPerPage] = useState(30);

  let state = useLocation().state;
  console.log("state");
  console.log(state);

  const { searchInput } = useParams();
  //console.log(searchInput);

  const fetchSearchResult = async () => {
    const response = await searchApi.search(searchInput);
    //console.log(response.data);
    //setAds(response.data.Item);
    setProducts(response.data.ListItems);
    const _ads = JSON.parse(JSON.stringify(response.data.ListItems));
    arrangePage(_ads);
  };
  const fetchFilterResult = async (id) => {
    const response = await searchApi.filter(id);
    // console.log(response.data.Item);
    // setAds(response.data.Item);
    setProducts(response.data.ListItems);
    const _ads = JSON.parse(JSON.stringify(response.data.ListItems));
    arrangePage(_ads);
  };

  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const arrangePage = (products) => {
    const indexOfLastPost = currentPage * postsPerPage;
    const indexOfFirstPost = indexOfLastPost - postsPerPage;
    const currentProducts = products.slice(indexOfFirstPost, indexOfLastPost);
    setAds(currentProducts);
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
    arrangePage(products);
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
              <ListProducts ads={ads} />
            </Stack>
          )}

          {
            <Stack justifyContent="center" py="40px" direction="row" ml="260px">
              <Pagination
                postsPerPage={postsPerPage}
                totalPosts={products.length}
                currentPage={currentPage}
                paginate={paginate}
              />
            </Stack>
          }
        </Stack>
      </Stack>
    </div>
  );
}
