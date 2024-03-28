import { useContext, useState } from "react";
import { Modal, Form, Button } from "react-bootstrap";
import { AuthContext } from "./AuthProvider";

import { useDispatch } from "react-redux";
import { submitBooking } from "../features/bookings/bookingsSlice";



export default function AddBookingModal({ show, handleClose }) {
  const [customerName, setCustomerName] = useState("");
  const [email, setEmail] = useState("");
  const [description, setDescription] = useState("")
  const [hours, setHours] = useState("");
  const [date, setDate] = useState("");
  const [totalPrice, setTotalPrice] = useState(0);
  const [sportCategory, setSportCategory] = useState("");
  const [sportArea, setSportArea] = useState("");

  const { currentUser } = useContext(AuthContext)

  const dispatch = useDispatch() //(1)

  const handleHoursChange = (e) => {
    const hoursValue = e.target.value;
    setHours(hoursValue);
    // Calculate total price based on the number of hours selected
    const pricePerHour = 20; // Assuming price per hour is RM20
    const total = parseFloat(hoursValue) * pricePerHour;
    setTotalPrice(total.toFixed(2)); // Display total price with 2 decimal places
  };

  const handleSubmit = () => {
    dispatch(submitBooking({ customerName, email, description, date, hours, sportCategory, sportArea, currentUser }));
    handleClose();
    setCustomerName("")
    setDate("")
    setDescription("")
    setEmail("")
    setHours("")
    setSportArea("")
    setSportCategory("")
    setTotalPrice("")
  }

  const handleCategoryChange = (e) => {
    const category = e.target.value;
    setSportCategory(category);
    // Reset sport area when category changes
    setSportArea("");
  };

  const handleAreaChange = (e) => {
    const area = e.target.value;
    setSportArea(area);
  };

  return (
    <>
      <Modal
        show={show}
        onHide={handleClose}
        animation={false}
        centered
      >
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

            <Form.Group controlId="sportCategory">
              <Form.Label>Sport Category</Form.Label>
              <Form.Control
                as="select"
                value={sportCategory}
                onChange={handleCategoryChange}
              >
                <option value="">Select Sport Category</option>
                <option value="Basketball">Basketball</option>
                <option value="Volleyball">Volleyball</option>
                <option value="Boxing">Boxing</option>
              </Form.Control>
            </Form.Group>

            {sportCategory && (
              <Form.Group controlId="sportArea">
                <Form.Label>Sport Area</Form.Label>
                <Form.Control
                  as="select"
                  value={sportArea}
                  onChange={handleAreaChange}
                >
                  <option value="">Select Sport Area</option>
                  <option value={`${sportCategory} area1`}>{`${sportCategory} Area 1`}</option>
                  <option value={`${sportCategory} area2`}>{`${sportCategory} Area 2`}</option>
                  <option value={`${sportCategory} area3`}>{`${sportCategory} Area 3`}</option>
                </Form.Control>
              </Form.Group>
            )}

            <Form.Group controlId="description">
              <Form.Label>Description</Form.Label>
              <Form.Control
                type="text"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </Form.Group>

            <Form.Group controlId="date">
              <Form.Label>Date</Form.Label>
              <Form.Control
                type="date"
                value={date}
                min={new Date().toISOString().split("T")[0]}
                onChange={(e) => setDate(e.target.value)}
              />
            </Form.Group>

            <Form.Group controlId="hours">
              <Form.Label>Hours to play</Form.Label>
              <Form.Control
                type="number"
                value={hours}
                onChange={handleHoursChange} // Call handleHoursChange on change
              />
            </Form.Group>

            <Form.Group controlId="totalPrice">
              <Form.Label>Total Price</Form.Label>
              <Form.Control
                type="text"
                value={`RM ${totalPrice}`} // Display total price
                readOnly
              />
            </Form.Group>


            <Button variant="primary" type="submit">
              Submit
            </Button>
          </Form>
        </Modal.Body>
      </Modal>
    </>
  )
}

