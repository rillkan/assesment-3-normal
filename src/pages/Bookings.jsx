import { useEffect, useState } from "react";
import { auth } from "../firebase";
import { Button, Table, Spinner } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { fetchBookingsbyUser } from "../features/bookings/bookingsSlice";
import UpdateBookingModal from "../components/UpdateBookingModal";
import { deleteBooking } from "../features/bookings/bookingsSlice";


export default function Bookings() {
  const dispatch = useDispatch();
  const bookings = useSelector((state) => state.bookings.bookings);
  const loading = useSelector((state) => state.bookings.loading);
  const [selectedBooking, setSelectedBooking] = useState(null);
  const [showUpdateModal, setShowUpdateModal] = useState(false);


  useEffect(() => {
    // Firebase provides a method to observe authentication state changes
    return auth.onAuthStateChanged(user => { // auth.onAuthStateChanged gives access to user
      if (user) {
        // If user is authenticated, you can get their UID
        console.log(`My user.uid:`, user.uid) //My user.uid: kZziXe3cSRZ2s4bXWCCxAh4o1Ht1
        const userId = user.uid;
        dispatch(fetchBookingsbyUser(userId))
        console.log(`The type of user.uid:`, typeof userId) //The type of user.uid: string

      }
    });
    // Clean up the subscription when the component unmounts
  }, [dispatch]);



  const handleDelete = async (bookingId) => {
    try {
      const response = await fetch(`https://9ed25687-f3d5-4e4a-803d-018a47ca64f5-00-164ouryxp6q4w.kirk.replit.dev/delete/${bookingId}`, {
        method: 'DELETE',
      });
      if (response.ok) {
        // Dispatch an action to update Redux state instead of updating local state
        dispatch(deleteBooking(bookingId)); // Assuming you have an action creator named deleteBooking
        console.log('Booking deleted successfully');
      } else {
        console.error('Failed to delete booking');
      }
    } catch (error) {
      console.error('Error deleting booking:', error);
    }
  };


  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const day = date.getDate();
    const month = date.getMonth() + 1;
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  };

  const calculatePrice = (hours) => {
    const pricePerHour = 20; // Assuming price per hour is RM20
    return parseFloat(hours) * pricePerHour;
  };

  const handleUpdate = (booking) => {
    setSelectedBooking(booking);
    setShowUpdateModal(true);
  };


  return (
    <>
      <Table striped bordered hover variant="dark">
        <thead>
          <tr>
            <th>No</th>
            <th>Customer Name</th>
            <th>Email</th>
            <th>Description</th>
            <th>Sports Category</th>
            <th>Sports Location</th>
            <th>Date</th>
            <th>Hours to play</th>
            <th>Price</th>
            <th>Buttons</th>
          </tr>
        </thead>
        <tbody>
          {loading && (
            <tr>
              <td colSpan="11" className="text-center">
                <Spinner animation="border" className="ms-3 mt-3" variant="primary" />
              </td>
            </tr>
          )}
          {!loading && bookings && bookings.map((booking, index) => (
            <tr key={index}>
              <td>{index + 1}</td>
              <td>{booking.customer_name}</td>
              <td>{booking.email}</td>

              <td>{booking.description}</td>
              <td>{booking.sport_category}</td>
              <td>{booking.sport_location}</td>
              <td>{formatDate(booking.date)}</td>
              <td>{booking.duration_hours}</td>
              <td>RM {calculatePrice(booking.duration_hours)}</td>
              <td>
                <Button
                  variant="danger"
                  onClick={() => handleDelete(booking.id)}
                >
                  Delete
                </Button>
              </td>

              <td>
                <Button
                  variant="primary"
                  onClick={() => handleUpdate(booking)} // Call handleUpdate with booking data
                  className="ms-2" // Add margin to separate buttons
                >
                  Update
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
      {selectedBooking && (
        <UpdateBookingModal
          show={showUpdateModal}
          handleClose={() => setShowUpdateModal(false)}
          booking={selectedBooking} // Pass selected booking data to the modal
        />
      )}


    </>
  );



}