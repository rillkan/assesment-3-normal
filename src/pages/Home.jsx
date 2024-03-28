import { AuthContext } from "../components/AuthProvider";
import { useContext, useState, useRef } from "react";
import { Container, Row, Col, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import bballVideo from "../videos/basketball.mp4"
import vbVideo from "../videos/volleyball.mp4"
import boxingVideo from "../videos/boxing.mp4"

import AddBookingModal from "../components/AddBookingModal"



export default function ProfilePage() {

  const navigate = useNavigate();
  const { currentUser } = useContext(AuthContext)
  const [isBasketballHovered, setIsBasketballHovered] = useState(false)
  const [isVbHovered, setIsVbHovered] = useState(false)
  const [isBoxingHovered, setIsBoxingHovered] = useState(false)

  const basketballVideoRef = useRef(null)
  const vbVideoRef = useRef(null)
  const boxingVideoRef = useRef(null)

  const handleBasketballMouseIn = () => {
    setIsBasketballHovered(true);
    basketballVideoRef.current.play();
  }

  const handleBasketballMouseOut = () => {
    setIsBasketballHovered(false);
    basketballVideoRef.current.pause();
  }

  const handleVbMouseIn = () => {
    setIsVbHovered(true);
    vbVideoRef.current.play();
  }

  const handleVbMouseOut = () => {
    setIsVbHovered(false);
    vbVideoRef.current.pause();
  }

  const handleBoxingMouseIn = () => {
    setIsBoxingHovered(true);
    boxingVideoRef.current.play();
  }

  const handleBoxingMouseOut = () => {
    setIsBoxingHovered(false);
    boxingVideoRef.current.pause();
  }

  const handleBballClick = () => {
    navigate("/Basketball")
  }

  const handleVBClick = () => {
    navigate("/Volleyball")
  }

  const handleBoxingClick = () => {
    navigate("/Boxing")
  }

  //Check if currentUser is logged in
  if (!currentUser) {
    navigate("/login"); // Redirect to login if no auth token is present
  }

  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false)
  const handleShow = () => setShow(true)

  return (
    <>

      <Container className="mt-3">
        <h2>Category page</h2>
        <Row>
          <Col>
            <div onClick={handleBballClick}
              className="square-container"
              onMouseEnter={handleBasketballMouseIn}
              onMouseLeave={handleBasketballMouseOut}
            >
              <video autoPlay={isBasketballHovered} ref={basketballVideoRef} loop muted className="fullscreen-video">
                <source src={bballVideo} type="video/mp4" />
                Your browser does not support the video tag.
              </video>
            </div>
            <h1>Basketball</h1>
          </Col>
          <Col>
            <div onClick={handleVBClick}
              className="square-container"
              onMouseEnter={handleVbMouseIn}
              onMouseLeave={handleVbMouseOut}
            >
              <video autoPlay={isVbHovered} ref={vbVideoRef} loop muted className="fullscreen-video">
                <source src={vbVideo} type="video/mp4" />
                Your browser does not support the video tag.
              </video>
            </div>
            <h1 href="/volleyball">Volleyball</h1>
          </Col>
          <Col>
            <div onClick={handleBoxingClick}
              className="square-container"
              onMouseEnter={handleBoxingMouseIn}
              onMouseLeave={handleBoxingMouseOut}
            >
              <video autoPlay={isBoxingHovered} ref={boxingVideoRef} loop muted className="fullscreen-video">
                <source src={boxingVideo} type="video/mp4" />
                Your browser does not support the video tag.
              </video>
            </div>
            <h1 href="/boxing">Boxing</h1>
          </Col>
        </Row>
      </Container>

      <Button onClick={handleShow}>Add a booking</Button>

      <AddBookingModal show={show} handleClose={handleClose} />
    </>
  );
}
