import { Avatar, Divider, Grid, Typography } from "@mui/material";
import { Box } from "@mui/system";
import React, { useState } from "react";
import { Link, Outlet } from "react-router-dom";
import "./buyer-dashboard.css";

const BuyerRoot = () => {
  const [userName, setUsername] = useState(localStorage.getItem("userName"));
  return (
    <Box className="container buyer-dashboard">
      <Grid className="buyer-dashboard-grid">
        <Grid item className="buyer-dashboard-grid-menu">
          <Avatar sizes="large" sx={{ margin: "10px 0" }} />
          <Typography sx={{ fontWeight: 700 }}>Hello, {userName}</Typography>
          <Typography>My profile</Typography>
          <Typography>Log out</Typography>
          <Divider sx={{ margin: "15px 0" }} />
          <Typography>
            <Link to="dashboard">Dashboard</Link>
          </Typography>
          <Divider sx={{ margin: "15px 0" }} />
          <Typography>My cart</Typography>
          <Divider sx={{ margin: "15px 0" }} />
          <Typography>My orders</Typography>
          <Typography>My purchases</Typography>
          <Divider sx={{ margin: "15px 0" }} />
          <Typography>
            <Link to="product/reviews">My reviews</Link>
          </Typography>
        </Grid>
        <Grid item className="buyer-dashboard-grid-cts">
          <Outlet />
        </Grid>
      </Grid>
    </Box>
  );
};

export default BuyerRoot;
