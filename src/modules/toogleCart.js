export default function toogleCart() {
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