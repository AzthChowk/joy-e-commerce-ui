import { Box } from "@mui/system";
import React from "react";
import { Outlet } from "react-router-dom";

//css
import { Grid, Typography } from "@mui/material";
import NewArrivals from "../../../components/NewArrivals";
import "./home-page.css";
import OnSale from "../../../components/OnSale";

const HomePage = () => {
  return (
    <Box>
      <Box className="container top-category">
        <Grid container className="top-category-grid">
          <Grid item xs={6}>
            <Grid className="top-category-mens">
              <Typography variant="h2">Mens</Typography>
              <button variant="outlined">Shop Now</button>
            </Grid>
            <Grid className="top-category-women">
              <Typography variant="h2">Womens</Typography>
              <button variant="outlined">Shop Now</button>
            </Grid>
          </Grid>
          <Grid item xs={6}>
            <Grid className="top-category-accessories">
              <Typography variant="h2">Accessories</Typography>
              <button variant="outlined">Shop Now</button>
            </Grid>
          </Grid>
        </Grid>
      </Box>

      <NewArrivals />
      <OnSale />

      {/* to display the children without the reload - use OUTLET */}
      <Outlet />
    </Box>
  );
};

export default HomePage;
