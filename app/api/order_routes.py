from flask import Blueprint, jsonify, redirect, session, jsonify, request
from flask_login import login_required, current_user
from app.models import db, User, Item, Cart, CartItem, Order, OrderItem
from app.forms import OrderForm

order_routes = Blueprint('order', __name__)


# GET users orders

@order_routes.route("/user")
@login_required
def get_user_orders():
  orders = Order.query.filter(Order.user_id==current_user.id).all()
  users_orders = [o.to_dict() for o in orders]

  return {'orders': users_orders}, 200


# PUT users order

@order_routes.route("/user/<int:id>", methods=["PUT"])
@login_required
def update_user_order(id):
  order = Order.query.get(id)
  user_orders = Order.query.filter(Order.user_id==current_user.id).all()
  form = OrderForm()

  form['csrf_token'].data = request.cookies['csrf_token']
  if form.validate_on_submit():
    setattr(order, 'street', form.street.data)
    setattr(order, 'city', form.city.data)
    setattr(order, 'state', form.state.data)
    setattr(order, 'zipcode', form.zipcode.data)

    db.session.commit()

    return {"orders": [order.to_dict() for order in user_orders]}, 200

  return {"errors": ["VALIDATION: Must provide valid shipping address information"]}, 400
