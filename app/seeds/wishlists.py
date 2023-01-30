from app.models import db, User, Item, environment, SCHEMA

def seed_wishlists():
  demo_user = User.query.get(1)

  super_shopper = User.query.get(5)

  items = [
    Item.query.get(1),
    Item.query.get(7),
    Item.query.get(15),
    Item.query.get(17),
    Item.query.get(20)
  ]

  all_items = Item.query.all()

  [demo_user.wishlist_items.append(i) for i in items]
  [super_shopper.wishlist_items.append(i) for i in all_items]

  db.session.commit()

def undo_wishlists():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.wishlists RESTART IDENTITY CASCADE;")
    else:
        db.session.execute("DELETE FROM wishlists")

    db.session.commit()
