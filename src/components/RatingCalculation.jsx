import React from "react";
import rating1 from "../../public/rating1.png";
import rating2 from "../../public/rating2.png";
import rating3 from "../../public/rating3.png";
import rating4 from "../../public/rating4.png";
import rating5 from "../../public/rating5.png";
import { Box } from "@mui/material";

const RatingCalculation = ({ r }) => {
  function starRating(r) {
    if (r === 1) return rating1;
    if (r === 2) return rating2;
    if (r === 3) return rating3;
    if (r === 4) return rating4;
    else return rating5;
  }

  return (
    <Box sx={{ width: "100px" }}>
      <img src={starRating(Math.round(r))} alt="" />
    </Box>
  );
};

export default RatingCalculation;
