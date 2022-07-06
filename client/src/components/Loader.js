import * as React from "react";
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";

export const Loader = () => {
  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: "#0000008a",
        zIndex: 10,
      }}
    >
      <CircularProgress
        thickness={10}
        sx={{
          color: "#07f213",
          width: 100,
          height: 100,
        }}
      />
    </Box>
  );
};
