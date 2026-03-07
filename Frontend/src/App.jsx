import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import MovieDetails from "./pages/MovieDetails";
import Login from "./pages/Login";
import Signup from "./pages/Signup";

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/movie/:id" element={<MovieDetails />} />
        {/* Placeholder Routes */}
        <Route
          path="/search"
          element={
            <div className="pt-20 text-white">Search Results Page...</div>
          }
        />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route
          path="/favorites"
          element={<div className="pt-20 text-white">Favorites Page...</div>}
        />
      </Routes>
    </Router>
  );
}

export default App;
