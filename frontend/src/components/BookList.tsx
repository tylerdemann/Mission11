import { useEffect, useState } from "react";
import { Book } from "../types/Book";
import { useNavigate } from "react-router-dom";

function BookList({selectedCategories}: {selectedCategories: string[]}) {
    const [Books, setBooks] = useState<Book[]>([]);
    const [pageSize, setPageSize] = useState<number>(5);
    const [pageNum, setPageNum] = useState<number>(1);
    const [totalItems, setTotalItems] = useState<number>(0);
    const [totalPages, setTotalPages] = useState<number>(0);
    const [sort, setSort] = useState<string>("asc");
    const navigate = useNavigate();

    useEffect(() => {
        const fetchBooks = async () => {
            const categoryParams = selectedCategories.map((cat) => `bookTypes=${encodeURIComponent(cat)}` ).join('&');
            const response = await fetch(
                `https://localhost:5000/api/Book?pageHowMany=${pageSize}&pageNum=${pageNum}&sort=${sort}${selectedCategories.length ? `&${categoryParams}` : ''}`
            );
            const data = await response.json();
            setBooks(data.books);
            setTotalItems(data.totalNumBooks);
            setTotalPages(Math.ceil(data.totalNumBooks / pageSize));
        };
        fetchBooks();
    }, [pageSize, pageNum, sort, selectedCategories]);

    return (
        <>
            <button onClick={() => setSort(sort === "asc" ? "desc" : "asc")}>
                Sort by Title ({sort === "asc" ? "Ascending" : "Descending"})
            </button>
            <br />
            {Books.map((b) => (
                <div id="bookCard" className="card" key={b.bookID}>
                    <h3 className="card-title">{b.title}</h3>
                    <div className="card-body">
                        <ul className="list-unstyled">
                            <li>Author: {b.author}</li>
                            <li>Publisher: {b.publisher}</li>
                            <li>ISBN: {b.isbn}</li>
                            <li>Classification: {b.classification}</li>
                            <li>Category: {b.category}</li>
                            <li>Page Count: {b.pageCount}</li>
                            <li>Price: {b.price}</li>
                        </ul>
                        <button className="btn btn-success" onClick={() => navigate(`/purchase/${b.title}/${b.bookID}`)}>Purchase</button>
                    </div>
                </div>
            ))}

            <button disabled={pageNum === 1} onClick={() => setPageNum(pageNum - 1)}>
                Previous
            </button>

            {[...Array(totalPages)].map((_, i) => (
                <button key={i + 1} onClick={() => setPageNum(i + 1)} disabled={pageNum === i + 1}>
                    {i + 1}
                </button>
            ))}

            <button disabled={pageNum === totalPages} onClick={() => setPageNum(pageNum + 1)}>
                Next
            </button>

            <br />
            <label>
                Results per page:
                <select
                    value={pageSize}
                    onChange={(e) => {
                        setPageSize(Number(e.target.value));
                        setPageNum(1);
                    }}
                >
                    <option value="5">5</option>
                    <option value="10">10</option>
                    <option value="20">20</option>
                </select>
            </label>
        </>
    );
}

export default BookList;
