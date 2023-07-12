import React, { useState } from "react";
import { Paper, InputBase, IconButton, Box, Stack } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import AdCard from "../components/adCard";
import Header from "../components/header";
import Girder from "../assets/svgIcons/girder";
import Dots from "../assets/svgIcons/dots";
import HomeButton from "../components/homeButton";
import Pipe from "../assets/svgIcons/pipe";
import Profile from "../assets/svgIcons/profile";
import Reba from "../assets/svgIcons/reba";
import Steel from "../assets/svgIcons/steel";
import Stud from "../assets/svgIcons/stud";
import Corner from "../assets/svgIcons/corner";
import { useNavigate } from "react-router-dom";

export default function Home() {
  const navigate = useNavigate();
  const [searchInput, setSearchInput] = useState("");

  const handleSubmitButton = () => {
    navigate(`/results/${searchInput}`);
  };
  const handleSubmit = (e) => {
    if (e.key === "Enter") navigate(`/results/${searchInput}`);
  };
  const svgIconStyle = {
    color: "primary.main",
    transition: "0.3s",
    fontSize: {
      sx: 30,
      sm: 35,
      lg: 40,
    },
  };

  const buttonIcons = [
    {
      svg: () => (
        <Girder viewBox="0 0 34 34" className="svg" sx={svgIconStyle} />
      ),
      title: "تیرآهن",
    },
    {
      svg: () => (
        <Profile viewBox="0 0 34 34" className="svg" sx={svgIconStyle} />
      ),
      title: "پروفیل",
    },
    {
      svg: () => <Reba viewBox="0 0 34 34" className="svg" sx={svgIconStyle} />,
      title: "میله‌گرد",
    },
    {
      svg: () => <Stud viewBox="0 0 40 34" className="svg" sx={svgIconStyle} />,
      title: "ناودانی",
    },
    {
      svg: () => <Pipe viewBox="0 0 34 34" className="svg" sx={svgIconStyle} />,
      title: "لوله",
    },
    {
      svg: () => (
        <Steel viewBox="0 0 34 34" className="svg" sx={svgIconStyle} />
      ),
      title: "استیل",
    },
    {
      svg: () => (
        <Corner viewBox="0 0 34 34" className="svg" sx={svgIconStyle} />
      ),
      title: "نبشی",
    },
    {
      svg: () => <Dots viewBox="0 0 36 10" className="svg" sx={svgIconStyle} />,
      title: "سایر",
    },
  ];

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
            onKeyDown={(e) => handleSubmit(e)}
          />
        </Paper>
        <Stack
          dir="rtl"
          direction="row"
          spacing={{ xs: 2, sm: 3.8, lg: 5.5 }}
          mt={"25px"}
        >
          {buttonIcons.map((buttonIcon) => (
            <HomeButton svgIcon={buttonIcon.svg} title={buttonIcon.title} />
          ))}
        </Stack>
      </Stack>
    </Box>
  );
}
