import { Box } from "@mui/material";
import { useTheme } from "@mui/system";
import React, { useEffect, useState } from "react";
import Slider from "react-slick";
import ProductCard from "../ProductCard";

const ProductSlider = ({ products, loading }) => {
  const theme = useTheme();
  const [dragging, setDragging] = useState(false);

  const settings = {
    infinite: false,
    speed: 500,
    dots: false,
    arrows: false,
    slidesToShow: 5,
    slidesToScroll: 2,
    lazyLoad: true,
    beforeChange: () => {
      setDragging(true);
    },
    afterChange: () => {
      setDragging(false);
    },
    responsive: [
      {
        breakpoint: theme.breakpoints.values.md,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 2,
        },
      },
      {
        breakpoint: theme.breakpoints.values.sm,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        },
      },
    ],
  };

  return products && products.length > 0 && (
    <Box
      sx={{
        p: 1,
      }}
    >
      <Slider {...settings}>
        {products.map((p, index) => (
          <div key={index}>
            <Box sx={{ mr: 2 }}>
              <ProductCard
                product={p}
                onClick={(e) => {
                  dragging && e.preventDefault();
                }}
              />
            </Box>
          </div>
        ))}
      </Slider>
    </Box>
  ) 
};

export default ProductSlider;
