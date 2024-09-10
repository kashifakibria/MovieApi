import React from "react";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import InputBase from "@mui/material/InputBase";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import SearchIcon from "@mui/icons-material/Search";
import PersonIcon from "@mui/icons-material/Person";


export default function ButtonAppBar() {
  return (
    <AppBar
      position="fixed"
      sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 ,backgroundColor:'#212121',}}
      
    >
      <Toolbar sx={{ justifyContent: "space-between" }}>
        <Box
          component="img"
          sx={{
            height: 50, // Increased from 64
            width: "auto",
            maxHeight: { xs: 150, sm: 80, md: 70 }, // Adjusted for different screen sizes
            maxWidth: { xs: 160, sm: 200, md: 240 }, // Adjusted for different screen sizes
            marginLeft: 2,
            marginY: 2, // Added vertical margin
            
          }}
          alt="Filmpire logo"
          src="/images/Movie.jpg"
        />

        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            //backgroundColor: "rgba(255, 255, 255, 0.15)",
            backgroundColor:"white",
            borderRadius: "4px",
            padding: "2px 8px",
            width: "40%",
          }}
        >
          <SearchIcon sx={{ color: "black", mr: 1 }} />
          <InputBase
            placeholder="Search for a Movie..."
            sx={{
              color: "black",
              "& ::placeholder": { color: "black", opacity: 0.7 },
              flexGrow: 1,
            }}
          />
        </Box>

        <Button
          color="inherit"
          startIcon={<PersonIcon />}
          sx={{
            backgroundColor: "red",
            "&:hover": { backgroundColor: "black" },
          }}
        >
          LOGIN
        </Button>
      </Toolbar>
    </AppBar>
  );
}
