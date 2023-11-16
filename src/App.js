import "./App.css";
import { Route, Routes, BrowserRouter, useLocation } from "react-router-dom";
import Home from "./pages/home";

import { ThemeProvider } from "@mui/material";
import theme from "./theme/theme";
import Products from "./pages/products";
import Price from "./pages/price";
import Contact from "./pages/contact";
import About from "./pages/about";
import Login from "./pages/login";
import Register from "./pages/register";
import NoPage from "./pages/noPage";
import { Container } from "@mui/system";

import rtlPlugin from "stylis-plugin-rtl";
import { CacheProvider } from "@emotion/react";
import createCache from "@emotion/cache";
import { prefixer } from "stylis";
import HomeLogedin from "./pages/homeLogedin";
import Profile from "./pages/profile";
import Dashboard from "./profile/dashboard";
import Subscription from "./profile/subscription";
import StoreSubmit from "./profile/storeSubmit";
import Marked from "./profile/marked";
import AdInsert from "./profile/adInsert";
import Support from "./profile/support";
import ProfileInfo from "./profile/profileInfo";
import Ads from "./profile/ads";
import ProductDetail from "./pages/productDetail";
import Header from "./components/header";
import { AuthProvider } from "./contex/authContext";
import { ProfileProvider } from "./contex/profileContext";
import SearchResult from "./pages/searchResults";
import AdEdit from "./profile/adEdit";
import Footer from "./components/footer";
import useMediaQuery from "@mui/material/useMediaQuery";

function App() {
  // Create rtl cache
  const cacheRtl = createCache({
    key: "muirtl",
    stylisPlugins: [prefixer, rtlPlugin],
  });
  const matches = useMediaQuery("(min-width:899px)");

  return (
    <div className="App">
      <AuthProvider>
        <ProfileProvider>
          <CacheProvider value={cacheRtl}>
            <ThemeProvider theme={theme}>
              <BrowserRouter>
                <Container>
                  <Routes>
                    <Route index element={<Home />} />

                    <Route
                      path="results/:searchInput"
                      element={<SearchResult />}
                    />
                    <Route path="products" element={<Products />} />
                    <Route path="price" element={<Price />} />
                    <Route path="contact" element={<Contact />} />
                    <Route path="about" element={<About />} />
                    <Route path="login" element={<Login />} />
                    <Route path="register" element={<Register />} />
                    <Route
                      path="product-detail/:id"
                      element={<ProductDetail />}
                    />

                    {matches ? (
                      <Route path="profile" element={<Profile />}>
                        <Route index element={<Dashboard />} />
                        <Route path="dashboard" element={<Dashboard />} />
                        <Route path="marked" element={<Marked />} />
                        <Route path="subscription" element={<Subscription />} />
                        <Route path="ads" element={<Ads />} />
                        <Route path="edit-ad" element={<AdEdit />} />
                        <Route path="insert-ad" element={<AdInsert />} />
                        <Route path="support" element={<Support />} />
                        <Route path="profile-info" element={<ProfileInfo />} />
                      </Route>
                    ) : (
                      <>
                        <Route path="profile" element={<Profile />} />
                        <Route
                          path="profile/dashboard"
                          element={<Dashboard />}
                        />
                        <Route path="profile/marked" element={<Marked />} />
                        <Route
                          path="profile/subscription"
                          element={<Subscription />}
                        />
                        <Route path="profile/ads" element={<Ads />} />
                        <Route path="profile/edit-ad" element={<AdEdit />} />
                        <Route
                          path="profile/insert-ad"
                          element={<AdInsert />}
                        />
                        <Route path="profile/support" element={<Support />} />
                        <Route
                          path="profile/profile-info"
                          element={<ProfileInfo />}
                        />
                      </>
                    )}
                    <Route path="profile/insert-ad" element={<AdInsert />} />
                    <Route path="home" element={<Home />} />
                    <Route path="*" element={<NoPage />} />
                    <Route path="/" element={<Home />} />
                  </Routes>
                </Container>
                <Footer />
              </BrowserRouter>
            </ThemeProvider>
          </CacheProvider>
        </ProfileProvider>
      </AuthProvider>
    </div>
  );
}

export default App;
