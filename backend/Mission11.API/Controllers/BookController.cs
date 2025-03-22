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
        public IActionResult Get(int pageHowMany = 5, int pageNum = 1, string sort = "asc")
        {
            var booksQuery = _bookContext.Books.AsQueryable();

            // Apply sorting based on the 'sort' query parameter (ascending or descending)
            booksQuery = sort.ToLower() == "desc"
                ? booksQuery.OrderByDescending(b => b.Title)
                : booksQuery.OrderBy(b => b.Title);

            // Pagination
            var books = booksQuery
                .Skip((pageNum - 1) * pageHowMany)
                .Take(pageHowMany)
                .ToList();

            var totalNumBooks = _bookContext.Books.Count();

            return Ok(new
            {
                Books = books,
                TotalNumBooks = totalNumBooks
            });
        }
    }
}