import { useState } from 'react';
import { Book } from '../types/Book';
import { updateBook } from '../api/BooksAPI';

interface EditBookFormProps {
  book: Book;
  onSuccess: () => void;
  onCancel: () => void;
}

const EditBookForm = ({ book, onSuccess, onCancel }: EditBookFormProps) => {
  const [formData, setFormData] = useState<Book>({ ...book });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    // Convert value to number if it's a numeric field
    const parsedValue =
      name === 'pageCount' || name === 'price' ? Number(value) : value;

    setFormData({ ...formData, [name]: parsedValue });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await updateBook(formData.bookID, formData);
    onSuccess();
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Add New Book</h2>
      <label>
        Book Title:{' '}
        <input
          type="text"
          name="title"
          value={formData.title}
          onChange={handleChange}
        />
      </label>
      <label>
        Book Author:{' '}
        <input
          type="text"
          name="author"
          value={formData.author}
          onChange={handleChange}
        />
      </label>
      <label>
        Book Publisher:{' '}
        <input
          type="text"
          name="publisher"
          value={formData.publisher}
          onChange={handleChange}
        />
      </label>
      <label>
        Book ISBN:{' '}
        <input
          type="text"
          name="isbn"
          value={formData.isbn}
          onChange={handleChange}
        />
      </label>
      <label>
        Book Classification:{' '}
        <input
          type="text"
          name="classification"
          value={formData.classification}
          onChange={handleChange}
        />
      </label>
      <label>
        Book Category:{' '}
        <input
          type="text"
          name="category"
          value={formData.category}
          onChange={handleChange}
        />
      </label>
      <label>
        Book Page Count:{' '}
        <input
          type="number"
          name="pageCount"
          value={formData.pageCount}
          onChange={handleChange}
        />
      </label>
      <label>
        Book Price:{' '}
        <input
          type="number"
          name="price"
          value={formData.price}
          onChange={handleChange}
        />
      </label>
      <button type="submit">Update Book</button>
      <button type="button" onClick={onCancel}>
        Cancel
      </button>
    </form>
  );
};

export default EditBookForm;
