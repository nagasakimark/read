// Decodable ditties. Blueprint "Decodable stories are generated against a validator, never by hand alone":
// every token must be decodable at `unit` or be a taught tricky word (checked by tools/validate.mjs).
// Questions: literal, picture-tap (question is read aloud; no reading of the question is required).
const Q = (q, a, ...d) => ({ q, type: 'literal', answer: a, distractors: d });
export const STORIES = [
  // ---------------- Unit 3
  { id:'s3a', unit:3, title:'The Cap', topic:'animals', focus:['o','c','d','g'], pages:[
      { text:'Tom got a cap.', pic:'🧒🧢' }, { text:'The cat sat in the cap.', pic:'🐱🧢' }, { text:'Tom pat the cat.', pic:'🧒🐱' } ],
    questions:[ Q('Who sat in the cap?', ['🐱','cat'], ['🐶','dog'], ['🐷','pig']) ] },
  { id:'s3b', unit:3, title:'Pig and Dog', topic:'animals', focus:['o','c','d','g'], pages:[
      { text:'A pig sat.', pic:'🐷' }, { text:'A dog sat.', pic:'🐶' }, { text:'Tom sat on a cot.', pic:'🧒🛏️' }, { text:'The dog got on the cot.', pic:'🐶🛏️' } ],
    questions:[ Q('What did the dog get on?', ['🛏️','cot'], ['🧢','cap'], ['🍲','pot']) ] },
  { id:'s3c', unit:3, title:'Sam Can Pat', topic:'animals', focus:['o','c','d','g'], pages:[
      { text:'Sam can pat a cat.', pic:'👦🐱' }, { text:'Sam can pat a dog.', pic:'👦🐶' }, { text:'Sam did not pat a pig.', pic:'👦🐷' } ],
    questions:[ Q('What did Sam not pat?', ['🐷','pig'], ['🐱','cat'], ['🐶','dog']) ] },
  // ---------------- Unit 8
  { id:'s8a', unit:8, title:'Beth and the Fish', topic:'animals', focus:['sh','ch','th'], pages:[
      { text:'Beth has a fish.', pic:'👧🐟' }, { text:'The fish is in a dish.', pic:'🐟🍽️' }, { text:'Beth got a wish.', pic:'👧🌠' } ],
    questions:[ Q('What is in the dish?', ['🐟','fish'], ['🐱','cat'], ['🐷','pig']) ] },
  { id:'s8b', unit:8, title:'Chuck the Chick', topic:'animals', focus:['sh','ch','th'], pages:[
      { text:'Chuck is a chick.', pic:'🐥' }, { text:'Chuck can hop.', pic:'🐥' }, { text:'Chuck can chat.', pic:'🐥💬' }, { text:'Chuck sat on a ship.', pic:'🐥🚢' } ],
    questions:[ Q('What did Chuck sit on?', ['🚢','ship'], ['🛏️','cot'], ['🧢','cap']) ] },
  { id:'s8c', unit:8, title:'At the Shop', topic:'places', focus:['sh','ch','th'], pages:[
      { text:'Beth was at the shop.', pic:'👧🏪' }, { text:'She got a shell.', pic:'👧🐚' }, { text:'She got a thick rug.', pic:'👧🧶' } ],
    questions:[ Q('Where was Beth?', ['🏪','shop'], ['🛏️','bed'], ['🛁','bath']) ] },
  // ---------------- Unit 9
  { id:'s9a', unit:9, title:'The King', topic:'people', focus:['ng','nk'], pages:[
      { text:'The king has a ring.', pic:'🤴💍' }, { text:'The king can sing.', pic:'🤴🎤' }, { text:'The king sang.', pic:'🤴🎶' } ],
    questions:[ Q('What has the king?', ['💍','ring'], ['🧢','cap'], ['🥤','cup']) ] },
  { id:'s9b', unit:9, title:'At the Bank', topic:'places', focus:['ng','nk'], pages:[
      { text:'Beth is at the bank.', pic:'👧🏦' }, { text:'She got cash.', pic:'👧💵' }, { text:'She can thank Josh.', pic:'👧🙏' } ],
    questions:[ Q('Where is Beth?', ['🏦','bank'], ['🏪','shop'], ['🛁','bath']) ] },
  { id:'s9c', unit:9, title:'Chuck in the Sink', topic:'animals', focus:['ng','nk'], pages:[
      { text:'Chuck sat in a sink.', pic:'🐥🚰' }, { text:'Chuck can sing.', pic:'🐥🎤' }, { text:'Chuck is a pink chick.', pic:'🐥🎀' } ],
    questions:[ Q('What did Chuck sit in?', ['🚰','sink'], ['🛏️','bed'], ['🍽️','dish']) ] },
  // ---------------- Unit 4
  { id:'s4a', unit:4, title:'The Red Hat', topic:'animals', focus:['k','e','u','r','h'], pages:[
      { text:'A hen got a red hat.', pic:'🐔🎩' }, { text:'The hen ran.', pic:'🐔' }, { text:'The hen ran to Ken.', pic:'🐔🧒' }, { text:'Ken got the hen.', pic:'🧒🐔' } ],
    questions:[ Q('What did the hen get?', ['🎩','hat'], ['🧢','cap'], ['🥤','cup']) ] },
  { id:'s4b', unit:4, title:'Go, Meg, Go!', topic:'sports', focus:['k','e','u','r','h'], pages:[
      { text:'Meg can run.', pic:'👧🏃' }, { text:'Ken can run.', pic:'🧒🏃' }, { text:'Go, Meg, go!', pic:'👧' }, { text:'Go, Ken, go!', pic:'🧒' } ],
    questions:[ Q('What can Meg do?', ['🏃','run'], ['😴','nap'], ['🤗','hug']) ] },
  { id:'s4c', unit:4, title:'Hot Sun', topic:'weather', focus:['k','e','u','r','h'], pages:[
      { text:'The sun got hot.', pic:'☀️🔥' }, { text:'Ken got a cup.', pic:'🧒🥤' }, { text:'Ken got up.', pic:'🧒⬆️' } ],
    questions:[ Q('What got hot?', ['☀️','sun'], ['🐔','hen'], ['🐀','rat']) ] },
  // ---------------- Unit 5
  { id:'s5a', unit:5, title:'The Big Bug', topic:'animals', focus:['b','f','l','ll','ck'], pages:[
      { text:'A big bug sat on a log.', pic:'🐛🪵' }, { text:'The big bug fell in the mud.', pic:'🐛🟤' }, { text:'Bob got the bug.', pic:'🧑🐛' }, { text:'Bob let the bug go.', pic:'🧑🐛' } ],
    questions:[ Q('Where did the bug fall?', ['🟤','mud'], ['🪵','log'], ['🛏️','bed']) ] },
  { id:'s5b', unit:5, title:'In the Bag', topic:'toys', focus:['b','f','l','ll','ck'], pages:[
      { text:'Ben got a bag.', pic:'🧒👜' }, { text:'In the bag is a duck.', pic:'👜🦆' }, { text:'In the bag is a doll.', pic:'👜🪆' }, { text:'In the bag is a sock.', pic:'👜🧦' } ],
    questions:[ Q('What is in the bag?', ['🦆','duck'], ['🐷','pig'], ['🚌','bus']) ] },
  { id:'s5c', unit:5, title:'Sick Bill', topic:'home', focus:['b','f','l','ll','ss','ck'], pages:[
      { text:'Bill is sick.', pic:'🤒' }, { text:'Bill is in bed.', pic:'🛏️' }, { text:'Meg got a cup.', pic:'👧🥤' }, { text:'Bill is not sad.', pic:'🙂' } ],
    questions:[ Q('Where is Bill?', ['🛏️','bed'], ['🚌','bus'], ['🪨','rock']) ] },
  // ---------------- Unit 6
  { id:'s6a', unit:6, title:'The Fox and the Box', topic:'animals', focus:['j','v','w','x','y','z','qu'], pages:[
      { text:'A fox sat in a box.', pic:'🦊📦' }, { text:'Jack got to the box.', pic:'🧑📦' }, { text:'The fox ran. Jack ran.', pic:'🦊🧑' }, { text:'Jack, you can not get the fox!', pic:'🦊' } ],
    questions:[ Q('Where did the fox sit?', ['📦','box'], ['👜','bag'], ['🛏️','bed']) ] },
  { id:'s6b', unit:6, title:'Zip the Bug', topic:'animals', focus:['j','v','w','x','y','z','zz','qu'], pages:[
      { text:'Zip is a bug.', pic:'🐛' }, { text:'Zip can zap!', pic:'⚡' }, { text:'Zip can buzz.', pic:'🐝' }, { text:'Zip can win!', pic:'🏆' } ],
    questions:[ Q('What is Zip?', ['🐛','bug'], ['🐱','cat'], ['🦊','fox']) ] },
  { id:'s6c', unit:6, title:'We Can Win', topic:'sports', focus:['j','v','w','x','y','z','qu'], pages:[
      { text:'Max sat in a van.', pic:'🚐' }, { text:'Jim sat in a van.', pic:'🚐' }, { text:'We can win!', pic:'🏆' }, { text:'Yes, yes, yes!', pic:'🎉' } ],
    questions:[ Q('What did they sit in?', ['🚐','van'], ['🚌','bus'], ['📦','box']) ] },
  // ---------------- Unit 7
  { id:'s7a', unit:7, title:'Pets', topic:'animals', focus:['sz'], pages:[
      { text:'Meg has hens.', pic:'👧🐔🐔' }, { text:'Ken has pigs.', pic:'🧒🐷🐷' }, { text:'Bob has dogs.', pic:'🧑🐶🐶' }, { text:'I like pets.', pic:'🐕' } ],
    questions:[ Q('Who has pigs?', ['🧒','Ken'], ['👧','Meg'], ['🧑','Bob']) ] },
  { id:'s7b', unit:7, title:'Bugs in the Mud', topic:'animals', focus:['sz'], pages:[
      { text:'Bugs sit in the mud.', pic:'🐛🟤' }, { text:'Bugs hop in the mud.', pic:'🐛🟤' }, { text:'Bugs dig in the mud.', pic:'🐛🟤' }, { text:'Do you like bugs?', pic:'🐛' } ],
    questions:[ Q('Where are the bugs?', ['🟤','mud'], ['🛏️','bed'], ['👜','bag']) ] },
  { id:'s7c', unit:7, title:'Jam', topic:'food', focus:[], pages:[
      { text:'Tim said, "Do you like jam?"', pic:'🧒🍓' }, { text:'Pam said, "Yes, I do!"', pic:'👩✅' }, { text:'Pam has jam.', pic:'👩🍓' }, { text:'Tim hugs Pam.', pic:'🧒🤗👩' } ],
    questions:[ Q('What does Pam like?', ['🍓','jam'], ['🥜','nut'], ['🥤','cup']) ] },
];

