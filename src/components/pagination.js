import { Link, List, Stack, Box } from "@mui/material";
import PN from "persian-number";

import React from "react";

const Pagination = ({
  postsPerPage,
  numOfPages,
  handlePageChange,
  currentPage,
}) => {
  const pageNumbers = [];
  for (let i = 1; i <= numOfPages; i++) {
    pageNumbers.push(i);
  }

  const noActivePageStyle = {
    textDecoration: "none",
    px: "10px",
    paddingTop: "8px",
    paddingButtom: "3px",
    "&:hover": { color: "gray" },
    cursor: "pointer",
    mx: "5px",
    width: "15px",
    height: "30px",
  };

  const activePageStyle = {
    textDecoration: "none",
    px: "10px",
    paddingTop: "8px",
    paddingButtom: "3px",
    color: "gray",
    "&:hover": { color: "gray" },
    cursor: "pointer",
    backgroundColor: "#EDEDED",
    borderRadius: "100px",
    mx: "5px",
    width: "15px",
    height: "30px",
  };

  const noActivePageNumStyle = {
    textDecoration: "none",
    "&:hover": { color: "gray" },
  };

  const activePageNumStyle = {
    textDecoration: "none",
    color: "gray",
    "&:hover": { color: "gray" },
    cursor: "pointer",
  };

  return (
    //<nav>
    <Stack direction="row">
      {pageNumbers.reverse().map((number) => (
        <Box
          onClick={() => handlePageChange(number)}
          sx={currentPage === number ? activePageStyle : noActivePageStyle}
        >
          <Link
            key={number}
            sx={
              currentPage === number ? activePageNumStyle : noActivePageNumStyle
            }
            onClick={() => handlePageChange(number)}
            variant="h6"
          >
            {PN.convertEnToPe(number)}
          </Link>
        </Box>
      ))}
    </Stack>
    //  </nav>
  );
};

export default Pagination;
