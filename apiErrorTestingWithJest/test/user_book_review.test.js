const {
    // Books
    getAllBooksDetails,
    getBooksById,
    getBooksByTitleAndAuthor,
    addNewBookDetails,
    updateBookDetailsById,
    deleteBooksById,
    // reviews
    getAllReviewsDetails,
    getReviewsById,
    getReviewsByBookId,
    addNeweReviewsDetails,
    updateReviewsByBookIdAndContent,
    deleteReveiewsById,
    // Users
    getAllUsersDetails,
    getUsersById,
    getUserByName,
    addNewUserDetails,
    updateUserDetailsByIdAndName,
    deleteUserById
} = require('../controllers/user_book_review.controller')

const { app } = require('../index')

const http = require('http')

// require supertest
const request = require('supertest')

// create mock function to return data from database
jest.mock('../controllers/user_book_review.controller.js', () => ({
    getAllBooksDetails: jest.fn(),
    getBooksById: jest.fn(),
    getBooksByTitleAndAuthor: jest.fn(),
    addNewBookDetails: jest.fn(),
    updateBookDetailsById: jest.fn(),
    deleteBooksById: jest.fn(),
    getAllReviewsDetails: jest.fn(),
    getReviewsById: jest.fn(),
    getReviewsByBookId: jest.fn(),
    addNeweReviewsDetails: jest.fn(),
    updateReviewsByBookIdAndContent: jest.fn(),
    deleteReveiewsById: jest.fn(),
    getAllUsersDetails: jest.fn(),
    getUsersById: jest.fn(),
    getUserByName: jest.fn(),
    addNewUserDetails: jest.fn(),
    updateUserDetailsByIdAndName: jest.fn(),
    deleteUserById: jest.fn()
}))


let server;

beforeAll((done) => {
    server = http.createServer(app)
    server.listen(3001, done)
})

afterAll((done) => {
    server.close(done)
})