// Short decodable sentences used for dictation (word-bank tiles). Same validator rules as stories.
export const SENTENCES = [
  { unit:1, text:'Sam sat.', pic:'👦' },
  { unit:2, text:'Tim sat in it.', pic:'🧒' }, { unit:2, text:'Pam sat in it.', pic:'👩' },
  { unit:3, text:'Tom got a cap.', pic:'🧒🧢' }, { unit:3, text:'Sam can pat a dog.', pic:'👦🐶' },
  { unit:4, text:'Ken got a red hat.', pic:'🧒🎩' }, { unit:4, text:'A hen sat on a rug.', pic:'🐔' },
  { unit:5, text:'Bob got a big bag.', pic:'🧑👜' }, { unit:5, text:'Bill is sick.', pic:'🤒' },
  { unit:6, text:'Jack got a van.', pic:'🧑🚐' }, { unit:6, text:'We can win.', pic:'🏆' },
  { unit:7, text:'Meg has hens.', pic:'👧🐔' }, { unit:7, text:'Do you like jam?', pic:'🍓' },
  { unit:8, text:'Chuck is a chick.', pic:'🐥' }, { unit:8, text:'She got a fish.', pic:'👧🐟' }, { unit:8, text:'Beth has a ship.', pic:'👧🚢' },
  { unit:9, text:'The king sang.', pic:'🤴🎶' }, { unit:9, text:'I think she has a ring.', pic:'💍' }, { unit:9, text:'Thank you!', pic:'🙏' },
];
