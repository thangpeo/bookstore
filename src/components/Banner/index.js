import { Box, Container, IconButton } from "@mui/material";
import React from "react";
import Carousel from "react-slick";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";

const BannerButton = ({ children, onClick }) => (
  <IconButton
    onClick={onClick}
    sx={{
      border: 1,
      borderColor: "gray",
      bgcolor: "white",
      transition: "transform 0.2s",
      "&:hover": {
        transform: "scale(1.2)",
        fontSize: 1,
        transition: "transform 0.2s",
        bgcolor: "white",
      },
    }}
  >
    {children}
  </IconButton>
);

const PrevButton = ({ ...props }) => (
  <Box
    sx={{
      position: "absolute",
      letf: 0,
      top: "50%",
      transform: "translateY(50%)",
      zIndex: 1,
    }}
  >
    <BannerButton {...props}>
      <ChevronLeftIcon fontSize="small" />
    </BannerButton>
  </Box>
);

const NextButton = ({ ...props }) => (
  <Box
    sx={{
      position: "absolute",
      right: 0,
      top: "50%",
      transform: "translateY(50%)",
    }}
  >
    <BannerButton {...props}>
      <ChevronRightIcon fontSize="small" />
    </BannerButton>
  </Box>
);
const Banner = ({ children }) => {
  const settings = {
    infinite: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    swipeToSlide: true,
    autoplay: true,
    speed: 1000, // thoi gian truot
    autoplaySpeed: 5000, // thoi gian nghi
    cssEase: "linear",
    prevArrow: <PrevButton />,
    nextArrow: <NextButton />,
    lazyLoad: true,
  };
  return (
    <Container sx={{ mb: 2 }}>
      <Box sx={{ px: 5, py: 1, minHeight: '100vh' }}>
        <Carousel {...settings}>{children}</Carousel>
      </Box>
    </Container>
  );
};

export default Banner;
