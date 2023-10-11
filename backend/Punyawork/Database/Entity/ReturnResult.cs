using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Web;

namespace Punyawork.Models.Entity
{
    public class ReturnResult
    {
        [Key]
        public string Result { get; set; }
    }
    public class ReturnResultValidate
    {
        [Key]
        public string Result { get; set; }
        public int Count { get; set; }
    }

    public class ReturnUserSignUpID
    {
        [Key]
        public int Id { get; set; }
    }
}