import { useEffect, useState } from "react";
import { getAllBooks } from "../apis/book-api";
import { getLocalStorageUser } from "../utils/AuthUtil";
import { Navigate, useNavigate } from "react-router-dom";

const numberFormatter = new Intl.NumberFormat("en-IN", {
    currency: "INR",
    style: "currency",
})

const formatCurrency = (currencyValue) => numberFormatter.format(currencyValue);

const BookScreen = () => {

    const [bookList, setBookList] = useState([]);
    const [userType, setUserType] = useState("STUDENT");
    const navigate=useNavigate();

    const fetchBooks = async () => {
        const books = await getAllBooks();
        setBookList(books);
    }

    useEffect(() => {
        setUserType(getLocalStorageUser().type);
        fetchBooks().then().catch((err) => {
            console.error(err);
        });
    }, [])

    return (
        <section className="app-section">
            <h1>List of all the books in the library.</h1>
            <table className="ui single line table">
                <thead>
                    <tr>
                        <th>ISBN</th>
                        <th>Title</th>
                        <th>Author</th>
                        <th>Price</th>
                        <th>Total Quantity</th>
                        <th>Issued Quantity</th>
                        {userType == "LIBRARIAN" && <th>Actions</th>}
                    </tr>
                </thead>
                <tbody>
                    {bookList.map((book) => {
                        return (
                            <tr>
                                <td>{book.isbn}</td>
                                <td>{book.title}</td>
                                <td>{book.author}</td>
                                <td>{formatCurrency(book.price)}</td>
                                <td>{book.totalQuantity}</td>
                                <td>{book.issuedQuantity}</td>
                                {userType == "LIBRARIAN" && <td>
                                    <button className="ui green button" disabled={book.issuedQuantity >= book.totalQuantity} onClick={(e)=> navigate("/book-issue", {
                                        state: {
                                            isbn: book.isbn,
                                        }
                                    })}>Issue Book</button>
                                </td>}
                            </tr>
                        )
                    })}
                </tbody>
            </table>
        </section>
    )
}

export default BookScreen;