using Microsoft.EntityFrameworkCore;

namespace ReactAspCrud.Controllers.Models
{
    public class StudentDbContext : DbContext
    {
        public StudentDbContext(DbContextOptions<StudentDbContext> options) : base(options)
        {
        }
        public DbSet<Student> Student { get; set; }
        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            //optionsBuilder.UseSqlServer("Data Source=DESKTOP-BNFLI1S\\SQLEXPRESS;Initial Catalog=lbs;User Id=DESKTOP-BNFLI1S\\kabhi; password=123; TrustServerCertificate=True");
            optionsBuilder.UseSqlServer("Data Source=DESKTOP-BNFLI1S\\SQLEXPRESS;Initial Catalog=db3;Integrated Security=True; TrustServerCertificate=True");
        }
    }
}
