import { Box, Button, Paper, Typography, Link as LinkMUI } from "@mui/material";
import { grey } from "@mui/material/colors";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import CartItem from "../components/CartItem";
import { Link } from "react-router-dom";
import numberWithCommas from "../utils/numberWithCommas";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import { removeCart } from "../redux/CartSlice";
import DeleteIcon from "@mui/icons-material/Delete";
import Helmet from "../components/Helmet";

const Cart = () => {
  const { cartItems } = useSelector((state) => state.cart);
  const [totalPrice, setTotalPrice] = React.useState(0);
  const dispatch = useDispatch();

  const onRemoveCartClick = () => {
    dispatch(removeCart());
  };
  React.useEffect(() => {
    setTotalPrice(
      cartItems.reduce(
        (preValue, item) => preValue + item.price * item.quantity,
        0
      )
    );
  }, [cartItems]);

  return (
    <Helmet title="Giỏ hàng">
      {cartItems.length <= 0 ? (
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Box
            component={"img"}
            src={"https://brabantia.com.vn/images/cart-empty.png"}
            alt=""
            sx={{ height: 300 }}
          />
          <Typography gutterBottom variant="h6">
            Không có gì trong giỏ
          </Typography>
          <Button
            variant="contained"
            LinkComponent={Link}
            to={`/`}
            color={"error"}
          >
            Tiếp tục mua hàng
          </Button>
        </Box>
      ) : (
        <>
          <Box
            sx={{
              display: "flex",
              flexDirection: { xs: "column-reverse", sm: "row" },
            }}
          >
            <Box sx={{ flexGrow: 1, flexBasis: "75%" }}>
              <Box sx={{ mb: 2 }}>
                <Paper
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    p: 2,
                    mb: 1,
                    fontSize: 20,
                  }}
                >
                  <Typography
                    sx={{
                      textTransform: "uppercase",
                      display: { xs: "none", sm: "block" },
                    }}
                    variant="h6"
                  >
                    Giỏ hàng
                  </Typography>
                  <Typography variant="h6">
                    {cartItems.length} sản phẩm
                  </Typography>
                </Paper>
                <Box textAlign={"right"}>
                  <Button
                    variant={"contained"}
                    color="error"
                    onClick={onRemoveCartClick}
                    startIcon={<DeleteIcon />}
                  >
                    Xóa tất cả sản phẩm
                  </Button>
                </Box>
                <Box>
                  {cartItems.map((item) => (
                    <CartItem key={item._id} product={item} />
                  ))}
                </Box>
              </Box>
              <Box>
                <LinkMUI
                  component={Link}
                  to={"/"}
                  sx={{ display: "inline-flex", alignItems: "center", p: 1 }}
                >
                  <ArrowBackIcon /> Tiếp tục mua hàng
                </LinkMUI>
              </Box>
            </Box>
            <Box
              sx={{ display: { xs: "none", sm: "block" }, flexBasis: "25%" }}
            >
              <Paper sx={{ bgcolor: grey[50], px: 1 }}>
                <Typography
                  variant="h6"
                  sx={{
                    textTransform: "uppercase",
                    fontWeight: "bold",
                    fontSize: 20,
                    p: 1,
                    borderBottom: 1,
                    borderColor: "divider",
                  }}
                >
                  Thanh toán
                </Typography>
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    p: 1,
                  }}
                >
                  <Typography
                    variant="span"
                    noWrap
                    sx={{ fontSize: 14, color: "black", fontWeight: 500 }}
                  >
                    Tổng số tiền
                  </Typography>
                  <Typography
                    variant="span"
                    noWrap
                    sx={{ fontSize: 18, color: "red", fontWeight: 500 }}
                  >
                    {numberWithCommas(totalPrice)} VNĐ
                  </Typography>
                </Box>
                <Box
                  sx={{
                    textAlign: "center",
                    p: 1,
                    borderTop: 1,
                    borderColor: "divider",
                  }}
                >
                  <Button
                    variant="contained"
                    color="error"
                    disableElevation
                    LinkComponent={Link}
                    to={"/checkout"}
                  >
                    Thanh toán
                  </Button>
                </Box>
              </Paper>
            </Box>
          </Box>
          <Box
            sx={{
              display: { xs: "flex", sm: "none" },
              position: "fixed",
              bottom: 0,
              left: 0,
              right: 0,
              backgroundColor: "white",
              zIndex: 1,
            }}
          >
            <Box
              sx={{
                flexGrow: 1,
                pl: 1,
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
              }}
            >
              <Typography
                variant="span"
                sx={{ fontSize: 16, color: "black", fontWeight: "bold" }}
              >
                Tổng số tiền
              </Typography>
              <Typography
                variant="span"
                sx={{ fontSize: 18, color: "red", fontWeight: "bold" }}
              >
                {numberWithCommas(totalPrice)} VNĐ
              </Typography>
            </Box>
            <Button
              variant="contained"
              color="error"
              sx={{ textTransform: "none" }}
              endIcon={<ArrowForwardIcon />}
              disableElevation
              LinkComponent={Link}
              to={"/checkout"}
            >
              Thanh toán
            </Button>
          </Box>
        </>
      )}
    </Helmet>
  );
};

export default Cart;
