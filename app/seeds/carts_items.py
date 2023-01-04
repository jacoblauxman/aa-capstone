from app.models import db, environment, SCHEMA, Cart, Item, CartItem

def seed_carts_items():

  demo_cart = Cart.query.get(1)
  item1 = Item.query.get(1)
  item2 = Item.query.get(2)
  item3 = Item.query.get(3)

  demo_cart.items.append(item1)
  demo_cart.items.append(item2)
  demo_cart.items.append(item3)


  db.session.commit()


def undo_carts_items():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.carts_items RESTART IDENTITY CASCADE;")
    else:
        db.session.execute("DELETE FROM carts_items")

    db.session.commit()
