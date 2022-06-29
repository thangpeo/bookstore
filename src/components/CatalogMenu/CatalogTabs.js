import { Box, Tab, Tabs, Typography } from "@mui/material";
import { grey } from "@mui/material/colors";
import React from "react";
import { Link, useNavigate } from "react-router-dom";
import CatalogTabPanel from "./CatalogTabPanel";

const CatalogTabs = ({ data, nonActiveTab = false }) => {
  const [value, setValue] = React.useState(0); //tabs value
  const navigate = useNavigate();
  const handleChange = (e, newValue) => {
    setValue(newValue);
  };
  const handleMouseEnter = (newValue) => {
    setValue(newValue);
  };
  const handleTabClick = (idCategory) => {
    if (!nonActiveTab) {
      navigate(`/products/${idCategory}`);
    }
  };
  return (
    data && (
      <Box sx={{ display: "flex", flexGrow: 1 }}>
        <Box sx={{ maxWidth: "35%" }}>
          <Typography
            variant="h6"
            component={"h6"}
            sx={{
              fontWeight: "bold",
              color: "inherit",
              px: 1,
              display: {
                xs: "none",
                sm: "block",
              },
            }}
          >
            Danh mục sản phẩm
          </Typography>
          <Tabs
            orientation="vertical"
            value={value}
            onChange={handleChange}
            sx={{
              borderRight: 1,
              borderColor: { xs: "transparent", sm: "divider" },
              "& .MuiTabs-indicator": {
                left: "0",
              },
            }}
          >
            {data.map((item, index) => (
              <Tab
                onMouseEnter={() => handleMouseEnter(index)}
                onClick={() => handleTabClick(item._id)}
                key={index}
                label={item.name}
                sx={{
                  p: { xs: "12px 8px" },
                  bgcolor: {
                    xs: grey[50],
                    sm: "white",
                  },

                  "&.Mui-selected ": {
                    bgcolor: {
                      xs: "white",
                      sm: grey[100],
                    },
                  },
                  borderBottom: 1,
                  borderColor: { xs: "divider", sm: "transparent" },
                  borderRadius: {
                    sm: 1,
                  },
                }}
              />
            ))}
          </Tabs>
        </Box>
        {data.map((item, index) => (
          <CatalogTabPanel
            value={value}
            index={index}
            key={index}
            item={item}
            hasAllItem={nonActiveTab}
          />
        ))}
      </Box>
    )
  );
};

export default CatalogTabs;
