from .db import db, environment, SCHEMA, add_prefix_for_prod, wishlists
from werkzeug.security import generate_password_hash, check_password_hash
from flask_login import UserMixin
from sqlalchemy.schema import Column
from sqlalchemy.orm import relationship
from sqlalchemy.types import String, Integer

class User(db.Model, UserMixin):
    __tablename__ = 'users'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = Column(Integer, primary_key=True)
    username = Column(String(40), nullable=False, unique=True)
    email = Column(String(255), nullable=False, unique=True)
    hashed_password = Column(String(255), nullable=False)

    reviews = relationship("Review", back_populates="user", cascade="all, delete")
    cart = relationship("Cart", back_populates="user", cascade="all, delete")
    orders = relationship("Order", back_populates="user", cascade="all, delete")

    wishlist_items = relationship("Item", secondary=wishlists, back_populates="wishlist_users", cascade="all, delete")

    @property
    def password(self):
        return self.hashed_password

    @password.setter
    def password(self, password):
        self.hashed_password = generate_password_hash(password)

    def check_password(self, password):
        return check_password_hash(self.password, password)

    def to_dict(self):
        return {
            'id': self.id,
            'username': self.username,
            'email': self.email,
            'wishlist': [i.to_dict() for i in self.wishlist_items],
            'reviews': [r.to_dict() for r in self.reviews],
            'orders': [o.to_dict() for o in self.orders]
        }
