import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { useFirebase } from "../context/Firebase";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
function Register() {
  const firebase = useFirebase();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    if (firebase.isLoggedIn) {
      navigate("/");
    }
  }, [navigate, firebase.isLoggedIn]);

  const handleSubmit = (e) => {
    e.preventDefault();
    firebase.EmailandPasswordSignUp(email, password);
    setEmail("");
    setPassword("");
  };

  const googleLogin = () => {
    firebase.signInWithGoogle();
  };

  return (
    <div className="container my-5 max-[570px]:rounded-none bg-gray-100 sm:max-w-lg  py-6 px-10 rounded-xl border border-gray-400">
      <Form onSubmit={handleSubmit}>
        <h1 className="text-lg font-bold text-center my-3">Register</h1>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Email address</Form.Label>
          <Form.Control
            onChange={(e) => setEmail(e.target.value)}
            type="email"
            name="email"
            placeholder="Enter email"
            value={email}
          />
          <Form.Text className="text-muted">
            We'll never share your email with anyone else.
          </Form.Text>
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control
            onChange={(e) => setPassword(e.target.value)}
            name="password"
            type="password"
            value={password}
            placeholder="Password"
          />
        </Form.Group>

        <Button variant="warning" type="submit">
          Submit
        </Button>
        <br />
        <br />
        <h1 className="font-bold">OR</h1>
        <br />
        <button
          onClick={googleLogin}
          className="flex items-center justify-center my-2 w-full h-11 bg-slate-100 text-gray-700 text-lg font-medium  rounded-md border border-gray-800 duration-300 hover:bg-slate-200 focus:outline-none "
        >
          <img
            src="https://firebasestorage.googleapis.com/v0/b/my-app-506b9.appspot.com/o/uploads%2Fgoogle-logo-9824-removebg-preview.png?alt=media&token=96f834a2-4bc8-4c10-9b33-415e25824fa7"
            alt="Google Logo"
            className="w-6 h-6 mr-2"
          />
          <span>Sign in with Google</span>
        </button>
      </Form>
      <br />
      <Link to="/login" className="text-blue-600">
        Already have any account, Login Here{" "}
      </Link>
    </div>
  );
}

export default Register;
