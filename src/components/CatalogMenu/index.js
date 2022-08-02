import { Paper } from "@mui/material";
import React from "react";
import { useSelector } from "react-redux";
import CatalogTabs from "./CatalogTabs";

const CatalogMenu = ({ nonActiveTab = false }) => {
  const data = useSelector((state) => state.category.data);

  return (
    data && (
      <Paper elevation={3} sx={{ height: { xs: "100%", sm: "auto" } }}>
        <CatalogTabs data={data} nonActiveTab={nonActiveTab} />
      </Paper>
    )
  );
};

export default CatalogMenu;
