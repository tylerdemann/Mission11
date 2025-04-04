using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Mission11.API.Data;

namespace Mission11.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class BookController : ControllerBase
    {
        private BookContext _bookContext;
        
        public BookController(BookContext temp) => _bookContext = temp;

        [HttpGet]
        public IActionResult GetBooks(int pageHowMany = 5, int pageNum = 1, string sort = "asc", [FromQuery] List<string>? bookTypes = null)
        {
            var query = _bookContext.Books.AsQueryable();

            // ✅ Fix 1: Remove the unnecessary semicolon
            if (bookTypes != null && bookTypes.Any())
            {
                query = query.Where(b => bookTypes.Contains(b.Category));
            }

            // ✅ Fix 2: Apply sorting to the filtered query
            query = sort.ToLower() == "desc"
                ? query.OrderByDescending(b => b.Title)
                : query.OrderBy(b => b.Title);

            // ✅ Fix 3: Get total count AFTER filtering
            var totalNumBooks = query.Count();

            // Apply pagination
            var books = query
                .Skip((pageNum - 1) * pageHowMany)
                .Take(pageHowMany)
                .ToList();

            return Ok(new
            {
                Books = books,
                TotalNumBooks = totalNumBooks
            });
        }

        [HttpGet("GetBookTypes")]
        public IActionResult GetBookTypes()
        {
            var bookTypes = _bookContext.Books
                .Select(b => b.Category)
                .Distinct()
                .ToList();
            
            return Ok(bookTypes);
        }
        [HttpPost("AddBook")]
        public IActionResult AddBook([FromBody] Book newBook)
        {
            _bookContext.Books.Add(newBook);
            _bookContext.SaveChanges();
            return Ok(newBook);
        }

        [HttpPut("UpdateBook/{bookId}")]
        public IActionResult UpdateBook(int bookID, [FromBody] Book updatedBook)
        {
            var existingBook = _bookContext.Books.Find(bookID);
            
            existingBook.Title = updatedBook.Title;
            existingBook.Author = updatedBook.Author;
            existingBook.Publisher = updatedBook.Publisher;
            existingBook.ISBN = updatedBook.ISBN;
            existingBook.Classification = updatedBook.Classification; 
            existingBook.Category = updatedBook.Category;
            existingBook.PageCount = updatedBook.PageCount;
            existingBook.Price = updatedBook.Price;
            
            _bookContext.Books.Update(existingBook);
            _bookContext.SaveChanges();
            
            return Ok(existingBook);
        }
        [HttpDelete("DeleteBook/{bookId}")]
        public IActionResult DeleteBook(int bookId)
        {
            var book = _bookContext.Books.Find(bookId);

            if (book == null)
            {
                return NotFound(new {message = "Book not found"});
            }
            
            _bookContext.Books.Remove(book);
            _bookContext.SaveChanges();
            
            return NoContent();
        }
    }
}