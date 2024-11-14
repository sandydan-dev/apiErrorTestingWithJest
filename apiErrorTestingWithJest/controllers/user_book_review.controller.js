const books = [
    { id: 1, title: 'Harry Potter', author: 'George Orwell' },
    { id: 2, title: 'Brave New World', author: 'Aldous Huxley' },
    { id: 3, title: 'Pride and Prejudice', author: 'Jane Austen' },
    { id: 4, title: 'To Kill a Mockingbird', author: 'Harper Lee' },
    { id: 5, title: 'The Great Gatsby', author: 'F. Scott Fitzgerald' },
    { id: 6, title: 'Jane Eyre', author: 'Charlotte Brontë' },
    { id: 7, title: 'Wuthering Heights', author: 'Emily Brontë' },
    { id: 8, title: 'Moby-Dick', author: 'Herman Melville' },
    { id: 9, title: 'War and Peace', author: 'Leo Tolstoy' },
    { id: 10, title: 'Crime and Punishment', author: 'Fyodor Dostoevsky' },
    { id: 11, title: 'The Catcher in the Rye', author: 'J.D. Salinger' },
    { id: 12, title: 'The Picture of Dorian Gray', author: 'Oscar Wilde' },
    { id: 13, title: 'The Count of Monte Cristo', author: 'Alexandre Dumas' },
    { id: 14, title: 'The Adventures of Huckleberry Finn', author: 'Mark Twain' }
];



const reviews = [
    { id: 1, bookId: 1, content: 'Great book!' },
    { id: 2, bookId: 2, content: 'Thought-provoking read.' },
    { id: 3, bookId: 3, content: 'Loved the characters.' },
    { id: 4, bookId: 4, content: 'A classic!' },
    { id: 5, bookId: 5, content: 'Beautiful writing.' },
    { id: 6, bookId: 6, content: 'Emotional journey.' },
    { id: 7, bookId: 7, content: 'Haunting tale.' },
    { id: 8, bookId: 8, content: 'Epic adventure.' },
    { id: 9, bookId: 9, content: 'Timeless wisdom.' },
    { id: 10, bookId: 10, content: 'Psychological thriller.' },
    { id: 11, bookId: 11, content: 'Coming-of-age story.' },
    { id: 12, bookId: 12, content: 'Gothic romance.' },
    { id: 13, bookId: 13, content: 'Historical fiction.' },
    { id: 14, bookId: 14, content: 'Humorous satire.' }
];


let users = [
    { id: 1, name: 'John Doe', email: 'john@example.com' },
    { id: 2, name: 'Jane Smith', email: 'jane@example.com' },
    { id: 3, name: 'Mike Johnson', email: 'mike@email.com' },
    { id: 4, name: 'Sarah Taylor', email: 'sarah@example.net' },
    { id: 5, name: 'David Wilson', email: 'david@email.co.uk' },
    { id: 6, name: 'Emily Chen', email: 'emily@gmail.com' },
    { id: 7, name: 'Kevin White', email: 'kevin@yahoo.com' },
    { id: 8, name: 'Lisa Nguyen', email: 'lisa@hotmail.com' },
    { id: 9, name: 'Peter Brown', email: 'peter@outlook.com' },
    { id: 10, name: 'Olivia Martin', email: 'olivia@protonmail.com' },
    { id: 11, name: 'Christopher Davis', email: 'chris@icloud.com' },
    { id: 12, name: 'Rebecca Harris', email: 'rebecca@live.com' },
    { id: 13, name: 'Andrew Lee', email: 'andrew@tutanota.com' },
    { id: 14, name: 'Isabella Garcia', email: 'isabella@yandex.ru' }
];



// Books Details
function getAllBooksDetails() {
    return books
}

function getBooksById(id) {
    return books.find((book) => book.id === id)
}

function getBooksByTitleAndAuthor(title, author) {
    return books.find((book) => {
        return book.title && book.author
    })
}

// add new Book details
function addNewBookDetails(newBook) {
    let newBookAdded = { id: books.length + 1, ...newBook }
    books.push(newBookAdded)
    return newBookAdded
}

// update book details by given id and title
function updateBookDetailsById(id, title) {
    const updatedDetails = books.find((book) => {
        if (book.id === id) {
            return book.title = title
        }
    })
    return updatedDetails

}

// delete books by given id
function deleteBooksById(id) {
    return books.filter((book) => {
        if (book.id !== id) {
            return book
        } else {
            return null
        }
    })
}


// Reviews Details
function getAllReviewsDetails() {
    return reviews
}
function getReviewsById(id) {
    return reviews.find((review) => review.id === id)
}

function getReviewsByBookId(bookId) {
    let result = reviews.filter((review) => review.bookId === bookId)
    return result
}

// add new Reviews
function addNeweReviewsDetails(newReview) {
    let addedReviews = { id: reviews.length + 1, ...newReview }
    reviews.push(addedReviews)
    return addedReviews
}

// update Reviews details by given bookId and content
function updateReviewsByBookIdAndContent(bookId, content) {
    return reviews.find((review) => {
        if (review.bookId === bookId) {
            return review.content = content
        } else {
            return review
        }
    })
}

// delete Reviews by given id
function deleteReveiewsById(id) {
    return reviews.filter((review) => review.id !== id)


}


// Users Details
function getAllUsersDetails() {
    return users
}

function getUsersById(id) {
    return users.find((user) => user.id === id)
}

function getUserByName(name) {
    let result = users.filter((user) => user.name === name)
    return result
}

// add new user details
function addNewUserDetails(newUser) {
    let addedNewUser = { id: users.length + 1, ...newUser }
    books.push(addedNewUser)
    return addedNewUser
}

// update users by given id and name
function updateUserDetailsByIdAndName(id, name) {
    return users.find((user) => {
        if (user.id === id) {
            return user.name = name
        }
    })
}


// delete user by given id 
function deleteUserById(id) {
    let result = users.filter((user) => user.id !== id)
    return result
}

module.exports = {
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
}