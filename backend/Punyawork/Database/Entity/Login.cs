using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Web;

namespace Punyawork.Database.Entity
{
    [Table("Login")]
    public class Login
    {
        [Key]
        public int Id { get; set; }
        public string FullName { get; set; }
        public string Email { get; set; }
        public string MobNumber { get; set; }
        public string UPINumber { get; set; }
        public string Password { get; set; }
        public int BlessingPoints { get; set; }
        public string ProfileImageName { get; set; }
        public int TotalFundRasie { get; set; }
        public bool IsActive { get; set; }
        public string Address { get; set; }
        public string Country { get; set; }
        public Nullable<DateTime> DeletedOn { get; set; }
        public Nullable<DateTime> AddedOn { get; set; }
        public Nullable<bool> IsDeleted { get; set; }

    }
    
}