import { Fragment, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { AiOutlineClose } from "react-icons/ai";
import toast from "react-hot-toast";
import axios from "axios";

export default function ViewOrderInfo({ order }) {
    const [isOpen, setIsOpen] = useState(false);
    const [currentStatus, setCurrentStatus] = useState(order.status);
    
    // නව state එකක් - Note එක save කරගැනීමට
    const [adminNote, setAdminNote] = useState(order.notes || "");

    const openModal = () => setIsOpen(true);
    const closeModal = () => setIsOpen(false);

    const handleStatusChange = (e) => {
        const newStatus = e.target.value;
        setCurrentStatus(newStatus);
        console.log("Updating order", order.orderID, "to", newStatus);
    };

    // Update button එක click කරද්දී ක්‍රියාත්මක වන function එක
    const handleUpdateOrder = async () => {
        const token = localStorage.getItem("token");
        
        // Token එක check කරන්න
        if (!token) {
            toast.error("Authentication token not found. Please login again.");
            console.error("Token missing from localStorage");
            return;
        }
        
        console.log("Token:", token.substring(0, 20) + "...");
        console.log("Order ID:", order.orderID);
        console.log("API URL:", `${import.meta.env.VITE_BACKEND_URL}/orders/${order.orderID}`);
        
        try {
            // Try PUT first
            const response = await axios.put(
                `${import.meta.env.VITE_BACKEND_URL}/orders/${order.orderID}`,
                {
                    status: currentStatus,
                    notes: adminNote,
                },
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        "Content-Type": "application/json",
                    },
                }
            );
            
            console.log("Update response:", response.data);
            toast.success("Order updated successfully!");
            closeModal();
        } catch (error) {
            console.error("Error updating order:", error);
            console.error("Error response:", error.response?.data);
            
            // Error එකේ status code එක check කරන්න
            if (error.response?.status === 401) {
                toast.error("Session expired. Please login again.");
            } else if (error.response?.status === 403) {
                toast.error("You don't have permission to update orders.");
            } else if (error.response?.status === 404) {
                toast.error("Order not found.");
            } else if (error.response?.status === 405) {
                toast.error("Update method not allowed. Please contact support.");
            } else {
                toast.error(error.response?.data?.message || "Failed to update order. Please try again.");
            }
        }
    };

    return (
        <>
            <button 
                className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-lg text-white text-sm font-medium transition-colors"
                onClick={openModal}
            >
                View Info
            </button>

            <Transition appear show={isOpen} as={Fragment}>
                <Dialog as="div" className="relative z-50" onClose={closeModal}>
                    <Transition.Child
                        as={Fragment}
                        enter="ease-out duration-300"
                        enterFrom="opacity-0"
                        enterTo="opacity-100"
                        leave="ease-in duration-200"
                        leaveFrom="opacity-100"
                        leaveTo="opacity-0"
                    >
                        <div className="fixed inset-0 bg-black bg-opacity-50" />
                    </Transition.Child>

                    <div className="fixed inset-0 overflow-y-auto">
                        <div className="flex min-h-full items-center justify-center p-4 text-center">
                            <Transition.Child
                                as={Fragment}
                                enter="ease-out duration-300"
                                enterFrom="opacity-0 scale-95"
                                enterTo="opacity-100 scale-100"
                                leave="ease-in duration-200"
                                leaveFrom="opacity-100 scale-100"
                                leaveTo="opacity-0 scale-95"
                            >
                                <Dialog.Panel className="w-full max-w-4xl transform overflow-hidden rounded-2xl bg-white p-8 text-left align-middle shadow-xl transition-all">
                                    {/* Header */}
                                    <div className="flex items-center justify-between mb-6 pb-4 border-b border-gray-200">
                                        <Dialog.Title className="text-2xl font-bold text-gray-800">
                                            Order Details
                                        </Dialog.Title>
                                        <button
                                            onClick={closeModal}
                                            className="text-gray-500 hover:text-gray-700 transition-colors"
                                        >
                                            <AiOutlineClose size={24} />
                                        </button>
                                    </div>

                                    {/* Order Info */}
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                                        <div className="space-y-3">
                                            <div>
                                                <p className="text-sm text-gray-500 font-medium">Order ID</p>
                                                <p className="text-lg font-mono text-gray-900">{order.orderID}</p>
                                            </div>
                                            <div>
                                                <p className="text-sm text-gray-500 font-medium">Order Date</p>
                                                <p className="text-lg text-gray-900">
                                                    {new Date(order.date).toLocaleString()}
                                                </p>
                                            </div>
                                            
                                            {/* DROPDOWN STATUS SELECTION */}
                                            <div>
                                                <p className="text-sm text-gray-500 font-medium mb-1">Status</p>
                                                <select 
                                                    value={currentStatus}
                                                    onChange={handleStatusChange}
                                                    className={`block w-full md:w-40 px-3 py-2 border-0 rounded-lg text-sm font-bold uppercase focus:ring-2 focus:ring-blue-500 transition-colors ${
                                                        currentStatus === 'pending' ? 'bg-yellow-100 text-yellow-700' :
                                                        currentStatus === 'delivered' ? 'bg-green-100 text-green-700' :
                                                        currentStatus === 'canceled' ? 'bg-red-100 text-red-700' :
                                                        'bg-blue-100 text-blue-700'
                                                    }`}
                                                >
                                                    <option value="pending">Pending</option>
                                                    <option value="completed">Completed</option>
                                                    <option value="delivered">Delivered</option>
                                                    <option value="canceled">Canceled</option>
                                                </select>
                                            </div>
                                        </div>

                                        <div className="space-y-3">
                                            <div>
                                                <p className="text-sm text-gray-500 font-medium">Customer Name</p>
                                                <p className="text-lg text-gray-900">{order.name}</p>
                                            </div>
                                            <div>
                                                <p className="text-sm text-gray-500 font-medium">Email</p>
                                                <p className="text-lg text-gray-900">{order.email}</p>
                                            </div>
                                            <div>
                                                <p className="text-sm text-gray-500 font-medium">Phone</p>
                                                <p className="text-lg text-gray-900">{order.phone || 'N/A'}</p>
                                            </div>
                                        </div>
                                    </div>

                                    {/* --- NEW TEXT BOX ADDED HERE --- */}
                                    <div className="mb-6">
                                        <p className="text-sm text-gray-500 font-medium mb-2">Admin Remarks / Notes</p>
                                        <textarea 
                                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none text-gray-900"
                                            rows="2"
                                            placeholder="Add special notes here..."
                                            value={adminNote}
                                            onChange={(e) => setAdminNote(e.target.value)}
                                        />
                                    </div>

                                    {/* Shipping Address */}
                                    {order.address && (
                                        <div className="mb-6 p-4 bg-gray-50 rounded-lg">
                                            <p className="text-sm text-gray-500 font-medium mb-2">Shipping Address</p>
                                            <p className="text-gray-900">{order.address}</p>
                                        </div>
                                    )}

                                    {/* Order Items Table */}
                                    <div className="mb-6">
                                        <h3 className="text-lg font-bold text-gray-800 mb-4">Order Items</h3>
                                        <div className="overflow-x-auto">
                                            <table className="w-full border border-gray-200 rounded-lg">
                                                <thead className="bg-gray-100">
                                                    <tr>
                                                        <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">Product ID</th>
                                                        <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">Quantity</th>
                                                        <th className="px-4 py-3 text-right text-sm font-medium text-gray-700">Price (LKR)</th>
                                                        <th className="px-4 py-3 text-right text-sm font-medium text-gray-700">Subtotal (LKR)</th>
                                                    </tr>
                                                </thead>
                                                <tbody className="divide-y divide-gray-200">
                                                    {order.items && order.items.length > 0 ? (
                                                        order.items.map((item, index) => (
                                                            <tr key={index} className="hover:bg-gray-50">
                                                                <td className="px-4 py-3 text-sm text-gray-900 font-mono">{item.productId}</td>
                                                                <td className="px-4 py-3 text-sm text-gray-900">{item.quantity}</td>
                                                                <td className="px-4 py-3 text-sm text-gray-900 text-right">{(item.price || 0).toFixed(2)}</td>
                                                                <td className="px-4 py-3 text-sm font-semibold text-gray-900 text-right">{((item.price || 0) * (item.quantity || 0)).toFixed(2)}</td>
                                                            </tr>
                                                        ))
                                                    ) : (
                                                        <tr>
                                                            <td colSpan="4" className="px-4 py-8 text-center text-gray-500">No items found</td>
                                                        </tr>
                                                    )}
                                                </tbody>
                                            </table>
                                        </div>
                                    </div>

                                    {/* Order Total */}
                                    <div className="border-t border-gray-200 pt-4">
                                        <div className="flex justify-end items-center">
                                            <span className="text-lg font-medium text-gray-700 mr-4">Total Amount:</span>
                                            <span className="text-2xl font-bold text-blue-600">
                                                LKR {(order.total || 0).toFixed(2)}
                                            </span>
                                        </div>
                                    </div>

                                    {/* Buttons Container */}
                                    <div className="mt-6 flex justify-end gap-3">
                                        <button
                                            onClick={closeModal}
                                            className="px-6 py-2 bg-gray-200 hover:bg-gray-300 text-gray-800 font-medium rounded-lg transition-colors"
                                        >
                                            Close
                                        </button>
                                        
                                        {/* --- UPDATE BUTTON - Only shows if there are changes --- */}
                                        {(adminNote !== (order.notes || "") || currentStatus !== order.status) && (
                                            <button
                                                onClick={handleUpdateOrder}
                                                className="px-6 py-2 bg-green-600 hover:bg-green-700 text-white font-medium rounded-lg shadow-md transition-colors"
                                            >
                                                Save Changes
                                            </button>
                                        )}
                                    </div>
                                </Dialog.Panel>
                            </Transition.Child>
                        </div>
                    </div>
                </Dialog>
            </Transition>
        </>
    );
}