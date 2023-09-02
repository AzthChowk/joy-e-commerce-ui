import { Formik } from "formik";
import React, { useState } from "react";

import { Box, Button, Grid, TextField, Typography } from "@mui/material";
import Checkbox from "@mui/material/Checkbox";
import FormControl from "@mui/material/FormControl";
import FormControlLabel from "@mui/material/FormControlLabel";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import * as Yup from "yup";
import CustomSnackBar from "../../components/CustomSnackBar";
import { $axios } from "../../../lib/AxiosInstance";
import "./add-product-form.css";
import { Textarea } from "@mui/joy";
import { Label } from "@mui/icons-material";

const SellerAddProduct = () => {
  const [isSuccess, setIsSuccess] = useState(false);
  const [idFromToken, setIdFromToken] = useState(
    localStorage.getItem("userId")
  );

  const [cat, setCat] = React.useState("");
  const [onSale, setOnSale] = React.useState(false);
  const [frS, setFrS] = React.useState(false);
  const [inS, setInS] = React.useState(false);

  const category = [
    "New Arrivals",
    "Mens",
    "Women",
    "Accessories",
    "Bag Packs",
    "Shoes",
    "Sale",
  ];
  const section = [
    "Shoes and Socks",
    "Pants",
    "Jacket and Outer",
    "Shirts",
    "T-shirts",
    "Belts",
    "Inner-wears",
    "Bags",
    "Others",
  ];

  const handleChange = (event) => {
    setCat(event.target.value);
  };

  const changeHandlerIsOnSale = (event) => {
    setOnSale(!onSale);
  };

  const changeHandlerFreeShipping = (event) => {
    setFrS(!frS);
  };

  const changeHandlerInStock = (event) => {
    setInS(!inS);
  };

  return (
    <Box className="product-add-form" sx={{ width: "600px" }}>
      <CustomSnackBar
        open={isSuccess}
        status="success"
        message="Product is successfully added."
        severity="success"
      />
      <Typography
        variant="h6"
        sx={{ paddingBottom: "20px", fontWeight: "800" }}
      >
        ADD PRODUCT
      </Typography>
      <Formik
        initialValues={{
          productName: "",
          brand: "",
          size: "",
          color: "",
          regularPrice: "",
          isOnSale: "",
          salePrice: "",
          freeShipping: "",
          quantity: "",
          inStock: "",
          category: "",
          section: "",
          imageUrl: "",
        }}
        validationSchema={Yup.object({
          productName: Yup.string()
            .max(55, "Must be 55 characters or less")
            .required("Product name is required."),
          brand: Yup.string()
            .max(55, "Must be 55 characters or less")
            .required("Brand name is required."),

          regularPrice: Yup.number()
            .integer()
            .positive("Price must be positive.")
            .min(1, "Price is required.")
            .required("Price is required."),
          isOnSale: Yup.boolean().nullable().notRequired(),
          salePrice: Yup.number()
            .integer()
            .positive("Price must be positive.")
            .nullable()
            .notRequired(),

          quantity: Yup.number()
            .min(1, "Must be at least 1")
            .integer()
            .positive("The quantity must be greater than zero.")
            .required("Quantity is required."),
          freeShipping: Yup.boolean(),
          inStock: Yup.boolean().required("In stock value is required."),
          color: Yup.string(),
          size: Yup.string(),
          category: Yup.string().required("Category is required."),
          section: Yup.string().required("Section is required."),
          imageUrl: Yup.string().required("Image is required."),
          description: Yup.string().nullable(),
        })}
        onSubmit={async (values) => {
          console.log(values);
          try {
            const response = await $axios.post("/product/add", values);
            console.log(response);
            setIsSuccess(true);
          } catch (error) {
            console.log(error.message);
          }
        }}
      >
        {(formik) => (
          <form onSubmit={formik.handleSubmit}>
            <Box sx={{ flexGrow: 1 }}>
              <Grid container spacing={1}>
                <Grid item xs={4}>
                  <Typography>Product name</Typography>
                </Grid>
                <Grid item xs={8} className="product-form-input-area">
                  <TextField
                    name="productName"
                    variant="outlined"
                    {...formik.getFieldProps("productName")}
                  />
                  {formik.touched.name && formik.errors.name ? (
                    <div>{formik.errors.name}</div>
                  ) : null}
                </Grid>
              </Grid>
              <Grid container spacing={1}>
                <Grid item xs={4}>
                  <Typography>Category</Typography>
                </Grid>
                <Grid item xs={8} className="product-form-input-area">
                  <FormControl>
                    <Select
                      name="category"
                      sx={{
                        width: "350px",
                        height: "44px",
                        margin: "10px 0",
                      }}
                      onChange={handleChange}
                      {...formik.getFieldProps("category")}
                    >
                      {category.map((item, index) => {
                        return (
                          <MenuItem key={index} value={item}>
                            {item}
                          </MenuItem>
                        );
                      })}
                    </Select>
                  </FormControl>
                </Grid>
              </Grid>
              <Grid container spacing={1}>
                <Grid item xs={4}>
                  <Typography>Section</Typography>
                </Grid>
                <Grid item xs={8} className="product-form-input-area">
                  <FormControl>
                    <Select
                      name="section"
                      sx={{
                        width: "350px",
                        height: "44px",
                        margin: "10px 0",
                      }}
                      onChange={handleChange}
                      {...formik.getFieldProps("section")}
                    >
                      {section.map((item, index) => {
                        return (
                          <MenuItem key={index} value={item}>
                            {item}
                          </MenuItem>
                        );
                      })}
                    </Select>
                  </FormControl>
                </Grid>
              </Grid>

              <Grid container spacing={1}>
                <Grid item xs={4}>
                  <Typography>Brand</Typography>
                </Grid>
                <Grid item xs={8} className="product-form-input-area">
                  <TextField
                    name="brand"
                    variant="outlined"
                    {...formik.getFieldProps("brand")}
                  />
                  {formik.touched.brand && formik.errors.brand ? (
                    <div>{formik.errors.brand}</div>
                  ) : null}
                </Grid>
              </Grid>

              <Grid container spacing={1}>
                <Grid item xs={4}>
                  <Typography>Color</Typography>
                </Grid>
                <Grid item xs={8} className="product-form-input-area">
                  <TextField
                    name="color"
                    variant="outlined"
                    {...formik.getFieldProps("color")}
                  />
                  {formik.touched.color && formik.errors.color ? (
                    <div>{formik.errors.color}</div>
                  ) : null}
                </Grid>
              </Grid>
              <Grid container spacing={1}>
                <Grid item xs={4}>
                  <Typography>Size</Typography>
                </Grid>
                <Grid item xs={8} className="product-form-input-area">
                  <TextField
                    name="size"
                    variant="outlined"
                    {...formik.getFieldProps("size")}
                  />
                  {formik.touched.size && formik.errors.size ? (
                    <div>{formik.errors.size}</div>
                  ) : null}
                </Grid>
              </Grid>
              <Grid container spacing={1}>
                <Grid item xs={4}>
                  <Typography>Quantity</Typography>
                </Grid>
                <Grid item xs={8} className="product-form-input-area">
                  <TextField
                    type="number"
                    name="quantity"
                    variant="outlined"
                    {...formik.getFieldProps("quantity")}
                  />
                  {formik.touched.quantity && formik.errors.quantity ? (
                    <div>{formik.errors.quantity}</div>
                  ) : null}
                </Grid>
              </Grid>

              <Grid container spacing={1}>
                <Grid item xs={4}>
                  <Typography>Price</Typography>
                </Grid>
                <Grid
                  container
                  spacing={0}
                  item
                  xs={8}
                  className="product-form-input-area"
                >
                  <Grid
                    container
                    item
                    xs={6}
                    sx={{ width: "100px" }}
                    spacing={0}
                  >
                    <Typography>Regular Price</Typography>
                    <TextField
                      sx={{ width: "150px" }}
                      required
                      type="number"
                      name="regularPrice"
                      variant="outlined"
                      {...formik.getFieldProps("regularPrice")}
                    />
                    {formik.touched.regularPrice &&
                    formik.errors.regularPrice ? (
                      <div>{formik.errors.regularPrice}</div>
                    ) : null}
                  </Grid>
                  <Grid
                    container
                    item
                    xs={6}
                    sx={{ width: "100px" }}
                    spacing={0}
                  >
                    <Typography>Sale Price</Typography>
                    <TextField
                      sx={{ width: "150px" }}
                      type="number"
                      name="salePrice"
                      variant="outlined"
                      {...formik.getFieldProps("salePrice")}
                    />
                    {formik.touched.salePrice && formik.errors.salePrice ? (
                      <div>{formik.errors.salePrice}</div>
                    ) : null}
                  </Grid>
                </Grid>
              </Grid>

              <Grid container spacing={1}>
                <Grid item xs={4}></Grid>
                <Grid item xs={8} className="product-form-input-area">
                  <FormControlLabel
                    name="isOnSale"
                    control={<Checkbox />}
                    label="On Sale"
                    {...formik.getFieldProps("isOnSale")}
                    onClick={() => {
                      changeHandlerIsOnSale(event);
                    }}
                  />
                  {formik.touched.isOnSale && formik.errors.isOnSale ? (
                    <div>{formik.errors.isOnSale}</div>
                  ) : null}

                  <FormControlLabel
                    name="freeShipping"
                    control={<Checkbox />}
                    label="Free Shipping"
                    {...formik.getFieldProps("freeShipping")}
                    onClick={() => {
                      changeHandlerFreeShipping(event);
                    }}
                  />
                  {formik.touched.freeShipping && formik.errors.freeShipping ? (
                    <div>{formik.errors.freeShipping}</div>
                  ) : null}
                  <FormControlLabel
                    name="inStock"
                    control={<Checkbox />}
                    label="In Stock"
                    {...formik.getFieldProps("inStock")}
                    onClick={() => {
                      changeHandlerInStock(event);
                    }}
                  />
                  {formik.touched.inStock && formik.errors.inStock ? (
                    <div>{formik.errors.inStock}</div>
                  ) : null}
                </Grid>
              </Grid>

              <Grid container spacing={1}>
                <Grid item xs={4}>
                  <Typography>Image</Typography>
                </Grid>
                <Grid item xs={8} className="product-form-input-area">
                  <TextField
                    name="imageUrl"
                    variant="outlined"
                    {...formik.getFieldProps("imageUrl")}
                  />
                  {formik.touched.imageUrl && formik.errors.imageUrl ? (
                    <div>{formik.errors.imageUrl}</div>
                  ) : null}
                </Grid>
              </Grid>

              <Grid container spacing={1}>
                <Grid item xs={4}>
                  <Typography>Description</Typography>
                </Grid>
                <Grid item xs={8} className="product-form-input-area">
                  <Textarea
                    name="description"
                    sx={{ width: "360px", height: "300px" }}
                    {...formik.getFieldProps("description")}
                  />
                  {formik.touched.description && formik.errors.description ? (
                    <div>{formik.errors.description}</div>
                  ) : null}
                </Grid>
              </Grid>

              <Button variant="contained" color="success" type="submit">
                Add Product
              </Button>
            </Box>
          </form>
        )}
      </Formik>
    </Box>
  );
};

export default SellerAddProduct;
