import * as React from "react";

import { Box, Grid, Typography } from "@mui/material";

//css
import "./styles/product-card.css";
import { Button } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";

const ProductCard = (props) => {
  const {
    _id,
    imageUrl,
    productName,
    regularPrice,
    salePrice,
    category,
    company,
    quantity,
    brand,
    onSale,
  } = props;
  console.log(props);
  const navigate = useNavigate();

  return (
    <Grid className="product-card-container">
      {onSale === true ? (
        <>
          <Box className="product-image">
            <Grid className="product-image-cts">
              <Link to={`product/details/${_id}`}>
                <img src={imageUrl} alt={productName} />
              </Link>
            </Grid>
            <Grid className="product-onsale-display-overlay">
              <Typography sx={{ fontSize: 12 }}>SALE</Typography>
            </Grid>
          </Box>
        </>
      ) : (
        <>
          <Box className="product-image">
            <Grid className="product-image-cts">
              <Link to={`product/details/${_id}`}>
                <img src={imageUrl} alt={productName} />
              </Link>
            </Grid>
          </Box>
        </>
      )}
      <Grid className="product-name-n-cat">
        <Typography
          variant="h6"
          sx={{ fontWeight: 700, fontSize: 16, textTransform: "capitalize" }}
        >
          {productName}
        </Typography>
        <Typography variant="h6" sx={{ fontWeight: 300, fontSize: 14 }}>
          {brand}
        </Typography>
      </Grid>

      <Grid
        container
        sx={{ padding: "10px 0" }}
        className="product-price-n-view-details"
      >
        <Grid className="product-price">
          {onSale === true ? (
            <>
              <Typography
                variant="h6"
                sx={{
                  fontWeight: 700,
                  fontSize: "16px",
                }}
              >
                Rs. {salePrice}
              </Typography>
              <Typography
                sx={{
                  fontWeight: 700,
                  textDecoration: "line-through",
                  color: "#f00",
                  fontSize: "12px",
                }}
              >
                Rs. {regularPrice}
              </Typography>
            </>
          ) : (
            <>
              <Typography
                variant="h6"
                sx={{
                  fontWeight: 700,
                  fontSize: "16px",
                }}
              >
                Rs. {regularPrice}
              </Typography>
            </>
          )}
        </Grid>
        <Grid className="product-view">
          <Button
            className="general-btn"
            sx={{
              fontWeight: 700,
              fontSize: 10,
              backgroundColor: "#003d4a",
              color: "#e2bc89",
            }}
            onClick={() => {
              navigate(`product/details/${_id}`);
            }}
          >
            View details
          </Button>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default ProductCard;
