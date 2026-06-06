function getFavs(){
  try{
    return JSON.parse(localStorage.getItem('pupFavs'))||[]
  }catch(e){
    return[]
  }
}

function saveFav(name,add){
  const f=getFavs();
  if(add){
    if(!f.includes(name))f.push(name)
  }else{
    const i=f.indexOf(name);
    if(i>-1)f.splice(i,1)
  }
  localStorage.setItem('pupFavs',JSON.stringify(f))
}

const FEMALE_NAMES=[
  ["Luna","moon - top US pick"],
  ["Stella","star - bright & bold"],
  ["Bella","beautiful - classic"],
  ["Mochi","soft & squishy treat"],
  ["Zoe","life - full of spark"],
  ["Peanut","tiny & nutty"],
  ["Rosie","rose - sweet face"],
  ["Gigi","playful charm"],
  ["Mabel","lovable - old soul"],
  ["Penny","bright copper"],
  ["Lola","strong woman"],
  ["Nala","beloved queen"],
  ["Daisy","sunshine flower"],
  ["Pepper","spunky & black"],
  ["Winnie","gentle friend"],
  ["Maggie","pearl - pure heart"],
  ["Ruby","precious gem"],
  ["Chloe","blooming beauty"],
  ["Izzy","devoted companion"],
  ["Poppy","cheerful blossom"],
  ["Millie","gentle strength"],
  ["Cookie","sweet & beloved"],
  ["Olive","peaceful nature"],
  ["Tilly","mighty in battle"],
  ["Honey","sweet & golden"],
  ["Coco","chocolate charm"],
  ["Muffin","baked sweetness"],
  ["Sugar","sweet crystal"],
  ["Peaches","soft & fuzzy"],
  ["Cupcake","frosted delight"],
  ["Snickers","candy bar fun"],
  ["Pickles","briny & bold"],
  ["Noodle","wiggly & fun"],
  ["Waffles","breakfast queen"],
  ["Jelly","wiggly sweetness"],
  ["Pudding","creamy comfort"],
  ["Biscuit","buttery bite"],
  ["Pancake","fluffy stack"],
  ["Sprout","tiny & fresh"],
  ["Tater","spud sweetheart"],
  ["Squish","wrinkly hug"],
  ["Bean","small but mighty"],
  ["Dumpling","plump & tasty"],
  ["Bubbles","effervescent joy"],
  ["Twinkie","golden snack"],
  ["Pixie","tiny fairy"],
  ["Gidget","gadget girl"],
  ["Fiona","fair & white"],
  ["Hazel","wise & warm"],
  ["Willow","graceful tree"]
];

const MALE_NAMES=[
  ["Otis","wealthy - top US pick"],
  ["Bruno","brown shield"],
  ["Milo","soldier - gentle"],
  ["Tank","solid & stocky"],
  ["Gizmo","gadget - big ears"],
  ["Buster","tough guy"],
  ["Louie","famous warrior"],
  ["Frank","free man - honest"],
  ["Winston","joyful stone"],
  ["Oliver","olive tree - kind"],
  ["Hank","ruler of home"],
  ["Rocco","rest - sturdy"],
  ["Baxter","baker - loyal"],
  ["Gus","great - endearing"],
  ["Pugsley","pug pride"],
  ["Teddy","divine gift - cuddly"],
  ["Max","the greatest"],
  ["Charlie","free-spirited"],
  ["Cooper","barrel maker - friendly"],
  ["Finn","fair - spirited"],
  ["Archie","genuine & brave"],
  ["Murphy","sea warrior"],
  ["Doug","dark water"],
  ["Waffles","breakfast legend"],
  ["Porkchop","meaty & fun"],
  ["Biscuit","baked buddy"],
  ["Nugget","golden bite"],
  ["Pickle","briny boy"],
  ["Tater Tot","crispy spud"],
  ["Snickers","candy bar champ"],
  ["Muffin","sweet loaf"],
  ["Nacho","cheesy hero"],
  ["Burrito","wrapped warmth"],
  ["Meatball","saucy & round"],
  ["Squirt","tiny but tough"],
  ["Bandit","masked rascal"],
  ["Boomer","loud & lovable"],
  ["Chico","little one"],
  ["Dozer","sleepy bulldozer"],
  ["Frito","corny crunch"],
  ["Hobbit","small adventurer"],
  ["Iggy","fiery spirit"],
  ["Jojo","playful pup"],
  ["Kirby","round & pink"],
  ["Lenny","brave as a lion"],
  ["Mario","plucky plumber"],
  ["Nemo","nobody - small fry"],
  ["Oscar","divine spear"],
  ["Pip","seed - tiny"],
  ["Quincy","estate of the fifth"],
  ["Rudy","famous wolf"],
  ["Spud","potato pal"]
];

function shuffle(a){
  for(let i=a.length-1;i>0;i--){
    const j=Math.floor(Math.random()*(i+1));
    [a[i],a[j]]=[a[j],a[i]]
  }
  return a
}

