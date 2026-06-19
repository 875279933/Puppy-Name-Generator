function getFavs(){
  try{return JSON.parse(localStorage.getItem('pupFavs'))||[]}catch(e){return[]}
}
function saveFav(name,add){
  const f=getFavs();
  if(add){if(!f.includes(name))f.push(name)}
  else{const i=f.indexOf(name);if(i>-1)f.splice(i,1)}
  localStorage.setItem('pupFavs',JSON.stringify(f))
}

const FEMALE_NAMES=[
["Luna","moonlit wanderer"],["Aurora","northern lights"],["Nala","snow queen"],["Koda","little bear"],
["Maya","gentle spirit"],["Nova","cosmic spark"],["Sasha","bright helper"],["Stella","shining star"],
["Willow","graceful wanderer"],["Misty","morning frost"],["Bella","classic beauty"],["Sky","endless horizon"],
["Ivy","evergreen forest"],["Ember","warm spark"],["Kira","pack leader"],["Freya","northern goddess"],
["Anya","graceful snow"],["Aspen","winter tree"],["Alaska","icy wild"],["Yuki","snow angel"],
["Crystal","icy clear"],["Jasmine","snow flower"],["Dakota","tribal friend"],["Foxy","clever red"],
["Glacier","ice queen"],["Holly","winter berry"],["Indie","free spirit"],["Jenna","white wave"],
["Kaia","ocean earth"],["Layla","dark beauty"],["Maple","red leaf"],["Meadow","open field"],
["Nikita","unconquered"],["Olive","snow olive"],["Pearl","frozen pearl"],["Quinn","wise queen"],
["Raven","dark feather"],["Ruby","red gem"],["Sadie","snow princess"],["Shadow","dark companion"],
["Tundra","frozen land"],["Valkyrie","warrior maiden"],["Winter","frosty queen"],["Xena","warrior princess"],
["Yara","snow butterfly"],["Zelda","gray queen"],["Cleo","royal glory"],["Piper","snow whistler"],
["Tessa","harvester friend"],["Echo","mountain call"]
];

const MALE_NAMES=[
["Balto","the brave legend"],["Max","the greatest"],["Milo","gentle soldier"],["Bear","strong & brave"],
["Loki","mischievous god"],["Zeus","king of gods"],["Storm","thunder chaser"],["Yukon","wild north"],
["Bandit","masked bandit"],["Cooper","friendly pal"],["Finn","fair adventurer"],["Ranger","trail explorer"],
["Blaze","fiery runner"],["Dash","speedy wolf"],["Atlas","strong shoulder"],["Odin","wise wanderer"],
["Maverick","free rider"],["Kaiser","noble king"],["Ghost","white shadow"],["Frost","winter king"],
["Avalanche","snow power"],["Denali","great mountain"],["Everest","snow peak"],["Falcon","swift hunter"],
["Grizzly","powerful bear"],["Hawk","sharp eyes"],["Hunter","snow tracker"],["Ice","frozen friend"],
["Jack","winter friend"],["King","pack leader"],["Leo","lion-hearted"],["Magnus","great one"],
["Niko","little victor"],["Orion","star hunter"],["Polar","icy prince"],["Quincy","snowy estate"],
["Rocco","restful warrior"],["Shadow","dark companion"],["Silver","gray ghost"],["Spike","tough little guy"],
["Tundra","frozen land"],["Viking","northern warrior"],["Wolf","wild heart"],["Zeke","snow champion"],
["Rocky","mountain tough"],["Simba","lion king"],["Thor","thunder god"],["Yama","mountain spirit"],
["Cody","snow helper"],["Rex","king of the house"]
];

function shuffle(a){
  for(let i=a.length-1;i>0;i--){
    const j=Math.floor(Math.random()*(i+1));
    [a[i],a[j]]=[a[j],a[i]]
  }
  return a
}

function cardHTML(n,liked){
  return `<div class="name-card">
    <span class="heart${liked?' liked':''}" data-name="${n[0]}" aria-label="Favorite ${n[0]}">
      <svg viewBox="0 0 24 24" role="img" aria-label="Heart icon">
        <path fill="currentColor" d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
      </svg>
    </span>
    <div class="name">${n[0]}</div>
    <div class="meaning">${n[1]}</div>
  </div>`
}

function generateNames(){
  const favs=getFavs();
  const femaleGrid=document.getElementById('femaleNames');
  const maleGrid=document.getElementById('maleNames');
  femaleGrid.innerHTML=shuffle([...FEMALE_NAMES]).slice(0,16).map(n=>cardHTML(n,favs.includes(n[0]))).join('');
  maleGrid.innerHTML=shuffle([...MALE_NAMES]).slice(0,16).map(n=>cardHTML(n,favs.includes(n[0]))).join('');
  bindHearts();
  updateCompareBtn();
}

function bindHearts(){
  document.querySelectorAll('.heart').forEach(h=>{
    h.removeEventListener('click',h._handler);
    h._handler=function(e){
      e.stopPropagation();
      const name=h.dataset.name;
      saveFav(name,h.classList.toggle('liked'));
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
    if(maleNames){maleNames.parentNode.parentNode.insertBefore(wrap,maleNames.parentNode.nextSibling)}
    else{document.querySelector('main').appendChild(wrap)}
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
  if(!favs.length){alert('No names selected. Click the heart icon on any name to add it to your list!');return}
  localStorage.setItem('pupCompare',JSON.stringify(favs));
  window.location.href='../comparison-page.html';
}

function copyLink(el){
  navigator.clipboard.writeText('https://puppynamegenerator.net/siberianhusky/').then(()=>{
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
  document.querySelectorAll('.heart').forEach(h=>{if(favs.includes(h.dataset.name))h.classList.add('liked')});
  bindHearts();
  updateCompareBtn();
  const genBtn=document.getElementById('genBtn');
  if(genBtn)genBtn.addEventListener('click',generateNames);
});
