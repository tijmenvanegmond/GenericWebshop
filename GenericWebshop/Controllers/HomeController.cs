using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using GenericWebshop.Models;

namespace GenericWebshop.Controllers
{
    public class HomeController : Controller
    {
        private webshopEntities db = new webshopEntities();

        public ActionResult Index()
        {
            var categories = db.Categories.ToList().Select(x => new KeyValuePair<int, string>(x.Id, x.Title)).ToList();
            var properties = typeof(Item).GetProperties().Select(p => p.Name).ToList();
            ViewData.Add("categories", categories);
            ViewData.Add("properties", properties);
            return View();
        }
        
    }
}