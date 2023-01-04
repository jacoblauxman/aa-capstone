from .db import db, environment, SCHEMA, add_prefix_for_prod
from werkzeug.security import generate_password_hash, check_password_hash
from flask_login import UserMixin
from sqlalchemy.schema import Column, ForeignKey
from sqlalchemy.orm import relationship
from sqlalchemy.types import String, Integer


class CartItem(db.Model):
  __tablename__ = 'carts_items'

  if environment == "production":
    __table_args__ = {'schema': SCHEMA}

  id = Column(Integer, primary_key=True)
  cart_id = Column(Integer, ForeignKey(add_prefix_for_prod("carts.id")))
  item_id = Column(Integer, ForeignKey(add_prefix_for_prod("items.id")))
  quantity = Column(Integer, default=1)

  # cart = relationship("Cart", back_populates="items_cart_association")
  # item = relationship("Item", back_populates="carts_item_association")

  cart = relationship("Cart", back_populates="items_association")
  item = relationship("Item", back_populates="carts_association")
  # cart = relationship("Cart", back_populates="items", passive_deletes="all")

  def to_dict(self):
    return {
      'id': self.id,
      'cartId': self.cart_id,
      'itemId': self.item_id,
      'quantity': self.quantity,
      'item': self.item.to_dict()
  }
