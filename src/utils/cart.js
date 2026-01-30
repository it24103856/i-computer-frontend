import toast from "react-hot-toast";

// Local Storage එකෙන් දැනට තියෙන Cart එක ලබා ගැනීම
export function getCart() {
    const cartString = localStorage.getItem("cart");
    if (cartString == null) {
        localStorage.setItem("cart", "[]");
        return [];
    } else {
        return JSON.parse(cartString);
    }
}

// භාණ්ඩයක් Cart එකට එකතු කිරීම හෝ ප්‍රමාණය වෙනස් කිරීම
export function addToCart(product, quantity) {
    const cart = getCart();
    
    // භාණ්ඩය දැනටමත් තිබේදැයි පරීක්ෂා කිරීම (ID එක හරහා)
    const index = cart.findIndex(
        (item) => {
             return item.productID ==  product.productID
            }
        
    );

    if (index === -1) {
        // අලුත් භාණ්ඩයක් නම් push කරනවා
        cart.push({
            productID: product.productID,
            name: product.name,
            price: product.price,
            quantity: quantity,
            image: product.image[0]
        })
        toast.success(`${product.name} added to cart`);
      
    } else {
        // දැනටමත් තිබේ නම් ප්‍රමාණය (quantity) යාවත්කාලීන කරනවා
        const newQty = cart[index].quantity + quantity;
        if (newQty <= 0) {
            cart.splice(index, 1);
        } else {
            cart[index].quantity = newQty;
            toast.success(`updated ${product.name} quantity to ${newQty}`);
        }
    }
    const cartString = JSON.stringify(cart);
    // වෙනස්කම් සේව් කිරීම
    localStorage.setItem("cart", JSON.stringify(cart));
}

// භාණ්ඩයක් Cart එකින් ඉවත් කිරීම
export function removeFromCart(productID) {
    const cart = getCart();
    const index = cart.findIndex((item) => item.productID == productID);
    
    if (index !== -1) {
        const productName = cart[index].name;
        cart.splice(index, 1);
        localStorage.setItem("cart", JSON.stringify(cart));
        toast.success(`${productName} removed from cart`);
    }
}

export function emptyCart() {
    localStorage.setItem("cart", "[]");
}

export function getCartTotal() {
    let total = 0;
    const cart = getCart();


    cart.forEach((item) => {
        total += item.price * item.quantity;
    })
    return total;
}