// test books function
describe('📚 testing books function', () => {
    beforeEach(() => {
        jest.clearAllMocks()
    })

    // getting all books details mock test
    test('get all users mock data', async () => {
        let mockBook = [
            { id: 1, title: 'Harry Potter', author: 'George Orwell' },
            { id: 2, title: 'Brave New World', author: 'Aldous Huxley' },
            { id: 3, title: 'Pride and Prejudice', author: 'Jane Austen' }
        ]

        getAllBooksDetails.mockReturnValue(mockBook)
        let result = getAllBooksDetails()
        expect(result).toEqual(mockBook)
        expect(result.length).toBe(3)
        expect(getAllBooksDetails).toHaveBeenCalled()
    })

    // test all function if not found and gives error message 
    test('books not found', async () => {
        // mock function 
        getAllBooksDetails.mockReturnValue({ books: [] })
        // call function
        let result = getAllBooksDetails()
        // check if result is an empty
        expect(result.books).toEqual([])
        // verify that function was called
        expect(getAllBooksDetails).toHaveBeenCalledWith()

    })


    // getting books by given id mock test function
    test('get books by given id', async () => {
        let mockBook = { id: 1, title: 'Harry Potter', author: 'George Orwell' }
        getBooksById.mockReturnValue(mockBook)

        // calling function
        let result = getBooksById(1)
        // check if id is correct or not
        expect(result).toEqual(mockBook)
        // verify that function is called with the correct id
        expect(getBooksById).toHaveBeenCalledWith(1)
    })


    // if id not found
    test('book id not found and given undefined value', async () => {
        // mock function
        getBooksById.mockReturnValue(undefined)
        let result = await getBooksById(123)
        expect(result).toBeUndefined()
        expect(getBooksById).toHaveBeenCalledWith(123)
    })

    // get books by title and author mock test function
    test('get books by title and author mock function', async () => {
        let mockBook = [
            { id: 1, title: 'Harry Potter', author: 'George Orwell' },
            { id: 2, title: 'Brave New World', author: 'Aldous Huxley' },
            { id: 3, title: 'Pride and Prejudice', author: 'Jane Austen' }
        ]

        getBooksByTitleAndAuthor.mockReturnValue(mockBook)
        let result = getBooksByTitleAndAuthor('Harry Potter', 'George Orwell')
        expect(result).toEqual(mockBook)
        expect(getBooksByTitleAndAuthor).toHaveBeenCalledWith('Harry Potter', 'George Orwell')
    })

    // if books which given title and author not found and gives undefined value
    test('books title and author not found and given undefined value', async () => {
        getBooksByTitleAndAuthor.mockReturnValue([])
        let result = await getBooksByTitleAndAuthor()
        expect(result).toEqual([])
        expect(getBooksByTitleAndAuthor).toHaveBeenCalledWith()
    })


    // add new book details
    test('add new book details', async () => {
        let mockBook = { id: 15, title: 'Winter season', author: 'Sandeep Danny' }
        addNewBookDetails.mockReturnValue(mockBook)
        let result = await addNewBookDetails('Winter season', 'Sandeep Danny')
        expect(result).toEqual(mockBook)
        expect(addNewBookDetails).toHaveBeenCalledWith('Winter season', 'Sandeep Danny')
    })

    // update book by given id and title
    test('update book by given id and title', async () => {
        let mockBook = { id: 1, title: 'Captain Ameriaca', author: 'Russo Brothers' }

        updateBookDetailsById.mockReturnValue(mockBook)
        let result = await updateBookDetailsById(1, 'Captain Ameriaca')
        expect(result).toEqual(mockBook)
        expect(updateBookDetailsById).toHaveBeenCalledWith(1, 'Captain Ameriaca')
    })


    // if id not found showing error message
    test('if id not found then title should be undefined', async () => {
        updateBookDetailsById.mockReturnValue(null)
        let result = await updateBookDetailsById(123, {})
        expect(result).toEqual(null)
        expect(updateBookDetailsById).toHaveBeenCalledWith(123, {})
    })

    // delete books by id
    test('delete books by given id', async () => {
        let mockBook = [
            { id: 1, title: 'Harry Potter', author: 'George Orwell' },
            { id: 2, title: 'Brave New World', author: 'Aldous Huxley' },
            { id: 3, title: 'Pride and Prejudice', author: 'Jane Austen' }
        ];

        deleteBooksById.mockReturnValue(mockBook)
        let result = await deleteBooksById(1)
        expect(result).toEqual(mockBook)
        expect(deleteBooksById).toHaveBeenCalledWith(1)
    })

})


