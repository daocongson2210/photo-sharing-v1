import React, { useEffect, useState } from "react";
import { AppBar, Toolbar, Typography, Box } from "@mui/material";
import { useLocation } from "react-router-dom";
import fetchModel from "../../lib/fetchModelData";
import "./styles.css";


function TopBar() {
  const location = useLocation();
  const [contextText, setContextText] = useState("");
  const [version, setVersion] = useState(null);

  useEffect(() => {
    fetchModel("/test/info")
      .then((res) => {
        if (res && res.data && res.data.__v !== undefined) {
          setVersion(res.data.__v);
        }
      })
      .catch((err) => {
        console.error("Error fetching version info:", err);
      });
  }, []);

  useEffect(() => {
    let isMounted = true;
    const path = location.pathname;

    if (path.startsWith("/users/")) {
      const userId = path.split("/")[2];
      if (userId) {
        fetchModel(`/user/${userId}`)
          .then((res) => {
            if (isMounted) {
              setContextText(`${res.data.first_name} ${res.data.last_name}`);
            }
          })
          .catch(() => {
            if (isMounted) {
              setContextText("");
            }
          });
      }
    } else if (path.startsWith("/photos/")) {
      const userId = path.split("/")[2];
      if (userId) {
        fetchModel(`/user/${userId}`)
          .then((res) => {
            if (isMounted) {
              setContextText(`Photos of ${res.data.first_name} ${res.data.last_name}`);
            }
          })
          .catch(() => {
            if (isMounted) {
              setContextText("");
            }
          });
      }
    } else if (path === "/users") {
      setContextText("User List");
    } else {
      setContextText("");
    }

    return () => {
      isMounted = false;
    };
  }, [location.pathname]);

  return (
    <AppBar position="static" className="topbar-appBar" elevation={1}>
      <Toolbar
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          px: { xs: 2, sm: 3, md: 4 },
        }}
      >
        <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
          <Typography variant="h5" color="inherit">
            Đào Công Sơn
          </Typography>
          {version !== null && (
            <Typography
              variant="caption"
              sx={{
                opacity: 0.9,
                bgcolor: "rgba(255, 255, 255, 0.2)",
                px: 1,
                py: 0.25,
                borderRadius: 1,
              }}
            >
              v{version}
            </Typography>
          )}
        </Box>
        <Box sx={{ pl: 2, pr: 2 }}>
          <Typography variant="h5" color="inherit" sx={{ fontWeight: 500 }}>
            {contextText}
          </Typography>
        </Box>
      </Toolbar>
    </AppBar>
  );
}

export default TopBar;
