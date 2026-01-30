import axios from "axios";
import { useEffect, useState } from "react";
import ProductCard from "../components/productCard"; 

export default function ProductPage() {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        axios.get(import.meta.env.VITE_BACKEND_URL + "/products")
            .then((response) => {
                setProducts(response.data);
            })
            .catch(err => {
                console.error("Error fetching:", err);
            })
            .finally(() => {
                setLoading(false);
            });
    }, []); // හිස් array එකක් දීමෙන් මෙය පූරණය වන විට එක් වරක් පමණක් ක්‍රියාත්මක වේ

    return (
        <div className="w-full min-h-screen bg-white overflow-y-auto">
            {loading ? (
                <div className="flex items-center justify-center min-h-[400px]">
                    <div className="text-gray-500 text-center p-10 font-bold animate-pulse">
                        Loading Products...
                    </div>
                </div>
            ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 p-6 justify-items-center">
                    {products.length > 0 ? (
                        products.map((item) => (
                            <ProductCard key={item.productID || item._id} product={item} />
                        ))
                    ) : (
                        <div className="col-span-full text-gray-400">No products found.</div>
                    )}
                </div>
            )}
        </div>
    );
}