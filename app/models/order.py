from .db import db, environment, SCHEMA, add_prefix_for_prod
from werkzeug.security import generate_password_hash, check_password_hash
from flask_login import UserMixin
from sqlalchemy.schema import Column, ForeignKey
from sqlalchemy.orm import relationship
from sqlalchemy.types import String, Integer
from sqlalchemy.ext.associationproxy import association_proxy
from .order_item import OrderItem

class Order(db.Model):
  __tablename__ = "orders"

  if environment == "production":
    __table_args__ = {'schema': SCHEMA}

  id = Column(Integer, primary_key=True)
  user_id = Column(Integer, ForeignKey(add_prefix_for_prod("users.id")), nullable=False)
  street = Column(String(50), nullable=False)
  city = Column(String(25), nullable=False)
  state = Column(String(2), nullable=False)
  zipcode = Column(String(5), nullable=False)


  user = relationship("User", back_populates="orders")
  items_association = relationship("OrderItem", back_populates="order")
  items = association_proxy("items_association", "item", creator=lambda i: OrderItem(item=i))

  def to_dict(self):
    return {
      'id': self.id,
      'userId': self.user_id,
      'street': self.street,
      'city': self.city,
      'state': self.state,
      'zipcode': self.zipcode,
      'items': [item.to_dict() for item in self.items_association]
    }
