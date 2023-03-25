import { Grid } from "@mui/material";
import { postData } from "../../posts";
import { Post } from "../post";

export function PostList() {
  return (
    <>
      <Grid container spacing={6}>
        {postData.map((dataItem, index) => (
          <Post key={index} {...dataItem} />
        ))}
      </Grid>
    </>
  );
}
