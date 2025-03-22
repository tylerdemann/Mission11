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

        public IActionResult Get(int pageHowMany = 5, int pageNum = 1)
        {
            var something = _bookContext.Books
                .Skip((pageNum - 1) * pageHowMany)
                .Take(pageHowMany)
                .ToList();
            
            var totalNumBooks = _bookContext.Books.Count();
            
            return Ok(new
            {
                Books = something,
                TotalNumBooks = totalNumBooks
            });
        }
    }
}
