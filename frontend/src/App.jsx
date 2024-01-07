import { Container } from "react-bootstrap";
import { Outlet } from "react-router-dom";
import TopBar from "./components/TopBar";

const App = () => {
  return (
    <>
      <TopBar />
      <Container className="my-2">
        <Outlet />
      </Container>
    </>
  );
};

export default App;
