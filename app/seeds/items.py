from app.models import db, Item, environment, SCHEMA

def seed_items():
  item1 = Item(
    title='Elden Ring',
    description="ELDEN RING, developed by FromSoftware Inc. and produced by BANDAI NAMCO Entertainment Inc., is a fantasy action-RPG and FromSoftware's largest game to date, set within a world full of mystery and peril.",
    price=59.99,
    category='Game',
    platform='Xbox',
    creator='FROM SOFTWARE',
    image_url='https://res.cloudinary.com/dixbzsdnm/image/upload/v1671565115/aa-capstone-gamebaux/Elden-Ring---Xbox-Series-X.jpg'
  )

  item2 = Item(
    title='Pokemon Scarlet and Violet',
    description="Choose your journey through a new, open-world Pokémon adventure. The newest chapters in the Pokémon series, the Pokémon Scarlet and Pokémon Violet games, are coming to the Nintendo Switch™ system later this year. Catch, battle, and train Pokémon in the Paldea Region, a vast land filled with lakes, towering peaks, wastelands, small towns, and sprawling cities. There is no set path, so you can adventure freely through three grand stories.",
    price=119.99,
    category='Game',
    platform='Nintendo',
    creator='GAME FREAK',
    image_url='https://res.cloudinary.com/dixbzsdnm/image/upload/v1671565826/aa-capstone-gamebaux/Pokemon-Scarlet-and-Pokemon-Violet-Double-Pack_vbdzpd.jpg'
  )

  item3 = Item(
    title='God of War: Ragnarok',
    description="Embark on a mythic journey for answers and allies before Ragnarök arrives. Embark on an epic and heartfelt journey as Kratos and Atreus struggle with holding on and letting go.",
    price=69.99,
    category='Game',
    platform='PlayStation',
    creator='SANTA MONICA STUDIO',
    image_url='https://res.cloudinary.com/dixbzsdnm/image/upload/v1671565322/aa-capstone-gamebaux/God-of-War-Ragnarok---PlayStation-5.jpg'
  )

  item4 = Item(
    title='Sonic Frontiers',
    description="Experience Sonic like never before! Worlds are colliding in Sonic the Hedgehog’s newest high-speed adventure! Accelerate to new heights, battle hordes of powerful enemies, and experience the thrill of high velocity, open-zone acrobatic action and platforming freedom, across the FIVE MASSIVE Starfall Islands. Welcome to the evolution of Sonic games!",
    price=59.99,
    category='Game',
    platform='Nintendo',
    creator='SEGA',
    image_url='https://res.cloudinary.com/dixbzsdnm/image/upload/v1671565871/aa-capstone-gamebaux/Game---Sonic-Frontiers--Nintendo-Switch.jpg'
  )

  item5 = Item(
    title='Sonic Frontiers',
    description="Experience Sonic like never before! Worlds are colliding in Sonic the Hedgehog’s newest high-speed adventure! Accelerate to new heights, battle hordes of powerful enemies, and experience the thrill of high velocity, open-zone acrobatic action and platforming freedom, across the FIVE MASSIVE Starfall Islands. Welcome to the evolution of Sonic games!",
    price=59.99,
    category='Game',
    platform='PlayStation',
    creator='SEGA',
    image_url='https://res.cloudinary.com/dixbzsdnm/image/upload/v1671565913/aa-capstone-gamebaux/Game---Sonic-Frontiers--PlayStation-5.jpg'
  )

  item6 = Item(
    title='Sonic Frontiers',
    description="Experience Sonic like never before! Worlds are colliding in Sonic the Hedgehog’s newest high-speed adventure! Accelerate to new heights, battle hordes of powerful enemies, and experience the thrill of high velocity, open-zone acrobatic action and platforming freedom, across the FIVE MASSIVE Starfall Islands. Welcome to the evolution of Sonic games!",
    price=59.99,
    category='Game',
    platform='Xbox',
    creator='SEGA',
    image_url='https://res.cloudinary.com/dixbzsdnm/image/upload/v1671565954/aa-capstone-gamebaux/Game---Sonic-Frontiers--Xbox-Series-X.jpg'
  )

  item7 = Item(
    title='Nintendo Switch OLED',
    description="Play at home on the TV or on-the-go with a vibrant 7-inch OLED screen with the Nintendo Switch™ system (OLED model). In addition to a new screen with vivid colors and sharp contrast, the Nintendo Switch (OLED model) includes a wide adjustable stand for more comfortable viewing angles, a dock with a wired LAN port for TV mode (LAN cable sold separately), 64GB of internal storage, and enhanced audio in Handheld and Tabletop modes using the system's speakers. ",
    price=319.99,
    category='Console',
    platform='Nintendo',
    creator='Nintendo',
    image_url="https://res.cloudinary.com/dixbzsdnm/image/upload/v1671565414/aa-capstone-gamebaux/Console---Nintendo-Switch-OLED.jpg"
  )

  item8 = Item(
    title='PlayStation 5',
    description="Step up your gaming experience with the PlayStation 5. Enjoy lightning-fast loading with an ultra-high speed SSD, deep immersion with haptic feedback, adaptive triggers, and 3D audio. With Game Boost revisit your favorite content enhanced. Appreciate faster and smoother game rates. Play has no limits with the all-new generation of incredible PlayStation games. ",
    price=359.99,
    category='Console',
    platform='Sony',
    creator='Sony',
    image_url="https://res.cloudinary.com/dixbzsdnm/image/upload/v1671565685/aa-capstone-gamebaux/Console---Sony-PlayStation-5-Digital-Edition-Console.jpg"
  )

  item9 = Item(
    title='Xbox Series S',
    description="Introducing the Xbox Series S, the smallest, sleekest Xbox console ever. Experience the speed and performance of a next-gen all-digital console at an accessible price point. Get started with an instant library of 100+ high quality games, including all new Xbox Game Studios titles like Halo Infinite the day they release, when you add Xbox Game Pass Ultimate (membership sold separately). Seamlessly move between multiple games in a flash with Quick Resume.",
    price=249.99,
    category='Console',
    platform='Xbox',
    creator='Microsoft',
    image_url="https://res.cloudinary.com/dixbzsdnm/image/upload/v1671565452/aa-capstone-gamebaux/Console---Microsoft-Xbox-Series-S-Digital-Edition.jpg"
  )

  item10 = Item(
    title='Meta Quest 2 - 128 GB',
    description="Meta Quest 2 is our most advanced all-in-one VR system yet. Every detail has been engineered to make virtual worlds adapt to your movements, letting you explore awe-inspiring games and experiences with unparalleled freedom. No PC or console required. Get the most out of each moment with blazing-fast performance and next-generation graphics. Stay focused with a stunning display that features 50% more pixels than the original Quest.",
    price=399.99,
    category='Console',
    platform='Meta',
    creator='Meta',
    image_url="https://res.cloudinary.com/dixbzsdnm/image/upload/v1671565500/aa-capstone-gamebaux/Console---Meta-Quest-2-128GB.jpg"
  )

  item11 = Item(
    title='Sony PULSE 3D Wireless Gaming Headset',
    description="The PS5 PULSE 3D wireless headset features fine-tuned 3D audio, a sleek new look, noise-cancelling microphones, and easy access controls. Play games and stream videos with wireless PS5 headphones specifically built to deliver quality audio from the PlayStation 5 console. Sound quality on your PS5 headset just got even better with the PS5 PULSE 3D headset.",
    price=99.99,
    category='Accessory',
    platform='Sony',
    creator='Sony',
    image_url="https://res.cloudinary.com/dixbzsdnm/image/upload/v1671565557/aa-capstone-gamebaux/Accessories---Sony-Pulse-3D-Wireless-Gaming-Headset.jpg"
  )

  item12 = Item(
    title='Microsoft Xbox Series Wireless Controller Robot White',
    description="Experience the modernized design of the Xbox Wireless Controller in Robot White, featuring sculpted surfaces and refined geometry for enhanced comfort during gameplay with battery usage up to 40 hours. Stay on target with a hybrid D-pad and textured grip on the triggers, bumpers, and back-case. Seamlessly capture and share content such as screenshots, recordings, and more with the Share button. Connect using the USB-C port for direct plug and play to console and PC.",
    price=59.99,
    category='Accessory',
    platform='Xbox',
    creator='Microsoft',
    image_url="https://res.cloudinary.com/dixbzsdnm/image/upload/v1671565626/aa-capstone-gamebaux/Accessories---Microsoft-Xbox-Series-X-Wireless-Controller-Robot-White.jpg"
  )

  item13 = Item(
    title='Nintendo Switch OLED Model Carrying Case and Screen Protector',
    description="Help protect your Nintendo Switch™ system when you're on the go with the Nintendo Switch Carrying Case & Screen Protector. A Nintendo Switch system carrying case, 1 screen protector for Nintendo Switch (OLED Model), and 1 screen protector for Nintendo Switch are included. Nintendo Switch™ Carrying Case & Screen Protector will launch on 10/8/2021.",
    price=19.99,
    category='Accessory',
    platform='Nintendo',
    creator='Nintendo',
    image_url="https://res.cloudinary.com/dixbzsdnm/image/upload/v1671579413/aa-capstone-gamebaux/Accessories---Nintendo-Switch-OLED-Model-Carrying-Case-and-Screen-Protector.jpg"
  )

  all_items=[item1, item2, item3, item4, item5, item6, item7, item8, item9, item10, item11, item12, item13]
  add_items=[db.session.add(item) for item in all_items]
  db.session.commit()



def undo_items():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.items RESTART IDENTITY CASCADE;")
    else:
        db.session.execute("DELETE FROM items")

    db.session.commit()
