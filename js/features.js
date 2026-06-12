// Utility functions for favorites
function getFavs(){try{return JSON.parse(localStorage.getItem('pupFavs'))||[]}catch(e){return[]}}
function saveFav(name,add){const f=getFavs();if(add){if(!f.includes(name))f.push(name)}else{const i=f.indexOf(name);if(i>-1)f.splice(i,1)}localStorage.setItem('pupFavs',JSON.stringify(f))}

// Unified heart-click handler for name cards
function handleHeartClick(e){
const heart=e.target.closest('.heart');
if(!heart)return;

const name=heart.dataset.name;
const isLiked=heart.classList.toggle('liked');
saveFav(name,isLiked);
updateDlBtn();
if(typeof updatePhotoDlBtn==='function')updatePhotoDlBtn();
}

// Feature toggle - initialized in DOMContentLoaded

function compareNames(){
const favs=getFavs();
if(!favs.length){alert('No names selected. Click the heart icon on any name to add it to your list!');return}
localStorage.setItem('pupCompare',JSON.stringify(favs));
window.location.href='comparison-page.html';
}

function updateDlBtn(){
const favs=getFavs();
let wrap=document.querySelector('.dl-wrap');
if(!wrap){
wrap=document.createElement('div');
wrap.className='dl-wrap';
const grid=document.getElementById('nameGrid');
grid.parentNode.insertBefore(wrap,grid.nextSibling);

const btnsDiv=document.createElement('div');
btnsDiv.className='dl-btns';

const dlBtn=document.createElement('button');
dlBtn.className='download-btn';
dlBtn.id='dlBtn';
dlBtn.textContent='Try Compare';
dlBtn.addEventListener('click',compareNames);
btnsDiv.appendChild(dlBtn);

const clearBtn=document.createElement('button');
clearBtn.className='clear-btn';
clearBtn.textContent='Clear All';
clearBtn.style.display='none';
clearBtn.addEventListener('click',()=>{
localStorage.removeItem('pupFavs');
if(typeof renderFilteredNames==='function')renderFilteredNames();
if(document.getElementById('nameGrid'))updateDlBtn();
if(typeof updatePhotoDlBtn==='function')updatePhotoDlBtn();
});
btnsDiv.appendChild(clearBtn);

wrap.appendChild(btnsDiv);

const countSpan=document.createElement('span');
countSpan.className='dl-count';
wrap.appendChild(countSpan);
}

const clearBtn=wrap.querySelector('.clear-btn');
clearBtn.style.display=favs.length?'inline-block':'none';

const countSpan=wrap.querySelector('.dl-count');
countSpan.textContent=`${favs.length} name${favs.length!==1?'s':''} selected`;
}

function copyLink(el){
navigator.clipboard.writeText('https://puppynamegenerator.net/').then(()=>{
el.classList.add('copied');
el.innerHTML='<svg viewBox="0 0 24 24" width="18" height="18"><path fill="currentColor" d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/></svg> Copied!';
setTimeout(()=>{el.classList.remove('copied');el.innerHTML='<svg viewBox="0 0 24 24" width="18" height="18"><path fill="currentColor" d="M16 1H4c-1.1 0-2 .9-2 2v14h2V3h12V1zm3 4H8c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h11c1.1 0 2-.9 2-2V7c0-1.1-.9-2-2-2zm0 16H8V7h11v14z"/></svg> Copy Link'},2000)
})
}

// Popular names - 3-level hierarchy: Gender(tab) → Breed(pill) → Trait(pill)
// 5 Breeds × 2 Genders × 6 Traits = 60 categories
// Each category contains 100 unique names

// Name data structure:
// POP_NAMES[gender][breed][trait] = [[name1, meaning1], [name2, meaning2], ...]
const ALL_BREEDS = ['golden_retriever', 'labrador', 'french_bulldog', 'chihuahua', 'german_shepherd'];
const ALL_TRAITS = ['playful', 'energetic', 'cuddly', 'adventurous', 'shy', 'affectionate'];

function getCombos(g, b, t) {
    var breeds = b === 'all' ? ALL_BREEDS : [b];
    var traits = t === 'all' ? ALL_TRAITS : [t];
    var out = [];
    for (var i = 0; i < breeds.length; i++) {
        for (var j = 0; j < traits.length; j++) {
            out.push([g, breeds[i], traits[j]]);
        }
    }
    return out;
}

