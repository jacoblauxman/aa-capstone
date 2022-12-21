from flask import Blueprint, redirect, session, request, jsonify
from flask_login import login_required, current_user
from app.models import db, Item, Review
from app.forms import ReviewForm
import json as simplejson
import simplejson as json

review_routes = Blueprint('reviews', __name__)


# GET reviews by user id
@review_routes.route('/user')
@login_required
def get_all_user_reviews():

  user_reviews = Review.query.filter(Review.user_id==current_user.id).all()
  # print(user_reviews, "USER REVIEWS USER REVIEWS USER REVIEWS")
  return_reviews = []
  for r in user_reviews:
    r = r.to_dict()
    r.update({"rating": json.dumps(r['rating'])})
    return_reviews.append(r)

  return jsonify(return_reviews), 200


# GET review by id
@review_routes.route('/<int:id>')
@login_required
def get_review_by_id(id):
  review = Review.query.get(id)

  review = review.to_dict()
  review.update({"rating": json.dumps(review['rating'])})

  if review:
    return jsonify(review), 200

  else:
    return {"errors": ["NOT FOUND: RESOURCE NOT FOUND"]}


# EDIT review by id
@review_routes.route('/<int:id>', methods=["PUT"])
@login_required
def update_review(id):
    form = ReviewForm()
    form['csrf_token'].data = request.cookies['csrf_token']
  # if form.validate_on_submit():

  # form validations are currently erroring out send

    updated_review = Review.query.get(id)
    print(updated_review.to_dict(), "FOUND THAT REVIEW!!!!!")
    print(form.data, "HERE IS OUR FORM DATA !!!!!!!!!!")
    updated_review.title = form.title.data
    updated_review.review = form.review.data
    updated_review.rating = form.rating.data

    db.session.add(updated_review)
    db.session.commit()
    updated_review = updated_review.to_dict()
    updated_review.update({"rating": json.dumps(updated_review["rating"])})

    return updated_review, 200
  # else:
  #   return {"errors": ["UNAUTHORIZED: You don't have authorization to complete this request"]}, 401



@review_routes.route('/<int:id>', methods=["DELETE"])
@login_required
def delete_review(id):
  delete_review = Review.query.get(id)

  if delete_review.user_id == current_user.id:
    db.session.delete(delete_review)
    db.session.commit()
    return {"message": "Review Successfully Deleted"}, 200

  else:
    return {"errors": ["UNAUTHORIZED: You don't have authorization to complete this request"]}, 401
