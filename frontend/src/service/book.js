import axios from 'axios';

const BOOK_URL = 'http://localhost:3001/api/v1/books';

export const getBook = async () => {
    return await axios.get(BOOK_URL);
}

export const getBookById = async (id
    ) => {
    return await axios.get(`${BOOK_URL}/${id}`);
}

export const addBook = async (book) => {
    const bookId = Math.random().toString(16).slice(2);
    return await axios.post(BOOK_URL, {
        ...book,
        id: bookId
    });
}

export const updateBook = async (data) => {
    return await axios.put(`${BOOK_URL}/${data.id}`, data);
}

export const deleteBook = async (id) => {
    return await axios.delete(`${BOOK_URL}/${id}`);
}