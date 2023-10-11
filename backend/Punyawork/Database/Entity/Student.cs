using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Web;

namespace Punyawork.Models.Entity
{
    public class Student
    {
        [Key]
        public int Id { get; set; }
        public string Name { get; set; }
        public bool IsActive { get; set; }
        public Nullable<DateTime> DeletedOn { get; set; }
        public Nullable<bool> IsDeleted { get; set; }
    }
}