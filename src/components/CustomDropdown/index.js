import { Box, Paper } from "@mui/material";
import React from "react";

export const DropdownContent = ({
  open = false,
  children,
  width = "auto",
  maxWidth = 400,
  left = false,
  top = false,
  center = false,
  ...other
}) => {
  const fromLeft = left ? { left: 0 } : { right: 0 };
  const fromTop = top ? { bottom: "100%" } : { top: "100%" };
  const alignCenter = center
    ? { transform: "translateX(50%)", right: "50%" }
    : {};
  return (
    <Paper
      style={{
        display: open ? "block" : "none",
        position: "absolute",
        width,
        maxWidth,
        ...fromTop,
        ...fromLeft,
        ...alignCenter,
      }}
      {...other}
    >
      {children}
    </Paper>
  );
};

export const DropdownWrapper = ({
  position = "relative",
  children,
  ...other
}) => {
  // const [open, setOpen] = React.useState(false)
  // const showCartDropdown = () => {
  //     setOpen(true)
  // }
  // const closeCartDropdown = () => {
  //     setOpen(false)
  // }

  return (
    <Box style={{ position }} {...other}>
      {children}
    </Box>
  );
};
