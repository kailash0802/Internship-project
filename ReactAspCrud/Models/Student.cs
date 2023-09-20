using System.ComponentModel.DataAnnotations;

namespace ReactAspCrud.Controllers.Models
{
    public class Student
    {
        [Key]
        public int id { get; set; }
        public string usn { get; set; }
        public string stname { get; set; }
        public string course{get; set;}
        public string branch { get; set;}
        public string sem {get; set;}
        public string contact { get; set; }
    }
}
