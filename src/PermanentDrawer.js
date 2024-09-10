import React from "react";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";

// Import necessary icons
import MovieIcon from "@mui/icons-material/Movie";
import StarIcon from "@mui/icons-material/Star";
//import UpcomingIcon from "@mui/icons-material/Upcoming";
//import LocalMoviesIcon from "@mui/icons-material/LocalMovies";
import EmojiEmotionsIcon from "@mui/icons-material/EmojiEmotions";
//import TheatersIcon from "@mui/icons-material/Theaters";
import DirectionsRunIcon from "@mui/icons-material/DirectionsRun";
import AutoFixHighIcon from "@mui/icons-material/AutoFixHigh";
//import ChildCareIcon from "@mui/icons-material/ChildCare";
//import PsychologyIcon from "@mui/icons-material/Psychology";
//import HistoryEduIcon from "@mui/icons-material/HistoryEdu";
import BloodtypeIcon from "@mui/icons-material/Bloodtype";
import MusicNoteIcon from "@mui/icons-material/MusicNote";
import HandymanIcon from '@mui/icons-material/Handyman';
import Diversity3Icon from '@mui/icons-material/Diversity3';
import DownhillSkiingIcon from '@mui/icons-material/DownhillSkiing';
import MovieFilterIcon from '@mui/icons-material/MovieFilter';
import TheaterComedyIcon from '@mui/icons-material/TheaterComedy';
import VideoCameraFrontIcon from '@mui/icons-material/VideoCameraFront';
import BalanceIcon from '@mui/icons-material/Balance';
import EmojiNatureIcon from '@mui/icons-material/EmojiNature';

const drawerWidth = 240;

const categories = [
  { name: "Popular", icon: <MovieIcon /> },
  { name: "Top Rated", icon: <StarIcon /> },
  { name: "Upcoming", icon: <MovieFilterIcon /> },
];

const genres = [
  { name: "Action", icon: <DirectionsRunIcon /> },
  { name: "Adventure", icon: <DownhillSkiingIcon /> },
  { name: "Animation", icon: <EmojiNatureIcon /> },
  { name: "Comedy", icon: <EmojiEmotionsIcon /> },
  { name: "Crime", icon: <HandymanIcon /> },
  { name: "Documentary", icon: <VideoCameraFrontIcon /> },
  { name: "Drama", icon: <TheaterComedyIcon /> },
  { name: "Family", icon: <Diversity3Icon /> },
  { name: "Fantasy", icon: <AutoFixHighIcon /> },
  { name: "History", icon: <BalanceIcon /> },
  { name: "Horror", icon: <BloodtypeIcon /> },
  { name: "Music", icon: <MusicNoteIcon /> },
];

const drawerBg = "#212121";
const textColor = "#ffebee";
const hoverBg = "#b71c1c";
const hoverText = "#ffffff";
const dividerColor = "#b71c1c";

export default function PermanentDrawerLeft() {
  return (
    <Drawer
      sx={{
        width: drawerWidth,
        flexShrink: 0,
        "& .MuiDrawer-paper": {
          width: drawerWidth,
          boxSizing: "border-box",
          backgroundColor: drawerBg,
          color: textColor,
          top: 64,
          height: "calc(100% - 64px)",
        },
      }}
      variant="permanent"
      anchor="left"
    >
      <Box sx={{ overflow: "auto", mt: 2 }}>
        <Typography
          variant="subtitle1"
          sx={{
            px: 2,
            py: 1,
            fontFamily: '"Cinzel", Arial, sans-serif',
            fontWeight: 600,
            fontSize: "20px",
            color: "#b71c1c",
          }}
        >
          Categories
        </Typography>
        <List>
          {categories.map((item) => (
            <ListItem key={item.name} disablePadding>
              <ListItemButton
                sx={{
                  "&:hover": {
                    backgroundColor: hoverBg,
                    "& .MuiListItemIcon-root, & .MuiTypography-root": {
                      color: hoverText,
                    },
                  },
                }}
              >
                <ListItemIcon sx={{ color: textColor, minWidth: 40 }}>
                  {item.icon}
                </ListItemIcon>
                <ListItemText
                  primary={item.name}
                  sx={{
                    "& .MuiTypography-root": {
                      fontFamily: '"Cinzel", Arial, sans-serif',
                      fontWeight: 400,
                    },
                  }}
                />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
        <Divider sx={{ my: 1, backgroundColor: dividerColor }} />
        <Typography
          variant="subtitle1"
          sx={{
            px: 2,
            py: 1,
            fontFamily: '"Cinzel", Arial, sans-serif',
            fontWeight: 600,
            fontSize: "20px",
            color: "#b71c1c",
          }}
        >
          Genres
        </Typography>
        <List>
          {genres.map((item) => (
            <ListItem key={item.name} disablePadding>
              <ListItemButton
                sx={{
                  "&:hover": {
                    backgroundColor: hoverBg,
                    "& .MuiListItemIcon-root, & .MuiTypography-root": {
                      color: hoverText,
                    },
                  },
                }}
              >
                <ListItemIcon sx={{ color: textColor, minWidth: 40 }}>
                  {item.icon}
                </ListItemIcon>
                <ListItemText
                  primary={item.name}
                  sx={{
                    "& .MuiTypography-root": {
                      fontFamily: '"Cinzel", Arial, sans-serif',
                      fontWeight: 400,
                    },
                  }}
                />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </Box>
    </Drawer>
  );
}
