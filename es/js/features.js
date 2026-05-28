// Feature toggle
document.querySelectorAll('.feature-btn').forEach(btn=>{
btn.addEventListener('click',()=>{
document.querySelectorAll('.feature-btn').forEach(b=>b.classList.remove('active'));
btn.classList.add('active');
const f=btn.dataset.feature;
const gs=document.getElementById('generatorSection');
const ps=document.getElementById('photoSection');
if(gs)gs.style.display=f==='generator'?'':'none';
if(ps)ps.style.display=f==='photo'?'':'none';
});
});

function compareNames(){
const favs=getFavs();
if(!favs.length){alert('No names selected. Click the heart icon on any name to add it to your list!');return}
localStorage.setItem('pupCompare',JSON.stringify(favs));
window.location.href='comparison-page.html';
}

// Popular names - 3-level hierarchy: Gender(tab) → Breed(pill) → Trait(pill)
// 5 Breeds × 2 Genders × 6 Traits = 60 categories
// Each category contains 100 unique names

// Name data structure:
// POP_NAMES[gender][breed][trait] = [[name1, meaning1], [name2, meaning2], ...]
const POP_NAMES={
male:{
golden_retriever:{
playful:[
["Rascal","playful troublemaker"],["Buster","fun-loving buddy"],["Scooter","zippy and quick"],["Jax","playful spirit"],["Ziggy","zesty and energetic"],
["Rocco","playful rascal"],["Pip","peppy little guy"],["Hopper","full of hops"],["Jester","funny jokester"],["Gizmo","quirky and playful"],
["Rip","playful rascal"],["Dex","zippy energetic"],["Wally","playful walrus"],["Maxie","maxed-out fun"],["Nugget","playful nugget"],
["Mischief","playful trouble"],["Buddy","best play friend"],["Toby","playful companion"],["Finn","fair and playful"],["Doodle","fun and goofy"],
["Zeke","playful spirit"],["Rookie","new playmate"],["Taz","tazmanian playful"],["Niko","playful joy"],["Bounce","bouncy energy"],
["Moe","playful pal"],["Chewie","chew-loving player"],["Dusty","playful dustball"],["Kiko","playful kiki"],["Rube","playful rube"],
["Spud","spunky playmate"],["Turbo","turbo-charged play"],["Wiz","witty player"],["Zane","playful zane"],["Jumpy","jump-happy"],
["Loco","locomotive play"],["Pogo","pogo stick play"],["Riff","playful riff"],["Slink","slinky player"],["Tumble","tumbling play"],
["Bink","playful bink"],["Cletus","playful cletus"],["Dax","playful dax"],["Flick","playful flick"],["Gabe","playful gabe"],
["Hoppy","happy hopper"],["Jig","jig-dancing play"],["Kix","kickin' player"],["Mutt","mixed-up playmate"],["Puck","playful puck"]
],
energetic:[
["Ace","top energy"],["Blaze","fiery spirit"],["Dash","super fast"],["Flash","lightning fast"],["Storm","stormy energy"],
["Titan","titanic energy"],["Rio","river of energy"],["Kai","ocean energy"],["Jet","jet speed"],["Thor","thunder energy"],
["Trek","trekking energy"],["Rush","rushing energy"],["Koda","forest energy"],["Brisk","brisk pace"],["Chase","chasing energy"],
["Colt","colt energy"],["Duke","duke energy"],["Gunner","gunner energy"],["Jett","jet energy"],["Bolt","bolt speed"],
["Sprint","sprint energy"],["Vigor","vital energy"],["Rocky","rock solid energy"],["Tyson","tough energy"],["Ranger","ranger energy"],
["Arrow","arrow speed"],["Bravo","bravo energy"],["Cyclone","cyclone energy"],["Dynamo","dynamo power"],["Fury","fury energy"],
["Hawk","hawk speed"],["Hurricane","hurricane energy"],["Maverick","maverick energy"],["Nitro","nitro boost"],["Phoenix","phoenix energy"],
["Rebel","rebel energy"],["Rocket","rocket speed"],["Spark","spark energy"],["Surge","surge energy"],["Thunder","thunder energy"],
["Vortex","vortex energy"],["Wild","wild energy"],["Zest","zesty energy"],["Bandit","bandit energy"],["Boomer","boomer energy"],
["Charger","charger energy"],["Comet","comet speed"],["Fire","fire energy"],["Gallop","galloping energy"],["Hurricane","hurricane energy"]
],
cuddly:[
["Bear","big cuddly bear"],["Teddy","teddy bear cuddle"],["Milo","sweet cuddle bug"],["Ollie","cuddly ollie"],["Charlie","charming cuddle"],
["Sammy","sweet cuddles"],["Benny","benny cuddles"],["Cubby","cubby cuddle"],["Muffin","sweet muffin"],["Pebble","pebble cuddle"],
["Sunny","sunny cuddles"],["Lucky","lucky cuddle"],["Leo","lion cuddle"],["Coby","coby cuddles"],["Archie","archie cuddle"],
["Cooper","cooper cuddles"],["Gus","gus cuddles"],["Louie","louie cuddles"],["Theo","theo cuddles"],["Woody","woody cuddles"],
["Bean","bean cuddle"],["Biscuit","biscuit cuddle"],["Bonbon","sweet bonbon"],["Bubba","bubba cuddles"],["Clover","clover cuddle"],
["Dino","dino cuddles"],["Dotty","dotty cuddles"],["Fluff","fluffy cuddle"],["Fudge","fudge sweet"],["Honey","honey sweet"],
["Jaxie","jaxie cuddles"],["Juno","juno cuddles"],["Kitten","kitten cuddle"],["Marshmallow","marshmallow"],["Mochi","sweet mochi"],
["Nibs","nibs sweet"],["Nutty","nutty sweet"],["Peanut","peanut sweet"],["Puff","puffy cuddle"],["Roo","roo cuddle"],
["Snoopy","snoopy cuddles"],["Sprout","sprout cuddle"],["Sugar","sugar sweet"],["Tiny","tiny cuddle"],["Winnie","winnie cuddles"],
["Yogi","yogi cuddles"],["Zippy","zippy cuddles"],["Babe","babe cuddles"],["Cuddle","cuddle bug"],["Dimple","dimple cuddle"]
],
adventurous:[
["Atlas","world explorer"],["Hunter","hunter of adventure"],["Legend","legendary explorer"],["Scout","scout explorer"],["Rover","roving adventurer"],
["Orion","star explorer"],["Pioneer","pioneer explorer"],["Seeker","seeker of fun"],["Travis","trekking traveler"],["Voyage","voyage traveler"],
["Walker","walking adventurer"],["Wilder","wild explorer"],["Wyatt","wyatt wanderer"],["Axel","ax-wielding explorer"],["Baron","baron explorer"],
["Explorer","explorer name"],["Nomad","nomadic wanderer"],["Ranger","ranger explorer"],["Trekker","trekking explorer"],["Advent","advent adventurer"],
["Argus","argus explorer"],["Boone","boone explorer"],["Captain","captain explorer"],["Cobalt","cobalt explorer"],["Convoy","convoy explorer"],
["Cross","cross explorer"],["Drake","drake explorer"],["Everest","everest explorer"],["Frontier","frontier explorer"],["Galleon","galleon explorer"],
["Hiker","hiker explorer"],["Journey","journey traveler"],["Kepler","kepler explorer"],["Mariner","mariner explorer"],["Navigator","navigator explorer"],
["Outlaw","outlaw explorer"],["Pathfinder","pathfinder explorer"],["Pilot","pilot explorer"],["Quest","quest explorer"],["Rambler","rambling explorer"],
["Sailor","sailor explorer"],["Trapper","trapper explorer"],["Wander","wandering soul"],["Wayfarer","wayfarer explorer"],["West","western explorer"],
["Woodsman","woodsman explorer"],["Yonder","yonder explorer"],["Zephyr","zephyr wind"],["Ranger","ranger explorer"]
],
shy:[
["Asher","gentle asher"],["Beau","gentle beau"],["Eli","gentle eli"],["Graham","gentle graham"],["Hugo","gentle hugo"],
["Kian","gentle kian"],["Landon","gentle landon"],["Miles","gentle miles"],["Noah","gentle noah"],["Owen","gentle owen"],
["Silas","gentle silas"],["Caspian","gentle caspian"],["Felix","gentle felix"],["Jasper","gentle jasper"],["Aaron","gentle aaron"],
["Amos","gentle amos"],["Arthur","gentle arthur"],["Bram","gentle bram"],["Calvin","gentle calvin"],["Cedric","gentle cedric"],
["Clark","gentle clark"],["Cole","gentle cole"],["Conrad","gentle conrad"],["Cort","gentle cort"],["Dean","gentle dean"],
["Denton","gentle denton"],["Duncan","gentle duncan"],["Edward","gentle edward"],["Ellis","gentle ellis"],["Emerson","gentle emerson"],
["Ervin","gentle ervin"],["Ford","gentle ford"],["Francis","gentle francis"],["Glenn","gentle glenn"],["Grant","gentle grant"],
["Heath","gentle heath"],["Ian","gentle ian"],["Isaac","gentle isaac"],["Joel","gentle joel"],["Jude","gentle jude"],
["Kent","gentle kent"],["Leonard","gentle leonard"],["Lewis","gentle lewis"],["Martin","gentle martin"],["Nathan","gentle nathan"],
["Paul","gentle paul"],["Philip","gentle philip"],["Ralph","gentle ralph"],["Reed","gentle reed"],["Roy","gentle roy"]
],
affectionate:[
["Amigo","best friend"],["Angus","loving angus"],["Ethan","strong and loving"],["Frankie","friendly frankie"],["Henry","loving henry"],
["Jake","loving jake"],["Jackson","loving jackson"],["Murphy","loving murphy"],["Oliver","loving oliver"],["Riley","loving riley"],
["Will","loving will"],["Harley","loving harley"],["Max","loving max"],["Sam","loving sam"],["Luke","loving luke"],
["Finn","loving finn"],["Grey","loving grey"],["Jaxson","loving jaxson"],["Lincoln","loving lincoln"],["Miles","loving miles"],
["Parker","loving parker"],["Reese","loving reese"],["Russell","loving russell"],["Seth","loving seth"],["Simon","loving simon"],
["Tate","loving tate"],["Taylor","loving taylor"],["Wes","loving wes"],["Wyatt","loving wyatt"],["Adam","loving adam"],
["Alex","loving alex"],["Andrew","loving andrew"],["Ben","loving ben"],["Blake","loving blake"],["Brent","loving brent"],
["Brian","loving brian"],["Cameron","loving cameron"],["Carter","loving carter"],["Colin","loving colin"],["Dallas","loving dallas"],
["Derek","loving derek"],["Dominic","loving dominic"],["Eric","loving eric"],["Evan","loving evan"],["Garrett","loving garrett"],
["Gavin","loving gavin"],["Hayden","loving hayden"],["Holden","loving holden"],["Jason","loving jason"],["Justin","loving justin"]
]
},
labrador:{
playful:[
["Rascal","playful rascal"],["Buster","fun-loving buddy"],["Rookie","new playmate"],["Taz","tazmanian playful"],["Jumpy","jump-happy"],
["Pogo","pogo stick play"],["Doodle","fun and goofy"],["Zeke","playful spirit"],["Kix","kickin' player"],["Hopper","full of hops"],
["Flick","playful flick"],["Riff","playful riff"],["Tumble","tumbling play"],["Dax","playful dax"],["Spud","spunky playmate"],
["Turbo","turbo-charged play"],["Loco","locomotive play"],["Bounce","bouncy energy"],["Chewie","chew-loving player"],["Moe","playful pal"],
["Rube","playful rube"],["Wiz","witty player"],["Jig","jig-dancing play"],["Hoppy","happy hopper"],["Puck","playful puck"],
["Cletus","playful cletus"],["Bink","playful bink"],["Slink","slinky player"],["Niko","playful joy"],["Kiko","playful kiki"],
["Dusty","playful dustball"],["Zane","playful zane"],["Gabe","playful gabe"],["Bongo","bongo playful"],["Scamp","scamp playful"],
["Frisky","frisky playful"],["Wags","wags playful"],["Chum","chum playful"],["Brio","brio playful"],["Zippy","zippy playful"],
["Rascalito","rascalito playful"],["Dingo","dingo playful"],["Jinks","jinks playful"],["Nuts","nuts playful"],["Rowdy","rowdy playful"],
["Skittles","skittles playful"],["Squirt","squirt playful"],["Tater","tater playful"],["Whiz","whiz playful"],["Zestie","zestie playful"]
],
energetic:[
["Bolt","bolt speed"],["Sprint","sprint energy"],["Nitro","nitro boost"],["Cyclone","cyclone energy"],["Dynamo","dynamo power"],
["Fury","fury energy"],["Hurricane","hurricane energy"],["Thunder","thunder energy"],["Rocket","rocket speed"],["Spark","spark energy"],
["Surge","surge energy"],["Vortex","vortex energy"],["Gallop","galloping energy"],["Comet","comet speed"],["Charger","charger energy"],
["Boomer","boomer energy"],["Bandit","bandit energy"],["Arrow","arrow speed"],["Bravo","bravo energy"],["Hawk","hawk speed"],
["Phoenix","phoenix rise"],["Rebel","rebel energy"],["Rocky","rock solid energy"],["Tyson","tough energy"],["Ranger","ranger energy"],
["Fire","fire energy"],["Wild","wild energy"],["Strider","strider energy"],["Gallant","gallant energy"],["Zoom","zoom speed"],
["Hustle","hustle energy"],["Power","power energy"],["Sprinton","sprinton energy"],["Gust","gust energy"],["Tempest","tempest energy"],
["Blitzer","blitzer energy"],["Skipper","skipper energy"],["Streak","streak energy"],["Torch","torch energy"],["Volt","volt energy"],
["Windrider","windrider energy"],["Iron","iron energy"],["Rampage","rampage energy"],["Swoop","swoop energy"],["Tracer","tracer energy"],
["Vanguard","vanguard energy"],["Whirl","whirl energy"],["Xpress","xpress energy"],["Yapper","yapper energy"],["Zinger","zinger energy"]
],
cuddly:[
["Archie","archie cuddle"],["Gus","gus cuddles"],["Louie","louie cuddles"],["Theo","theo cuddle"],["Bean","bean cuddle"],
["Biscuit","biscuit cuddle"],["Peanut","peanut sweet"],["Nibs","nibs sweet"],["Sprout","sprout cuddle"],["Cub","cub cuddle"],
["Puffin","puffin cuddle"],["Roo","roo cuddle"],["Dino","dino cuddles"],["Woody","woody cuddles"],["Bonham","bonham cuddle"],
["Clove","clove sweet"],["Fudge","fudge sweet"],["Nutty","nutty sweet"],["Bubu","bubu cuddle"],["Juno","juno cuddles"],
["Otis","otis cuddle"],["Remy","remy cuddle"],["Reggie","reggie cuddle"],["Tucker","tucker cuddle"],["Wally","wally cuddle"],
["Barney","barney cuddle"],["Baxter","baxter cuddle"],["Brody","brody cuddle"],["Chico","chico cuddle"],["Crosby","crosby cuddle"],
["Donny","donny cuddle"],["Eddie","eddie cuddle"],["Freddy","freddy cuddle"],["Georgie","georgie cuddle"],["Howie","howie cuddle"],
["Joey","joey cuddle"],["Kenny","kenny cuddle"],["Lenny","lenny cuddle"],["Marty","marty cuddle"],["Nicky","nicky cuddle"],
["Ozzy","ozzy cuddle"],["Paddy","paddy cuddle"],["Quincy","quincy cuddle"],["Robbie","robbie cuddle"],["Sonny","sonny cuddle"],
["Timmy","timmy cuddle"],["Vinny","vinny cuddle"],["Wylie","wylie cuddle"],["Yogi","yogi cuddles"],["Zeke","zeke cuddle"]
],
adventurous:[
["Nomad","nomad wander"],["Trekker","trekking explore"],["Explorer","explorer name"],["Pathfinder","pathfinder explore"],["Navigator","navigator explore"],
["Mariner","mariner explore"],["Hiker","hiker explore"],["Wayfarer","wayfarer explore"],["Rambler","rambling explore"],["Sailor","sailor explore"],
["Trapper","trapper explore"],["Boone","boone explore"],["Argus","argus explore"],["Captain","captain explore"],["Drake","drake explore"],
["Everest","everest explore"],["Frontier","frontier explore"],["Kepler","kepler explore"],["Outlaw","outlaw explore"],["Pilot","pilot explore"],
["Quest","quest explore"],["Wanderer","wanderer explore"],["Woodsman","woodsman explore"],["Yonder","yonder explore"],["Zephyr","zephyr wind"],
["Cobalt","cobalt explore"],["Convoy","convoy explore"],["Cross","cross explore"],["Galleon","galleon explore"],["Journey","journey travel"],
["Kael","kael explore"],["Lior","lior explore"],["Midas","midas explore"],["Orion","orion explore"],["Raider","raider explore"],
["Seafarer","seafarer explore"],["Stray","stray explore"],["Traveler","traveler explore"],["Venture","venture explore"],["Valiant","valiant explore"],
["Westley","westley explore"],["Alden","alden explore"],["Bram","bram explore"],["Corbin","corbin explore"],["Darien","darien explore"],
["Ewan","ewan explore"],["Flynn","flynn explore"],["Grady","grady explore"],["Halen","halen explore"],["Jovan","jovan explore"]
],
shy:[
["Aaron","gentle aaron"],["Amos","gentle amos"],["Arthur","gentle arthur"],["Calvin","gentle calvin"],["Cedric","gentle cedric"],
["Clark","gentle clark"],["Cole","gentle cole"],["Conrad","gentle conrad"],["Cort","gentle cort"],["Dean","gentle dean"],
["Denton","gentle denton"],["Duncan","gentle duncan"],["Edward","gentle edward"],["Ellis","gentle ellis"],["Emerson","gentle emerson"],
["Ervin","gentle ervin"],["Ford","gentle ford"],["Francis","gentle francis"],["Glenn","gentle glenn"],["Grant","gentle grant"],
["Heath","gentle heath"],["Ian","gentle ian"],["Isaac","gentle isaac"],["Joel","gentle joel"],["Jude","gentle jude"],
["Kent","gentle kent"],["Leonard","gentle leonard"],["Lewis","gentle lewis"],["Martin","gentle martin"],["Nathan","gentle nathan"],
["Paul","gentle paul"],["Philip","gentle philip"],["Ralph","gentle ralph"],["Reed","gentle reed"],["Roy","gentle roy"],
["Aldric","gentle aldric"],["Benton","gentle benton"],["Colton","gentle colton"],["Darius","gentle darius"],["Elton","gentle elton"],
["Finnian","gentle finnian"],["Gareth","gentle gareth"],["Harlan","gentle harlan"],["Jareth","gentle jareth"],["Keaton","gentle keaton"],
["Lioran","gentle lioran"],["Merrick","gentle merrick"],["Norbert","gentle norbert"],["Percival","gentle percival"],["Rowan","gentle rowan"]
],
affectionate:[
["Cooper","affectionate cooper"],["Max","affectionate max"],["Sam","affectionate sam"],["Luke","affectionate luke"],["Grey","affectionate grey"],
["Jaxson","affectionate jaxson"],["Lincoln","affectionate lincoln"],["Parker","affectionate parker"],["Reese","affectionate reese"],["Russell","affectionate russell"],
["Seth","affectionate seth"],["Simon","affectionate simon"],["Tate","affectionate tate"],["Taylor","affectionate taylor"],["Wes","affectionate wes"],
["Adam","affectionate adam"],["Alex","affectionate alex"],["Andrew","affectionate andrew"],["Ben","affectionate ben"],["Blake","affectionate blake"],
["Brent","affectionate brent"],["Brian","affectionate brian"],["Cameron","affectionate cameron"],["Carter","affectionate carter"],["Colin","affectionate colin"],
["Dallas","affectionate dallas"],["Derek","affectionate derek"],["Dominic","affectionate dominic"],["Eric","affectionate eric"],["Evan","affectionate evan"],
["Garrett","affectionate garrett"],["Gavin","affectionate gavin"],["Hayden","affectionate hayden"],["Holden","affectionate holden"],["Jason","affectionate jason"],
["Justin","affectionate justin"],["Landry","affectionate landry"],["Mason","affectionate mason"],["Nolan","affectionate nolan"],["Owen","affectionate owen"],
["Paxton","affectionate paxton"],["Quinn","affectionate quinn"],["Riley","affectionate riley"],["Sawyer","affectionate sawyer"],["Tanner","affectionate tanner"],
["Uriel","affectionate uriel"],["Vaughn","affectionate vaughn"],["Walker","affectionate walker"],["Xander","affectionate xander"],["York","affectionate york"]
]
},
french_bulldog:{
playful:[
["Scamp","scamp playful"],["Rascal","playful rascal"],["Buster","fun-loving buddy"],["Zippy","zippy playful"],["Jinks","jinks playful"],
["Rowdy","rowdy playful"],["Dax","playful dax"],["Ziggy","ziggy playful"],["Puck","playful puck"],["Hopper","full of hops"],
["Tater","tater playful"],["Squirt","squirt playful"],["Rookie","new playmate"],["Taz","tazmanian playful"],["Frisky","frisky playful"],
["Wags","wags playful"],["Bongo","bongo playful"],["Chewie","chew-loving player"],["Jumpy","jump-happy"],["Pogo","pogo stick play"],
["Doodle","fun and goofy"],["Kix","kickin' player"],["Riff","playful riff"],["Tumble","tumbling play"],["Spud","spunky playmate"],
["Turbo","turbo-charged play"],["Bounce","bouncy energy"],["Moe","playful pal"],["Rube","playful rube"],["Wiz","witty player"],
["Jig","jig-dancing play"],["Bink","playful bink"],["Slink","slinky player"],["Niko","playful joy"],["Dusty","playful dustball"],
["Gabe","playful gabe"],["Chum","chum playful"],["Brio","brio playful"],["Nuts","nuts playful"],["Skittles","skittles playful"],
["Whiz","whiz playful"],["Flick","playful flick"],["Hoppy","happy hopper"],["Kiko","playful kiki"],["Zane","playful zane"],
["Loco","locomotive play"],["Rocco","playful rocco"],["Pip","peppy little guy"],["Gizmo","quirky and playful"],["Rip","playful rip"]
],
energetic:[
["Ace","top energy"],["Dash","super fast"],["Bolt","bolt speed"],["Spark","spark energy"],["Zoom","zoom speed"],
["Hustle","hustle energy"],["Jet","jet speed"],["Rio","river of energy"],["Chase","chasing energy"],["Rush","rushing energy"],
["Blaze","fiery spirit"],["Storm","stormy energy"],["Comet","comet speed"],["Streak","streak energy"],["Torch","torch energy"],
["Volt","volt energy"],["Gust","gust energy"],["Strider","strider energy"],["Bravo","bravo energy"],["Hawk","hawk speed"],
["Rocky","rock solid energy"],["Colt","colt energy"],["Duke","duke energy"],["Ranger","ranger energy"],["Arrow","arrow speed"],
["Sprint","sprint energy"],["Surge","surge energy"],["Fire","fire energy"],["Wild","wild energy"],["Skipper","skipper energy"],
["Tracer","tracer energy"],["Whirl","whirl energy"],["Zinger","zinger energy"],["Gallop","galloping energy"],["Charger","charger energy"],
["Boomer","boomer energy"],["Bandit","bandit energy"],["Fury","fury energy"],["Phoenix","phoenix rise"],["Rebel","rebel energy"],
["Thunder","thunder energy"],["Titan","titanic energy"],["Kai","ocean energy"],["Trek","trekking energy"],["Koda","forest energy"],
["Brisk","brisk pace"],["Gunner","gunner energy"],["Cyclone","cyclone energy"],["Dynamo","dynamo power"],["Nitro","nitro boost"]
],
cuddly:[
["Milo","sweet cuddle bug"],["Ollie","cuddly ollie"],["Archie","archie cuddle"],["Gus","gus cuddles"],["Louie","louie cuddles"],
["Theo","theo cuddle"],["Bear","big cuddly bear"],["Teddy","teddy bear cuddle"],["Benny","benny cuddles"],["Charlie","charming cuddle"],
["Sammy","sweet cuddles"],["Cubby","cubby cuddle"],["Otis","otis cuddle"],["Remy","remy cuddle"],["Reggie","reggie cuddle"],
["Tucker","tucker cuddle"],["Barney","barney cuddle"],["Baxter","baxter cuddle"],["Chico","chico cuddle"],["Crosby","crosby cuddle"],
["Donny","donny cuddle"],["Eddie","eddie cuddle"],["Freddy","freddy cuddle"],["Georgie","georgie cuddle"],["Howie","howie cuddle"],
["Joey","joey cuddle"],["Kenny","kenny cuddle"],["Lenny","lenny cuddle"],["Marty","marty cuddle"],["Nicky","nicky cuddle"],
["Ozzy","ozzy cuddle"],["Paddy","paddy cuddle"],["Quincy","quincy cuddle"],["Robbie","robbie cuddle"],["Sonny","sonny cuddle"],
["Timmy","timmy cuddle"],["Vinny","vinny cuddle"],["Wylie","wylie cuddle"],["Yogi","yogi cuddles"],["Bean","bean cuddle"],
["Biscuit","biscuit cuddle"],["Peanut","peanut sweet"],["Nibs","nibs sweet"],["Sprout","sprout cuddle"],["Cub","cub cuddle"],
["Roo","roo cuddle"],["Dino","dino cuddles"],["Fudge","fudge sweet"],["Nutty","nutty sweet"],["Clove","clove sweet"]
],
adventurous:[
["Scout","scout explorer"],["Rover","roving adventurer"],["Nomad","nomad wander"],["Trekker","trekking explore"],["Explorer","explorer name"],
["Pathfinder","pathfinder explore"],["Navigator","navigator explore"],["Mariner","mariner explore"],["Hiker","hiker explore"],["Wayfarer","wayfarer explore"],
["Rambler","rambling explore"],["Sailor","sailor explore"],["Trapper","trapper explore"],["Boone","boone explore"],["Argus","argus explore"],
["Captain","captain explore"],["Drake","drake explore"],["Orion","orion explore"],["Raider","raider explore"],["Seafarer","seafarer explore"],
["Traveler","traveler explore"],["Venture","venture explore"],["Valiant","valiant explore"],["Westley","westley explore"],["Alden","alden explore"],
["Flynn","flynn explore"],["Grady","grady explore"],["Halen","halen explore"],["Jovan","jovan explore"],["Kepler","kepler explore"],
["Frontier","frontier explore"],["Outlaw","outlaw explore"],["Pilot","pilot explore"],["Quest","quest explore"],["Wanderer","wanderer explore"],
["Woodsman","woodsman explore"],["Yonder","yonder explore"],["Zephyr","zephyr wind"],["Cobalt","cobalt explore"],["Convoy","convoy explore"],
["Cross","cross explore"],["Galleon","galleon explore"],["Journey","journey travel"],["Kael","kael explore"],["Lior","lior explore"],
["Midas","midas explore"],["Stray","stray explore"],["Everest","everest explore"],["Wilder","wild explorer"],["Wyatt","wyatt wanderer"]
],
shy:[
["Asher","gentle asher"],["Beau","gentle beau"],["Eli","gentle eli"],["Graham","gentle graham"],["Hugo","gentle hugo"],
["Kian","gentle kian"],["Landon","gentle landon"],["Miles","gentle miles"],["Noah","gentle noah"],["Owen","gentle owen"],
["Silas","gentle silas"],["Caspian","gentle caspian"],["Felix","gentle felix"],["Jasper","gentle jasper"],["Aaron","gentle aaron"],
["Amos","gentle amos"],["Arthur","gentle arthur"],["Bram","gentle bram"],["Calvin","gentle calvin"],["Cedric","gentle cedric"],
["Clark","gentle clark"],["Cole","gentle cole"],["Conrad","gentle conrad"],["Cort","gentle cort"],["Dean","gentle dean"],
["Denton","gentle denton"],["Duncan","gentle duncan"],["Edward","gentle edward"],["Ellis","gentle ellis"],["Emerson","gentle emerson"],
["Ervin","gentle ervin"],["Ford","gentle ford"],["Francis","gentle francis"],["Glenn","gentle glenn"],["Grant","gentle grant"],
["Heath","gentle heath"],["Ian","gentle ian"],["Isaac","gentle isaac"],["Joel","gentle joel"],["Jude","gentle jude"],
["Kent","gentle kent"],["Leonard","gentle leonard"],["Lewis","gentle lewis"],["Martin","gentle martin"],["Nathan","gentle nathan"],
["Paul","gentle paul"],["Philip","gentle philip"],["Ralph","gentle ralph"],["Reed","gentle reed"],["Roy","gentle roy"]
],
affectionate:[
["Buddy","best buddy"],["Cooper","affectionate cooper"],["Max","affectionate max"],["Sam","affectionate sam"],["Luke","affectionate luke"],
["Grey","affectionate grey"],["Jaxson","affectionate jaxson"],["Lincoln","affectionate lincoln"],["Parker","affectionate parker"],["Reese","affectionate reese"],
["Russell","affectionate russell"],["Seth","affectionate seth"],["Simon","affectionate simon"],["Tate","affectionate tate"],["Taylor","affectionate taylor"],
["Wes","affectionate wes"],["Adam","affectionate adam"],["Alex","affectionate alex"],["Andrew","affectionate andrew"],["Ben","affectionate ben"],
["Blake","affectionate blake"],["Brent","affectionate brent"],["Brian","affectionate brian"],["Cameron","affectionate cameron"],["Carter","affectionate carter"],
["Colin","affectionate colin"],["Dallas","affectionate dallas"],["Derek","affectionate derek"],["Dominic","affectionate dominic"],["Eric","affectionate eric"],
["Evan","affectionate evan"],["Garrett","affectionate garrett"],["Gavin","affectionate gavin"],["Hayden","affectionate hayden"],["Holden","affectionate holden"],
["Jason","affectionate jason"],["Justin","affectionate justin"],["Landry","affectionate landry"],["Mason","affectionate mason"],["Nolan","affectionate nolan"],
["Paxton","affectionate paxton"],["Quinn","affectionate quinn"],["Riley","affectionate riley"],["Sawyer","affectionate sawyer"],["Tanner","affectionate tanner"],
["Uriel","affectionate uriel"],["Vaughn","affectionate vaughn"],["Walker","affectionate walker"],["Xander","affectionate xander"],["York","affectionate york"]
]
},
chihuahua:{
playful:[
["Jax","playful spirit"],["Ziggy","zesty and energetic"],["Pip","peppy little guy"],["Dax","playful dax"],["Rocco","playful rocco"],
["Hopper","full of hops"],["Pogo","pogo stick play"],["Zeke","playful spirit"],["Kix","kickin' player"],["Riff","playful riff"],
["Tumble","tumbling play"],["Flick","playful flick"],["Jig","jig-dancing play"],["Hoppy","happy hopper"],["Bink","playful bink"],
["Slink","slinky player"],["Niko","playful joy"],["Kiko","playful kiki"],["Dusty","playful dustball"],["Zane","playful zane"],
["Loco","locomotive play"],["Scamp","scamp playful"],["Rascal","playful rascal"],["Taz","tazmanian playful"],["Frisky","frisky playful"],
["Jinks","jinks playful"],["Rowdy","rowdy playful"],["Squirt","squirt playful"],["Rookie","new playmate"],["Chewie","chew-loving player"],
["Moe","playful pal"],["Rube","playful rube"],["Wiz","witty player"],["Spud","spunky playmate"],["Turbo","turbo-charged play"],
["Bounce","bouncy energy"],["Chum","chum playful"],["Brio","brio playful"],["Nuts","nuts playful"],["Skittles","skittles playful"],
["Whiz","whiz playful"],["Gizmo","quirky and playful"],["Rip","playful rip"],["Jumpy","jump-happy"],["Doodle","fun and goofy"],
["Bongo","bongo playful"],["Wags","wags playful"],["Puck","playful puck"],["Tater","tater playful"],["Zippy","zippy playful"]
],
energetic:[
["Ace","top energy"],["Dash","super fast"],["Jet","jet speed"],["Kai","ocean energy"],["Rio","river of energy"],
["Chase","chasing energy"],["Rush","rushing energy"],["Blaze","fiery spirit"],["Spark","spark energy"],["Zoom","zoom speed"],
["Bolt","bolt speed"],["Streak","streak energy"],["Torch","torch energy"],["Volt","volt energy"],["Gust","gust energy"],
["Strider","strider energy"],["Bravo","bravo energy"],["Hawk","hawk speed"],["Colt","colt energy"],["Arrow","arrow speed"],
["Sprint","sprint energy"],["Surge","surge energy"],["Skipper","skipper energy"],["Tracer","tracer energy"],["Whirl","whirl energy"],
["Zinger","zinger energy"],["Gallop","galloping energy"],["Bandit","bandit energy"],["Fury","fury energy"],["Rebel","rebel energy"],
["Titan","titanic energy"],["Koda","forest energy"],["Brisk","brisk pace"],["Cyclone","cyclone energy"],["Dynamo","dynamo power"],
["Nitro","nitro boost"],["Comet","comet speed"],["Fire","fire energy"],["Wild","wild energy"],["Phoenix","phoenix rise"],
["Storm","stormy energy"],["Thunder","thunder energy"],["Ranger","ranger energy"],["Rocky","rock solid energy"],["Tyson","tough energy"],
["Charger","charger energy"],["Boomer","boomer energy"],["Vigor","vital energy"],["Trek","trekking energy"],["Hustle","hustle energy"]
],
cuddly:[
["Milo","sweet cuddle bug"],["Ollie","cuddly ollie"],["Gus","gus cuddles"],["Louie","louie cuddles"],["Theo","theo cuddle"],
["Archie","archie cuddle"],["Bear","big cuddly bear"],["Teddy","teddy bear cuddle"],["Benny","benny cuddles"],["Charlie","charming cuddle"],
["Sammy","sweet cuddles"],["Cubby","cubby cuddle"],["Otis","otis cuddle"],["Remy","remy cuddle"],["Reggie","reggie cuddle"],
["Tucker","tucker cuddle"],["Barney","barney cuddle"],["Baxter","baxter cuddle"],["Chico","chico cuddle"],["Crosby","crosby cuddle"],
["Donny","donny cuddle"],["Eddie","eddie cuddle"],["Freddy","freddy cuddle"],["Georgie","georgie cuddle"],["Howie","howie cuddle"],
["Joey","joey cuddle"],["Kenny","kenny cuddle"],["Lenny","lenny cuddle"],["Marty","marty cuddle"],["Nicky","nicky cuddle"],
["Ozzy","ozzy cuddle"],["Paddy","paddy cuddle"],["Quincy","quincy cuddle"],["Robbie","robbie cuddle"],["Sonny","sonny cuddle"],
["Timmy","timmy cuddle"],["Vinny","vinny cuddle"],["Wylie","wylie cuddle"],["Yogi","yogi cuddles"],["Bean","bean cuddle"],
["Biscuit","biscuit cuddle"],["Peanut","peanut sweet"],["Nibs","nibs sweet"],["Sprout","sprout cuddle"],["Cub","cub cuddle"],
["Roo","roo cuddle"],["Dino","dino cuddles"],["Fudge","fudge sweet"],["Nutty","nutty sweet"],["Clove","clove sweet"]
],
adventurous:[
["Scout","scout explorer"],["Rover","roving adventurer"],["Nomad","nomad wander"],["Trekker","trekking explore"],["Explorer","explorer name"],
["Pathfinder","pathfinder explore"],["Navigator","navigator explore"],["Mariner","mariner explore"],["Hiker","hiker explore"],["Wayfarer","wayfarer explore"],
["Rambler","rambling explore"],["Sailor","sailor explore"],["Trapper","trapper explore"],["Boone","boone explore"],["Argus","argus explore"],
["Captain","captain explore"],["Drake","drake explore"],["Orion","orion explore"],["Raider","raider explore"],["Seafarer","seafarer explore"],
["Traveler","traveler explore"],["Venture","venture explore"],["Valiant","valiant explore"],["Westley","westley explore"],["Alden","alden explore"],
["Flynn","flynn explore"],["Grady","grady explore"],["Halen","halen explore"],["Jovan","jovan explore"],["Kepler","kepler explore"],
["Frontier","frontier explore"],["Outlaw","outlaw explore"],["Pilot","pilot explore"],["Quest","quest explore"],["Wanderer","wanderer explore"],
["Woodsman","woodsman explore"],["Yonder","yonder explore"],["Zephyr","zephyr wind"],["Cobalt","cobalt explore"],["Convoy","convoy explore"],
["Cross","cross explore"],["Galleon","galleon explore"],["Journey","journey travel"],["Kael","kael explore"],["Lior","lior explore"],
["Midas","midas explore"],["Stray","stray explore"],["Everest","everest explore"],["Wilder","wild explorer"],["Wyatt","wyatt wanderer"]
],
shy:[
["Asher","gentle asher"],["Beau","gentle beau"],["Eli","gentle eli"],["Hugo","gentle hugo"],["Kian","gentle kian"],
["Landon","gentle landon"],["Miles","gentle miles"],["Noah","gentle noah"],["Owen","gentle owen"],["Silas","gentle silas"],
["Caspian","gentle caspian"],["Felix","gentle felix"],["Jasper","gentle jasper"],["Aaron","gentle aaron"],["Amos","gentle amos"],
["Arthur","gentle arthur"],["Bram","gentle bram"],["Calvin","gentle calvin"],["Cedric","gentle cedric"],["Clark","gentle clark"],
["Cole","gentle cole"],["Conrad","gentle conrad"],["Cort","gentle cort"],["Dean","gentle dean"],["Denton","gentle denton"],
["Duncan","gentle duncan"],["Edward","gentle edward"],["Ellis","gentle ellis"],["Emerson","gentle emerson"],["Ervin","gentle ervin"],
["Ford","gentle ford"],["Francis","gentle francis"],["Glenn","gentle glenn"],["Grant","gentle grant"],["Heath","gentle heath"],
["Ian","gentle ian"],["Isaac","gentle isaac"],["Joel","gentle joel"],["Jude","gentle jude"],["Kent","gentle kent"],
["Leonard","gentle leonard"],["Lewis","gentle lewis"],["Martin","gentle martin"],["Nathan","gentle nathan"],["Paul","gentle paul"],
["Philip","gentle philip"],["Ralph","gentle ralph"],["Reed","gentle reed"],["Roy","gentle roy"],["Lioran","gentle lioran"]
],
affectionate:[
["Buddy","best buddy"],["Cooper","affectionate cooper"],["Max","affectionate max"],["Sam","affectionate sam"],["Luke","affectionate luke"],
["Grey","affectionate grey"],["Jaxson","affectionate jaxson"],["Lincoln","affectionate lincoln"],["Parker","affectionate parker"],["Reese","affectionate reese"],
["Russell","affectionate russell"],["Seth","affectionate seth"],["Simon","affectionate simon"],["Tate","affectionate tate"],["Taylor","affectionate taylor"],
["Wes","affectionate wes"],["Adam","affectionate adam"],["Alex","affectionate alex"],["Andrew","affectionate andrew"],["Ben","affectionate ben"],
["Blake","affectionate blake"],["Brent","affectionate brent"],["Brian","affectionate brian"],["Cameron","affectionate cameron"],["Carter","affectionate carter"],
["Colin","affectionate colin"],["Dallas","affectionate dallas"],["Derek","affectionate derek"],["Dominic","affectionate dominic"],["Eric","affectionate eric"],
["Evan","affectionate evan"],["Garrett","affectionate garrett"],["Gavin","affectionate gavin"],["Hayden","affectionate hayden"],["Holden","affectionate holden"],
["Jason","affectionate jason"],["Justin","affectionate justin"],["Landry","affectionate landry"],["Mason","affectionate mason"],["Nolan","affectionate nolan"],
["Paxton","affectionate paxton"],["Quinn","affectionate quinn"],["Riley","affectionate riley"],["Sawyer","affectionate sawyer"],["Tanner","affectionate tanner"],
["Uriel","affectionate uriel"],["Vaughn","affectionate vaughn"],["Walker","affectionate walker"],["Xander","affectionate xander"],["York","affectionate york"]
]
},
german_shepherd:{
playful:[
["Scamp","scamp playful"],["Rascal","playful rascal"],["Buster","fun-loving buddy"],["Rowdy","rowdy playful"],["Jinks","jinks playful"],
["Taz","tazmanian playful"],["Frisky","frisky playful"],["Zippy","zippy playful"],["Gizmo","quirky and playful"],["Puck","playful puck"],
["Hopper","full of hops"],["Rookie","new playmate"],["Squirt","squirt playful"],["Tater","tater playful"],["Chewie","chew-loving player"],
["Dax","playful dax"],["Ziggy","zesty and energetic"],["Pip","peppy little guy"],["Rocco","playful rocco"],["Jumpy","jump-happy"],
["Pogo","pogo stick play"],["Doodle","fun and goofy"],["Kix","kickin' player"],["Riff","playful riff"],["Tumble","tumbling play"],
["Spud","spunky playmate"],["Turbo","turbo-charged play"],["Bounce","bouncy energy"],["Moe","playful pal"],["Rube","playful rube"],
["Wiz","witty player"],["Jig","jig-dancing play"],["Bink","playful bink"],["Slink","slinky player"],["Niko","playful joy"],
["Dusty","playful dustball"],["Gabe","playful gabe"],["Chum","chum playful"],["Brio","brio playful"],["Nuts","nuts playful"],
["Skittles","skittles playful"],["Whiz","whiz playful"],["Flick","playful flick"],["Hoppy","happy hopper"],["Kiko","playful kiki"],
["Zane","playful zane"],["Loco","locomotive play"],["Rip","playful rip"],["Bongo","bongo playful"],["Wags","wags playful"]
],
energetic:[
["Ace","top energy"],["Dash","super fast"],["Bolt","bolt speed"],["Jet","jet speed"],["Chase","chasing energy"],
["Rush","rushing energy"],["Blaze","fiery spirit"],["Storm","stormy energy"],["Titan","titanic energy"],["Thor","thunder energy"],
["Trek","trekking energy"],["Koda","forest energy"],["Brisk","brisk pace"],["Colt","colt energy"],["Duke","duke energy"],
["Gunner","gunner energy"],["Sprint","sprint energy"],["Surge","surge energy"],["Rocket","rocket speed"],["Spark","spark energy"],
["Thunder","thunder energy"],["Rocky","rock solid energy"],["Tyson","tough energy"],["Ranger","ranger energy"],["Arrow","arrow speed"],
["Bravo","bravo energy"],["Hawk","hawk speed"],["Cyclone","cyclone energy"],["Dynamo","dynamo power"],["Fury","fury energy"],
["Phoenix","phoenix rise"],["Rebel","rebel energy"],["Comet","comet speed"],["Charger","charger energy"],["Boomer","boomer energy"],
["Bandit","bandit energy"],["Fire","fire energy"],["Wild","wild energy"],["Zoom","zoom speed"],["Hustle","hustle energy"],
["Streak","streak energy"],["Torch","torch energy"],["Volt","volt energy"],["Gust","gust energy"],["Strider","strider energy"],
["Skipper","skipper energy"],["Tracer","tracer energy"],["Whirl","whirl energy"],["Zinger","zinger energy"],["Nitro","nitro boost"]
],
cuddly:[
["Milo","sweet cuddle bug"],["Ollie","cuddly ollie"],["Archie","archie cuddle"],["Gus","gus cuddles"],["Louie","louie cuddles"],
["Theo","theo cuddle"],["Bear","big cuddly bear"],["Teddy","teddy bear cuddle"],["Benny","benny cuddles"],["Charlie","charming cuddle"],
["Sammy","sweet cuddles"],["Cubby","cubby cuddle"],["Otis","otis cuddle"],["Remy","remy cuddle"],["Reggie","reggie cuddle"],
["Tucker","tucker cuddle"],["Barney","barney cuddle"],["Baxter","baxter cuddle"],["Chico","chico cuddle"],["Crosby","crosby cuddle"],
["Donny","donny cuddle"],["Eddie","eddie cuddle"],["Freddy","freddy cuddle"],["Georgie","georgie cuddle"],["Howie","howie cuddle"],
["Joey","joey cuddle"],["Kenny","kenny cuddle"],["Lenny","lenny cuddle"],["Marty","marty cuddle"],["Nicky","nicky cuddle"],
["Ozzy","ozzy cuddle"],["Paddy","paddy cuddle"],["Quincy","quincy cuddle"],["Robbie","robbie cuddle"],["Sonny","sonny cuddle"],
["Timmy","timmy cuddle"],["Vinny","vinny cuddle"],["Wylie","wylie cuddle"],["Yogi","yogi cuddles"],["Bean","bean cuddle"],
["Biscuit","biscuit cuddle"],["Peanut","peanut sweet"],["Nibs","nibs sweet"],["Sprout","sprout cuddle"],["Cub","cub cuddle"],
["Roo","roo cuddle"],["Dino","dino cuddles"],["Fudge","fudge sweet"],["Nutty","nutty sweet"],["Clove","clove sweet"]
],
adventurous:[
["Scout","scout explorer"],["Rover","roving adventurer"],["Nomad","nomad wander"],["Trekker","trekking explore"],["Explorer","explorer name"],
["Pathfinder","pathfinder explore"],["Navigator","navigator explore"],["Mariner","mariner explore"],["Hiker","hiker explore"],["Wayfarer","wayfarer explore"],
["Rambler","rambling explore"],["Sailor","sailor explore"],["Trapper","trapper explore"],["Boone","boone explore"],["Argus","argus explore"],
["Captain","captain explore"],["Drake","drake explore"],["Orion","orion explore"],["Raider","raider explore"],["Seafarer","seafarer explore"],
["Traveler","traveler explore"],["Venture","venture explore"],["Valiant","valiant explore"],["Westley","westley explore"],["Alden","alden explore"],
["Flynn","flynn explore"],["Grady","grady explore"],["Halen","halen explore"],["Jovan","jovan explore"],["Kepler","kepler explore"],
["Frontier","frontier explore"],["Outlaw","outlaw explore"],["Pilot","pilot explore"],["Quest","quest explore"],["Wanderer","wanderer explore"],
["Woodsman","woodsman explore"],["Yonder","yonder explore"],["Zephyr","zephyr wind"],["Cobalt","cobalt explore"],["Convoy","convoy explore"],
["Cross","cross explore"],["Galleon","galleon explore"],["Journey","journey travel"],["Kael","kael explore"],["Lior","lior explore"],
["Midas","midas explore"],["Stray","stray explore"],["Everest","everest explore"],["Wilder","wild explorer"],["Wyatt","wyatt wanderer"]
],
shy:[
["Asher","gentle asher"],["Beau","gentle beau"],["Eli","gentle eli"],["Graham","gentle graham"],["Hugo","gentle hugo"],
["Kian","gentle kian"],["Landon","gentle landon"],["Miles","gentle miles"],["Noah","gentle noah"],["Owen","gentle owen"],
["Silas","gentle silas"],["Caspian","gentle caspian"],["Felix","gentle felix"],["Jasper","gentle jasper"],["Aaron","gentle aaron"],
["Amos","gentle amos"],["Arthur","gentle arthur"],["Bram","gentle bram"],["Calvin","gentle calvin"],["Cedric","gentle cedric"],
["Clark","gentle clark"],["Cole","gentle cole"],["Conrad","gentle conrad"],["Cort","gentle cort"],["Dean","gentle dean"],
["Denton","gentle denton"],["Duncan","gentle duncan"],["Edward","gentle edward"],["Ellis","gentle ellis"],["Emerson","gentle emerson"],
["Ervin","gentle ervin"],["Ford","gentle ford"],["Francis","gentle francis"],["Glenn","gentle glenn"],["Grant","gentle grant"],
["Heath","gentle heath"],["Ian","gentle ian"],["Isaac","gentle isaac"],["Joel","gentle joel"],["Jude","gentle jude"],
["Kent","gentle kent"],["Leonard","gentle leonard"],["Lewis","gentle lewis"],["Martin","gentle martin"],["Nathan","gentle nathan"],
["Paul","gentle paul"],["Philip","gentle philip"],["Ralph","gentle ralph"],["Reed","gentle reed"],["Roy","gentle roy"]
],
affectionate:[
["Buddy","best buddy"],["Cooper","affectionate cooper"],["Max","affectionate max"],["Sam","affectionate sam"],["Luke","affectionate luke"],
["Grey","affectionate grey"],["Jaxson","affectionate jaxson"],["Lincoln","affectionate lincoln"],["Parker","affectionate parker"],["Reese","affectionate reese"],
["Russell","affectionate russell"],["Seth","affectionate seth"],["Simon","affectionate simon"],["Tate","affectionate tate"],["Taylor","affectionate taylor"],
["Wes","affectionate wes"],["Adam","affectionate adam"],["Alex","affectionate alex"],["Andrew","affectionate andrew"],["Ben","affectionate ben"],
["Blake","affectionate blake"],["Brent","affectionate brent"],["Brian","affectionate brian"],["Cameron","affectionate cameron"],["Carter","affectionate carter"],
["Colin","affectionate colin"],["Dallas","affectionate dallas"],["Derek","affectionate derek"],["Dominic","affectionate dominic"],["Eric","affectionate eric"],
["Evan","affectionate evan"],["Garrett","affectionate garrett"],["Gavin","affectionate gavin"],["Hayden","affectionate hayden"],["Holden","affectionate holden"],
["Jason","affectionate jason"],["Justin","affectionate justin"],["Landry","affectionate landry"],["Mason","affectionate mason"],["Nolan","affectionate nolan"],
["Paxton","affectionate paxton"],["Quinn","affectionate quinn"],["Riley","affectionate riley"],["Sawyer","affectionate sawyer"],["Tanner","affectionate tanner"],
["Uriel","affectionate uriel"],["Vaughn","affectionate vaughn"],["Walker","affectionate walker"],["Xander","affectionate xander"],["York","affectionate york"]
]
}
},
female:{
golden_retriever:{
playful:[
["Lila","playful and lively"],["Pixie","mischievous little sprite"],["Trixie","tricky and fun"],["Zara","bright and playful"],["Dottie","spotted and playful"],
["Roxy","rocking energy"],["Winnie","win some fun"],["Marnie","merry and playful"],["Lulu","lively little one"],["Fizzy","bubbly energy"],
["Biscuit","sweet and fun"],["Jolly","jovial playmate"],["Nala","playful lioness"],["Poppy","poppy play"],["Sassy","sassy play"],
["Tink","tinkering fun"],["Zuzu","zesty play"],["Dizzy","dizzy energy"],["Gigi","giggly play"],["Hattie","happy play"],
["Kiki","kicky play"],["Lolly","lollipop play"],["Maddy","mischievous play"],["Nixie","nixie play"],["Pippa","peppy play"],
["Rikki","rickrack play"],["Suki","suki play"],["Tally","tally play"],["Vivi","vibrant play"],["Wiggles","wiggly play"],
["Yara","yara play"],["Zelly","zelly play"],["Bree","breezy play"],["Clover","clover play"],["Diva","diva play"],
["Etta","etta play"],["Fifi","fifi play"],["Gracie","graceful play"],["Holly","holly play"],["Izzy","izzy play"],
["Jojo","jojo play"],["Kylie","kylie play"],["Lacey","lacey play"],["Mimi","mimi play"],["Olive","olive play"],
["Pebbles","pebbles play"],["Ruby","ruby play"],["Star","star play"],["Tessa","tessa play"],["Willow","willow play"]
],
energetic:[
["Blaze","fiery energy"],["Zest","zesty energy"],["Sprint","super fast"],["Nova","new star energy"],["Stormy","stormy energy"],
["Arrow","arrow speed"],["Breeze","breezy energy"],["Cyclone","cyclone energy"],["Dashie","dashie speed"],["Ember","ember glow"],
["Flame","flame energy"],["Gypsy","gypsy spirit"],["Halo","halo light"],["Indy","indy energy"],["Jetty","jetty speed"],
["Kora","kora energy"],["Lira","lira energy"],["Misty","misty energy"],["Nitra","nitro energy"],["Phoenix","phoenix rise"],
["Raven","raven speed"],["Rocket","rocket speed"],["Sage","sage energy"],["Sparkle","sparkle energy"],["Swift","swift speed"],
["Thunder","thunder energy"],["Viva","viva energy"],["Windy","windy energy"],["Xena","xena energy"],["Yola","yola energy"],
["Zora","zora energy"],["Aria","aria energy"],["Bella","bella energy"],["Canyon","canyon energy"],["Delta","delta energy"],
["Echo","echo energy"],["Fiera","fiera energy"],["Gale","gale energy"],["Havana","havana energy"],["Jetta","jetta speed"],
["Kaya","kaya energy"],["Luna","luna energy"],["Maren","maren energy"],["Oona","oona energy"],["Piper","piper energy"],
["Quest","quest explorer"],["Rio","rio energy"],["Sierra","sierra energy"],["Tundra","tundra energy"],["Wave","wave energy"]
],
cuddly:[
["Daisy","daisy cuddle"],["Molly","molly cuddle"],["Lucy","lucy cuddle"],["Bella","bella cuddle"],["Chloe","chloe cuddle"],
["Rosie","rosie cuddle"],["Lily","lily cuddle"],["Mia","mia cuddle"],["Ella","ella cuddle"],["Zoe","zoe cuddle"],
["Cookie","cookie cuddle"],["Honey","honey sweet"],["Sugar","sugar sweet"],["Cupcake","cupcake sweet"],["Bunny","bunny cuddle"],
["Marshmallow","marshmallow soft"],["Nala","nala cuddle"],["Peach","peach sweet"],["Pudding","pudding soft"],["Snowy","snowy soft"],
["Angel","angel sweet"],["Butter","butter soft"],["Cuddles","cuddle bug"],["Dandelion","dandelion soft"],["Fluffy","fluffy soft"],
["Gracie","graceful cuddle"],["Honeypie","honeypie sweet"],["Ivy","ivy sweet"],["Jelly","jelly sweet"],["Kitty","kitty cuddle"],
["Lollypop","lollypop sweet"],["Muffin","muffin soft"],["Nutmeg","nutmeg sweet"],["Petal","petal soft"],["Renee","renee cuddle"],
["Sherry","sherry sweet"],["Sweetie","sweetie sweet"],["Tinker","tinker sweet"],["Waffles","waffles sweet"],["Yummy","yummy sweet"],
["Amy","amy cuddle"],["Bonnie","bonnie sweet"],["Clara","clara cuddle"],["Dottie","dottie cuddle"],["Elsa","elsa sweet"],
["Faye","faye cuddle"],["Hope","hope sweet"],["Iris","iris sweet"],["Joy","joy sweet"],["Lila","lila cuddle"]
],
adventurous:[
["Scout","scout explorer"],["Wander","wander soul"],["Nomad","nomad wander"],["Journey","journey travel"],["Sailor","sailor explore"],
["Explorer","explorer name"],["Rogue","rogue spirit"],["Trail","trail explorer"],["Odyssey","odyssey journey"],["Safari","safari explore"],
["Trek","trek journey"],["Pioneer","pioneer spirit"],["Mariner","mariner explore"],["Navigator","navigator explore"],["Ranger","ranger explore"],
["Skye","skye adventure"],["Terra","terra explore"],["Vesta","vesta explore"],["Wilda","wilda explore"],["Yvonne","yvonne explore"],
["Zora","zora explore"],["Adara","adara explore"],["Bryn","bryn explore"],["Cara","cara explore"],["Dawn","dawn explore"],
["Eira","eira explore"],["Farah","farah explore"],["Galia","galia explore"],["Hiker","hiker explore"],["Inara","inara explore"],
["Jora","jora explore"],["Kira","kira explore"],["Lirael","lirael explore"],["Maeve","maeve explore"],["Nara","nara explore"],
["Oriel","oriel explore"],["Petra","petra explore"],["Quella","quella explore"],["Ramona","ramona explore"],["Sloane","sloane explore"],
["Taja","taja explore"],["Ursa","ursa explore"],["Valora","valora explore"],["Wren","wren explore"],["Xandra","xandra explore"],
["Yara","yara explore"],["Zephyr","zephyr wind"],["Alora","alora explore"],["Briony","briony explore"],["Corra","corra explore"]
],
shy:[
["Clara","gentle clara"],["Ivy","gentle ivy"],["Mae","gentle mae"],["Pearl","gentle pearl"],["Rose","gentle rose"],
["Violet","gentle violet"],["Ada","gentle ada"],["Agnes","gentle agnes"],["Alice","gentle alice"],["Ann","gentle ann"],
["Blair","gentle blair"],["Briar","gentle briar"],["Celia","gentle celia"],["Daphne","gentle daphne"],["Doris","gentle doris"],
["Edna","gentle edna"],["Elara","gentle elara"],["Esther","gentle esther"],["Faye","gentle faye"],["Flora","gentle flora"],
["Gail","gentle gail"],["Geneva","gentle geneva"],["Grace","gentle grace"],["Hazel","gentle hazel"],["Helen","gentle helen"],
["Inez","gentle inez"],["Janice","gentle janice"],["Jean","gentle jean"],["Joyce","gentle joyce"],["Julia","gentle julia"],
["Kate","gentle kate"],["Lillian","gentle lillian"],["Lorraine","gentle lorraine"],["Lucy","gentle lucy"],["Mabel","gentle mabel"],
["Margaret","gentle margaret"],["Mary","gentle mary"],["Mildred","gentle mildred"],["Mona","gentle mona"],["Nora","gentle nora"],
["Olive","gentle olive"],["Opal","gentle opal"],["Pansy","gentle pansy"],["Phyllis","gentle phyllis"],["Rachel","gentle rachel"],
["Ruth","gentle ruth"],["Sadie","gentle sadie"],["Serena","gentle serena"],["Thea","gentle thea"],["Vera","gentle vera"]
],
affectionate:[
["Abby","affectionate abby"],["Allie","affectionate allie"],["Anna","affectionate anna"],["Beth","affectionate beth"],["Brandy","affectionate brandy"],
["Carly","affectionate carly"],["Daisy","affectionate daisy"],["Emma","affectionate emma"],["Fran","affectionate fran"],["Gabby","affectionate gabby"],
["Hannah","affectionate hannah"],["Jenny","affectionate jenny"],["Jessie","affectionate jessie"],["Katie","affectionate katie"],["Kayla","affectionate kayla"],
["Leah","affectionate leah"],["Lisa","affectionate lisa"],["Maggie","affectionate maggie"],["Mary","affectionate mary"],["Megan","affectionate megan"],
["Nancy","affectionate nancy"],["Nina","affectionate nina"],["Patty","affectionate patty"],["Rachel","affectionate rachel"],["Sally","affectionate sally"],
["Sarah","affectionate sarah"],["Shelby","affectionate shelby"],["Stella","affectionate stella"],["Susie","affectionate susie"],["Taylor","affectionate taylor"],
["Tina","affectionate tina"],["Tracy","affectionate tracy"],["Whitney","affectionate whitney"],["Abby","affectionate abby"],["Amber","affectionate amber"],
["Becky","affectionate becky"],["Carol","affectionate carol"],["Cindy","affectionate cindy"],["Diana","affectionate diana"],["Ellen","affectionate ellen"],
["Erin","affectionate erin"],["Gina","affectionate gina"],["Heidi","affectionate heidi"],["Holly","affectionate holly"],["Jamie","affectionate jamie"],
["Jessica","affectionate jessica"],["Linda","affectionate linda"],["Molly","affectionate molly"],["Paula","affectionate paula"],["Wendy","affectionate wendy"]
]
},
labrador:{
playful:[
["Trixie","tricky and playful"],["Roxy","rocking energy"],["Pixie","mischievous little sprite"],["Sassy","sassy and playful"],["Dizzy","dizzy energy"],
["Fizzy","bubbly energy"],["Zuzu","zesty play"],["Pippa","peppy play"],["Nixie","nixie play"],["Wiggles","wiggly play"],
["Jolly","jovial playmate"],["Lolly","lollipop play"],["Gigi","giggly play"],["Kiki","kiki play"],["Izzy","izzy play"],
["Jojo","jojo play"],["Rikki","rickrack play"],["Tally","tally play"],["Bree","breezy play"],["Diva","diva play"],
["Etta","etta play"],["Hattie","happy play"],["Lacey","lacey play"],["Olive","olive play"],["Zelly","zelly play"],
["Marnie","merry and playful"],["Suki","suki play"],["Vivi","vibrant play"],["Yara","yara play"],["Fifi","fifi play"],
["Lila","playful and lively"],["Dottie","spotted and playful"],["Poppy","poppy play"],["Tink","tinkering fun"],["Lulu","lively little one"],
["Clover","clover play"],["Holly","holly play"],["Maddy","mischievous play"],["Ruby","ruby play"],["Star","star play"],
["Tessa","tessa play"],["Zara","bright and playful"],["Nala","playful lioness"],["Winnie","win some fun"],["Rascalina","playful rascal"],
["Friska","frisky playful"],["Skittie","skittish play"],["Squirtie","squirtie play"],["Chica","chica playful"],["Bouncy","bouncy play"]
],
energetic:[
["Stormy","stormy energy"],["Ember","ember glow"],["Swift","swift speed"],["Zora","zora energy"],["Arrow","arrow speed"],
["Breeze","breezy energy"],["Dashie","dashie speed"],["Flame","flame energy"],["Gypsy","gypsy spirit"],["Indy","indy energy"],
["Kora","kora energy"],["Raven","raven speed"],["Rocketta","rocket speed"],["Sparkle","sparkle energy"],["Thundera","thunder energy"],
["Viva","viva energy"],["Windy","windy energy"],["Xena","xena energy"],["Yola","yola energy"],["Aria","aria energy"],
["Delta","delta energy"],["Echo","echo energy"],["Fiera","fiera energy"],["Gale","gale energy"],["Jetta","jetta speed"],
["Kaya","kaya energy"],["Maren","maren energy"],["Piper","piper energy"],["Sierra","sierra energy"],["Wave","wave energy"],
["Nova","new star energy"],["Cyclona","cyclone energy"],["Blazie","blazing energy"],["Halie","halie energy"],["Lira","lira energy"],
["Misty","misty energy"],["Phoenixa","phoenix rise"],["Sagara","sagara energy"],["Tundra","tundra energy"],["Zestia","zestia energy"],
["Runna","running energy"],["Streaka","streak energy"],["Torcha","torch energy"],["Volta","volt energy"],["Gusti","gust energy"],
["Tempesta","tempest energy"],["Skipperie","skipper energy"],["Swoopa","swoop energy"],["Tracerie","tracer energy"],["Whirla","whirl energy"]
],
cuddly:[
["Daisy","daisy cuddle"],["Molly","molly cuddle"],["Lucy","lucy cuddle"],["Chloe","chloe cuddle"],["Rosie","rosie cuddle"],
["Lily","lily cuddle"],["Mia","mia cuddle"],["Ella","ella cuddle"],["Zoe","zoe cuddle"],["Cookie","cookie cuddle"],
["Honey","honey sweet"],["Sugar","sugar sweet"],["Cupcake","cupcake sweet"],["Bunny","bunny cuddle"],["Peach","peach sweet"],
["Marshmallow","marshmallow soft"],["Petal","petal soft"],["Waffles","waffles sweet"],["Buttercup","buttercup sweet"],["Fluffie","fluffy cuddle"],
["Ivy","ivy sweet"],["Joy","joy sweet"],["Bonnie","bonnie sweet"],["Clara","clara cuddle"],["Faye","faye cuddle"],
["Hope","hope sweet"],["Angel","angel sweet"],["Dandelion","dandelion soft"],["Nutmeg","nutmeg sweet"],["Sherrie","sherrie sweet"],
["Sweetie","sweetie sweet"],["Amy","amy cuddle"],["Elsa","elsa sweet"],["Lottie","lottie cuddle"],["Maisie","maisie cuddle"],
["Nellie","nellie cuddle"],["Posie","posie cuddle"],["Rosy","rosy cuddle"],["Tillie","tillie cuddle"],["Winnie","winnie cuddles"],
["Blossom","blossom sweet"],["Candi","candy sweet"],["Dottie","dottie cuddle"],["Florie","florie sweet"],["Goldie","golden sweet"],
["Honeypie","honeypie sweet"],["Jellybean","jellybean sweet"],["Lollie","lollipop sweet"],["Muffina","muffin soft"],["Snowie","snow soft"]
],
adventurous:[
["Scout","scout explorer"],["Wanderie","wandering explorer"],["Nomada","nomad wander"],["Journey","journey travel"],["Sailor","sailor explore"],
["Explorer","explorer name"],["Rogue","rogue spirit"],["Trailblaze","trailblazer"],["Odyssey","odyssey journey"],["Safari","safari explore"],
["Trekka","trek journey"],["Pioneer","pioneer spirit"],["Mariner","mariner explore"],["Navigator","navigator explore"],["Ranger","ranger explore"],
["Skye","skye adventure"],["Terra","terra explore"],["Vesta","vesta explore"],["Wilda","wilda explore"],["Adara","adara explore"],
["Bryn","bryn explore"],["Cara","cara explore"],["Dawn","dawn explore"],["Eira","eira explore"],["Farah","farah explore"],
["Galia","galia explore"],["Inara","inara explore"],["Kira","kira explore"],["Maeve","maeve explore"],["Nara","nara explore"],
["Petra","petra explore"],["Ramona","ramona explore"],["Sloane","sloane explore"],["Ursa","ursa explore"],["Valora","valora explore"],
["Wren","wren explore"],["Xandra","xandra explore"],["Zephyrine","zephyrine wind"],["Alora","alora explore"],["Corra","corra explore"],
["Drifter","drifting explorer"],["Hikerie","hiker explore"],["Jora","jora explore"],["Lirael","lirael explore"],["Oriel","oriel explore"],
["Quella","quella explore"],["Taja","taja explore"],["Yvonne","yvonne explore"],["Roamer","roaming explorer"],["Ventura","venture explore"]
],
shy:[
["Pearl","gentle pearl"],["Violet","gentle violet"],["Ada","gentle ada"],["Alice","gentle alice"],["Blair","gentle blair"],
["Celia","gentle celia"],["Daphne","gentle daphne"],["Flora","gentle flora"],["Grace","gentle grace"],["Hazel","gentle hazel"],
["Julia","gentle julia"],["Kate","gentle kate"],["Mae","gentle mae"],["Nora","gentle nora"],["Opal","gentle opal"],
["Ruth","gentle ruth"],["Serena","gentle serena"],["Thea","gentle thea"],["Vera","gentle vera"],["Agnes","gentle agnes"],
["Annabel","gentle annabel"],["Briar","gentle briar"],["Doris","gentle doris"],["Edna","gentle edna"],["Elara","gentle elara"],
["Esther","gentle esther"],["Geneva","gentle geneva"],["Helen","gentle helen"],["Inez","gentle inez"],["Lillian","gentle lillian"],
["Lorraine","gentle lorraine"],["Mabel","gentle mabel"],["Margaret","gentle margaret"],["Mary","gentle mary"],["Mildred","gentle mildred"],
["Mona","gentle mona"],["Olive","gentle olive"],["Pansy","gentle pansy"],["Phyllis","gentle phyllis"],["Rachel","gentle rachel"],
["Sadie","gentle sadie"],["Elowen","gentle elowen"],["Fenella","gentle fenella"],["Gwyneth","gentle gwyneth"],["Isolde","gentle isolde"],
["Lilaire","gentle lilaire"],["Marigold","gentle marigold"],["Primrose","gentle primrose"],["Rosalind","gentle rosalind"],["Seraphina","gentle seraphina"]
],
affectionate:[
["Abby","affectionate abby"],["Allie","affectionate allie"],["Anna","affectionate anna"],["Beth","affectionate beth"],["Carly","affectionate carly"],
["Emma","affectionate emma"],["Gabby","affectionate gabby"],["Hannah","affectionate hannah"],["Jessie","affectionate jessie"],["Katie","affectionate katie"],
["Kayla","affectionate kayla"],["Leah","affectionate leah"],["Maggie","affectionate maggie"],["Megan","affectionate megan"],["Nina","affectionate nina"],
["Sally","affectionate sally"],["Sarah","affectionate sarah"],["Stella","affectionate stella"],["Wendy","affectionate wendy"],["Amber","affectionate amber"],
["Becky","affectionate becky"],["Carol","affectionate carol"],["Cindy","affectionate cindy"],["Diana","affectionate diana"],["Ellen","affectionate ellen"],
["Erin","affectionate erin"],["Gina","affectionate gina"],["Heidi","affectionate heidi"],["Holly","affectionate holly"],["Jamie","affectionate jamie"],
["Linda","affectionate linda"],["Patty","affectionate patty"],["Shelby","affectionate shelby"],["Susie","affectionate susie"],["Taylor","affectionate taylor"],
["Tina","affectionate tina"],["Tracy","affectionate tracy"],["Whitney","affectionate whitney"],["Bella","affectionate bella"],["Brook","affectionate brook"],
["Eden","affectionate eden"],["Faith","affectionate faith"],["Georgia","affectionate georgia"],["Harper","affectionate harper"],["Isla","affectionate isla"],
["Kennedy","affectionate kennedy"],["Lexi","affectionate lexi"],["Madison","affectionate madison"],["Reagan","affectionate reagan"],["Trinity","affectionate trinity"],
["Willow","affectionate willow"]
]
},
french_bulldog:{
playful:[
["Trixie","tricky and playful"],["Roxy","rocking energy"],["Sassy","sassy and playful"],["Pixie","mischievous little sprite"],["Dizzy","dizzy energy"],
["Fizzy","bubbly energy"],["Zuzu","zesty play"],["Pippa","peppy play"],["Nixie","nixie play"],["Lolly","lollipop play"],
["Gigi","giggly play"],["Kiki","kiki play"],["Izzy","izzy play"],["Jojo","jojo play"],["Rikki","rickrack play"],
["Tally","tally play"],["Bree","breezy play"],["Diva","diva play"],["Hattie","happy play"],["Lacey","lacey play"],
["Zelly","zelly play"],["Marnie","merry and playful"],["Suki","suki play"],["Vivi","vibrant play"],["Yara","yara play"],
["Poppy","poppy play"],["Tink","tinkering fun"],["Clover","clover play"],["Holly","holly play"],["Maddy","mischievous play"],
["Ruby","ruby play"],["Star","star play"],["Tessa","tessa play"],["Zara","bright and playful"],["Nala","playful lioness"],
["Friska","frisky playful"],["Chica","chica playful"],["Bouncy","bouncy play"],["Lila","playful and lively"],["Dottie","spotted and playful"],
["Lulu","lively little one"],["Wiggles","wiggly play"],["Fifi","fifi play"],["Etta","etta play"],["Olive","olive play"],
["Skittie","skittish play"],["Squirtie","squirtie play"],["Binkie","binkie play"],["Nicky","nicky play"],["Flirt","flirt play"]
],
energetic:[
["Stormy","stormy energy"],["Ember","ember glow"],["Swift","swift speed"],["Zora","zora energy"],["Arrow","arrow speed"],
["Breeze","breezy energy"],["Dashie","dashie speed"],["Flame","flame energy"],["Gypsy","gypsy spirit"],["Indy","indy energy"],
["Kora","kora energy"],["Raven","raven speed"],["Sparkle","sparkle energy"],["Viva","viva energy"],["Windy","windy energy"],
["Xena","xena energy"],["Yola","yola energy"],["Aria","aria energy"],["Delta","delta energy"],["Echo","echo energy"],
["Fiera","fiera energy"],["Gale","gale energy"],["Jetta","jetta speed"],["Kaya","kaya energy"],["Maren","maren energy"],
["Piper","piper energy"],["Sierra","sierra energy"],["Wave","wave energy"],["Nova","new star energy"],["Blazie","blazing energy"],
["Halie","halie energy"],["Lira","lira energy"],["Misty","misty energy"],["Sagara","sagara energy"],["Tundra","tundra energy"],
["Runna","running energy"],["Streaka","streak energy"],["Torcha","torch energy"],["Volta","volt energy"],["Gusti","gust energy"],
["Skipperie","skipper energy"],["Swoopa","swoop energy"],["Tracerie","tracer energy"],["Whirla","whirl energy"],["Luna","luna energy"],
["Rina","rina energy"],["Nita","nita energy"],["Ronda","ronda energy"],["Zelma","zelma energy"]
],
cuddly:[
["Daisy","daisy cuddle"],["Molly","molly cuddle"],["Lucy","lucy cuddle"],["Chloe","chloe cuddle"],["Rosie","rosie cuddle"],
["Lily","lily cuddle"],["Mia","mia cuddle"],["Ella","ella cuddle"],["Zoe","zoe cuddle"],["Cookie","cookie cuddle"],
["Honey","honey sweet"],["Sugar","sugar sweet"],["Cupcake","cupcake sweet"],["Bunny","bunny cuddle"],["Peach","peach sweet"],
["Marshmallow","marshmallow soft"],["Petal","petal soft"],["Buttercup","buttercup sweet"],["Fluffie","fluffy cuddle"],["Ivy","ivy sweet"],
["Joy","joy sweet"],["Bonnie","bonnie sweet"],["Faye","faye cuddle"],["Hope","hope sweet"],["Angel","angel sweet"],
["Nutmeg","nutmeg sweet"],["Sweetie","sweetie sweet"],["Lottie","lottie cuddle"],["Maisie","maisie cuddle"],["Nellie","nellie cuddle"],
["Posie","posie cuddle"],["Rosy","rosy cuddle"],["Tillie","tillie cuddle"],["Blossom","blossom sweet"],["Candi","candy sweet"],
["Goldie","golden sweet"],["Jellybean","jellybean sweet"],["Muffin","muffin soft"],["Snowie","snow soft"],["Clover","clover cuddle"],
["Pebble","pebble cuddle"],["Waffles","waffles sweet"],["Amy","amy cuddle"],["Elsa","elsa sweet"],["Florie","florie sweet"],
["Honeypie","honeypie sweet"],["Lollie","lollipop sweet"],["Sunny","sunny cuddles"],["Tiny","tiny cuddle"],["Babe","babe cuddle"]
],
adventurous:[
["Scout","scout explorer"],["Wanderie","wandering explorer"],["Nomada","nomad wander"],["Journey","journey travel"],["Sailor","sailor explore"],
["Explorer","explorer name"],["Rogue","rogue spirit"],["Trailblaze","trailblazer"],["Odyssey","odyssey journey"],["Safari","safari explore"],
["Trekka","trek journey"],["Pioneer","pioneer spirit"],["Mariner","mariner explore"],["Navigator","navigator explore"],["Ranger","ranger explore"],
["Skye","skye adventure"],["Terra","terra explore"],["Vesta","vesta explore"],["Wilda","wilda explore"],["Adara","adara explore"],
["Bryn","bryn explore"],["Cara","cara explore"],["Dawn","dawn explore"],["Eira","eira explore"],["Farah","farah explore"],
["Galia","galia explore"],["Inara","inara explore"],["Kira","kira explore"],["Maeve","maeve explore"],["Nara","nara explore"],
["Petra","petra explore"],["Ramona","ramona explore"],["Sloane","sloane explore"],["Ursa","ursa explore"],["Valora","valora explore"],
["Wren","wren explore"],["Xandra","xandra explore"],["Alora","alora explore"],["Corra","corra explore"],["Drifter","drifting explorer"],
["Hikerie","hiker explore"],["Jora","jora explore"],["Lirael","lirael explore"],["Oriel","oriel explore"],["Quella","quella explore"],
["Taja","taja explore"],["Yvonne","yvonne explore"],["Roamer","roaming explorer"],["Ventura","venture explore"],["Zola","zola explore"]
],
shy:[
["Pearl","gentle pearl"],["Violet","gentle violet"],["Ada","gentle ada"],["Alice","gentle alice"],["Blair","gentle blair"],
["Celia","gentle celia"],["Daphne","gentle daphne"],["Flora","gentle flora"],["Grace","gentle grace"],["Hazel","gentle hazel"],
["Julia","gentle julia"],["Kate","gentle kate"],["Mae","gentle mae"],["Nora","gentle nora"],["Opal","gentle opal"],
["Ruth","gentle ruth"],["Serena","gentle serena"],["Thea","gentle thea"],["Vera","gentle vera"],["Agnes","gentle agnes"],
["Annabel","gentle annabel"],["Briar","gentle briar"],["Doris","gentle doris"],["Edna","gentle edna"],["Elara","gentle elara"],
["Esther","gentle esther"],["Geneva","gentle geneva"],["Helen","gentle helen"],["Inez","gentle inez"],["Lillian","gentle lillian"],
["Lorraine","gentle lorraine"],["Mabel","gentle mabel"],["Margaret","gentle margaret"],["Mary","gentle mary"],["Mildred","gentle mildred"],
["Mona","gentle mona"],["Pansy","gentle pansy"],["Phyllis","gentle phyllis"],["Rachel","gentle rachel"],["Elowen","gentle elowen"],
["Fenella","gentle fenella"],["Gwyneth","gentle gwyneth"],["Isolde","gentle isolde"],["Lilaire","gentle lilaire"],["Marigold","gentle marigold"],
["Primrose","gentle primrose"],["Rosalind","gentle rosalind"],["Seraphina","gentle seraphina"],["Thalia","gentle thalia"],["Winona","gentle winona"]
],
affectionate:[
["Abby","affectionate abby"],["Allie","affectionate allie"],["Anna","affectionate anna"],["Beth","affectionate beth"],["Carly","affectionate carly"],
["Emma","affectionate emma"],["Gabby","affectionate gabby"],["Hannah","affectionate hannah"],["Jessie","affectionate jessie"],["Katie","affectionate katie"],
["Kayla","affectionate kayla"],["Leah","affectionate leah"],["Maggie","affectionate maggie"],["Megan","affectionate megan"],["Nina","affectionate nina"],
["Sally","affectionate sally"],["Sarah","affectionate sarah"],["Stella","affectionate stella"],["Wendy","affectionate wendy"],["Amber","affectionate amber"],
["Becky","affectionate becky"],["Carol","affectionate carol"],["Cindy","affectionate cindy"],["Diana","affectionate diana"],["Ellen","affectionate ellen"],
["Erin","affectionate erin"],["Gina","affectionate gina"],["Heidi","affectionate heidi"],["Holly","affectionate holly"],["Jamie","affectionate jamie"],
["Linda","affectionate linda"],["Patty","affectionate patty"],["Shelby","affectionate shelby"],["Susie","affectionate susie"],["Taylor","affectionate taylor"],
["Tina","affectionate tina"],["Tracy","affectionate tracy"],["Whitney","affectionate whitney"],["Brook","affectionate brook"],["Eden","affectionate eden"],
["Faith","affectionate faith"],["Georgia","affectionate georgia"],["Harper","affectionate harper"],["Isla","affectionate isla"],["Kennedy","affectionate kennedy"],
["Lexi","affectionate lexi"],["Madison","affectionate madison"],["Reagan","affectionate reagan"],["Trinity","affectionate trinity"],["Willow","affectionate willow"],
["Rylee","affectionate rylee"]
]
},
chihuahua:{
playful:[
["Trixie","tricky and playful"],["Roxy","rocking energy"],["Sassys","sassy and playful"],["Pixie","mischievous little sprite"],["Dizzy","dizzy energy"],
["Fizzy","bubbly energy"],["Zuzu","zesty play"],["Pippa","peppy play"],["Nixie","nixie play"],["Lolly","lollipop play"],
["Gigi","giggly play"],["Kiki","kiki play"],["Izzy","izzy play"],["Jojo","jojo play"],["Rikki","rickrack play"],
["Tally","tally play"],["Bree","breezy play"],["Diva","diva play"],["Hattie","happy play"],["Lacey","lacey play"],
["Zelly","zelly play"],["Marnie","merry and playful"],["Suki","suki play"],["Vivi","vibrant play"],["Yara","yara play"],
["Poppy","poppy play"],["Tink","tinkering fun"],["Clover","clover play"],["Holly","holly play"],["Maddy","mischievous play"],
["Ruby","ruby play"],["Star","star play"],["Tessa","tessa play"],["Zara","bright and playful"],["Nala","playful lioness"],
["Friska","frisky playful"],["Chica","chica playful"],["Bouncy","bouncy play"],["Lila","playful and lively"],["Dottie","spotted and playful"],
["Lulu","lively little one"],["Wiggles","wiggly play"],["Fifi","fifi play"],["Etta","etta play"],["Olive","olive play"],
["Skittie","skittish play"],["Squirtie","squirtie play"],["Binkie","binkie play"],["Flirt","flirt play"],["Rascalina","playful rascal"]
],
energetic:[
["Stormy","stormy energy"],["Ember","ember glow"],["Swift","swift speed"],["Zora","zora energy"],["Arrow","arrow speed"],
["Breeze","breezy energy"],["Dashie","dashie speed"],["Flame","flame energy"],["Gypsy","gypsy spirit"],["Indy","indy energy"],
["Kora","kora energy"],["Raven","raven speed"],["Sparkle","sparkle energy"],["Viva","viva energy"],["Windy","windy energy"],
["Xena","xena energy"],["Yola","yola energy"],["Aria","aria energy"],["Delta","delta energy"],["Echo","echo energy"],
["Fiera","fiera energy"],["Gale","gale energy"],["Jetta","jetta speed"],["Kaya","kaya energy"],["Maren","maren energy"],
["Piper","piper energy"],["Sierra","sierra energy"],["Wave","wave energy"],["Nova","new star energy"],["Blazie","blazing energy"],
["Halie","halie energy"],["Lira","lira energy"],["Misty","misty energy"],["Sagara","sagara energy"],["Tundra","tundra energy"],
["Runna","running energy"],["Streaka","streak energy"],["Torcha","torch energy"],["Volta","volt energy"],["Gusti","gust energy"],
["Skipperie","skipper energy"],["Swoopa","swoop energy"],["Tracerie","tracer energy"],["Whirla","whirl energy"],["Luna","luna energy"],
["Rina","rina energy"],["Nita","nita energy"],["Ronda","ronda energy"],["Zelma","zelma energy"],["Flicker","flicker energy"]
],
cuddly:[
["Daisy","daisy cuddle"],["Molly","molly cuddle"],["Lucy","lucy cuddle"],["Chloe","chloe cuddle"],["Rosie","rosie cuddle"],
["Lily","lily cuddle"],["Mia","mia cuddle"],["Ella","ella cuddle"],["Zoe","zoe cuddle"],["Cookie","cookie cuddle"],
["Honey","honey sweet"],["Sugar","sugar sweet"],["Cupcake","cupcake sweet"],["Bunny","bunny cuddle"],["Peach","peach sweet"],
["Marshmallow","marshmallow soft"],["Petal","petal soft"],["Buttercup","buttercup sweet"],["Fluffie","fluffy cuddle"],["Ivy","ivy sweet"],
["Joy","joy sweet"],["Bonnie","bonnie sweet"],["Faye","faye cuddle"],["Hope","hope sweet"],["Angel","angel sweet"],
["Nutmeg","nutmeg sweet"],["Sweetie","sweetie sweet"],["Lottie","lottie cuddle"],["Maisie","maisie cuddle"],["Nellie","nellie cuddle"],
["Posie","posie cuddle"],["Rosy","rosy cuddle"],["Tillie","tillie cuddle"],["Blossom","blossom sweet"],["Candi","candy sweet"],
["Goldie","golden sweet"],["Jellybean","jellybean sweet"],["Muffin","muffin soft"],["Snowie","snow soft"],["Pebble","pebble cuddle"],
["Waffles","waffles sweet"],["Amy","amy cuddle"],["Elsa","elsa sweet"],["Florie","florie sweet"],["Honeypie","honeypie sweet"],
["Lollie","lollipop sweet"],["Sunny","sunny cuddles"],["Tiny","tiny cuddle"],["Babe","babe cuddle"],["Dimples","dimples cuddle"]
],
adventurous:[
["Scout","scout explorer"],["Wanderie","wandering explorer"],["Nomada","nomad wander"],["Journey","journey travel"],["Sailor","sailor explore"],
["Explorer","explorer name"],["Rogue","rogue spirit"],["Trailblaze","trailblazer"],["Odyssey","odyssey journey"],["Safari","safari explore"],
["Trekka","trek journey"],["Pioneer","pioneer spirit"],["Mariner","mariner explore"],["Navigator","navigator explore"],["Ranger","ranger explore"],
["Skye","skye adventure"],["Terra","terra explore"],["Vesta","vesta explore"],["Wilda","wilda explore"],["Adara","adara explore"],
["Bryn","bryn explore"],["Cara","cara explore"],["Dawn","dawn explore"],["Eira","eira explore"],["Farah","farah explore"],
["Galia","galia explore"],["Inara","inara explore"],["Kira","kira explore"],["Maeve","maeve explore"],["Nara","nara explore"],
["Petra","petra explore"],["Ramona","ramona explore"],["Sloane","sloane explore"],["Ursa","ursa explore"],["Valora","valora explore"],
["Wren","wren explore"],["Xandra","xandra explore"],["Alora","alora explore"],["Corra","corra explore"],["Drifter","drifting explorer"],
["Hikerie","hiker explore"],["Jora","jora explore"],["Lirael","lirael explore"],["Oriel","oriel explore"],["Quella","quella explore"],
["Taja","taja explore"],["Yvonne","yvonne explore"],["Roamer","roaming explorer"],["Ventura","venture explore"],["Zola","zola explore"]
],
shy:[
["Pearl","gentle pearl"],["Violet","gentle violet"],["Ada","gentle ada"],["Alice","gentle alice"],["Blair","gentle blair"],
["Celia","gentle celia"],["Daphne","gentle daphne"],["Flora","gentle flora"],["Grace","gentle grace"],["Hazel","gentle hazel"],
["Julia","gentle julia"],["Kate","gentle kate"],["Mae","gentle mae"],["Nora","gentle nora"],["Opal","gentle opal"],
["Ruth","gentle ruth"],["Serena","gentle serena"],["Thea","gentle thea"],["Vera","gentle vera"],["Agnes","gentle agnes"],
["Annabel","gentle annabel"],["Briar","gentle briar"],["Doris","gentle doris"],["Edna","gentle edna"],["Elara","gentle elara"],
["Esther","gentle esther"],["Geneva","gentle geneva"],["Helen","gentle helen"],["Inez","gentle inez"],["Lillian","gentle lillian"],
["Lorraine","gentle lorraine"],["Mabel","gentle mabel"],["Margaret","gentle margaret"],["Mary","gentle mary"],["Mildred","gentle mildred"],
["Mona","gentle mona"],["Pansy","gentle pansy"],["Phyllis","gentle phyllis"],["Rachel","gentle rachel"],["Elowen","gentle elowen"],
["Fenella","gentle fenella"],["Gwyneth","gentle gwyneth"],["Isolde","gentle isolde"],["Lilaire","gentle lilaire"],["Marigold","gentle marigold"],
["Primrose","gentle primrose"],["Rosalind","gentle rosalind"],["Seraphina","gentle seraphina"],["Thalia","gentle thalia"],["Winona","gentle winona"]
],
affectionate:[
["Abby","affectionate abby"],["Allie","affectionate allie"],["Anna","affectionate anna"],["Beth","affectionate beth"],["Carly","affectionate carly"],
["Emma","affectionate emma"],["Gabby","affectionate gabby"],["Hannah","affectionate hannah"],["Jessie","affectionate jessie"],["Katie","affectionate katie"],
["Kayla","affectionate kayla"],["Leah","affectionate leah"],["Maggie","affectionate maggie"],["Megan","affectionate megan"],["Nina","affectionate nina"],
["Sally","affectionate sally"],["Sarah","affectionate sarah"],["Stella","affectionate stella"],["Wendy","affectionate wendy"],["Amber","affectionate amber"],
["Becky","affectionate becky"],["Carol","affectionate carol"],["Cindy","affectionate cindy"],["Diana","affectionate diana"],["Ellen","affectionate ellen"],
["Erin","affectionate erin"],["Gina","affectionate gina"],["Heidi","affectionate heidi"],["Holly","affectionate holly"],["Jamie","affectionate jamie"],
["Linda","affectionate linda"],["Patty","affectionate patty"],["Shelby","affectionate shelby"],["Susie","affectionate susie"],["Taylor","affectionate taylor"],
["Tina","affectionate tina"],["Tracy","affectionate tracy"],["Whitney","affectionate whitney"],["Brook","affectionate brook"],["Eden","affectionate eden"],
["Faith","affectionate faith"],["Georgia","affectionate georgia"],["Harper","affectionate harper"],["Isla","affectionate isla"],["Kennedy","affectionate kennedy"],
["Lexi","affectionate lexi"],["Madison","affectionate madison"],["Reagan","affectionate reagan"],["Trinity","affectionate trinity"],["Willow","affectionate willow"],
["Rylee","affectionate rylee"]
]
},
german_shepherd:{
playful:[
["Trixie","tricky and playful"],["Roxy","rocking energy"],["Sassy","sassy and playful"],["Pixie","mischievous little sprite"],["Dizzy","dizzy energy"],
["Fizzy","bubbly energy"],["Zuzu","zesty play"],["Pippa","peppy play"],["Nixie","nixie play"],["Lolly","lollipop play"],
["Gigi","giggly play"],["Kiki","kiki play"],["Izzy","izzy play"],["Jojo","jojo play"],["Rikki","rickrack play"],
["Tally","tally play"],["Bree","breezy play"],["Diva","diva play"],["Hattie","happy play"],["Lacey","lacey play"],
["Zelly","zelly play"],["Marnie","merry and playful"],["Suki","suki play"],["Vivi","vibrant play"],["Yara","yara play"],
["Poppy","poppy play"],["Tink","tinkering fun"],["Clover","clover play"],["Holly","holly play"],["Maddy","mischievous play"],
["Ruby","ruby play"],["Star","star play"],["Tessa","tessa play"],["Zara","bright and playful"],["Nala","playful lioness"],
["Friska","frisky playful"],["Chica","chica playful"],["Bouncy","bouncy play"],["Lila","playful and lively"],["Dottie","spotted and playful"],
["Lulu","lively little one"],["Wiggles","wiggly play"],["Fifi","fifi play"],["Etta","etta play"],["Olive","olive play"],
["Skittie","skittish play"],["Squirtie","squirtie play"],["Binkie","binkie play"],["Flirt","flirt play"],["Mischie","mischievous"]
],
energetic:[
["Stormy","stormy energy"],["Ember","ember glow"],["Swift","swift speed"],["Zora","zora energy"],["Arrow","arrow speed"],
["Breeze","breezy energy"],["Dashie","dashie speed"],["Flame","flame energy"],["Gypsy","gypsy spirit"],["Indy","indy energy"],
["Kora","kora energy"],["Raven","raven speed"],["Sparkle","sparkle energy"],["Viva","viva energy"],["Windy","windy energy"],
["Xena","xena energy"],["Yola","yola energy"],["Aria","aria energy"],["Delta","delta energy"],["Echo","echo energy"],
["Fiera","fiera energy"],["Gale","gale energy"],["Jetta","jetta speed"],["Kaya","kaya energy"],["Maren","maren energy"],
["Piper","piper energy"],["Sierra","sierra energy"],["Wave","wave energy"],["Nova","new star energy"],["Blazie","blazing energy"],
["Halie","halie energy"],["Lira","lira energy"],["Misty","misty energy"],["Sagara","sagara energy"],["Tundra","tundra energy"],
["Runna","running energy"],["Streaka","streak energy"],["Torcha","torch energy"],["Volta","volt energy"],["Gusti","gust energy"],
["Skipperie","skipper energy"],["Swoopa","swoop energy"],["Tracerie","tracer energy"],["Whirla","whirl energy"],["Flicker","flicker energy"],
["Rina","rina energy"],["Nita","nita energy"],["Ronda","ronda energy"],["Zelma","zelma energy"],["Bronte","thunder energy"]
],
cuddly:[
["Daisy","daisy cuddle"],["Molly","molly cuddle"],["Lucy","lucy cuddle"],["Chloe","chloe cuddle"],["Rosie","rosie cuddle"],
["Lily","lily cuddle"],["Mia","mia cuddle"],["Ella","ella cuddle"],["Zoe","zoe cuddle"],["Cookie","cookie cuddle"],
["Honey","honey sweet"],["Sugar","sugar sweet"],["Cupcake","cupcake sweet"],["Bunny","bunny cuddle"],["Peach","peach sweet"],
["Marshmallow","marshmallow soft"],["Petal","petal soft"],["Buttercup","buttercup sweet"],["Fluffie","fluffy cuddle"],["Ivy","ivy sweet"],
["Joy","joy sweet"],["Bonnie","bonnie sweet"],["Faye","faye cuddle"],["Hope","hope sweet"],["Angel","angel sweet"],
["Nutmeg","nutmeg sweet"],["Sweetie","sweetie sweet"],["Lottie","lottie cuddle"],["Maisie","maisie cuddle"],["Nellie","nellie cuddle"],
["Posie","posie cuddle"],["Rosy","rosy cuddle"],["Tillie","tillie cuddle"],["Blossom","blossom sweet"],["Candi","candy sweet"],
["Goldie","golden sweet"],["Jellybean","jellybean sweet"],["Muffin","muffin soft"],["Snowie","snow soft"],["Pebble","pebble cuddle"],
["Waffles","waffles sweet"],["Amy","amy cuddle"],["Elsa","elsa sweet"],["Florie","florie sweet"],["Honeypie","honeypie sweet"],
["Lollie","lollipop sweet"],["Sunny","sunny cuddles"],["Tiny","tiny cuddle"],["Babe","babe cuddle"],["Dimples","dimples cuddle"]
],
adventurous:[
["Scout","scout explorer"],["Wanderie","wandering explorer"],["Nomada","nomad wander"],["Journey","journey travel"],["Sailor","sailor explore"],
["Explorer","explorer name"],["Rogue","rogue spirit"],["Trailblaze","trailblazer"],["Odyssey","odyssey journey"],["Safari","safari explore"],
["Trekka","trek journey"],["Pioneer","pioneer spirit"],["Mariner","mariner explore"],["Navigator","navigator explore"],["Ranger","ranger explore"],
["Skye","skye adventure"],["Terra","terra explore"],["Vesta","vesta explore"],["Wilda","wilda explore"],["Adara","adara explore"],
["Bryn","bryn explore"],["Cara","cara explore"],["Dawn","dawn explore"],["Eira","eira explore"],["Farah","farah explore"],
["Galia","galia explore"],["Inara","inara explore"],["Kira","kira explore"],["Maeve","maeve explore"],["Nara","nara explore"],
["Petra","petra explore"],["Ramona","ramona explore"],["Sloane","sloane explore"],["Ursa","ursa explore"],["Valora","valora explore"],
["Wren","wren explore"],["Xandra","xandra explore"],["Alora","alora explore"],["Corra","corra explore"],["Drifter","drifting explorer"],
["Hikerie","hiker explore"],["Jora","jora explore"],["Lirael","lirael explore"],["Oriel","oriel explore"],["Quella","quella explore"],
["Taja","taja explore"],["Yvonne","yvonne explore"],["Roamer","roaming explorer"],["Ventura","venture explore"],["Zola","zola explore"]
],
shy:[
["Pearl","gentle pearl"],["Violet","gentle violet"],["Ada","gentle ada"],["Alice","gentle alice"],["Blair","gentle blair"],
["Celia","gentle celia"],["Daphne","gentle daphne"],["Flora","gentle flora"],["Grace","gentle grace"],["Hazel","gentle hazel"],
["Julia","gentle julia"],["Kate","gentle kate"],["Mae","gentle mae"],["Nora","gentle nora"],["Opal","gentle opal"],
["Ruth","gentle ruth"],["Serena","gentle serena"],["Thea","gentle thea"],["Vera","gentle vera"],["Agnes","gentle agnes"],
["Annabel","gentle annabel"],["Briar","gentle briar"],["Doris","gentle doris"],["Edna","gentle edna"],["Elara","gentle elara"],
["Esther","gentle esther"],["Geneva","gentle geneva"],["Helen","gentle helen"],["Inez","gentle inez"],["Lillian","gentle lillian"],
["Lorraine","gentle lorraine"],["Mabel","gentle mabel"],["Margaret","gentle margaret"],["Mary","gentle mary"],["Mildred","gentle mildred"],
["Mona","gentle mona"],["Pansy","gentle pansy"],["Phyllis","gentle phyllis"],["Rachel","gentle rachel"],["Elowen","gentle elowen"],
["Fenella","gentle fenella"],["Gwyneth","gentle gwyneth"],["Isolde","gentle isolde"],["Lilaire","gentle lilaire"],["Marigold","gentle marigold"],
["Primrose","gentle primrose"],["Rosalind","gentle rosalind"],["Seraphina","gentle seraphina"],["Thalia","gentle thalia"],["Winona","gentle winona"]
],
affectionate:[
["Abby","affectionate abby"],["Allie","affectionate allie"],["Anna","affectionate anna"],["Beth","affectionate beth"],["Carly","affectionate carly"],
["Emma","affectionate emma"],["Gabby","affectionate gabby"],["Hannah","affectionate hannah"],["Jessie","affectionate jessie"],["Katie","affectionate katie"],
["Kayla","affectionate kayla"],["Leah","affectionate leah"],["Maggie","affectionate maggie"],["Megan","affectionate megan"],["Nina","affectionate nina"],
["Sally","affectionate sally"],["Sarah","affectionate sarah"],["Stella","affectionate stella"],["Wendy","affectionate wendy"],["Amber","affectionate amber"],
["Becky","affectionate becky"],["Carol","affectionate carol"],["Cindy","affectionate cindy"],["Diana","affectionate diana"],["Ellen","affectionate ellen"],
["Erin","affectionate erin"],["Heidi","affectionate heidi"],["Holly","affectionate holly"],["Jamie","affectionate jamie"],["Linda","affectionate linda"],
["Patty","affectionate patty"],["Shelby","affectionate shelby"],["Susie","affectionate susie"],["Taylor","affectionate taylor"],["Tina","affectionate tina"],
["Tracy","affectionate tracy"],["Whitney","affectionate whitney"],["Brook","affectionate brook"],["Eden","affectionate eden"],["Faith","affectionate faith"],
["Georgia","affectionate georgia"],["Harper","affectionate harper"],["Isla","affectionate isla"],["Kennedy","affectionate kennedy"],["Lexi","affectionate lexi"],
["Madison","affectionate madison"],["Reagan","affectionate reagan"],["Trinity","affectionate trinity"],["Willow","affectionate willow"],["Rylee","affectionate rylee"]
]
}
},
};

