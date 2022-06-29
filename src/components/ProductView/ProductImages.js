import { Box } from "@mui/material";
import { useTheme } from "@mui/system";
import React, { useState } from "react";
import Slider from "react-slick";
import convertImageBase64 from "../../utils/convertImageBase64";

const ProductImages = ({ image }) => {
  const theme = useTheme();
  const settings = {
    dots: false,
    arrows: false,
    infinite: false,
    slidesToShow: 3,
    slidesToScroll: 1,
    lazyLoad: true,
    vertical: true,
    verticalSwiping: true,
    responsive: [
      {
        breakpoint: theme.breakpoints.values.sm,
        settings: {
          vertical: false,
          verticalSwiping: false,
          slidesToShow: 1,
          slidesToScroll: 1,
          // swipeToSlide: true,
        },
      },
    ],
  };
  const [previewImg, setPreviewImg] = useState(image ?? null);
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: { xs: "column-reverse", sm: "row" },
        width: "100%",
      }}
    >
      {/* <Box sx={{ width: { xs: "100%", maxHeight: 400, overflow: 'hidden',sm:124 }, mr: 1}}>
                <Slider {...settings}>
                    {
                        images.map((image, index) =>
                            <div key={index} >
                                <Box
                                    onClick={() => setPreviewImg(image)}
                                    component={"img"}
                                    src={convertImageBase64(image)}
                                    sx={{ width: { xs: '100%', sm:120 }, height: { xs: '100%', sm:120 }, border: 1, borderColor: 'transparent', borderRadius: 1, "&:hover": { borderColor: "primary.main" } }}
                                    alt=""
                                />
                            </div>
                        )
                    }
                </Slider>
            </Box> */}
      <Box
        sx={{
          flexGrow: 1,
        //   display: { xs: "none", sm: "block" },
          height: { xs: "100%", sm: 360 },
          width: { xs: "100%", sm: 360 },
        }}
      >
        <Box
          component={"img"}
          src={previewImg}
          alt=""
          sx={{
            height: "100%",
            width: "100%",
            p: 1,
          }}
        />
      </Box>
    </Box>
  );
};

export default ProductImages;
