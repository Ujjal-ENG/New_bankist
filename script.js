'use strict';

const btnScrollTo = document.querySelector('.btn--scroll-to');
const section1 = document.querySelector('#section--1');
btnScrollTo.addEventListener('click', function () {
  section1.scrollIntoView({ behavior: 'smooth' });
});
///////////////////////////////////////
// Modal window

const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');
const btnCloseModal = document.querySelector('.btn--close-modal');
const btnsOpenModal = document.querySelectorAll('.btn--show-modal');
const nav = document.querySelector('.nav');

const tabs = document.querySelectorAll('.operations__tab');
const tabContainer = document.querySelector('.operations__tab-container');
const tabsContent = document.querySelectorAll('.operations__content');

const openModal = function () {
  modal.classList.remove('hidden');
  overlay.classList.remove('hidden');
};

const closeModal = function (e) {
  e.preventDefault();
  modal.classList.add('hidden');
  overlay.classList.add('hidden');
};

btnsOpenModal.forEach(btn => btn.addEventListener('click', openModal));

for (let i = 0; i < btnsOpenModal.length; i++)
  btnsOpenModal[i].addEventListener('click', openModal);

btnCloseModal.addEventListener('click', closeModal);
overlay.addEventListener('click', closeModal);

document.addEventListener('keydown', function (e) {
  if (e.key === 'Escape' && !modal.classList.contains('hidden')) {
    closeModal();
  }
});

//Tabebd component

tabContainer.addEventListener('click', function (e) {
  const clicked = e.target.closest('.operations__tab');

  // Gurad Class
  if (!clicked) return;

  // Remove active classes
  tabs.forEach(tab => tab.classList.remove('operations__tab--active'));
  tabsContent.forEach(c => c.classList.remove('operations__tab--active'));

  // Activate tab
  clicked.classList.add('operations__tab--active');
  // Activate content area
  document
    .querySelector(`.operations__content--${clicked.dataset.tab}`)
    .classList.add('operations__tab--active');
});

// document.querySelectorAll('.nav__link').forEach(function (el) {
//   el.addEventListener('click', function (e) {
//     e.preventDefault();
//     const id = this.getAttribute('href');
//     console.log(id);
//     document.querySelector(id).scrollIntoView({ behavior: 'smooth' });
//   });
// });

// 1. Add event listerner to common parent elements

// 2. Determine what element originater the event

document.querySelector('.nav__links').addEventListener('click', function (e) {
  e.preventDefault();
  if (e.target.classList.contains('nav__link')) {
    const id = e.target.getAttribute('href');
    document.querySelector(id).scrollIntoView({ behavior: 'smooth' });
  }
});

// Menu fade animation
const handleHover = function (e) {
  if (e.target.classList.contains('nav__link')) {
    const link = e.target;
    const sibilings = link.closest('.nav').querySelectorAll('.nav__link');
    const logo = link.closest('.nav').querySelector('img');

    sibilings.forEach(function (el) {
      if (el !== link) {
        return (el.style.opacity = this);
      }
    });
    logo.style.opacity = this;
  }
};
nav.addEventListener('mouseover', handleHover.bind(0.5));
nav.addEventListener('mouseout', handleHover.bind(1));

// Sticky navigation
// const intialCoords = section1.getBoundingClientRect();
// window.addEventListener('scroll', function (e) {
//   console.log(window.scrollY);

//   if (window.scrollY > intialCoords.top) {
//     return nav.classList.add('sticky');
//   } else {
//     return nav.classList.remove('stick');
//   }
// });

// sticky navigation: Intersection Obervaer API

// const obsCallback = function (entries,observer) {
//   entries.forEach(entry => {
//     console.log(entry);
//   })
// };

// const obsOptions = {
//   root: null,
//   threshold: [0,1,0.2],
// };

// const observer = new IntersectionObserver(obsCallback, obsOptions);
// observer.observe(section1);

const header = document.querySelector('.header');
const navHeight = nav.getBoundingClientRect().height;

const stickyNav = function (entries, observer) {
  const [entry] = entries;
  if (!entry.isIntersecting) {
    return nav.classList.add('sticky');
  } else {
    return nav.classList.remove('sticky');
  }
};

const headerObserver = new IntersectionObserver(stickyNav, {
  root: null,
  threshold: [0],
  rootMargin: `${navHeight}px`,
});
headerObserver.observe(header);

// Reveal Sections
const alSection = document.querySelectorAll('.section');

