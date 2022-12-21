from sqlalchemy.orm import relationship, declarative_mixin
from sqlalchemy.types import Integer, String, Numeric, DateTime
from .db import db, environment, SCHEMA, add_prefix_for_prod
from datetime import datetime

@declarative_mixin
class TimestampMixin:
  created_at = db.Column(db.DateTime, default=datetime.date())

class Review(db.Model, TimestampMixin):
  __tablename__ = 'reviews'

  if environment == "production":
    __table_args__ = {'schema': SCHEMA}

  id = db.Column(db.Integer, primary_key=True)
  user_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('users.id')), nullable=False)
  item_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('items.id')), nullable=False)
  title = db.Column(db.String(255), nullable=False)
  review = db.Column(db.String(255), nullable=False)
  rating = db.Column(db.Numeric(2,1), nullable=False)
  yes = db.Column(db.Integer, default=0)
  no = db.Column(db.Integer, default=0)


  user = db.relationship("User", back_populates='reviews')
  item = db.relationship("Item", back_populates='items')

  def to_dict(self):
    return {
      'id': self.id,
      'userId': self.user_id,
      'itemId': self.item_id,
      'title': self.title,
      'review': self.review,
      'rating': self.rating,
      'yes': self.yes,
      'no': self.no,
      'createdAt': self.created_at
    }
