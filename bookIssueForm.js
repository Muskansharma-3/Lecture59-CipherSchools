import { useEffect, useState } from "react";
import Select from "react-select";
import { getAllStudents } from "../apis/user-api";
import { getAllBooks } from "../apis/book-api";
import { addNewBookIssue } from "../apis/book-issue-api";
import { useNavigate, useLocation } from "react-router-dom";

const BookIssueForm = () => {

    const [bookIssue, setBookIsuue] = useState({
        issuedTo: "",
        bookIsbn: "",
    });

    const [bookOptions, setBookOptions] = useState([]);
    const [studentOptions, setStudentOptions] = useState([]);
    const navigate = useNavigate();
    const location = useLocation();
    console.log(location);

    useEffect(() => {
        getAllStudents().then((studentList) => {
            setStudentOptions(studentList.map((student) => {
                return {
                    value: student._id,
                    label: `${student.firstName} ${student.lastName}`,
                }
            }))
        });
        getAllBooks().then((bookList) => {
            setBookOptions(bookList.map((book) => {
                return {
                    value: book.isbn,
                    label: `${book.title} by ${book.author}`,
                }
            }))
        });
    }, [])

    const handleSubmit = async (e) => {
        e.preventDefault();
        await addNewBookIssue(bookIssue);
        navigate("/");
    }

    return (
        <section className="app-section">
            <h1>Add a new book</h1>
            <form className="ui form" onSubmit={handleSubmit}>
                <div className="field">
                    <label>Student</label>
                    <Select 
                    options={studentOptions}
                     isSearchable={true}
                      onChange={({ value }) => {
                        setBookIsuue({ ...bookIssue, issuedTo: value })
                    }} />
                </div>
                <div className="field">
                    <label>Book</label>
                    <Select 
                    options={bookOptions} 
                    defaultInputValue="Select Book" 
                    isSearchable={true} 
                    onChange={({ value }) => {
                        setBookIsuue({ ...bookIssue, bookIsbn: value })
                    }}  />
                </div>
                <button className="ui button" type="submit">Submit</button>
            </form>
        </section>
    )
}

export default BookIssueForm;