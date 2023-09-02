import React, { useEffect, useState } from "react";
import { Box, Grid, Typography } from "@mui/material";
import ProductCard from "./ProductCard";
import { $axios } from "../../lib/AxiosInstance";

//css
import "./styles/new-arrivals.css";

const NewArrivals = () => {
  const [products, setProducts] = useState([]);
  const [toggler, setToggler] = useState(false);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const productList = await $axios.get("/products/newarrivals");
        console.log(productList.data);
        setProducts(productList.data);
      } catch (error) {
        console.log(error.message);
      }
    };
    fetchProducts();
  }, [toggler]);
  return (
    <Box className="container new-arrivals">
      <Box sx={{ display: "flex", justifyContent: "space-between" }}>
        <Typography variant="h4" sx={{ fontWeight: 800 }}>
          New Arrivals
        </Typography>
        <Typography variant="h6" sx={{ fontWeight: 400 }}>
          See all
        </Typography>
      </Box>

      <Box className="products-container">
        {products.map((item, index) => {
          return (
            <Grid className="products-grid">
              <ProductCard {...item} />
            </Grid>
          );
        })}
      </Box>
    </Box>
  );
};

export default NewArrivals;
