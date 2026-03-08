import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from "react-router-dom";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { authCheckStart, authCheckSuccess, authCheckFailure } from "./redux/authSlice";
import { authCheck } from "./services/authService";
import ProtectedRoute from "./components/ProtectedRoute";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import MovieDetails from "./pages/MovieDetails";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Favorites from "./pages/Favorites";
import History from "./pages/History";
import Movies from "./pages/Movies";
import TVShows from "./pages/TVShows";
import AdminDashboard from "./pages/AdminDashboard";

function App() {
  const dispatch = useDispatch();
  const { isCheckingAuth, isAuthenticated, user } = useSelector((state) => state.auth);

  useEffect(() => {
    const verifyUser = async () => {
      dispatch(authCheckStart());
      try {
        const res = await authCheck();
        dispatch(authCheckSuccess(res.user));
      } catch (err) {
        dispatch(authCheckFailure());
      }
    };
    verifyUser();
  }, [dispatch]);

  if (isCheckingAuth) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
         <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-red-600"></div>
      </div>
    );
  }

  const AdminRoute = ({ children }) => {
    if (!isAuthenticated || user?.role !== "admin") return <Navigate to="/" />;
    return children;
  };

  const AppLayout = () => {
    const location = useLocation();
    const hideNavOn = ["/login", "/signup"];
    const showNav = !hideNavOn.includes(location.pathname);
    return (
      <>
        {showNav && <Navbar />}
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/movie/:id" element={<MovieDetails />} />

          {/* Category Routes */}
          <Route path="/movies" element={<Movies />} />
          <Route path="/tv" element={<TVShows />} />

          {/* Other Routes */}
          <Route path="/search" element={<div className="pt-20 text-white">Search Results Page...</div>}/>
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />

          {/* Protected Routes */}
          <Route path="/favorites" element={<ProtectedRoute><Favorites /></ProtectedRoute>}/>
          <Route path="/history" element={<ProtectedRoute><History /></ProtectedRoute>}/>
          <Route path="/admin" element={<AdminRoute><AdminDashboard /></AdminRoute>}/>
        </Routes>
      </>
    );
  };

  return (
    <Router>
      <AppLayout />
    </Router>
  );
}

export default App;