const BREEDS=[['all','All'],['golden_retriever','Golden Retriever'],['labrador','Labrador'],['french_bulldog','French Bulldog'],['chihuahua','Chihuahua'],['german_shepherd','German Shepherd']];
const TRAITS=[['all','All'],['playful','Playful'],['energetic','Energetic'],['cuddly','Cuddly'],['adventurous','Adventurous'],['shy','Shy'],['affectionate','Affectionate']];

const popState={gender:'male',breed:'all',trait:'all'};
let popRendered=false;

function renderPopular(){
if(popRendered)return;
popRendered=true;

document.querySelectorAll('.gender-tab').forEach(tab=>{
tab.addEventListener('click',()=>{
document.querySelectorAll('.gender-tab').forEach(t=>t.classList.remove('active'));
tab.classList.add('active');
popState.gender=tab.dataset.gender;
popState.breed='all';
popState.trait='all';
renderBreedPills();
renderTraitPills();
renderFilteredNames();
});
});

const genBtn=document.getElementById('genBtn');
if(genBtn){
genBtn.addEventListener('click',renderFilteredNames);
}

renderBreedPills();
renderTraitPills();
renderFilteredNames();
}

if(document.getElementById('breedPills'))renderPopular();

function renderBreedPills(){
const el=document.getElementById('breedPills');
el.innerHTML=BREEDS.map(b=>
`<button class="filter-pill${b[0]==='all'?' active':''}" data-val="${b[0]}">${b[1]}</button>`
).join('');
el.querySelectorAll('.filter-pill').forEach(p=>{
p.addEventListener('click',()=>{
el.querySelectorAll('.filter-pill').forEach(pp=>pp.classList.remove('active'));
p.classList.add('active');
popState.breed=p.dataset.val;
popState.trait='all';
renderTraitPills();
renderFilteredNames();
});
});
}

