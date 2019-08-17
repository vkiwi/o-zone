export default function toggleCheckbox() {
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