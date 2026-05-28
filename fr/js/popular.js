function getFavs(){try{return JSON.parse(localStorage.getItem('pupFavs'))||[]}catch(e){return[]}}
function saveFav(name,add){const f=getFavs();if(add){if(!f.includes(name))f.push(name)}else{const i=f.indexOf(name);if(i>-1)f.splice(i,1)}localStorage.setItem('pupFavs',JSON.stringify(f))}

const POPULAR_NAMES=[
["Luna","the moon goddess - #1 female name 2026"],["Max","the greatest - #1 male name 2026"],["Bella","beautiful - top 5"],["Charlie","free man"],["Cooper","barrel maker"],["Lucy","light"],["Milo","soldier or merciful"],["Daisy","day's eye flower"],["Duke","noble leader"],["Winston","joyful stone"],["Hank","home ruler - trending 2026"],["Teddy","divine gift"],["Ruby","precious red gem"],["Willow","graceful tree"],["Bear","strong & brave"],["Maggie","pearl"],["Penny","weaver"],["Nova","new star"],["Sadie","princess"],["Finn","fair"],["Stella","star"],["Leo","lion-hearted"],["Rosie","rose flower"],["Jack","God is gracious"],["Molly","star of the sea"],["Chloe","blooming"],["Oliver","olive tree"],["Nala","beloved"],["Rocky","restful"],["Coco","chocolatey"],["Buddy","close friend"],["Pepper","spicy spirit"],["Tucker","fabric pleater"],["Zoey","life"],["Riley","valiant"],["Harper","harp player"],["Bailey","bailiff"],["Louie","famous warrior"],["Ginger","spiced warmth"],["Zeus","sky father"],["Mia","mine"],["Apollo","god of light"],["Abby","father's joy"],["Tank","strong"],["Murphy","sea warrior"],["Simba","lion"],["Oscar","divine spear"],["Brody","broad island"],["Mochi","sweet rice cake"],["Peanut","small & lovable"],["Blue","blue colored"],["Moose","large & gentle"],["Loki","trickster god"],["Thor","thunder god"],["Archie","genuine & brave"],["Banjo","musical instrument"],["Barney","warrior"],["Beau","handsome"],["Benji","son of the south"],["Benny","blessed"],["Biscuit","warm bread"],["Bodie","shelter"],["Boomer","loud"],["Boston","city name"],["Bubba","brother"],["Bucky","buck"],["Butch","butcher"],["Buzz","energetic"],["Cairo","city name"],["Casper","treasurer"],["Chief","leader"],["Chopper","loud"],["Chubs","chubby"],["Cisco","traveler"],["Cliff","cliff"],["Clyde","river"],["Cody","helpful"],["Cole","charcoal"],["Cosmo","order"],["Cracker","snappy"],["Crew","group"],["Cubby","small"],["Gus","great one"],["Maverick","independent"],["Felix","lucky"],["Beatrice","bringer of joy"],["Asher","happy & blessed"],["Clementine","merciful"],["Nora","light"],["Bodhi","enlightenment"],["Seren","star"],["Jasper","treasurer"],["Amara","grace"],["Eloise","healthy & wise"],["Silas","of the forest"],["Clara","clear & bright"],["Theodore","divine gift"],["Eleanor","shining light"],["Felicity","happiness"],["Gideon","great destroyer"],["Hope","optimism"],["Joy","gladness"],["Mercy","compassion"],["Noble","honorable"],["Peace","tranquility"],["Prosper","flourishing"],["Sage","wisdom"],["Valor","bravery"],["Verity","truth"],["Zion","highest point"],["Aurora","dawn"],["Benedict","blessed"],["Constance","steadfast"],["Faith","trust & belief"],["Grace","elegance"],["Honor","integrity"],["Justice","fairness"],["Liberty","freedom"],["Patience","enduring"],["Prudence","cautious wisdom"],["Trinity","threefold unity"],["Victor","conqueror"],["Zen","meditation"]
];

function shuffle(a){for(let i=a.length-1;i>0;i--){const j=Math.floor(Math.random()*(i+1));[a[i],a[j]]=[a[j],a[i]]}return a}

function bindHearts(){
document.querySelectorAll('.heart').forEach(h=>{
h.removeEventListener('click',h._handler);
h._handler=function(e){
e.stopPropagation();
const name=h.dataset.name;
const isLiked=h.classList.toggle('liked');
saveFav(name,isLiked);
updateDlBtn();
};
h.addEventListener('click',h._handler);
});
}

function generate(){
const picked=shuffle([...POPULAR_NAMES]).slice(0,24);
const grid=document.getElementById('nameGrid');
grid.innerHTML=picked.map(n=>{const liked=getFavs().includes(n[0]);return`<div class="name-card"><span class="heart${liked?' liked':''}" data-name="${n[0]}" aria-label="Favorite ${n[0]}"><svg viewBox="0 0 24 24" role="img" aria-label="Heart icon"><path fill="currentColor" d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/></svg></span><div class="name">${n[0]}</div><div class="meaning">${n[1]}</div></div>`}).join('');
bindHearts();
updateDlBtn();
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
if(confirm('Remove all saved names?')){
localStorage.removeItem('pupFavs');
updateDlBtn();
document.querySelectorAll('.heart.liked').forEach(h=>h.classList.remove('liked'));
}
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

function compareNames(){
const favs=getFavs();
if(!favs.length){alert('No names selected. Click the heart icon on any name to add it to your list!');return}
localStorage.setItem('pupCompare',JSON.stringify(favs));
window.location.href='comparison-page.html';
}

function copyLink(el){
navigator.clipboard.writeText('https://puppynamegenerator.net/popular-puppy-names.html').then(()=>{
el.classList.add('copied');
el.innerHTML='<svg viewBox="0 0 24 24" width="18" height="18"><path fill="currentColor" d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/></svg> Copied!';
setTimeout(()=>{el.classList.remove('copied');el.innerHTML='<svg viewBox="0 0 24 24" width="18" height="18"><path fill="currentColor" d="M16 1H4c-1.1 0-2 .9-2 2v14h2V3h12V1zm3 4H8c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h11c1.1 0 2-.9 2-2V7c0-1.1-.9-2-2-2zm0 16H8V7h11v14z"/></svg> Copy Link'},2000)
})
}

document.addEventListener('DOMContentLoaded',()=>{
const grid=document.getElementById('nameGrid');
if(!grid)return;
if(grid.children.length>0){
const favs=getFavs();
grid.querySelectorAll('.heart').forEach(h=>{
if(favs.includes(h.dataset.name))h.classList.add('liked');
});
bindHearts();
updateDlBtn();
}else{
generate();
}
const genBtn=document.getElementById('genBtn');
if(genBtn)genBtn.addEventListener('click',generate);
});
