import { Container } from "@mui/system";
import Footer from "../footer";
import Header from "../header";
import { PostList } from "../postList";

function App() {
  return (
    <>
      <Header />
      <Container className="main">
        <PostList />
      </Container>
      <Footer />
    </>
  );
}

export default App;
