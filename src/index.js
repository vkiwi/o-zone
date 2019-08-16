'use strict';
//чекбокс
function toggleCheckbox() {
  const checkbox = document.querySelectorAll('.filter-check_checkbox');

  checkbox.forEach(function (elem, i) {
    elem.addEventListener('change', function () {
      if (this.checked) {
        this.nextElementSibling.classList.add('checked');
        console.log('стоит гала');
      } else {
        this.nextElementSibling.classList.remove('checked');
        console.log('убрали галу');
      }

    });
    // console.log(elem);
    // console.log(i);
  });
}
//end чекбокс

//корзина
function toogleCart() {
  const btnCart = document.getElementById('cart');
  const modalCart = document.querySelector('.cart');
  const closeBtn = document.querySelector('.cart-close');

  btnCart.addEventListener('click', () => {
    modalCart.style.display = 'flex';
    document.body.style.overflow = 'hidden';
    // modalCart.style.cssText = 'display: flex; color: red;';
  });

  closeBtn.addEventListener('click', () => {
    modalCart.style.display = 'none';
    document.body.style.overflow = '';
  });
}
//end корзина

//работа с корзиной (добавление/удаление)
function addCart() {

const cards = document.querySelectorAll('.goods .card');
const cartWrapper = document.querySelector('.cart-wrapper'),
  cartEmpty = document.getElementById('cart-empty'),
  countGoods = document.querySelector('.counter');


cards.forEach((card) => {
  const btn = card.querySelector('button');
  btn.addEventListener('click', () => {
    const cardClone = card.cloneNode(true);
    cartWrapper.appendChild(cardClone);
    showData();

    const removeBtn = cardClone.querySelector('.btn');
    removeBtn.textContent = 'Удалить из корзины';
    removeBtn.addEventListener('click', () => {
      cardClone.remove();
      showData();
    });
  });
});

function showData() {
  const cardsCart = cartWrapper.querySelectorAll('.card'),
    cardsPrice = cartWrapper.querySelectorAll('.card-price'),
    cardTotal = document.querySelector('.cart-total span');
  let sum = 0;
  countGoods.textContent = cardsCart.length;

  cardsPrice.forEach((cardPrice) => {
    let price = parseFloat(cardPrice.textContent);
    sum += price;
  });

  cardTotal.textContent = sum;

  if (cardsCart.length !== 0) {
    cartEmpty.remove();
  } else {
    cartWrapper.appendChild(cartEmpty);
  }
}
}
//end работа с корзиной

//фильтр акции

function actionPage() {
  const cards = document.querySelectorAll('.goods .card'),
    discountCheckbox = document.getElementById('discount-checkbox'),
    goods = document.querySelector('.goods'),
    min = document.getElementById('min'),
    max = document.getElementById('max'),
    search = document.querySelector('.search-wrapper_input'),
    searchBtn = document.querySelector('.search-btn');

    //фильттр по акции
    discountCheckbox.addEventListener('click', filter);

    //фильтр по цене
    min.addEventListener('change', filter);
    max.addEventListener('change', filter);

    // function filterPrice(){
    //   cards.forEach((card) => {
    //     const cardPrice = card.querySelector('.card-price');
    //     const price = parseFloat(cardPrice.textContent);
        
    //     if ((min.value && price < min.value) || (max.value && price > max.value)) {
    //       card.parentNode.remove();
    //     } else {
    //       // goods.appendChild(card.parentNode);
    //       card.parentNode.style.display='';
    //     }
    //   });
    // }



    function filter(){
      cards.forEach((card)=>{
        const cardPrice = card.querySelector('.card-price');
        const price = parseFloat(cardPrice.textContent);
        const discount = card.querySelector('.card-sale');

        if ((min.value && price < min.value) || (max.value && price > max.value)){
          card.parentNode.style.display='none';
        } else if (discountCheckbox.checked && !discount){
          card.parentNode.style.display='none';
        } else {
          card.parentNode.style.display='';
        }
      });
    }



    //поиск
    searchBtn.addEventListener('click', () => {
      const searchText = new RegExp(search.value.trim(), 'i');
      cards.forEach((card) => {
        const title = card.querySelector('.card-title');
        if (!searchText.test(title.textContent)) {
          card.parentNode.style.display = 'none';
        } else {
          card.parentNode.style.display = '';
        }
      });
      console.log(searchText);
    });
}
//end фильтр акции

//получение данных с сервера
function getData(){
  const goodsWrapper = document.querySelector('.goods');
  return fetch('../db/db.json')
    .then((response)=>{
      if (response.ok){
      return response.json();
    } else {
      throw new Error ('Данные не были получены, ошибка: '+response.status);
    }
  })
  .then(data=>{
    return data;
  })
  .catch(err=>{
    console.warn(err);
    goodsWrapper.innerHTML = '<div style="color: red; font-size:30px">Упс, что-то пошло не так...</div>';
  });
}

//выводим карточки товара
function renderCards(data){
  const goodsWrapper = document.querySelector('.goods');
  data.goods.forEach((good)=>{
    const card = document.createElement('div');
    card.className='col-12 col-md-6 col-lg-4 col-xl-3';
    card.innerHTML=`
             
                <div class="card" data-category="${good.category}">
                ${good.sale ? '<div class="card-sale">🔥Hot Sale🔥</div>' : ''}
									
									<div class="card-img-wrapper">
										<span class="card-img-top"
											style="background-image: url('${good.img}')"></span>
									</div>
									<div class="card-body justify-content-between">
										<div class="card-price" style="${good.sale ? 'color:red' : ''}">${good.price} ₽</div>
										<h5 class="card-title">${good.title}</h5>
										<button class="btn btn-primary">В корзину</button>
									</div>
								</div>
							</div>
    `;
    goodsWrapper.appendChild(card);
  });
}
//end получение данных с сервера

function renderCatalog () {
  const cards = document.querySelectorAll('.goods .card');
  const catalogList = document.querySelector('.catalog-list');
  const catalogWrapper = document.querySelector('.catalog');
  const catalogBtn = document.querySelector('.catalog-button');
  const categories = new Set();

  cards.forEach((card)=>{
    categories.add(card.dataset.category);
  });
  categories.forEach((item)=>{
    const li = document.createElement('li');
    li.textContent = item;
    catalogList.appendChild(li);
  });

  catalogBtn.addEventListener('click', (event)=> {
    if (catalogWrapper.style.display){
    catalogWrapper.style.display = '';}
    else {catalogWrapper.style.display = 'block';
  }
  if (event.target.tagName === 'LI'){
    cards.forEach((card)=>{
      if (card.dataset.category === event.target.textContent){
        card.parentNode.style.display = '';
      } else {
        card.parentNode.style.display = 'none';
      }
    });
  }
  });
}


getData().then((data)=>{
  renderCards(data);
  renderCatalog ();
toggleCheckbox();
toogleCart();
addCart();
actionPage();
});