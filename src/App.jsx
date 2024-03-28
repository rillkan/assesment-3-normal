import { BrowserRouter, Route, Routes } from "react-router-dom";
import AuthHome from "./pages/AuthHome";
import Home from "./pages/Home";
import Bookings from "./pages/Bookings";
import { AuthProvider } from "./components/AuthProvider"
import Navigation from "./pages/Navigation";
import { Provider } from "react-redux";
import store from "./store";


export default function App() {
  return (
    <Provider store={store}>
      <AuthProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Navigation />}>
              <Route path="/bookings" element={<Bookings />} />
              <Route path="/home" element={<Home />} />
            </Route>
            <Route path="/login" element={<AuthHome />} />
            <Route path="*" element={< AuthHome />} />
          </Routes>
        </BrowserRouter>
      </AuthProvider>
    </Provider>


  )
}