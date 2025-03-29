import { useNavigate, useParams } from "react-router-dom";
import WelcomeBand from "../components/WelcomeBand";
import { useCart } from "../context/CartContext";
import { useState, useEffect } from "react";
import { CartItem } from "../types/CartItem";

function PurchasePage() {
    const navigate = useNavigate();
    const { title, bookID } = useParams();
    const { addToCart } = useCart();
    const [quantity, setQuantity] = useState<number>(1);
    const [price, setPrice] = useState<number>(0);

    useEffect(() => {
        const fetchBookPrice = async () => {
            try {
                const response = await fetch(`/api/books/${bookID}`);
                const data = await response.json();
                setPrice(data.price);
            } catch (error) {
                console.error("Error fetching book price:", error);
            }
        };

        if (bookID) {
            fetchBookPrice();
        }
    }, [bookID]);

    const subtotal = quantity * price;

    const handleAddToCart = () => {
        const newItem: CartItem = {
            bookID: Number(bookID),
            title: title || "No Title Found",
            quantity,
            price,
            subtotal,
            total: subtotal
        };
        addToCart(newItem);
        navigate('/cart');
    };

    return (
        <>
            <WelcomeBand />
            <h2>Purchase {title}</h2>

            <div>
                <input 
                    type="number" 
                    placeholder="Enter quantity" 
                    value={quantity} 
                    min="1"
                    onChange={(x) => setQuantity(Number(x.target.value))} 
                />
                <p>Price: ${price.toFixed(2)}</p>
                <p>Subtotal: ${subtotal.toFixed(2)}</p>
                <button onClick={handleAddToCart}>Add to Cart</button>
            </div>

            <button onClick={() => navigate(-1)}>Go Back</button>
        </>
    );
}

export default PurchasePage;
