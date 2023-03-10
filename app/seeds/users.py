from app.models import db, User, environment, SCHEMA


# Adds a demo user, you can add other users here if you want
def seed_users():

    users = [
        User(
        username='Demo', email='demo@aa.io', password='password'
        ),
        User(
        username='marnie', email='marnie@aa.io', password='password'
        ),
        User(
        username='bobbie', email='bobbie@aa.io', password='password'
        ),
        User(
        username='jaboc', email='jaboc@aa.io', password='password'
        ),
        User(
        username='SuperShopper', email='supershopper@aa.io', password='password'
        ),
        User(
        username='pro_gamer', email='pro_gamer@aa.io', password='password'
    ),
        User(
        username='fakeGamer', email='fakeGamer@aa.io', password='password'
    ),
        User(
        username='justAnotherUser', email='justanotheruser@aa.io', password='password'
    ),
        User(
        username='hanz', email='hanz@aa.io', password='password'
    ),
        User(
        username='trev', email='trev@aa.io', password='password'
    ),
        User(
        username='cahzzm', email='cahzzm@aa.io', password='password'
    ),
        User(
        username='d0rk5ter', email='d0r5ter@aa.io', password='password'
    ),
        User(
        username='mikemillercodes', email='mikemillercodes@aa.io', password='password'
    )]

    [db.session.add(user) for user in users]
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
