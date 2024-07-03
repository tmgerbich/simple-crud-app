const express = require('express');
const app = express();
const moment = require('moment');
const morgan = require('morgan');

app.use(morgan('dev')); // Log every request to the console in 'dev' format
app.use(express.json()); // Middleware to parse JSON bodies

const books = [];

// Welcome endpoint
app.get('/', (req, res) => {
    res.send('Welcome to the Library!');
});

// Endpoint to create a new book
app.post('/books', (req, res) => {
    const newBook = {
        id: moment().format('YYYYMMDDHHmmssSSS'), // Automatically assign an ID to the new book
        title: req.body.title,
        author: req.body.author
    };
    books.push(newBook);
    res.status(201).json(newBook);
});

// Endpoint to retrieve all books
app.get('/books', (req, res) => {
    res.status(200).json(books);
});

// Endpoint to retrieve a specific book by ID
app.get('/books/:id', (req, res) => {
    const book = books.find(b => b.id === req.params.id);
    if (!book) {
        return res.status(404).send('Book not found');
    }
    res.status(200).json(book);
});

// Endpoint to update an existing book by ID
app.put('/books/:id', (req, res) => {
    const book = books.find(b => b.id === req.params.id);
    if (!book) {
        return res.status(404).send('Book not found');
    }
    if(req.body.title){
    book.title = req.body.title;}
    if(req.body.author){
    book.author = req.body.author;}
    res.status(200).json(book);
});


// Endpoint to delete a book by ID
app.delete('/books/:id', (req, res) => {
    const index = books.findIndex(b => b.id === req.params.id);
    if (index === -1) {
        return res.status(404).send('Book not found');
    }
    books.splice(index, 1);
    res.status(204).send();
});

// Handle non-existent routes
app.use((req, res) => {
    res.status(404).send('404 - Not Found');
});


const PORT = 3000; // Setting the port number
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`); // Starting the server
});
