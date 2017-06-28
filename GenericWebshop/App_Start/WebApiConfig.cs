using System;
using System.Collections.Generic;
using System.Linq;
using System.Web.Http;
using System.Web.Mvc;

namespace GenericWebshop
{
    public static class WebApiConfig
    {
        public static void Register(HttpConfiguration config)
        {
            config.MapHttpAttributeRoutes();

            config.Routes.MapHttpRoute(
                name: "DefaultApi",
                routeTemplate: "api/{controller}/{id}",
                defaults: new { id = RouteParameter.Optional }
            );
            //TODO does not seem to work
            config.Routes.MapHttpRoute(
                name: "CartAction",
                routeTemplate: "api/{controller}/{action}/{id}",
                defaults: new {controller = "Cart", action = "Index", id = UrlParameter.Optional}
            );
        }
    }
}