function collectNames(combos) {
    var names = [];
    for (var i = 0; i < combos.length; i++) {
        var c = combos[i];
        var gd = PUPPY_NAMES_DATA && PUPPY_NAMES_DATA[c[0]];
        var bd = gd && gd[c[1]];
        var td = bd && bd[c[2]];
        if (Array.isArray(td)) {
            for (var k = 0; k < td.length; k++) names.push(td[k]);
        }
    }
    return names;
}

function renderNameGrid(grid, names) {
    var favs = getFavs();
    var html = '';
    for (var i = 0; i < names.length; i++) {
        var n = names[i];
        var liked = favs.indexOf(n[0]) >= 0 ? ' liked' : '';
        html += '<div class="name-card"><span class="heart' + liked + '" data-name="' + n[0] + '" aria-label="Favorite ' + n[0] + '"><svg viewBox="0 0 24 24" role="img" aria-label="Heart icon"><path fill="currentColor" d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/></svg></span><div class="name color-popular">' + n[0] + '</div><div class="meaning">' + n[1] + '</div></div>';
    }
    grid.innerHTML = html;
}

function dedupeAndShuffle(names, limit) {
    var seen = {};
    var out = [];
    for (var i = 0; i < names.length; i++) {
        var n = names[i];
        if (!n || !n[0] || seen[n[0]]) continue;
        seen[n[0]] = true;
        out.push(n);
    }
    for (var j = out.length - 1; j > 0; j--) {
        var k = Math.floor(Math.random() * (j + 1));
        var tmp = out[j]; out[j] = out[k]; out[k] = tmp;
    }
    return out.slice(0, limit || 24);
}


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
  genBtn.addEventListener('click',()=>{renderFilteredNames();});;
}

renderBreedPills();
renderTraitPills();
}

// Popular names filter initialized in DOMContentLoaded

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
    const g=popState.gender;
    const b=popState.breed;
    const t=popState.trait;

    const combos = getCombos(g, b, t);
    if (combos.length === 0) return;

    const names = collectNames(combos);
    const shuffled = dedupeAndShuffle(names, 24);
    if (shuffled.length > 0) {
        renderNameGrid(grid, shuffled);
    }
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

// Photo section event listeners initialized in DOMContentLoaded

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

// Photo button event listeners initialized in DOMContentLoaded

