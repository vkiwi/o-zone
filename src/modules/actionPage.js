import filter from './filter';

export default function actionPage() {
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