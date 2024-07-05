import React from "react";
import { Box } from "@mui/material";
import ButtonAppBar from "./AppBar";
import PermanentDrawerLeft from "./PermanentDrawer";
import { Provider } from "react-redux";
import { store } from "./store/store";
import Counter from "./components/usestatecounterbeautified";

function App() {
  return (
    <Provider store={store}>
      <Box sx={{ display: "flex" }}>
        <ButtonAppBar />
        <PermanentDrawerLeft />
        <Box
          component="main"
          sx={{
            flexGrow: 1,
            padding: 3,
            marginTop: "64px", // AppBar height
            marginLeft: "140px", // Drawer width
            display: "flex",
            justifyContent: "left",
            alignItems: "left",
            height: "calc(100vh - 64px)", // Full viewport height minus AppBar height
          }}
        >
          <Counter />
        </Box>
      </Box>
    </Provider>
  );
}

export default App;
