import { useParams } from "react-router-dom";
import React, { useEffect, useState } from "react";
import axios from "axios";
import Loader from "../components/loader.jsx";

export default function ProductOverview() {
    const params = useParams();
    const [product, setProduct] = useState(null);
    const [status, setStatus] = useState("loading");

    useEffect(() => {
        // params.productID හරියට ලැබෙනවාද බලන්න
        if (params.productID) {
            axios.get(import.meta.env.VITE_BACKEND_URL + "/products/" + params.productID)
                .then((response) => {
                    // Backend එකෙන් දත්ත ආවාම පරීක්ෂා කරන්න
                    if (response.data && response.data.name) {
                        setProduct(response.data);
                        setStatus("success");
                    } else {
                        setStatus("error");
                    }
                })
                .catch((error) => {
                    console.error("API Error:", error);
                    setStatus("error");
                });
        }
    }, [params.productID]);

    return (
        <div className="w-full min-h-[calc(100vh-100px)] flex flex-col items-center">
            {status === "loading" && <Loader />}

            {status === "error" && (
                <div className="w-full h-screen flex justify-center items-center text-red-500 font-semibold text-2xl">
                    Product not found
                </div>
            )}

            {status === "success" && product && (
                <div className="w-full h-full flex flex-col md:flex-row p-6 md:p-12 gap-10">
                    
                    {/* Image Section */}
                    <div className="w-full md:w-1/2 flex justify-center items-center bg-gray-50 rounded-3xl p-8">
                        <img 
                            // Schema එකේ තියෙන්නේ 'image' මිස 'images' නෙවෙයි
                            src={(product.image && product.image.length > 0) ? product.image[0] : "https://placehold.jp/500x500.png"} 
                            className="max-w-full max-h-[500px] object-contain drop-shadow-2xl transition-transform hover:scale-105 duration-500" 
                            alt={product.name} 
                        />
                    </div>

                    {/* Details Section */}
                    <div className="w-full md:w-1/2 flex flex-col justify-center gap-6">
                        <span className="text-blue-600 font-bold tracking-widest uppercase text-sm">{product.category} | {product.brand}</span>
                        <h1 className="text-5xl font-extrabold text-gray-800 uppercase leading-tight">
                            {product.name}
                        </h1>

                        <div className="flex flex-col gap-2">
                            {Number(product.labeledPrice) > Number(product.price) && (
                                <span className="text-gray-400 line-through text-2xl">
                                    LKR. {Number(product.labeledPrice).toFixed(2)}
                                </span>
                            )}
                            <div className="flex items-center gap-4">
                                <span className="text-blue-600 font-black text-6xl">
                                    LKR. {Number(product.price).toFixed(2)}
                                </span>
                                {product.stock > 0 ? 
                                    <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-xs font-bold">IN STOCK</span> :
                                    <span className="bg-red-100 text-red-700 px-3 py-1 rounded-full text-xs font-bold">OUT OF STOCK</span>
                                }
                            </div>
                        </div>

                        <div className="h-[2px] w-20 bg-blue-600"></div>

                        <p className="text-gray-600 text-lg leading-relaxed max-w-xl">
                            {product.description}
                        </p>

                        <div className="flex flex-col gap-1 text-gray-500 font-medium">
                            <p>Model: <span className="text-gray-800">{product.model}</span></p>
                            <p>Product ID: <span className="text-gray-800">{product.productID}</span></p>
                        </div>

                        <button className="w-full md:w-fit bg-blue-600 text-white px-16 py-5 rounded-2xl font-black text-xl hover:bg-blue-700 transition-all shadow-2xl hover:shadow-blue-200 active:scale-95 uppercase mt-6">
                            Add To Cart
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
}