'use strict';

//чекбокс

const checkbox = document.querySelectorAll('.filter-check_checkbox');

checkbox.forEach(function(elem, i){
  elem.addEventListener('change', function(){
    if (this.checked){
      this.nextElementSibling.classList.add('checked');
      console.log('стоит гала');
    }
    else {
      this.nextElementSibling.classList.remove('checked');
      console.log('убрали галу');
    }
    
  });
  console.log(elem);
  console.log(i);
});

// for (let i = 0; i < checkbox.length; i++){
//   checkbox[i].addEventListener('change', function(){
//   if (this.checked){
//     this.nextElementSibling.classList.add('checked');
//     console.log('стоит гала');
//   }
//   else {
//     this.nextElementSibling.classList.remove('checked');
//     console.log('убрали галу');
//   }
  
// });
// }


//end чекбокс

//корзина
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

//end корзина

//работа с корзиной (добавление/удаление)
const cards = document.querySelectorAll('.goods .card');
const cartWrapper = document.querySelector('.cart-wrapper'),
      cartEmpty = document.getElementById('cart-empty'),
      countGoods = document.querySelector('.counter');
cards.forEach((card) => {
  const btn = card.querySelector('button');
  btn.addEventListener('click', () => {
    const cardClone = card.cloneNode(true);
    cartWrapper.appendChild(cardClone);
    cartEmpty.remove();
    showData();
  });
});

function showData() {
  const cardsCart = cartWrapper.querySelectorAll('.card');
  countGoods.textContent = cardsCart.length;
  // console.log(cardsCard.length);
}

//end работа с корзиной