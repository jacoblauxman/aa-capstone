from flask import Blueprint, jsonify, redirect, session, jsonify, request
from flask_login import login_required, current_user
from app.models import db, User, Item, Cart, CartItem
from app.forms import CartItemForm

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
  # print(cart.items_association, '------- HERE IS THE ASSOCIATION!!!!! --------')

  # print(cart_items, "------------ CART ITEMS TEST IN BACk! ----------")
  for i in cart_items:
    # print(i.to_dict())
    item = i.to_dict()
    user_cart['items'].append(item)

  # cart_with_items = Cart.query.join(Cart.items).filter_by()


  # print(user_cart, "---------- USER CART ATTEMPT -------")
  return user_cart, 200


# PUT users cart item

@cart_routes.route("/user/<int:id>", methods=["PUT"])
@login_required
def update_user_cart_item(id):
  cart = Cart.query.filter(Cart.user_id==current_user.id).first()
  cart_items = cart.items_association
  cart_item = CartItem.query.get(id)
  print("\n",cart_item.to_dict(), "HERE IS OUR CART ITEM BEFORE UPDATE!!!!!! \n")
  form = CartItemForm()
  form['csrf_token'].data = request.cookies['csrf_token']
  if form.validate_on_submit():
    # cart_item.quantity = form.quantity.data
    setattr(cart_item, 'quantity', form.quantity.data)
    db.session.commit()

    return {"items": [item.to_dict() for item in cart_items]}

  return {"errors": ["VALIDATION: Item quantity in cart must be greater than 1 but no more than 10"]}




# DELETE users cart item
@cart_routes.route("/user/<int:id>", methods=["DELETE"])
@login_required
def delete_cart_item(id):
  cart = Cart.query.filter(Cart.user_id==current_user.id).first()
  cart = cart.to_dict()
  # print("\n", cart, "\n","------ TRYING TO FIND CART NOW! ------", "\n")
  cart_item = CartItem.query.get(id)
  # print("\n", cart_item.cart_id, "----- TRYING TO DELETE, CART ITEM \n")

  if cart_item.cart_id==cart['id']:
    db.session.delete(cart_item)
    db.session.commit()
    return {"message": "Item Successfully Removed from Cart"}, 200

  else:
    return {"errors": ["UNAUTHORIZED: You don't have authorization to complete this request"]}, 401



# PURCHASE (DELETE ALL / send to ORDERS) users cart items
@cart_routes.route("/user", methods=["DELETE"])
@login_required
def purchase_cart_items():
  cart = Cart.query.filter(Cart.user_id==current_user.id).first()
  cart.items_association = []
  print('\n', cart.items_association, "A CHECK IF WE CAN SET CART ITEMS TO NULL --------- \n")
  db.session.commit()

  return "testing"