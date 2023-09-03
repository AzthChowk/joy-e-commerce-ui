import React, { useState, useEffect } from "react";
import { $axios } from "../../lib/AxiosInstance";
import { Box, Typography } from "@mui/material";
import RatingCalculation from "./RatingCalculation";
import WriteReview from "./WriteReview";

const ProductReviews = (props) => {
  const [reviews, setReviews] = useState([]);
  console.log(reviews);

  const fetchProductReviews = async () => {
    try {
      const reviewsList = await $axios.get(`/product/reviews/${props.id}`);
      setReviews(reviewsList.data);
    } catch (error) {
      console.log(error.message);
    }
  };
  useEffect(() => {
    fetchProductReviews();
  }, []);

  return (
    <>
      <Box sx={{ padding: "10px 0" }}>
        <WriteReview />
      </Box>

      <Box sx={{ padding: "10px 0" }}>
        <Typography sx={{ fontWeight: 600, padding: "10px 0" }}>
          Reviews ({reviews.length})
        </Typography>
        {reviews.map((item) => {
          return (
            <Box key={item._id}>
              {/* Call ratingcalucation components */}
              <Typography>
                <RatingCalculation r={item.rating} />
              </Typography>
              <Typography
                sx={{
                  fontWeight: 600,
                  fontFamily: "Montserrat",
                  fontSize: "12pt",
                }}
              >
                By : {item.reviewerFName} {item.reviewerLName}
              </Typography>

              <Typography sx={{ fontWeight: 400, fontFamily: "Montserrat" }}>
                {item.date.split("T")[0]}
              </Typography>
              <Typography sx={{ fontFamily: "Montserrat", padding: "10px 0" }}>
                {item.review}
              </Typography>
            </Box>
          );
        })}
      </Box>
    </>
  );
};

export default ProductReviews;
