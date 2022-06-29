import { Box, Tab } from "@mui/material";
import React from "react";

export const CategoryTab = ({ ...props }) => {
  return (
    <Tab
      disableRipple
      sx={{
        mr: 1,
        textTransform: "none",
      }}
      {...props}
    />
  );
};

export const TabPanel = ({ index, value, children, ...props }) => {
  return (
    <Box hidden={index !== value} {...props}>
      {children}
    </Box>
  );
};
