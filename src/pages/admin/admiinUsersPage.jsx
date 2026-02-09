import { BiTrash, BiEditAlt, BiBlock, BiCheckShield } from "react-icons/bi";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useEffect, useState, Fragment } from "react";
import toast from "react-hot-toast";
import { Dialog, Transition } from "@headlessui/react";
import { GoVerified } from "react-icons/go";

export default function AdminUserPage() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isConfirmOpen, setIsConfirmOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [deleting, setDeleting] = useState(false);
  const navigate = useNavigate();

  // 1. Load All Users
  const fetchUsers = async () => {
    const token = localStorage.getItem("token");
    try {
      const response = await axios.get(import.meta.env.VITE_BACKEND_URL + "/users/all", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setUsers(response.data);
    } catch (err) {
      toast.error("Failed to load users");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  // 2. Toggle Block Status Logic
  const handleToggleBlock = async (user) => {
    const token = localStorage.getItem("token");
    const newStatus = !user.isblocked; // schema එකේ field එක

    try {
      await axios.put(
        `${import.meta.env.VITE_BACKEND_URL}/users/toggle-block/${user.email}`,
        { isBlocked: newStatus },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      toast.success(newStatus ? "User Blocked" : "User Unblocked");
      
      // UI එක refresh කරමු
      setUsers((prev) =>
        prev.map((u) => (u.email === user.email ? { ...u, isblocked: newStatus } : u))
      );
    } catch (err) {
      toast.error(err.response?.data?.message || "Status update failed");
    }
  };

  // 3. Delete Logic
  const openDeleteConfirm = (user) => {
    setSelectedUser(user);
    setIsConfirmOpen(true);
  };

  const confirmDelete = async () => {
    if (!selectedUser) return;
    const token = localStorage.getItem("token");
    setDeleting(true);
    try {
      await axios.delete(`${import.meta.env.VITE_BACKEND_URL}/users/${selectedUser.email}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      toast.success("User deleted successfully");
      setUsers((prev) => prev.filter((u) => u.email !== selectedUser.email));
      setIsConfirmOpen(false);
    } catch (e) {
      toast.error("Delete failed");
    } finally {
      setDeleting(false);
    }
  };

  return (
    <div className="w-full min-h-screen bg-gray-100 p-10">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-800">User Management</h1>
          <p className="text-gray-600">Admin control panel for user accounts</p>
        </div>

        <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
          {loading ? (
            <div className="p-20 text-center text-gray-400 animate-pulse">Loading...</div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead className="bg-slate-800 text-white">
                  <tr>
                    <th className="px-6 py-4">Profile</th>
                    <th className="px-6 py-4">Name</th>
                    <th className="px-6 py-4">Email</th>
                    <th className="px-6 py-4 text-center">Status</th>
                    <th className="px-6 py-4 text-center">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {users.map((item) => (
                    <tr key={item.email} className={`${item.isblocked ? "bg-red-50" : "hover:bg-gray-50"}`}>
                      <td className="px-6 py-4">
                        <img src={item.image} className="w-10 h-10 rounded-full" alt="avatar" />
                      </td>
                      <td className="px-6 py-4 font-bold">
                        {item.firstName} {item.lastName}
                      </td>
                      <td className="px-6 py-4 text-gray-600">{item.email}</td>
                      <td className="px-6 py-4 text-center">
                        <span className={`px-3 py-1 rounded-full text-xs font-bold ${item.isblocked ? "bg-red-200 text-red-800" : "bg-green-200 text-green-800"}`}>
                          {item.isblocked ? "BLOCKED" : "ACTIVE"}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex justify-center gap-2">
                          <button
                            onClick={() => handleToggleBlock(item)}
                            className={`p-2 rounded-lg text-white ${item.isblocked ? "bg-green-600" : "bg-orange-500"}`}
                          >
                            {item.isblocked ? <BiCheckShield size={18} /> : <BiBlock size={18} />}
                          </button>
                          <button 
                             onClick={() => navigate(`/admin/update-user/${item.email}`, { state: item })}
                             className="bg-blue-600 text-white p-2 rounded-lg"
                          >
                            <BiEditAlt size={18} />
                          </button>
                          <button onClick={() => openDeleteConfirm(item)} className="bg-red-600 text-white p-2 rounded-lg">
                            <BiTrash size={18} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>

      {/* Delete Confirmation Modal */}
      <Transition appear show={isConfirmOpen} as={Fragment}>
        <Dialog as="div" className="relative z-50" onClose={() => setIsConfirmOpen(false)}>
          <Transition.Child as={Fragment} enter="ease-out duration-300" enterFrom="opacity-0" enterTo="opacity-100" leave="ease-in duration-200" leaveFrom="opacity-100" leaveTo="opacity-0">
            <div className="fixed inset-0 bg-black/50" />
          </Transition.Child>
          <div className="fixed inset-0 flex items-center justify-center p-4">
            <Dialog.Panel className="w-full max-w-md rounded-2xl bg-white p-6 shadow-2xl">
              <Dialog.Title className="text-xl font-bold">Are you sure?</Dialog.Title>
              <div className="mt-6 flex justify-end gap-3">
                <button onClick={() => setIsConfirmOpen(false)} className="px-4 py-2 bg-gray-200 rounded-lg">Cancel</button>
                <button onClick={confirmDelete} className="px-4 py-2 bg-red-600 text-white rounded-lg">
                   {deleting ? "Deleting..." : "Delete User"}
                </button>
              </div>
            </Dialog.Panel>
          </div>
        </Dialog>
      </Transition>
    </div>
  );
}