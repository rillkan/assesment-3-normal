import { getAuth } from "firebase/auth"
import { AuthContext } from "../components/AuthProvider";
import { useContext, useEffect } from "react";
import { Navbar, Container, Button, Nav } from "react-bootstrap";
import { Outlet, useNavigate } from "react-router-dom";

import logo from "../images/logo-3.png"


export default function Navigation() {
  const auth = getAuth();
  const navigate = useNavigate();
  const { currentUser } = useContext(AuthContext)

  useEffect(() => {
    //Check if currentUser is logged in
    if (!currentUser) {
      navigate("/login"); // Redirect to login if no auth token is present
    }
  }, [currentUser, navigate]);

  const handleLogout = () => {
    auth.signOut(""); // Clear token from localStorage
  };

  return (
    <>
      <Navbar className="navbar-success" bg="dark">
        <Container>
          <Navbar.Brand href="/home">
            <img src={logo} alt="Logo" style={{ maxWidth: "100px", maxHeight: "50px" }} />
          </Navbar.Brand>
          <Navbar.Collapse className="justify-content-end">
            <h4 className="text-white">Hello</h4>
            <h4 className="text-white">User</h4>
            <Nav>
              <Nav.Link className="text-white" href="/bookings">Bookings</Nav.Link>
            </Nav>

            <Button variant="danger" onClick={handleLogout}>
              Logout
            </Button>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      <Outlet />
    </>
  )
}
