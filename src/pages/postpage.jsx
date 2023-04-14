import { Button, Container } from "@mui/material";
import { useContext } from "react";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { UserContext } from "../contexts/current-user-context";
import api from "../utils/api";
import { isLiked } from "../utils/posts";
import { NotFoundPage } from "./notfoundpage";
import { Post } from "../component/post";

export const PostPage = ({
  handlePostLike,
  handlePostDelete,
  navigate,
  setRefresh,
}) => {
  const currentUser = useContext(UserContext);
  const [post, setPost] = useState();
  const { postID } = useParams();
  const [errorState, setErrorState] = useState(null);

  function handlePostLike(post) {
    const like = isLiked(post.likes, currentUser._id);
    api.changeLikePostStatus(post._id, like).then((updatePost) => {
      setPost(updatePost);
    });
  }

  useEffect(() => {
    api
      .getPostById(postID)
      .then((postData) => {
        setPost(postData);
      })
      .catch((err) => {
        setErrorState(err);
      });
  }, []);

  return (
    <>
      <Container >
        <Button
          onClick={() => {
            navigate(-1);
            setRefresh((refresh) => !refresh);
          }}
          variant="outlined"
          size="small"
          color="inherit"
          sx={{ marginBottom: 2 }}
        >
          Назад
        </Button>
        {!errorState && (
          <Post className="postPage"
            {...post}
            onPostLike={handlePostLike}
            onDelete={handlePostDelete}
            heightImg={"auto"}
          />
        )}
        {errorState && <NotFoundPage />}
      </Container>
    </>
  );
};