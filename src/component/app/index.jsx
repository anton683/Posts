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
  const navigate = useNavigate();
  const [refresh, setRefresh] = useState(true);

  function handleUpdateUser(dataUserUpdate) {
    api.setUserInfo(dataUserUpdate)
      .then((dataServer) => {
        setCurrentUser(dataServer)
      })
  }

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
      .then((updatePost) => {
        navigate(-1);
      setRefresh((refresh) => !refresh);

      })
  }

  useEffect(() => {
    api.getAllInfo()
      .then(([postsData, userInfoData]) => {
        setCurrentUser(userInfoData);
        setPosts(postsData);
      })
      .catch(err => console.log(err))
  }, [])
  return (
    <UserContext.Provider value={currentUser} >
      <Header />
      <Container className="main">
        <Routes>
          <Route path="/" element={<MainPage posts={posts}
            handlePostLike={handlePostLike}
            handlePostDelete={handlePostDelete}
            currentUser={currentUser}
            navigate={navigate} 
            />
          }
          />
          <Route path="/postpage/:postID"
              element={
                <PostPage
                handlePostLike={handlePostLike}
                handlePostDelete={handlePostDelete}
                navigate={navigate}
                setRefresh={setRefresh}
                />
              }/>
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </Container>
      <Footer />
    </UserContext.Provider>
  );
}

export default App;
