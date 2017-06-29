using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using GenericWebshop.Models;
using WebGrease.Css.Extensions;

namespace GenericWebshop.Controllers
{
    public class CartController : Controller
    {
        private webshopEntities db = new webshopEntities();

        private double ClacTotal(Order order)
        {
            double total = 0.0;
            order.OrderItems.ForEach(x => total += (double)(x.Item.Price * x.Amount));
            return total;
        }

        // GET: Cart
        public ActionResult Index()
        {
            var order = db.Orders.First();
           
            ViewData.Add("total", ClacTotal(order));
            return View(order);
        }

    }
}
