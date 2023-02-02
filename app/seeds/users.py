from app.models import db, User, environment, SCHEMA


# Adds a demo user, you can add other users here if you want
def seed_users():
    demo = User(
        username='Demo', email='demo@aa.io', password='password')
    marnie = User(
        username='marnie', email='marnie@aa.io', password='password')
    bobbie = User(
        username='bobbie', email='bobbie@aa.io', password='password')
    cobe = User(
        username='cobe', email='cobe@aa.io', password='password')
    super_shopper=User(
        username='SuperShopper', email='supershopper@aa.io', password='password')
    pro_gamer=User(
        username='pro_gamer', email='pro_gamer@aa.io', password='password'
    )
    fake_gamer=User(
        username='fakeGamer', email='fakeGamer@aa.io', password='password'
    )
    just_a_user=User(
        username='justAnotherUser', email='justanotheruser@aa.io', password='password'
    )

    db.session.add(demo)
    db.session.add(marnie)
    db.session.add(bobbie)
    db.session.add(cobe)
    db.session.add(super_shopper)
    db.session.add(pro_gamer)
    db.session.add(fake_gamer)
    db.session.add(just_a_user)
    db.session.commit()


# Uses a raw SQL query to TRUNCATE or DELETE the users table. SQLAlchemy doesn't
# have a built in function to do this. With postgres in production TRUNCATE
# removes all the data from the table, and RESET IDENTITY resets the auto
# incrementing primary key, CASCADE deletes any dependent entities.  With
# sqlite3 in development you need to instead use DELETE to remove all data and
# it will reset the primary keys for you as well.
def undo_users():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.users RESTART IDENTITY CASCADE;")
    else:
        db.session.execute("DELETE FROM users")

    db.session.commit()
