import { Container } from "react-bootstrap";
import "./Home.css";

const Home = () => {
  return (
    <div className=" py-5">
      <Container className="d-flex justify-content-center">
        <div className="cards">
          <span className="card-title">Guvi MERN Internship</span>
          <div className="divider"></div>
          <span className="card-desc">
            GUVI is an IIT-M & IIM-A incubated Ed-tech company that focuses on
            providing personalized learning solutions for its learners right
            from online learning, upskilling & recruitment opportunities in
            world-class quality. And, bestow tech-skills with the comfort of
            your native language.
          </span>

          <div className="form-container">
            <a href="/login">
              <button className="form-submit-btn" type="submit" href="/login">
                Login
              </button>
            </a>
          </div>
          <div className="form-container">
            <a href="/register">
              <button className="sign-submit-btn" type="submit">
                SignUp
              </button>
            </a>
          </div>
        </div>
      </Container>
    </div>
  );
};

export default Home;
