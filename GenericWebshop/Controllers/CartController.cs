using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using GenericWebshop.Models;

namespace GenericWebshop.Controllers
{
    public class CartController : Controller
    {
        private webshopEntities db = new webshopEntities();

        // GET: Cart
        public ActionResult Index()
        {
            return View(db.Orders.First());
        }

    }
}
