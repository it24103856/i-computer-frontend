import { BiPlus } from "react-icons/bi";
import { Link } from "react-router-dom";
import axios from "axios";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

export default function AdminProductsPage() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  // Load products once (on page open)
  useEffect(() => {
    axios
      .get(import.meta.env.VITE_BACKEND_URL + "/products")
      .then((response) => {
        setProducts(response.data);
      })
      .catch(() => {
        toast.error("Failed to load products");
      })
      .finally(() => setLoading(false));
  }, []);

  const handleDelete = (productID) => {
    const token = localStorage.getItem("token");

    axios
      .delete(import.meta.env.VITE_BACKEND_URL + "/products/" + productID, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then(() => {
        toast.success("Product deleted");
        // Update UI immediately (no refresh) by removing from state
        setProducts((prev) => prev.filter((p) => p.productID !== productID));
      })
      .catch(() => {
        toast.error("Delete failed");
      });
  };

  return (
    <div className="w-full min-h-screen bg-gradient-to-br from-gray-50 via-gray-100 to-gray-200 p-10">
      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-800 mb-2">
            Product Management
          </h1>
          <p className="text-gray-600">Manage your product inventory</p>
        </div>

        {/* Table Card */}
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-200">
          {loading && (
            <div className="p-6 text-gray-600">Loading products...</div>
          )}

          {!loading && (
            <>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="bg-gradient-to-r from-gray-800 to-gray-700 text-white">
                      <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider">
                        Image
                      </th>
                      <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider">
                        Product ID
                      </th>
                      <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider">
                        Name
                      </th>
                      <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider">
                        Description
                      </th>
                      <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider">
                        Model
                      </th>
                      <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider">
                        Price
                      </th>
                      <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider">
                        Labeled Price
                      </th>
                      <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider">
                        Category
                      </th>
                      <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider">
                        Brand
                      </th>
                      <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider">
                        Stock
                      </th>
                      <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider">
                        Availability
                      </th>
                      <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider">
                        Actions
                      </th>
                    </tr>
                  </thead>

                  <tbody className="divide-y divide-gray-200">
                    {products.map((item) => (
                      <tr
                        key={item.productID}
                        className="hover:bg-gradient-to-r hover:from-gray-50 hover:to-white transition-all duration-300 ease-in-out transform hover:scale-[1.01]"
                      >
                        <td className="px-6 py-4">
                          <div className="relative group">
                            <img
                              src={item.image?.[0]}
                              alt={item.name}
                              className="w-16 h-16 object-cover rounded-xl shadow-md group-hover:shadow-xl transition-shadow duration-300 ring-2 ring-gray-100"
                            />
                            <div className="absolute inset-0 bg-black opacity-0 group-hover:opacity-10 rounded-xl transition-opacity duration-300"></div>
                          </div>
                        </td>

                        <td className="px-6 py-4">
                          <span className="text-sm font-mono font-semibold text-gray-700 bg-gray-100 px-3 py-1 rounded-lg">
                            {item.productID}
                          </span>
                        </td>

                        <td className="px-6 py-4">
                          <span className="text-sm font-medium text-gray-900">
                            {item.name}
                          </span>
                        </td>

                        <td className="px-6 py-4 max-w-xs">
                          <p
                            className="text-sm text-gray-600 line-clamp-2"
                            title={item.description}
                          >
                            {item.description}
                          </p>
                        </td>

                        <td className="px-6 py-4">
                          <span className="text-sm text-gray-600">
                            {item.model}
                          </span>
                        </td>

                        <td className="px-6 py-4">
                          <span className="text-sm font-bold text-green-600">
                            ${Number(item.price || 0).toFixed(2)}
                          </span>
                        </td>

                        <td className="px-6 py-4">
                          <span className="text-sm text-gray-500 line-through">
                            ${Number(item.labeledPrice || 0).toFixed(2)}
                          </span>
                        </td>

                        <td className="px-6 py-4">
                          <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                            {item.category}
                          </span>
                        </td>

                        <td className="px-6 py-4">
                          <span className="text-sm font-medium text-gray-700">
                            {item.brand}
                          </span>
                        </td>

                        <td className="px-6 py-4">
                          <span
                            className={`inline-flex items-center justify-center w-12 h-12 rounded-full font-bold text-sm ${
                              item.stock > 20
                                ? "bg-green-100 text-green-800"
                                : item.stock > 0
                                ? "bg-yellow-100 text-yellow-800"
                                : "bg-red-100 text-red-800"
                            }`}
                          >
                            {item.stock}
                          </span>
                        </td>

                        <td className="px-6 py-4">
                          <span
                            className={`inline-flex items-center px-4 py-2 rounded-full text-xs font-semibold shadow-sm ${
                              item.isAvailable
                                ? "bg-gradient-to-r from-green-400 to-green-500 text-white"
                                : "bg-gradient-to-r from-red-400 to-red-500 text-white"
                            }`}
                          >
                            {item.isAvailable ? "✓ Available" : "✗ Out of Stock"}
                          </span>
                        </td>

                        <td className="px-4 py-3 text-sm">
                          <div className="inline-flex items-center gap-2 opacity-60">
                            <button
                              onClick={() => handleDelete(item.productID)}
                              className="w-[100px] bg-red-600 text-white justify-center items-center p-2 rounded-lg cursor-pointer hover:bg-red-500 transition-colors duration-300"
                            >
                              Delete
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Empty State */}
              {products.length === 0 && (
                <div className="text-center py-16">
                  <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-gray-100 mb-4">
                    <BiPlus className="text-4xl text-gray-400" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-700 mb-2">
                    No Products Yet
                  </h3>
                  <p className="text-gray-500 mb-6">
                    Get started by adding your first product
                  </p>
                </div>
              )}
            </>
          )}
        </div>
      </div>

      {/* Floating Add Button */}
      <Link
        to="/admin/add-product"
        className="fixed bottom-8 right-8 w-16 h-16 flex items-center justify-center rounded-full
               bg-gradient-to-r from-accent via-accent to-accent/90 text-white shadow-2xl
               hover:shadow-accent/50 hover:scale-110 transition-all duration-300 transform
               ring-4 ring-white group"
      >
        <BiPlus className="text-4xl group-hover:rotate-90 transition-transform duration-300" />
      </Link>
    </div>
  );
}
