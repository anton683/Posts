import { Grid } from "@mui/material";
import { Post } from "../post";
import React from "react";

export const PostList = ({ list, onPostLike, onDelete }) => {
  return (
    <>
      <Grid container spacing={6} sx={{ marginTop: 1 }}>
        {list.map((item) => (
          <Post key={item._id} {...item} onPostLike={onPostLike} onDelete={onDelete}  />
        ))}
      </Grid>
    </>
  );
}
