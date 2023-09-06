import {
  Box,
  Button,
  Checkbox,
  Divider,
  FormControlLabel,
  Grid,
  TextField,
  Typography,
} from "@mui/material";

import React from "react";
import { categories } from "../constants/category";
import { sections } from "../constants/section";

const ProductFilterSection = () => {
  return (
    <Box className="product-filter-section">
      <Grid>
        <Typography variant="h6" sx={{ fontWeight: 600 }}>
          Category
        </Typography>
        <Box>
          {categories.map((item, index) => {
            return (
              <>
                <FormControlLabel
                  control={
                    <Checkbox
                      size="small"
                      sx={{
                        padding: "4px",
                        margin: "0 10px",
                      }}
                    />
                  }
                  label={item}
                  sx={{ display: "block" }}
                />
              </>
            );
          })}
        </Box>
      </Grid>
      <Divider sx={{ margin: "10px" }} />
      <Grid>
        <Typography variant="h6" sx={{ fontWeight: 600 }}>
          Section
        </Typography>
        <Box>
          {sections.map((item, index) => {
            return (
              <>
                <FormControlLabel
                  control={
                    <Checkbox
                      size="small"
                      sx={{
                        padding: "4px",
                        margin: "0 10px",
                      }}
                    />
                  }
                  label={item}
                  sx={{ display: "block" }}
                />
              </>
            );
          })}
        </Box>
      </Grid>
      <Divider sx={{ margin: "10px" }} />

      <Grid>
        <Typography variant="h6" sx={{ fontWeight: 600 }}>
          Price
        </Typography>
        <TextField
          label="Min. price"
          id="outlined-size-small"
          size="small"
          sx={{ width: "100px", margin: "0 2px" }}
        />
        <TextField
          label="Max. price"
          id="outlined-size-small"
          size="small"
          sx={{ width: "100px", margin: "2px" }}
        />
      </Grid>
      <Divider sx={{ margin: "10px" }} />

      <Grid>
        <Typography variant="h6" sx={{ fontWeight: 600 }}>
          Size
        </Typography>
      </Grid>
      <Divider sx={{ margin: "10px" }} />

      <Grid>
        <Typography variant="h6" sx={{ fontWeight: 600 }}>
          Color
        </Typography>
      </Grid>
      <Button>Apply filter</Button>
      <Button>Clear all filters</Button>
    </Box>
  );
};

export default ProductFilterSection;
