import * as React from "react";
import Grid from '@mui/material/Grid';
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import CardActions from '@mui/material/CardActions';
import Avatar from "@mui/material/Avatar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import FavoriteIcon from "@mui/icons-material/Favorite";
import dayjs from "dayjs";
import { isLiked } from '../../utils/posts';
import DeleteIcon from '@mui/icons-material/Delete';

export function Post({ author, created_at, image, title, text, likes, _id, onPostLike, onDelete, currentUser }) {

  const like = isLiked(likes, currentUser?._id)
  const canDelete = currentUser?._id === author?._id;

  function handleClickButtonLike() {
    onPostLike({ likes, _id })
  }

  function handleClickDelete() {
    if (canDelete) {
      onDelete({ _id })
    }
  }

  return (
    <Grid sx={{ display: "flex" }} item xs={12} sm={6} lg={4} >
      <Card sx={{ display: "flex",
          flexDirection: "column",
        width: "100%"
      }}>
        <CardHeader
          avatar={<Avatar aria-label="recipe" src={author.avatar}></Avatar>}
          action={
            <IconButton aria-label="settings" onClick={handleClickDelete}>
              <DeleteIcon />
            </IconButton>
          }
          title={author.name}
          subheader={dayjs(created_at).format("DD MMM YYYY")}
        />
        <CardMedia component="img" height="194" image={image} alt={title} />
        <CardContent>
          <Typography variant="h6" color="black">
            {title}
          </Typography>
          <Typography paragraph>{text}</Typography>
        </CardContent>
        <CardActions disableSpacing sx={{ marginTop: "auto" }}>
          <IconButton  aria-label="add to favorites" onClick={handleClickButtonLike}>
            <FavoriteIcon sx={{ color: like ? "red" : "grey" }} />
          </IconButton>
          <Typography sx={{ marginLeft: "8px" }}>
            {likes.length}
          </Typography>
        </CardActions>
      </Card>
    </Grid>
  );
}
