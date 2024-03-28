//AuthPage and AuthHome(this file) is the same

import { useContext, useEffect, useState } from "react";
import { Form, Button, Col, Modal, Row, Container } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import video from "../videos/sport_compilation.mp4"

import { FacebookAuthProvider, GoogleAuthProvider, createUserWithEmailAndPassword, getAuth, signInWithEmailAndPassword, signInWithPopup, } from "firebase/auth"
import { AuthContext } from "../components/AuthProvider";
/* Accounts to test based on Firebase
username: newaccountv1@gmail.com
pw: 123456
username:admin@gmail.com
pw: 12356
username:twittermodule3@gmail.com      (has the same account as Neon SQL, testing if it links)
pw: 12356
*/

/*
Use conditional rendering to display a modal for either sign-up or login based on the value of the modalShow state variable. Saves up time on building multiple pages for Register and login like assement-2
*/
export default function Welcome() {

  /* Conditional rendering to switch Sign Up : Login*/
  const [modalShow, setModalShow] = useState(null);
  const handleShowSignUp = () => setModalShow("signup");
  const handleShowLogin = () => setModalShow("login");
  /* */
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();
  const auth = getAuth();
  const { currentUser } = useContext(AuthContext)



  useEffect(() => { //if there is prescense of currentUser, sent user to home page. 
    if (currentUser) {
      navigate("/home")
    }
  }, [currentUser, navigate])

  const handleClose = () => setModalShow(null) /* handleClose variable will constantly be null*/

  const handleSignUp = async (e) => {
    e.preventDefault();
    try {
      const res = await createUserWithEmailAndPassword(
        auth,
        username,
        password
      ); /*       const res = await axios.post(`${url}/signup`, { username, password, name }) */
      console.log(res.user)
    } catch (error) {
      console.error(error)
    }
  }

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const result = await signInWithEmailAndPassword(auth, username, password)
      console.log('Logged in using Email', result.user)
      /* const res = await axios.post(`${url}/login`, { username, password }); */
    } catch (error) {
      console.error(error)
    }
  };

  const provider = new GoogleAuthProvider();
  const handleGoogleLogin = async (e) => {
    e.preventDefault();
    try {
      const result = await signInWithPopup(auth, provider);
      console.log('Logged in using Google', result.user)
    } catch (error) {
      console.error(error)
    }
  }

  const fbProvider = new FacebookAuthProvider();
  const handleFacebookLogin = async (e) => {
    e.preventDefault();
    try {
      const result = await signInWithPopup(auth, fbProvider);
      console.log('Logged in using Facebook', result.user)
    } catch (error) {
      console.error(error)
    }
  }


  return (
    <>
      <div className="video-background">
        <video autoPlay loop muted className="fullscreen-video">
          <source src={video} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
        <div className="content">
          <Row className="justify-content-center">
            <Col md={6}>
              <div className="logIn-box">
                <h2>Your all-in-one</h2>
                <h1>Sports Booking App</h1>
                <Container fluid>
                  <Button className="rounded-pill mb-3" onClick={handleShowSignUp}>
                    Create/Register an Account
                  </Button>
                  <Button
                    className="rounded-pill mb-3 mr-2"
                    variant="outline-dark"
                    onClick={handleGoogleLogin}
                  >
                    Sign Up with Google
                  </Button>
                  <Button
                    className="rounded-pill mb-3"
                    variant="outline-primary"
                    onClick={handleFacebookLogin}
                  >
                    Sign Up with Facebook
                  </Button>
                </Container>
                <p style={{ fontWeight: "bold" }}>Already have an account?</p>
                <Button
                  className="rounded-pill mb-4"
                  variant="outline-primary"
                  onClick={handleShowLogin}
                >
                  Sign In
                </Button>
              </div>
            </Col>
          </Row>
          <Modal show={modalShow !== null} onHide={handleClose} animation={false} centered>
            <Modal.Body>
              <h2>{modalShow === "signup" ? "Account Creation" : "Log in to your Account"}</h2>
              <Form onSubmit={modalShow === "signup" ? handleSignUp : handleLogin}>
                <Form.Group controlId="formBasicEmail">
                  <Form.Control
                    onChange={(e) => setUsername(e.target.value)}
                    type="email"
                    placeholder="Enter Email"
                    required
                  />
                </Form.Group>
                <Form.Group controlId="formBasicPassword">
                  <Form.Control
                    onChange={(e) => setPassword(e.target.value)}
                    type="password"
                    placeholder="Password"
                    required
                  />
                </Form.Group>
                <p>By signing up, you agree to our terms and conditions.</p>
                <Button type="submit" className="rounded-pill">
                  {modalShow === "signup" ? "Sign Up" : "Log In"}
                </Button>
              </Form>
            </Modal.Body>
          </Modal>
        </div>
      </div>

      {
      }
    </>
  )
}