function renderTraitPills(){
const el=document.getElementById('traitPills');
el.innerHTML=TRAITS.map(t=>
`<button class="filter-pill${t[0]==='all'?' active':''}" data-val="${t[0]}">${t[1]}</button>`
).join('');
el.querySelectorAll('.filter-pill').forEach(p=>{
p.addEventListener('click',()=>{
el.querySelectorAll('.filter-pill').forEach(pp=>pp.classList.remove('active'));
p.classList.add('active');
popState.trait=p.dataset.val;
renderFilteredNames();
});
});
}

function renderFilteredNames(){
const grid=document.getElementById('nameGrid');
let names=[];
const g=popState.gender;
const b=popState.breed;
const t=popState.trait;

console.log('=== DEBUG INFO ===');
console.log('Filter state:', { gender: g, breed: b, trait: t });

// ===========================================
// 需求说明：
// 1. Male Puppy Names只显示公 
// 2. Female Puppy Names只显示母 
// 3. 选择了特定 breed + trait → 只显示该组合的名字 
// 4. 只选择了特定 breed → 显示该 breed 下所有 trait 的名字 
// 5. 只选择了特定 trait → 显示所有 breed 下该 trait 的名字 
// 6. 都选的是 all → 显示所有名字 
// 7. 选breed下的 all → 显示该性别下所有名字（即breed=all, trait=all）
// 8. 选trait下的 all → 显示该 breed 下所有 trait 的名字
// ===========================================

if (b !== 'all' && t !== 'all') {
  // Case 1: 选择了特定 breed + trait → 只显示该组合的名字
  console.log('Case 1: Specific breed + trait');
  if (POP_NAMES[g] && POP_NAMES[g][b] && POP_NAMES[g][b][t]) {
    names = POP_NAMES[g][b][t].slice();
  }
} else if (b !== 'all') {
  // Case 2: 只选择了特定 breed (trait=all) → 显示该 breed 下所有 trait 的名字
  console.log('Case 2: Specific breed only');
  if (POP_NAMES[g] && POP_NAMES[g][b]) {
    Object.keys(POP_NAMES[g][b]).forEach(trait => {
      if (Array.isArray(POP_NAMES[g][b][trait])) {
        names = names.concat(POP_NAMES[g][b][trait]);
      }
    });
  }
} else if (t !== 'all') {
  // Case 3: 只选择了特定 trait (breed=all) → 显示所有 breed 下该 trait 的名字
  console.log('Case 3: Specific trait only');
  if (POP_NAMES[g]) {
    Object.keys(POP_NAMES[g]).forEach(breed => {
      if (POP_NAMES[g][breed] && Array.isArray(POP_NAMES[g][breed][t])) {
        names = names.concat(POP_NAMES[g][breed][t]);
      }
    });
  }
} else {
  // Case 4: 都选的是 all → 显示该性别下所有名字
  console.log('Case 4: All (breed=all, trait=all)');
  if (POP_NAMES[g]) {
    Object.keys(POP_NAMES[g]).forEach(breed => {
      if (POP_NAMES[g][breed]) {
        Object.keys(POP_NAMES[g][breed]).forEach(trait => {
          if (Array.isArray(POP_NAMES[g][breed][trait])) {
            names = names.concat(POP_NAMES[g][breed][trait]);
          }
        });
      }
    });
  }
}

console.log('Total names found:', names.length);
if (names.length > 0) {
  console.log('First 3 names:', names.slice(0, 3));
}

// 去重
const seen = new Set();
names = names.filter(n => {
  if (!n || !n[0]) return false;
  if (seen.has(n[0])) return false;
  seen.add(n[0]);
  return true;
});

// 随机打乱并只取前24个
names = [...names].sort(() => Math.random() - 0.5).slice(0, 24);
console.log('Final names to display:', names.length);
console.log('=== END DEBUG ===');

const favs = getFavs();
grid.innerHTML = names.map(n => {
  const liked = favs.includes(n[0]);
  return `<div class="name-card"><span class="heart${liked?' liked':''}" data-name="${n[0]}" aria-label="Favorite ${n[0]}"><svg viewBox="0 0 24 24" role="img" aria-label="Heart icon"><path fill="currentColor" d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/></svg></span><div class="name color-popular">${n[0]}</div><div class="meaning">${n[1]}</div></div>`;
}).join('');

grid.querySelectorAll('.heart').forEach(h => {
  h.addEventListener('click', () => {
    const name = h.dataset.name;
    const isLiked = h.classList.toggle('liked');
    saveFav(name, isLiked);
    if (typeof updateDlBtn === 'function') updateDlBtn();
    if (typeof updatePhotoDlBtn === 'function') updatePhotoDlBtn();
  });
});
}