function generateNames(){
  const femalePicked=shuffle([...FEMALE_NAMES]).slice(0,16);
  const malePicked=shuffle([...MALE_NAMES]).slice(0,16);
  const femaleGrid=document.getElementById('femaleNames');
  const maleGrid=document.getElementById('maleNames');
  const favs=getFavs();

  femaleGrid.innerHTML=femalePicked.map(n=>{
    const liked=favs.includes(n[0]);
    return `<div class="name-card">
      <span class="heart${liked?' liked':''}" data-name="${n[0]}" aria-label="Favorite ${n[0]}">
        <svg viewBox="0 0 24 24" role="img" aria-label="Heart icon">
          <path fill="currentColor" d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
        </svg>
      </span>
      <div class="name">${n[0]}</div>
      <div class="meaning">${n[1]}</div>
    </div>`
  }).join('');

  maleGrid.innerHTML=malePicked.map(n=>{
    const liked=favs.includes(n[0]);
    return `<div class="name-card">
      <span class="heart${liked?' liked':''}" data-name="${n[0]}" aria-label="Favorite ${n[0]}">
        <svg viewBox="0 0 24 24" role="img" aria-label="Heart icon">
          <path fill="currentColor" d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
        </svg>
      </span>
      <div class="name">${n[0]}</div>
      <div class="meaning">${n[1]}</div>
    </div>`
  }).join('');

  bindHearts();
  updateCompareBtn();
}

function bindHearts(){
  document.querySelectorAll('.heart').forEach(h=>{
    h.removeEventListener('click',h._handler);
    h._handler=function(e){
      e.stopPropagation();
      const name=h.dataset.name;
      const isLiked=h.classList.toggle('liked');
      saveFav(name,isLiked);
      updateCompareBtn();
    };
    h.addEventListener('click',h._handler);
  });
}

function updateCompareBtn(){
  const favs=getFavs();
  let wrap=document.querySelector('.dl-wrap');

  if(!wrap){
    wrap=document.createElement('div');
    wrap.className='dl-wrap';
    const maleNames=document.getElementById('maleNames');
    if(maleNames){
      maleNames.parentNode.parentNode.insertBefore(wrap,maleNames.parentNode.nextSibling);
    }else{
      document.querySelector('main').appendChild(wrap);
    }

    const btnsDiv=document.createElement('div');
    btnsDiv.className='dl-btns';

    const dlBtn=document.createElement('button');
    dlBtn.className='download-btn';
    dlBtn.id='dlBtn';
    dlBtn.textContent='Try Compare';
    btnsDiv.appendChild(dlBtn);

    const clearBtn=document.createElement('button');
    clearBtn.className='clear-btn';
    clearBtn.id='clearBtn';
    clearBtn.textContent='Clear All';
    clearBtn.style.display='none';
    btnsDiv.appendChild(clearBtn);
    wrap.appendChild(btnsDiv);

    const countSpan=document.createElement('span');
    countSpan.className='dl-count';
    wrap.appendChild(countSpan);
  }

  const dlBtn=wrap.querySelector('.download-btn');
  dlBtn.removeEventListener('click',compareNames);
  dlBtn.addEventListener('click',compareNames);

  const clearBtn=wrap.querySelector('.clear-btn');
  clearBtn.removeEventListener('click',clearAllFavs);
  clearBtn.addEventListener('click',clearAllFavs);
  clearBtn.style.display=favs.length?'inline-block':'none';

  const countSpan=wrap.querySelector('.dl-count');
  countSpan.textContent=`${favs.length} name${favs.length!==1?'s':''} selected`;
}

function clearAllFavs(){
  if(confirm('Remove all saved names?')){
    localStorage.removeItem('pupFavs');
    updateCompareBtn();
    document.querySelectorAll('.heart.liked').forEach(h=>h.classList.remove('liked'));
  }
}

function compareNames(){
  const favs=getFavs();
  if(!favs.length){
    alert('No names selected. Click the heart icon on any name to add it to your list!');
    return
  }
  localStorage.setItem('pupCompare',JSON.stringify(favs));
  window.location.href='../comparison-page.html';
}

function copyLink(el){
  navigator.clipboard.writeText('https://puppynamegenerator.net/pug/').then(()=>{
    el.classList.add('copied');
    el.innerHTML='<svg viewBox="0 0 24 24" width="18" height="18"><path fill="currentColor" d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/></svg> Copied!';
    setTimeout(()=>{
      el.classList.remove('copied');
      el.innerHTML='<svg viewBox="0 0 24 24" width="18" height="18"><path fill="currentColor" d="M16 1H4c-1.1 0-2 .9-2 2v14h2V3h12V1zm3 4H8c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h11c1.1 0 2-.9 2-2V7c0-1.1-.9-2-2-2zm0 16H8V7h11v14z"/></svg> Copy Link'
    },2000)
  })
}

document.addEventListener('DOMContentLoaded',()=>{
  const favs=getFavs();
  document.querySelectorAll('.heart').forEach(h=>{
    if(favs.includes(h.dataset.name))h.classList.add('liked');
  });
  bindHearts();
  updateCompareBtn();

  const genBtn=document.getElementById('genBtn');
  if(genBtn)genBtn.addEventListener('click',generateNames);
});
