using Punyawork.Implementation;
using Punyawork.Interface;
using Punyawork.Models.Entity;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace Punyawork.Controllers
{
    public class HomeController : Controller
    {
        
        //public IStudentService StudentService { get; set; }
        //public HomeController(IStudentService ilocationService)
        //{
        //    StudentService = ilocationService;
        //}

        public ActionResult Index()
        {
            //Student s = new Student();
            //s.Name = "Mohit";
            //s.IsActive = true;
            //StudentService.SaveStudentData(s);
            ViewBag.Title = "Home Page";

            return View();
        }
    }
}
