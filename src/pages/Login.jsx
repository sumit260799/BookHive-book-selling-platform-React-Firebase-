import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { useFirebase } from "../context/Firebase";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { EmailandPasswordSignIn, signInWithGoogle, isLoggedIn } =
    useFirebase();

  useEffect(() => {
    if (isLoggedIn) {
      navigate("/");
    }
  }, [navigate, isLoggedIn]);

  const handleLogin = (e) => {
    e.preventDefault();
    EmailandPasswordSignIn(email, password);
  };

  const googleLogin = () => {
    signInWithGoogle();
  };

  return (
    <div className="container max-[570px]:rounded-none my-5 bg-gray-100 sm:max-w-lg  py-6 px-10 rounded-xl border border-gray-400">
      <Form onSubmit={handleLogin}>
        <h1 className="font-bold text-lg my-3 text-center ">Login</h1>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Email address</Form.Label>
          <Form.Control
            type="email"
            name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter email"
          />
          <Form.Text className="text-muted">
            We'll never share your email with anyone else.
          </Form.Text>
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            name="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
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
          className="flex items-center justify-center w-full h-11 bg-slate-100 text-gray-700 text-lg font-medium  rounded-md border border-gray-300 duration-300 hover:bg-slate-200 focus:outline-none "
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
      <Link to="/register" className="text-blue-600">
        Don't have any account, Register Here{" "}
      </Link>
    </div>
  );
}

export default Login;
