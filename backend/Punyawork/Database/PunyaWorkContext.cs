using Punyawork.Database.Entity;
using Punyawork.Models.Entity;
using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Web;

namespace Punyawork.Database
{
    public class PunyaWorkContext:DbContext
    {
        public PunyaWorkContext() :base("name=punyawork") { }

        public DbSet<Student>  students { get; set; }
        public DbSet<Login> Login { get; set; }
        public DbSet<FundRaise> FundRaise { get; set; }
        public DbSet<ReturnResultValidate> SignUp_Duplication { get; set; }
        public DbSet<ReturnUserSignUpID> GetUserSignUPID { get; set; }
        public DbSet<ReturnResult> UpdateUserSignUpData { get; set; }

    }
}