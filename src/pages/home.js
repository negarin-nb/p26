import React, { useState } from "react";
import { Paper, InputBase, IconButton, Box, Stack } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import Header from "../components/header";

import HomeButton from "../components/homeButton";
import { useNavigate } from "react-router-dom";
import ButtonIcons from "../assets/buttonIcons/ButtonIcons";

export default function Home() {
  const navigate = useNavigate();
  const [searchInput, setSearchInput] = useState("");

  const handleSubmitButton = () => {
    navigate(`/results/${searchInput}`, {
      state: "title",
    });
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
              xs: 280,
              sm: 500,
              // md: 500,
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
        <Stack
          dir="rtl"
          direction="row"
          spacing={{ xs: 2, sm: 3.8, lg: 5.5 }}
          mt={"25px"}
        >
          {ButtonIcons.map((buttonIcon) => (
            <HomeButton
              svgIcon={buttonIcon.svg}
              title={buttonIcon.title}
              id={buttonIcon.id}
              onClickResult={() => {}}
            />
          ))}
        </Stack>
      </Stack>
    </Box>
  );
}
