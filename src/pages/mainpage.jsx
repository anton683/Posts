import { PostList } from "../component/postList";

export const MainPage = ({
  posts,
  handlePostLike,
  handlePostDelete,
  currentUser
}) => {
  return (
    <>
      <PostList list={posts}
        onPostLike={handlePostLike}
        currentUser={currentUser}
        onDelete={handlePostDelete}
      />
    </>
  );
};
