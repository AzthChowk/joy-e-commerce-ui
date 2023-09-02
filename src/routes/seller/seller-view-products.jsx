import {
  Button,
  Grid,
  Stack,
  TablePagination,
  Typography,
} from "@mui/material";
import { Box } from "@mui/system";
import React, { useEffect, useState } from "react";
import { $axios } from "../../../lib/AxiosInstance";

import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";

import "./seller-view-products.css";

import Popover from "@mui/material/Popover";

//icons

import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import DriveFileRenameOutlineIcon from "@mui/icons-material/DriveFileRenameOutline";
import PreviewIcon from "@mui/icons-material/Preview";
import { useNavigate } from "react-router-dom";

const SellerViewProduct = () => {
  const [products, setProducts] = useState([]);
  const [toggler, setToggler] = useState(false);
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;

  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };
  const handleDelete = async (_id) => {
    try {
      await $axios.delete(`/product/delete/${_id}`);
      setToggler(!toggler);
      handleClose();
    } catch (error) {
      console.log(error.message);
    }
  };

  const navigate = useNavigate();
  const removeAccessToken = () => {
    localStorage.clear();
    setIsLoggedIn(false);
    setToggler(!toggler);
    console.log("Logged out.");
    handleClose();
    navigate("/");
  };
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const productList = await $axios.get("/products");
        console.log(productList.data);
        setProducts(productList.data);
      } catch (error) {
        console.log(error.message);
      }
    };
    fetchProducts();
  }, [toggler]);

  return (
    <Box>
      <Grid container sx={{ display: "flex", gap: "10px" }}>
        <Grid
          sx={{ backgroundColor: "grey", padding: "20px" }}
          className="summ-display-grid"
        >
          <Typography variant="h6" sx={{ textAlign: "center" }}>
            TOTAL PRODUCTS
          </Typography>

          <Typography
            variant="h2"
            sx={{ textAlign: "center", fontWeight: 900 }}
          >
            {products.length}
          </Typography>
        </Grid>
        <Grid
          sx={{ backgroundColor: "grey", padding: "20px" }}
          className="summ-display-grid"
        >
          <Typography variant="h6" sx={{ textAlign: "center" }}>
            TOTAL SALES
          </Typography>

          <Typography
            variant="h2"
            sx={{ textAlign: "center", fontWeight: 900 }}
          >
            100K
          </Typography>
        </Grid>
      </Grid>

      {/* Table */}
      <Typography variant="h5" sx={{ padding: "15px 0", fontWeight: 900 }}>
        Product List
      </Typography>
      <TableContainer component={Paper} className="product-tbl">
        <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
          <TableHead>
            <TableRow>
              <TableCell sx={{ fontWeight: 800 }}>SN</TableCell>
              <TableCell sx={{ fontWeight: 800 }} align="left">
                Image
              </TableCell>
              <TableCell sx={{ fontWeight: 800 }}>Product Name</TableCell>
              <TableCell sx={{ fontWeight: 800 }} align="left">
                Category
              </TableCell>
              <TableCell sx={{ fontWeight: 800 }} align="left">
                Brand/Company
              </TableCell>
              <TableCell sx={{ fontWeight: 800 }} align="left">
                Size
              </TableCell>
              <TableCell sx={{ fontWeight: 800 }} align="left">
                Color
              </TableCell>
              <TableCell sx={{ fontWeight: 800 }} align="left">
                Quantity
              </TableCell>
              <TableCell sx={{ fontWeight: 800 }} align="left">
                Regular Price
              </TableCell>
              <TableCell sx={{ fontWeight: 800 }} align="left">
                Sale Price
              </TableCell>

              <TableCell sx={{ fontWeight: 800 }} align="left">
                View / Edit / Delete
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {products
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((item, index) => (
                <TableRow
                  key={item._id}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell component="th" scope="row">
                    {index + 1}
                  </TableCell>
                  <TableCell align="left">
                    <img
                      src={item.imageUrl}
                      alt=""
                      style={{
                        width: "50px",
                        height: "50px",
                        objectFit: "contain",
                      }}
                    />
                  </TableCell>
                  <TableCell component="th" scope="row">
                    {item.productName}
                  </TableCell>
                  <TableCell align="left">{item.category}</TableCell>
                  <TableCell align="left">{item.brand}</TableCell>
                  <TableCell align="left">{item.size}</TableCell>
                  <TableCell align="left">{item.color}</TableCell>
                  <TableCell align="left">{item.quantity}</TableCell>
                  <TableCell align="left">Rs. {item.regularPrice}</TableCell>
                  <TableCell align="left">Rs. {item.salePrice}</TableCell>
                  <TableCell align="left">
                    <Button>
                      <PreviewIcon />
                    </Button>
                    <Button>
                      <DriveFileRenameOutlineIcon />
                    </Button>

                    <Button onClick={handleClick}>
                      <DeleteOutlineIcon />
                      <Popover
                        id={id}
                        open={open}
                        anchorEl={anchorEl}
                        onClose={handleClose}
                        anchorOrigin={{
                          vertical: "bottom",
                          horizontal: "left",
                        }}
                      >
                        <Typography sx={{ p: 2 }}>
                          Are you sure to delete?
                        </Typography>
                        <Stack
                          spacing={{ xs: 1, sm: 2 }}
                          direction="row"
                          useFlexGap
                          flexWrap="wrap"
                          justifyContent={"center"}
                          padding={"5px"}
                        >
                          <Button
                            variant="outlined"
                            color="success"
                            onClick={() => {
                              handleDelete(item._id);
                            }}
                          >
                            Yes
                          </Button>
                          <Button
                            variant="outlined"
                            color="error"
                            onClick={handleClose}
                          >
                            No
                          </Button>
                        </Stack>
                      </Popover>
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>
      <Grid container sx={{ display: "flex", justifyContent: "flex-start" }}>
        <TablePagination
          rowsPerPageOptions={[10, 25, 100]}
          component="div"
          count={products.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Grid>
    </Box>
  );
};

export default SellerViewProduct;
