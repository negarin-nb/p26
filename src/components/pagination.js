import { Link, List, Stack, Typography } from "@mui/material";
import PN from "persian-number";

import React from "react";

const Pagination = ({ postsPerPage, totalPosts, paginate }) => {
  const pageNumbers = [];

  for (let i = 1; i <= Math.ceil(totalPosts / postsPerPage); i++) {
    pageNumbers.push(i);
  }

  return (
    //<nav>
    <Stack direction="row" dir="ltr">
      {pageNumbers.map((number) => (
        // <li key={number} className="page-item">
        <Link
          onClick={() => paginate(number)}
          sx={{
            textDecoration: "none",
            px: "5px",
            "&:hover": { color: "gray" },

            cursor: "pointer",
            direction: "rtl",
          }}
          variant="h6"
        >
          {PN.convertEnToPe(number)}
        </Link>
        // </li>
      ))}
    </Stack>
    //  </nav>
  );
};

export default Pagination;
