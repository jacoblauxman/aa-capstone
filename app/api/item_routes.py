from flask import Blueprint, redirect, session, request, jsonify
from flask_login import login_required, current_user
from app.models import db, Item, Review, Cart, CartItem
from app.forms import ReviewForm, ItemSearchForm
import json
from sqlalchemy import or_

item_routes = Blueprint('items', __name__)



# GET all items

@item_routes.route("/")
def get_all_items():

  all_items = Item.query.all()
  res = [item.to_dict() for item in all_items]

  return {'items': res}, 200



### 'SEARCH' / QUERY RESULTS Section ###

# GET all PLATFORM specific items

@item_routes.route("/platform/<string:platform>")
def get_platform_items(platform):
  all_items = Item.query.filter(Item.platform==platform).all()

  return {'items': [i.to_dict() for i in all_items]}, 200


@item_routes.route("/category/<string:category>")
def get_category_items(category):
  all_items = Item.query.filter(Item.category==category).all()

  return {'items': [i.to_dict() for i in all_items]}, 200


# GET all SEARCH related items

@item_routes.route("/search", methods=["POST"])
def get_searched_items():
  form = ItemSearchForm()
  form['csrf_token'].data = request.cookies['csrf_token']

  search = form.search.data
  db_search_str = f"%{search}%"
  if form.validate_on_submit():

    search_result = Item.query.filter(or_(
      Item.title.ilike(db_search_str),
      Item.description.ilike(db_search_str),
      Item.platform.ilike(db_search_str),
      Item.creator.ilike(db_search_str)
    ))

    return {'items': [i.to_dict() for i in search_result]}, 200




### ITEM SPECIFICS Section ###

# GET item by id

@item_routes.route('/<int:id>')
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



# POST (GET) item to cart by item id

@item_routes.route('/<int:id>/cart')
@login_required
def add_item_to_cart(id):

  item = Item.query.get(id)
  cart = Cart.query.filter(Cart.user_id==current_user.id).first()
  cart_items = cart.items_association

  for i in cart.items_association:

    if i.item_id==item.id and i.quantity < 10:
      i.quantity = i.quantity+1
      db.session.commit()
      return {'items': [item.to_dict() for item in cart_items]}, 200

    elif i.item_id==item.id and i.quantity==10:
      return {"errors": ["VALIDATION: Item quantity in cart cannot exceed an amount greater than 10"]}, 400

  new_cart_item = CartItem(cart=cart, item=item)
  db.session.commit()

  return {"items": [item.to_dict() for item in cart_items]}


# POST item to user wishlist

@item_routes.route('/<int:id>/wishlist', methods=["POST"])
@login_required
def add_item_to_wishlist(id):
  item = Item.query.get(id)
  user = current_user

  for i in user.wishlist_items:
    if i.id == item.id:
      return {"errors": ["VALIDATION: Item is already in wishlist"]}

  user.wishlist_items.append(item)
  db.session.commit()
  return {"wishlist": [i.to_dict() for i in user.wishlist_items], "user": user.to_dict()}, 201
