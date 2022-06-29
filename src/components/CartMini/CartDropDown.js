import { Box, Button, Paper, Typography } from "@mui/material";
import { red } from "@mui/material/colors";
import React from "react";
import CartMiniItem from "./CartMiniItem";
import { useSelector } from "react-redux";
import numberWithCommas from "../../utils/numberWithCommas";
import convertImageBase64 from "../../utils/convertImageBase64";
import EmptyCart from "../../assets/images/emptycart.svg";
import { useNavigate } from "react-router-dom";

const CartDropDown = () => {
  const { cartItems } = useSelector((state) => state.cart);
  const navigate = useNavigate();
  const [totalPrice, setTotalPrice] = React.useState(0);
  React.useEffect(() => {
    setTotalPrice(
      cartItems.reduce(
        (preValue, item) => preValue + item.price * item.quantity,
        0
      )
    );
  }, [cartItems]);

  return (
    <Paper>
      <Typography
        component={"h6"}
        variant="h6"
        sx={{ borderBottom: 1, borderColor: "divider", p: 1 }}
      >
        Giỏ hàng {cartItems.length}
      </Typography>
      {cartItems.length <= 0 ? (
        <Box sx={{ display: "flex", justifyContent: "center", p: 2 }}>
          <img src={EmptyCart} alt="cart is empty" />
        </Box>
      ) : (
        <>
          <Box sx={{ p: 1, width: 400, maxHeight: 300, overflow: "auto" }}>
            {cartItems.map((item, index) => (
              <CartMiniItem key={index} product={item} />
            ))}
          </Box>
          <Box sx={{ display: "flex", justifyContent: "space-between", p: 1 }}>
            <Box sx={{ display: "flex", flexDirection: "column" }}>
              <Typography>Tổng cộng</Typography>
              <Typography color={red[500]}>
                {numberWithCommas(totalPrice)} đ
              </Typography>
            </Box>
            <Button
              variant="contained"
              sx={{
                bgcolor: red[700],
                "&:hover": { bgcolor: red[600] },
              }}
              onClick={() => navigate("/cart")}
            >
              Thanh toán
            </Button>
          </Box>
        </>
      )}
    </Paper>
  );
};

export default CartDropDown;
