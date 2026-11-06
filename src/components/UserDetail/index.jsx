import React, { useEffect, useState } from "react";
import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  Divider,
  Grid,
  Typography,
} from "@mui/material";
import { Link, useParams } from "react-router-dom";
import fetchModel from "../../lib/fetchModelData";
import "./styles.css";


function UserDetail() {
  const { userId } = useParams();
  const [user, setUser] = useState(null);

  useEffect(() => {
    fetchModel(`/user/${userId}`)
      .then((response) => {
        setUser(response.data);
      })
      .catch((error) => {
        console.error("Error fetching user details:", error);
      });
  }, [userId]);

  if (!user) {
    return (
      <Box sx={{ p: 2 }}>
        <Typography variant="body1">Loading user details...</Typography>
      </Box>
    );
  }

  return (
    <Card variant="outlined" sx={{ m: 2 }}>
      <CardContent>
        <Typography variant="h4" component="h1" gutterBottom color="primary">
          {`${user.first_name} ${user.last_name}`}
        </Typography>
        <Divider sx={{ mb: 2 }} />

        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <Typography variant="subtitle2" color="text.secondary">
              Occupation:
            </Typography>
            <Typography variant="body1" sx={{ mb: 2 }}>
              {user.occupation}
            </Typography>
          </Grid>

          <Grid item xs={12} sm={6}>
            <Typography variant="subtitle2" color="text.secondary">
              Location:
            </Typography>
            <Typography variant="body1" sx={{ mb: 2 }}>
              {user.location}
            </Typography>
          </Grid>

          <Grid item xs={12}>
            <Typography variant="subtitle2" color="text.secondary">
              Description:
            </Typography>
            <Typography
              variant="body1"
              sx={{ fontStyle: "italic", whiteSpace: "pre-wrap" }}
            >
              {user.description}
            </Typography>
          </Grid>
        </Grid>
      </CardContent>

      <CardActions sx={{ p: 2, pt: 0 }}>
        <Button
          variant="contained"
          color="primary"
          component={Link}
          to={`/photos/${user._id}`}
        >
          View Photos
        </Button>
      </CardActions>
    </Card>
  );
}

export default UserDetail;