// AI Photo Match
const photoInput=document.getElementById('photoInput');
const uploadPlaceholder=document.getElementById('uploadPlaceholder');
const photoPreview=document.getElementById('photoPreview');
const previewImg=document.getElementById('previewImg');
const photoCanvas=document.getElementById('photoCanvas');
const detectedFeatures=document.getElementById('detectedFeatures');
const photoResults=document.getElementById('photoResults');
const photoNameGrid=document.getElementById('photoNameGrid');

if(uploadPlaceholder){
uploadPlaceholder.addEventListener('click',()=>photoInput.click());
uploadPlaceholder.addEventListener('dragover',e=>{e.preventDefault();uploadPlaceholder.style.background='#faf5f0'});
uploadPlaceholder.addEventListener('dragleave',()=>{uploadPlaceholder.style.background=''});
uploadPlaceholder.addEventListener('drop',e=>{
e.preventDefault();
uploadPlaceholder.style.background='';
if(e.dataTransfer.files.length)handlePhoto(e.dataTransfer.files[0]);
});
}
if(photoInput)photoInput.addEventListener('change',e=>{if(e.target.files.length)handlePhoto(e.target.files[0])});

function handlePhoto(file){
if(!file.type.startsWith('image/'))return;
const reader=new FileReader();
reader.onload=e=>{
previewImg.src=e.target.result;
photoPreview.style.display='block';
uploadPlaceholder.style.display='none';
photoResults.style.display='none';
detectedFeatures.innerHTML='';
};
reader.readAsDataURL(file);
}

