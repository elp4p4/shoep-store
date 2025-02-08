import { useState, useRef, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logoutUser } from "../redux/actions/userActions";

const Navbar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { userInfo } = useSelector((state) => state.userLogin);
  const { cartItems } = useSelector((state) => state.cart);

  // State for search functionality
  const [searchQuery, setSearchQuery] = useState("");
  const [showSearchResults, setShowSearchResults] = useState(false);
  const [searchResults, setSearchResults] = useState([]);
  const [searchTimeout, setSearchTimeout] = useState(null);

  // State for category dropdown
  const [showCategories, setShowCategories] = useState(false);
  const [showProfile, setShowProfile] = useState(false);

  const categoryDropdownRef = useRef(null);
  const profileDropdownRef = useRef(null);
  const searchRef = useRef(null);

  // Close dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        categoryDropdownRef.current &&
        !categoryDropdownRef.current.contains(event.target) &&
        profileDropdownRef.current &&
        !profileDropdownRef.current.contains(event.target) &&
        searchRef.current &&
        !searchRef.current.contains(event.target)
      ) {
        setShowCategories(false);
        setShowProfile(false);
        setShowSearchResults(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // Live search handler with debounce
  const handleSearch = async (query) => {
    if (query.trim()) {
      try {
        const response = await fetch(`/api/products/search?name=${query}`);
        const data = await response.json();
        setSearchResults(data);
        setShowSearchResults(true);
      } catch (error) {
        console.error("Search error:", error);
      }
    } else {
      setSearchResults([]);
      setShowSearchResults(false);
    }
  };

  // Debounced search input handler
  const handleSearchInput = (e) => {
    const query = e.target.value;
    setSearchQuery(query);

    // Clear existing timeout
    if (searchTimeout) clearTimeout(searchTimeout);

    // Set new timeout
    setSearchTimeout(
      setTimeout(() => {
        handleSearch(query);
      }, 300) // 300ms debounce delay
    );
  };

  // Navigate to product page and clear search bar
  const handleProductClick = (productId) => {
    setShowSearchResults(false);
    setSearchQuery(""); // Clear the search bar after selecting a product
    navigate(`/product/${productId}`);
  };

  // Toggle category dropdown
  const toggleCategories = () => {
    setShowCategories((prev) => !prev);
    setShowProfile(false); // Close profile dropdown if open
  };

  // Toggle profile dropdown
  const toggleProfile = () => {
    setShowProfile((prev) => !prev);
    setShowCategories(false); // Close category dropdown if open
  };

  // Close dropdowns when an option is selected
  const closeDropdowns = () => {
    setShowCategories(false);
    setShowProfile(false);
  };

  return (
    <nav className="bg-white shadow-lg">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-between h-16">
          <div className="flex items-center space-x-8">
            {/* Home Link */}
            <Link
              to="/"
              className="flex items-center text-2xl font-bold text-indigo-600"
            >
              <svg
                fill="#4F46E5"
                version="1.1"
                id="Layer_1"
                xmlns="http://www.w3.org/2000/svg"
                xmlnsXlink="http://www.w3.org/1999/xlink"
                viewBox="0 0 256 256"
                enableBackground="new 0 0 256 253"
                xmlSpace="preserve"
                stroke="#4F46E5"
                transform="rotate(0)matrix(-1, 0, 0, 1, 0, 0)"
                strokeWidth="0.00256"
                className="h-8 w-8 mr-2"
              >
                <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
                <g
                  id="SVGRepo_tracerCarrier"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  stroke="#000000"
                  strokeWidth="1.024"
                ></g>
                <g id="SVGRepo_iconCarrier">
                  <path d="M58.403,201.981l32.24-0.141l-0.282-14.783l36.464,14.923h69.971c0,0,5.631-11.545-8.166-20.414 c-6.617-4.364-19.569-7.743-31.395-14.36c-10.277-5.772-23.089-19.992-29.002-26.89c-0.282-0.422-0.704-0.704-0.986-1.126 c-0.845-0.704-1.83-1.126-3.097-1.126c-0.845,0-1.549,0.282-2.253,0.563c-0.141,0.141-0.422,0.282-0.704,0.422 c-5.35,3.238-15.487,8.306-26.186,7.462c-13.093-0.986-27.313-12.53-27.313-12.53s-8.588,11.685-9.433,27.453 C57.981,168.755,57.981,195.505,58.403,201.981z M136.962,167.488c1.689-1.549,4.224-1.549,5.772,0.141s1.549,4.224-0.141,5.772 c-1.689,1.549-4.224,1.549-5.772-0.141C135.413,171.712,135.273,169.037,136.962,167.488z M127.952,157.774 c1.689-1.549,4.224-1.549,5.772,0.141c1.549,1.689,1.549,4.224-0.141,5.772c-1.689,1.549-4.224,1.549-5.772-0.141 C126.262,161.997,126.262,159.322,127.952,157.774z M118.941,148.06c0.845-0.845,1.83-1.126,2.816-1.126 c0.704,0,1.408,0.141,2.112,0.563c0.282,0.282,0.563,0.422,0.845,0.704c1.549,1.689,1.549,4.224-0.141,5.772 c-1.689,1.549-4.224,1.549-5.772-0.141C117.252,152.283,117.393,149.749,118.941,148.06z M2,69c0,13.678,9.625,25.302,22,29.576V233 H2v18h252v-18h-22V98.554c12.89-3.945,21.699-15.396,22-29.554v-8H2V69z M65.29,68.346c0,6.477,6.755,31.47,31.727,31.47 c21.689,0,31.202-19.615,31.202-31.47c0,11.052,7.41,31.447,31.464,31.447c21.733,0,31.363-20.999,31.363-31.447 c0,14.425,9.726,26.416,22.954,30.154V233H42V98.594C55.402,94.966,65.29,82.895,65.29,68.346z M254,54H2l32-32V2h189v20h-0.168 L254,54z"></path>
                </g>
              </svg>
              ShoeP
            </Link>

            {/* Category Dropdown */}
            <div className="relative" ref={categoryDropdownRef}>
              <button
                onClick={toggleCategories}
                className="text-gray-600 hover:text-indigo-600 px-3 py-2 rounded-md flex items-center"
              >
                <span>Categories</span>
                <svg
                  className="h-5 w-5 ml-1"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </button>

              {/* Dropdown Menu */}
              {showCategories && (
                <div className="absolute left-0 mt-2 w-48 bg-white shadow-lg rounded-lg z-10">
                  <Link
                    to="/category/men"
                    className="block px-4 py-2 text-gray-800 hover:bg-gray-100"
                    onClick={closeDropdowns}
                  >
                    Men
                  </Link>
                  <Link
                    to="/category/women"
                    className="block px-4 py-2 text-gray-800 hover:bg-gray-100"
                    onClick={closeDropdowns}
                  >
                    Women
                  </Link>
                </div>
              )}
            </div>
          </div>

          {/* Search Bar */}
          <div
            className="flex items-center flex-1 mx-8 relative"
            ref={searchRef}
          >
            <div className="w-full">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search products..."
                  value={searchQuery}
                  onChange={handleSearchInput}
                  onFocus={() => setShowSearchResults(true)}
                  className="w-full px-4 py-2 rounded-full border border-gray-300 focus:outline-none focus:border-indigo-500"
                />
                <div className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500">
                  <svg
                    className="h-5 w-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                    />
                  </svg>
                </div>
              </div>
            </div>

            {/* Search Results */}
            {showSearchResults && searchResults.length > 0 && (
              <div className="absolute w-full top-full mt-1 bg-white shadow-lg rounded-lg z-50 max-h-96 overflow-y-auto">
                {searchResults.map((product) => (
                  <div
                    key={product._id}
                    onClick={() => handleProductClick(product._id)}
                    className="p-3 hover:bg-gray-100 cursor-pointer flex items-center space-x-4"
                  >
                    <img
                      src={product.images[0]}
                      alt={product.name}
                      className="w-10 h-10 object-cover rounded"
                    />
                    <div>
                      <p className="font-medium">{product.name}</p>
                      <p className="text-sm text-gray-600">${product.price}</p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Cart and User Section */}
          <div className="flex items-center space-x-4">
            <Link
              to="/cart"
              className="text-gray-600 hover:text-indigo-600 px-3 py-2 rounded-md relative"
            >
              <div className="flex items-center">
                <svg
                  className="h-5 w-5 mr-1"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
                  />
                </svg>
                Cart
                {cartItems.length > 0 && (
                  <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs px-2 py-1 rounded-full">
                    {cartItems.reduce((acc, item) => acc + item.quantity, 0)}
                  </span>
                )}
              </div>
            </Link>

            {userInfo ? (
              <div className="relative" ref={profileDropdownRef}>
                <div className="flex">
                  <button
                    onClick={toggleProfile}
                    className="text-gray-600 hover:text-indigo-600 px-3 py-2 rounded-md flex items-center"
                  >
                    <svg
                      className="h-5 w-5 mr-1"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                      />
                    </svg>
                    {userInfo.name}
                  </button>
                  <div className="items-center flex">
                    {userInfo.isAdmin && (
                      <span className="inline-flex items-center rounded-md bg-indigo-50 px-1 py-1 text-xs font-medium text-indigo-700 ring-1 ring-indigo-700/10 ring-inset ml-4">
                        Admin
                      </span>
                    )}
                  </div>
                </div>
                {/* Profile Dropdown Menu */}
                {showProfile && (
                  <div className="absolute right-0 bg-white shadow-lg rounded-lg w-48 mt-2">
                    <Link
                      to="/profile"
                      className="block px-4 py-2 text-gray-800 hover:bg-gray-100"
                      onClick={closeDropdowns}
                    >
                      Profile
                    </Link>

                    {userInfo && !userInfo.isAdmin && (
                      <Link
                        to="/my-orders"
                        className="block px-4 py-2 text-gray-800 hover:bg-gray-100"
                        onClick={closeDropdowns}
                      >
                        My Orders
                      </Link>
                    )}
                    {userInfo.isAdmin && (
                      <>
                        <Link
                          to="/admin/products"
                          className="block px-4 py-2 text-gray-800 hover:bg-gray-100"
                          onClick={closeDropdowns}
                        >
                          Manage Products
                        </Link>
                        <Link
                          to="/admin/orders"
                          className="block px-4 py-2 text-gray-800 hover:bg-gray-100"
                          onClick={closeDropdowns}
                        >
                          Manage Orders
                        </Link>
                      </>
                    )}
                    <button
                      onClick={() => {
                        dispatch(logoutUser());
                        closeDropdowns();
                      }}
                      className="w-full text-left px-4 py-2 text-gray-800 hover:bg-gray-100"
                    >
                      Logout
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <Link
                to="/login"
                className="text-gray-600 hover:text-indigo-600 px-3 py-2 rounded-md"
              >
                Login
              </Link>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
