import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import {
  removeFromCart,
  updateCartItemQuantity,
} from "../redux/actions/cartActions";
import { toast } from "react-toastify";
import useDocumentTitle from "../hooks/useDocumentTitle";

const CartPage = () => {
  useDocumentTitle("Cart");
  const dispatch = useDispatch();
  const { cartItems } = useSelector((state) => state.cart);

  const handleRemoveItem = (productId, color) => {
    dispatch(removeFromCart(productId, color));
    toast.success("Item removed from cart");
  };

  const handleQuantityChange = (productId, color, quantity) => {
    try {
      dispatch(updateCartItemQuantity(productId, color, quantity));
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Shopping Cart</h1>

      {cartItems.length === 0 ? (
        <div className="text-center">
          Your cart is empty{" "}
          <Link to="/" className="text-indigo-600">
            Go Back
          </Link>
        </div>
      ) : (
        <div className="grid md:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="md:col-span-2 space-y-4">
            {cartItems.map((item) => (
              <div
                key={`${item.product}-${item.color}`}
                className="border rounded-lg p-4"
              >
                <div className="flex items-center space-x-4">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-20 h-20 object-cover rounded"
                  />
                  <div className="flex-1">
                    <h3 className="font-semibold">{item.name}</h3>
                    <p className="text-gray-600">${item.price}</p>
                    <p className="text-sm text-gray-500">Color: {item.color}</p>
                  </div>
                  <div className="flex items-center space-x-4">
                    <input
                      type="number"
                      min="1"
                      max={item.stock}
                      value={item.quantity}
                      onChange={(e) =>
                        handleQuantityChange(
                          item.product,
                          item.color,
                          Math.max(1, e.target.value)
                        )
                      }
                      className="w-20 px-2 py-1 border rounded"
                    />
                    <button
                      onClick={() => handleRemoveItem(item.product, item.color)}
                      className="text-red-500 hover:text-red-700"
                    >
                      Remove
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Order Summary */}
          <div className="bg-gray-50 p-6 rounded-lg">
            <h2 className="text-xl font-bold mb-4">Order Summary</h2>
            <div className="space-y-4">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span>
                  $
                  {cartItems
                    .reduce((acc, item) => acc + item.price * item.quantity, 0)
                    .toFixed(2)}
                </span>
              </div>
              <Link to="/checkout">
                <button className="w-full bg-indigo-600 text-white py-3 mt-4 rounded hover:bg-indigo-700">
                  Proceed to Checkout
                </button>
              </Link>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CartPage;
