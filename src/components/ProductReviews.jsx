import { Box, TablePagination, Typography, Grid } from "@mui/material";
import React, { useEffect, useState } from "react";
import { $axios } from "../../lib/AxiosInstance";
import RatingCalculation from "./RatingCalculation";
import WriteReview from "./WriteReview";

const ProductReviews = (props) => {
  const [reviews, setReviews] = useState([]);
  console.log("reviewsclg", reviews);

  const [userRole, setUserRole] = React.useState(
    localStorage.getItem("userRole")
  );

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

  // Pagination

  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  return (
    <>
      {/* ============= Write reviews ============== */}
      <Box sx={{ padding: "10px 0" }}>
        {userRole === "buyer" && <WriteReview id={props.id} />}
      </Box>

      <Box sx={{ padding: "10px 0" }}>
        <Typography sx={{ fontWeight: 600, padding: "10px 0" }}>
          Reviews ({reviews.length})
        </Typography>
        {reviews
          .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
          .map((item) => {
            return (
              <Box key={item._id}>
                {/* Call rating calculation components */}
                <Typography>
                  <RatingCalculation r={item.rating} />
                </Typography>
                <Typography
                  sx={{
                    fontWeight: 600,

                    fontSize: "12pt",
                  }}
                >
                  By : {item.reviewerFName} {item.reviewerLName}
                </Typography>

                <Typography sx={{ fontWeight: 400 }}>
                  {item.date.split("T")[0]}
                </Typography>
                <Typography
                  sx={{
                    padding: "10px 0",
                    fontSize: 14,
                  }}
                >
                  {item.review}
                </Typography>
              </Box>
            );
          })}
      </Box>
      <Grid container sx={{ display: "flex", justifyContent: "flex-start" }}>
        <TablePagination
          sx={{}}
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={reviews.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Grid>
    </>
  );
};

export default ProductReviews;
