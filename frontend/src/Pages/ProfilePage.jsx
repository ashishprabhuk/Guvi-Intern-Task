import { useState, useEffect } from "react";
import { Form } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import Forms from "../components/Forms";
import { useUpdateUserMutation } from "../features/usersApiSlice";
import { setCredentials } from "../features/authSlice";
import "./ProfilePage.css";

const ProfilePage = () => {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [age, setAge] = useState("");
  const [gender, setGender] = useState("");
  const [mobile, setMobile] = useState("");
  const [dob, setDob] = useState("");

  const dispatch = useDispatch();

  const { userInfo } = useSelector((state) => state.auth);

  const [updateProfile, { isLoading }] = useUpdateUserMutation();

  useEffect(() => {
    setName(userInfo.name);
    setEmail(userInfo.email);
    setAge(userInfo.age);
    setGender(userInfo.gender || "");
    setMobile(userInfo.mobile || "");
    setDob(userInfo.dob || "");
  }, [
    userInfo.email,
    userInfo.name,
    userInfo.age,
    userInfo.gender,
    userInfo.dob,
    userInfo.mobile,
  ]);

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      const updatedUser = await updateProfile({
        _id: userInfo._id,
        name,
        email,
        password,
        age,
        gender,
        dob,
        mobile,
      }).unwrap();

      const completeUserProfile = {
        _id: updatedUser._id,
        name: updatedUser.name,
        email: updatedUser.email,
        age: updatedUser.age,
        gender: updatedUser.gender,
        dob: updatedUser.dob,
        mobile: updatedUser.mobile,
      };

      dispatch(setCredentials(completeUserProfile));
      alert("Profile updated successfully");
    } catch (err) {
      alert(err?.data?.message || err.error);
    }
  };

  return (
    <Forms>
      <h1 className="text-center">Profile</h1>

      <Form onSubmit={submitHandler}>
        <Form.Group className="my-2" controlId="name">
          <Form.Label>Name</Form.Label>
          <Form.Control
            type="name"
            placeholder="Enter your name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          ></Form.Control>
        </Form.Group>
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
        <Form.Group className="my-2" controlId="age">
          <Form.Label>Age</Form.Label>
          <Form.Control
            type="number"
            placeholder="Enter your Age"
            value={age}
            onChange={(e) => setAge(e.target.value)}
          ></Form.Control>
        </Form.Group>
        <Form.Group className="my-2" controlId="gender">
          <Form.Label>Gender</Form.Label>
          <Form.Control
            as="select"
            value={gender}
            onChange={(e) => setGender(e.target.value)}
          >
            <option value="" disabled>
              Select your gender
            </option>
            <option value="male">Male</option>
            <option value="female">Female</option>
            <option value="other">Other</option>
          </Form.Control>
        </Form.Group>
        <Form.Group className="my-2" controlId="dob">
          <Form.Label>Date of Birth</Form.Label>
          <Form.Control
            type="date"
            placeholder="Enter your date of birth"
            value={dob}
            onChange={(e) => setDob(e.target.value)}
          ></Form.Control>
        </Form.Group>
        <Form.Group className="my-2" controlId="mobile">
          <Form.Label>Mobile</Form.Label>
          <Form.Control
            type="number"
            placeholder="Enter your mobile number"
            value={mobile}
            onChange={(e) => setMobile(e.target.value)}
          ></Form.Control>
        </Form.Group>

        <div className="form-container">
          <button
            className="form-submit-btn"
            type="submit"
            disabled={isLoading}
          >
            Update
          </button>
        </div>
      </Form>
    </Forms>
  );
};

export default ProfilePage;
