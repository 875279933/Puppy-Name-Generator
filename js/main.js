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
dlBtn.textContent='Try Compare';
dlBtn.addEventListener('click',compareNames);
btnsDiv.appendChild(dlBtn);

const clearBtn=document.createElement('button');
clearBtn.className='clear-btn';
clearBtn.textContent='Clear All';
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

function compareNames(){
const favs=getFavs();
if(!favs.length){alert('No names selected. Click the heart icon on any name to add it to your list!');return}
localStorage.setItem('pupCompare',JSON.stringify(favs));
window.location.href='comparison-page.html';
}

function copyLink(el){
navigator.clipboard.writeText('https://puppynamegenerator.net/').then(()=>{
el.classList.add('copied');
el.innerHTML='<svg viewBox="0 0 24 24" width="18" height="18"><path fill="currentColor" d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/></svg> Copied!';
setTimeout(()=>{el.classList.remove('copied');el.innerHTML='<svg viewBox="0 0 24 24" width="18" height="18"><path fill="currentColor" d="M16 1H4c-1.1 0-2 .9-2 2v14h2V3h12V1zm3 4H8c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h11c1.1 0 2-.9 2-2V7c0-1.1-.9-2-2-2zm0 16H8V7h11v14z"/></svg> Copy Link'},2000)
})
}

function bindHearts(){
// 使用事件委托代替直接绑定，确保所有爱心元素都能响应点击
const grid=document.getElementById('nameGrid');
if(!grid)return;

// 先移除已有的事件监听器
grid.removeEventListener('click',heartClickHandler);

// 添加新的事件监听器
grid.addEventListener('click',heartClickHandler);
}

function heartClickHandler(e){
const heart=e.target.closest('.heart');
if(!heart)return;

e.stopPropagation();
const name=heart.dataset.name;
const isLiked=heart.classList.toggle('liked');
saveFav(name,isLiked);
updateDlBtn();
}

// 页面加载完成后初始化
document.addEventListener('DOMContentLoaded',()=>{
if(document.getElementById('nameGrid')){
updateDlBtn();
// 初始化爱心状态
const favs=getFavs();
document.querySelectorAll('.heart').forEach(h=>{
if(favs.includes(h.dataset.name))h.classList.add('liked');
});
}
});