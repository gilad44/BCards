import { useEffect, useState } from "react";
import { Route, Routes, useLocation } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import MyFooter from "../comps/MyFooter";
import RouteGuard from "../comps/RouteGuard";
import About from "../Pages/About";
import BusinessDetails from "../Pages/BusinessDetails";
import CreateCard from "../Pages/CreateCard";
import Crm from "../Pages/CRM";
import ErrorPage from "../Pages/ErrorPage";
import FavoriteCards from "../Pages/FavoritesPage";
import Login from "../Pages/Login";
import Main from "../Pages/Main";
import MyCards from "../Pages/MyCards";
import Profile from "../Pages/Profile";
import Signup from "../Pages/Signup";
import "../Styles/About.css";
import "../Styles/BusinessDetails.css";
import "../Styles/Cards.css";
import "../Styles/Crm.css";
import "../Styles/FavoritesPage.css";
import "../Styles/Footer.css";
import "../Styles/Form.css";
import "../Styles/Login.css";
import "../Styles/Main.css";
import "../Styles/MyCards.css";
import "../Styles/MyNav.css";
import "../Styles/Pagination.css";
import "../Styles/Profile.css";
import MyNav from "./MyNav";

const AppContent = () => {
  const [showInfinite, setShowInfinite] = useState(
    window.matchMedia("(max-width: 1024px)").matches,
  );
  const location = useLocation();

  useEffect(() => {
    const handleResize = () => {
      setShowInfinite(window.matchMedia("(max-width: 640px)").matches);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);
  const isAbout = location.pathname === "/about";
  const isProfile = location.pathname === "/profile";
  console.log(`W: ${window.innerWidth} H: ${window.innerHeight}`);

  return (
    <>
      <MyNav />
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/business/:id" element={<BusinessDetails />} />
        <Route path="/about" element={<About />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/*" element={<ErrorPage />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/my-cards" element={<MyCards />} />
        <Route path="/create-card" element={<CreateCard />} />
        <Route
          path="/crm"
          element={
            <RouteGuard isAdmin>
              <Crm />
            </RouteGuard>
          }
        />
        <Route
          path="/favorites"
          element={
            <RouteGuard>
              <FavoriteCards />
            </RouteGuard>
          }
        />
      </Routes>

      <ToastContainer />
      {!isAbout && !isProfile && <MyFooter linkText="About" />}
    </>
  );
};
export default AppContent;