const photoDeleteBtn=document.getElementById('photoDeleteBtn');
if(photoDeleteBtn)photoDeleteBtn.addEventListener('click',()=>{
const pp=document.getElementById('photoPreview');
const up=document.getElementById('uploadPlaceholder');
const pr=document.getElementById('photoResults');
const df=document.getElementById('detectedFeatures');
const pi=document.getElementById('photoInput');
if(pp)pp.style.display='none';
if(up)up.style.display='';
if(pr)pr.style.display='none';
if(df)df.innerHTML='';
if(pi)pi.value='';
});

const genPhotoBtn=document.getElementById('genPhotoBtn');
if(genPhotoBtn)genPhotoBtn.addEventListener('click',()=>{
const img=new Image();
img.onload=()=>{
const canvas=photoCanvas;
canvas.width=img.width;
canvas.height=img.height;
const ctx=canvas.getContext('2d');
ctx.drawImage(img,0,0);
const features=analyzeImage(ctx,img.width,img.height);
showFeatures(features);
const names=generatePhotoNames(features);
showPhotoNames(names);
};
img.src=previewImg.src;
});

function analyzeImage(ctx,w,h){
const features={
colors:[],
brightness:'medium',
pattern:'solid',
size:'medium',
vibe:'friendly',
energy:'medium'
};

const step=Math.max(1,Math.floor(w*h/15000));
const pixels=ctx.getImageData(0,0,w,h).data;
let rTotal=0,gTotal=0,bTotal=0,count=0;

const colorBuckets={
black:0,
brown:0,
golden:0,
white:0,
cream:0,
red:0,
gray:0,
tan:0,
chocolate:0,
blue:0,
merle:0
};

for(let i=0;i<pixels.length;i+=4*step){
const r=pixels[i],g=pixels[i+1],b=pixels[i+2],a=pixels[i+3];
if(a<128)continue;

rTotal+=r;gTotal+=g;bTotal+=b;count++;

const hsl=rgbToHsl(r,g,b);
const [h,s,l]=hsl;

if(l<0.12)colorBuckets.black++;
else if(l>0.88)colorBuckets.white++;
else if(h>=20&&h<=40&&s>0.15&&l>0.25&&l<0.55)colorBuckets.brown++;
else if(h>=15&&h<=30&&s>0.1&&l>0.4&&l<0.7)colorBuckets.tan++;
else if(h>=30&&h<=55&&s>0.15&&l>0.5&&l<0.8)colorBuckets.golden++;
else if(h>=0&&h<=15&&s>0.25&&l>0.3&&l<0.6)colorBuckets.red++;
else if(s<0.12&&l>0.35&&l<0.7)colorBuckets.gray++;
else if(h>=25&&h<=50&&s>0.1&&l>0.65&&l<0.88)colorBuckets.cream++;
else if(h>=20&&h<=35&&s>0.2&&l>0.2&&l<0.45)colorBuckets.chocolate++;
else if(h>=180&&h<=260&&s>0.15&&l>0.3&&l<0.6)colorBuckets.blue++;
}

const brightness=rTotal/(count*255);
features.brightness=brightness>0.68?'light':brightness>0.42?'medium':'dark';

const sorted=Object.entries(colorBuckets).sort((a,b)=>b[1]-a[1]);
const topColors=sorted.filter((_,i)=>i<3&&_[1]>0).map(e=>e[0]);
features.colors=topColors;

const regions=5;
const regionColors=[];
for(let ry=0;ry<regions;ry++){
for(let rx=0;rx<regions;rx++){
const sx=Math.floor(w*rx/regions),sy=Math.floor(h*ry/regions);
const sw=Math.floor(w/regions),sh=Math.floor(h/regions);
const regionData=ctx.getImageData(sx,sy,sw,sh).data;
let rr=0,gg=0,bb=0,c=0;
for(let j=0;j<regionData.length;j+=20){
rr+=regionData[j];gg+=regionData[j+1];bb+=regionData[j+2];c++;
}
regionColors.push([rr/c,gg/c,bb/c]);
}
}
let variance=0;
for(let i=0;i<regionColors.length;i++){
for(let j=i+1;j<regionColors.length;j++){
variance+=Math.abs(regionColors[i][0]-regionColors[j][0])+Math.abs(regionColors[i][1]-regionColors[j][1])+Math.abs(regionColors[i][2]-regionColors[j][2]);
}
}
variance/=(regionColors.length*(regionColors.length-1)/2);
features.pattern=variance>100?'spotted':variance>50?'mixed':'solid';

if(variance>70&&features.colors.includes('black')&&(features.colors.includes('tan')||features.colors.includes('brown'))){
features.colors.push('blackTan');
}

const satTotal=sorted.reduce((sum,[_,cnt])=>sum+cnt,0);
if(variance>120&&satTotal>50){
features.colors.push('merle');
}

if(w*h>400000)features.size='large';
else if(w*h<150000)features.size='small';

if(brightness>0.65)features.energy='high';
else if(brightness<0.45)features.energy='calm';

if(features.pattern==='spotted'||features.pattern==='mixed')features.vibe='playful';
else if(features.brightness==='dark')features.vibe='mysterious';

return features;
}

