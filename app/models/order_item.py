from .db import db, environment, SCHEMA, add_prefix_for_prod
from werkzeug.security import generate_password_hash, check_password_hash
from flask_login import UserMixin
from sqlalchemy.schema import Column, ForeignKey
from sqlalchemy.orm import relationship
from sqlalchemy.types import String, Integer


class OrderItem(db.Model):
  __tablename__ = 'orders_items'

  if environment == "production":
    __table_args__ = {'schema': SCHEMA}

  id = Column(Integer, primary_key=True)
  order_id = Column(Integer, ForeignKey(add_prefix_for_prod("orders.id")))
  item_id = Column(Integer, ForeignKey(add_prefix_for_prod("items.id")))
  quantity = Column(Integer, default=1)

  order = relationship("Order", back_populates="items_association")
  item = relationship("Item", back_populates="orders_association")

  def to_dict(self):
    return {
      'id': self.id,
      'cartId': self.cart_id,
      'itemId': self.item_id,
      'quantity': self.quantity,
      'item': self.item.to_dict()
  }
