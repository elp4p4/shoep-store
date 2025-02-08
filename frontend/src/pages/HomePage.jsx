import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { listProducts } from "../redux/actions/productActions";
import ProductCard from "../components/ProductCard";
import useDocumentTitle from "../hooks/useDocumentTitle";

const HomePage = ({ category }) => {
  useDocumentTitle("Products");
  const dispatch = useDispatch();
  const { products } = useSelector((state) => state.productList);

  // Add category to useEffect dependencies
  useEffect(() => {
    dispatch(listProducts(category)); // Pass category to listProducts
  }, [dispatch, category]); // Add category to dependencies

  // Filter states
  const [priceRange, setPriceRange] = useState([0, 300]);
  const [selectedColors, setSelectedColors] = useState([]);

  // Get unique colors from all products
  const allColors = [...new Set(products.flatMap((product) => product.colors))];

  useEffect(() => {
    dispatch(listProducts());
  }, [dispatch]);

  // Filtered products
  const filteredProducts = products.filter((product) => {
    // Add category filter
    const categoryMatch = !category || product.category === category;
    const priceMatch =
      product.price >= priceRange[0] && product.price <= priceRange[1];
    const colorMatch =
      selectedColors.length === 0 ||
      product.colors.some((color) => selectedColors.includes(color));

    return categoryMatch && priceMatch && colorMatch;
  });

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid md:grid-cols-4 gap-8">
        {/* Filters Sidebar */}
        <div className="md:col-span-1">
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-bold mb-6">Shop By</h2>

            {/* Price Range Filter */}
            <div className="mb-8">
              <h3 className="font-semibold mb-4">Price</h3>
              <input
                type="range"
                min="0"
                max="300"
                value={priceRange[1]}
                onChange={(e) => setPriceRange([0, e.target.value])}
                className="w-full"
              />
              <div className="flex justify-between text-sm text-gray-600 mt-2">
                <span>$0</span>
                <span>${priceRange[1]}</span>
              </div>
            </div>

            {/* Color Filter */}
            <div>
              <h3 className="font-semibold mb-4">Color</h3>
              <div className="space-y-2">
                {allColors.map((color) => (
                  <label key={color} className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      checked={selectedColors.includes(color)}
                      onChange={(e) => {
                        if (e.target.checked) {
                          setSelectedColors([...selectedColors, color]);
                        } else {
                          setSelectedColors(
                            selectedColors.filter((c) => c !== color)
                          );
                        }
                      }}
                      className="form-checkbox h-5 w-5 text-indigo-600"
                    />
                    <span className="flex items-center">
                      <span
                        className="w-4 h-4 rounded-full mr-2"
                        style={{ backgroundColor: color }}
                      ></span>
                      {color}
                    </span>
                  </label>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Products Grid */}
        <div className="md:col-span-3">
          <h1 className="text-3xl font-bold mb-6">Featured Products</h1>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProducts.map((product) => (
              <ProductCard key={product._id} product={product} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
