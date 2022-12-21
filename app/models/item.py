from sqlalchemy.orm import relationship
from sqlalchemy.types import Integer, String, Numeric
from .db import db, environment, SCHEMA, add_prefix_for_prod

class Item(db.Model):
  __tablename__ = 'items'

  if environment == "production":
    __table_args__ = {'schema': SCHEMA}

  id = db.Column(db.Integer, primary_key=True)
  title = db.Column(db.String(255), nullable=False)
  description = db.Column(db.String(500), nullable=False)
  price = db.Column(db.Numeric(5,2), nullable=False)
  category = db.Column(db.String(255))
  platform = db.Column(db.String(255))
  creator = db.Column(db.String(255))
  image_url = db.Column(db.String(255))

  reviews = db.relationship("Review", back_populates="item", cascade="all, delete")

  def to_dict(self):
    return {
      'id': self.id,
      'title': self.title,
      'description': self.description,
      'price': self.price,
      'category': self.category,
      'platform': self.platform,
      'creator': self.creator,
      'image': self.image_url
    }