function analyzeImage(srcImg){
const features={
colors:[],
brightness:'medium',
pattern:'solid',
size:'medium',
vibe:'friendly',
energy:'medium'
};

// Downsample to MAX 200px for fast analysis (8x-100x speedup on large images)
const MAX=200;
const ratio=Math.min(MAX/srcImg.width,MAX/srcImg.height,1);
const w=Math.max(1,Math.floor(srcImg.width*ratio));
const h=Math.max(1,Math.floor(srcImg.height*ratio));
const small=document.createElement('canvas');
small.width=w;small.height=h;
const sctx=small.getContext('2d');
sctx.drawImage(srcImg,0,0,w,h);

const pixels=sctx.getImageData(0,0,w,h).data;
let rTotal=0,gTotal=0,bTotal=0,count=0;

const colorBuckets={
black:0,
brown:0,
golden:0,
white:0,
cream:0,
red:0,
gray:0,
silver:0,
tan:0,
chocolate:0,
blue:0,
sable:0,
fawn:0
};

for(let i=0;i<pixels.length;i+=4){
const r=pixels[i],g=pixels[i+1],b=pixels[i+2],a=pixels[i+3];
if(a<128)continue;

rTotal+=r;gTotal+=g;bTotal+=b;count++;

const hsl=rgbToHsl(r,g,b);
const [h,s,l]=hsl;

if(l<0.12)colorBuckets.black++;
else if(l>0.88)colorBuckets.white++;
else if(l<0.22&&h>=10&&h<=45&&s>0.1)colorBuckets.sable++;
else if(h>=20&&h<=40&&s>0.15&&l>0.25&&l<0.55)colorBuckets.brown++;
else if(h>=15&&h<=30&&s>0.1&&l>0.4&&l<0.7)colorBuckets.tan++;
else if(h>=20&&h<=45&&s>0.2&&l>0.55&&l<0.78)colorBuckets.fawn++;
else if(h>=30&&h<=55&&s>0.15&&l>0.5&&l<0.8)colorBuckets.golden++;
else if(h>=0&&h<=15&&s>0.25&&l>0.3&&l<0.6)colorBuckets.red++;
else if(s<0.12&&l>0.55&&l<0.85)colorBuckets.silver++;
else if(s<0.12&&l>0.35&&l<0.7)colorBuckets.gray++;
else if(h>=25&&h<=50&&s>0.1&&l>0.65&&l<0.88)colorBuckets.cream++;
else if(h>=20&&h<=35&&s>0.2&&l>0.2&&l<0.45)colorBuckets.chocolate++;
else if(h>=180&&h<=260&&s>0.15&&l>0.3&&l<0.6)colorBuckets.blue++;
}

const brightness=rTotal/(count*255);
features.brightness=brightness>0.68?'light':brightness>0.42?'medium':'dark';

const sorted=Object.entries(colorBuckets).sort((a,b)=>b[1]-a[1]);
const topColors=sorted.filter((_,i)=>i<3&&_[1]>count*0.04).map(e=>e[0]);
features.colors=topColors.length?topColors:[sorted[0][1]>0?sorted[0][0]:'golden'];

const regions=5;
const regionColors=[];
for(let ry=0;ry<regions;ry++){
for(let rx=0;rx<regions;rx++){
const sx=Math.floor(w*rx/regions),sy=Math.floor(h*ry/regions);
const sw=Math.floor(w/regions),sh=Math.floor(h/regions);
const regionData=sctx.getImageData(sx,sy,sw,sh).data;
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

if(srcImg.width*srcImg.height>400000)features.size='large';
else if(srcImg.width*srcImg.height<150000)features.size='small';

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
silver:'Silver',
tan:'Tan',
chocolate:'Chocolate',
blue:'Blue',
sable:'Sable',
fawn:'Fawn',
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
mysterious:[["Mystery","unknown"],["Enigma","puzzle"],["Phantom","ghost"],["Shadow","dark"],["Shade","spirit"],["Ghost","spooky"],["Specter","ghostly"],["Phantom","mysterious"],["Mystic","magical"],["Magic","enchanting"],["Wizard","magical"],["Warlock","magical"],["Witch","magical"],["Sorcerer","magic user"],["Enchantress","magical"],["Spell","magic"],["Charm","magic"],["Hex","magic"],["Curse","magic"],["Bewitch","magic"]],
silver:[["Silver","metallic shine"],["Sterling","pure silver"],["Misty","silvery fog"],["Pearl","silvery gem"],["Ash","cool gray"],["Smokey","smoky silver"],["Platinum","precious metal"],["Quicksilver","mercury"],["Slate","silvery stone"],["Frosty","icy silver"],["Glacier","frozen silver"],["Pewter","soft metal"],["Chrome","shiny metal"],["Mercury","silver planet"],["Moonbeam","moon glow"],["Starlight","silver stars"],["Dusty","soft silver"],["Whisper","soft silver"],["Cloud","soft silver"],["Zephyr","silver breeze"]],
sable:[["Sable","dark fur tip"],["Bear","dark sable"],["Wolves","wild sable"],["Bruno","strong sable"],["Cocoa","dark sable"],["Hazel","warm sable"],["Maple","dark autumn"],["Espresso","dark coffee"],["Mahogany","dark wood"],["Bark","tree bark"],["Onyx","dark stone"],["Shadow","dark fur"],["Twilight","dark glow"],["Stormy","dark storm"],["Tobacco","dark warm"],["Walnut","dark wood"],["Cedar","dark wood"],["Russet","dark red-brown"],["Grizzly","dark bear"],["Acorn","dark nut"]],
fawn:[["Fawn","young deer"],["Caramel","sweet fawn"],["Honey","golden fawn"],["Sandy","beach fawn"],["Toffee","sweet fawn"],["Butterscotch","warm fawn"],["Maple","warm fawn"],["Bambi","young deer"],["Biscuit","baked fawn"],["Peach","soft fawn"],["Goldie","golden fawn"],["Daisy","fresh fawn"],["Peanut","small fawn"],["Mochi","soft fawn"],["Latte","cream fawn"],["Teddy","soft fawn"],["Pumpkin","orange fawn"],["Apricot","soft fawn"],["Buttercup","golden fawn"],["Hazel","warm fawn"]]
};

function generatePhotoNames(f){
const cats=[];
f.colors.forEach(c=>{if(PHOTO_NAMES[c])cats.push(c)});
if(f.pattern==='spotted'||f.pattern==='mixed')cats.push('spotted');
if(f.brightness==='dark'&&!cats.includes('dark'))cats.push('dark');
if(f.vibe==='playful'&&!cats.includes('playful'))cats.push('playful');
if(f.vibe==='mysterious'&&!cats.includes('mysterious'))cats.push('mysterious');
if(f.size==='small'&&!cats.includes('small'))cats.push('small');
if(f.size==='large'&&!cats.includes('large'))cats.push('large');
if(f.energy==='calm'&&!cats.includes('calm'))cats.push('calm');
if(f.energy==='high'&&!cats.includes('energetic'))cats.push('energetic');
if(cats.length===0)cats.push('golden');

// Score each name by how many feature categories it matches
const scores={};
cats.forEach(cat=>{
if(PHOTO_NAMES[cat]){
PHOTO_NAMES[cat].forEach(n=>{
const key=n[0];
if(!scores[key])scores[key]={name:n,matches:0};
scores[key].matches++;
});
}
});

let pool=Object.values(scores);
if(pool.length===0)pool=PHOTO_NAMES.golden.map(n=>({name:n,matches:1}));

// Sort by match count (highest first), then random for variety within tier
pool.sort((a,b)=>b.matches-a.matches||Math.random()-0.5);
return pool.slice(0,16);
}

// Unified initialization - all event listeners and bootstrapping happens here
document.addEventListener('DOMContentLoaded',()=>{

// 1. Feature toggle buttons (generator/photo section switcher)
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

// 2. Popular names filter (breed/trait pills)
if(document.getElementById('breedPills'))renderPopular();

// 3. Name grid - heart click event delegation and initial state
const grid=document.getElementById('nameGrid');
if(grid){
grid.removeEventListener('click',handleHeartClick);
grid.addEventListener('click',handleHeartClick);
const favs=getFavs();
grid.querySelectorAll('.heart').forEach(h=>{
if(favs.includes(h.dataset.name))h.classList.add('liked');
});
}

// 4. AI Photo Match - upload area listeners
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

// 5. AI Photo Match - delete and generate buttons
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
genPhotoBtn.disabled=true;
const orig=genPhotoBtn.textContent;
genPhotoBtn.textContent='Analyzing...';
try{
const features=analyzeImage(img);
showFeatures(features);
const names=generatePhotoNames(features);
showPhotoNames(names);
}finally{
genPhotoBtn.disabled=false;
genPhotoBtn.textContent=orig;
}
};
img.src=previewImg.src;
});
});

function showPhotoNames(items){
const favs=getFavs();
const maxMatch=items.length?items[0].matches:1;
photoNameGrid.innerHTML=items.map((item,i)=>{
const n=item.name;
const liked=favs.includes(n[0]);
const pct=maxMatch>0?Math.round((item.matches/maxMatch)*100):60;
const topPick=(i===0&&item.matches>=2)?'<span class="top-pick">⭐ Top Match</span>':'';
return`<div class="name-card">${topPick}<span class="match-pct">${pct}% match</span><span class="heart${liked?' liked':''}" data-name="${n[0]}" aria-label="Favorite ${n[0]}"><svg viewBox="0 0 24 24" role="img" aria-label="Heart icon"><path fill="currentColor" d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/></svg></span><div class="name color-photo">${n[0]}</div><div class="meaning">${n[1]}</div></div>`;
}).join('');

photoNameGrid.querySelectorAll('.heart').forEach(h=>{
h.addEventListener('click',()=>{
const name=h.dataset.name;
const isLiked=h.classList.toggle('liked');
saveFav(name,isLiked);
updateDlBtn();
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
updateDlBtn();
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
