import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createOrder } from "../redux/actions/orderActions";
import { clearCart } from "../redux/actions/cartActions";
import { useNavigate } from "react-router-dom";
import useDocumentTitle from "../hooks/useDocumentTitle";

const CheckoutPage = () => {
  useDocumentTitle("Checkout");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { cartItems } = useSelector((state) => state.cart);
  const { userInfo } = useSelector((state) => state.userLogin);

  const [shippingAddress, setShippingAddress] = useState({
    fullName: "",
    phoneNumber: "", // ✅ Added phone number field
    address: "",
    city: "",
    postalCode: "",
    country: "",
  });

  const submitHandler = (e) => {
    e.preventDefault();

    // Prepare order items
    const orderItems = cartItems.map((item) => ({
      name: item.name,
      quantity: item.quantity,
      image: item.image,
      price: item.price,
      color: item.color,
      product: item.product, // Ensure this is the product ID
    }));

    // Prepare order data
    const orderData = {
      user: userInfo._id,
      orderItems,
      shippingAddress,
      paymentMethod: "Cash",
      totalPrice: cartItems.reduce(
        (acc, item) => acc + item.price * item.quantity,
        0
      ),
      isPaid: true,
      paidAt: new Date(),
      isDelivered: true,
    };

    // Dispatch createOrder
    dispatch(
      createOrder(orderData, (orderId) => {
        dispatch(clearCart());
        navigate(`/order/thank-you`);
      })
    );
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <h1 className="text-3xl font-bold mb-6">Checkout</h1>

      <div className="grid md:grid-cols-2 gap-8">
        {/* Shipping Form */}
        <form onSubmit={submitHandler} className="space-y-4">
          <div>
            <label className="block mb-1">Full Name</label>
            <input
              type="text"
              required
              className="w-full p-2 border rounded"
              value={shippingAddress.fullName}
              onChange={(e) =>
                setShippingAddress({
                  ...shippingAddress,
                  fullName: e.target.value,
                })
              }
            />
          </div>

          {/* ✅ Phone Number Input Field */}
          <div>
            <label className="block mb-1">Phone Number</label>
            <input
              type="tel"
              required
              className="w-full p-2 border rounded"
              value={shippingAddress.phoneNumber}
              onChange={(e) =>
                setShippingAddress({
                  ...shippingAddress,
                  phoneNumber: e.target.value,
                })
              }
            />
          </div>

          <div>
            <label className="block mb-1">Address</label>
            <input
              type="text"
              required
              className="w-full p-2 border rounded"
              value={shippingAddress.address}
              onChange={(e) =>
                setShippingAddress({
                  ...shippingAddress,
                  address: e.target.value,
                })
              }
            />
          </div>

          <div>
            <label className="block mb-1">City</label>
            <input
              type="text"
              required
              className="w-full p-2 border rounded"
              value={shippingAddress.city}
              onChange={(e) =>
                setShippingAddress({ ...shippingAddress, city: e.target.value })
              }
            />
          </div>

          <div>
            <label className="block mb-1">Postal Code</label>
            <input
              type="text"
              required
              className="w-full p-2 border rounded"
              value={shippingAddress.postalCode}
              onChange={(e) =>
                setShippingAddress({
                  ...shippingAddress,
                  postalCode: e.target.value,
                })
              }
            />
          </div>

          <div>
            <label className="block mb-1">Country</label>
            <input
              type="text"
              required
              className="w-full p-2 border rounded"
              value={shippingAddress.country}
              onChange={(e) =>
                setShippingAddress({
                  ...shippingAddress,
                  country: e.target.value,
                })
              }
            />
          </div>

          <button
            type="submit"
            className="w-full bg-indigo-600 text-white py-2 rounded hover:bg-indigo-700"
          >
            Place Order
          </button>
        </form>

        {/* Order Summary */}
        <div className="bg-gray-50 p-6 rounded-lg">
          <h2 className="text-xl font-bold mb-4">Order Summary</h2>
          <div className="space-y-4">
            {cartItems.map((item) => (
              <div
                key={`${item.product}-${item.color}`}
                className="flex justify-between"
              >
                <div>
                  <p>{item.name}</p>
                  <p className="text-sm text-gray-500">
                    {item.quantity} x ${item.price}
                  </p>
                </div>
                <span>${(item.quantity * item.price).toFixed(2)}</span>
              </div>
            ))}

            <div className="border-t pt-4">
              <div className="flex justify-between font-semibold">
                <span>Total:</span>
                <span>
                  $
                  {cartItems
                    .reduce((acc, item) => acc + item.price * item.quantity, 0)
                    .toFixed(2)}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckoutPage;
