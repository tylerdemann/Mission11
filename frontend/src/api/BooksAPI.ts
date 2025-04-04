import { Book } from '../types/Book';

interface FetchBooksResponse {
  books: Book[];
  totalNumBooks: number;
}

const API_URL =
  'https://bookproject-demann-backend-bnh8hpgycne9cqb7.westus-01.azurewebsites.net/api';

export const fetchBooks = async (
  pageSize: number,
  pageNum: number,
  selectedCategories: string[],
  sort: string
): Promise<FetchBooksResponse> => {
  try {
    const categoryParams = selectedCategories
      .map((cat) => `bookTypes=${encodeURIComponent(cat)}`)
      .join('&');
    const response = await fetch(
      `${API_URL}/Book?pageHowMany=${pageSize}&pageNum=${pageNum}&sort=${sort}${selectedCategories.length ? `&${categoryParams}` : ''}`
    );
    if (!response.ok) {
      throw new Error('Failed fetching projects');
    }
    return await response.json();
  } catch (error) {
    console.error('Error fetching projects: ', error);
    throw error;
  }
};

export const addBook = async (newBook: Book): Promise<Book> => {
  try {
    const response = await fetch(`${API_URL}/Book/AddBook`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newBook),
    });

    if (!response.ok) {
      throw new Error('Faild to add book');
    }

    return await response.json();
  } catch (error) {
    console.error('Error adding book', error);
    throw error;
  }
};

export const updateBook = async (
  bookID: number,
  updatedBook: Book
): Promise<Book> => {
  try {
    const response = await fetch(`${API_URL}/Book/UpdateBook/${bookID}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(updatedBook),
    });
    return await response.json();
  } catch (error) {
    console.error('Error updating project', error);
    throw error;
  }
};

export const deleteBook = async (bookID: number): Promise<void> => {
  try {
    const response = await fetch(`${API_URL}/Book/DeleteBook/${bookID}`, {
      method: 'DELETE',
    });
    if (!response.ok) {
      throw new Error('Failed to delete book');
    }
  } catch (error) {
    console.error('Error deleting book:', error);
    throw error;
  }
};
