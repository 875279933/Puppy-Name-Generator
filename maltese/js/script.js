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
["Bella","timeless sweetheart"],
["Luna","moonlit cuddle bug"],
["Daisy","sunny little blossom"],
["Lily","pure white petal"],
["Sophie","gentle lady"],
["Lola","spunky doll"],
["Mia","tiny princess"],
["Rosie","rosy cheek charm"],
["Ruby","ruby gem glow"],
["Olive","sweet olive branch"],
["Coco","cocoa cuddle"],
["Gigi","glamorous girl"],
["Pixie","tiny mischief"],
["Pearl","shiny little gem"],
["Mila","loved by all"],
["Willow","graceful willow"],
["Cookie","sugar-kissed pup"],
["Angel","heavenly fluff"],
["Chloe","blooming pretty"],
["Zoey","full of life"],
["Gracie","full of grace"],
["Honey","golden sweet drop"],
["Ivy","vining little vine"],
["Layla","night-born beauty"],
["Maggie","pearly charm"],
["Nala","lioness heart"],
["Phoebe","bright and clear"],
["Pippa","little doll"],
["Princess","royal lapdog"],
["Roxy","sunrise girl"],
["Sadie","sweet little lady"],
["Stella","shining star"],
["Sugar","spoonful of sweet"],
["Tilly","little storyteller"],
["Tessa","harvester of love"],
["Tinkerbell","tiny magic"],
["Winnie","gentle little bear"],
["Zoe","bright and lively"],
["Annie","little grace"],
["Audrey","classic beauty"],
["Bonnie","pretty sweetie"],
["Callie","little songbird"],
["Dolly","darling dolly"],
["Ella","bright fairy"],
["Emma","universal favorite"],
["Fiona","little fairy tale"],
["Flower","pocket bouquet"],
["Hazel","warm hazel eyes"],
["Joy","bundle of joy"],
["Marble","pocket snowflake"]
];

const MALE_NAMES=[
["Teddy","soft as a bear"],
["Max","the greatest lapdog"],
["Charlie","friendly charmer"],
["Cooper","little barrel pup"],
["Bear","fluffy teddy bear"],
["Toby","happy little go-lucky"],
["Leo","lion of the lap"],
["Ollie","olive-branch peace"],
["Archie","bold and true"],
["Buddy","loyal little buddy"],
["Milo","gentle soldier"],
["Finn","fair little adventurer"],
["Louie","little prince"],
["Gus","great little guy"],
["Rocky","tough little man"],
["Jack","gracious fellow"],
["Henry","house ruler"],
["Oliver","little olive tree"],
["Duke","noble tiny duke"],
["Baxter","gentle baker"],
["Benny","little blessed one"],
["Boomer","happy bouncer"],
["Buttons","cute as a button"],
["Chip","tiny chipmunk"],
["Cosmo","cosmic cutie"],
["Dexter","dapper little guy"],
["Eli","little noble one"],
["Felix","happy and lucky"],
["George","little farmer"],
["Gizmo","tiny gadget"],
["Harry","home-loving boy"],
["Jasper","hidden gem"],
["Joey","little kangaroo"],
["Junior","the little one"],
["King","pocket-size king"],
["Lucky","lucky little charm"],
["Marshmallow","pillow-soft fluff"],
["Mickey","mighty mouse"],
["Mochi","chewy little ball"],
["Nibbles","gentle nibbler"],
["Oscar","divine little spear"],
["Peanut","pocket-size peanut"],
["Pip","tiny pip-squeak"],
["Prince","royal little man"],
["Romeo","little lover boy"],
["Sam","steady little sam"],
["Simba","king of the couch"],
["Smokey","smoky little charm"],
["Sammy","sunny little smile"],
["Theo","gift from above"],
["Biscuit","golden and sweet"],
["Zeus","tiny thunder god"]
];

function shuffle(a){
  for(let i=a.length-1;i>0;i--){
    const j=Math.floor(Math.random()*(i+1));
    [a[i],a[j]]=[a[j],a[i]]
  }
  return a
}

function heartSvg(){
  return'<svg viewBox="0 0 24 24" role="img" aria-label="Heart icon"><path fill="currentColor" d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/></svg>'
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
        ${heartSvg()}
      </span>
      <div class="name">${n[0]}</div>
      <div class="meaning">${n[1]}</div>
    </div>`
  }).join('');

  maleGrid.innerHTML=malePicked.map(n=>{
    const liked=favs.includes(n[0]);
    return `<div class="name-card">
      <span class="heart${liked?' liked':''}" data-name="${n[0]}" aria-label="Favorite ${n[0]}">
        ${heartSvg()}
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
    const maleSec=document.getElementById('maleNames').parentNode;
    maleSec.parentNode.insertBefore(wrap,maleSec.nextSibling);
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
  navigator.clipboard.writeText('https://puppynamegenerator.net/maltese/').then(()=>{
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
