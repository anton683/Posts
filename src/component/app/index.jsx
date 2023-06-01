import { Container } from "@mui/system";
import Footer from "../footer";
import Header from "../header";
import api from '../../utils/api';
import { useState, useEffect } from 'react';
import { isLiked } from '../../utils/posts';
import { Route, Routes, useNavigate } from "react-router-dom";
import { MainPage } from "../../pages/mainpage";
import { PostPage } from "../../pages/postpage";
import { NotFoundPage } from "../../pages/notfoundpage";
import { UserContext } from "../../contexts/current-user-context";

function App() {
  const [posts, setPosts] = useState([]);
  const [currentUser, setCurrentUser] = useState(null);
  const [page, setPage] = useState(1);
  const navigate = useNavigate();
  const [refresh, setRefresh] = useState(true);

  function handlePostLike(post) {
    const like = isLiked(post.likes, currentUser._id)
    api.changeLikePostStatus(post._id, like)
      .then((updatePost) => {
        const newPosts = posts.map(post => {
          return post._id === updatePost._id ? updatePost : post;
        })
        setPosts(newPosts)
      })
  }

  function handlePostDelete(post) {
    api.deletePost(post._id)
      .then(() => {
        navigate("/");
        setRefresh((refresh) => !refresh);

      })
  }

  function handlePostEdit(newData) {
    api.editPost(newData).then(() => {
      navigate("/");
      setRefresh((refresh) => !refresh);
    });
  }

  function handlePostAdd(data) {
    api
      .addPost(data)
      .then(() =>
        page === 1 ? setRefresh((refresh) => !refresh) : setPage(1)
      );
  }

  useEffect(() => {
    api.getAllInfo(page)
      .then(([postsData, userInfoData]) => {
        setCurrentUser(userInfoData);
        setPosts(postsData);
      })
      .catch(err => console.log(err))
  }, [page, refresh])
  return (
    <UserContext.Provider value={currentUser} >
      <Header onAdd={handlePostAdd} />
      <Container className="main">
        <Routes>
          <Route path="/" element={<MainPage posts={posts}
            handlePostLike={handlePostLike}
            handlePostDelete={handlePostDelete}
            handlePostEdit={handlePostEdit}
            currentUser={currentUser}
            navigate={navigate}
          />
          }
          />
          <Route path="/postpage/:postID"
            element={
              <PostPage
                handlePostDelete={handlePostDelete}
                handlePostEdit={handlePostEdit}
                navigate={navigate}
                setRefresh={setRefresh}
              />
            } />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </Container>
      <Footer />
    </UserContext.Provider>
  );
}

export default App;
