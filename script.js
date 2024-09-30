const API_KEY= "7cd270058c114ada895ee502161a1ec8";
const url="https://newsapi.org/v2/everything?q=";

window.addEventListener("load" , () => fetchNews("India"));

function reload(){
    window.location.reload(); /* jab v new logo par click kare tab reload ho jaaye */
}

async function fetchNews (query) {
    const res=await fetch(`${url}${query}&apikey=${API_KEY}`); /*syntax yaad rakhna important hai */
    const data = await res.json(); /*converting into JSON file */
    console.log(data); 
    bindData(data.articles);
}

function bindData(articles){
    const cardsContainer = document.getElementById('card-container');
    const newsCardTemplate = document.getElementById('template-news-card');
    cardsContainer.innerHTML=''; /*empty rakhna*/
    articles.forEach(article => {
        if(!article.urlToImage) return ;   
        const cardClone= newsCardTemplate.content.cloneNode(true); /*deep cloning hogya */
        fillDataInCard(cardClone , article);
        cardsContainer.appendChild(cardClone); /*jitna v article hongya utna clone baante jaagya  and 
        container ma daalte jaagya*/


    })
}
function fillDataInCard(cardClone , article){
    const newsImg = cardClone.querySelector('#news-img');
    const newsTitle = cardClone.querySelector('#news-title');
    const newsSource = cardClone.querySelector('#news-source');
    const newsDesc = cardClone.querySelector('#news-desc');

    newsImg.src = article.urlToImage;
    newsTitle.innerHTML = article.title;
    newsDesc.innerHTML = article.description;

    const date= new Date(article.publishedAt).toLocaleString("en-US",{
        timeZone: "Asia/Jakarta"
    });

    newsSource.innerHTML = `${article.source.name} . ${date}`;

    cardClone.firstElementChild.addEventListener("click" , () => {
        window.open(article.url , "_blank"); /* blank means new tab */
    });

}
let curSelectedNav = null ;
function onNavItemClick(id){
    fetchNews(id); /* click karna sa ipl , finance , politics ka news aagya */
    const navItem = document.getElementById(id);
    curSelectedNav?.classList.remove('active');
    curSelectedNav = navItem;
    curSelectedNav.classList.add('active');
}

const searchButton=document.getElementById('search-button');
const searchText = document.getElementById('search-text');

searchButton.addEventListener('click' , () => {
    const query = searchText.value;
    if(!query) return ; /* bus user na aise button click kar diye and search text ma kuch nahi daala */
    fetchNews(query);
    curSelectedNav?.classList.remove('active'); /* select kare toh woh chiz selected naah raahe issliye*/
    curSelectedNav = null;
})