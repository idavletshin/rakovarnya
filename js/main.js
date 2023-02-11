/* fade logo */
const logo = document.querySelector('.header__logo')
const body = document.querySelector('body')

window.addEventListener('scroll', () => {
  const scroll = document.documentElement.scrollTop || document.body.scrollTop

  if (scroll > 1) {
    body.classList.add('scroll')
  } else {
    body.classList.remove('scroll')
  }

  if (scroll > 450) {
    logo.classList.add('_show')
  } else {
    logo.classList.remove('_show')
  }
})

/* anchors for menu */
const anchors = document.querySelectorAll('.category-menu__link')

for (let anchor of anchors) {
  anchor.addEventListener('click', function (e) {
    e.preventDefault()

    for (let a of anchors) {
      a.classList.remove('_active');
    }

    this.classList.add('_active');

    const target = document.querySelector(this.getAttribute('href'));

    target.scrollIntoView({
      behavior: 'smooth',
      block: 'start',
    });
  })
}

/* burger */
const burger = document.querySelector(".burger");
const menuList = document.querySelector(".header__menu");

burger.addEventListener('click', () => {
  burger.classList.toggle('_active')
  menuList.classList.toggle('_active')
  body.classList.toggle('_overflow-hidden')
})

/* tabs for shopping cart */
const delivery = document.querySelector('#delivery');
const customerPickup = document.querySelector('#customer-pickup');
const deliveryContent = document.querySelector('#delivery-content');
const customerPickupContent = document.querySelector('#customer-pickup-content');

if (delivery) {
  delivery.addEventListener('change', function () {
    if (this.checked) {
      deliveryContent.classList.add('_show');
      customerPickupContent.classList.remove('_show');
    }
  });
}

if (customerPickup) {
  customerPickup.addEventListener('change', function () {
    if (this.checked) {
      customerPickupContent.classList.add('_show');
      deliveryContent.classList.remove('_show');
    }
  });
}

/* steps for shopping cart */
const stepOne = document.querySelector('#step-1');
const stepTwo = document.querySelector('#step-2');

document.querySelectorAll(".hide-block-button").forEach(button => {
  button.addEventListener("click", function () {
    let blockToHide = this.closest("div").id;
    if (stepOne.id === blockToHide) {
      stepOne.classList.remove('_show');
      stepTwo.classList.add('_show');
    } else if (stepTwo.id === blockToHide) {
      stepTwo.classList.remove('_show');
      stepOne.classList.add('_show');
    }
  });
});

/* add product | remove product */
const plus = document.querySelectorAll('.counter__increment-btn');
const minus = document.querySelectorAll('.counter__decrement-btn');

document.querySelectorAll(".actions-product__button").forEach(button => {
  button.addEventListener("click", function () {
    this.nextElementSibling.style.display = "flex"
    this.style.display = "none"
  })
})

function min() {
  return function () {
    if (this.nextElementSibling.value > 1) {
      return --this.nextElementSibling.value;
    } else if (this.nextSibling.parentElement.id === 'cutlery-counter') {

    } else {
      this.nextSibling.parentNode.parentElement.children[1].style.display = "flex";
      this.nextSibling.parentElement.style.display = "none"
    }
  }
}

function pl() {
  return function () {
    return ++this.previousElementSibling.value;
  }
}

minus.forEach(function (dominus) {
  dominus.addEventListener('click', min());
})

plus.forEach(function (doplus) {
  doplus.addEventListener('click', pl());
})

/* select */
const selectLocation = document.querySelectorAll('.select-location');
const selectLocationList = document.querySelectorAll('.select-location__list');

selectLocation.forEach((item) => {
  item.addEventListener('click', function (event) {
    let target = event.target;
    while (target !== this) {
      if (target.classList.contains('select-location__item')) {
        let textField = this.querySelector('.select-location__text-field');
        textField.innerHTML = `<span>${target.textContent}</span>`;
        hideAllLists();
        return;
      }
      target = target.parentNode;
    }

    selectLocationList.forEach((list) => {
      if (list !== this.querySelector('.select-location__list')) {
        list.style.display = 'none';
      }
    });

    let list = this.querySelector('.select-location__list');
    list.style.display = 'block';
    let listRect = list.getBoundingClientRect();
    let viewportHeight = Math.max(document.documentElement.clientHeight, window.innerHeight || 0);
    if (listRect.bottom > viewportHeight) {
      list.style.top = 'auto';
      list.style.bottom = '100%';
    } else {
      list.style.top = '100%';
      list.style.bottom = 'auto';
    }
  });
});

document.addEventListener('click', function (event) {
  let target = event.target;
  if (!target.closest('.select-location')) {
    hideAllLists();
  }
});

function hideAllLists() {
  selectLocationList.forEach((list) => {
    list.style.display = 'none';
  });
}