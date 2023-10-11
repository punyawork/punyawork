using Punyawork.Database;
using Punyawork.Implementation;
using Punyawork.Interface;
using Punyawork.Models.Entity;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;

namespace Punyawork.Controllers
{
    public class ValuesController : ApiController
    {
        public IStudentService StudentService { get; set; }
        public ValuesController(IStudentService studentService)
        {
            StudentService = studentService;
        }

        // GET api/values
        public IEnumerable<string> Get()
        {
            return new string[] { "value1", "value2" };
        }

        // GET api/values/5
        public string Get(int id)
        {

            Student s = new Student();
            s.Name = "Mohit";
            s.IsActive = true;
            var y=StudentService.SaveStudentData(s);
            return "value" +id+y.Result;
        }

        // POST api/values
        public void Post([FromBody] string value)
        {
        }

        // PUT api/values/5
        public void Put(int id, [FromBody] string value)
        {
        }

        // DELETE api/values/5
        public void Delete(int id)
        {
        }
    }
}
