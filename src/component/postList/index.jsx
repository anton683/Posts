import { Grid } from "@mui/material";
import { Post } from "../post";

export function PostList({ list, onPostLike, onDelete, currentUser }) {
  return (
    <>
      <Grid container spacing={6} sx={{ marginTop: 1 }}>
        {list.map((item) => (
          <Post key={item._id} {...item} onPostLike={onPostLike} onDelete={onDelete} currentUser={currentUser} />
        ))}
      </Grid>
    </>
  );
}
