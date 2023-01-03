from .db import db, environment, SCHEMA, add_prefix_for_prod
from werkzeug.security import generate_password_hash, check_password_hash
from flask_login import UserMixin
from sqlalchemy.schema import Column
from sqlalchemy.orm import relationship
from sqlalchemy.types import String, Integer


class Cart(db.Model):
  __tablename__ = 'carts'

  if environment == "production":
    __table_args__ = {'schema': SCHEMA}
