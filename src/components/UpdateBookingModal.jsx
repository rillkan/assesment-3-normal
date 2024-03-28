import { useContext, useState, useEffect } from "react";
import { Modal, Form, Button } from "react-bootstrap";
import { AuthContext } from "./AuthProvider";
import axios from "axios";

export default function UpdateBookingModal({ show, handleClose, booking }) {
  const [customerName, setCustomerName] = useState(booking.customer_name || "");
  const [email, setEmail] = useState(booking.email || "");
  const [description, setDescription] = useState(booking.description || "");
  const [hours, setHours] = useState(booking.duration_hours || "");
  const [totalPrice, setTotalPrice] = useState(0);

  const { currentUser } = useContext(AuthContext);

  useEffect(() => {
    // Calculate total price based on the number of hours selected
    const pricePerHour = 20; // Assuming price per hour is RM20
    const total = parseFloat(hours) * pricePerHour;
    setTotalPrice(total.toFixed(2)); // Display total price with 2 decimal places
  }, [hours]);

  const handleHoursChange = (e) => {
    setHours(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const data = {
      customer_name: customerName,
      email: email,
      description: description,
      duration_hours: hours,
      user_uid: currentUser.uid
    };

    axios
      .put(`https://9ed25687-f3d5-4e4a-803d-018a47ca64f5-00-164ouryxp6q4w.kirk.replit.dev/bookings/${booking.id}`, data)
      .then((response) => {
        console.log("Success:", response.data);
        handleClose();
      })
      .catch((error) => {
        console.error("Error", error.response);
      });
  };

  return (
    <Modal show={show} onHide={handleClose} animation={false} centered>
      <Modal.Header closeButton></Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleSubmit}>
          <Form.Group controlId="customerName">
            <Form.Label>Customer Name</Form.Label>
            <Form.Control
              type="text"
              value={customerName}
              onChange={(e) => setCustomerName(e.target.value)}
            />
          </Form.Group>

          <Form.Group controlId="email">
            <Form.Label>Email</Form.Label>
            <Form.Control
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </Form.Group>

          <Form.Group controlId="description">
            <Form.Label>Description</Form.Label>
            <Form.Control
              type="text"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </Form.Group>

          <Form.Group controlId="hours">
            <Form.Label>Hours to play</Form.Label>
            <Form.Control
              type="number"
              value={hours}
              onChange={handleHoursChange}
            />
          </Form.Group>

          <Form.Group controlId="totalPrice">
            <Form.Label>Total Price</Form.Label>
            <Form.Control
              type="text"
              value={`RM ${totalPrice}`}
              readOnly
            />
          </Form.Group>

          <Button variant="primary" type="submit">
            Update
          </Button>
        </Form>
      </Modal.Body>
    </Modal>
  );
}
