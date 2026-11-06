import React, { useEffect, useState } from "react";
import {
  Divider,
  List,
  ListItemButton,
  ListItemText,
  Typography,
} from "@mui/material";
import { Link, useLocation } from "react-router-dom";
import fetchModel from "../../lib/fetchModelData";
import "./styles.css";


function UserList() {
  const [users, setUsers] = useState([]);
  const location = useLocation();

  useEffect(() => {
    fetchModel("/user/list")
      .then((response) => {
        setUsers(response.data);
      })
      .catch((error) => {
        console.error("Error fetching user list:", error);
      });
  }, []);

  return (
    <div>
      <Typography variant="h6" sx={{ p: 2, pb: 1 }}>
        Users
      </Typography>
      <Divider />
      <List component="nav">
        {users.map((item) => {
          const isSelected =
            location.pathname === `/users/${item._id}` ||
            location.pathname === `/photos/${item._id}`;
          return (
            <React.Fragment key={item._id}>
              <ListItemButton
                component={Link}
                to={`/users/${item._id}`}
                selected={isSelected}
              >
                <ListItemText primary={`${item.first_name} ${item.last_name}`} />
              </ListItemButton>
              <Divider />
            </React.Fragment>
          );
        })}
      </List>
    </div>
  );
}

export default UserList;
