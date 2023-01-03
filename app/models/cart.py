from .db import db, environment, SCHEMA, add_prefix_for_prod, carts_items
from werkzeug.security import generate_password_hash, check_password_hash
from flask_login import UserMixin
from sqlalchemy.schema import Column, ForeignKey
from sqlalchemy.orm import relationship
from sqlalchemy.types import String, Integer


class Cart(db.Model):
  __tablename__ = "carts"

  if environment == "production":
    __table_args__ = {'schema': SCHEMA}

  id = Column(Integer, primary_key=True)
  user_id = Column(Integer, ForeignKey(add_prefix_for_prod("users.id")), nullable=False)

  user = relationship("User", back_populates="cart")
  items = relationship("Item", secondary=carts_items, back_populates="carts")

  def to_dict(self):
    return {
      'id': self.id,
      'userId': self.user_id
    }
