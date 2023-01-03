from flask import Blueprint, redirect, session, request, jsonify
from flask_login import login_required, current_user
from app.models import db, Item, Review
from app.forms import ReviewForm
import json

review_routes = Blueprint('reviews', __name__)



# GET reviews by user id
@review_routes.route('/user')
@login_required
def get_all_user_reviews():

  user_reviews = Review.query.filter(Review.user_id==current_user.id).all()
  return_reviews = []
  for r in user_reviews:
    r_item = r.item
    r_item = r_item.to_dict()
    r = r.to_dict()
    r['item'] = r_item
    return_reviews.append(r)

  print(return_reviews,'-------- JUST CHECKING THE SHAPE -------')

  # return jsonify(return_reviews), 200
  return {"userReviews": return_reviews}, 200



# GET review by id
@review_routes.route('/<int:id>')
@login_required
def get_review_by_id(id):
  review = Review.query.get(id)

  review = review.to_dict()

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
  print(form.data, '---------- CHECKING ON FORM DATA BACKEND ------------')
  if form.validate_on_submit():

  # form validations are currently erroring out send

    updated_review = Review.query.get(id)
    updated_review.title = form.title.data
    updated_review.review = form.review.data
    updated_review.rating = form.rating.data

    db.session.add(updated_review)
    db.session.commit()
    updated_review = updated_review.to_dict()

    # updated_review = Review.query.get(id)

    # print(updated_review, '----------- TEST IN BACKEND - REVIEW UPDATE -------------')

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





# ADD ONE YES VOTE TO REVIEW -- BONUS
@review_routes.route('/<int:id>/yes', methods=["GET"])
@login_required
def update_review_yes(id):

  update_review = Review.query.get(id)
  update_review = update_review.to_dict()
  update_review['yes'] = update_review['yes']+1
  print(update_review, 'HERE IS OUR UPDATE REVIEW!!!! ---------')
  # update_review.update({update_review['yes']: update_review['yes'] + 1})

  # TO DO -- right now errors out when trying to update/'add' to DB
  # db.session.add(update_review)
  # db.session.commit()
  # print(update_review, "UPDATED OUR YES VALUE HERE !~!!!!!! !!! ----------")

  return update_review, 200
