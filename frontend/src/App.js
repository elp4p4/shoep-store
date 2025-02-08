// frontend/src/App.js
import { useEffect } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// Components
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import PrivateRoute from "./components/PrivateRoute";
import AdminRoute from "./components/AdminRoute";

// Pages
import ProductPage from "./pages/ProductPage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import CartPage from "./pages/CartPage";
import ProfilePage from "./pages/ProfilePage";
import AdminProductsPage from "./pages/AdminProductsPage";
import AdminOrdersPage from "./pages/AdminOrdersPage";
import UserOrdersPage from "./pages/UserOrdersPage";
import NotFoundPage from "./pages/NotFoundPage";
import LoggedInRoute from "./components/LoggedInRoute";
import ProductForm from "./components/ProductForm";

// Redux Actions
import { getUserDetails, logoutUser } from "./redux/actions/userActions";
import OrderDetailsPage from "./pages/OrderDetailsPage";
import CheckoutPage from "./pages/CheckoutPage";
import OrderSuccessPage from "./pages/OrderSuccessPage";
import UserRoute from "./components/UserRoute";
import MenCategoryPage from "./pages/MenCategoryPage";
import WomenCategoryPage from "./pages/WomenCategoryPage";
import MainPage from "./pages/MainPage";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Terms from "./pages/Terms";
import Success from "./pages/Success";

function App() {
  const dispatch = useDispatch();
  const { userInfo } = useSelector((state) => state.userLogin);

  useEffect(() => {
    if (userInfo) {
      dispatch(getUserDetails());
    }
  }, [dispatch, userInfo]);
  useEffect(() => {
    const handleStorageChange = (e) => {
      if (e.key === "logout") {
        dispatch(logoutUser());
      }
    };

    window.addEventListener("storage", handleStorageChange);
    return () => window.removeEventListener("storage", handleStorageChange);
  }, [dispatch]);
  return (
    <Router>
      <div className="flex flex-col min-h-screen">
        <Navbar />

        <main className="flex-grow">
          <ToastContainer position="bottom-right" />
          <div className="container mx-auto px-4 py-8">
            <Routes>
              {/* Public routes */}
              <Route path="/" element={<MainPage />} />
              <Route path="/product/:id" element={<ProductPage />} />
              <Route path="/checkout" element={<CheckoutPage />} />
              <Route path="/order/thank-you" element={<OrderSuccessPage />} />
              <Route path="/category/men" element={<MenCategoryPage />} />
              <Route path="/category/women" element={<WomenCategoryPage />} />
              <Route path="/about" element={<About />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/terms" element={<Terms />} />
              <Route path="/success" element={<Success />} />

              {/* Auth routes for non-logged-in users */}
              <Route element={<LoggedInRoute />}>
                <Route path="/login" element={<LoginPage />} />
                <Route path="/register" element={<RegisterPage />} />
              </Route>

              {/* Protected user routes */}
              <Route element={<PrivateRoute />}>
                <Route path="/profile" element={<ProfilePage />} />
                <Route path="/cart" element={<CartPage />} />
                <Route path="/order/:id" element={<OrderDetailsPage />} />
              </Route>

              {/* Only for non-admin users */}
              <Route element={<UserRoute />}>
                <Route path="/my-orders" element={<UserOrdersPage />} />
              </Route>

              {/* Admin routes */}
              <Route element={<AdminRoute />}>
                <Route path="/admin/products" element={<AdminProductsPage />} />
                <Route path="/admin/orders" element={<AdminOrdersPage />} />
                <Route
                  path="/admin/product/new"
                  element={<ProductForm editMode={false} />}
                />
                <Route
                  path="/admin/product/:id/edit"
                  element={<ProductForm editMode={true} />}
                />
                <Route path="/admin/order/:id" element={<OrderDetailsPage />} />
              </Route>

              {/* 404 Page */}
              <Route path="*" element={<NotFoundPage />} />
            </Routes>
          </div>
        </main>

        <Footer />
      </div>
    </Router>
  );
}

export default App;