function rgbToHsl(r,g,b){
r/=255;g/=255;b/=255;
const max=Math.max(r,g,b),min=Math.min(r,g,b);
let h,s,l=(max+min)/2;
if(max===min){h=s=0}else{
const d=max-min;
s=l>0.5?d/(2-max-min):d/(max+min);
switch(max){
case r:h=((g-b)/d+(g<b?6:0))/6;break;
case g:h=((b-r)/d+2)/6;break;
case b:h=((r-g)/d+4)/6;break;
}
}
return[h,s,l];
}

function showFeatures(f){
const tags=[];
const labels={
black:'Black',
brown:'Brown',
golden:'Golden',
white:'White',
cream:'Cream',
red:'Red/Orange',
gray:'Gray',
tan:'Tan',
chocolate:'Chocolate',
blue:'Blue',
blackTan:'Black & Tan',
spotted:'Spotted',
merle:'Merle'
};
f.colors.forEach(c=>{
if(labels[c])tags.push(`<span class="feature-tag">${labels[c]}</span>`);
});
tags.push(`<span class="feature-tag">${f.brightness==='light'?'Light Coat':f.brightness==='dark'?'Dark Coat':'Medium Coat'}</span>`);
tags.push(`<span class="feature-tag">${f.pattern==='spotted'?'Spotted/Multi':f.pattern==='mixed'?'Mixed Colors':'Solid Color'}</span>`);
tags.push(`<span class="feature-tag">${f.size==='large'?'Large Build':f.size==='small'?'Small & Cute':'Medium Size'}</span>`);
tags.push(`<span class="feature-tag">${f.vibe==='playful'?'Playful Vibe':f.vibe==='mysterious'?'Mysterious':'Friendly'}</span>`);
tags.push(`<span class="feature-tag">${f.energy==='high'?'Energetic':f.energy==='calm'?'Calm':'Balanced Energy'}</span>`);
detectedFeatures.innerHTML=tags.join('');
}

