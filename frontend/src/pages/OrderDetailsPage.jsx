import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getOrderDetails } from "../redux/actions/orderActions";
import Loader from "../components/Loader";
import Message from "../components/Message";
import { Link } from "react-router-dom";
import useDocumentTitle from "../hooks/useDocumentTitle";

const OrderDetailsPage = () => {
  useDocumentTitle("Order Details");
  const { id } = useParams();
  const dispatch = useDispatch();
  const { userInfo } = useSelector((state) => state.userLogin);

  const { order, loading, error } = useSelector(
    (state) => state.orderDetails || {}
  );

  useEffect(() => {
    dispatch(getOrderDetails(id));
  }, [dispatch, id]);

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Back to Orders Link */}
      <Link
        to={userInfo?.isAdmin ? "/admin/orders" : "/my-orders"}
        className="text-indigo-600 hover:text-indigo-900 mb-4 inline-block"
      >
        &larr; Back to Orders
      </Link>
      <h1 className="text-2xl font-bold mb-6">Order Details</h1>

      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">{error}</Message>
      ) : order ? (
        <div className="space-y-4">
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold mb-4">Order Information</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <p>
                  <strong>Order ID:</strong> {order._id}
                </p>
                <p>
                  <strong>Date:</strong>{" "}
                  {new Date(order.createdAt).toLocaleString()}
                </p>
                <p>
                  <strong>Total:</strong> ${order.totalPrice}
                </p>
              </div>
              <div>
                <p>
                  <strong>Payment Status:</strong>
                  {order.isPaid ? (
                    <span className="text-green-500"> Paid</span>
                  ) : (
                    <span className="text-red-500"> Not Paid</span>
                  )}
                </p>
                <p>
                  <strong>Delivery Status:</strong>
                  {order.isDelivered ? (
                    <span className="text-green-500"> Delivered</span>
                  ) : (
                    <span className="text-red-500"> Not Delivered</span>
                  )}
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold mb-4">Shipping Information</h2>
            <div className="space-y-2">
              <p>
                <strong>Name:</strong> {order.shippingAddress?.fullName}
              </p>
              <p>
                <strong>Phone Number:</strong>{" "}
                {order.shippingAddress?.phoneNumber}
              </p>
              <p>
                <strong>Address:</strong> {order.shippingAddress?.address}
              </p>
              <p>
                <strong>City:</strong> {order.shippingAddress?.city}
              </p>
              <p>
                <strong>Postal Code:</strong>{" "}
                {order.shippingAddress?.postalCode}
              </p>
              <p>
                <strong>Country:</strong> {order.shippingAddress?.country}
              </p>
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold mb-4">Order Items</h2>
            <div className="space-y-4">
              {order.orderItems?.map((item) => (
                <div key={item._id} className="flex items-center border-b pb-4">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-20 h-20 object-cover rounded-lg mr-4"
                  />
                  <div className="flex-1">
                    <p className="font-medium">{item.name}</p>
                    <p>Quantity: {item.quantity}</p>
                    <p>Price: ${item.price}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      ) : (
        <Message variant="info">Order not found</Message>
      )}
    </div>
  );
};

export default OrderDetailsPage;
