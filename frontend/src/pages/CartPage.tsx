import { Navigate, useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { CartItem } from "../types/CartItem";

function CartPage () {
    const navigate = useNavigate();
    const {cart} = useCart();

    return (
        <div>
            <h2>Your Cart</h2>
            <div>
                {cart.length === 0 ? (
                <p>Your cart is empty.</p> 
                ) : ( 
                <ul>
                    {cart.map((item: CartItem) => (
                        <li key={item.bookID}>
                        {item.title}: ${item.subtotal.toFixed(2)}
                    </li>
                    ))}
                </ul> 
                )}
            </div>
            <h3>Total: </h3>
            <button>Checkout</button>
            <button onClick={()=> navigate('/')}>Continue Browsing</button>
        </div>
    );
}

export default CartPage;