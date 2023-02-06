from flask import Blueprint, jsonify, redirect, session, jsonify, request
from flask_login import login_required, current_user
from app.models import db, User, Item, Cart, CartItem, Order, OrderItem
from app.forms import CartItemForm, OrderForm

cart_routes = Blueprint('cart', __name__)


# GET users cart

@cart_routes.route("/user")
@login_required
def get_user_cart():
  cart = Cart.query.filter(Cart.user_id==current_user.id).first()
  user_cart = cart.to_dict()
  user = cart.user
  user = user.to_dict()
  user_cart['user'] = user
  user_cart['items'] = []
  cart_items = cart.items_association


  for i in cart_items:
    item = i.to_dict()
    user_cart['items'].append(item)

  return user_cart, 200


# PUT users cart item

@cart_routes.route("/user/<int:id>", methods=["PUT"])
@login_required
def update_user_cart_item(id):
  cart = Cart.query.filter(Cart.user_id==current_user.id).first()
  cart_items = cart.items_association
  cart_item = CartItem.query.get(id)
  form = CartItemForm()

  form['csrf_token'].data = request.cookies['csrf_token']
  if form.validate_on_submit():
    setattr(cart_item, 'quantity', form.quantity.data)
    db.session.commit()

    return {"items": [item.to_dict() for item in cart_items]}

  return {"errors": ["VALIDATION: Item quantity in cart must be greater than 1 but no more than 10"]}, 400



# DELETE users cart item

@cart_routes.route("/user/<int:id>", methods=["DELETE"])
@login_required
def delete_cart_item(id):
  cart = Cart.query.filter(Cart.user_id==current_user.id).first()
  cart = cart.to_dict()
  cart_item = CartItem.query.get(id)

  if not cart_item:
    return {"errors": ["404 NOT FOUND: Resource Not Found"]}, 401


  if cart_item.cart_id==cart['id']:
    db.session.delete(cart_item)
    db.session.commit()
    return {"message": "Item Successfully Removed from Cart"}, 200



# PURCHASE (DELETE ALL / send to ORDERS) users cart items

@cart_routes.route("/user", methods=["DELETE"])
@login_required
def purchase_cart_items():
  cart = Cart.query.filter(Cart.user_id==current_user.id).first()
  order_items = []
  form = OrderForm()
  form['csrf_token'].data = request.cookies['csrf_token']

  if form.validate_on_submit():
    user_order = Order(
      user_id=current_user.id,
      street=form.street.data,
      city=form.city.data,
      state=form.state.data,
      zipcode=form.zipcode.data)

    db.session.commit()

  for i in cart.items_association:
      item = Item.query.get(i.item.id)
      new_order_item = OrderItem(order=user_order, item=item)
      new_order_item.quantity = i.quantity
      order_items.append(new_order_item)

  cart.items_association = []
  db.session.commit()

  return {"message": "Transaction successfully completed! Thank You for Your Purchase!", "order": user_order.to_dict()}, 200
