import {
  Box,
  Button,
  Collapse,
  Grid,
  Hidden,
  Paper,
  Rating,
  TextField,
  Typography,
} from "@mui/material";
import { grey } from "@mui/material/colors";
import React, { useEffect, useState } from "react";
import numberWithCommas from "../../utils/numberWithCommas";
import ProductImages from "./ProductImages";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import ShoppingCartCheckoutIcon from "@mui/icons-material/ShoppingCartCheckout";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import { useDispatch } from "react-redux";
import { addCartItem } from "../../redux/CartSlice";
import { useNavigate } from "react-router-dom";
import ProductReviews from "./ProductReviews";
import InputQuantity from "../InputQuantity";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";

const ProductAttributes = ({ title, value }) => {
  return (
    <Box
      sx={{
        display: "flex",
        mb: 1,
        px: 1,
        "& *": { fontSize: "13px !important" },
      }}
    >
      <Box
        component={"span"}
        sx={{
          width: {
            xs: "50%",
            sm: "auto",
          },
          color: grey[700],
          mr: 1,
          whiteSpace: "nowrap",
        }}
      >
        {title}:
      </Box>
      <Typography
        sx={{ fontWeight: { xs: "normal", sm: "bold" }, flexGrow: 1 }}
      >
        {value}
      </Typography>
    </Box>
  );
};

const ProductView = ({ product }) => {
  const [quantity, setQuantity] = useState(1);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [expanded, setExpanded] = useState(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  const addToCart = () => {
    dispatch(
      addCartItem({
        ...product,
        quantity,
        image: product.image,
      })
    );
  };
  const goToCart = () => {
    addToCart();
    navigate("/cart");
  };
  const handleQuantityChange = (e, newValue) => {
    setQuantity(newValue);
  };

  useEffect(() => {}, []);

  return (
    <div>
      <Paper
        sx={{
          display: "flex",
          flexDirection: { xs: "column", sm: "row" },
          width: "100%",
        }}
      >
        <Box sx={{ flexBasis: "25%", textAlign: "center" }}>
          {/* <ProductImages image={product.image} /> */}
          {/* <ProductImages image={'https://picsum.photos/seed/picsum/200/300'} /> */}
          <Box
            component={"img"}
            src={"https://picsum.photos/seed/picsum/200/300"}
            alt={product.name}
            sx={{
              p: 1,
            }}
          />
        </Box>
        <Box sx={{ flexGrow: 1, p: 1, pl: { xs: 1, sm: 5 } }}>
          <Typography
            variant="h5"
            component={"h5"}
            sx={{ fontWeight: "bold" }}
            gutterBottom
          >
            {product.name}
          </Typography>
          <Box
            sx={{
              display: "flex",
              flexDirection: { xs: "column-reverse", sm: "column" },
            }}
          >
            <Grid container>
              <Typography
                sx={{
                  display: { xs: "block", sm: "none" },
                  width: "100%",
                  mt: 5,
                }}
                gutterBottom
                variant="h6"
              >
                Thông tin sản phẩm
              </Typography>
              {product.publisher && (
                <Grid item xs={12} md={6}>
                  <ProductAttributes
                    title={"Nhà xuất bản"}
                    value={product.publisher.name}
                  />
                </Grid>
              )}

              {product.author && product.author.length > 0 && (
                <Grid item xs={12} md={6}>
                  <ProductAttributes
                    title={"Tác giả"}
                    value={product.author.join(", ")}
                  />
                </Grid>
              )}
              {product.bookLayout && (
                <Grid item xs={12} md={6}>
                  <ProductAttributes
                    title={"Hình thức bìa"}
                    value={product.bookLayout}
                  />
                </Grid>
              )}
            </Grid>
            <div>
              <Box>
                <Rating readOnly defaultValue={product.rating} />
              </Box>
              <Box>
                <Typography
                  component={"span"}
                  variant="h5"
                  sx={{ fontWeight: "bold" }}
                  color="red"
                >
                  {numberWithCommas(product.price)} VNĐ
                </Typography>
              </Box>
            </div>
          </Box>
          <Box
            sx={{
              display: "flex",
              boxShadow: { xs: "0 2px 4px black", sm: 0 },
              alignItems: { xs: "center", sm: "start" },
              flexDirection: { xs: "row", sm: "column" },
              position: { xs: "fixed", sm: "static" },
              bottom: 0,
              left: 0,
              right: 0,
              bgcolor: "white",
              zIndex: { xs: 1100, sm: 0 },
            }}
          >
            <Box sx={{ flexShrink: 2 }}>
              {/* <Box sx={{ display: 'flex', py: 2 }}>
                <IconButton onClick={() => updateQuantity('minus')}>
                  <RemoveIcon />
                </IconButton>
                <TextField size="small" value={quantity} onChange={handleQuantityChange}
                  InputProps={{ inputProps: { style: { textAlign: "center" } } }}
                />
                <IconButton onClick={() => updateQuantity('plus')}>
                  <AddIcon />
                </IconButton>
              </Box> */}
              <InputQuantity
                quantity={quantity}
                onChange={handleQuantityChange}
              />
            </Box>
            <Box
              sx={{
                flexGrow: 1,
                flexShrink: 1,
                display: "flex",
                p: 1,
                "& *": { fontSize: 13, textTransform: "none" },
              }}
            >
              <Button
                variant="outlined"
                startIcon={
                  <Hidden mdDown>
                    <AddShoppingCartIcon />
                  </Hidden>
                }
                onClick={addToCart}
                sx={{ mr: { xs: 0, sm: 2 } }}
              >
                Thêm vào giỏ hàng
              </Button>
              <Button
                variant="contained"
                onClick={goToCart}
                startIcon={
                  <Hidden mdDown>
                    <ShoppingCartCheckoutIcon />
                  </Hidden>
                }
              >
                Mua ngay
              </Button>
            </Box>
          </Box>
        </Box>
      </Paper>
      <Paper elevation={1} sx={{ p: 1, my: 1 }}>
        <Typography variant="h6">Mô tả</Typography>
        <Collapse in={expanded} timeout="auto" collapsedSize={22}>
          <Typography
            variant="span"
            component={"div"}
            sx={{ fontSize: 14, textIndent: 24 }}
          >
            {product.description ? (
              product.description
            ) : (
              <small>
                <em>(Chưa có mô tả)</em>
              </small>
            )}
          </Typography>
        </Collapse>
        {product.description && (
          <Button sx={{ width: "100%" }} onClick={handleExpandClick}>
            {expanded ? <ExpandLessIcon /> : <ExpandMoreIcon />}
          </Button>
        )}
      </Paper>
      <Paper>
        <ProductReviews id={product._id} />
      </Paper>
    </div>
  );
};

export default ProductView;
