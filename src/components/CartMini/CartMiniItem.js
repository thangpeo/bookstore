import { Box, Typography } from "@mui/material";
import { grey } from "@mui/material/colors";
import React from "react";
import { Link } from "react-router-dom";
import convertImageBase64 from "../../utils/convertImageBase64";
import numberWithCommas from "../../utils/numberWithCommas";

const CartMiniItem = ({ product }) => {
  return (
    <div>
      <Box
        component={Link}
        to={`/ProductDetail/${product._id}`}
        sx={{
          display: "flex",
          mb: 1,
          textDecoration: "none",
          color: "inherit",
          width: "100%",
          "& *": { fontSize: 13 },
        }}
      >
        <Box
          component={"img"}
          src={product.image}
          alt={product.name}
          sx={{ width: 80, height: 80, flexShrink: 0 }}
        />
        <Box
          sx={{ flexGrow: 1, display: "flex", flexDirection: "column",justifyContent:'space-between', px: 1 }}
        >
          <Typography component={"span"}>{product.name}</Typography>
          <Typography component={"span"} sx={{ fontWeight: "bold" }}>
            {numberWithCommas(product.price)} VNĐ
            <Typography
              sx={{ fontSize: 14 }}
              component={"span"}
              color={grey[700]}
            >
              x{product.quantity}
            </Typography>
          </Typography>
        </Box>
      </Box>
    </div>
  );
};

export default CartMiniItem;