// test reviews function
describe('💞 testing reviews function', () => {
    beforeEach(() => {
        jest.clearAllMocks()
    })


    // test all reviews
    test('get all reviews, test mock function', async () => {
        let mockReview = [
            { id: 1, bookId: 1, content: 'Great book!' },
            { id: 2, bookId: 2, content: 'Thought-provoking read.' },
            { id: 3, bookId: 3, content: 'Loved the characters.' }
        ];

        getAllReviewsDetails.mockReturnValue(mockReview)
        let result = await getAllReviewsDetails()
        expect(result).toEqual(mockReview)
        expect(result.length).toBe(3)
        // verify that mock function was called
        expect(getAllReviewsDetails).toHaveBeenCalled()
    })


    // error testing if all reviews not found
    test('error occured if not reviews not found', async () => {
        getAllReviewsDetails.mockReturnValue({ reviews: [] })
        let result = await getAllReviewsDetails()
        expect(result.reviews).toEqual([])
        expect(getAllReviewsDetails).toHaveBeenCalledWith()
    })


    // get reviews by id
    test('get reviews by id', async () => {
        let mockReview = { id: 1, bookId: 1, content: 'Great book!' }
        getReviewsById.mockReturnValue(mockReview)
        let result = await getReviewsById(1)
        expect(result).toEqual(mockReview)
        expect(getReviewsById).toHaveBeenCalledWith(1)
    })

    // if reviews id not found showing undefined
    test('showing undefined if id not found', async () => {
        getReviewsById.mockReturnValue(undefined)
        let result = await getReviewsById(123)
        expect(result).toBeUndefined()
        expect(getReviewsById).toHaveBeenCalledWith(123)
    })

    // test reviews by bookId
    test('get reviews by bookId', async () => {
        let mockReview = { id: 1, bookId: 1, content: 'Great book!' }

        getReviewsByBookId.mockReturnValue(mockReview)
        let result = await getReviewsByBookId(1)
        expect(result).toEqual(mockReview)
        expect(getReviewsByBookId).toHaveBeenCalledWith(1)
    })


    // if bookId not found showing null
    test('bookId not found showing null', async () => {
        getReviewsByBookId.mockReturnValue(undefined)
        let result = await getReviewsByBookId()
        expect(result).toBeUndefined()
        expect(getReviewsByBookId).toHaveBeenCalledWith()
    })

    // add new reviews, test mock function
    test('adding new reviews details', async () => {
        let mockReview = { id: 14, bookId: 14, content: 'Great Wall of China!' }
        addNeweReviewsDetails.mockReturnValue(mockReview)
        let result = await addNeweReviewsDetails({ bookId: 14, content: 'Great Wall of China!' })

        expect(result).toEqual(mockReview)
        expect(addNeweReviewsDetails).toHaveBeenCalledWith({ bookId: 14, content: 'Great Wall of China!' })
    })


    // update reviews by bookId and content
    test('/update reviews by given bookId and update the content', async () => {
        let mockReview = { id: 1, bookId: 1, content: 'Green Vinch!' }
        updateReviewsByBookIdAndContent.mockReturnValue(mockReview)
        let result = await updateReviewsByBookIdAndContent(1, 'Green Vinch!')
        expect(result).toEqual(mockReview)
        expect(updateReviewsByBookIdAndContent).toHaveBeenCalledWith(1, 'Green Vinch!')
    })

    // if id not found to update content showing null 
    test('bookId not found, then showing null', async () => {
        updateReviewsByBookIdAndContent.mockReturnValue(undefined)
        let result = await updateReviewsByBookIdAndContent(undefined, null)
        expect(result).toBeUndefined()
        expect(updateReviewsByBookIdAndContent).toHaveBeenCalledWith(undefined, null)
    })

    // delete reviews by id
    test('get review id to delete reviews details', async () => {
        let mockReview = { id: 1, bookId: 1, content: 'Green Vinch!' }

        deleteReveiewsById.mockReturnValue(mockReview)
        let result = await deleteReveiewsById(1)
        expect(result).toEqual(mockReview)
        expect(deleteReveiewsById).toHaveBeenCalledWith(1)
    })

    // if deleted id not found shows undefined
    test('id not found for deleting reviews details, shows undefined', async () => {
        deleteReveiewsById.mockReturnValue(undefined)
        let result = await deleteReveiewsById()
        expect(result).toBeUndefined()
        expect(deleteReveiewsById).toHaveBeenCalled()
    })

})


