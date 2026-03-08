import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ProtectedRoute from "./components/ProtectedRoute";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import MovieDetails from "./pages/MovieDetails";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Favorites from "./pages/Favorites";
import History from "./pages/History";

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/movie/:id" element={<MovieDetails />} />
        {/* Placeholder Routes */}
        <Route path="/search" element={<div className="pt-20 text-white">Search Results Page...</div>}/>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />

        {/* Protected Routes */}
        <Route path="/favorites" element={<ProtectedRoute><Favorites /></ProtectedRoute>}/>
        <Route path="/history" element={<ProtectedRoute><History /></ProtectedRoute>}/>


      </Routes>
    </Router>
  );
}

export default App;
