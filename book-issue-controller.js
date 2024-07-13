const BookIssue = require("../models/BookIssue");

const addBookIssue = async (req, res) => {
    try {
        const bookIssue = new BookIssue({ ...req.body, issuedBy: req.user._id });
        await bookIssue.save();
        return res.status(201).send({ message: "Saved" });
    } catch (error) {
        console.error(error);
        return res.status(500).send({ message: error.message });
    }
}

const getBooksIssuedByStudent = async (req, res) => {
    const user = req.user;
    let query;
    if (user.type === "LIBRARIAN") {
        query = { issuedTo: req.query.studentId };
    } else {
        query = { issuedTo: req.user._id };
    }
    if (req.query.status) {
        query = { ...query, status: req.query.status };
    }
    const bookIssueList = await BookIssue.find(query);
    console.info(`Found: ${bookIssueList.length} book issues for the student ID: ${req.query.studentId} for the given filters.`)
    return res.status(200).send(bookIssueList);
}

const getBooksIssueList = async (req, res) => {
    const bookIssueList = await BookIssue.find({status: req.query.status} );
    console.info(`Found: ${bookIssueList.length} book issues.`)
    return res.status(200).send(bookIssueList);
}

module.exports = { addBookIssue, getBooksIssuedByStudent, getBooksIssueList };