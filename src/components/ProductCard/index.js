import {
  Alert,
  Box,
  Button,
  Card,
  CardActionArea,
  CardActions,
  CardContent,
  CardMedia,
  Portal,
  Snackbar,
  Typography,
} from "@mui/material";
import React from "react";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import { Link } from "react-router-dom";
import numberWithCommas from "../../utils/numberWithCommas";
import { useDispatch } from "react-redux";
import { addCartItem } from "../../redux/CartSlice";

const ProductCard = ({ product, ...props }) => {
  const dispatch = useDispatch();
  const [open, setOpen] = React.useState(false);
  const bodyElement = document.body;
  const handleClickAddToCart = () => {
    setOpen(true);
    dispatch(
      addCartItem({
        ...product,
        quantity: 1,
      })
    );
  };
  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <Card
        variant="outlined"
        sx={{
          borderBottomLeftRadius: 0,
          borderBottomRightRadius: 0,
          borderBottom: 0,
          display: "block",
          textDecoration: "none",
        }}
        component={Link}
        to={`/productdetail/${product._id}`}
        {...props}
      >
        <CardActionArea>
          <CardMedia
            component="img"
            // image={`${product.image}`}
            image={`https://picsum.photos/seed/picsum/200/300`}
            alt={product.name}
            loading={"lazy"}
            height={160}
            sx={{
              "&.MuiCardMedia-img": { mx: "auto", width: "auto" },
              p: 1,
            }}
          />
          <CardContent>
            <Typography
              gutterBottom
              component="div"
              sx={{
                fontSize: 14,
                display: "-webkit-box",
                overflow: "hidden",
                WebkitBoxOrient: "vertical",
                WebkitLineClamp: 2,
                height: 42,
              }}
            >
              {product.name}
            </Typography>
            <Typography
              gutterBottom
              component="p"
              noWrap
              sx={{
                fontSize: 16,
                fontWeight: "bold",
                color: "error.main",
              }}
            >
              {product.discount > 0
                ? numberWithCommas(product.price * (1 - product.discount))
                : numberWithCommas(product.price)}
              {" VNĐ"}
            </Typography>
            {product.discount > 0 && (
              <Typography
                gutterBottom
                component="p"
                noWrap
                sx={{
                  fontSize: 14,
                  color: "GrayText",
                  textDecoration: "line-through",
                }}
              >
                {numberWithCommas(product.price * (1 - product.discount))} VNĐ
              </Typography>
            )}
          </CardContent>
        </CardActionArea>
      </Card>
      <Box sx={{ display: "flex" }}>
        <Button
          component={Button}
          variant={"contained"}
          color={"secondary"}
          startIcon={<AddShoppingCartIcon />}
          sx={{
            fontSize: 14,
            textTransform: "none",
            flexGrow: 1,
            borderTopLeftRadius: 0,
            borderTopRightRadius: 0,
          }}
          onClick={() => handleClickAddToCart()}
        >
          Thêm vào giỏ hàng
        </Button>
      </Box>
      <Portal container={bodyElement}>
        <Snackbar
          open={open}
          autoHideDuration={6000}
          onClose={handleClose}
          anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
        >
          <Alert
            onClose={handleClose}
            severity="success"
            sx={{ maxWidth: 200 }}
          >
            Đã thêm {product.name} vào giỏ hàng
          </Alert>
        </Snackbar>
      </Portal>
    </div>
  );
};

export default ProductCard;