const PHOTO_NAMES={
black:[["Shadow","dark & mysterious"],["Onyx","black gemstone"],["Raven","dark bird"],["Midnight","dark as night"],["Noir","black in French"],["Pepper","spicy black"],["Jet","black stone"],["Sable","dark beauty"],["Bear","strong & dark"],["Coal","black as coal"],["Vader","dark side"],["Batman","dark knight"],["Eclipse","dark shadow"],["Phantom","ghostly"],["Magic","magical"],["Storm","stormy"],["Dusk","evening time"],["Obsidian","black glass"],["Shade","darkness"],["Nero","black in Italian"]],
brown:[["Bear","strong brown"],["Cocoa","chocolate"],["Mocha","coffee"],["Hazel","warm brown"],["Bruno","brown"],["Rusty","reddish brown"],["Woody","wood"],["Chestnut","brown nut"],["Cinnamon","spice"],["Copper","metallic brown"],["Maple","warm autumn"],["Tawny","brownish-orange"],["Sienna","earth pigment"],["Fudge","chocolate"],["Truffle","earthy"],["Biscuit","golden brown"],["Pretzel","twisted brown"],["Tobacco","warm brown"],["Walnut","brown nut"],["Cedar","wood"]],
golden:[["Goldie","golden beauty"],["Sunny","bright & warm"],["Honey","sweet & golden"],["Butters","golden smooth"],["Amber","golden gem"],["Marigold","golden flower"],["Caramel","sweet & warm"],["Toffee","golden brown"],["Penny","copper coin"],["Autumn","fall colors"],["Nugget","golden treasure"],["Saffron","golden spice"],["Pumpkin","orange squash"],["Biscuit","golden baked"],["Wheat","golden grain"],["Dakota","friendly one"],["Blondie","golden hair"],["Honeycomb","sweet gold"],["Goldrush","golden fever"],["Sandy","beach tones"]],
white:[["Snow","white as snow"],["Pearl","precious gem"],["Ghost","white spirit"],["Casper","friendly ghost"],["Ivory","white material"],["Cloud","fluffy white"],["Cotton","soft white"],["Angel","heavenly"],["Lily","pure white"],["Dove","peaceful white"],["Frost","icy white"],["Blizzard","snow storm"],["Marshmallow","soft white"],["Sugar","sweet white"],["Coconut","white tropical"],["Vanilla","sweet cream"],["Alaska","frozen white"],["Winter","cold season"],["Polar","arctic white"],["Yeti","mythical creature"]],
cream:[["Cream","smooth"],["Vanilla","sweet"],["Biscuit","warm baked"],["Peanut","small & lovable"],["Butter","smooth"],["Latte","coffee"],["Caramel","sweet"],["Toffee","golden"],["Honey","sweet"],["Peach","soft"],["Daisy","day's eye"],["Hazel","warm"],["Maple","warm autumn"],["Sandy","beach tones"],["Blondie","golden hair"],["Butterscotch","sweet"],["Nougat","sweet"],["Almond","nut"],["Cashew","nut"],["Mochi","soft rice cake"]],
red:[["Rusty","reddish"],["Ruby","precious red gem"],["Scarlet","red"],["Ginger","spiced warmth"],["Red","simple & bold"],["Cherry","red fruit"],["Copper","metallic"],["Fox","clever red"],["Phoenix","fire bird"],["Ember","glowing"],["Blaze","fiery"],["Fire","hot"],["Crimson","deep red"],["Rowan","red tree"],["Mars","red planet"],["Rocket","fast"],["Cayenne","spicy"],["Paprika","spice"],["Salsa","spicy"],["Chili","hot pepper"]],
gray:[["Shadow","dark"],["Storm","stormy"],["Ash","ash gray"],["Smokey","smoky"],["Silver","metallic"],["Dusty","dusty"],["Wolf","wild"],["Earl","noble"],["Slate","rock gray"],["Misty","foggy"],["Pewter","metal"],["Granite","stone"],["Fog","misty"],["Smoke","smoky"],["Thunder","loud"],["Cloud","fluffy"],["Moon","night"],["Mercury","planet"],["Steel","strong"],["Graphite","dark gray"]],
tan:[["Teddy","teddy bear"],["Honey","sweet"],["Sandy","beach"],["Caramel","sweet"],["Toffee","golden"],["Peanut","nutty"],["Butterscotch","sweet"],["Biscuit","baked"],["Maple","syrup"],["Hazel","nut"],["Sunny","bright"],["Nugget","treasure"],["Muffin","sweet treat"],["Scout","adventurous"],["Winnie","friendly bear"],["Bear","teddy"],["Paws","puppy paws"],["Buddy","best friend"],["Charlie","friendly"],["Max","greatest"]],
chocolate:[["Cocoa","chocolate"],["Mocha","coffee"],["Fudge","sweet"],["Truffle","rich"],["Brownie","brown treat"],["Chocolate","delicious"],["Cacao","cocoa bean"],["Hershey","chocolate"],["Mousse","creamy"],["Pudding","sweet"],["Snickers","nutty"],["Kona","coffee"],["Java","coffee"],["Bean","cocoa bean"],["Nib","chocolate nib"],["Coco","chocolatey"],["Choc","chocolate"],["Chip","chocolate chip"],["Cookie","sweet cookie"],["Brown","chocolate brown"]],
blue:[["Blue","blue color"],["Sky","clear sky"],["Ocean","deep blue"],["Navy","dark blue"],["Indigo","deep color"],["Cobalt","blue metal"],["Sapphire","blue gem"],["Azure","bright blue"],["Iris","blue flower"],["Lapis","blue stone"],["Bluebell","blue flower"],["Denim","blue fabric"],["Nile","blue river"],["Stormy","stormy blue"],["Bluey","blue pup"],["Cyan","blue-green"],["Teal","blue-green"],["Aqua","water blue"],["Cerulean","sky blue"],["Periwinkle","light blue"]],
blackTan:[["Rottweiler","strong breed"],["Doberman","elegant"],["German Shepherd","loyal"],["Beau","handsome"],["Bandit","masked"],["Zorro","masked hero"],["Domino","black & white"],["Oreo","cookie"],["Tuxedo","formal wear"],["Checkers","game"],["Chess","strategy game"],["Panda","black & white"],["Snoopy","famous beagle"],["Mickey","mouse"],["Felix","cat"],["Knight","chess piece"],["Pawn","chess piece"],["Rook","chess piece"],["Bishop","chess piece"],["King","royal"]],
merle:[["Merle","unique pattern"],["Marble","swirled stone"],["Mosaic","art pattern"],["Patchwork","sewn patches"],["Speckle","dots"],["Freckle","spots"],["Spot","spotted"],["Dotty","dotted"],["Pixel","digital"],["Confetti","colorful"],["Rainbow","many colors"],["Kaleidoscope","changing patterns"],["Mystery","mysterious"],["Magic","magical"],["Enigma","puzzle"],["Riddle","brain teaser"],["Puzzle","mind game"],["Jigsaw","puzzle"],["Mosaic","art"],["Collage","collection"]],
spotted:[["Domino","black & white"],["Patches","patchy"],["Spot","spotted"],["Puzzle","puzzle"],["Mosaic","art"],["Pixel","digital"],["Dotty","dotted"],["Speckle","speckled"],["Freckle","freckled"],["Confetti","colorful"],["Dice","game dice"],["Polka","dots"],["Checker","checkered"],["Checkerboard","pattern"],["Dalmation","spotted dog"],["Pongo","101 dalmations"],["Perdita","101 dalmations"],["Patch","patch"],["Spotty","spotted"],["Freckles","freckled"]],
dark:[["Shadow","dark"],["Midnight","night"],["Phantom","ghostly"],["Noir","black"],["Raven","dark bird"],["Dusk","evening"],["Eclipse","shadow"],["Obsidian","black glass"],["Shade","darkness"],["Onyx","black gem"],["Vader","dark side"],["Batman","dark knight"],["Darko","dark one"],["Nero","black"],["Nuit","night in French"],["Evening","night time"],["Twilight","dusk"],["Night","dark night"],["Moonlight","moon glow"],["Starlight","stars"]],
playful:[["Rascal","playful troublemaker"],["Buster","fun-loving"],["Scooter","zippy"],["Jax","playful spirit"],["Ziggy","zesty"],["Rocco","playful rascal"],["Pip","peppy"],["Hopper","full of hops"],["Jester","funny jokester"],["Gizmo","quirky"],["Trouble","mischief"],["Mischief","playful trouble"],["Chaos","wild fun"],["Turbo","fast"],["Bolt","lightning"],["Flash","quick"],["Dash","speedy"],["Zoom","zoom"],["Whiz","witty"],["Spark","energy"]],
small:[["Tiny","very small"],["Mini","miniature"],["Peewee","tiny"],["Squirt","small one"],["Nugget","small treasure"],["Munchkin","small"],["Bitty","little bit"],["Pixie","tiny fairy"],["Tink","tinkerbell"],["Sprite","spirit"],["Niblet","small nibble"],["Peanut","small nut"],["Bean","small bean"],["Pip","small seed"],["Sprocket","small gear"],["Widget","small gadget"],["Gizmo","small device"],["Cubby","small space"],["Pocket","fits in pocket"],["Thumbelina","tiny girl"]],
large:[["Tank","strong"],["Titan","giant"],["Goliath","big guy"],["Moose","large"],["Bear","big bear"],["Mammoth","huge"],["Giant","very large"],["Maximus","greatest"],["Hercules","strong"],["Thor","thunder god"],["Odin","wise god"],["Zeus","king of gods"],["Atlas","strong"],["Colossus","giant statue"],["Jumbo","very big"],["Biggie","big"],["Hulk","strong green"],["Sumo","wrestler"],["Kong","giant ape"],["Brutus","strong"]],
calm:[["Zen","peaceful"],["Chill","relaxed"],["Mellow","calm"],["Serenity","peace"],["Tranquil","calm"],["Harmony","balance"],["Peace","calm"],["Calm","serene"],["Quiet","peaceful"],["Buddha","enlightened"],["Yogi","peaceful"],["Meditation","calm"],["Muse","inspiration"],["Dream","peaceful dream"],["Cloud","fluffy"],["Breeze","gentle wind"],["River","calm water"],["Lake","still water"],["Ocean","deep calm"],["Moon","peaceful"]],
energetic:[["Turbo","turbo"],["Rocket","fast"],["Bolt","lightning"],["Flash","quick"],["Dash","speedy"],["Zoom","zoom"],["Jet","jet speed"],["Blaze","fiery"],["Spark","spark"],["Fire","hot energy"],["Thunder","loud"],["Storm","stormy"],["Cyclone","windy"],["Hurricane","powerful"],["Tornado","twister"],["Whirlwind","spinning"],["Vortex","swirl"],["Meteor","space rock"],["Comet","flying star"],["Asteroid","space object"]],
friendly:[["Buddy","best friend"],["Charlie","friendly"],["Max","greatest"],["Cooper","funny"],["Milo","sweet"],["Leo","lion"],["Rocky","strong"],["Duke","noble"],["Bear","cuddly"],["Teddy","teddy bear"],["Archie","genuine"],["Ollie","affectionate"],["Louie","famous warrior"],["Theo","divine gift"],["Finn","fair"],["Jack","god is gracious"],["Sam","listener"],["Ben","son of the right hand"],["Henry","ruler of home"],["George","farmer"]],
mysterious:[["Mystery","unknown"],["Enigma","puzzle"],["Phantom","ghost"],["Shadow","dark"],["Shade","spirit"],["Ghost","spooky"],["Specter","ghostly"],["Phantom","mysterious"],["Mystic","magical"],["Magic","enchanting"],["Wizard","magical"],["Warlock","magical"],["Witch","magical"],["Sorcerer","magic user"],["Enchantress","magical"],["Spell","magic"],["Charm","magic"],["Hex","magic"],["Curse","magic"],["Bewitch","magic"]]
};

