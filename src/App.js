import "./App.css";

import React from "react";
import { Box, Grid, Paper, Typography } from "@mui/material";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import TopBar from "./components/TopBar";
import UserDetail from "./components/UserDetail";
import UserList from "./components/UserList";
import UserPhotos from "./components/UserPhotos";

const App = () => {
  return (
    <Router>
      <Box sx={{ minHeight: "100vh", display: "flex", flexDirection: "column" }}>
        <TopBar />
        <Box sx={{ flexGrow: 1, p: 2 }}>
          <Grid container spacing={2}>
            <Grid item sm={3} xs={12}>
              <Paper className="main-grid-item">
                <UserList />
              </Paper>
            </Grid>
            <Grid item sm={9} xs={12}>
              <Paper className="main-grid-item">
                <Routes>
                  <Route path="/users/:userId" element={<UserDetail />} />
                  <Route path="/photos/:userId" element={<UserPhotos />} />
                  <Route path="/users" element={<UserList />} />
                  <Route
                    path="/"
                    element={
                      <Typography variant="h6" sx={{ p: 2 }}>
                        Welcome to the Photo Sharing App! Please select a user from the list.
                      </Typography>
                    }
                  />
                </Routes>
              </Paper>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Router>
  );
};

export default App;
