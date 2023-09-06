import { Box, Button, Grid, Typography } from "@mui/material";
import React, { useEffect } from "react";
import CustomBreadCrumbs from "./CustomBreadCrumbs";

//Tabs
import Tab from "@mui/material/Tab";
import Tabs from "@mui/material/Tabs";
import { useFormik } from "formik";
import PropTypes from "prop-types";

import * as Yup from "yup";

//css
import { useParams } from "react-router-dom";
import { $axios } from "../../lib/AxiosInstance";
import "./styles/view-product-details.css";
import ProductReviews from "./ProductReviews";

function CustomTabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 2 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

CustomTabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

const ViewProductDetails = () => {
  const [value, setValue] = React.useState(0);
  const [product, setProduct] = React.useState({});
  const {
    _id,
    productName,
    imageUrl,
    regularPrice,
    brand,
    category,
    section,
    color,
    description,
    freeShipping,
    inStock,
    onSale,
    quantity,
    salePrice,
    size,
  } = product;

  console.log("hi", product);
  const params = useParams();
  const productId = params.id;

  const getProductData = async () => {
    try {
      const productData = await $axios.get(`/product/details/${productId}`);

      setProduct(productData.data);
    } catch (error) {
      console.log(error.message);
    }
  };
  useEffect(() => {
    getProductData();
  }, []);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  //formik for quantity of product purchase
  const formik = useFormik({
    initialValues: {
      qty: "1",
    },
    validationSchema: Yup.object({
      qty: Yup.number().min(1).required("Required"),
    }),
    onSubmit: (values) => {
      alert(JSON.stringify(values, null, 2));
    },
  });
  return (
    <Box container className="container product-details">
      <Box>
        <CustomBreadCrumbs name={product.productName} />
      </Box>

      {/* ===============Product details================= */}

      <Box>
        <Grid container className="product-details-grid">
          <Grid item xs={8} className="product-details-grid-img">
            <img src={imageUrl} alt="" />
          </Grid>
          <Grid item xs={4} className="product-details-grid-description">
            <Grid className="product-details-grid-description-inner">
              <Typography variant="h5" sx={{ textTransform: "uppercase" }}>
                {productName}
              </Typography>
            </Grid>
            <Grid className="product-details-grid-description-inner">
              <Typography sx={{ textTransform: "uppercase" }}>
                Brand : {brand}
              </Typography>
            </Grid>
            <Grid className="product-details-grid-description-inner">
              {onSale === true ? (
                <>
                  <Typography variant="h4" sx={{ fontWeight: 600 }}>
                    {" "}
                    Rs. {salePrice}
                  </Typography>
                  <Typography
                    variant="h6"
                    sx={{
                      fontWeight: 600,

                      textDecoration: "line-through",
                      color: "#f00",
                    }}
                  >
                    Rs. {regularPrice}
                  </Typography>
                </>
              ) : (
                <>
                  <Typography variant="h4" sx={{ fontWeight: 600 }}>
                    {" "}
                    Rs. {regularPrice}
                  </Typography>
                </>
              )}
            </Grid>
            <Grid className="product-details-grid-description-inner">
              <Typography
                variant="h6"
                sx={{
                  textTransform: "uppercase",
                  fontSize: 16,
                }}
              >
                Available Sizes
              </Typography>
              <Typography variant="h6" sx={{ textTransform: "uppercase" }}>
                {size}
              </Typography>
            </Grid>

            <Grid className="product-details-grid-description-inner">
              <Typography
                variant="h6"
                sx={{
                  textTransform: "uppercase",
                  fontSize: 16,
                }}
              >
                Available Color
              </Typography>

              <Typography variant="h6" sx={{ textTransform: "uppercase" }}>
                {color}
              </Typography>
            </Grid>

            <Grid className="product-details-grid-description-inner">
              <form onSubmit={formik.handleSubmit}>
                <label>QUANTITY</label>

                <input
                  name="qty"
                  type="number"
                  {...formik.getFieldProps("qty")}
                />

                {formik.touched.qty && formik.errors.qty ? (
                  <div>{formik.errors.qty}</div>
                ) : null}

                <Button variant="contained" type="submit" color="success">
                  Add to Cart
                </Button>
                <Button variant="contained">View Cart</Button>
              </form>
            </Grid>
            <Grid className="product-details-grid-description-inner">
              {inStock === true ? (
                <Typography sx={{}}>
                  In Stock : Yes [ {quantity} items left.]
                </Typography>
              ) : (
                <Typography sx={{}}>In Stock : No</Typography>
              )}
            </Grid>

            <Grid className="product-details-grid-description-inner">
              {freeShipping === true ? (
                <Typography sx={{}}>Free Shipping : Yes</Typography>
              ) : (
                <Typography sx={{}}>Free Shipping : No</Typography>
              )}
            </Grid>
            <Grid className="product-details-grid-description-inner">
              <Typography
                variant="h6"
                sx={{
                  textTransform: "uppercase",
                  fontWeight: 600,
                }}
              >
                Easy returns
              </Typography>
            </Grid>
          </Grid>
        </Grid>
      </Box>

      {/* ======== Product Description and Reviews - TAB ================ */}
      <Box>
        <Grid container className="product-description-n-review-n-similar">
          <Grid item xs={8}>
            <Box sx={{ width: "100%" }}>
              <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
                <Tabs
                  value={value}
                  onChange={handleChange}
                  aria-label="basic tabs example"
                >
                  <Tab sx={{}} label="Product description" {...a11yProps(0)} />
                  <Tab sx={{}} label="Reviews" {...a11yProps(1)} />
                </Tabs>
              </Box>
              {/* ========Product Description========== */}
              <CustomTabPanel value={value} index={0}>
                <Typography sx={{}}>{product.description}</Typography>
              </CustomTabPanel>

              {/* ===========Product Reviews ============== */}
              <CustomTabPanel value={value} index={1}>
                <Box>
                  <ProductReviews id={product._id} />
                </Box>
              </CustomTabPanel>
            </Box>
          </Grid>

          <Grid item xs={4} className="similar-product">
            <Typography
              sx={{
                textTransform: "uppercase",
                fontWeight: 600,
              }}
            >
              You make also like this
            </Typography>
            <Grid>
              <img
                src="https://www.gluestore.com.au/cdn/shop/products/20211220-IMG_7076_1600x.jpg?v=1684720866"
                alt=""
              />
              <Typography sx={{}}>The North face Winter Jacket</Typography>
              <Typography sx={{ fontWeight: 600 }}>Rs 4500.00</Typography>
              <Typography sx={{}}>Rating - 4.5/5</Typography>
              <Button>View details</Button>
            </Grid>
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
};

export default ViewProductDetails;
