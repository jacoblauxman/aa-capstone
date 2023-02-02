from app.models import db, Review, environment, SCHEMA
import random

def seed_reviews():
  review1 = Review(
    user_id=2,
    item_id=1,
    title='Just Okay',
    review='This thing was just okay, nothing special. I dunno if it was really worth it in the end, probably could have used the money better elsewhere. But that is how it goes sometimes!',
    rating=3
  )
  review2 = Review(
    user_id=3,
    item_id=1,
    title='It was great',
    review='Not sure what other reviews are on about, this rules and is one of the best purchases I made HANDS DOWN this year!!',
    rating=5
  )
  review3 = Review(
    user_id=4,
    item_id=1,
    title='This was pretty cool',
    review='For the price this was pretty dang cool, would recommend others at least giving it a shot at some point.',
    rating=4
  )
  review4 = Review(
    user_id=5,
    item_id=1,
    title='Had to have it!',
    review='You already know who it is! Had to add this one to my collection, because I am THE super-est shopper on GameBaux -- youknowit',
    rating=3
  )
  review5 = Review(
    user_id=5,
    item_id=2,
    title='THIS ONE is mine',
    review="Had to add this one to my ever growing collection -- collecting is a sport and I'm number ONE. Added, bought, delivered. Boom.",
    rating=3
  )
  review6 = Review(
    user_id=4,
    item_id=2,
    title='Just came in the mail',
    review="Gotta say, I just spent only about 5 minutes with this but I'm already ready to leave a review. Killer, works just as promised -- thank you GameBaux.",
    rating=4
  )
  review7 = Review(
    user_id=3,
    item_id=3,
    title='Wow!',
    review='Really loving this -- you should definitely give it a chance because wooooooow !! So good. That is all!!',
    rating=5
  )
  review8 = Review(
    user_id=5,
    item_id=3,
    title='Added.',
    review="Super-est Shopper-est here to let you know this one is also on it's way here, and that I've bought more things than anyone else on this whole dang site.",
    rating=3
  )
  review9 = Review(
    user_id=2,
    item_id=3,
    title='Definitely worth it!',
    review="Just wanted to say that this was definitely worth it! Awesome!",
    rating=5
  )
  review10 = Review(
    user_id=5,
    item_id=4,
    title='GOT IT',
    review="Added this one to my cart and purchased the moment it came out, you already know!",
    rating=3
  )

  review11 = Review(
    user_id=3,
    item_id=4,
    title='Eh this one was just okay',
    review='This product was just okay. Absolutely ordinary in every single way. Best to put on layaway and wait a day to see if the desire stays.',
    rating=2
  )

  review12 = Review(
    user_id=5,
    item_id=6,
    title='yeeeeeee added now to my cart',
    review="HASN'T EVEN SHIPPED YET BUT GONNA JUST LEAVE THIS ONE RIIIIIIIIGHT HERE",
    rating=3
  )

  review13 = Review(
    user_id=2,
    item_id=6,
    title='Chill out',
    review="This is a great item, but that super shopper really needs to take a moment to reflect methinks.",
    rating=4
  )

  review14 = Review(
    user_id=5,
    item_id=6,
    title="Don't tell me what to do.",
    review="This isn't reddit, it's a reviews section for products on GameBaux. Maybe it's someone else who really needs to reflect, eh.",
    rating=3,
  )

  review15 = Review(
    user_id=3,
    item_id=7,
    title="Worth it",
    review="Short and sweet, this was totally worth the purchase.",
    rating=4
  )

  review16 = Review(
    user_id=5,
    item_id=7,
    title='Another Purchase Made!',
    review="Can't stop won't stop GameBaux to the moooooon with these purchases!",
    rating=3
  )

  review17 = Review(
    user_id=4,
    item_id=8,
    title='Liked it, would get again',
    review='Worked out as a great gift for my friend, would rec again to anyone!',
    rating=4
  )

  review18 = Review(
    user_id=5,
    item_id=8,
    title='YUUUUUUUP',
    review='Just leaving the review to say that I bought this, too. Yerrr.',
    rating=3
  )

  all_reviews=[review1, review2, review3, review4, review5, review6, review7, review8, review9, review10, review11, review12, review13, review14, review15, review16, review17, review18]
  add_reviews=[db.session.add(review) for review in all_reviews]
  db.session.commit()

  user_ids = [2,3,4,5,6,7,8,9,10,11,12,13]
  # item_ids = list(range(43))
  item_ids = [n for n in range(44) if n!=0]
  ratings = [1,2,3,4,5,4,3,2,3,2]
  titles = ['Newest Buy', 'Worth it', "Can't Believe it", "Ohhhmy!", "Gotta Say", "Woooooow", "Just a heads up...", "What they don't tell you", "I have some thoughts", "Fresh take here" ]
  reviews = [
    "What would you say a review is really worth? I'd say it's roughly equivalent to however much I'm being paid to currently write these words. More so than anything, it's content, and what more could you ask for?",
    "Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec qu",
    "Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec qu",
    "Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta.",
    "Li Europan lingues es membres del sam familie. Lor separat existentie es un myth. Por scientie, musica, sport etc, litot Europa usa li sam vocabular. Li lingues differe solmen in li grammatica, li pro",
    "Short and sweet. To break up the monotony. Cheers",
    "Leaving a little note now to remind me to come back and finish this review later. Stay tuned! Find out next time on..."]

  for i in range(500):
    a_review = Review(
      user_id=random.choice(user_ids),
      item_id=random.choice(item_ids),
      title=random.choice(titles),
      review=random.choice(reviews),
      rating=random.choice(ratings)
    )
    db.session.add(a_review)
  db.session.commit()

def undo_reviews():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.reviews RESTART IDENTITY CASCADE;")
    else:
        db.session.execute("DELETE FROM reviews")

    db.session.commit()
