from app.models import db, Item, environment, SCHEMA

def seed_items():
  all_items = [
    Item(
    title='Elden Ring',
    description="ELDEN RING, developed by FromSoftware Inc. and produced by BANDAI NAMCO Entertainment Inc., is a fantasy action-RPG and FromSoftware's largest game to date, set within a world full of mystery and peril.",
    price=59.99,
    category='Game',
    platform='Xbox',
    creator='FROM SOFTWARE',
    image_url='https://res.cloudinary.com/dixbzsdnm/image/upload/v1671565115/aa-capstone-gamebaux/Elden-Ring---Xbox-Series-X.jpg'
  ),

  Item(
    title='Pokemon Scarlet and Violet',
    description="Choose your journey through a new, open-world Pokémon adventure. The newest chapters in the Pokémon series, the Pokémon Scarlet and Pokémon Violet games, are coming to the Nintendo Switch™ system later this year. Catch, battle, and train Pokémon in the Paldea Region, a vast land filled with lakes, towering peaks, wastelands, small towns, and sprawling cities. There is no set path, so you can adventure freely through three grand stories.",
    price=119.99,
    category='Game',
    platform='Nintendo',
    creator='GAME FREAK',
    image_url='https://res.cloudinary.com/dixbzsdnm/image/upload/v1671565826/aa-capstone-gamebaux/Pokemon-Scarlet-and-Pokemon-Violet-Double-Pack_vbdzpd.jpg'
  ),

  Item(
    title='God of War: Ragnarok',
    description="Embark on a mythic journey for answers and allies before Ragnarök arrives. Embark on an epic and heartfelt journey as Kratos and Atreus struggle with holding on and letting go.",
    price=69.99,
    category='Game',
    platform='PlayStation',
    creator='SANTA MONICA STUDIO',
    image_url='https://res.cloudinary.com/dixbzsdnm/image/upload/v1671565322/aa-capstone-gamebaux/God-of-War-Ragnarok---PlayStation-5.jpg'
  ),

  Item(
    title='Sonic Frontiers',
    description="Experience Sonic like never before! Worlds are colliding in Sonic the Hedgehog’s newest high-speed adventure! Accelerate to new heights, battle hordes of powerful enemies, and experience the thrill of high velocity, open-zone acrobatic action and platforming freedom, across the FIVE MASSIVE Starfall Islands. Welcome to the evolution of Sonic games!",
    price=59.99,
    category='Game',
    platform='Nintendo',
    creator='SEGA',
    image_url='https://res.cloudinary.com/dixbzsdnm/image/upload/v1671565871/aa-capstone-gamebaux/Game---Sonic-Frontiers--Nintendo-Switch.jpg'
  ),

  Item(
    title='Sonic Frontiers',
    description="Experience Sonic like never before! Worlds are colliding in Sonic the Hedgehog’s newest high-speed adventure! Accelerate to new heights, battle hordes of powerful enemies, and experience the thrill of high velocity, open-zone acrobatic action and platforming freedom, across the FIVE MASSIVE Starfall Islands. Welcome to the evolution of Sonic games!",
    price=59.99,
    category='Game',
    platform='PlayStation',
    creator='SEGA',
    image_url='https://res.cloudinary.com/dixbzsdnm/image/upload/v1671565913/aa-capstone-gamebaux/Game---Sonic-Frontiers--PlayStation-5.jpg'
  ),

  Item(
    title='Sonic Frontiers',
    description="Experience Sonic like never before! Worlds are colliding in Sonic the Hedgehog’s newest high-speed adventure! Accelerate to new heights, battle hordes of powerful enemies, and experience the thrill of high velocity, open-zone acrobatic action and platforming freedom, across the FIVE MASSIVE Starfall Islands. Welcome to the evolution of Sonic games!",
    price=59.99,
    category='Game',
    platform='Xbox',
    creator='SEGA',
    image_url='https://res.cloudinary.com/dixbzsdnm/image/upload/v1671565954/aa-capstone-gamebaux/Game---Sonic-Frontiers--Xbox-Series-X.jpg'
  ),

  Item(
    title='Nintendo Switch OLED',
    description="Play at home on the TV or on-the-go with a vibrant 7-inch OLED screen with the Nintendo Switch™ system (OLED model). In addition to a new screen with vivid colors and sharp contrast, the Nintendo Switch (OLED model) includes a wide adjustable stand for more comfortable viewing angles, a dock with a wired LAN port for TV mode (LAN cable sold separately), 64GB of internal storage, and enhanced audio in Handheld and Tabletop modes using the system's speakers. ",
    price=319.99,
    category='Console',
    platform='Nintendo',
    creator='Nintendo',
    image_url="https://res.cloudinary.com/dixbzsdnm/image/upload/v1671565414/aa-capstone-gamebaux/Console---Nintendo-Switch-OLED.jpg"
  ),

  Item(
    title='PlayStation 5',
    description="Step up your gaming experience with the PlayStation 5. Enjoy lightning-fast loading with an ultra-high speed SSD, deep immersion with haptic feedback, adaptive triggers, and 3D audio. With Game Boost revisit your favorite content enhanced. Appreciate faster and smoother game rates. Play has no limits with the all-new generation of incredible PlayStation games. ",
    price=359.99,
    category='Console',
    platform='Sony',
    creator='Sony',
    image_url="https://res.cloudinary.com/dixbzsdnm/image/upload/v1671565685/aa-capstone-gamebaux/Console---Sony-PlayStation-5-Digital-Edition-Console.jpg"
  ),

  Item(
    title='Xbox Series S',
    description="Introducing the Xbox Series S, the smallest, sleekest Xbox console ever. Experience the speed and performance of a next-gen all-digital console at an accessible price point. Get started with an instant library of 100+ high quality games, including all new Xbox Game Studios titles like Halo Infinite the day they release, when you add Xbox Game Pass Ultimate (membership sold separately). Seamlessly move between multiple games in a flash with Quick Resume.",
    price=249.99,
    category='Console',
    platform='Xbox',
    creator='Microsoft',
    image_url="https://res.cloudinary.com/dixbzsdnm/image/upload/v1671565452/aa-capstone-gamebaux/Console---Microsoft-Xbox-Series-S-Digital-Edition.jpg"
  ),

  Item(
    title='Meta Quest 2 - 128 GB',
    description="Meta Quest 2 is our most advanced all-in-one VR system yet. Every detail has been engineered to make virtual worlds adapt to your movements, letting you explore awe-inspiring games and experiences with unparalleled freedom. No PC or console required. Get the most out of each moment with blazing-fast performance and next-generation graphics. Stay focused with a stunning display that features 50% more pixels than the original Quest.",
    price=399.99,
    category='Console',
    platform='Meta',
    creator='Meta',
    image_url="https://res.cloudinary.com/dixbzsdnm/image/upload/v1671565500/aa-capstone-gamebaux/Console---Meta-Quest-2-128GB.jpg"
  ),

  Item(
    title='Sony PULSE 3D Wireless Gaming Headset',
    description="The PS5 PULSE 3D wireless headset features fine-tuned 3D audio, a sleek new look, noise-cancelling microphones, and easy access controls. Play games and stream videos with wireless PS5 headphones specifically built to deliver quality audio from the PlayStation 5 console. Sound quality on your PS5 headset just got even better with the PS5 PULSE 3D headset.",
    price=99.99,
    category='Accessory',
    platform='Sony',
    creator='Sony',
    image_url="https://res.cloudinary.com/dixbzsdnm/image/upload/v1671565557/aa-capstone-gamebaux/Accessories---Sony-Pulse-3D-Wireless-Gaming-Headset.jpg"
  ),

  Item(
    title='Microsoft Xbox Series Wireless Controller Robot White',
    description="Experience the modernized design of the Xbox Wireless Controller in Robot White, featuring sculpted surfaces and refined geometry for enhanced comfort during gameplay with battery usage up to 40 hours. Stay on target with a hybrid D-pad and textured grip on the triggers, bumpers, and back-case. Seamlessly capture and share content such as screenshots, recordings, and more with the Share button. Connect using the USB-C port for direct plug and play to console and PC.",
    price=59.99,
    category='Accessory',
    platform='Xbox',
    creator='Microsoft',
    image_url="https://res.cloudinary.com/dixbzsdnm/image/upload/v1671565626/aa-capstone-gamebaux/Accessories---Microsoft-Xbox-Series-X-Wireless-Controller-Robot-White.jpg"
  ),

  Item(
    title='Nintendo Switch OLED Model Carrying Case and Screen Protector',
    description="Help protect your Nintendo Switch™ system when you're on the go with the Nintendo Switch Carrying Case & Screen Protector. A Nintendo Switch system carrying case, 1 screen protector for Nintendo Switch (OLED Model), and 1 screen protector for Nintendo Switch are included. Nintendo Switch™ Carrying Case & Screen Protector will launch on 10/8/2021.",
    price=19.99,
    category='Accessory',
    platform='Nintendo',
    creator='Nintendo',
    image_url="https://res.cloudinary.com/dixbzsdnm/image/upload/v1671579413/aa-capstone-gamebaux/Accessories---Nintendo-Switch-OLED-Model-Carrying-Case-and-Screen-Protector.jpg"
  ),

  Item(
    title="Marvel's Midnight Suns Legendary Edition",
    description="When the underworld army of the ancient demoness Lilith rises, it's time to unleash Marvel's darker side! As The Hunter, a supernatural warrior with a mysterious past, you awaken after centuries of slumber to lead a hot-tempered team of dangerous and conflicted heroes. Can you stand alongside legends like Captain America and Doctor Strange? Can you forge Blade, Magik, Nico and Ghost Rider into a deadly team? If you're going to save the world, the Midnight Suns must rise again!",
    price=99.99,
    category='Game',
    platform='Xbox',
    creator='2K Games',
    image_url="https://res.cloudinary.com/dixbzsdnm/image/upload/v1674846501/aa-capstone-gamebaux/marvel-midnight-sun-xbox.jpg"
  ),

  Item(
    title="Marvel's Midnight Suns Legendary Edition",
    description="When the underworld army of the ancient demoness Lilith rises, it's time to unleash Marvel's darker side! As The Hunter, a supernatural warrior with a mysterious past, you awaken after centuries of slumber to lead a hot-tempered team of dangerous and conflicted heroes. Can you stand alongside legends like Captain America and Doctor Strange? Can you forge Blade, Magik, Nico and Ghost Rider into a deadly team? If you're going to save the world, the Midnight Suns must rise again!",
    price=99.99,
    category='Game',
    platform='Playstation',
    creator='2K Games',
    image_url="https://res.cloudinary.com/dixbzsdnm/image/upload/v1674846626/aa-capstone-gamebaux/marvel-midnight-suns-playstation.jpg"
  ),

  Item(
    title='One Piece Odyssey',
    description="A broken Thousand Sunny... Scattered crew members... Luffy's missing straw hat... During their voyage, the Straw Hats, led by Monkey D. Luffy are swallowed by a huge storm at sea. They end up on a mysterious island full of nature amidst the storm and become separated from each other. The crew set out on a new adventurous journey filled with wonders of a raging nature, powerful enemies, and strange encounters with island locals. Work together with Luffy and his crew to set sail once again!",
    price=59.99,
    category='Game',
    platform='Playstation',
    creator='Bandai',
    image_url="https://res.cloudinary.com/dixbzsdnm/image/upload/v1674846764/aa-capstone-gamebaux/one-piece-odyssey-playstation.jpg"
  ),

  Item(
    title='One Piece Odyssey',
    description="A broken Thousand Sunny... Scattered crew members... Luffy's missing straw hat... During their voyage, the Straw Hats, led by Monkey D. Luffy are swallowed by a huge storm at sea. They end up on a mysterious island full of nature amidst the storm and become separated from each other. The crew set out on a new adventurous journey filled with wonders of a raging nature, powerful enemies, and strange encounters with island locals. Work together with Luffy and his crew to set sail once again!",
    price=59.99,
    category='Game',
    platform='Xbox',
    creator='Bandai',
    image_url="https://res.cloudinary.com/dixbzsdnm/image/upload/v1674846721/aa-capstone-gamebaux/one-piece-odyssey-xbox.jpg"
  ),

  Item(
    title='The Last Of Us Part 1',
    description="In a ravaged civilization, where infected and hardened survivors run rampant, Joel, a weary protagonist, is hired to smuggle 14-year-old Ellie out of a military quarantine zone. However, what starts as a small job soon transforms into a brutal cross-country journey. Includes the complete The Last of Us single-player story and celebrated prequel chapter, Left Behind, which explores the events that changed the lives of Ellie and her best friend Riley forever.",
    price=64.99,
    category='Game',
    platform='Playstation',
    creator='Sony',
    image_url="https://res.cloudinary.com/dixbzsdnm/image/upload/v1674847010/aa-capstone-gamebaux/the-last-of-us-part-1.jpg"
  ),

  Item(
    title='Fire Emblem Engage',
    description="In a war against the Fell Dragon, four kingdoms worked together with heroes from other worlds to seal away this great evil. One-thousand years later, this seal has weakened and the Fell Dragon is about to reawaken. As a Divine Dragon, use rich strategies and robust customization to meet your destiny—to collect Emblem Rings and bring peace back to the Continent of Elyos. Summon valiant heroes with the power of Emblem Rings and add their power to yours in this brand-new Fire Emblem story.",
    price=59.99,
    category='Game',
    platform='Nintendo',
    creator='Nintendo',
    image_url="https://res.cloudinary.com/dixbzsdnm/image/upload/v1674847174/aa-capstone-gamebaux/Fire%20Emblem%20Engage.jpg"
  ),

  Item(
    title='Super Smash Bros. Ultimate',
    description="Gaming icons clash in the ultimate brawl you can play anytime, anywhere! Smash rivals off the stage as new characters Simon Belmont and King K. Rool join Inkling, Ridley, and every fighter in Super Smash Bros. history. Enjoy enhanced speed and combat at new stages based on the Castlevania series, Super Mario Odyssey, and more! Whether you play locally or online, savor the faster combat, new attacks, and new defensive options, like a perfect shield.",
    price=59.99,
    category='Game',
    platform='Nintendo',
    creator='Nintendo',
    image_url="https://res.cloudinary.com/dixbzsdnm/image/upload/v1674847502/aa-capstone-gamebaux/Super-Smash-Bros-Ult.jpg"
  ),

  Item(
    title='The Legend of Zelda: Breath of the Wild',
    description="Forget everything you know about The Legend of Zelda games. Step into a world of discovery, exploration, and adventure in The Legend of Zelda: Breath of the Wild, a boundary-breaking new game in the acclaimed series. Travel across vast fields, through forests, and to mountain peaks as you discover what has become of the kingdom of Hyrule in this stunning Open-Air Adventure. Now on Nintendo Switch, your journey is freer and more open than ever.",
    price=59.99,
    category='Game',
    platform='Nintendo',
    creator='Nintendo',
    image_url="https://res.cloudinary.com/dixbzsdnm/image/upload/v1674847764/aa-capstone-gamebaux/The-Legend-of-Zelda-Breath-of-the-Wild.jpg"
  ),

  Item(
    title="Mario Plus Rabbids Sparks of Hope",
    description="GameStop is excited to bring you Mario and Rabbids: Sparks of Hope on Nintendo Switch! Mario and Rabbids team up again in a new adventure. Show off your inner hero as you build your dream team to take down enemies and save your Spark friends in this strategy, adventure video game. Team up with Mario, Luigi, Princess Peach, Rabbid Peach, Rabbid Luigi, and their friends on a galactic journey to defeat a malevolent entity and save your Spark companions.",
    price=59.99,
    category='Game',
    platform='Nintendo',
    creator='Ubisoft',
    image_url="https://res.cloudinary.com/dixbzsdnm/image/upload/v1674847873/aa-capstone-gamebaux/Mario%2BRabbids-Sparks-of-Hope.jpg"
  ),

  Item(
    title='Super Mario Odyssey',
    description="This sandbox-style 3D Mario adventure—the first since 1996's beloved Super Mario 64 and 2002's Nintendo GameCube classic Super Mario Sunshine—is packed with secrets and surprises, and with Mario's new moves like cap throw, cap jump, and capture, you'll have fun and exciting gameplay experiences unlike anything you've enjoyed in a Mario game before. Get ready to be whisked away to strange and amazing places far from the Mushroom Kingdom!",
    price=59.99,
    category='Game',
    platform='Nintendo',
    creator='Nintendo',
    image_url="https://res.cloudinary.com/dixbzsdnm/image/upload/v1674847988/aa-capstone-gamebaux/Super-Mario-Odyssey.jpg"
  ),

  Item(
    title='Animal Crossing: New Horizons',
    description="Escape to a deserted island and create your own paradise as you explore, create, and customize in Animal Crossing: New Horizons. Your island getaway has a wealth of natural resources that can be used to craft everything from tools to creature comforts. You can hunt down insects at the crack of dawn, decorate your paradise throughout the day, or enjoy sunset on the beach while fishing in the ocean. The time of day and season match real life, check in and find new surprises all year round.",
    price=54.99,
    category='Game',
    platform='Nintendo',
    creator='Nintendo',
    image_url="https://res.cloudinary.com/dixbzsdnm/image/upload/v1674848151/aa-capstone-gamebaux/Animal-Crossing-New-Horizons.jpg"
  ),

  Item(
    title='Kirby and the Forgotten Land',
    description="Hungry for new adventures? Float off on an all-new adventure as the powerful puffball, Kirby. In Kirby and the Forgotten Land, explore 3D stages as you discover a mysterious world with abandoned structures from a past civilization — like a shopping mall?! Copy enemies’ abilities like the new Drill and Ranger and use them to attack, explore your surroundings, and save the kidnapped Waddle Dees from the ferocious Beast Pack alongside the mysterious Elfilin.",
    price=59.99,
    category='Game',
    platform='Nintendo',
    creator='Nintendo',
    image_url="https://res.cloudinary.com/dixbzsdnm/image/upload/v1674848296/aa-capstone-gamebaux/Kirby-and-the-Forgotten-Land.jpg"
  ),

  Item(
    title='Crisis Core - FFVII - Reunion',
    description="CRISIS CORE is a remaster of the original, featuring a complete HD graphics overhaul, a remastered soundtrack, a reimagined UI, and an updated combat system. The story begins seven years before the events of FFVII and follows Zack Fair, a young and ambitious Shinra SOLDIER operative. Zack is tasked with tracking down a missing SOLDIER 1st Class operative named Genesis Rhapsodos. But as his adventure unfolds, he discovers the dark secrets of Shinra's experiments and the monsters they create.",
    price=49.99,
    category='Game',
    platform='Xbox',
    creator='Square Enix',
    image_url="https://res.cloudinary.com/dixbzsdnm/image/upload/v1674851683/aa-capstone-gamebaux/Crisis-Core-FFVII-Xbox.jpg"
  ),

  Item(
    title='Crisis Core - FFVII - Reunion',
    description="CRISIS CORE is a remaster of the original, featuring a complete HD graphics overhaul, a remastered soundtrack, a reimagined UI, and an updated combat system. The story begins seven years before the events of FFVII and follows Zack Fair, a young and ambitious Shinra SOLDIER operative. Zack is tasked with tracking down a missing SOLDIER 1st Class operative named Genesis Rhapsodos. But as his adventure unfolds, he discovers the dark secrets of Shinra's experiments and the monsters they create.",
    price=49.99,
    category='Game',
    platform='Playstation',
    creator='Square Enix',
    image_url="https://res.cloudinary.com/dixbzsdnm/image/upload/v1674851650/aa-capstone-gamebaux/Crisis-Core-FFVII-Playstation.jpg"
  ),

  Item(
    title='Crisis Core - FFVII - Reunion',
    description="CRISIS CORE is a remaster of the original, featuring a complete HD graphics overhaul, a remastered soundtrack, a reimagined UI, and an updated combat system. The story begins seven years before the events of FFVII and follows Zack Fair, a young and ambitious Shinra SOLDIER operative. Zack is tasked with tracking down a missing SOLDIER 1st Class operative named Genesis Rhapsodos. But as his adventure unfolds, he discovers the dark secrets of Shinra's experiments and the monsters they create.",
    price=49.99,
    category='Game',
    platform='Nintendo',
    creator='Square Enix',
    image_url="https://res.cloudinary.com/dixbzsdnm/image/upload/v1674851702/aa-capstone-gamebaux/Crisis-Core-FFVII-Nintendo.jpg"
  ),

  Item(
    title='Dead Space',
    description="Isaac Clarke is an everyman engineer on a mission to repair a vast mining ship, the USG Ishimura, only to discover something has gone horribly wrong. The ship's crew has been slaughtered and Isaac’s beloved partner, Nicole, is lost somewhere on board. Now alone and armed with only his engineering tools and skills, Isaac races to find Nicole as the nightmarish mystery of what happened aboard. Trapped with hostile creatures called Necromorphs, Isaac faces a battle for survival.",
    price=69.99,
    category='Game',
    platform='Playstation',
    creator='Electronic Arts',
    image_url="https://res.cloudinary.com/dixbzsdnm/image/upload/v1674852183/aa-capstone-gamebaux/Dead-Space-Playstation.jpg"
  ),

  Item(
    title='Dead Space',
    description="Isaac Clarke is an everyman engineer on a mission to repair a vast mining ship, the USG Ishimura, only to discover something has gone horribly wrong. The ship's crew has been slaughtered and Isaac’s beloved partner, Nicole, is lost somewhere on board. Now alone and armed with only his engineering tools and skills, Isaac races to find Nicole as the nightmarish mystery of what happened aboard. Trapped with hostile creatures called Necromorphs, Isaac faces a battle for survival.",
    price=69.99,
    category='Game',
    platform='Xbox',
    creator='Electronic Arts',
    image_url="https://res.cloudinary.com/dixbzsdnm/image/upload/v1674852213/aa-capstone-gamebaux/Dead-Space-Xbox.jpg"
  ),


  Item(
    title='The Witcher III: Wild Hunt Complete Edition',
    description="Become a professional monster slayer and embark on an adventure in The Witcher III: Wild Hunt. Experience a dark fantasy, open world RPG that focuses on a character-driven story, various decisions, and tactical combat. The third installment of the saga improves every aspect of the series, with a smoother combat system, new Witcher senses, monster hunting, improved alchemy, magic signs, crafting systems, and many more.",
    price=44.99,
    category='Game',
    platform='Nintendo',
    creator='CD Projekt RED',
    image_url="https://res.cloudinary.com/dixbzsdnm/image/upload/v1674852579/aa-capstone-gamebaux/The-Witcher-III-Wild-Hunt-Complete-Edition-Nintendo.jpg"
  ),

  Item(
    title='The Witcher III: Wild Hunt Complete Edition',
    description="Become a professional monster slayer and embark on an adventure in The Witcher III: Wild Hunt. Experience a dark fantasy, open world RPG that focuses on a character-driven story, various decisions, and tactical combat. The third installment of the saga improves every aspect of the series, with a smoother combat system, new Witcher senses, monster hunting, improved alchemy, magic signs, crafting systems, and many more.",
    price=39.99,
    category='Game',
    platform='Xbox',
    creator='CD Projekt RED',
    image_url="https://res.cloudinary.com/dixbzsdnm/image/upload/v1674852697/aa-capstone-gamebaux/The-Witcher-III-Wild-Hunt-Complete-Edition-Xbox.jpg"
  ),

  Item(
    title='The Witcher III: Wild Hunt Complete Edition',
    description="Become a professional monster slayer and embark on an adventure in The Witcher III: Wild Hunt. Experience a dark fantasy, open world RPG that focuses on a character-driven story, various decisions, and tactical combat. The third installment of the saga improves every aspect of the series, with a smoother combat system, new Witcher senses, monster hunting, improved alchemy, magic signs, crafting systems, and many more.",
    price=39.99,
    category='Game',
    platform='Playstation',
    creator='CD Projekt RED',
    image_url="https://res.cloudinary.com/dixbzsdnm/image/upload/v1674852702/aa-capstone-gamebaux/The-Witcher-III-Wild-Hunt-Complete-Edition-Playstation.jpg"
  ),

  Item(
    title='Sony Playstation 5 DualSense Charging Station',
    description="Ensure that your DualSense™ wireless controllers have enough juice. With the PlayStation 5 DualSense Charging Station you can charge up to two controllers at the same time. Quickly and easily dock your controllers with the PS5 charging station's click-in design. These charging stations charge as quickly as when connected to the PS5 so you can free up USB ports without sacrificing performance.",
    price=29.99,
    category='Accessory',
    platform='Playstation',
    creator='Sony',
    image_url="https://res.cloudinary.com/dixbzsdnm/image/upload/v1674855057/aa-capstone-gamebaux/Sony-PlayStation-5-DualSense-Charging-Station.jpg"
  ),

  Item(
    title='Switch Wireless Pro Controller (Black)',
    description="Take your gaming to the next level with the Nintendo Switch Pro Controller. This Nintendo Switch Wireless Pro Controller includes motion controls, HD rumble, built-in amiibo functionality, and more. This Switch controller is designed to go wherever you go. It works with any mode, whether or not the console is docked. So you get more time to play the games you love, anyway you like.",
    price=59.99,
    category='Accessory',
    platform='Nintendo',
    creator='Nintendo',
    image_url="https://res.cloudinary.com/dixbzsdnm/image/upload/v1674855245/aa-capstone-gamebaux/Nintendo-Switch-Pro-Controller.jpg"
  ),

  Item(
    title="Sony DualSense Wireless Controller (Black)",
    description="Experience the power of gaming at your fingertips. The Sony DualSense Wireless Controller enhances your gaming experience. With revolutionary features and comfort with intuitive, precision controls you can fully experience your favorite video games. This wireless controller offers immersive haptic feedback, dynamic adaptive triggers and a built-in microphone, all integrated into an iconic comfortable design. Take gaming to the next level with this wireless PS5 controller.",
    price=69.99,
    category='Accessory',
    platform='Sony',
    creator='Sony',
    image_url="https://res.cloudinary.com/dixbzsdnm/image/upload/v1674855404/aa-capstone-gamebaux/Sony-DualSense-Wireless-Controller-for-PlayStation-5.jpg"
  ),

  Item(
    title='Xbox Elite Black Series 2 Wireless Controller',
    description="Play like a pro with the world's most advanced controller. Designed to meet the needs of today's competitive gamers, the all-new Xbox Elite Wireless Controller Series 2 features over 30 new ways to play like a pro. Enhance your aiming with new adjustable-tension thumbsticks, fire even faster with shorter hair trigger locks, and stay on target with a wrap-around rubberized grip.",
    price=179.99,
    category='Accessory',
    platform='Xbox',
    creator='Microsoft',
    image_url="https://res.cloudinary.com/dixbzsdnm/image/upload/v1674855463/aa-capstone-gamebaux/Microsoft-Xbox-Elite-Series-2-Wireless-Controller-Black.jpg"
  ),

  Item(
    title='Xbox Series X Wireless Controller (Black)',
    description="Experience the modernized design of the Xbox Wireless Controller in Robot White, featuring sculpted surfaces and refined geometry for enhanced comfort during gameplay with battery usage up to 40 hours. Stay on target with a hybrid D-pad and textured grip on the triggers, bumpers, and back-case. Seamlessly capture and share content such as screenshots, recordings, and more with the Share button. Connect using the USB-C port for direct plug and play to console and PC.",
    price=59.99,
    category='Accessory',
    platform='Xbox',
    creator='Microsoft',
    image_url="https://res.cloudinary.com/dixbzsdnm/image/upload/v1674855573/aa-capstone-gamebaux/Microsoft-Xbox-Series-X-Wireless-Controller-Black.jpg"
  ),

  Item(
    title='Switch Joy-Con (L+R) (Neon Pink/Green)',
    description="'Take your gaming to a whole new level' with this Nintendo Switch Joy-Con (L)/(R) Wireless Controller. Share it with your friends or attach it to the main console, each Joy-Con controller includes a gyro-sensor and accelerometer providing greater flexibility to jump, shoot, run and attack.Introducing Joy-Con, controllers that make new kinds of gaming possible, for use with Nintendo Switch. The versatile Joy-Con offer multiple surprising new ways for players to have fun.",
    price=79.99,
    category='Accessory',
    platform='Nintendo',
    creator='Nintendo',
    image_url="https://res.cloudinary.com/dixbzsdnm/image/upload/v1674855729/aa-capstone-gamebaux/Neon-Green-Joycons.jpg"
  ),

  Item(
    title='Switch Joy-Con (L+R) (Neon Purple/Orange)',
    description="'Take your gaming to a whole new level' with this Nintendo Switch Joy-Con (L)/(R) Wireless Controller. Share it with your friends or attach it to the main console, each Joy-Con controller includes a gyro-sensor and accelerometer providing greater flexibility to jump, shoot, run and attack.Introducing Joy-Con, controllers that make new kinds of gaming possible, for use with Nintendo Switch. The versatile Joy-Con offer multiple surprising new ways for players to have fun.",
    price=79.99,
    category='Accessory',
    platform='Nintendo',
    creator='Nintendo',
    image_url="https://res.cloudinary.com/dixbzsdnm/image/upload/v1674855953/aa-capstone-gamebaux/Orange-Purple-Joycons.jpg"
  ),

  Item(
    title='Turtle Beach Stealth 600 Wireless Gaming Headset',
    description="Officially licensed for Xbox, the Turtle Beach® Stealth™ 600 Gen 2 USB wireless amplified gaming headset delivers high-quality audio & chat for Xbox. A long-lasting 24+hour battery means less charging, and more gaming and with quick charging you can get 8.5 hours of battery life on just 15 minutes of charge time. A consistent, low-latency, lossless connection is made possible by our proprietary lag-free 2.4GHz wireless technology, giving you a gameplay advantage over the competition.",
    price=79.99,
    category='Accessory',
    platform='Xbox',
    creator='Turtle Beach',
    image_url="https://res.cloudinary.com/dixbzsdnm/image/upload/v1674856116/aa-capstone-gamebaux/Turtle-Beach-Wireless-Headset-Xbox.jpg"
  ),

  Item(
    title='HyperX Cloud Alpha Wired Gaming Headset',
    description="HyperX™ Cloud Alpha's groundbreaking Dual Chamber Drivers design gives audio more distinction and clarity by reducing distortion. The dual chambers separate the bass for cleaner, smoother sound. Cloud Alpha has premium red memory foam, an expanded headband and softer, more pliable leatherette, an aluminum frame, detachable braided cable and noise-cancellation microphone. It's also multi-platform, so serious gamers on PC, PS4™, Xbox One™ and other platforms will benefit.",
    price=99.99,
    category='Accessory',
    platform='Universal',
    creator='HyperX',
    image_url="https://res.cloudinary.com/dixbzsdnm/image/upload/v1674856308/aa-capstone-gamebaux/HyperX-Cloud-Alpha-Gaming-Headset.jpg"
  ),

  Item(
    title='Razer Kaira Wireless Gaming Headset',
    description="Enjoy cutting-edge audio performance that embraces the future of Xbox. Enter the Razer Kaira Pro for Xbox—a wireless Xbox Series X headset that supports mobile Xbox gaming. Fitted with our best drivers and headset mic, experience stellar sound and voice chat for unrivalled console and mobile gaming.",
    price=69.99,
    category='Accessory',
    platform='Xbox',
    creator='Razer',
    image_url="https://res.cloudinary.com/dixbzsdnm/image/upload/v1674856398/aa-capstone-gamebaux/Razer-Kaira-Wireless-Headset.jpg"
  )

  ]

  add_items=[db.session.add(item) for item in all_items]
  db.session.commit()



def undo_items():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.items RESTART IDENTITY CASCADE;")
    else:
        db.session.execute("DELETE FROM items")

    db.session.commit()
