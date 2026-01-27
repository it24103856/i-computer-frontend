import { Link } from "react-router-dom";

export default function ProductCard(props) {
    const { product } = props;

    // Safety check: product එක නැතිනම් error නොදී හිස්ව තබයි
    if (!product) return null;

    const hasMultipleImages = product.image && product.image.length > 1;

    return (
        <div className="w-[300px] h-[450px] shadow-2xl shadow-black rounded-[40px] m-4 overflow-hidden bg-white flex flex-col group relative cursor-pointer">
            
            {/* Image Section */}
            <div className="w-full h-[300px] relative bg-gray-100 overflow-hidden">
                {hasMultipleImages && (
                    <img src={product.image[1]} className="w-full h-full absolute object-cover" alt="back" />
                )}
                <img 
                    src={product.image ? product.image[0] : ""} 
                    className={`w-full h-full absolute object-cover transition-opacity duration-500 
                        ${hasMultipleImages ? 'group-hover:opacity-0' : 'opacity-100'}`} 
                    alt={product.name} 
                />

                {/* Hover UI */}
                <div className="absolute inset-0 flex flex-col gap-3 items-center justify-center bg-black/30 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-4 group-hover:translate-y-0">
                    
                  

                    <Link 
                        to={`/overview/${product.productID || product._id}`} 
                        onClick={(e) => e.stopPropagation()}  
                        className="w-[150px] bg-white text-black px-4 py-2 rounded-full font-bold shadow-lg hover:bg-gray-200 transition-colors uppercase text-[10px] tracking-wider flex items-center justify-center"
                    >
                        View Details
                    </Link>
                </div>
            </div>

            {/* Details Section */}
            <div className="p-5 flex flex-col flex-grow justify-between">
                <div>
                    <h1 className="font-bold text-lg truncate text-gray-800">{product.name}</h1>
                    
                    <div className="flex flex-col mt-1">
                        {product.labeledPrice > product.price && (
                            <span className="text-gray-400 line-through text-xs">
                                LKR {product.labeledPrice?.toFixed(2)}
                            </span>
                        )}
                        <h2 className="text-blue-600 font-extrabold text-xl">
                            LKR {product.price?.toFixed(2)}
                        </h2>
                    </div>
                </div>
            </div>
        </div>
    );
}