// test user function
describe('🧟🏻 testing user function', () => {
    beforeEach(() => {
        jest.clearAllMocks()
    })


    // get all users
    test('get all users details', async () => {
        let mockUser = [
            { id: 1, name: 'John Doe', email: 'john@example.com' },
            { id: 2, name: 'Jane Smith', email: 'jane@example.com' },
            { id: 3, name: 'Mike Johnson', email: 'mike@email.com' }
        ]

        getAllUsersDetails.mockReturnValue(mockUser)
        let result = await getAllUsersDetails()
        expect(result).toEqual(mockUser)
        expect(result.length).toBe(3)
        expect(getAllUsersDetails).toHaveBeenCalled()
    })

    // if all users not found showing null
    test('error handle when user not found, and shows null', async () => {
        getAllUsersDetails.mockReturnValue(null)
        let result = await getAllUsersDetails()
        expect(result).toBeNull()
        expect(getAllUsersDetails).toHaveBeenCalled()
    })


    // get users by id
    test('get user by id', async () => {
        let mockUser = { id: 1, name: 'John Doe', email: 'john@example.com' }
        getUsersById.mockReturnValue(mockUser)
        let result = await getUsersById(1)
        expect(result).toEqual(mockUser)
        expect(getUsersById).toHaveBeenCalledWith(1)
    })

    // if user id not found shows undefined
    test('id not found shows undefined', async () => {
        getUsersById.mockReturnValue(undefined)
        let result = await getUsersById()
        expect(result).toBeUndefined()
        expect(getUsersById).toHaveBeenCalledWith()
    })

    // get users by name
    test(' fetch users name ', async () => {
        let mockUser = { id: 1, name: 'John Doe', email: 'john@example.com' }


        getUserByName.mockReturnValue(mockUser)
        let result = await getUserByName("John Doe")
        expect(result).toEqual(mockUser)
        // verify the function was called with the correct arguments
        expect(getUserByName).toHaveBeenCalledWith("John Doe")
    })


    // if name not found 
    test('user name not found shows undefined', async () => {
        getUserByName.mockReturnValue(undefined)
        let result = await getUserByName()
        expect(result).toBeUndefined()
        expect(getUserByName).toHaveBeenCalled()
    })

    // add new user details
    test('adding new user details', async () => {
        let mockUser = { id: 15, name: 'Sandeep', email: 'sandeep@example.com' }
        addNewUserDetails.mockReturnValue(mockUser)
        let result = await addNewUserDetails({ name: 'Sandeep', email: 'sandeep@example.com' })

        expect(result).toEqual(mockUser)
        expect(addNewUserDetails).toHaveBeenCalledWith({ name: 'Sandeep', email: 'sandeep@example.com' })
    })

    // if new user not added showing null
    test('showing null if new user not added', async () => {
        addNewUserDetails.mockReturnValue(null)
        let result = await addNewUserDetails()
        expect(result).toBeNull()
        expect(addNewUserDetails).toHaveBeenCalled()
    })


    // update user by given id and change the details of user
    test('update user by given id and change the details of user', async () => {
        let mockUser = { id: 1, name: 'Sandeep Doe', email: 'sandeep@example.com' }

        updateUserDetailsByIdAndName.mockReturnValue(mockUser)
        let result = await updateUserDetailsByIdAndName(1, "Sandeep Doe")
        expect(result).toEqual(mockUser)
        expect(updateUserDetailsByIdAndName).toHaveBeenCalledWith(1, "Sandeep Doe")
    })


    // if updating id not found shows null to add
    test('showing null if id not found', async () => {
        updateUserDetailsByIdAndName.mockReturnValue(null)
        let result = await updateUserDetailsByIdAndName()
        expect(result).toBeNull()
        expect(updateUserDetailsByIdAndName).toHaveBeenCalledWith()
    })

    // delete user details
    test('delete user details by id', async () => {
        let mockUser = [
            { id: 1, name: 'John Doe', email: 'john@example.com' },
            { id: 2, name: 'Jane Smith', email: 'jane@example.com' },
            { id: 3, name: 'Mike Johnson', email: 'mike@email.com' }
        ]
        // mock function
        deleteUserById.mockReturnValue(mockUser)
        let result = await deleteUserById(1)
        expect(result).toEqual(mockUser)
        expect(deleteUserById).toHaveBeenCalledWith(1)
    })


    // if id not found from data
    test('if id not found from data to delete user details', async () => {
        deleteUserById.mockReturnValue(undefined)
        let result = await deleteUserById()
        expect(result).toBeUndefined()
        expect(deleteUserById).toHaveBeenCalled()
    })
})



