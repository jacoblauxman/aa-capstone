from sqlalchemy.orm import relationship, declarative_mixin
from sqlalchemy.schema import Column, ForeignKey
from sqlalchemy.types import Integer, String, Numeric, DateTime, DECIMAL
from .db import db, environment, SCHEMA, add_prefix_for_prod
from datetime import datetime

@declarative_mixin
class TimestampMixin:
  # created_at = Column(DateTime, default=datetime.date(datetime.now()))
  created_at = Column(DateTime, default=datetime.now())

class Review(db.Model, TimestampMixin):
  __tablename__ = 'reviews'

  if environment == "production":
    __table_args__ = {'schema': SCHEMA}

  id = Column(Integer, primary_key=True)
  user_id = Column(Integer, ForeignKey(add_prefix_for_prod('users.id')), nullable=False)
  item_id = Column(Integer, ForeignKey(add_prefix_for_prod('items.id')), nullable=False)
  title = Column(String(255), nullable=False)
  review = Column(String(255), nullable=False)
  rating = Column(DECIMAL(2,1), nullable=False)
  yes = Column(Integer, default=0)
  no = Column(Integer, default=0)


  user = relationship("User", back_populates='reviews')
  item = relationship("Item", back_populates='reviews')

  def to_dict(self):
    return {
      'id': self.id,
      'userId': self.user_id,
      'itemId': self.item_id,
      'title': self.title,
      'review': self.review,
      'rating': float(self.rating),
      'yes': self.yes,
      'no': self.no,
      'createdAt': self.created_at
    }
