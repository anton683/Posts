import * as React from "react";
import Grid from '@mui/material/Grid';
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Avatar from "@mui/material/Avatar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import FavoriteIcon from "@mui/icons-material/Favorite";
import dayjs from "dayjs";

export function Post({ author, created_at, image, title, text }) {
  return (
    <Grid sx={{ display: "flex" }} item xs={12} sm={6} lg={4} >
      <Card>
        <CardHeader
          avatar={<Avatar aria-label="recipe" src={author.avatar}></Avatar>}
          title={author.name}
          subheader={author.about}
        />
        <CardMedia component="img" height="194" image={image} alt={title} />
        <CardContent>
          <Typography variant="h6" color="black">
            {title}
          </Typography>
          <Typography paragraph>{text}</Typography>
          <Typography variant="body2" color="text.secondary" align="right">
            {dayjs(created_at).format("DD MMM YYYY")}
          </Typography>
        </CardContent>
        <CardActions disableSpacing>
          <IconButton aria-label="add to favorites">
            <FavoriteIcon />
          </IconButton>
        </CardActions>
      </Card>
    </Grid>
  );
}
