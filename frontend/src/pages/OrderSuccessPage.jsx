import { useEffect } from "react";
import { Link } from "react-router-dom";
import { clearCart } from "../redux/actions/cartActions";
import { useDispatch } from "react-redux";
import { FaCheckCircle } from "react-icons/fa";
import useDocumentTitle from "../hooks/useDocumentTitle";

const OrderSuccessPage = () => {
  useDocumentTitle("Order Placed Successfully!");
  const dispatch = useDispatch();

  useEffect(() => {
    // Clear cart when component mounts
    dispatch(clearCart());
  }, [dispatch]);

  return (
    <div className="container mx-auto px-4 py-8 text-center">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-3xl font-bold mb-4">Order Placed Successfully!</h1>
        <div className="flex justify-center">
          <FaCheckCircle className="text-green-600 w-20 h-20 mb-4" />
        </div>
        <p className="mb-6">
          Thank you for your purchase. We will contact you soon.
        </p>
        <Link
          to="/"
          className="bg-indigo-600 text-white px-6 py-2 rounded hover:bg-indigo-700"
        >
          Continue Shopping
        </Link>
      </div>
    </div>
  );
};

export default OrderSuccessPage;
