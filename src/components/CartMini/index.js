import React, { useState } from "react";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import CartDropDown from "./CartDropDown";
import { DropdownContent, DropdownWrapper } from "../CustomDropdown";
import { IconButton, useMediaQuery, useTheme } from "@mui/material";
import { Link } from "react-router-dom";

const CartMini = () => {
  const [openCartDropdown, setOpenCartDropdown] = useState(false);
  const showCartDropdown = () => {
    setOpenCartDropdown(true);
  };
  const closeCartDropdown = () => {
    setOpenCartDropdown(false);
  };
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.up("sm"));
  return (
    <DropdownWrapper
      sx={{ ml: "auto" }}
      onMouseEnter={showCartDropdown}
      onMouseLeave={closeCartDropdown}
    >
      <IconButton
        component={Link}
        to={"/cart"}
        color="inherit"
        sx={{ p: 2, "&:hover": { bgcolor: "unset" } }}
      >
        <ShoppingCartIcon />
      </IconButton>
      {matches && (
        <DropdownContent open={openCartDropdown} width={500}>
          <CartDropDown />
        </DropdownContent>
      )}
    </DropdownWrapper>
  );
};

export default CartMini;
