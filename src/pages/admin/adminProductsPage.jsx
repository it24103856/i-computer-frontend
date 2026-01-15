import { BiPlus } from "react-icons/bi";
import { Link } from "react-router-dom";

export default function AdminProductsPage() {
  return (
    <div className="w-full h-screen flex items-center justify-center bg-white relative">
      <h1 className="text-5xl font-medium text-black">Products Page</h1>

      <Link
        to="/admin/add-product"
        className="absolute bottom-8 right-8 w-14 h-14 flex items-center justify-center rounded-full
             bg-accent text-white shadow-lg
             hover:bg-black transition-colors duration-200"
>
        <BiPlus className="text-4xl" />
      </Link>
    </div>
  );
}
