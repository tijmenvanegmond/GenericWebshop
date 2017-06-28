using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Data.Entity.Infrastructure;
using System.Linq;
using System.Net;
using System.Web.Http;
using System.Web.Http.Description;
using GenericWebshop.Models;

namespace GenericWebshop.Controllers.Api
{
    public class CartController : ApiController
    {
        private webshopEntities db = new webshopEntities();

        // GET: api/cart
        [ResponseType(typeof(Order))]
        public IHttpActionResult GetCart(int id)
        {
            var cart = db.Orders.FirstOrDefault(x => x.Id == id);

            if (cart == null)
                return NotFound();
            if (cart.Status > 10)
                return BadRequest();

            return Ok(cart);
        }

        // Post: api/Cart/1
        [ResponseType(typeof(void))]
        public IHttpActionResult PostCartItem(int id, OrderItem orderItem)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            if (id != orderItem.Orders_Id || orderItem.Amount < 0 )
                return BadRequest();

            var order = db.Orders.FirstOrDefault(x => x.Id == id);

            if (order == null || order.Status > 10)
                return BadRequest();
            
            if (order.OrderItems.Any(x => x.Items_Id == orderItem.Items_Id)) //update
                order.OrderItems.First(x => x.Items_Id == orderItem.Items_Id).Amount = orderItem.Amount;
            else //add
                order.OrderItems.Add(orderItem);
            
            try
            {
                db.SaveChanges();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!OrderExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return Ok(orderItem);
        }

        //// Delete: api/Cart/CartItem/{id} 
        [ResponseType(typeof(void))]
        public IHttpActionResult DeleteCartItem(int id, OrderItem orderItem)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            Order order = db.Orders.Find(id);
            if (order == null)
                return NotFound();

            var matchOrderItem = order.OrderItems.FirstOrDefault(x => x.Items_Id == orderItem.Items_Id);

            if (matchOrderItem == null)
                return NotFound();

            db.OrderItems.Remove(matchOrderItem);
            db.SaveChanges();

            return Ok(matchOrderItem);
        }

        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                db.Dispose();
            }
            base.Dispose(disposing);
        }

        private bool OrderExists(int id)
        {
            return db.Orders.Count(e => e.Id == id) > 0;
        }


    }
}
