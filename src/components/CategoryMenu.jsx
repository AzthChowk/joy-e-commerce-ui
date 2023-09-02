import * as React from "react";
import { useTheme } from "@mui/material/styles";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";

const category = [
  "shirt",
  "pants",
  "sweatshirts",
  "jackets",
  "shoes",
  "t-shirts",
  "shirts",
];
function getStyles(name, personName, theme) {
  return {
    fontWeight:
      personName.indexOf(name) === -1
        ? theme.typography.fontWeightRegular
        : theme.typography.fontWeightMedium,
  };
}

const CategoryMenu = () => {
  const theme = useTheme();
  const [personName, setPersonName] = React.useState([]);

  const handleChange = (event) => {
    const {
      target: { value },
    } = event;
    setPersonName(
      // On autofill we get a stringified value.
      typeof value === "string" ? value.split(",") : value
    );
  };

  return (
    <>
      <FormControl sx={{ m: 0, width: 200, border: "0", outline: "0" }}>
        <InputLabel>Category</InputLabel>
        <Select>
          {category.map((name, index) => (
            <MenuItem key={index}>{name}</MenuItem>
          ))}
        </Select>
      </FormControl>
    </>
  );
};

export default CategoryMenu;
