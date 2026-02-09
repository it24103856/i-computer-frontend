import axios from "axios";
import { useEffect, useState } from "react";
import ProductCard from "../components/productCard"; 

export default function ProductPage() {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    // 1. query state එක අනිවාර්යයෙන්ම ඕනෑ
    const [query, setQuery] = useState(""); 

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
    }, []);

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
                    {/* Search Bar එක Grid එකේ පළවෙනි column එක විදිහට පේන්නෙ මෙහෙමයි */}
                    <div className="col-span-full w-full max-w-md h-[50px] mb-4">
                        <input
                            type="text"
                            placeholder="Search products..."
                            className="w-full h-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
                            value={query}
                            onChange={async (e) => {
                                const val = e.target.value;
                                setQuery(val); // දැන් setQuery වැඩ කරනවා

                                if(val === "") {
                                    axios.get(import.meta.env.VITE_BACKEND_URL + "/products")
                                        .then((response) => {
                                            setProducts(response.data);
                                        });
                                } else {
                                    // 2. URL එක "?q=" කියලා නිවැරදි කළා
                                    await axios.get(import.meta.env.VITE_BACKEND_URL + "/products/search?q=" + val)
                                        .then((response) => {
                                            setProducts(response.data);
                                        })
                                        .catch(err => {
                                            console.error("Error searching products:", err);
                                        });
                                }
                            }}
                        />
                    </div>

                    {products.length > 0 ? (
                        products.map((item) => (
                            <ProductCard key={item.productID || item._id} product={item} />
                        ))
                    ) : (
                        <div className="col-span-full text-gray-400">No products found for "{query}"</div>
                    )}
                </div>
            )}
        </div>
    );
}