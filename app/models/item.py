from sqlalchemy.orm import relationship
from sqlalchemy.schema import Column, ForeignKey
from sqlalchemy.types import Integer, String, Numeric, DECIMAL
from .db import db, environment, SCHEMA, add_prefix_for_prod

class Item(db.Model):
  __tablename__ = 'items'

  if environment == "production":
    __table_args__ = {'schema': SCHEMA}

  id = Column(Integer, primary_key=True)
  title = Column(String(255), nullable=False)
  description = Column(String(500), nullable=False)
  price = Column(DECIMAL(5,2), nullable=False)
  category = Column(String(255))
  platform = Column(String(255))
  creator = Column(String(255))
  image_url = Column(String(255))

  reviews = relationship("Review", back_populates="item", cascade="all, delete")

  def to_dict(self):
    return {
      'id': self.id,
      'title': self.title,
      'description': self.description,
      'price': float(self.price),
      'category': self.category,
      'platform': self.platform,
      'creator': self.creator,
      'image': self.image_url
    }
