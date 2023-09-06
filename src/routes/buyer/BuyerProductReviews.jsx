import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import React from "react";
import { useQuery } from "react-query";
import { fetchBuyerProductReviews } from "../../../lib/apis/review-apis";

import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import Accordion from "@mui/material/Accordion";
import AccordionDetails from "@mui/material/AccordionDetails";
import AccordionSummary from "@mui/material/AccordionSummary";
import { Link } from "react-router-dom";

const BuyerProductReviews = () => {
  const { isLoading, error, isError, data } = useQuery({
    queryKey: ["buyer-product-reviews"],
    queryFn: () => fetchBuyerProductReviews(),
  });
  console.log(data);

  return (
    <>
      <TableContainer>
        <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
          <TableHead>
            <TableRow>
              <TableCell
                style={{ minWidth: "135px", maxWidth: "150px", width: "150px" }}
              >
                Product Image
              </TableCell>
              <TableCell style={{ width: "200px" }}>Product Name</TableCell>
              <TableCell align="left">Reviewed on</TableCell>
              <TableCell align="left">Review</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data?.data?.map((item) => {
              return (
                <TableRow key={item._id}>
                  <TableCell>
                    <img
                      src={item.productImage}
                      alt=""
                      style={{
                        width: "75px",
                        height: "75px",
                        objectFit: "contain",
                      }}
                    />
                  </TableCell>
                  <TableCell>
                    {/* <Link to={`details/${item.productId}`}>
                      {item.productName}
                    </Link> */}
                    {item.productName}
                  </TableCell>
                  <TableCell style={{ width: "120px" }}>
                    {item.date.split("T")[0]}
                  </TableCell>
                  <TableCell>{item.review}</TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>

      {/* <Grid>
        {data?.data?.map((item) => {
          return (
            <>
              <BuyerReviewsTable />

              <Grid key={item._id}>
                <Typography>{item.productId}</Typography>
                <Typography>{item.date}</Typography>
                <Typography>{item.review}</Typography>
              </Grid>
            </>
          );
        })}
      </Grid> */}
    </>
  );
};

export default BuyerProductReviews;
