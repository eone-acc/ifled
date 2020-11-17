'use strict'
// document.addEventListener('DOMContentLoaded', function () {
//   const form = document.getElementById('form')
//   form.addEventListener('submit', formSend);

//   async function formSend(e) {
//     e.preventDefault();

//     let error = formValidate(form);
//     formData = new FormData(form)


//     if (error === 0) {  
//       form.classList.add('_sending')
//       let response = await fetch('sendmail.php', {
//         method: 'POST',
//         body: formData
//       });
//       if (response.ok) {
//         let result = await response.json();
//         alert(result.message);
//         formPreview.innerHTML = '';
//         form.reset();
//         form.classList.remove('_sending')
//       } else {
//         alert('ошибка')
//         form.classList.remove('_sending')
//       }
//     }else {
//       alert('нужно заполнить')
//     }
//   }

//   function formValidate(form) {
//     let error = 0;
//     let formReq = document.querySelectorAll('._req');

//     for (let index = 0; index < formReq.length; index++) {
//       const input = formReq[index];
//       formRemoveError(input);
      
//       if(input.classList.contains('_email')) {
//           if(emailTest(index)) {
//           formAddError(input)
//           error++;
//         }
//       } else if (input.getAttribute('type') === 'checkbox' && input.checked === false) {
//         formAddError(input)
//         error++;
//       } else {
//         if (input.value === '') {
//           formAddError(input)
//           error++;
//         } 
//       }
//     }
//     return error;
//   }
//   function formRemoveError(input) {
//     input.parentElement.classList.remove('_error');
//     input.classList.remove('_error');
//   }
//   function formAddError(input) {
//     input.parentElement.classList.add('_error');
//     input.classList.add('_error');
//   }
//   function emailTest(input) {    
//     return /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(input.value);
//   }
// });



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







const dataInit = async () => {
  const url = "../database/db.json"


  const db = await fetch(url)
  .then(responce => responce.json())
  



// Рендер карточки  начало

const getDbItem = (req) => {
  let res;
  db.forEach(item => {
    item.data.forEach(i => {
      if (i.linkName === req) {
        res = i
      }
    })
  })
  return res
}


const productCardElem = document.querySelector('.product__card')
const urlParams = new URLSearchParams(window.location.search);

const renderProductCard = (productData) => {
  let productMainAttrList = '';
  let productAdditionalAttrList = '';

  productData.mainAttr.forEach(attr => {
    const attrTitle = Object.keys(attr)
    const attrValue = Object.values(attr)
    productMainAttrList += `
      <div class="popup__param"><span>${attrTitle}:</span>${attrValue}</div>
    `;
  })

  productData.additionalAttr.forEach(attr => {
    const attrTitle = Object.keys(attr)
    const attrValue = Object.values(attr)
    productAdditionalAttrList += `
      <div class="popup__tech-param">
        <p>${attrTitle}</p> <p>${attrValue}</p>
      </div>
    `;
  })
  
  productCardElem.innerHTML = `
  <div class="popup__info-block">
    <div class="popup__slider">
      <img src="img/popupImage.png" alt="popupImage">
    </div>
    <div class="popup__item-info">
      <div class="popup__title">${productData.itemName}</div>
              ${productMainAttrList}
        <a class="send-request-btn popup-link" href="#popup_2" >Отправить запрос</a>
    </div>
  </div>
  <div class="popup__docs">
  <a href="${productData.docLinks["IESLink"]}" class="popup__download-item">
    <div class="popup__icon">
    </div>
    <div class="popup__download-item-title">Скачать IES</div>
  </a>
  <a href="${productData.docLinks["pasportLink"]}" class="popup__download-item">
    <div class="popup__icon">
    </div>
    <div class="popup__download-item-title">Скачать паспорт</div>
  </a>
  <a href="${productData.docLinks["sertLink"]}" class="popup__download-item">
    <div class="popup__icon">
    </div>
    <div class="popup__download-item-title">Скачать сертификат</div>
  </a>
</div>
  <div class="popup__tech-params">
    <h2>Технические характеристики</h2>
    <div class="popup__tech-param">
      <p>Параметр</p> <p>Значение</p>
    </div>
    ${productAdditionalAttrList}
  </div>

  `;
  
}

if (urlParams.toString().includes('product')) {
  const request = urlParams.toString().split("=")[1]
  //тут потом вызовем функцию парсинга итема
  renderProductCard(getDbItem(request))
  setTimeout(() => {
    document.querySelector('.product__card').scrollIntoView({block: "start"});
  }, 0)
  
}




// Рендер карточки конец


  
  console.log("DB:", db);

  const tabItemNavElem = document.querySelector('.tabs__items');
  const tabBodyElem = document.querySelector('.tabs__body');

  tabItemNavElem.innerHTML = '';
  tabBodyElem.innerHTML = '';
  db.forEach(({title, subtitle, textInfo, data}, index) => {
    let textInfoElem = "";
    let blockItem = '';
    data.forEach(dataItem => {

      
      const getBlockItemParam = (param) => {
        const filtered = dataItem.mainAttr.filter(i => {
          return Object.keys(i)[0].includes(param);
        })
        return Object.values(filtered[0])        
      }
      
      
      blockItem += `
      <a class="block-item" href="#" data-link="${dataItem.linkName}">
        <img class="block-item__image" src="${dataItem.images[0]}" alt="item">
        <h4 class="block-item__title">${dataItem.itemName}</h4>
        <p class="block-item__param">${getBlockItemParam('Световой поток')}. ${getBlockItemParam('Потребляемая мощность')}</p>
        <button class="block-item__btn">Подробнее</button>
      </a>
      `;
    })
    textInfo.forEach(i => {
      textInfoElem += `
      <p class="tabs__text">${i}</p>
      `;
    })
    tabItemNavElem.innerHTML += `
      <a href="#" class="tabs__item" id="tab_0${index+1}_trigger">
        <div class="tabs__header">
          <h2 class="tabs__title">Серия ${title}</h2>
          <h4 class="tabs__subtitle">${subtitle}</h4>
          ${textInfoElem}
        </div>
      </a>
    `;
    tabBodyElem.innerHTML += `
    <div id="tab_0${index+1}" class="tabs__block">
      ${blockItem}
    </div>
    `;
  })

  document.querySelector('.tabs__item').classList.add('active');
  document.querySelector('.tabs__block').classList.add('active');


  const blockItemElems = document.querySelectorAll('.block-item');
  
  blockItemElems.forEach(item => {
    item.addEventListener('click', (el) => {
      el.preventDefault();
      const dataLink = el.target.closest(".block-item").getAttribute("data-link");
      console.log(dataLink);
      window.location = "http://localhost:3000/?product=" + dataLink;
    })
  })


  const tab1triggerElem =  document.querySelector('#tab_01_trigger');
  const tab2triggerElem = document.querySelector('#tab_02_trigger');
  const tab1BlockElem = document.querySelector('#tab_01');
  const tab2BlockElem = document.querySelector('#tab_02');

  tab1triggerElem.addEventListener('click', (event) => {
    event.preventDefault();
    tab1triggerElem.classList.add('active');
    tab2triggerElem.classList.remove('active');
    tab1BlockElem.classList.add('active');
    tab2BlockElem.classList.remove('active');
  })
  
  tab2triggerElem.addEventListener('click', (event) => {
    event.preventDefault();
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



}




dataInit()





