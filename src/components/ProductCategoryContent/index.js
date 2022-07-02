import { Box, Paper, Typography } from "@mui/material";
import React from "react";
import CategoryIcon from "@mui/icons-material/Category";
import Carousel from "react-slick";
import { Link } from "react-router-dom";
import convertImageBase64 from "../../utils/convertImageBase64";

const ProductCategoryItem = ({ src, label, href = "" }) => (
  <Box
    sx={{
      display: "flex",
      flexDirection: "column",
      textAlign: "center",
      mr: 1,
      fontSize: 13,
      textDecoration: "none",
      color: "black",
      "&:hover": {
        color: "primary.light",
      },
    }}
    component={Link}
    to={`${href}`}
  >
    <Box
      component={"img"}
      src={src}
      alt={label}
      sx={{ width: 80, height: 120, mx: "auto" }}
    />
    <span>{label}</span>
  </Box>
);

const settingsCarousel = {
  infinite: false,
  speed: 500,
  slidesToScroll: 2,
  arrows: false,
  autoplay: true,
};

const ProductCategoryContent = ({ categories }) => {
  const slides = 8;
  return (
    <Paper elevation={2} sx={{ mb: 2 }}>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          p: 1,
          borderBottom: 1,
          borderColor: "divider",
        }}
      >
        <CategoryIcon fontSize="large" sx={{ px: 1 }} color="primary" />
        <Typography component={"span"} variant="h6" sx={{ fontWeight: "bold" }}>
          Danh mục sản phẩm
        </Typography>
      </Box>
      <Box
        sx={{
          p: 1,
        }}
      >
        <Carousel slidesToShow={slides} {...settingsCarousel}>
          {categories.map((item, index) => (
            <ProductCategoryItem
              key={index}
              src={item.product ? item.product.image : ""}
              label={`${item.name}`}
              href={`/products?category=${item._id}`}
            />
          ))}
        </Carousel>
      </Box>
    </Paper>
  );
};

export default ProductCategoryContent;
