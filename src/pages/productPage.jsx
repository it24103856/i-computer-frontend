import axios from "axios";
import { useEffect, useState } from "react";
import ProductCard from "../components/productCard"; 

export default function ProductPage() {
    const [products, setProducts] = useState([]);
    const [loaded, setLoaded] = useState(false);

    useEffect(() => {
        if (!loaded) {
            axios.get(import.meta.env.VITE_BACKEND_URL + "/products")
                .then((response) => {
                    setProducts(response.data);
                    setLoaded(true);
                })
                .catch(err => console.error("Error fetching:", err));
        }
    }, [loaded]);

    return (
        <div className="w-full min-h-screen bg-white overflow-y-auto">
            {
                !loaded ? (
                    <div className="text-gray-500 text-center p-10 font-bold">Loading Products...</div>
                ) : (
                    
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 p-6 justify-items-center">
                        {
                            products.map((item) => {
                                return (
                                    <ProductCard key={item.productID || item._id} product={item} />
                                );
                            })
                        }
                        
                    </div>
                )
            }
        </div>
    );
}