import {
  Box,
  ListItemText,
  MenuItem,
  MenuList,
  Paper,
  Typography,
} from "@mui/material";
import React from "react";
import { useSelector } from "react-redux";
import { Link, Navigate, Outlet, useNavigate } from "react-router-dom";
import Helmet from "../components/Helmet";

const navItems = [
  {
    text: "Thông tin tài khoản",
    to: "/account",
  },
  {
    text: "Đổi mật khẩu",
    to: "/account/changepassword",
  },
  {
    text: "Đơn hàng",
    to: "/account/order",
  },
  {
    text: "Địa chỉ giao hàng",
    to: "/account/shippingaddress",
  },
  {
    text: "Sản phẩm yêu thích",
    to: "/account/wishlist",
  },
];

const Account = () => {
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  const navigate = useNavigate();
  const onMenuItemClick = (link) => {
    navigate(link);
  };
  if (!isLoggedIn) {
    return <Navigate to="/login" replace />;
  }
  return (
    <Helmet title="Tài khoản">
      <Box
        sx={{
          display: "flex",
          flexDirection: { xs: "column-reverse", sm: "row" },
        }}
      >
        <Box sx={{ flexBasis: "25%" }}>
          <Paper>
            <Typography
              variant="h5"
              gutterBottom
              sx={{
                color: "primary.main",
                p: 1,
                borderBottom: 1,
                borderColor: "divider",
              }}
              align="center"
            >
              Tài khoản
            </Typography>
            <MenuList>
              {navItems.map((item, index) => {
                return (
                  <MenuItem
                    key={index}
                    sx={{ borderBottom: 1, borderColor: "divider" }}
                    onClick={() => onMenuItemClick(item.to)}
                  >
                    <ListItemText primary={item.text} />
                  </MenuItem>
                );
              })}
            </MenuList>
          </Paper>
        </Box>
        <Box sx={{ flexGrow: 1 }}>
          <Outlet />
        </Box>
      </Box>
    </Helmet>
  );
};

export default Account;
