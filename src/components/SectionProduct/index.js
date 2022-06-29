import React, { useState } from "react";
import ProductSlider from "./ProductSlider";
import { Box, Button, Divider, Paper, Tabs, Typography } from "@mui/material";
import { CategoryTab, TabPanel } from "./CategoryTabs";
import { Link } from "react-router-dom";

const SeeMoreCategory = ({ link }) => {
  return (
    <Box sx={{ textAlign: "center", p: 1 }}>
      <Button component={Link} to={link} variant="outlined" color="primary">
        Xem thêm
      </Button>
    </Box>
  );
};

// type of tabs is [{label: string, onChange: ()=>void}]
const SectionProduct = ({
  products,
  title,
  tabs,
  loading,
  seeMoreLink = "#",
}) => {
  const [curTab, setCurTab] = useState(0);
  const handleChangeTab = (e, newValue) => {
    setCurTab(newValue);
    if (tabs[newValue] && tabs[newValue].onChange) {
      tabs[newValue].onChange();
    }
  };

  return (
    <Box component={"section"}>
      <Typography gutterBottom variant="h5" align="center">
        {title}
      </Typography>
      <Paper sx={{ mb: 2 }}>
        <Box sx={{ mb: 1 }}>
          <Tabs
            onChange={handleChangeTab}
            value={curTab}
            variant={"scrollable"}
            scrollButtons
            TabIndicatorProps={{
              style: {
                display: "none",
              },
            }}
            sx={{
              borderBottom: 1,
              borderColor: "divider",
              "& .MuiTabs-scrollButtons svg": {
                fontSize: 24,
              },
            }}
          >
            {tabs &&
              tabs.map((tab, index) => (
                <CategoryTab label={tab.label} key={index} />
              ))}
          </Tabs>
        </Box>
        {products && products.length > 0 ? (
          <Box>
            <ProductSlider products={products} loading={loading} />
            <Divider sx={{mt :1}}/>
            <SeeMoreCategory link={seeMoreLink} />
          </Box>
        ) : (
          <Typography sx={{ p: 1, height: '200px' }} align="center">
            Chưa có sản phẩm
          </Typography>
        )}
      </Paper>
    </Box>
  );
};

export default SectionProduct;
