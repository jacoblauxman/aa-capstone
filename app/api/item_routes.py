from flask import Blueprint, redirect, session, request, jsonify
from flask_login import login_required, current_user
from app.models import db, Item, Review, Cart, CartItem
from app.forms import ReviewForm
import json

item_routes = Blueprint('items', __name__)



# GET all items

@item_routes.route("/")
# @login_required
def get_all_items():

  all_items = Item.query.all()
  res = [item.to_dict() for item in all_items]

  return {'items': res}, 200



# GET item by id

@item_routes.route('/<int:id>')
# @login_required
def get_one_item(id):
  found_item = Item.query.get(id)
  reviews = found_item.reviews
  reviews_and_user = []

  for r in reviews:

    user = r.user
    user = user.to_dict()
    r = r.to_dict()
    r['user'] = user
    reviews_and_user.append(r)


  item = found_item.to_dict()
  item['reviews'] = reviews_and_user

  return {"item": item}, 200



# POST review by item id

@item_routes.route('/<int:id>/reviews', methods=["POST"])
@login_required
def post_review_to_item(id):

  form = ReviewForm()
  form['csrf_token'].data = request.cookies['csrf_token']
  if form.validate_on_submit():
    new_review = Review(
      user_id=current_user.id,
      item_id=id,
      title=form.data['title'],
      review=form.data['review'],
      rating=form.data['rating']
    )


    db.session.add(new_review)
    db.session.commit()

    return_review = new_review.to_dict()


    user = current_user.to_dict()
    return_review['user'] = user
    return return_review, 201

  return {"errors": ["UNAUTHORIZED: You don't have authorization to complete this request"]}, 401



# GET all reviews by item id

@item_routes.route('/<int:id>/reviews')
# @login_required
def get_item_reviews(id):

  item = Item.query.get(id)
  item = item.to_dict()
  item_reviews = Review.query.filter(Review.item_id == id).all()
  item_reviews_users = []

  for i in item_reviews:
    user = i.user.to_dict()
    i = i.to_dict()
    item_reviews_users.append({**i, 'user': user})

  return {'itemReviews': item_reviews_users, 'item': item}, 200



# POST item to cart by item id

@item_routes.route('/<int:id>/cart')
@login_required
def add_item_to_cart(id):

  item = Item.query.get(id)
  cart = Cart.query.filter(Cart.user_id==current_user.id).first()
  cart_items = cart.items_association

  for i in cart.items_association:
    print('\n TESTING!! ----', "\n", i.item_id, item.id, i.quantity, "\n")

    if i.item_id==item.id and i.quantity < 10:
      i.quantity = i.quantity+1
      db.session.commit()
      return {'items': [item.to_dict() for item in cart_items]}, 200

    elif i.item_id==item.id and i.quantity==10:
      return {"errors": ["VALIDATION: Item quantity in cart cannot exceed an amount greater than 10"]}, 400

  new_cart_item = CartItem(cart=cart, item=item)
  db.session.commit()

  return {"items": [item.to_dict() for item in cart_items]}
