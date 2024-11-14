const express = require('express')
// instance of express
const app = express()
const port = 3000

// controllers 
const {
    getAllBooksDetails,
    getBooksById,
    getBooksByTitleAndAuthor,
    addNewBookDetails,
    updateBookDetailsById,
    deleteBooksById,
    getAllReviewsDetails,
    getReviewsById,
    getReviewsByBookId,
    addNeweReviewsDetails,
    updateReviewsByBookIdAndContent,
    deleteReveiewsById,
    getAllUsersDetails,
    getUsersById,
    getUserByName,
    addNewUserDetails,
    updateUserDetailsByIdAndName,
    deleteUserById
} = require('./controllers/user_book_review.controller')

// middelware
app.use(express.json())


// get all books details  ✔
app.get('/api/books', async (req, res) => {
    try {
        let response = await getAllBooksDetails()
        if (response.length === 0) {
            res.status(404).json({ message: 'No books found' })
        } else {
            res.status(200).json(response)
        }
    } catch (error) {
        return res.status(500).json({ message: 'Internal server error', error })
    }
})

// get books by given id  ✔ 
app.get('/api/books/id/:id', async (req, res) => {
    try {
        let id = parseInt(req.params.id)
        let response = await getBooksById(id)
        if (response.length === 0) {
            res.status(404).json({ message: 'No books found with given id' })
        } else {
            res.status(200).json(response)
        }
    } catch (error) {
        return res.status(500).json({ message: 'server error', error })

    }
})


// get books by given title and author  ✔ 
app.get('/api/books/title_author', async (req, res) => {
    try {
        let title = req.query.title
        let author = req.query.author
        let response = await getBooksByTitleAndAuthor(title, author)
        if (response.length === 0) {
            res.status(404).json({
                message: 'No books found with given title and author'
            })
        } else {
            res.status(200).json(response)

        }
    } catch (error) {
        return res.status(500).json({ message: 'internal server error', error })

    }
})

// add new book details  ✔ 
app.post('/api/books/new', async (req, res) => {
    try {
        let book = req.body
        let response = await addNewBookDetails(book)
        if (!response) {
            res.status(400).json({ message: "Book details not added" })
        } else {
            res.status(201).json(response)
        }
    } catch (error) {
        return res.status(500).json({ message: 'internal server error', error })

    }
})

// update book by given id  ✔ 
app.post('/api/books/update/id/:id', async (req, res) => {
    try {
        let id = parseInt(req.params.id)
        let updatedBoyd = req.query.title
        let response = updateBookDetailsById(id, updatedBoyd)
        if (response.length === 0) {
            res.status(404).json({ message: "title not updated by given book id" })
        } else {
            res.status(200).json(response)
        }
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
})

// delete book by id
app.post('/api/books/delete/id/:id', async (req, res) => {
    try {
        let id = parseInt(req.params.id)
        let response = await deleteBooksById(id)
        if (response.length === 0) {
            res.status(404).json({ message: "Book not found with given id" })
        } else {
            res.status(200).json(response)
        }
    } catch (error) {
        res.status(500).json({ message: 'internal server error', error })

    }
})


// Reviews API Endpoints
app.get('/api/reviews', async (req, res) => {
    try {
        let result = await getAllReviewsDetails()
        if (result.length === 0) {
            res.status(404).json({ message: "Revivews not found" })
        } else {
            res.status(200).json(result)
        }
    } catch (error) {
        res.status(500).json({ error: 'internal server error' })
    }
})

// reviews id
app.get('/api/reviews/id/:id', async (req, res) => {
    try {
        let id = parseInt(req.params.id)
        let result = await getReviewsById(id)
        if (result.length === 0) {
            res.status(404).json({ message: "Reviews not found with given id" })
        } else {
            res.status(200).json(result)
        }
    } catch (error) {
        res.status(500).json({ message: 'internal server error' })
    }
})


// get reviews by bookid
app.get('/api/reviews/bookId/:bookId', async (req, res) => {
    try {
        let bookId = parseInt(req.params.bookId)
        let result = await getReviewsByBookId(bookId)
        if (result.length === 0) {
            res.status(404).json({ message: "Reviews not found with given bookId" })
        } else {
            res.status(200).json(result)
        }
    } catch (error) {
        res.status(500).json({ message: 'internal server error' ,error })
    }
})


// add new reviews details
app.post('/api/reviews/new', async (req, res) => {
    try {
        let newRviews = req.body
        let result = await addNeweReviewsDetails(newRviews)
        if (result) {
            res.status(201).json(result)
        } else {
            res.status(400).json({ message: "Failed to add new reviews" })
        }
    } catch (error) {
        res.status(500).json({ message: 'internal server error',error })
    }
})


app.post('/api/reviews/update/bookId/:bookId', async (req, res) => {
    try {
        let bookId = parseInt(req.params.bookId)
        let updatedBody = req.body
        let result = await updateReviewsByBookIdAndContent(bookId, updatedBody)
        if (result) {
            res.status(200).json(result)
        } else {
            res.status(404).json({ message: 'Id not found to update review details' })
        }
    } catch (error) {
        res.status(500).json({ message: 'internal server error',error })

    }
})


// delete reviews by id
app.post('/api/reviews/delete/id/:id', async (req, res) => {
    try {
        let id = parseInt(req.params.id)
        let result = await deleteReveiewsById(id)
        if (result) {
            res.status(200).json(result)
        } else {
            res.status(404).json({ message: 'Id not found to delete review details' })
        }
    } catch (error) {
        res.status(500).json({ message: 'internal server error',error })

    }
})



module.exports = { app, port }