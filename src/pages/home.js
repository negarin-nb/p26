import React, { useState } from "react";
import { Paper, InputBase, IconButton, Box, Stack, Grid } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import Header from "../components/header";

import HomeButton from "../components/homeButton";
import { useLocation, useParams, useNavigate } from "react-router-dom";
import ButtonIcons from "../assets/buttonIcons/ButtonIcons";
import { LineChart } from "@mui/x-charts/LineChart";
import Footer from "../components/footer";

export default function Home() {
  const navigate = useNavigate();
  const [searchInput, setSearchInput] = useState("");

  const handleSubmitButton = () => {
    navigate(`/results/${searchInput}`);
  };
  const handleSubmitEnter = (e) => {
    if (e.key === "Enter") navigate(`/results/${searchInput}`);
  };
  const handleFilterButton = (id) => {
    navigate(`/results/${id}`);
  };

  return (
    <Box>
      <Header />

      <Stack
        sx={{
          height: "100vh",
          minHeight: "500px",
          mt: "-64px",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <img
          style={{ width: "30%", maxWidth: "160px" }}
          src={require("../assets/images/Logo601.png")}
        />
        <Paper
          component="form"
          elevation={3}
          sx={{
            p: "3px",
            display: "flex",
            alignItems: "center",
            width: {
              xs: "90%",
              sm: 500,
              md: 630,
              lg: 630,
            },
            my: "50px",
          }}
        >
          <IconButton
            type="button"
            sx={{ p: "4px" }}
            aria-label="search"
            onClick={handleSubmitButton}
          >
            <SearchIcon sx={{ fontSize: 30 }} />
          </IconButton>
          <InputBase
            inputProps={{
              "aria-label": "search",
              style: { textAlign: "right" },
            }}
            sx={{ mx: 1, flex: 1 }}
            placeholder="جستجو"
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
            onKeyDown={(e) => handleSubmitEnter(e)}
          />
        </Paper>
        <Stack dir="rtl" direction="row" mt={"25px"}>
          <Grid
            dir="rtl"
            container
            spacing={{ xs: 2, md: 5 }}
            columns={{ xs: 12, sm: 8, md: 18 }}
            mt={"25px"}
          >
            {ButtonIcons.map((buttonIcon) => (
              <Grid item xs={4} sm={2} md={2} marginBottom={6}>
                <HomeButton
                  key={buttonIcon.id}
                  svgIcon={buttonIcon.svg}
                  title={buttonIcon.title}
                  id={buttonIcon.id}
                  onClickResult={() => {}}
                />
              </Grid>
            ))}
          </Grid>
        </Stack>
      </Stack>
    </Box>
  );
}
