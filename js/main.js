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
// document.querySelectorAll('.category-menu__link').forEach(link => {
//   link.addEventListener('click', e => {
//     e.preventDefault();

//     const id = link.getAttribute('href');
//     const target = document.querySelector(id);

//     let offsetTop = 0;
//     if (window.innerWidth < 991.98) {
//       offsetTop = eval("110 + 0 * ((100 - 320) / 920)")
//     } else {
//       offsetTop = 200;
//     }

//     window.scroll({
//       top: target.offsetTop - offsetTop,
//       behavior: 'smooth'
//     });
//   });
// });

document.querySelectorAll('.category-menu__link').forEach(link => {
  link.addEventListener('click', e => {
    e.preventDefault();

    document.querySelectorAll('.category-menu__link').forEach(l => {
      l.classList.remove('_active');
    });

    link.classList.add('_active');

    const id = link.getAttribute('href');
    const target = document.querySelector(id);

    let offsetTop = 0;
    if (window.innerWidth < 991.98) {
      offsetTop = eval("110 + 0 * ((100 - 320) / 920)");
    } else {
      offsetTop = 200;
    }

    window.scroll({
      top: target.offsetTop - offsetTop,
      behavior: 'smooth'
    });
  });
});

/* disable double click in safari on phone */
// document.addEventListener('touchstart', function (event) {
//   if (event.touches.length > 1) {
//     event.preventDefault();
//   }
// }, false);

/* anchors for menu */
// document.querySelectorAll('.category-menu__link').forEach(link => {
//   link.addEventListener('click', e => {
//     e.preventDefault();

//     document.querySelectorAll('.category-menu__link').forEach(l => {
//       l.classList.remove('_active');
//     });

//     link.classList.add('_active');

//     const id = link.getAttribute('href');
//     const target = document.querySelector(id);

//     let offsetTop = 0;
//     if (window.innerWidth < 991.98) {
//       offsetTop = eval("110 + 0 * ((100 - 320) / 920)");
//     } else {
//       offsetTop = 200;
//     }

//     // Check if Safari on desktop
//     if (navigator.vendor && navigator.vendor.indexOf('Apple') > -1 &&
//       navigator.userAgent && !navigator.userAgent.match('CriOS')) {
//       window.scroll(0, target.offsetTop - offsetTop);
//     } else {
//       window.scroll({
//         top: target.offsetTop - offsetTop,
//         behavior: 'smooth'
//       });
//     }
//   });
// });

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
      this.nextSibling.parentElement.parentElement.firstElementChild.style.display = "inline-flex"
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