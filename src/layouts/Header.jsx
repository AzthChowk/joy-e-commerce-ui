import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { Button, Popover, Stack, Typography } from "@mui/material";
import Badge from "@mui/material/Badge";
import IconButton from "@mui/material/IconButton";
import { styled } from "@mui/material/styles";
import React, { useEffect, useState } from "react";
import { FiSearch } from "react-icons/fi";
import { Link, useNavigate } from "react-router-dom";
import AccountMenu from "../components/AccountMenu";
import CategoryMenu from "../components/CategoryMenu";

import "./header.css";

//icons
import FacebookIcon from "@mui/icons-material/Facebook";
import InstagramIcon from "@mui/icons-material/Instagram";
import TwitterIcon from "@mui/icons-material/Twitter";

const StyledBadge = styled(Badge)(({ theme }) => ({
  "& .MuiBadge-badge": {
    right: -3,
    top: 13,
    border: `2px solid ${theme.palette.background.paper}`,
    padding: "0 4px",
  },
}));

//display username from the data in token stored in localStorage.
// const isUserLoggedInCheck = localStorage.getItem("isUserLoggedIn");

const Header = () => {
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;
  const [toggler, setToggler] = useState(false);
  const [isUserLoggedIn, setIsUserLoggedIn] = useState(false);
  const [loggedInUserName, setLoggedInUserName] = useState(
    localStorage.getItem("userName")
  );
  console.log("hi", isUserLoggedIn);
  console.log(localStorage.getItem("isLoggedIn"));
  const navigate = useNavigate();
  const removeAccessToken = () => {
    localStorage.clear();
    setIsUserLoggedIn(false);
    setToggler(!toggler);
    console.log("Logged out.");
    handleClose();
    navigate("/");
  };

  useEffect(() => {
    const isUserLoggedInCheck = () => {
      const check = localStorage.getItem("isLoggedIn");
      setIsUserLoggedIn(check);
    };
    isUserLoggedInCheck();
  }, [!toggler, isUserLoggedIn]);

  //Stack ITEM
  return (
    <div className="fluid-container navbar">
      <div className="container top-navbar">
        <div className="logo">
          <img src="/logo.svg" alt="" />
        </div>

        <div className="input-search">
          {/* <CategoryMenu /> */}
          <input type="text" placeholder="Searching for" />
          <button>
            <FiSearch size="26px" color="#5e6360" />
          </button>
        </div>

        <div className="account-cart">
          {isUserLoggedIn ? (
            <>
              <Button onClick={handleClick} sx={{ fontWeight: "600" }}>
                Log out
              </Button>
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
                <Typography sx={{ p: 2 }}>Are you sure to log out?</Typography>
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
                    onClick={removeAccessToken}
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
            </>
          ) : (
            <button className="btn-signIn-logOut">
              <Link to="/login">Sign in</Link>
            </button>
          )}
          {isUserLoggedIn ? <AccountMenu /> : <h4>Hello! Guest</h4>}

          <IconButton aria-label="cart">
            <StyledBadge badgeContent={5} color="primary">
              <ShoppingCartIcon sx={{ fontSize: "32px" }} />
            </StyledBadge>
          </IconButton>
        </div>
      </div>
      <div className="container menu-navbar">
        <div className="menu-navbar-item">
          <ul>
            <li>new arrivals</li>
            <li>mens</li>
            <li>womens</li>
            <li>accessories</li>
            <li>bagpacks</li>
            <li>shoes</li>
            <li>sale</li>
          </ul>
        </div>
        <div className="social-media-icon">
          <FacebookIcon />
          <TwitterIcon />
          <InstagramIcon />
        </div>
      </div>
    </div>
  );
};

export default Header;
