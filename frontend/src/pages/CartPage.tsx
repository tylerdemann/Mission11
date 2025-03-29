import { useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { CartItem } from "../types/CartItem";

function CartPage() {
    const navigate = useNavigate();
    const { cart, removeFromCart } = useCart();

    return (
        <div>
            <h2>Your Cart</h2>
            <div>
                {cart.length === 0 ? (
                    <p>Your cart is empty.</p>
                ) : (
                    <ul style={{ listStyleType: 'none', padding: 0 }}>
                        {cart.map((item: CartItem) => (
                            <li key={item.bookID} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
                                <div style={{ flex: 1 }}>
                                    <span>{item.title}</span><br />
                                    <span>Price: ${item.subtotal.toFixed(2)}</span><br />
                                    <span>Quantity: {item.quantity}</span>
                                </div>
                                <button
                                    onClick={() => removeFromCart(item.bookID)}
                                    style={{
                                        backgroundColor: '#f44336',
                                        color: 'white',
                                        border: 'none',
                                        padding: '5px 10px',
                                        cursor: 'pointer',
                                    }}
                                >
                                    Remove
                                </button>
                            </li>
                        ))}
                    </ul>
                )}
            </div>
            <h3>Total: ${cart.reduce((total, item: CartItem) => total + item.subtotal, 0).toFixed(2)}</h3>
            <button 
                style={{
                    padding: '10px 20px', 
                    backgroundColor: '#4CAF50', 
                    color: 'white', 
                    border: 'none', 
                    cursor: 'pointer',
                    marginRight: '10px',
                }}
            >
                Checkout
            </button>
            <button 
                onClick={() => navigate('/')}
                style={{
                    padding: '10px 20px', 
                    backgroundColor: '#2196F3', 
                    color: 'white', 
                    border: 'none', 
                    cursor: 'pointer',
                }}
            >
                Continue Browsing
            </button>
        </div>
    );
}

export default CartPage;
