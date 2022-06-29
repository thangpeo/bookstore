import React, { useState, useEffect, useRef } from "react";
import AppBar from "@mui/material/AppBar";
import {
  Box,
  Container,
  Hidden,
  IconButton,
  Toolbar,
  Typography,
  Link as LinkMui,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import SideBar from "../SideBar";

import SearchInput from "../SearchInput";

import WidgetsIcon from "@mui/icons-material/Widgets";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import CatalogMenuDropdown from "../CatalogMenuDropdown";
import CartMini from "../CartMini";
import AccountTop from "../AccountTop";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

const Header = () => {
  const [openSideBar, setOpenSideBar] = useState(false);
  const [openDropdownCatalog, setOpenDropdownCatalog] = useState(false);

  const headerRef = useRef(null);

  const closeSideBar = () => {
    setOpenSideBar(false);
  };
  const showSideBar = () => {
    setOpenSideBar(true);
  };

  const showDropdownMenu = () => {
    setOpenDropdownCatalog(true);
  };
  const closeDropdownMenu = () => {
    setOpenDropdownCatalog(false);
  };
  useEffect(() => {
    if (headerRef && headerRef.current) {
      document.body.style.paddingTop = headerRef.current.clientHeight + "px";
      headerRef.current.onresize = () => {
        document.body.style.paddingTop = headerRef.current.clientHeight + "px";
      };
    }
  }, [headerRef]);

  return (
    <>
      <AppBar position="fixed" elevation={0} ref={headerRef}>
        <Toolbar sx={{ flexWrap: { xs: "wrap", sm: "nowrap" } }}>
          <Box
            sx={{
              width: {
                xs: "100%",
                sm: "auto",
              },
              p: 1,
            }}
          >
            <Link to="/">
              <Box
                component={"img"}
                src="https://cdn0.fahasa.com/skin/frontend/ma_vanese/fahasa/images/logo/fahasa_logo.png"
                fit="contain"
                alt="Logo"
              />
            </Link>
          </Box>
          <Box sx={{ flexGrow: 1, display: "flex" }}>
            <Box sx={{ display: { xs: "block", sm: "none" } }}>
              <IconButton color="inherit" onClick={showSideBar}>
                <MenuIcon />
              </IconButton>
              <SideBar open={openSideBar} onClose={closeSideBar} />
            </Box>
            <Box sx={{ display: { xs: "none", sm: "block" } }}>
              <Typography
                variant="span"
                component="span"
                color="inherit"
                sx={{
                  cursor: "pointer",
                  "&::before": {
                    content: '""',
                    position: "absolute",
                    display: "none",
                    height: "100%",
                    top: "90%",
                    left: 0,
                    right: 0,
                  },
                  "&:hover::before": {
                    display: "block",
                    // bgcolor: 'blue'
                  },
                }}
                onMouseEnter={showDropdownMenu}
                onMouseLeave={closeDropdownMenu}
              >
                <IconButton
                  component={Link}
                  to={"/products"}
                  sx={{
                    p: 2,
                    color: "inherit",
                    "&:hover": { bgcolor: "unset" },
                  }}
                >
                  <WidgetsIcon />
                  <KeyboardArrowDownIcon fontSize="small" />
                </IconButton>
                <CatalogMenuDropdown
                  open={openDropdownCatalog}
                  sx={{
                    position: "absolute",
                    top: "100%",
                    left: 0,
                    right: 0,
                  }}
                />
              </Typography>
            </Box>
            <SearchInput />
            <CartMini />
            <AccountTop />
          </Box>
        </Toolbar>
      </AppBar>
    </>
  );
};
export default Header;
