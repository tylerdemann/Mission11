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

        public IEnumerable<Book> Get()
        {
            return _bookContext.Books.ToList();
        }
    }
}
