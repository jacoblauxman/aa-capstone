from flask import Blueprint, redirect, session, request, jsonify
from flask_login import login_required, current_user
from app.models import db, Item, Review
from app.forms import ReviewForm
import json as simplejson
import simplejson as json

item_routes = Blueprint('items', __name__)

# GET all items
@item_routes.route("/")
@login_required
def get_all_items():

  all_items = Item.query.all()
  res = [item.to_dict() for item in all_items]

  return {'items': res}, 200



# GET item by id
@item_routes.route('/<int:id>')
@login_required
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
@item_routes.route('/<int:id>', methods=["POST"])
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

    return return_review, 201

  return {"errors": ["UNAUTHORIZED: You don't have authorization to complete this request"]}, 401
