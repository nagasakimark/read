// Decodable ditties. Blueprint "Decodable stories are generated against a validator, never by hand alone":
// every token must be decodable at `unit` or be a taught tricky word (checked by tools/validate.mjs).
// Questions: literal, picture-tap (question is read aloud; no reading of the question is required).
const Q = (q, a, ...d) => ({ q, type: 'literal', answer: a, distractors: d });
export const STORIES = [
  // ---------------- Unit 1 (s a m t only: the very first book)
  { id:'s1a', unit:1, title:'Sam', topic:'family', focus:['s','a','m','t'], pages:[
      { text:'Sam.', pic:'👦' }, { text:'Sam sat.', pic:'👦🪑' }, { text:'Sam sat, sat, sat!', pic:'👦😆' } ],
    questions:[ Q('Who sat?', ['👦','boy'], ['🐱','cat'], ['🐶','dog']) ] },
  // ---------------- Unit 2
  { id:'s2a', unit:2, title:'Tim, Pam, Sam', topic:'family', focus:['i','n','p'], pages:[
      { text:'Tim sits.', pic:'🧒' }, { text:'Pam sits.', pic:'👧' }, { text:'Sam sits.', pic:'👦' }, { text:'Tim, Pam, Sam nap.', pic:'😴😴😴' } ],
    questions:[ Q('What do they do?', ['😴','nap'], ['🗺️','map'], ['🍳','pan']) ] },
  { id:'s2b', unit:2, title:'I Sip', topic:'food', focus:['i','n','p'], pages:[
      { text:'I sit.', pic:'🧒🪑' }, { text:'I sip.', pic:'🧒🥤' }, { text:'I sip, sip, sip!', pic:'🧒🥤😋' }, { text:'I nap.', pic:'🧒😴' } ],
    questions:[ Q('What do I do at the end?', ['😴','nap'], ['🗺️','map'], ['📌','pin']) ] },
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
  { id:'s8a', unit:8, title:'Josh and the Fish', topic:'animals', focus:['sh','ch'], pages:[
      { text:'Josh has a fish.', pic:'👦🐟' }, { text:'The fish is in a dish.', pic:'🐟🍽️' }, { text:'Josh got a wish.', pic:'👦🌠' } ],
    questions:[ Q('What is in the dish?', ['🐟','fish'], ['🐱','cat'], ['🐷','pig']) ] },
  { id:'s8b', unit:8, title:'Chuck the Chick', topic:'animals', focus:['sh','ch'], pages:[
      { text:'Chuck is a chick.', pic:'🐥' }, { text:'Chuck can hop.', pic:'🐥' }, { text:'Chuck can chat.', pic:'🐥💬' }, { text:'Chuck sat on a ship.', pic:'🐥🚢' } ],
    questions:[ Q('What did Chuck sit on?', ['🚢','ship'], ['🛏️','cot'], ['🧢','cap']) ] },
  { id:'s8c', unit:8, title:'At the Shop', topic:'places', focus:['sh','ch'], pages:[
      { text:'Josh is at the shop.', pic:'👦🏪' }, { text:'He got a shell.', pic:'👦🐚' }, { text:'He got a red rug.', pic:'👦🧶' } ],
    questions:[ Q('Where is Josh?', ['🏪','shop'], ['🛏️','bed'], ['🏦','bank']) ] },
  // ---------------- Unit 9
  { id:'s9a', unit:9, title:'Beth in the Bath', topic:'home', focus:['th','thv'], pages:[
      { text:'Beth is in the bath.', pic:'👧🛁' }, { text:'The bath is hot.', pic:'🛁♨️' }, { text:'Beth sat in the bath.', pic:'👧🛁' } ],
    questions:[ Q('Where is Beth?', ['🛁','bath'], ['🛏️','bed'], ['🏪','shop']) ] },
  { id:'s9b', unit:9, title:'This and That', topic:'school', focus:['th','thv'], pages:[
      { text:'This is a thin pen.', pic:'🖊️' }, { text:'That is a thick pen.', pic:'🖍️' }, { text:'Beth has this pen.', pic:'👧🖊️' }, { text:'Josh has that pen.', pic:'👦🖍️' } ],
    questions:[ Q('Who has the thin pen?', ['👧','Beth'], ['👦','Josh'], ['🐥','Chuck']) ] },
  { id:'s9c', unit:9, title:'The Moth', topic:'animals', focus:['th','thv'], pages:[
      { text:'A moth sat on the path.', pic:'🦋🛤️' }, { text:'Beth sat on the path.', pic:'👧🛤️' }, { text:'The moth is thin.', pic:'🦋' } ],
    questions:[ Q('What sat on the path?', ['🦋','moth'], ['🐱','cat'], ['🐷','pig']) ] },
  // ---------------- Unit 10
  { id:'s10a', unit:10, title:'The King', topic:'people', focus:['ng','nk'], pages:[
      { text:'The king has a ring.', pic:'🤴💍' }, { text:'The king can sing.', pic:'🤴🎤' }, { text:'The king sang.', pic:'🤴🎶' } ],
    questions:[ Q('What has the king?', ['💍','ring'], ['🧢','cap'], ['🥤','cup']) ] },
  { id:'s10b', unit:10, title:'At the Bank', topic:'places', focus:['ng','nk'], pages:[
      { text:'Beth is at the bank.', pic:'👧🏦' }, { text:'She got cash.', pic:'👧💵' }, { text:'She can thank Josh.', pic:'👧🙏' } ],
    questions:[ Q('Where is Beth?', ['🏦','bank'], ['🏪','shop'], ['🛁','bath']) ] },
  { id:'s10c', unit:10, title:'Chuck in the Sink', topic:'animals', focus:['ng','nk'], pages:[
      { text:'Chuck sat in a sink.', pic:'🐥🚰' }, { text:'Chuck can sing.', pic:'🐥🎤' }, { text:'Chuck is a pink chick.', pic:'🐥🎀' } ],
    questions:[ Q('What did Chuck sit in?', ['🚰','sink'], ['🛏️','bed'], ['🍽️','dish']) ] },
  // ---------------- Unit 11
  { id:'s11a', unit:11, title:'Camp Fun', topic:'places', focus:[], pats:['nd$','nt$','mp$'], pages:[
      { text:'Sam and Dan went to camp.', pic:'👦🧒🏕️' }, { text:'They set up a tent.', pic:'⛺' }, { text:'Dan got a lamp.', pic:'🧒💡' }, { text:'It is fun at camp.', pic:'🏕️' } ],
    questions:[ Q('What did they set up?', ['⛺','tent'], ['🛏️','bed'], ['🚌','bus']) ] },
  { id:'s11b', unit:11, title:'The Best Nest', topic:'animals', focus:[], pats:['st$','sk$','nd$'], pages:[
      { text:'A hen sat on a nest.', pic:'🐔🪺' }, { text:'She can rest.', pic:'😌' }, { text:'Ken is with the hen.', pic:'🧒🐔' }, { text:'The nest is the best.', pic:'🪺🏅' } ],
    questions:[ Q('What did the hen sit on?', ['🪺','nest'], ['📦','box'], ['🛏️','bed']) ] },
  { id:'s11c', unit:11, title:'Milk and Lunch', topic:'food', focus:[], pats:['lk$','nch$','st$','ft$'], pages:[
      { text:'Meg has a desk.', pic:'👧🪑' }, { text:'Meg has some milk.', pic:'👧🥛' }, { text:'Meg and Josh munch.', pic:'👧🧒🍱' }, { text:'It is the best lunch!', pic:'🍱🏅' } ],
    questions:[ Q('What has Meg?', ['🥛','milk'], ['🥤','cup'], ['🐔','hen']) ] },
  // ---------------- Unit 12
  { id:'s12a', unit:12, title:'Swim, Dan, Swim', topic:'sports', focus:[], pats:['^st','^sp','^sn','^sm','^sw','^sk'], pages:[
      { text:'Dan can swim.', pic:'🧒🏊' }, { text:'He swam fast.', pic:'🧒💨' }, { text:'Dan did not stop.', pic:'🧒🏊' }, { text:'Then Dan got a snack.', pic:'🧒🍪' } ],
    questions:[ Q('What can Dan do?', ['🏊','swim'], ['🏃','run'], ['😴','nap']) ] },
  { id:'s12b', unit:12, title:'Spin and Skip', topic:'sports', focus:[], pats:['^sp','^sk','^st'], pages:[
      { text:'Meg can spin.', pic:'👧🌀' }, { text:'Ken can skip.', pic:'🧒🪢' }, { text:'Meg can skip and spin.', pic:'👧🪢🌀' }, { text:'It is fun!', pic:'🎉' } ],
    questions:[ Q('What can Ken do?', ['🪢','skip'], ['🤸','jump'], ['🏊','swim']) ] },
  { id:'s12c', unit:12, title:'The Spill', topic:'home', focus:[], pats:['^sp','^st'], pages:[
      { text:'Spill, spill, spill!', pic:'🥛💦' }, { text:'There is milk on the step.', pic:'🥛👣' }, { text:'Tom can stop the spill.', pic:'🧒🛑' }, { text:'Tom got a mop.', pic:'🧒🧹' } ],
    questions:[ Q('What did Tom get?', ['🧹','mop'], ['🥛','milk'], ['🐷','pig']) ] },
  // ---------------- Unit 13
  { id:'s13a', unit:13, title:'The Black Cat', topic:'animals', focus:[], pats:['^bl','^cl','^fl','^gl','^pl','^sl'], pages:[
      { text:'A black cat sat on a block.', pic:'🐈‍⬛🧱' }, { text:'The cat was glad.', pic:'🐈‍⬛😊' }, { text:'It can flip and flop.', pic:'🐈‍⬛🤸' }, { text:'Then it can slip.', pic:'🐈‍⬛' } ],
    questions:[ Q('What sat on a block?', ['🐈‍⬛','cat'], ['🐶','dog'], ['🐷','pig']) ] },
  { id:'s13b', unit:13, title:'The Plan', topic:'food', focus:[], pats:['^pl','^gl','^bl'], pages:[
      { text:'Bob has a plan.', pic:'🧑💡' }, { text:'He got a plum.', pic:'🧑🍑' }, { text:'He got a glass of milk.', pic:'🧑🥛' }, { text:'Bob is glad.', pic:'🧑😊' } ],
    questions:[ Q('What did Bob get?', ['🍑','plum'], ['🐜','ant'], ['🛷','sled']) ] },
  { id:'s13c', unit:13, title:'The Slim Slug', topic:'animals', focus:[], pats:['^sl','^fl','^cl'], pages:[
      { text:'A slim slug sat on a flat rock.', pic:'🐌🪨' }, { text:'The slug can slip.', pic:'🐌' }, { text:'It can not clap.', pic:'🐌👏' }, { text:'It is a glad slug.', pic:'🐌😊' } ],
    questions:[ Q('Who sat on the rock?', ['🐌','slug'], ['🐀','rat'], ['🐔','hen']) ] },
  // ---------------- Unit 14
  { id:'s14a', unit:14, title:'The Frog and the Crab', topic:'animals', focus:[], pats:['^fr','^cr','^dr','^gr','^tr','^br'], pages:[
      { text:'A frog sat on a rock.', pic:'🐸🪨' }, { text:'A crab went to the frog.', pic:'🦀🐸' }, { text:'The frog and the crab swim.', pic:'🐸🦀🏊' }, { text:'It is fun!', pic:'🎉' } ],
    questions:[ Q('What sat on the rock?', ['🐸','frog'], ['🦀','crab'], ['🐔','hen']) ] },
  { id:'s14b', unit:14, title:'The Truck', topic:'places', focus:[], pats:['^tr','^dr','^br'], pages:[
      { text:'Tom has a red truck.', pic:'🧒🚚' }, { text:'The truck can bring a trunk.', pic:'🚚🧳' }, { text:'Tom can drop the trunk.', pic:'🧒🧳' }, { text:'Tom is glad.', pic:'🧒😊' } ],
    questions:[ Q('What has Tom?', ['🚚','truck'], ['🚌','bus'], ['🚐','van']) ] },
  { id:'s14c', unit:14, title:'Drip, Drip, Drum', topic:'home', focus:[], pats:['^dr','^gr','^fr'], pages:[
      { text:'Drip, drip, drip!', pic:'💧' }, { text:'Meg can drum.', pic:'👧🥁' }, { text:'Drum, drum, drum!', pic:'🥁' }, { text:'The drum is from Dan.', pic:'🥁🧒' } ],
    questions:[ Q('What can Meg do?', ['🥁','drum'], ['🏊','swim'], ['🏃','run']) ] },
  // ---------------- Unit 15
  { id:'s15a', unit:15, title:'The String', topic:'home', focus:[], pats:['^str','^spl','ing$'], pages:[
      { text:'Dan got a string.', pic:'🧒🧵' }, { text:'He can strum.', pic:'🧒🎸' }, { text:'Dan is singing.', pic:'🧒🎤' }, { text:'It is a thrill!', pic:'🎉' } ],
    questions:[ Q('What did Dan get?', ['🧵','string'], ['🧢','cap'], ['🥤','cup']) ] },
  { id:'s15b', unit:15, title:'Splash!', topic:'animals', focus:[], pats:['^spl','ing$'], pages:[
      { text:'Tom is jumping.', pic:'🧒🤸' }, { text:'Tom is kicking.', pic:'🧒⚽' }, { text:'Splash! Splash!', pic:'💦' }, { text:'Tom is wet.', pic:'🧒💦' } ],
    questions:[ Q('What is Tom doing?', ['🤸','jump'], ['😴','nap'], ['🏊','swim']) ] },
  { id:'s15c', unit:15, title:'Shrimp Lunch', topic:'food', focus:[], pats:['^shr','ing$'], pages:[
      { text:'Meg is fishing.', pic:'👧🎣' }, { text:'She got a shrimp.', pic:'👧🦐' }, { text:'The shrimp is in a dish.', pic:'🦐🍽️' }, { text:'It is a fresh lunch.', pic:'🍱' } ],
    questions:[ Q('What did Meg get?', ['🦐','shrimp'], ['🐜','ant'], ['🐸','frog']) ] },
  // ---------------- Unit 16
  { id:'s16a', unit:16, title:'Camping', topic:'places', focus:[], pats:['ed_t$','ed_id$','ed_d$'], pages:[
      { text:'Sam and Dan camped.', pic:'👦🧒🏕️' }, { text:'They jumped and splashed.', pic:'🤸💦' }, { text:'They rested in the tent.', pic:'⛺😌' }, { text:'The sunset was red.', pic:'🌇' } ],
    questions:[ Q('Where did they rest?', ['⛺','tent'], ['🛏️','bed'], ['🚌','bus']) ] },
  { id:'s16b', unit:16, title:'The Catfish', topic:'animals', focus:[], pats:['ed_t$','ed_d$'], pages:[
      { text:'Meg fished.', pic:'👧🎣' }, { text:'She got a catfish.', pic:'👧🐟' }, { text:'It kicked and splashed.', pic:'🐟💦' }, { text:'Meg yelled.', pic:'👧' }, { text:'She let the catfish go.', pic:'👧🐟' } ],
    questions:[ Q('What did Meg get?', ['🐟','catfish'], ['🐸','frog'], ['🦀','crab']) ] },
  { id:'s16c', unit:16, title:'The Backpack', topic:'school', focus:[], pats:['ed_d$','ed_id$'], pages:[
      { text:'Ken filled a backpack.', pic:'🧒🎒' }, { text:'He lifted it.', pic:'🎒⬆️' }, { text:'He handed it to Dan.', pic:'🧒🎒🧒' }, { text:'Dan was glad.', pic:'🧒😊' } ],
    questions:[ Q('What did Ken fill?', ['🎒','backpack'], ['🧢','cap'], ['🥤','cup']) ] },
  // ---------------- Stage 4
  { id:'s17a', unit:17, title:'The Green Tree', topic:'nature', focus:['ee','oo'], pages:[
      { text:'A bee sat in a green tree.', pic:'🐝🌳' }, { text:'The bee can see a seed.', pic:'🐝🌱' }, { text:'The seed fell in the pond.', pic:'🌱🏞️' }, { text:'Soon it is a tree.', pic:'🌳' } ],
    questions:[ Q('Where did the bee sit?', ['🌳','tree'], ['🛏️','bed'], ['🪵','log']) ] },
  { id:'s17b', unit:17, title:'The Zoo', topic:'animals', focus:['ee','oo'], pages:[
      { text:'Sam is at the zoo.', pic:'👦🦒' }, { text:'He can see a sheep.', pic:'👦🐑' }, { text:'The sheep can sleep.', pic:'🐑😴' }, { text:'The moon is up.', pic:'🌙' } ],
    questions:[ Q('Where is Sam?', ['🦒','zoo'], ['🛏️','bed'], ['🚌','bus']) ] },
  { id:'s17c', unit:17, title:'Cool Food', topic:'food', focus:['ee','oo'], pages:[
      { text:'Meg got some food.', pic:'👧🍱' }, { text:'She got a spoon.', pic:'👧🥄' }, { text:'The food was cool.', pic:'🍱😎' }, { text:'Meg and Tom feed the sheep.', pic:'👧🧒🐑' } ],
    questions:[ Q('What did Meg get?', ['🥄','spoon'], ['🥤','cup'], ['🍴','fork']) ] },
  { id:'s18a', unit:18, title:'The Train', topic:'places', focus:['ai','oa'], pages:[
      { text:'A train sat in the rain.', pic:'🚂🌧️' }, { text:'The train can not wait.', pic:'🚂' }, { text:'Sam and Meg run to the train.', pic:'👦👧🚂' }, { text:'They got on the train.', pic:'🚂😊' } ],
    questions:[ Q('What sat in the rain?', ['🚂','train'], ['🚌','bus'], ['🚐','van']) ] },
  { id:'s18b', unit:18, title:'The Goat on the Boat', topic:'animals', focus:['ai','oa'], pages:[
      { text:'A goat got on a boat.', pic:'🐐⛵' }, { text:'The boat can float.', pic:'⛵🌊' }, { text:'The goat has a coat.', pic:'🐐🧥' }, { text:'The goat is glad.', pic:'🐐😊' } ],
    questions:[ Q('What got on the boat?', ['🐐','goat'], ['🐔','hen'], ['🐷','pig']) ] },
  { id:'s18c', unit:18, title:'The Snail', topic:'animals', focus:['ai','oa'], pages:[
      { text:'A snail sat on the road.', pic:'🐌🛣️' }, { text:'The snail can not run.', pic:'🐌' }, { text:'Rain is on the snail.', pic:'🌧️🐌' }, { text:'The snail is glad.', pic:'🐌😊' } ],
    questions:[ Q('What sat on the road?', ['🐌','snail'], ['🐸','frog'], ['🐜','ant']) ] },
  { id:'s19a', unit:19, title:'Night Light', topic:'home', focus:['igh','ow_au','oi'], pages:[
      { text:'It is night.', pic:'🌃' }, { text:'Dan has a light.', pic:'🧒💡' }, { text:'The light is bright.', pic:'💡✨' }, { text:'Dan can see the moon.', pic:'🧒🌙' } ],
    questions:[ Q('What does Dan have?', ['💡','light'], ['🧢','cap'], ['🥤','cup']) ] },
  { id:'s19b', unit:19, title:'The Brown Cow', topic:'animals', focus:['igh','ow_au','oi'], pages:[
      { text:'A brown cow sat down.', pic:'🐄' }, { text:'The cow can not get up.', pic:'🐄' }, { text:'A clown ran to the cow.', pic:'🤡🐄' }, { text:'Now the cow is up!', pic:'🐄🎉' } ],
    questions:[ Q('What sat down?', ['🐄','cow'], ['🐔','hen'], ['🐷','pig']) ] },
  { id:'s19c', unit:19, title:'The Coin', topic:'home', focus:['igh','ow_au','oi'], pages:[
      { text:'Tom got a coin.', pic:'🧒🪙' }, { text:'It fell in the oil.', pic:'🪙🛢️' }, { text:'Tom can point at it.', pic:'🧒👉' }, { text:'Dan can get the coin.', pic:'🧒🪙' } ],
    questions:[ Q('What fell in the oil?', ['🪙','coin'], ['🥤','cup'], ['🧢','cap']) ] },
  { id:'s20a', unit:20, title:'The Park', topic:'places', focus:['oo_s','ar','or'], pages:[
      { text:'Sam and Dan go to the park.', pic:'👦🧒🏞️' }, { text:'It is dark.', pic:'🌑' }, { text:'They look at a star.', pic:'👀⭐' }, { text:'The star is far.', pic:'⭐' } ],
    questions:[ Q('Where did they go?', ['🏞️','park'], ['🛏️','bed'], ['🚌','bus']) ] },
  { id:'s20b', unit:20, title:'The Farm', topic:'places', focus:['oo_s','ar','or'], pages:[
      { text:'Meg is at the farm.', pic:'👧🚜' }, { text:'She took a look at the barn.', pic:'👧🏚️' }, { text:'The corn is good.', pic:'🌽' }, { text:'Meg has a good book.', pic:'👧📖' } ],
    questions:[ Q('Where is Meg?', ['🚜','farm'], ['🏖️','sand'], ['⛺','tent']) ] },
  { id:'s20c', unit:20, title:'The Storm', topic:'weather', focus:['oo_s','ar','or'], pages:[
      { text:'It is a storm.', pic:'⛈️' }, { text:'The rain is hard.', pic:'🌧️' }, { text:'Sam and Meg sort the corn.', pic:'👦👧🌽' }, { text:'It is a short storm.', pic:'⛈️' } ],
    questions:[ Q('What is hard?', ['🌧️','rain'], ['☀️','sun'], ['🌙','moon']) ] },
  { id:'s21a', unit:21, title:'The Letter', topic:'people', focus:['ur','er','air','ear'], pages:[
      { text:'Meg has a sister.', pic:'👧👧' }, { text:'Her sister has a letter.', pic:'👧✉️' }, { text:'The letter is from Dan.', pic:'✉️🧒' }, { text:'Her sister is glad.', pic:'👧😊' } ],
    questions:[ Q('What has her sister?', ['✉️','letter'], ['🧢','cap'], ['🥤','cup']) ] },
  { id:'s21b', unit:21, title:'The Chair', topic:'home', focus:['ur','er','air','ear'], pages:[
      { text:'A chair is in the yard.', pic:'🪑' }, { text:'Dan sat in the chair.', pic:'🧒🪑' }, { text:'Dan can hear a bee.', pic:'🧒🐝' }, { text:'The bee is near his ear.', pic:'🐝👂' } ],
    questions:[ Q('Where did Dan sit?', ['🪑','chair'], ['🛏️','bed'], ['🪵','log']) ] },
  { id:'s21c', unit:21, title:'The Hurt Cat', topic:'animals', focus:['ur','er','air','ear'], pages:[
      { text:'The cat has fur.', pic:'🐱' }, { text:'The cat got hurt.', pic:'🐱🤕' }, { text:'Meg can hug it.', pic:'👧🐱' }, { text:'The cat is better.', pic:'🐱😊' } ],
    questions:[ Q('What got hurt?', ['🐱','cat'], ['🐶','dog'], ['🐔','hen']) ] },
  { id:'s22a', unit:22, title:'The Happy Bunny', topic:'animals', focus:['y_i','y_ai'], pages:[
      { text:'The bunny is happy.', pic:'🐰😊' }, { text:'It is sunny.', pic:'☀️' }, { text:'The bunny can jump.', pic:'🐰🤸' }, { text:'The bunny is not shy.', pic:'🐰' } ],
    questions:[ Q('Who is happy?', ['🐰','bunny'], ['🐶','dog'], ['🐔','hen']) ] },
  { id:'s22b', unit:22, title:'The Sky', topic:'weather', focus:['y_i','y_ai'], pages:[
      { text:'Look at the sky.', pic:'👀🌌' }, { text:'A jet can fly in the sky.', pic:'✈️' }, { text:'It is not rainy.', pic:'☀️' }, { text:'The sky is red.', pic:'🌇' } ],
    questions:[ Q('What can fly?', ['✈️','jet'], ['🐌','snail'], ['🐷','pig']) ] },
  { id:'s22c', unit:22, title:'The Silly Puppy', topic:'animals', focus:['y_i','y_ai'], pages:[
      { text:'The puppy is silly.', pic:'🐶🤪' }, { text:'It can jump and run.', pic:'🐶🏃' }, { text:'It got muddy.', pic:'🐶🟤' }, { text:'Meg can try to dry it.', pic:'👧🐶' } ],
    questions:[ Q('Who is silly?', ['🐶','puppy'], ['🐱','cat'], ['🐔','hen']) ] },
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

  // ---------------- Stage 5
  { id:'s23a', unit:23, title:'The Cake', topic:'food', focus:['a_e'], pages:[
      { text:'Sam can bake a cake.', pic:'👦🍰' }, { text:'The cake is on a plate.', pic:'🍰🍽️' }, { text:'Meg and Sam like the cake.', pic:'👧👦🍰' }, { text:'It is a big cake.', pic:'🍰' } ],
    questions:[ Q('What can Sam bake?', ['🍰','cake'], ['🧢','cap'], ['🥤','cup']) ] },
  { id:'s23b', unit:23, title:'The Snake at the Lake', topic:'animals', focus:['a_e'], pages:[
      { text:'A snake is at the lake.', pic:'🐍🏞️' }, { text:'The snake sat in the shade.', pic:'🐍🌳' }, { text:'Tom ran to the gate.', pic:'🧒🚪' }, { text:'The snake is fine.', pic:'🐍😊' } ],
    questions:[ Q('Where is the snake?', ['🏞️','lake'], ['🏖️','sand'], ['🛏️','cot']) ] },
  { id:'s23c', unit:23, title:'Five Bikes', topic:'toys', focus:['i_e'], pages:[
      { text:'Dan has a bike.', pic:'🧒🚲' }, { text:'Meg has a bike too.', pic:'👧🚲' }, { text:'It is time to ride.', pic:'⏰🚲' }, { text:'Dan can ride a bike to the lake.', pic:'🚲🏞️' }, { text:'Five kids like to ride.', pic:'5️⃣🧒' } ],
    questions:[ Q('What can Dan ride?', ['🚲','bike'], ['🚌','bus'], ['🛏️','cot']) ] },
  { id:'s24a', unit:24, title:'A Home for Pete', topic:'home', focus:['o_e','e_e'], pages:[
      { text:'Pete has a home.', pic:'👦🏠' }, { text:'The home has a rope and a stone.', pic:'🏠🪢🪨' }, { text:'Pete woke up and hid a note.', pic:'👦📝' }, { text:'The note is in a cone.', pic:'📝🍦' } ],
    questions:[ Q('What did Pete hide?', ['📝','note'], ['🧢','cap'], ['🥤','cup']) ] },
  { id:'s24b', unit:24, title:'The Cute Mule', topic:'animals', focus:['u_e','u_e_oo'], pages:[
      { text:'The mule is cute.', pic:'🫏🥰' }, { text:'The mule has a tube.', pic:'🫏🧪' }, { text:'It can hum a tune.', pic:'🎵' }, { text:'The mule ran in the sun.', pic:'🫏☀️' } ],
    questions:[ Q('Who is cute?', ['🫏','mule'], ['🐷','pig'], ['🐔','hen']) ] },
  { id:'s24c', unit:24, title:'Joke Time', topic:'fun', focus:['o_e'], pages:[
      { text:'Tom can poke a hole in the cone.', pic:'🧒🍦' }, { text:'Meg got a joke.', pic:'👧😄' }, { text:'Those kids vote and like the joke.', pic:'🧒🧒🙋' }, { text:'These kids like the joke.', pic:'😄' } ],
    questions:[ Q('Who got a joke?', ['👧','Meg'], ['🧒','Tom'], ['🐶','dog']) ] },
  { id:'s25a', unit:25, title:'A Day to Play', topic:'fun', focus:['ay'], pages:[
      { text:'It is a good day.', pic:'☀️' }, { text:'Meg can play in the sun.', pic:'👧☀️' }, { text:'Dan can play too.', pic:'🧒⚽' }, { text:'The kids stay and play.', pic:'🧒🧒🎮' } ],
    questions:[ Q('What can Meg do?', ['🎮','play'], ['😴','nap'], ['🍽️','eat']) ] },
  { id:'s25b', unit:25, title:'Gray Clay', topic:'art', focus:['ay'], pages:[
      { text:'The clay is gray.', pic:'🏺🩶' }, { text:'Sam can make a tray.', pic:'👦🍽️' }, { text:'A ray of sun is on the tray.', pic:'☀️🍽️' }, { text:'It is a day to play.', pic:'🎮' } ],
    questions:[ Q('What is gray?', ['🏺','clay'], ['🍰','cake'], ['🐷','pig']) ] },
  { id:'s25c', unit:25, title:'Hay Day', topic:'farm', focus:['ay'], pages:[
      { text:'The hay is on the way.', pic:'🌾🚜' }, { text:'The pig can stay in the hay.', pic:'🐷🌾' }, { text:'The hen can play in the hay.', pic:'🐔🌾' }, { text:'We can stay and play.', pic:'👋🐷' } ],
    questions:[ Q('Who can stay in the hay?', ['🐷','pig'], ['🐶','dog'], ['🐱','cat']) ] },
  { id:'s26a', unit:26, title:'Eat a Peach', topic:'food', focus:['ea_i','e_open'], pages:[
      { text:'We eat a peach at the beach.', pic:'🍑🏖️' }, { text:'He can eat a bean.', pic:'👦🫘' }, { text:'She can eat meat.', pic:'👧🥩' }, { text:'We like to eat and sit.', pic:'🍽️' } ],
    questions:[ Q('What do we eat?', ['🍑','peach'], ['🧢','cap'], ['🥤','cup']) ] },
  { id:'s26b', unit:26, title:'The Sea', topic:'nature', focus:['ea_i'], pages:[
      { text:'I see the sea.', pic:'👀🌊' }, { text:'The seal can swim in the sea.', pic:'🦭🌊' }, { text:'The team can read by the sea.', pic:'📖🌊' }, { text:'It is a dream.', pic:'💭' } ],
    questions:[ Q('What can swim in the sea?', ['🦭','seal'], ['🐷','pig'], ['🐱','cat']) ] },
  { id:'s26c', unit:26, title:'The Key', topic:'home', focus:['ey','e_open'], pages:[
      { text:'Meg has a key.', pic:'👧🔑' }, { text:'The key can fit the gate.', pic:'🔑🚪' }, { text:'A donkey is in the valley.', pic:'🫏🏞️' }, { text:'The donkey can see the key.', pic:'🫏🔑' } ],
    questions:[ Q('What does Meg have?', ['🔑','key'], ['🧢','cap'], ['🥤','cup']) ] },
  { id:'s27a', unit:27, title:'Snow Day', topic:'weather', focus:['ow_ou','o_open'], pages:[
      { text:'The snow is cold.', pic:'⛄🥶' }, { text:'Meg can go out in the snow.', pic:'👧⛄' }, { text:'Tom can throw the snow.', pic:'🧒❄️' }, { text:'No, I can not go in the snow.', pic:'🚫' } ],
    questions:[ Q('What is cold?', ['⛄','snow'], ['☀️','sun'], ['🍰','cake']) ] },
  { id:'s27b', unit:27, title:'The Rainbow', topic:'weather', focus:['ow_ou','ie','i_open'], pages:[
      { text:'A rainbow is in the sky.', pic:'🌈' }, { text:'It is yellow and red.', pic:'💛❤️' }, { text:'The child can find a rainbow.', pic:'🧒🌈' }, { text:'The kind child said hi.', pic:'👋' } ],
    questions:[ Q('What is in the sky?', ['🌈','rainbow'], ['🐷','pig'], ['🐱','cat']) ] },
  { id:'s27c', unit:27, title:'A Pie for Joe', topic:'food', focus:['ie','oe'], pages:[
      { text:'Joe has a pie.', pic:'👦🥧' }, { text:'The pie is hot.', pic:'🥧🔥' }, { text:'Joe tried to eat the pie.', pic:'👦🥧' }, { text:'Joe cried. It is hot!', pic:'😢' } ],
    questions:[ Q('What did Joe have?', ['🥧','pie'], ['🍰','cake'], ['🥤','cup']) ] },
  { id:'s28a', unit:28, title:'The Blue Bird', topic:'animals', focus:['ue','ir'], pages:[
      { text:'A bird sat in a tree.', pic:'🐦🌳' }, { text:'The bird is blue.', pic:'🐦🟦' }, { text:'The girl can see the bird.', pic:'👧👀' }, { text:'The blue bird can fly.', pic:'🐦' } ],
    questions:[ Q('What is blue?', ['🐦','bird'], ['🐷','pig'], ['🐱','cat']) ] },
  { id:'s28b', unit:28, title:'New Shirt', topic:'clothes', focus:['ew','ir'], pages:[
      { text:'Dan has a new shirt.', pic:'🧒👕' }, { text:'It is blue.', pic:'🟦' }, { text:'Meg has a new skirt.', pic:'👧👗' }, { text:'We like the new shirt and skirt.', pic:'👕👗' } ],
    questions:[ Q('What is new?', ['👕','shirt'], ['🧢','cap'], ['🥤','cup']) ] },
  { id:'s28c', unit:28, title:'Word Work', topic:'school', focus:['wor','ew'], pages:[
      { text:'We work in the world.', pic:'🌍' }, { text:'A worm can work in the dirt.', pic:'🪱' }, { text:'The first word is new.', pic:'📝' }, { text:'The girl can read a word.', pic:'👧📖' } ],
    questions:[ Q('What can work in the dirt?', ['🪱','worm'], ['🐷','pig'], ['🐱','cat']) ] },
  { id:'s29a', unit:29, title:'The Mouse in the House', topic:'animals', focus:['ou'], pages:[
      { text:'A mouse is in the house.', pic:'🐭🏠' }, { text:'The mouse is loud.', pic:'🐭🔊' }, { text:'It can run out of the house.', pic:'🐭' }, { text:'The mouse sat on the ground.', pic:'🐭' } ],
    questions:[ Q('Where is the mouse?', ['🏠','house'], ['🏖️','sand'], ['🛏️','cot']) ] },
  { id:'s29b', unit:29, title:'The Toy Boy', topic:'toys', focus:['oy','aw'], pages:[
      { text:'The boy has a toy.', pic:'👦🧸' }, { text:'The boy can draw.', pic:'👦✏️' }, { text:'He saw a paw.', pic:'👀🐾' }, { text:'The boy has joy.', pic:'😄' } ],
    questions:[ Q('What does the boy have?', ['🧸','toy'], ['🧢','cap'], ['🥤','cup']) ] },
  { id:'s29c', unit:29, title:'Dawn on the Lawn', topic:'nature', focus:['aw','au'], pages:[
      { text:'It is dawn on the lawn.', pic:'🌅' }, { text:'A hawk can crawl.', pic:'🦅' }, { text:'Paul saw the hawk.', pic:'🧒🦅' }, { text:'Paul can yawn.', pic:'🥱' } ],
    questions:[ Q('Who saw the hawk?', ['🧒','Paul'], ['👧','Meg'], ['🐶','dog']) ] },
  { id:'s30a', unit:30, title:'Bread and Weather', topic:'food', focus:['ea_e'], pages:[
      { text:'We have bread on the plate.', pic:'🍞' }, { text:'The weather is cold.', pic:'🌦️' }, { text:'Dad is ready.', pic:'👨' }, { text:'The bread is not heavy.', pic:'🍞' } ],
    questions:[ Q('What is on the plate?', ['🍞','bread'], ['🧢','cap'], ['🥤','cup']) ] },
  { id:'s30b', unit:30, title:'The City', topic:'places', focus:['c_soft'], pages:[
      { text:'The city is big.', pic:'🏙️' }, { text:'A circus is in the city.', pic:'🎪' }, { text:'It is nice.', pic:'😊' }, { text:'We can dance at the circus.', pic:'💃🎪' } ],
    questions:[ Q('What is in the city?', ['🎪','circus'], ['🏖️','sand'], ['🛏️','cot']) ] },
  { id:'s30c', unit:30, title:'The Gem', topic:'treasure', focus:['g_soft','ch_k'], pages:[
      { text:'A gem is in the cage.', pic:'💎' }, { text:'The huge giraffe is at school.', pic:'🦒🏫' }, { text:'Chris can see the gem.', pic:'🧒💎' }, { text:'The chorus can sing at school.', pic:'🎶' } ],
    questions:[ Q('What is in the cage?', ['💎','gem'], ['🧢','cap'], ['🥤','cup']) ] },
  { id:'s31a', unit:31, title:'The Phone', topic:'tech', focus:['ph','wh'], pages:[
      { text:'Phil has a phone.', pic:'🧒📱' }, { text:'He can take a photo.', pic:'📷' }, { text:'When it is white, it is a whale.', pic:'🐋' }, { text:'The photo is fun.', pic:'📷' } ],
    questions:[ Q('What does Phil have?', ['📱','phone'], ['🧢','cap'], ['🥤','cup']) ] },
  { id:'s31b', unit:31, title:'Catch the Witch', topic:'fun', focus:['tch','dge'], pages:[
      { text:'A witch is on the bridge.', pic:'🧙🌉' }, { text:'We can catch the witch.', pic:'🥎' }, { text:'The judge has a badge.', pic:'👩‍⚖️🏅' }, { text:'The witch can not catch us.', pic:'🧙' } ],
    questions:[ Q('Where is the witch?', ['🌉','bridge'], ['🏖️','sand'], ['🛏️','cot']) ] },
  { id:'s31c', unit:31, title:'Write and Climb', topic:'school', focus:['kn','wr','mb'], pages:[
      { text:'I can write with my thumb.', pic:'✍️👍' }, { text:'The lamb has a hurt knee.', pic:'🐑🦵' }, { text:'We climb and we knock.', pic:'🧗🚪' }, { text:'I can give a wrap.', pic:'🎁' } ],
    questions:[ Q('What has a sore knee?', ['🐑','lamb'], ['🐷','pig'], ['🐱','cat']) ] },

  // ---------------- Stage 6
  { id:'s32a', unit:32, title:'The Picnic', topic:'food', pats:['sy:closed','sy:compound'], pages:[
      { text:'We go on a picnic.', pic:'🧺' }, { text:'Meg has a basket.', pic:'👧🧺' }, { text:'The basket has a napkin and a cupcake.', pic:'🧻🧁' }, { text:'A rabbit sat on the napkin.', pic:'🐰🧻' } ],
    questions:[ Q('What is in the basket?', ['🧁','cupcake'], ['🧢','cap'], ['🥤','cup']) ] },
  { id:'s32b', unit:32, title:'The Robot', topic:'toys', pats:['sy:open','sy:closed'], pages:[
      { text:'A robot is in the garden.', pic:'🤖🌳' }, { text:'The robot can open the mailbox.', pic:'🤖📮' }, { text:'It has a jacket and a pocket.', pic:'🧥' }, { text:'The farmer sat in the sunshine.', pic:'🧑‍🌾☀️' } ],
    questions:[ Q('Who is in the garden?', ['🤖','robot'], ['🐷','pig'], ['🐱','cat']) ] },
  { id:'s32c', unit:32, title:'The Snowman', topic:'weather', pats:['sy:compound','sy:closed'], pages:[
      { text:'Dan has a raincoat.', pic:'🧒🧥' }, { text:'He sat by a snowman in the morning.', pic:'⛄🌅' }, { text:'The snowman has a bucket and a mitten.', pic:'⛄🪣🧤' }, { text:'A goldfish sat on the bucket.', pic:'🐠🪣' } ],
    questions:[ Q('What does the snowman have?', ['🪣','bucket'], ['🧢','cap'], ['🥤','cup']) ] },
  { id:'s33a', unit:33, title:'The Purple Turtle', topic:'animals', focus:['le'], pages:[
      { text:'A turtle sat at the table.', pic:'🐢🍽️' }, { text:'The turtle is purple.', pic:'🐢🟣' }, { text:'It has a red apple.', pic:'🍎' }, { text:'The little turtle is not alone.', pic:'🐢' } ],
    questions:[ Q('What is purple?', ['🐢','turtle'], ['🐷','pig'], ['🐱','cat']) ] },
  { id:'s33b', unit:33, title:'Bubble Fun', topic:'fun', focus:['le','a_open'], pages:[
      { text:'The baby can see a bubble.', pic:'👶🫧' }, { text:'The bubble is big.', pic:'🫧' }, { text:'It can go up and up.', pic:'⬆️🫧' }, { text:'The baby is asleep.', pic:'😴' } ],
    questions:[ Q('Who can see a bubble?', ['👶','baby'], ['🐷','pig'], ['🐱','cat']) ] },
  { id:'s33c', unit:33, title:'The Zebra and the Panda', topic:'animals', focus:['schwa','a_open'], pages:[
      { text:'The zebra sat on a sofa.', pic:'🦓🛋️' }, { text:'The panda has a banana.', pic:'🐼🍌' }, { text:'The lady has a pizza.', pic:'👩🍕' }, { text:'They are about to eat.', pic:'🍽️' } ],
    questions:[ Q('What does the panda have?', ['🍌','banana'], ['🍕','pizza'], ['🥤','cup']) ] },
  { id:'s34a', unit:34, title:'The Fast Rabbit', topic:'animals', pats:['af:er','af:ly'], pages:[
      { text:'The rabbit is faster.', pic:'🐰' }, { text:'The turtle is slower.', pic:'🐢' }, { text:'The rabbit ran quickly.', pic:'🐰💨' }, { text:'The turtle can go slowly.', pic:'🐢' } ],
    questions:[ Q('Who is faster?', ['🐰','rabbit'], ['🐢','turtle'], ['🐷','pig']) ] },
  { id:'s34b', unit:34, title:'Helpful Dan', topic:'people', pats:['af:ful','af:es','af:est'], pages:[
      { text:'Dan is helpful.', pic:'🧒' }, { text:'He can fill the boxes.', pic:'📦' }, { text:'Meg has the dishes.', pic:'🍽️' }, { text:'Dan is the kindest.', pic:'💗' } ],
    questions:[ Q('Who is helpful?', ['🧒','Dan'], ['👧','Meg'], ['🐶','dog']) ] },
  { id:'s34c', unit:34, title:'The Tallest Tree', topic:'nature', pats:['af:er','af:est','af:less'], pages:[
      { text:'The tree is big.', pic:'🌳' }, { text:'This tree is taller.', pic:'🌲' }, { text:'This tree is the tallest.', pic:'🌲' }, { text:'It is not hopeless to climb it.', pic:'🧗' } ],
    questions:[ Q('Which tree is the tallest?', ['🌲','this tree'], ['🌳','the tree'], ['🌴','a palm']) ] },
  { id:'s35a', unit:35, title:'Unlock the Box', topic:'home', pats:['af:un'], pages:[
      { text:'Meg can unlock the box.', pic:'👧🔓' }, { text:'Dan can unpack the box.', pic:'🧒📦' }, { text:'A cat is in the box.', pic:'🐱📦' }, { text:'The cat is unhappy.', pic:'🐱😢' } ],
    questions:[ Q('Who is unhappy?', ['🐱','cat'], ['🐷','pig'], ['🐶','dog']) ] },
  { id:'s35b', unit:35, title:'Replay the Game', topic:'games', pats:['af:re'], pages:[
      { text:'Tom can replay the game.', pic:'🎮' }, { text:'He can rewrite the note.', pic:'📝' }, { text:'He can restart the game.', pic:'🔄' }, { text:'Tom can reread it.', pic:'📖' } ],
    questions:[ Q('What can Tom replay?', ['🎮','game'], ['🧢','cap'], ['🥤','cup']) ] },
  { id:'s35c', unit:35, title:'The Cupcake', topic:'food', pats:['af:dis','af:un'], pages:[
      { text:'I dislike the rain.', pic:'🌧️' }, { text:'Dan can unwrap the cupcake.', pic:'🧁' }, { text:'I like the cupcake.', pic:'😋' }, { text:'I can not distrust the cupcake.', pic:'🧁' } ],
    questions:[ Q('What can Dan unwrap?', ['🧁','cupcake'], ['🧢','cap'], ['🥤','cup']) ] },
  { id:'s36a', unit:36, title:'Run, Hop, Dig', topic:'fun', pats:['af:double'], pages:[
      { text:'Dan is running.', pic:'🏃' }, { text:'Meg is hopping.', pic:'🐇' }, { text:'The dog is digging.', pic:'🐶' }, { text:'The kids are clapping.', pic:'👏' } ],
    questions:[ Q('Who is digging?', ['🐶','dog'], ['🐱','cat'], ['🐷','pig']) ] },
  { id:'s36b', unit:36, title:'Baking a Cake', topic:'food', pats:['af:drop-e'], pages:[
      { text:'Meg is baking a cake.', pic:'👧🍰' }, { text:'Dan is taking the cake.', pic:'🧒🍰' }, { text:'They are smiling and waving.', pic:'😊👋' }, { text:'They are riding to the lake.', pic:'🚴🏞️' } ],
    questions:[ Q('What is Meg baking?', ['🍰','cake'], ['🧢','cap'], ['🥤','cup']) ] },
  { id:'s36c', unit:36, title:'Happier', topic:'people', pats:['af:y-i'], pages:[
      { text:'Dan is happy.', pic:'🧒' }, { text:'Meg is happier.', pic:'👧' }, { text:'Tom is the happiest.', pic:'🧒😄' }, { text:'The puppies are funnier.', pic:'🐶' } ],
    questions:[ Q('Who is the happiest?', ['🧒','Tom'], ['👧','Meg'], ['🐶','dog']) ] },
  { id:'s37a', unit:37, title:'At the Station', topic:'places', focus:['tion','ture'], pages:[
      { text:'We are at the station.', pic:'🚉' }, { text:'It is a big station.', pic:'🚉' }, { text:'We can see a picture.', pic:'🖼️' }, { text:'It is a picture of a train.', pic:'🚂' } ],
    questions:[ Q('Where are we?', ['🚉','station'], ['🏖️','sand'], ['🛏️','cot']) ] },
  { id:'s37b', unit:37, title:'Nature', topic:'nature', focus:['ture'], pages:[
      { text:'Look at nature.', pic:'🌿' }, { text:'A creature is in the park.', pic:'🦎' }, { text:'The creature is red.', pic:'🦎' }, { text:'We take a picture.', pic:'📷' } ],
    questions:[ Q('What is in the park?', ['🦎','creature'], ['🐷','pig'], ['🐱','cat']) ] },
  { id:'s37c', unit:37, title:'Vacation', topic:'travel', focus:['tion','sion'], pages:[
      { text:'We go on vacation.', pic:'🏖️' }, { text:'We see a nation.', pic:'🏳️' }, { text:'We can see television.', pic:'📺' }, { text:'We take a picture of the vision.', pic:'📷' } ],
    questions:[ Q('Where do we go?', ['🏖️','vacation'], ['🏫','school'], ['🛏️','cot']) ] },

  // ---------------- Stage 7: fluency bridge (longer, unpractised passages)
  { id:'s38e', unit:38, title:'The Little Kitten', topic:'animals', pages:[
      { text:'One day, Meg found a little kitten in the garden.', pic:'👧🐱🌷' },
      { text:'The kitten was wet and cold. It was sad.', pic:'🐱💧' },
      { text:'Meg gave the kitten some milk and a little bed.', pic:'🐱🥛🛏️' },
      { text:'Then Meg and her dad made a picture of the kitten.', pic:'👧👨🖍️' },
      { text:'They stuck the picture on a tree by the gate.', pic:'🌳📄' },
      { text:'Then a boy came to the garden gate.', pic:'👦🚪' },
      { text:'"That is my kitten!" he said. "Her name is Max."', pic:'👦🐱' },
      { text:'The kitten was happy to go home. The boy came back to play with Meg.', pic:'👧👦🐱😄' } ],
    questions:[ Q('Where did Meg find the kitten?', ['🌷','garden'], ['🏫','school'], ['🏪','shop']), Q('What did Meg give the kitten?', ['🥛','milk'], ['🍰','cake'], ['🐟','fish']) ] },
  { id:'s38f', unit:38, title:'The Rocket Game', topic:'play', pages:[
      { text:'Max and his sister Meg made a rocket from a big box.', pic:'👦👧📦🚀' },
      { text:'They made it red, with a star on the top.', pic:'🚀⭐' },
      { text:'"Ready, set, go!" said Max.', pic:'🚀🔥' },
      { text:'In the game, the rocket went up to the moon.', pic:'🚀🌙' },
      { text:'They landed on the moon. It was pink and fun!', pic:'🌙🩷' },
      { text:'A little green man with six legs said hi.', pic:'👽👋' },
      { text:'Then Dad said, "Dinner time, rocket kids!"', pic:'👨🍝' },
      { text:'Max and Meg ran home fast. Dinner is the best part of the game!', pic:'🚀🏠🍝' } ],
    questions:[ Q('What did they make the rocket from?', ['📦','box'], ['🥫','can'], ['🧺','basket']), Q('Where did the rocket go?', ['🌙','moon'], ['🏫','school'], ['🏪','shop']) ] },
  { id:'s38a', unit:38, title:'The Jungle', topic:'nature', pages:[
      { text:'A tiger is in the jungle.', pic:'🐯🌴' }, { text:'The jungle has a big tree and a purple flower.', pic:'🌳🌸' }, { text:'A turtle sat by the lake in the sunshine.', pic:'🐢🏞️' }, { text:'The little bird is asleep in the tree.', pic:'🐦😴' }, { text:'It is a nice day in the jungle.', pic:'☀️' }, { text:'We can see nature at the lake.', pic:'🌿' } ],
    questions:[ Q('Who is in the jungle?', ['🐯','tiger'], ['🐷','pig'], ['🐱','cat']), Q('Who is asleep?', ['🐦','bird'], ['🐢','turtle'], ['🐯','tiger']) ] },
  { id:'s38b', unit:38, title:'A Day at School', topic:'school', pages:[
      { text:'Meg is happy to go to school in the morning.', pic:'👧🏫' }, { text:'She has a new pencil and a little book.', pic:'✏️📓' }, { text:'The teacher is helpful and kind.', pic:'👩‍🏫' }, { text:'We read a book about a robot.', pic:'📖🤖' }, { text:'Then we play in the garden.', pic:'🎮🌳' }, { text:'It is the best day.', pic:'😄' } ],
    questions:[ Q('Who is happy?', ['👧','Meg'], ['🧒','Tom'], ['🐶','dog']), Q('What did we read about?', ['🤖','robot'], ['🐷','pig'], ['🐱','cat']) ] },
  { id:'s38c', unit:38, title:'The Weather', topic:'weather', pages:[
      { text:'The weather is cold.', pic:'🌦️🥶' }, { text:'A cloud is in the sky.', pic:'☁️' }, { text:'Snow can sit on the ground.', pic:'⛄' }, { text:'Dan has a raincoat and a jacket.', pic:'🧒🧥' }, { text:'He is running in the snow.', pic:'🏃⛄' }, { text:'Then the sun is out and it is hot.', pic:'☀️' } ],
    questions:[ Q('What is cold?', ['🌦️','weather'], ['🍰','cake'], ['🐷','pig']), Q('What can sit on the ground?', ['⛄','snow'], ['☀️','sun'], ['🍰','cake']) ] },
  { id:'s38d', unit:38, title:'The Space Trip', topic:'space', pages:[
      { text:'A rocket is on the ground.', pic:'🚀' }, { text:'The robot and the girl get in.', pic:'🤖👧' }, { text:'The rocket can fly fast.', pic:'🚀💨' }, { text:'They see the star and the moon.', pic:'⭐🌙' }, { text:'They take a picture of the world.', pic:'📷🌍' }, { text:'They are happy to be home.', pic:'🏠😊' } ],
    questions:[ Q('What is on the ground?', ['🚀','rocket'], ['🚌','bus'], ['🛏️','cot']), Q('What do they take?', ['📷','picture'], ['🍰','cake'], ['🥤','cup']) ] },
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
  { unit:8, text:'Chuck is a chick.', pic:'🐥' }, { unit:8, text:'She got a fish.', pic:'👧🐟' }, { unit:8, text:'Josh has a ship.', pic:'👦🚢' },
  { unit:9, text:'Beth has this pen.', pic:'👧🖊️' }, { unit:9, text:'That is a thin rug.', pic:'🧶' },
  { unit:10, text:'The king sang.', pic:'🤴🎶' }, { unit:10, text:'I think she has a ring.', pic:'💍' }, { unit:10, text:'Thank you!', pic:'🙏' },
  { unit:11, text:'Sam went to camp.', pic:'🏕️' }, { unit:11, text:'Dan got a gift.', pic:'🎁' }, { unit:11, text:'Come and jump on the sand.', pic:'🏖️' },
  { unit:12, text:'Dan can swim fast.', pic:'🏊' }, { unit:12, text:'Meg can skip and spin.', pic:'🪢' }, { unit:12, text:'There is a snack in the bag.', pic:'🍪' },
  { unit:13, text:'The clock is black.', pic:'🕐' }, { unit:13, text:'Bob can clap and flip.', pic:'👏' }, { unit:13, text:'Here is a glass of milk.', pic:'🥛' },
  { unit:14, text:'The frog can jump.', pic:'🐸' }, { unit:14, text:'Bring a brush.', pic:'🖌️' }, { unit:14, text:'Tom has a little truck.', pic:'🚚' }, { unit:14, text:'The crab is out.', pic:'🦀' },
  { unit:15, text:'Dan is jumping.', pic:'🤸' }, { unit:15, text:'Tom is camping.', pic:'🏕️' }, { unit:15, text:'Your hat is red.', pic:'🎩' }, { unit:15, text:'Were you at the pond?', pic:'🏞️' },
  { unit:16, text:'Sam jumped on the sand.', pic:'🏖️' }, { unit:16, text:'Meg filled a cup.', pic:'🥛' }, { unit:16, text:'The sunset was red.', pic:'🌇' }, { unit:16, text:'Dan kicked the backpack.', pic:'🎒' },
  { unit:17, text:'The sheep can sleep.', pic:'🐑' }, { unit:17, text:'I can see the moon.', pic:'🌙' }, { unit:17, text:'Meet me at the zoo.', pic:'🦒' },
  { unit:18, text:'Meg can paint a boat.', pic:'🎨' }, { unit:18, text:'The train is in the rain.', pic:'🚂' }, { unit:18, text:'Sam got a coat and a hat.', pic:'🧥' },
  { unit:19, text:'The owl sat in the town.', pic:'🦉' }, { unit:19, text:'Now the light is bright.', pic:'💡' }, { unit:19, text:'The cow is brown.', pic:'🐄' },
  { unit:20, text:'Look at the star.', pic:'⭐' }, { unit:20, text:'Sam took a good book.', pic:'📖' }, { unit:20, text:'The shark is in the dark.', pic:'🦈' },
  { unit:21, text:'Her sister is under the chair.', pic:'🪑' }, { unit:21, text:'Dan has a letter.', pic:'✉️' }, { unit:21, text:'The dinner is hot.', pic:'🍽️' },
  { unit:22, text:'The puppy is happy.', pic:'🐶' }, { unit:22, text:'My sister is shy.', pic:'👧' }, { unit:22, text:'The sky is not dry.', pic:'🌌' },

  { unit:23, text:'Sam can bake a cake.', pic:'🍰' }, { unit:23, text:'Dan can ride a bike.', pic:'🚲' }, { unit:23, text:'The snake is at the lake.', pic:'🐍' },
  { unit:24, text:'Pete has a rope.', pic:'🪢' }, { unit:24, text:'The mule is cute.', pic:'🫏' }, { unit:24, text:'I can hum a tune.', pic:'🎵' },
  { unit:25, text:'We can play all day.', pic:'🎮' }, { unit:25, text:'The clay is gray.', pic:'🏺' }, { unit:25, text:'The pig can stay.', pic:'🐷' },
  { unit:26, text:'We eat a peach.', pic:'🍑' }, { unit:26, text:'I see the sea.', pic:'🌊' }, { unit:26, text:'She has a key.', pic:'🔑' },
  { unit:27, text:'The snow is cold.', pic:'⛄' }, { unit:27, text:'Joe has a pie.', pic:'🥧' }, { unit:27, text:'The child is kind.', pic:'🧒' },
  { unit:28, text:'The bird is blue.', pic:'🐦' }, { unit:28, text:'Dan has a new shirt.', pic:'👕' }, { unit:28, text:'The worm is in the dirt.', pic:'🪱' },
  { unit:29, text:'The mouse is in the house.', pic:'🐭' }, { unit:29, text:'The boy has a toy.', pic:'🧸' }, { unit:29, text:'Paul saw a hawk.', pic:'🦅' },
  { unit:30, text:'The city is nice.', pic:'🏙️' }, { unit:30, text:'We have bread.', pic:'🍞' }, { unit:30, text:'The giraffe is at school.', pic:'🦒' },
  { unit:31, text:'Phil has a phone.', pic:'📱' }, { unit:31, text:'The witch is on the bridge.', pic:'🧙' }, { unit:31, text:'I can climb and write.', pic:'🧗' },

  { unit:32, text:'Meg has a basket.', pic:'🧺' }, { unit:32, text:'A robot is in the garden.', pic:'🤖' }, { unit:32, text:'The rabbit sat in the sunshine.', pic:'🐰' },
  { unit:33, text:'The turtle is purple.', pic:'🐢' }, { unit:33, text:'The baby has a bubble.', pic:'🫧' }, { text:'The panda has a banana.', unit:33, pic:'🐼' },
  { unit:34, text:'The rabbit is faster.', pic:'🐰' }, { unit:34, text:'Dan is helpful.', pic:'🧒' }, { unit:34, text:'This tree is the tallest.', pic:'🌲' },
  { unit:35, text:'Meg can unlock the box.', pic:'🔓' }, { unit:35, text:'Tom can replay the game.', pic:'🎮' }, { unit:35, text:'I dislike the rain.', pic:'🌧️' },
  { unit:36, text:'Dan is running.', pic:'🏃' }, { unit:36, text:'Meg is baking a cake.', pic:'🍰' }, { unit:36, text:'Tom is the happiest.', pic:'😄' },
  { unit:37, text:'We are at the station.', pic:'🚉' }, { unit:37, text:'We take a picture.', pic:'📷' }, { unit:37, text:'The creature is in the park.', pic:'🦎' },

  { unit:38, text:'The tiger is in the jungle.', pic:'🐯' }, { unit:38, text:'The teacher is helpful and kind.', pic:'👩‍🏫' }, { unit:38, text:'We take a picture of the world.', pic:'📷' },
];
