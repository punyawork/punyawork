using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Web;

namespace Punyawork.Models.Entity
{
    public class Location
    {
        [Key]
        public int LocationID { get; set; }
        [Required]
        public string LocationName { get; set; }
        [Required]
        public int AddedBy { get; set; }
        [Required]
        public DateTime AddedOn { get; set; }
        [Required]
        public bool IsActive { get; set; }
        public int DeletedBy { get; set; }
        public Nullable<DateTime> DeletedOn { get; set; }
        public Nullable<bool> IsDeleted { get; set; }
    }

    public class vmLocation
    {
        [Key]
        public int LocationID { get; set; }
        [Required]
        public string LocationName { get; set; }

    }
}