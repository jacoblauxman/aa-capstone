from .db import db, environment, SCHEMA, add_prefix_for_prod
from werkzeug.security import generate_password_hash, check_password_hash
from flask_login import UserMixin
from sqlalchemy.schema import Column, ForeignKey
from sqlalchemy.orm import relationship
from sqlalchemy.types import String, Integer
from sqlalchemy.ext.associationproxy import association_proxy
from .cart_item import CartItem
class Cart(db.Model):
  __tablename__ = "carts"

  if environment == "production":
    __table_args__ = {'schema': SCHEMA}

  id = Column(Integer, primary_key=True)
  user_id = Column(Integer, ForeignKey(add_prefix_for_prod("users.id")), nullable=False)

  user = relationship("User", back_populates="cart")

  # items = relationship("Item", secondary="carts_items", backref="carts")

  # items = relationship("Carts_Items", back_populates="cart")

  # items = association_proxy(
  #   "items_cart_association", "item", creator=lambda i: CartItem(item=i)
  # )

  items_association = relationship("CartItem", back_populates="cart")
  # items = association_proxy("items_association", "item")
  items = association_proxy("items_association", "item", creator=lambda i: CartItem(item=i))

  def to_dict(self):
    return {
      'id': self.id,
      'userId': self.user_id
    }
