import { useNavigate, useParams } from "react-router-dom";
import WelcomeBand from "../components/WelcomeBand";
import { useCart } from "../context/CartContext";
import { useState, useEffect } from "react";
import { CartItem } from "../types/CartItem";

function PurchasePage() {
    const navigate = useNavigate();
    const { title, bookID } = useParams();
    const { addToCart } = useCart();

    const [quantity, setQuantity] = useState<number>(1); // Default to 1
    const [price, setPrice] = useState<number>(0); // This will be fetched from the database
    const [subtotal, setSubtotal] = useState<number>(0);

    // Fetch book price from the database or set it if you have it already
    useEffect(() => {
        const fetchBookPrice = async () => {
            try {
                // Fetch all books and find the book with the matching bookID
                const response = await fetch("https://localhost:5000/api/Book");
                const data = await response.json();

                // Find the book with the matching bookID
                const book = data.books.find((b: { bookID: number }) => b.bookID === Number(bookID));
                if (book) {
                    setPrice(book.price); // Set the price if the book is found
                }
            } catch (error) {
                console.error("Error fetching book data:", error);
            }
        };

        if (bookID) {
            fetchBookPrice(); // Fetch price only if bookID is available
        }
    }, [bookID]); // Runs when bookID changes

    // Recalculate the subtotal whenever the quantity or price changes
    useEffect(() => {
        setSubtotal(price * quantity);
    }, [price, quantity]); // Recalculate whenever quantity or price changes

    // Handle adding to cart
    const handleAddToCart = () => {
        const newItem: CartItem = {
            bookID: Number(bookID),
            title: title || "No Title Found",
            quantity,
            price,
            subtotal,
            total: subtotal, // Since subtotal is already calculated
        };

        addToCart(newItem); // Add item to cart
        navigate('/cart'); // Navigate to cart page
    };

    return (
        <>
            <WelcomeBand />
            <h2 className="text-center">Purchase {title}</h2>

            {/* Using Bootstrap Grid for layout */}
            <div className="container">
                <div className="row">
                    {/* Card for book details */}
                    <div className="col-md-6">
                        <div className="card">
                            <div className="card-body">
                                <h4 className="card-title">Book Details</h4>
                                <p className="card-text">
                                    <strong>Title:</strong> {title}
                                </p>
                                <p className="card-text">
                                    <strong>Price:</strong> ${price.toFixed(2)}
                                </p>
                                <p className="card-text">
                                    <strong>Subtotal:</strong> ${subtotal.toFixed(2)}
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Card for quantity input */}
                    <div className="col-md-6">
                        <div className="card">
                            <div className="card-body">
                                <h4 className="card-title">Quantity</h4>
                                <div className="form-group">
                                    <label htmlFor="quantity">Quantity:</label>
                                    <input
                                        type="number"
                                        id="quantity"
                                        className="form-control"
                                        value={quantity}
                                        onChange={(e) => setQuantity(Number(e.target.value))}
                                        min={1}
                                    />
                                </div>

                                <div className="d-flex justify-content-between mt-3">
                                    <button className="btn btn-success" onClick={handleAddToCart}>Add to Cart</button>
                                    <button className="btn btn-secondary" onClick={() => navigate(-1)}>Go Back</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Adding Bootstrap Badge and Card-Group */}
            <div className="container mt-5">
                <div className="row">
                    <div className="col-md-12">
                        <div className="card-group">
                            <div className="card">
                                <div className="card-body">
                                    <h5 className="card-title">Purchase Status</h5>
                                    <p className="card-text">Your current purchase status.</p>
                                    <span className="badge bg-primary">In Progress</span>
                                </div>
                            </div>

                            <div className="card">
                                <div className="card-body">
                                    <h5 className="card-title">Discount</h5>
                                    <p className="card-text">Apply discount code:</p>
                                    <span className="badge bg-success">Discount Available</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default PurchasePage;
