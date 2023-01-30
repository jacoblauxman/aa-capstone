from sqlalchemy.orm import relationship
from sqlalchemy.schema import Column, ForeignKey
from sqlalchemy.types import Integer, String, Numeric, DECIMAL
from .db import db, environment, SCHEMA, add_prefix_for_prod, wishlists
from sqlalchemy.ext.associationproxy import association_proxy
from .cart_item import CartItem
from .order_item import OrderItem

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
  carts_association = relationship("CartItem", back_populates="item")
  carts = association_proxy("carts_association", "cart", creator=lambda c: CartItem(cart=c))
  orders_association = relationship("OrderItem", back_populates="item")
  orders = association_proxy("orders_association", "order", creator=lambda c: OrderItem(order=c))

  wishlist_users = relationship("User", secondary=wishlists, back_populates="wishlist_items")

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
