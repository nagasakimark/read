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
];
