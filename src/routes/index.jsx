import { Box, Grid, Typography } from "@mui/material";
import React from "react";

const Index = () => {
  return (
    <Box>
      <Grid container>
        <Grid
          item
          xs={4}
          sx={{
            backgroundColor: "#999",
            padding: "10px",
            border: "5px solid #fff",
          }}
        >
          <Typography
            variant="h6"
            sx={{
              fontWeight: 400,
              textTransform: "uppercase",
              textAlign: "center",
            }}
          >
            Total Products
          </Typography>
          <Typography
            variant="h4"
            sx={{
              fontWeight: 800,
              textTransform: "uppercase",
              textAlign: "center",
            }}
          >
            100
          </Typography>
        </Grid>
        <Grid
          item
          xs={4}
          sx={{
            backgroundColor: "#999",
            padding: "10px",
            border: "5px solid #fff",
          }}
        >
          <Typography
            variant="h6"
            sx={{
              fontWeight: 400,
              textTransform: "uppercase",
              textAlign: "center",
            }}
          >
            Total Products
          </Typography>
          <Typography
            variant="h4"
            sx={{
              fontWeight: 800,
              textTransform: "uppercase",
              textAlign: "center",
            }}
          >
            100
          </Typography>
        </Grid>
        <Grid
          item
          xs={4}
          sx={{
            backgroundColor: "#999",
            padding: "10px",
            border: "5px solid #fff",
          }}
        >
          <Typography
            variant="h6"
            sx={{
              fontWeight: 400,
              textTransform: "uppercase",
              textAlign: "center",
            }}
          >
            Total Products
          </Typography>
          <Typography
            variant="h4"
            sx={{
              fontWeight: 800,
              textTransform: "uppercase",
              textAlign: "center",
            }}
          >
            100
          </Typography>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Index;