const revealSection = function (entries, observer) {
  const [entry] = entries;

  if (!entry.isIntersecting) {
    return;
  }
  entry.target.classList.remove('section--hidden');
  observer.unobserve(entry.target);
};
const sectionObserver = new IntersectionObserver(revealSection, {
  root: null,
  threshold: 0.15,
});

alSection.forEach(function (section) {
  sectionObserver.observe(section);
  // section.classList.add('section--hidden');
});

// Lazy Loading images
const imgTarget = document.querySelectorAll('img[data-src]');

const loadImg = function (entries, observer) {
  const [entry] = entries;

  if (!entry.isIntersecting) {
    return;
  }
  // Replace src with data-src
  entry.target.src = entry.target.dataset.src;
  entry.target.addEventListener('load', function () {
    entry.target.classList.remove('lazy-img');
  });
  observer.unobserve(entry.target);
};
const imgObserver = new IntersectionObserver(loadImg, {
  root: null,
  threshold: 0,
  rootMargin: '-200px',
});

imgTarget.forEach(img => imgObserver.observe(img));

//Slider

const slides = document.querySelectorAll('.slide');
const btnLeft = document.querySelector('.slider__btn--left');
const btnRight = document.querySelector('.slider__btn--right');
const dotContainer = document.querySelector('.dots');

// const slider = document.querySelector('.slider');
// slider.style.transform = 'scale(0.5) translateX(-120px)';
// slider.style.overflow = 'visible';

// First slide should be 0%,100%,200% and 300%


let currentSlide = 0;
const max = slides.length;
const goToSlide = function () {
  slides.forEach((s, i) => (s.style.transform = `translateX(${100 * (i - currentSlide)}%)`
  ));
};

const createDots = function () {
  slides.forEach(function (_, i) {
    dotContainer.insertAdjacentHTML('beforeend',
      `<button class="dots__dot" data-slide="${i}"></button>`);
  });
};
createDots();

const activateDot = function (slide) {
  document.querySelectorAll('.dots__dot').forEach(dot => dot.classList.remove('dots__dot--active'));
  
  document.querySelector(`.dots__dot[data-slide="${slide}"]`).classList.add('dots__dot--active');

};


const nextSlide = function () {
  if (currentSlide === max - 1) {
    currentSlide = 0;
  } else {
    currentSlide++;
  }
  goToSlide(currentSlide);
  activateDot(currentSlide);
};

const prevSlide = function () {
  if (currentSlide === 0) {
    currentSlide = max - 1;
  } else {
    currentSlide--;
  }
  goToSlide(currentSlide);
  activateDot(currentSlide);
};

const init = function () {
  activateDot(0);
  goToSlide(0);
}
init();
// Event handlers
btnRight.addEventListener('click', nextSlide);

btnLeft.addEventListener('click', prevSlide);

document.addEventListener('keydown', function (e) {
  if (e.key === 'ArrowLeft') {
    return prevSlide();
  }
  if (e.key === 'ArrowRight') {
    return nextSlide();
  }
});

dotContainer.addEventListener('click', function (e) {
  if (e.target.classList.contains('dots__dot')) {
    const  slide  = e.target.dataset.slide;
    goToSlide(slide);
    activateDot(slide);
  }
});
/*
const randomInt = (min, max) =>
  Math.floor(Math.random() * (max - min + 1) + min);

const randomColor = () =>
  `rgb(${randomInt(0, 255)},${randomInt(0, 255)},${randomInt(0, 255)})`;

document.querySelector('.nav__link').addEventListener('click', function (e) {
  this.style.backgroundColor = randomColor();
  e.target.currentTarget;
});

document.querySelector('.nav__links').addEventListener('click', function (e) {
  this.style.backgroundColor = randomColor();
});

document.querySelector('.nav').addEventListener('click', function (e) {
  this.style.backgroundColor = randomColor();
},true);
*/
/*
const h1 = document.querySelector('h1');

// Goind Downwards: child
console.log(h1.querySelectorAll('.highlight'));
console.log(h1.childNodes);
console.log(h1.children);

h1.firstElementChild.style.color = 'red';
h1.lastElementChild.style.color = 'white';

// Goind Upwards: child

console.log(h1.parentNode);
console.log(h1.parentElement);

h1.closest('.header').style.background = 'var(--gradient-secondary)';
h1.closest('h1').style.background = 'var(--gradient-primary)';

// Going sideways

console.log(h1.previousElementSibling);
console.log(h1.nextElementSibling);

console.log(h1.previousSibling);
console.log(h1.nextSibling);

console.log(h1.parentElement.children);
[...h1.parentElement.children].forEach(function (e) {
  if (e !== h1) {
    e.style.transform = 'scale(0.5)';
  }
});
*/
