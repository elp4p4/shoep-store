import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getProductDetails } from "../redux/actions/productActions";
import Loader from "../components/Loader";
import Message from "../components/Message";
import { addToCart } from "../redux/actions/cartActions";
import { toast } from "react-toastify";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/zoom";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Zoom } from "swiper/modules";
import useDocumentTitle from "../hooks/useDocumentTitle";

const ProductPage = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const [quantityError, setQuantityError] = useState("");

  const { product, loading, error } = useSelector(
    (state) => state.productDetails || {}
  );

  // State for selected color and quantity
  const [selectedColor, setSelectedColor] = useState("");
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    dispatch(getProductDetails(id));
  }, [dispatch, id]);

  // Add safe defaults for product data
  const images = product?.images || [];
  const colors = product?.colors || [];
  const description = product?.description || "No description available";
  const brand = product?.brand || "Unknown brand";
  useDocumentTitle(`${product.name}`);
  const handleAddToCart = async () => {
    if (!selectedColor) {
      toast.error("Please select a color");
      return;
    }

    try {
      await dispatch(addToCart(product, quantity, selectedColor));
      toast.success(`${quantity} ${product.name} added to cart`);
    } catch (error) {
      setQuantityError(error.message);
      toast.error(error.message);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-7xl">
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">{error}</Message>
      ) : product ? (
        <div className="grid md:grid-cols-2 gap-12 ">
          {/* Image Carousel with Zoom */}
          <div className="swiper-container border rounded-lg overflow-hidden shadow-lg">
            <Swiper
              modules={[Navigation, Pagination, Zoom]}
              zoom={{
                maxRatio: 2,
                minRatio: 1,
                toggle: true,
              }}
              spaceBetween={10}
              slidesPerView={1}
              navigation
              pagination={{ clickable: true }}
              loop={true}
              className="h-[500px]"
            >
              {images.length > 0 ? (
                images.map((img, index) => (
                  <SwiperSlide key={index}>
                    <div className="swiper-zoom-container">
                      <img
                        src={img}
                        alt={`${product.name} - ${index + 1}`}
                        className="w-full h-full object-contain cursor-zoom-in"
                      />
                    </div>
                  </SwiperSlide>
                ))
              ) : (
                <SwiperSlide>
                  <div className="bg-gray-100 w-full h-full flex items-center justify-center rounded-lg">
                    <span className="text-gray-400">No images available</span>
                  </div>
                </SwiperSlide>
              )}
            </Swiper>
          </div>

          {/* Product details */}
          <div className="space-y-6">
            <h1 className="text-4xl font-bold">{product.name}</h1>
            <p className="text-3xl font-semibold text-gray-800">
              ${product.price}
            </p>

            <div className="space-y-4">
              <div>
                <span className="font-medium">Brand:</span> {brand}
              </div>

              {/* Color selection */}
              <div className="space-y-2">
                <h3 className="text-lg font-semibold">Available Colors:</h3>
                <div className="flex flex-wrap gap-2">
                  {colors.map((color) => (
                    <button
                      key={color}
                      onClick={() => {
                        setSelectedColor(color);
                        setQuantityError("");
                      }}
                      className={`w-10 h-10 rounded-full border-2 ${
                        selectedColor === color
                          ? "border-indigo-600"
                          : "border-gray-200"
                      }`}
                      style={{ backgroundColor: color }}
                      title={color}
                    />
                  ))}
                </div>
              </div>
              {/* Quantity selection */}
              <div className="space-y-2">
                <label className="block text-lg font-semibold">Quantity:</label>
                <input
                  type="number"
                  min="1"
                  max={product.stock}
                  value={quantity}
                  onChange={(e) => {
                    const value = Math.max(
                      1,
                      Math.min(product.stock, e.target.value)
                    );
                    setQuantity(value);
                    setQuantityError("");
                  }}
                  className={`w-20 px-3 py-2 border rounded-md ${
                    quantityError ? "border-red-500" : "border-gray-300"
                  }`}
                />
                {quantityError && (
                  <p className="text-red-500 text-sm">{quantityError}</p>
                )}
                <p className="text-gray-600 text-sm">
                  {product.stock} items available
                </p>
              </div>

              <button
                onClick={handleAddToCart}
                className="py-3 px-4 inline-flex items-center gap-x-2 text-sm font-medium rounded-lg border border-transparent bg-blue-600 text-white hover:bg-blue-700 focus:outline-none focus:bg-blue-700 disabled:opacity-50 disabled:pointer-events-none"
              >
                Add to Cart
                <svg
                  class="shrink-0 size-4"
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                >
                  <path d="m5 11 4-7"></path>
                  <path d="m19 11-4-7"></path>
                  <path d="M2 11h20"></path>
                  <path d="m3.5 11 1.6 7.4a2 2 0 0 0 2 1.6h9.8c.9 0 1.8-.7 2-1.6l1.7-7.4"></path>
                  <path d="m9 11 1 9"></path>
                  <path d="M4.5 15.5h15"></path>
                  <path d="m15 11-1 9"></path>
                </svg>
              </button>
            </div>

            <div className="pt-6 border-t">
              <h2 className="text-xl font-semibold mb-4">
                Product Description
              </h2>
              <div className="text-gray-600 space-y-4">
                {description.split("\n").map((paragraph, index) => (
                  <p key={index}>{paragraph}</p>
                ))}
              </div>
            </div>
          </div>
        </div>
      ) : (
        <Message variant="info">Product not found</Message>
      )}
    </div>
  );
};

export default ProductPage;
