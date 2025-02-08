import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { listProducts, deleteProduct } from "../redux/actions/productActions";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import useDocumentTitle from "../hooks/useDocumentTitle";

const AdminProductsPage = () => {
  useDocumentTitle("Manage Products");
  const dispatch = useDispatch();
  const { products } = useSelector((state) => state.productList);
  const {
    loading: loadingDelete,
    error: errorDelete,
    success: successDelete,
  } = useSelector((state) => state.productDelete);

  useEffect(() => {
    dispatch(listProducts());

    if (successDelete) {
      toast.success("Product deleted successfully");
    }
  }, [dispatch, successDelete]);

  const deleteHandler = (id) => {
    if (window.confirm("Are you sure you want to delete this product?")) {
      dispatch(deleteProduct(id));
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Products Management</h1>
        <Link
          to="/admin/product/new"
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          Add New Product
        </Link>
      </div>

      {errorDelete && <div className="text-red-500 mb-4">{errorDelete}</div>}
      {loadingDelete && <div className="mb-4">Deleting...</div>}

      <div className="overflow-x-auto">
        <table className="min-w-full table-auto">
          <thead>
            <tr>
              <th className="px-4 py-2">Name</th>
              <th className="px-4 py-2">Price</th>
              <th className="px-4 py-2">Stock</th>
              <th className="px-4 py-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {products?.map((product) => (
              <tr key={product._id} className="hover:bg-gray-50">
                <td className="border-2 px-4 py-2">{product.name}</td>
                <td className="border-2 px-4 py-2">${product.price}</td>
                <td className="border-2 px-4 py-2">{product.stock}</td>
                <td className="border-2 px-4 py-2 flex items-center space-x-3">
                  {product && product._id ? (
                    <Link
                      to={`/admin/product/${product._id}/edit`}
                      className="flex items-center text-blue-500 border border-blue-500 rounded-lg px-2 py-1 transition duration-200 hover:bg-blue-500 hover:text-white"
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
                        <path d="M12 20h9"></path>
                        <path d="M16.5 3.5a2.121 2.121 0 1 1 3 3L7 19l-4 1 1-4 12.5-12.5z"></path>
                      </svg>
                      Edit
                    </Link>
                  ) : (
                    <span className="text-gray-400">Loading...</span>
                  )}

                  <button
                    onClick={() => deleteHandler(product._id)}
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
    </div>
  );
};

export default AdminProductsPage;
