import { useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getAllOrders, deleteOrder } from "../redux/actions/orderActions";
import Loader from "../components/Loader";
import Message from "../components/Message";
import { toast } from "react-toastify";
import useDocumentTitle from "../hooks/useDocumentTitle";

const AdminOrdersPage = () => {
  useDocumentTitle("Manage Orders");
  const dispatch = useDispatch();

  // Add orderDelete state
  const {
    orders,
    loading: loadingList,
    error: errorList,
  } = useSelector(
    (state) =>
      state.orderList || {
        orders: [],
        loading: false,
        error: null,
      }
  );

  const {
    loading: loadingDelete,
    error: errorDelete,
    success: successDelete,
  } = useSelector((state) => state.orderDelete || {});

  useEffect(() => {
    dispatch(getAllOrders());

    if (successDelete) {
      toast.success("Order deleted successfully");
    }
    if (errorDelete) {
      toast.error(errorDelete);
    }
  }, [dispatch, successDelete, errorDelete]);

  const deleteHandler = (id) => {
    if (window.confirm("Are you sure you want to delete this order?")) {
      dispatch(deleteOrder(id));
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-6">Orders Management</h1>

      {loadingList || loadingDelete ? (
        <Loader />
      ) : errorList ? (
        <Message variant="danger">{errorList}</Message>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full table-auto">
            <thead>
              <tr>
                <th className="px-4 py-2">ID</th>
                <th className="px-4 py-2">USER</th>
                <th className="px-4 py-2">DATE</th>
                <th className="px-4 py-2">TOTAL</th>
                <th className="px-4 py-2">PAID</th>
                <th className="px-4 py-2">DELIVERED</th>
                <th className="px-4 py-2">ACTIONS</th>
              </tr>
            </thead>
            <tbody>
              {orders?.map((order) => (
                <tr key={order._id} className="hover:bg-gray-50">
                  <td className="border-2 px-4 py-2">
                    {order._id.substring(0, 24)}
                  </td>
                  <td className="border-2 px-4 py-2">
                    {order.user?.name || "Guest"}
                  </td>
                  <td className="border-2 px-4 py-2">
                    {new Date(order.createdAt).toLocaleDateString()}
                  </td>
                  <td className="border-2 px-4 py-2">${order.totalPrice}</td>
                  <td className="border-2 px-4 py-2">
                    {order.isPaid ? (
                      <span className="text-green-500">Yes</span>
                    ) : (
                      <span className="text-red-500">No</span>
                    )}
                  </td>
                  <td className="border-2 px-4 py-2">
                    {order.isDelivered ? (
                      <span className="text-green-500">Yes</span>
                    ) : (
                      <span className="text-red-500">No</span>
                    )}
                  </td>
                  <td className="border-2 px-4 py-2 flex items-center space-x-3">
                    <Link
                      to={`/admin/order/${order._id}`}
                      className="flex items-center text-blue-500 border border-blue-500 rounded-lg px-2 py-1 transition duration-200 hover:bg-blue-500 hover:text-white"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="w-4 h-5 mr-2"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8Z"></path>
                        <circle cx="12" cy="12" r="3"></circle>
                      </svg>
                      Details
                    </Link>
                    <button
                      onClick={() => deleteHandler(order._id)}
                      className="flex items-center text-red-500 hover:underline border border-red-500 rounded-lg px-2 py-1 transition duration-200 hover:bg-red-500 hover:text-white"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="w-5 h-5 mr-1"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <polyline points="3 6 5 6 21 6"></polyline>
                        <path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6"></path>
                        <path d="M10 11v6"></path>
                        <path d="M14 11v6"></path>
                        <path d="M9 6V3h6v3"></path>
                      </svg>
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default AdminOrdersPage;
