import * as React from "react";
import Typography from "@mui/material/Typography";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import Link from "@mui/material/Link";

function handleClick(event) {
  event.preventDefault();
  console.info("You clicked a breadcrumb.");
}

export default function CustomBreadCrumbs(props) {
  const { name } = props;
  return (
    <div role="presentation" onClick={handleClick}>
      <Breadcrumbs aria-label="breadcrumb" sx={{ padding: "5px 10px" }}>
        <Link underline="hover" color="inherit" href="/">
          JOY
        </Link>
        <Link
          underline="hover"
          color="inherit"
          href="/material-ui/getting-started/installation/"
        >
          Product Details
        </Link>
        <Typography sx={{ fontFamily: "Montserrat", fontWeight: 600 }}>
          {name}
        </Typography>
      </Breadcrumbs>
    </div>
  );
}
