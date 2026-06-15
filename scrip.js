// =============================
// OK PIZZA
// app.js
// =============================

// Корзина
let cart = JSON.parse(localStorage.getItem("cart")) || [];

// Кнопки "+"
const buttons = document.querySelectorAll(".bottom button");

buttons.forEach((button, index) => {

    button.addEventListener("click", () => {

        const card = button.closest(".card");

        const product = {
            id: index,
            name: card.querySelector("h3").innerText,
            price: parseInt(
                card.querySelector("b").innerText.replace(" ₽","")
            ),
            image: card.querySelector("img").src,
            quantity: 1
        };

        addToCart(product);

    });

});

// Добавление в корзину
function addToCart(product){

    const item = cart.find(i => i.id === product.id);

    if(item){

        item.quantity++;

    }else{

        cart.push(product);

    }

    saveCart();

    updateCartCounter();

    showNotification(product.name + " добавлена в корзину");

}

// Сохранение
function saveCart(){

    localStorage.setItem("cart", JSON.stringify(cart));

}

// Обновление счетчика
function updateCartCounter(){

    const badge = document.querySelector(".cart-btn span");

    const count = cart.reduce((sum,item)=>sum+item.quantity,0);

    badge.innerText = count;

}

updateCartCounter();

// Поиск
const search = document.querySelector(".search input");

if(search){

search.addEventListener("keyup",()=>{

const value = search.value.toLowerCase();

document.querySelectorAll(".card").forEach(card=>{

const title = card.querySelector("h3").innerText.toLowerCase();

card.style.display = title.includes(value)
? "block"
: "none";

});

});

}

// Уведомление
function showNotification(text){

const notify = document.createElement("div");

notify.className = "notify";

notify.innerHTML = 
${text}
;

document.body.appendChild(notify);

setTimeout(()=>{

notify.classList.add("show");

},50);

setTimeout(()=>{

notify.classList.remove("show");

setTimeout(()=>{

notify.remove();

},300);

},2200);

}

// Анимация появления карточек
const cards = document.querySelectorAll(".card");

const observer = new IntersectionObserver(entries=>{

entries.forEach(entry=>{

if(entry.isIntersecting){

entry.target.classList.add("visible");

}

});

},{
threshold:.2
});

cards.forEach(card=>observer.observe(card));

// Плавный скролл
document.querySelectorAll('a[href^="#"]').forEach(link=>{

link.addEventListener("click",function(e){

e.preventDefault();

const id=this.getAttribute("href");

if(id!=="#"){

document.querySelector(id).scrollIntoView({

behavior:"smooth"

});

}

});

});

// Избранное
document.querySelectorAll(".card").forEach(card=>{

const heart=document.createElement("button");

heart.innerHTML="♡";

heart.className="favorite";

card.appendChild(heart);

heart.onclick=()=>{

heart.classList.toggle("active");

heart.innerHTML=heart.classList.contains("active")
?"♥":"♡";

};

});

// Темная шапка при скролле
window.addEventListener("scroll",()=>{

const header=document.querySelector("header");

if(window.scrollY>40){

header.style.background="#0d0d0d";

header.style.boxShadow="0 10px 30px rgba(0,0,0,.4)";

}else{

header.style.background="#111";

header.style.boxShadow="none";

}

});