// endpoint testing 

describe('☁ endpoint testing', () => {
    beforeEach(() => {
        jest.clearAllMocks()
    })

    // get all book details
    it('GET /api/books test all books endpoint, return 200 status code', async () => {
        let apiBooks = [
            { id: 1, title: 'Harry Potter', author: 'George Orwell' },
            { id: 2, title: 'Brave New World', author: 'Aldous Huxley' },
            { id: 3, title: 'Pride and Prejudice', author: 'Jane Austen' }
        ]
        // mock function
        getAllBooksDetails.mockResolvedValue(apiBooks)
        let result = await request(server).get('/api/books')
        expect(result.statusCode).toBe(200)
        expect(result.body).toEqual(apiBooks)
    })

    // if all books details not found show 404 status code
    it('GET /api/books, should return 404 not found status code and give empty array', async () => {
        getAllBooksDetails.mockReturnValue([])
        let result = await request(server).get('/api/books')
        expect(result.status).toBe(404)
        expect(result.body.message).toEqual('No books found')
    })

    // check server error and return 500 status code
    it('GET /api/books, should return 500 status code', async () => {
        getAllBooksDetails.mockRejectedValue(new Error('Database server error'))
        let result = await request(server).get('/api/books')
        expect(result.status).toBe(500)
        expect(result.body.message).toEqual('Internal server error')
    })


    // API BOOKS BY GIVEN ID
    it('/GET api/books/id/1, should return 200 status code and book details', async () => {
        let apiBooks = { id: 1, title: 'Harry Potter', author: 'George Orwell' }
        getBooksById.mockReturnValue(apiBooks)
        let result = await request(server).get('/api/books/id/1')
        expect(result.status).toBe(200)
        expect(result.body).toEqual(apiBooks)
        expect(getBooksById).toHaveBeenCalledWith(1)
    })

    // if book not found return 404 status code
    it('GET /api/books/id/123, should return 404 status code', async () => {
        getBooksById.mockReturnValue([])
        let result = await request(server).get('/api/books/id/123')
        expect(result.status).toBe(404)
        expect(result.body.message).toEqual('No books found with given id')
        expect(getBooksById).toHaveBeenCalledWith(123)
    })

    // SERVER ERROR 500 STATUS CODE
    it('GET /api/books/id/1, should return 500 status code', async () => {
        getBooksById.mockRejectedValue(new Error('Internal server error'))
        let result = await request(server).get('/api/books/id/1')
        expect(result.status).toBe(500)
        expect(result.body.message).toEqual('server error')
    })

    // getBooksByTitleAndAuthor should return title and author with status code 200
    it('GET /api/books/title_author, should return 200 status code and title and author', async () => {
        let apiBooks = [
            { id: 1, title: 'Harry Potter', author: 'George Orwell' },
            { id: 2, title: 'Brave New World', author: 'Aldous Huxley' },
            { id: 3, title: 'Pride and Prejudice', author: 'Jane Austen' }
        ];

        getBooksByTitleAndAuthor.mockReturnValue(apiBooks)
        let result = await request(server).get('/api/books/title_author?title=Harry Potter&author=George Orwell')
        expect(result.status).toBe(200)
        expect(result.body).toEqual(apiBooks)
        expect(getBooksByTitleAndAuthor).toHaveBeenCalledWith('Harry Potter', 'George Orwell')
    })

    // getBooksByTitleAndAuthor should return error message with status code 404
    it('GET  /api/books/title_author, should return 404 status code and error message', async () => {
        getBooksByTitleAndAuthor.mockReturnValue([])
        let result = await request(server).get('/api/books/title_author?title=Harry Potter&author=George Orwell')
        expect(result.status).toBe(404)
        expect(result.body.message).toEqual('No books found with given title and author')
    })

    // getBooksByTitleAndAuthor should return error message with status code 500
    it('GET /api/books/title_author, should return 500 status code and error message', async () => {
        getBooksByTitleAndAuthor.mockRejectedValue(new Error('server error'))
        let result = await request(server).get('/api/books/title_author?title=Harry Potter&author=George Orwell')
        expect(result.status).toBe(500);
        expect(result.body.message).toEqual('internal server error')
    })

    // adding new books details, and return 201 status code
    it('POST /api/books/new, should return 201 status code', async () => {
        let apiBooks = { id: 4, title: 'Testing With JEST', author: 'Tanay Pratap' }
        addNewBookDetails.mockResolvedValue(apiBooks)
        let result = await request(server).post('/api/books/new').send({ title: 'Testing With JEST', author: 'Tanay Pratap' })
        expect(result.status).toBe(201)
        expect(result.body).toEqual(apiBooks)
        expect(addNewBookDetails).toHaveBeenCalledWith({ title: 'Testing With JEST', author: 'Tanay Pratap' })
    })

    // api/books/new, shourld return 400 status code 
    it('POST /api/books/new, should return 400 status code', async () => {

        addNewBookDetails.mockResolvedValue(null)
        let result = await request(server).post('/api/books/new').send({ title: 'Testing With JEST', author: 'Tanay Pratap' })
        expect(result.status).toBe(400)
        expect(result.body.message).toEqual("Book details not added")
        expect(addNewBookDetails).toHaveBeenCalledWith({ title: 'Testing With JEST', author: 'Tanay Pratap' })
    })


    // post /api/books/new, should return 500 status code 
    it('POST /api/books/new, should return 500 status code', async () => {
        addNewBookDetails.mockRejectedValue(new Error('Internal error'))
        let result = await request(server).post('/api/books/new').send({ title: 'Testing With JEST', author: 'Tanay Pratap' })
        expect(result.status).toBe(500)
        expect(result.body.message).toEqual('internal server error')
    })


    // delete books by given id
    // delete /api/books/:id, should return 200 status code
    it('post /api/books/delete/id/:id, should return 200 status code', async () => {
        let apiBooks = [
            { id: 1, title: 'Harry Potter', author: 'George Orwell' },
            { id: 2, title: 'Brave New World', author: 'Aldous Huxley' },
            { id: 3, title: 'Pride and Prejudice', author: 'Jane Austen' }
        ];
        deleteBooksById.mockResolvedValue(apiBooks)
        let result = await request(server).post('/api/books/delete/id/1')
        expect(result.status).toBe(200)
        expect(result.body).toEqual(apiBooks)
        // mock function called with message
        expect(deleteBooksById).toHaveBeenCalledWith(1)
    })

    // if deleted id not found , should return 404 status code
    it('post /api/books/delete/id/:id, should return 404 status code', async () => {
        deleteBooksById.mockResolvedValue([])
        let result = await request(server).post('/api/books/delete/id/1')
        expect(result.status).toBe(404)
        expect(result.body.message).toEqual("Book not found with given id")
    })

    // internal server error, should return 500 status code
    it('post /api/books/delete/id/:id, should return 500 status code', async () => {
        deleteBooksById.mockRejectedValue(new Error('Internal error'))
        let result = await request(server).post('/api/books/delete/id/1')
        expect(result.status).toBe(500)
        expect(result.body.message).toEqual('internal server error')

    })


    // REVIEWS TESTING ENDPOINTS

    // get all reviews, with 200 status code
    it('GET /api/reviews, should return 200 status code', async () => {
        let apiReview = [
            { id: 1, bookId: 1, content: 'Great book!' },
            { id: 2, bookId: 2, content: 'Thought-provoking read.' },
            { id: 3, bookId: 3, content: 'Loved the characters.' }
        ]
        getAllReviewsDetails.mockResolvedValue(apiReview)
        let result = await request(server).get('/api/reviews')
        expect(result.status).toBe(200)
        expect(result.body).toEqual(apiReview)

    })

    // if all review not found showing just empty [], and return 404 status code
    it('GET /api/reviews, should return 404 status code', async () => {
        getAllReviewsDetails.mockResolvedValue([])
        let result = await request(server).get('/api/reviews')
        expect(result.status).toBe(404)
        expect(result.body.message).toEqual("Revivews not found")
    })

    // all reviews if not found, should return 500 status code
    it('GET/api/reviews, should return 500 status code ', async () => {
        getAllReviewsDetails.mockRejectedValue(new Error('Internal error'))
        let result = await request(server).get('/api/reviews')
        expect(result.status).toBe(500)
        expect(result.body.error).toEqual('internal server error')
    })


    // get reviews by id, with status code 200
    it('GET /api/reviews/id/1, should return 200 status code ', async () => {
        let apiReview = { id: 1, bookId: 1, content: 'Great book!' }
        getReviewsById.mockResolvedValue(apiReview)
        let result = await request(server).get('/api/reviews/id/1')
        expect(result.status).toBe(200)
        expect(result.body).toEqual(apiReview)
        expect(getReviewsById).toHaveBeenCalledWith(1)
    })

    // if reviews id not found, should return 404 status code i
    it('GET /api/reviews/id/123, should return 404 status code', async () => {
        getReviewsById.mockResolvedValue([])
        let result = await request(server).get('/api/reviews/id/123')
        expect(result.status).toBe(404)
        expect(result.body.message).toEqual("Reviews not found with given id")
    })

    // if id not found , should return 500 status code
    it('GET /api/reviews/id/1, should return 500 status code', async () => {
        getReviewsById.mockRejectedValue(new Error('Internal error'))
        let result = await request(server).get('/api/reviews/id/1')
        expect(result.status).toBe(500)
        expect(result.body.message).toEqual('internal server error')
    })


    // get reviews by bookId with status code 200
    it('GET /api/reviews/bookId/1, should return 200 status code', async () => {
        let apiReview = [
            { id: 1, bookId: 1, content: 'Great book!' },
            { id: 2, bookId: 2, content: 'Thought-provoking read.' },
            { id: 3, bookId: 3, content: 'Loved the characters.' }
        ];

        getReviewsByBookId.mockResolvedValue(apiReview)
        let result = await request(server).get('/api/reviews/bookId/1')
        expect(result.status).toBe(200)
        expect(result.body).toEqual(apiReview)
        expect(getReviewsByBookId).toHaveBeenCalledWith(1)
    })

    // if reviews by bookId not found, should return 404 status code
    it(' GET /api/reviews/bookId/1, should return 404 status code', async () => {
        getReviewsByBookId.mockResolvedValue([])
        let result = await request(server).get('/api/reviews/bookId/1')
        expect(result.status).toBe(404)
        expect(result.body.message).toEqual("Reviews not found with given bookId")

    })


    // if bookId not found, should return 500 status code
    it('GET /api/reviews/bookId/1, should return 500 status code', async () => {
        getReviewsByBookId.mockRejectedValue(new Error('Internal error'))
        let result = await request(server).get('/api/reviews/bookId/1')
        expect(result.status).toBe(500)
        expect(result.body.message).toEqual('internal server error')
    })


    // adding new reviews detail, and return 201 status code
    it('POST /api/reviews, should return 201 status code', async () => {
        let apiReview = { id: 4, bookId: 4, content: 'Python learning path!' }
        addNeweReviewsDetails.mockResolvedValue(apiReview)
        let result = await request(server).post('/api/reviews/new').send(apiReview)
        expect(result.status).toBe(201)
        expect(result.body).toEqual(apiReview)
    })

    // if adding new reviews detail failed, return 404 status code
    it('POST /api/reviews, should return 404 status code', async () => {
        // return 400 status code if new reviews detail is empty
        let apiReview = null
        addNeweReviewsDetails.mockResolvedValue(apiReview)
        let result = await request(server).post('/api/reviews/new').send(apiReview)
        expect(result.status).toBe(400)
        expect(result.body.message).toEqual("Failed to add new reviews")
    })

    // if adding new reviews detail failed, return 500 status code
    it('POST /api/reviews, should return 500 status code', async () => {
        addNeweReviewsDetails.mockRejectedValue(new Error('Internal error'))
        let result = await request(server).post('/api/reviews/new').send({ bookId: 4, content: 'Python learning path!' })
        expect(result.status).toBe(500)
        expect(result.body.message).toEqual('internal server error')
    })
    // updateReviewsByBookIdAndContent
    // update data by given bookId and change the content with 200 status code
    it(' POST /api/reviews/update/bookId/1 should return 200 status code', async () => {
        let apiReview = { id: 1, bookId: 1, content: 'Python learning path!' }
        updateReviewsByBookIdAndContent.mockResolvedValue(apiReview)
        let result = await request(server).post('/api/reviews/update/bookId/1').send(apiReview)
        expect(result.status).toBe(200)
        expect(result.body).toEqual(apiReview)
        expect(updateReviewsByBookIdAndContent).toHaveBeenCalledWith(1, apiReview)
    })

    // if bookId not found shows 404 status code 
    it('should return 404 status code if bookId not found to update review details', async () => {
        let updatedContent = 'Updated Python learning path!'

        updateReviewsByBookIdAndContent.mockResolvedValue(null)
        let result = await request(server)
            .post('/api/reviews/update/bookId/123')
            .send({ content: updatedContent })

        expect(result.status).toBe(404)
        expect(result.body.message).toEqual('Id not found to update review details')
        expect(updateReviewsByBookIdAndContent).toHaveBeenCalledWith(123, { content: updatedContent })
    })

    // if update data failed, return 500 status code
    it('POST /api/reviews/update/bookId/1 should return 500 status code', async () => {
        let apiReview = { id: 1, bookId: 1, content: 'Python learning path!' }
        let updatedContent = 'Updated Python learning path!'

        updateReviewsByBookIdAndContent.mockRejectedValue(new Error('Internal error'))
        let result = await request(server).post('/api/reviews/update/bookId/123').send({ content: updatedContent })
        expect(result.status).toBe(500)
        expect(result.body.message).toEqual('internal server error')
        expect(updateReviewsByBookIdAndContent).toHaveBeenCalledWith(123, { content: updatedContent })
    })


    // delete reivews by id and return 200 status code
    it('post /api/reviews/delete/id/1 should return 200 status code', async () => {
        let apiReview = [
            { id: 1, bookId: 1, content: 'Great book!' },
            { id: 2, bookId: 2, content: 'Thought-provoking read.' }
        ]
        deleteReveiewsById.mockResolvedValue(apiReview)
        let result = await request(server).post('/api/reviews/delete/id/1')
        expect(result.status).toBe(200)
        expect(result.body).toEqual(apiReview)
        expect(deleteReveiewsById).toHaveBeenCalledWith(1)
    })

    // if deleted id not found it return 404 status code
    it('post /api/reviews/delete/id/123 should return 404 status code', async () => {
        deleteReveiewsById.mockResolvedValue(null)
        let result = await request(server).post('/api/reviews/delete/id/123')
        expect(result.status).toBe(404)
        expect(result.body.message).toEqual('Id not found to delete review details')
        expect(deleteReveiewsById).toHaveBeenCalledWith(123)
    })

    // if delete data failed, return 500 status code
    it('if delete data failed, return 500 status code', async ()=>{
        deleteReveiewsById.mockRejectedValue(new Error('Internal error'))
        let result = await request(server).post('/api/reviews/delete/id/1')
        expect(result.status).toBe(500)
        expect(result.body.message).toEqual('internal server error')
    })

})