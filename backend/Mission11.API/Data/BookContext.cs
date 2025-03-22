using Microsoft.EntityFrameworkCore;

namespace Mission11.API.Data;

public class BookContext : DbContext
{
    public BookContext(DbContextOptions<BookContext> options) : base(options)
    {
    }
    public DbSet<Book> Books { get; set; }
}