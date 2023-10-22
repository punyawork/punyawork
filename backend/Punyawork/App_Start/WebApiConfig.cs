using Microsoft.Extensions.Configuration;
using Punyawork.Database;
using Punyawork.Database.IService;
using Punyawork.Database.Service;
using Punyawork.Implementation;
using Punyawork.Interface;
using Punyawork.IRepository;
using Punyawork.Repository;
using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Web.Http;
using System.Web.Http.Cors;
using Unity;
using Unity.Lifetime;

namespace Punyawork
{
    public static class WebApiConfig
    {
        public static void Register(HttpConfiguration config)
        {
            // Web API configuration and services
            var container = new UnityContainer();
            container.RegisterType(typeof(IRepository<>), typeof(Repository<>), new TransientLifetimeManager());
            container.RegisterType<ILocationService, LocationService>();
            container.RegisterType<IStudentService, StudentService>();
            container.RegisterType<ILoginService, LoginService>();
            container.RegisterType<IFundRaiseService, FundRaiseService>();
            container.RegisterType<IEmailService, EmailService>();
            
            container.RegisterType<DbContext, PunyaWorkContext>();
          
            
            config.DependencyResolver = new UnityResolver(container);

            EnableCorsAttribute cors = new EnableCorsAttribute("http://www.punyawork.com", "*", "*");
            config.EnableCors(cors);

            // Web API routes


            config.MapHttpAttributeRoutes();
            config.Routes.MapHttpRoute(
                name: "DefaultApi",
                routeTemplate: "api/{controller}/{id}",
                defaults: new { id = RouteParameter.Optional }
            );
            
        }
    }
}
