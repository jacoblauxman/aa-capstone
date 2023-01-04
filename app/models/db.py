from flask_sqlalchemy import SQLAlchemy

import os
environment = os.getenv("FLASK_ENV")
SCHEMA = os.environ.get("SCHEMA")


db = SQLAlchemy()

# helper function for adding prefix to foreign key column references in production
def add_prefix_for_prod(attr):
    if environment == "production":
        return f"{SCHEMA}.{attr}"
    else:
        return attr


# many-to-many relationship tables #

# carts_items = db.Table(
#     "carts_items",
#     db.Model.metadata,
#     # db.Column(
#     #     "id", db.Integer, primary_key=True
#     # ),
#     db.Column(
#         "cart_id", db.Integer, db.ForeignKey(add_prefix_for_prod("carts.id")), primary_key=True
#     ),
#     db.Column(
#         "item_id", db.Integer, db.ForeignKey(add_prefix_for_prod("items.id")), primary_key=True
#     ),
#     db.Column(
#         "quantity", db.Integer, default=1
#     )
# )

# if environment == "production":
#     carts_items.schema = SCHEMA
