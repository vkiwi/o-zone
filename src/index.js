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
    discountCheckbox.addEventListener('click', () => {
      cards.forEach((card)=>{
        console.log(discountCheckbox.checked);
        if (discountCheckbox.checked){
          
          if (!card.querySelector('.card-sale')) {
            card.parentNode.style.display='none';
          }
        } else {
          card.parentNode.style.display='';
        }
      });
    });

    function filterPrice(){
      cards.forEach((card) => {
        const cardPrice = card.querySelector('.card-price');
        const price = parseFloat(cardPrice.textContent);
        
        if ((min.value && price < min.value) || (max.value && price > max.value)) {
          card.parentNode.remove();
        } else {
          // goods.appendChild(card.parentNode);
          card.parentNode.style.display='';
        }

      });
    }
    //фильтр по цене
    min.addEventListener('change', filterPrice);
    max.addEventListener('change', filterPrice);

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

toggleCheckbox();
toogleCart();
addCart();
actionPage();