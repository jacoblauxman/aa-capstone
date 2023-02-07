from flask import Blueprint, redirect, session, request, jsonify
from flask_login import login_required, current_user
from app.models import db, Item, User
from app.forms import ReviewForm
import json

wishlist_routes = Blueprint('wishlist', __name__)



# GET wishlist by user

@wishlist_routes.route('/')
@login_required
def get_user_wishlist():
  user = User.query.filter(User.id==current_user.id).first()
  users_wishlist = [i.to_dict() for i in user.wishlist_items]

  return {"wishlist": users_wishlist, "user": user.to_dict()}, 200


# PUT (delete) item in user wishlist
@wishlist_routes.route('/<int:id>', methods=["DELETE"])
@login_required
def update_user_wishlist(id):
  user = User.query.filter(User.id==current_user.id).first()
  user.wishlist_items = [i for i in user.wishlist_items if i.id!=id]
  db.session.commit()
  print('\n', [i.to_dict() for i in user.wishlist_items], 'IN THE UPDATE')
  return {"wishlist": [i.to_dict() for i in user.wishlist_items]}, 200


