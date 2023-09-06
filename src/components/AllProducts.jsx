import { Box, Grid, Pagination, Typography } from "@mui/material";
import React, { useState } from "react";
import ProductCard from "./ProductCard";

import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";

//css
import { useQuery } from "react-query";
import { fetchProducts } from "../../lib/apis/product-apis";
import ProductFilterSection from "./ProductFilterSection";
import "./styles/new-arrivals.css";

const AllProducts = () => {
  const [products, setProducts] = useState([]);
  const [toggler, setToggler] = useState(false);
  const [page, setPage] = useState(1);

  const getPaginationData = (event, data) => {
    setPage(data);
  };
  //sorting
  const [sort, setSort] = React.useState("");

  const handleChange = (event) => {
    setSort(event.target.value);
  };

  //Query

  const { isLoading, error, isError, data } = useQuery({
    queryKey: ["buyer-products", { page }],
    queryFn: () =>
      fetchProducts({
        page,
        limit: 20,
      }),
  });
  console.log(data);

  return (
    <Box className="container">
      <Grid container>
        <Grid item xs={2} sx={{ width: "200px" }}>
          <ProductFilterSection />
        </Grid>
        <Grid item xs={10}>
          <Box className="container new-arrivals">
            <Box sx={{ display: "flex", justifyContent: "space-between" }}>
              <Typography variant="h6" sx={{ fontWeight: 800 }}>
                All Products
              </Typography>
              <FormControl sx={{ m: 1, minWidth: 250 }} size="small">
                <InputLabel>Sort by</InputLabel>
                <Select value={sort} label="Sort by" onChange={handleChange}>
                  <MenuItem value="">
                    <em>None</em>
                  </MenuItem>
                  <MenuItem value={10}>Price - Low to High</MenuItem>
                  <MenuItem value={20}>Price - High to Low</MenuItem>
                  <MenuItem value={30}>Added date</MenuItem>
                </Select>
              </FormControl>
            </Box>

            <Box className="products-container">
              {data?.data?.map((item, index) => {
                return (
                  <Grid className="products-grid" key={item._id}>
                    <ProductCard {...item} />
                  </Grid>
                );
              })}
            </Box>
            <Grid
              sx={{
                margin: "5rem 5rem 0 0",
                display: "flex",
                justifyContent: "flex-end",
              }}
            >
              <Pagination
                page={page}
                // count={data?.data}
                color="secondary"
                size="large"
                onChange={getPaginationData}
              />
            </Grid>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
};

export default AllProducts;
