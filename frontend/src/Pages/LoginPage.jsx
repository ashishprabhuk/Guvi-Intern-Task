import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Form, Row, Col } from "react-bootstrap";
import Forms from "../components/Forms";
import { useDispatch, useSelector } from "react-redux";
import { useLoginMutation } from "../features/usersApiSlice";
import { setCredentials } from "../features/authSlice";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [login, { isLoading }] = useLoginMutation();

  const { userInfo } = useSelector((state) => state.auth);

  useEffect(() => {
    if (userInfo) {
      navigate("/profile");
    }
  }, [navigate, userInfo]);

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      const res = await login({ email, password }).unwrap();
      dispatch(setCredentials({ ...res }));
      navigate("/");
    } catch (err) {
      alert(err?.data?.message || err.error);
    }
  };

  return (
    <Forms>
      <h1 className="text-center">Login</h1>

      <Form onSubmit={submitHandler}>
        <Form.Group className="my-2" controlId="email">
          <Form.Label>Email</Form.Label>
          <Form.Control
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          ></Form.Control>
        </Form.Group>

        <Form.Group className="my-2" controlId="password">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          ></Form.Control>
        </Form.Group>
        <div className="form-container">
          <button
            className="form-submit-btn"
            type="submit"
            disabled={isLoading}
          >
            Login
          </button>
        </div>
      </Form>

      {/* {isLoading && <Loader />} */}

      <Row className="py-3">
        <Col className="text-center">
          Create New Account? <Link to="/register">SignUp</Link>
        </Col>
      </Row>
    </Forms>
  );
};

export default LoginPage;
