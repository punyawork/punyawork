using Punyawork.Database;
using Punyawork.Implementation;
using Punyawork.Interface;
using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Web.Http;
using System.Web.Http.Dependencies;
using Unity;
using Unity.AspNet.WebApi;

namespace Punyawork
{
    /// <summary>
    /// Specifies the Unity configuration for the main container.
    /// </summary>
    //public static class UnityConfig
    //{
    //    #region Unity Container
    //    private static Lazy<IUnityContainer> container =
    //      new Lazy<IUnityContainer>(() =>
    //      {
    //          var container = new UnityContainer();

    //          RegisterTypes(container);

    //          //var container = new UnityContainer();
    //          //container.RegisterType<ILocationService, LocationService>();
    //          //container.RegisterType<DbContext, PunyaWorkContext>();

    //          //GlobalConfiguration.Configuration.DependencyResolver = new UnityDependencyResolver(container);
    //          return container;
    //      });

    //    /// <summary>
    //    /// Configured Unity Container.
    //    /// </summary>
    //    public static IUnityContainer Container => container.Value;
    //    #endregion

    //    /// <summary>
    //    /// Registers the type mappings with the Unity container.
    //    /// </summary>
    //    /// <param name="container">The unity container to configure.</param>
    //    /// <remarks>
    //    /// There is no need to register concrete types such as controllers or
    //    /// API controllers (unless you want to change the defaults), as Unity
    //    /// allows resolving a concrete type even if it was not previously
    //    /// registered.
    //    /// </remarks>
    //    public static void RegisterTypes(IUnityContainer container)
    //    {
    //        // NOTE: To load from web.config uncomment the line below.
    //        // Make sure to add a Unity.Configuration to the using statements.
    //        // container.LoadConfiguration();

    //        // TODO: Register your type's mappings here.
    //        // container.RegisterType<IProductRepository, ProductRepository>();
    //        container.RegisterType<ILocationService, LocationService>();
    //        container.RegisterType<IStudentService, StudentService>();
    //        container.RegisterType<PunyaWorkContext, PunyaWorkContext>();
    //    }
    //}

    public class UnityResolver : IDependencyResolver
    {
        private readonly IUnityContainer _container;

        public UnityResolver(IUnityContainer container)
        {
            _container = container;
        }

        public object GetService(Type serviceType)
        {
            try
            {
                return _container.Resolve(serviceType);
            }
            catch (ResolutionFailedException)
            {
                return null;
            }
        }

        public IEnumerable<object> GetServices(Type serviceType)
        {
            try
            {
                return _container.ResolveAll(serviceType);
            }
            catch (ResolutionFailedException)
            {
                return new List<object>();
            }
        }

        public IDependencyScope BeginScope()
        {
            var child = _container.CreateChildContainer();
            return new UnityResolver(child);
        }

        public void Dispose()
        {
            _container.Dispose();
        }
    }
}