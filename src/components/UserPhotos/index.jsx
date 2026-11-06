import React, { useEffect, useState } from "react";
import {
  Box,
  Button,
  Card,
  CardContent,
  CardHeader,
  CardMedia,
  Divider,
  Link,
  List,
  ListItem,
  ListItemText,
  Typography,
} from "@mui/material";
import { Link as RouterLink, useParams } from "react-router-dom";
import fetchModel from "../../lib/fetchModelData";
import "./styles.css";

function formatDateTime(dateTimeString) {
  if (!dateTimeString) {
    return "";
  }
  const date = new Date(dateTimeString);
  return date.toLocaleString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
  });
}

function UserPhotos() {
  const { userId } = useParams();
  const [photos, setPhotos] = useState(null);

  useEffect(() => {
    fetchModel(`/photosOfUser/${userId}`)
      .then((response) => {
        setPhotos(response.data);
      })
      .catch((error) => {
        console.error("Error fetching photos of user:", error);
      });
  }, [userId]);

  if (!photos) {
    return (
      <Box sx={{ p: 2 }}>
        <Typography variant="body1">Loading photos...</Typography>
      </Box>
    );
  }

  if (photos.length === 0) {
    return (
      <Box sx={{ p: 2 }}>
        <Button
          variant="outlined"
          component={RouterLink}
          to={`/users/${userId}`}
          sx={{ mb: 2 }}
        >
          Back to User Details
        </Button>
        <Typography variant="body1">This user has no photos.</Typography>
      </Box>
    );
  }

  return (
    <Box sx={{ p: 2 }}>
      <Button
        variant="outlined"
        component={RouterLink}
        to={`/users/${userId}`}
        sx={{ mb: 2 }}
      >
        Back to User Details
      </Button>

      {photos.map((photo) => (
        <Card key={photo._id} variant="outlined" sx={{ mb: 3 }}>
          <CardHeader
            subheader={`Uploaded: ${formatDateTime(photo.date_time)}`}
          />
          <CardMedia
            component="img"
            image={`/images/${photo.file_name}`}
            alt={photo.file_name}
            sx={{
              maxHeight: 500,
              objectFit: "contain",
              backgroundColor: "#f5f5f5",
            }}
          />
          <CardContent>
            <Typography variant="h6" gutterBottom>
              Comments:
            </Typography>
            {photo.comments && photo.comments.length > 0 ? (
              <List disablePadding>
                {photo.comments.map((comment) => (
                  <React.Fragment key={comment._id}>
                    <ListItem alignItems="flex-start" sx={{ px: 0 }}>
                      <ListItemText
                        primary={
                          <Box
                            sx={{
                              display: "flex",
                              justifyContent: "space-between",
                              flexWrap: "wrap",
                              mb: 0.5,
                            }}
                          >
                            <Link
                              component={RouterLink}
                              to={`/users/${comment.user._id}`}
                              underline="hover"
                              fontWeight="bold"
                            >
                              {`${comment.user.first_name} ${comment.user.last_name}`}
                            </Link>
                            <Typography
                              variant="caption"
                              color="text.secondary"
                            >
                              {formatDateTime(comment.date_time)}
                            </Typography>
                          </Box>
                        }
                        secondary={
                          <Typography
                            variant="body2"
                            color="text.primary"
                            sx={{ mt: 0.5 }}
                          >
                            {comment.comment}
                          </Typography>
                        }
                      />
                    </ListItem>
                    <Divider component="li" />
                  </React.Fragment>
                ))}
              </List>
            ) : (
              <Typography variant="body2" color="text.secondary">
                No comments yet.
              </Typography>
            )}
          </CardContent>
        </Card>
      ))}
    </Box>
  );
}

export default UserPhotos;
