'use strict'

const tab1triggerElem = document.querySelector('#tab_01_trigger');
const tab2triggerElem = document.querySelector('#tab_02_trigger');
const tab1BlockElem = document.querySelector('#tab_01');
const tab2BlockElem = document.querySelector('#tab_02');
const navBarElem = document.querySelector('.nav');
const sectionsElem = document.querySelector('section');
const modalElem = document.querySelector('#modal');


document.addEventListener('scroll', event => {
  
  if (window.pageYOffset+50 > window.innerHeight) {
    navBarElem.classList.add('fixed');
    
  }  else {
    navBarElem.classList.remove('fixed')
  } 
  
})


tab1triggerElem.addEventListener('click', (event) => {
  event.preventDefault();
  console.log(1);
  tab1triggerElem.classList.add('active');
  tab2triggerElem.classList.remove('active');
  tab1BlockElem.classList.add('active');
  tab2BlockElem.classList.remove('active');
})

tab2triggerElem.addEventListener('click', (event) => {
  event.preventDefault();
  console.log(2);
  tab2triggerElem.classList.add('active');
  tab1triggerElem.classList.remove('active');
  tab2BlockElem.classList.add('active');
  tab1BlockElem.classList.remove('active');
})


const popupLinks = document.querySelectorAll('.popup-link');
const body = document.querySelector('body');
const lockPadding = document.querySelectorAll('.lock-padding');

let unlock = true;

const timeout = 800;

if (popupLinks.length > 0) {
  for (let index = 0; index < popupLinks.length; index++) {
    const popupLink = popupLinks[index];
    popupLink.addEventListener('click', e => {
      const popupName = popupLink.getAttribute('href').replace('#', '');
      const currentPopup = document.getElementById(popupName);
      popupOpen(currentPopup);
      e.preventDefault();
    });
  }
}

const popupCloseIcon = document.querySelectorAll('.close-popup');
if (popupCloseIcon.length > 0) {
  for (let index = 0; index < popupCloseIcon.length; index++) {
    const el = popupCloseIcon[index];
    el.addEventListener('click', e => {
      popupClose(el.closest('.popup'));
      e.preventDefault();
    })
  }
}

function popupOpen(currentPopup) {
  navBarElem.classList.remove('fixed');
  if (currentPopup && unlock) {
    const popupActive = document.querySelector('.popup.open');
    if (popupActive) {
      popupClose(popupActive, false);
    } else {
      bodyLock();
    }
    
    currentPopup.classList.add('open');
    currentPopup.addEventListener('click', e => {
      if (!e.target.closest('.popup__content')) {
        popupClose(e.target.closest('.popup'));
      }
    });
  }
}

function popupClose(popupActive, doUnlock = true) {
  if (unlock) {
    popupActive.classList.remove('open');
    if (doUnlock) {
      bodyUnLock();
    }
  }
}

function bodyLock() {  
  const lockPaddingValue = window.innerWidth - document.querySelector('.wrapper').offsetWidth + 'px';
  if (lockPadding.length > 0) {
  for (let index = 0; index < lockPadding.length; index++) {
    const el = lockPadding[index];
    el.style.paddingRight = lockPaddingValue;
  }
}
  body.style.paddingRight = lockPaddingValue;
  body.classList.add('lock');

  unlock = false;
  setTimeout(() => {
    unlock = true;
  }, timeout);
}

function bodyUnLock() {
  setTimeout(() => {
    if (lockPadding.length > 0) {
    for (let index = 0; index < lockPadding.length; index++) {
      const el = lockPadding[index];
      el.style.paddingRight = '0px';
    }
  }
    body.style.paddingRight = '0px';
    body.classList.remove('lock'); 
  }, timeout);
} 

document.addEventListener('keydown', e => {
  if (e.which === 27 ) {
    const popupActive = document.querySelector('.popup.open');
    popupClose(popupActive);
  }
});