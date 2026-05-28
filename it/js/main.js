function getFavs(){try{return JSON.parse(localStorage.getItem('pupFavs'))||[]}catch(e){return[]}}
function saveFav(name,add){const f=getFavs();if(add){if(!f.includes(name))f.push(name)}else{const i=f.indexOf(name);if(i>-1)f.splice(i,1)}localStorage.setItem('pupFavs',JSON.stringify(f))}

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
dlBtn.textContent='Confronta';
dlBtn.addEventListener('click',compareNames);
btnsDiv.appendChild(dlBtn);

const clearBtn=document.createElement('button');
clearBtn.className='clear-btn';
clearBtn.textContent='Cancella tutto';
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
countSpan.textContent=`${favs.length} nome${favs.length!==1?'i':''} selezionato${favs.length!==1?'i':''}`;
}

function compareNames(){
const favs=getFavs();
if(!favs.length){alert(`Nessun nome selezionato. Clicca sull'icona del cuore su qualsiasi nome per aggiungerlo alla tua lista!`);return}
localStorage.setItem('pupCompare',JSON.stringify(favs));
window.location.href='comparison-page.html';
}

function copyLink(el){
navigator.clipboard.writeText(`https://puppynamegenerator.net/it/`).then(()=>{
el.classList.add('copied');
el.innerHTML=`<svg viewBox="0 0 24 24" width="18" height="18"><path fill="currentColor" d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/></svg> Copiato!`;
setTimeout(()=>{el.classList.remove('copied');el.innerHTML=`<svg viewBox="0 0 24 24" width="18" height="18"><path fill="currentColor" d="M16 1H4c-1.1 0-2 .9-2 2v14h2V3h12V1zm3 4H8c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2h11c.1 0 2-.9 2-2V7c0-1.1-.9 2-2-2zm0 16H8V7h11v14z"/></svg> Copia link`},2000)
})
}

if(document.getElementById('nameGrid'))updateDlBtn();
