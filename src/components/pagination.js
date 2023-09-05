import { Link, List, Stack, Typography } from "@mui/material";
import PN from "persian-number";

import React from "react";

const Pagination = ({ postsPerPage, totalPosts, paginate, currentPage }) => {
  const pageNumbers = [];

  for (let i = 1; i <= Math.ceil(totalPosts / postsPerPage); i++) {
    pageNumbers.push(i);
  }

  const noActivePageStyle = {
    textDecoration: "none",
    px: "8px",
    "&:hover": { color: "gray" },
    cursor: "pointer",
  };

  const activePageStyle = {
    textDecoration: "none",
    px: "8px",
    color: "gray",

    "&:hover": { color: "gray" },
    cursor: "pointer",
  };

  return (
    //<nav>
    <Stack direction="row">
      {pageNumbers.reverse().map((number) => (
        <Link
          onClick={() => paginate(number)}
          sx={currentPage === number ? activePageStyle : noActivePageStyle}
          variant="h6"
        >
          {PN.convertEnToPe(number)}
        </Link>
      ))}
    </Stack>
    //  </nav>
  );
};

export default Pagination;
