from app.models import db, Cart, environment, SCHEMA

def seed_carts():
  cart1 = Cart(
    user_id=1
  )

  cart2 = Cart(
    user_id=2
  )

  cart3 = Cart(
    user_id=3
  )

  cart4 = Cart(
    user_id=4
  )

  cart5 = Cart(
    user_id=5
  )


def undo_carts():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.carts RESTART IDENTITY CASCADE;")
    else:
        db.session.execute("DELETE FROM carts")

    db.session.commit()
