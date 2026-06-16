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
  ["Bella","beautiful lady - top US pick"],
  ["Luna","mysterious moon goddess"],
  ["Daisy","sweet garden flower"],
  ["Stella","shining little star"],
  ["Roxy","bold and athletic girl"],
  ["Zoe","bright little spark"],
  ["Mia","beloved little one"],
  ["Ruby","precious red gem"],
  ["Molly","star of the sea"],
  ["Lola","spunky showstopper"],
  ["Ginger","spicy black-and-tan girl"],
  ["Sadie","sweet lady with heart"],
  ["Maggie","little pearl - timeless"],
  ["Rosie","rose petal darling"],
  ["Penny","copper-coated cutie"],
  ["Ellie","bright ray of sunshine"],
  ["Willow","graceful and strong"],
  ["Coco","dark chocolate beauty"],
  ["Lady","refined old-soul pick"],
  ["Annie","sweet little orphan"],
  ["Sophie","wise old-soul choice"],
  ["Layla","night-blooming beauty"],
  ["Hazel","warm-eyed beauty"],
  ["Olive","darling green vibe"],
  ["Ivy","loyal little climber"],
  ["Millie","mild and gentle soul"],
  ["Honey","golden-hearted girl"],
  ["Bonnie","pretty Scottish lass"],
  ["Maple","sweet autumn leaf"],
  ["Birdie","tiny chirpy delight"],
  ["Princess","royally spoiled pup"],
  ["Duchess","noble little lady"],
  ["Sugar","sweet as can be"],
  ["Trixie","mischievous little star"],
  ["Pixie","tiny magical sprite"],
  ["Pearl","classic black-and-tan gem"],
  ["Wren","tiny brave songbird"],
  ["Cleo","royal Egyptian queen"],
  ["Bambi","gentle forest fawn"],
  ["Sage","wise little herb"],
  ["Willa","resolute protector"],
  ["Mabel","lovable old-fashioned name"],
  ["Juniper","fresh evergreen spirit"],
  ["Dakota","strong prairie girl"],
  ["Rebel","bold spirited girl"],
  ["Athena","wise warrior goddess"],
  ["Brandy","warm amber spirit"],
  ["Gypsy","free-spirited traveler"],
  ["Nova","bright new star"],
  ["Xena","warrior princess"]
];

const MALE_NAMES=[
  ["Max","the greatest - timeless"],
  ["Charlie","friendly free spirit"],
  ["Cooper","classic American pick"],
  ["Rocky","steady little fighter"],
  ["Duke","noble gentleman"],
  ["Bear","strong and snuggly"],
  ["Buddy","loyal best friend"],
  ["Tucker","all-American sweetheart"],
  ["Jack","God is gracious"],
  ["Milo","curious little explorer"],
  ["Leo","brave little lion"],
  ["Bentley","posh ride-or-die"],
  ["Henry","ruler of the household"],
  ["Oliver","vintage gentleman pick"],
  ["Louie","famous little king"],
  ["Dexter","clever little detective"],
  ["Winston","distinguished little man"],
  ["Finn","adventurous little sailor"],
  ["Gus","great one - charming"],
  ["Archie","bold and genuine"],
  ["Jasper","precious treasure"],
  ["Beau","handsome gentleman"],
  ["Rex","king of the castle"],
  ["Ace","number-one buddy"],
  ["Otis","old-soul porch-sitter"],
  ["Bruno","strong black-and-tan lad"],
  ["Theo","divine gift - modern"],
  ["Marley","fun-loving rascal"],
  ["Moose","big goofy gentle giant"],
  ["Tank","sturdy muscular hunk"],
  ["Rocco","tough little fighter"],
  ["Knox","brave and steadfast"],
  ["Baxter","steady lovable hunk"],
  ["Hank","classic country boy"],
  ["Gunner","strong working-class name"],
  ["Cody","friendly outdoorsman"],
  ["Jake","dependable partner"],
  ["Sam","trusty sidekick"],
  ["Zeke","spirited little athlete"],
  ["Bo","short and spunky"],
  ["Rudy","cheerful protective star"],
  ["Spike","spiky little rascal"],
  ["Zeus","king of the gods"],
  ["Buster","playful little clown"],
  ["Maverick","independent spirit"],
  ["Chief","brave pack leader"],
  ["Titan","powerful gentle giant"],
  ["Atlas","strong world-carrier"],
  ["Brutus","bold and brave"],
  ["Casper","friendly little ghost"]
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
  navigator.clipboard.writeText('https://puppynamegenerator.net/rottweiler/').then(()=>{
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
