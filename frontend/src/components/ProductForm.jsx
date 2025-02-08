import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import {
  createProduct,
  updateProduct,
  getProductDetails,
} from "../redux/actions/productActions";
import { toast } from "react-toastify";
import Loader from "../components/Loader";

const ProductForm = ({ editMode }) => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Single form state object with default values
  const [formData, setFormData] = useState({
    name: "",
    brand: "",
    price: "0",
    description: "",
    images: "",
    colors: "",
    category: "",
    stock: "0",
  });

  // Redux state selectors
  const { loading: loadingCreate, error: errorCreate } = useSelector(
    (state) => state.productCreate
  );
  const { loading: loadingUpdate, error: errorUpdate } = useSelector(
    (state) => state.productUpdate
  );
  const {
    product,
    loading: loadingDetails,
    error: errorDetails,
  } = useSelector((state) => state.productDetails);

  const loading = editMode ? loadingUpdate || loadingDetails : loadingCreate;
  const error = editMode ? errorUpdate : errorCreate;

  // Load product data for editing
  useEffect(() => {
    if (editMode && id) {
      dispatch(getProductDetails(id));
    }
  }, [dispatch, id, editMode]);

  // Update form data when product loads
  useEffect(() => {
    if (editMode && product) {
      setFormData({
        name: product.name || "",
        brand: product.brand || "",
        price: product.price?.toString() || "0",
        description: product.description || "",
        images: product.images?.join(", ") || "",
        colors: product.colors?.join(", ") || "",
        category: product.category || "",
        stock: product.stock?.toString() || "0",
      });
    }
  }, [product, editMode]);

  // Loading and error states
  if (loadingDetails && editMode) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-8">
        <h1 className="text-2xl font-bold mb-6">Loading Product Details...</h1>
        <Loader />
      </div>
    );
  }

  if (errorDetails && editMode) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-8">
        <h1 className="text-2xl font-bold mb-6">Error Loading Product</h1>
        <div className="text-red-500">{errorDetails}</div>
      </div>
    );
  }

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const submitHandler = (e) => {
    e.preventDefault();

    const productData = {
      ...formData,
      price: Number(formData.price),
      stock: Number(formData.stock),
      images: formData.images.split(",").map((img) => img.trim()),
      colors: formData.colors.split(",").map((color) => color.trim()),
    };

    if (editMode) {
      dispatch(
        updateProduct(id, productData, () => {
          toast.success("Product updated successfully");
          navigate("/admin/products");
        })
      );
    } else {
      dispatch(
        createProduct(productData, () => {
          toast.success("Product created successfully");
          navigate("/admin/products");
        })
      );
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-6">
        {editMode ? "Edit Product" : "Create New Product"}
      </h1>

      <form onSubmit={submitHandler} className="space-y-4">
        <div>
          <label className="block mb-1">Product Name</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="w-full p-2 border rounded"
            required
          />
        </div>

        <div>
          <label className="block mb-1">Brand</label>
          <input
            type="text"
            name="brand"
            value={formData.brand}
            onChange={handleChange}
            className="w-full p-2 border rounded"
            required
          />
        </div>

        <div>
          <label className="block mb-1">Price</label>
          <input
            type="number"
            name="price"
            value={formData.price}
            onChange={handleChange}
            className="w-full p-2 border rounded"
            required
          />
        </div>

        <div>
          <label className="block mb-1">Description</label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            className="w-full p-2 border rounded h-32"
            required
          />
        </div>

        <div>
          <label className="block mb-1">Image URLs (comma separated)</label>
          <input
            type="text"
            name="images"
            value={formData.images}
            onChange={handleChange}
            className="w-full p-2 border rounded"
            required
          />
        </div>

        <div>
          <label className="block mb-1">Colors (comma separated)</label>
          <input
            type="text"
            name="colors"
            value={formData.colors}
            onChange={handleChange}
            className="w-full p-2 border rounded"
            required
          />
        </div>

        <div>
          <label className="block mb-1">Category</label>
          <input
            type="text"
            name="category"
            value={formData.category}
            onChange={handleChange}
            className="w-full p-2 border rounded"
            required
          />
        </div>

        <div>
          <label className="block mb-1">Stock Quantity</label>
          <input
            type="number"
            name="stock"
            value={formData.stock}
            onChange={handleChange}
            className="w-full p-2 border rounded"
            required
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="bg-indigo-600 text-white px-6 py-2 rounded hover:bg-indigo-700 disabled:bg-gray-400"
        >
          {loading
            ? editMode
              ? "Updating..."
              : "Creating..."
            : editMode
            ? "Update Product"
            : "Create Product"}
        </button>

        {error && <div className="text-red-500 mt-2">{error}</div>}
      </form>
    </div>
  );
};

export default ProductForm;