function generatePhotoNames(f){
let pool=[];
f.colors.forEach(c=>{
if(PHOTO_NAMES[c])pool=pool.concat(PHOTO_NAMES[c]);
});

if(f.pattern==='spotted'||f.pattern==='mixed'){
if(PHOTO_NAMES.spotted)pool=pool.concat(PHOTO_NAMES.spotted);
}

if(f.brightness==='dark'){
if(PHOTO_NAMES.dark)pool=pool.concat(PHOTO_NAMES.dark);
}

if(f.vibe==='playful'){
if(PHOTO_NAMES.playful)pool=pool.concat(PHOTO_NAMES.playful);
}

if(f.vibe==='mysterious'){
if(PHOTO_NAMES.mysterious)pool=pool.concat(PHOTO_NAMES.mysterious);
}

if(f.size==='small'){
if(PHOTO_NAMES.small)pool=pool.concat(PHOTO_NAMES.small);
}

if(f.size==='large'){
if(PHOTO_NAMES.large)pool=pool.concat(PHOTO_NAMES.large);
}

if(f.energy==='calm'){
if(PHOTO_NAMES.calm)pool=pool.concat(PHOTO_NAMES.calm);
}

if(f.energy==='high'){
if(PHOTO_NAMES.energetic)pool=pool.concat(PHOTO_NAMES.energetic);
}

if(pool.length===0)pool=PHOTO_NAMES.golden;

const seen=new Set();
const uniquePool=pool.filter(n=>{
if(seen.has(n[0]))return false;
seen.add(n[0]);
return true;
});

const shuffled=[...uniquePool].sort(()=>Math.random()-0.5);
return shuffled.slice(0,16);
}

function showPhotoNames(names){
const favs=getFavs();
photoNameGrid.innerHTML=names.map(n=>{
const liked=favs.includes(n[0]);
return`<div class="name-card"><span class="heart${liked?' liked':''}" data-name="${n[0]}" aria-label="Favorite ${n[0]}"><svg viewBox="0 0 24 24" role="img" aria-label="Heart icon"><path fill="currentColor" d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/></svg></span><div class="name color-photo">${n[0]}</div><div class="meaning">${n[1]}</div></div>`;
}).join('');

photoNameGrid.querySelectorAll('.heart').forEach(h=>{
h.addEventListener('click',()=>{
const name=h.dataset.name;
const isLiked=h.classList.toggle('liked');
saveFav(name,isLiked);
if(typeof updateDlBtn==='function')updateDlBtn();
if(typeof updatePhotoDlBtn==='function')updatePhotoDlBtn();
});
});

photoResults.style.display='block';
updatePhotoDlBtn();
}

function updatePhotoDlBtn(){
const favs=getFavs();
let wrap=document.getElementById('photoDlWrap');
if(!wrap){
wrap=document.createElement('div');
wrap.className='dl-wrap';
wrap.id='photoDlWrap';
const grid=document.getElementById('photoNameGrid');
grid.parentNode.insertBefore(wrap,grid.nextSibling);

const btnsDiv=document.createElement('div');
btnsDiv.className='dl-btns';

const dlBtn=document.createElement('button');
dlBtn.className='download-btn';
dlBtn.id='photoDlBtn';
dlBtn.textContent='Try Compare';
dlBtn.addEventListener('click',compareNames);
btnsDiv.appendChild(dlBtn);

const clearBtn=document.createElement('button');
clearBtn.className='clear-btn';
clearBtn.id='photoClearBtn';
clearBtn.textContent='Clear All';
clearBtn.style.display='none';
clearBtn.addEventListener('click',()=>{
if(confirm('Remove all saved names?')){
localStorage.removeItem('pupFavs');
if(typeof updateDlBtn==='function')updateDlBtn();
updatePhotoDlBtn();
document.querySelectorAll('#photoNameGrid .heart.liked').forEach(h=>h.classList.remove('liked'));
document.querySelectorAll('#nameGrid .heart.liked').forEach(h=>h.classList.remove('liked'));
}
});
btnsDiv.appendChild(clearBtn);

wrap.appendChild(btnsDiv);

const countSpan=document.createElement('span');
countSpan.className='dl-count';
wrap.appendChild(countSpan);
}

const clearBtn=document.getElementById('photoClearBtn');
clearBtn.style.display=favs.length?'inline-block':'none';

const countSpan=wrap.querySelector('.dl-count');
countSpan.textContent=`${favs.length} name${favs.length!==1?'s':''} selected`;
}
