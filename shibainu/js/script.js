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
  ["Yuki","snow - top Japanese pick"],
  ["Mochi","soft rice cake"],
  ["Hana","delicate flower"],
  ["Suki","beloved one"],
  ["Kira","sparkling star"],
  ["Sora","wide open sky"],
  ["Mika","beautiful new moon"],
  ["Nala","lion queen"],
  ["Luna","silver moon"],
  ["Bella","classic beauty"],
  ["Daisy","cheerful bloom"],
  ["Momo","sweet peach"],
  ["Kiki","bright spirit"],
  ["Aiko","little beloved"],
  ["Hinata","sunny place"],
  ["Mei","fresh bud"],
  ["Kuma","cuddly as a bear"],
  ["Tofu","soft little bean"],
  ["Foxy","red & clever"],
  ["Maple","autumn leaf"],
  ["Nori","seaweed snack"],
  ["Emi","beautiful blessing"],
  ["Roxy","golden dawn"],
  ["Pepper","spicy girl"],
  ["Ginger","red-coated cutie"],
  ["Cookie","sweet treat"],
  ["Olive","peaceful green"],
  ["Boba","bubble tea pearl"],
  ["Taro","taro root charm"],
  ["Yumi","reason & beauty"],
  ["Koko","gentle chocolate"],
  ["Lily","soft petal"],
  ["Waffles","golden & sweet"],
  ["Zoe","full of life"],
  ["Chloe","blooming girl"],
  ["Lola","spunky lady"],
  ["Maki","rolled-up joy"],
  ["Ruby","ruby-red gem"],
  ["Mitsu","sweet honey"],
  ["Penny","copper coin"],
  ["Rosie","rosy red coat"],
  ["Stella","shining star"],
  ["Sophie","wise one"],
  ["Sushi","bite-sized fun"],
  ["Saki","blossom bloom"],
  ["Mango","tropical sweetness"],
  ["Toffee","caramel charm"],
  ["Peach","soft & fuzzy"],
  ["Hazel","warm-eyed girl"],
  ["Kona","coffee-brown coat"]
];

const MALE_NAMES=[
  ["Hachiko","the loyal legend"],
  ["Kai","ocean breeze"],
  ["Hiro","generous hero"],
  ["Yoshi","good & kind"],
  ["Kenji","healthy & strong"],
  ["Taro","first-born son"],
  ["Mochi","soft rice cake"],
  ["Akira","bright & clear"],
  ["Riku","strong land"],
  ["Kuma","little bear"],
  ["Max","the greatest"],
  ["Charlie","free spirit"],
  ["Cooper","friendly pal"],
  ["Bear","strong & brave"],
  ["Teddy","cuddly as a bear"],
  ["Leo","lion-hearted"],
  ["Loki","mischievous god"],
  ["Oscar","divine spear"],
  ["Finn","fair adventurer"],
  ["Rex","king of the house"],
  ["Toby","friendly goofball"],
  ["Archie","bold & true"],
  ["Gus","great one"],
  ["Henry","house ruler"],
  ["Jack","gracious gift"],
  ["Milo","gentle soldier"],
  ["Oliver","olive-tree peace"],
  ["Jasper","hidden treasure"],
  ["Riley","courageous heart"],
  ["Harley","happy wanderer"],
  ["Yama","mountain spirit"],
  ["Sora","open sky"],
  ["Niko","little victor"],
  ["Zeus","king of gods"],
  ["Thor","thunder god"],
  ["Odin","wise wanderer"],
  ["Atlas","strong shoulder"],
  ["Bandit","mischief-maker"],
  ["Rascal","playful trouble"],
  ["Dash","quick runner"],
  ["Sushi","bite-sized fun"],
  ["Bento","little lunch box"],
  ["Jun","gentle & true"],
  ["Haru","spring breeze"],
  ["Cody","helpful buddy"],
  ["Buddy","loyal companion"],
  ["Bailey","steady friend"],
  ["Rocky","tough little guy"],
  ["Duke","noble leader"],
  ["Bruno","brown & bold"],
  ["Ranger","trail explorer"]
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
  navigator.clipboard.writeText('https://puppynamegenerator.net/shibainu/').then(()=>{
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
