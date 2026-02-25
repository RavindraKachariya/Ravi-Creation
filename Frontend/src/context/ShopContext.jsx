import { createContext, useState } from "react";
import { products } from "../assets/assets";
import { useNavigate } from "react-router-dom";

export const ShopContext = createContext();

const ShopContextProvider = (props) => {

    const currency = "₹";
    const delivery_fee = 10;
    const navigate = useNavigate();

    const [cartItems, setCartItems] = useState({});
    const [orders, setOrders] = useState([]);

    // Add To Cart
    const addToCart = (itemId, size) => {
        if (!size) return alert("Select Product Size");

        let cartData = structuredClone(cartItems);

        if (cartData[itemId]) {
            if (cartData[itemId][size]) {
                cartData[itemId][size] += 1;
            } else {
                cartData[itemId][size] = 1;
            }
        } else {
            cartData[itemId] = {};
            cartData[itemId][size] = 1;
        }

        setCartItems(cartData);
    };

    // Update Quantity
    const updateQuantity = (itemId, size, quantity) => {
        let cartData = structuredClone(cartItems);

        if (cartData[itemId]) {
            cartData[itemId][size] = quantity;
        }

        setCartItems(cartData);
    };

    // Calculate Cart Amount
    const getCartAmount = () => {
        let totalAmount = 0;

        for (const items in cartItems) {
            for (const size in cartItems[items]) {
                if (cartItems[items][size] > 0) {
                    const itemInfo = products.find(
                        (product) => product._id === items
                    );
                    if (itemInfo) {
                        totalAmount += itemInfo.price * cartItems[items][size];
                    }
                }
            }
        }

        return totalAmount;
    };

    // Cart Count (Navbar badge)
    const getCartCount = () => {
        let totalCount = 0;

        for (const items in cartItems) {
            for (const size in cartItems[items]) {
                if (cartItems[items][size] > 0) {
                    totalCount += cartItems[items][size];
                }
            }
        }

        return totalCount;
    };

    // PLACE ORDER FUNCTION
    const placeOrder = () => {

        if (getCartCount() === 0) {
            alert("Cart is empty!");
            return;
        }

        const newOrder = {
            id: Date.now(),
            items: cartItems,
            total: getCartAmount() + delivery_fee,
            date: new Date().toLocaleString(),
            status: "Order Confirmed"
        };

        setOrders((prev) => [...prev, newOrder]);

        setCartItems({});   // Clear cart

        navigate("/orders");  // Redirect to orders page
    };

    const value = {
        products,
        currency,
        delivery_fee,
        cartItems,
        setCartItems,
        addToCart,
        updateQuantity,
        getCartAmount,
        getCartCount,
        placeOrder,
        orders,
        navigate
    };

    return (
        <ShopContext.Provider value={value}>
            {props.children}
        </ShopContext.Provider>
    );
};

export default ShopContextProvider;