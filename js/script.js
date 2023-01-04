'use strict';
let mainInputText = document.querySelector('.input__main__check__text');
let mainObj = [];
let objCompleted = {};
let listBlock = document.querySelector('.list-block');
let div = document.createElement('div');
let arrHelp = {};
let title = document.querySelector('.title__img__light');
let inputElemText = document.querySelectorAll('.input__main__wrap');
let inputCloseElem = document.querySelectorAll('.input__main__check__close');
let listBlockText = document.querySelectorAll('.list-block__text');
let checkboxElem = document.querySelectorAll('.checkmark');
let menuElem = document.querySelector('#menu');
let sumActivePoint = document.querySelector('.list-block__menu__text span');
let activeButton = document.querySelector('#Active');
let allButton = document.querySelector('#All');
let completedButton = document.querySelector('#Completed');
let clearButton = document.querySelector('#Clear');
let buttonDarkLight = document.querySelector('.title__img');
let mainWindow = document.querySelector('.main');
let mainInput = document.querySelector('.input__main__wrap__position');
let menuButtons = document.querySelectorAll('.list-block__menu__text__control__elem');
let menuTextElem = document.querySelectorAll('.list-block__menu__text');
let hint = document.querySelector('.hint');
let checkmarkMain = document.querySelector('#checkmarkMain');
let elemPanelControl = document.querySelector('.list-block__menu__text__control');



let darkOrLight = 'light';

function createNewElem (x, y, z, a, no = "", comp = '') {
    listBlock.innerHTML += `
    <div draggable="true" class="input__main__wrap input__main__wrap__${darkOrLight} ${no} ${comp}">
    <div class="input__main__check__block">
        <input ${z} type="checkbox" id="check${x}" class="input__main__check">
        <label for="check${x}" class="checkmark checkmark__${darkOrLight}"></label>
    </div>
    <div class="list-block__text ${a}">
    ${y}
    </div>
    <img src="icons/close.svg" alt="close" class="input__main__check__close">
</div>
    `;
    
listBlock.append(div);
}

mainInputText.addEventListener('change', function(event) {
   
    if (!mainInputText.value == '') {
        mainObj.push(mainInputText.value);
    }
    console.log(mainObj);
    console.log(arrHelp);

    mainObj.forEach(function (value, number) {
        
        localStorage.setItem(number, value);
        console.log(`${value} номер  ${number}`);
    })
    createNewElem (mainObj.length - 1, mainObj[mainObj.length - 1]);
    
    mainInputText.value = "";
    console.log(localStorage.length);
    console.log(listBlock.clientHeight);
    menuActive();
    countActivePoint();
})





title.addEventListener('click', function() {
    
    console.log(arrHelp);
})

let completedArr = new Set();
let SetArrCompleted;
function getActiveNumber () {

    for(let i=0; i<localStorage.length; i++) {
        let key = localStorage.key(i);
   
        if (key.match('completed')) {
            n = localStorage.getItem(key);
          
            completedArr.add(n);
            console.log(`${key}: ${localStorage.getItem(key)}`);
          
        }
        
      }
      SetArrCompleted = new Set(completedArr);
            console.log(SetArrCompleted);
            console.log(objCompleted);
            console.log(completedArr);
            return SetArrCompleted;
            
    }

function renovationMainObj (no, comp) {
    for (let i=0; i < localStorage.length; i++) {
        if (+localStorage.key(i) < 50) {
            arrHelp[localStorage.key(i)] = localStorage.getItem(localStorage.key(i));
            mainObj[localStorage.key(i)] = localStorage.getItem(localStorage.key(i));
            
            
        }
        

    }
    console.log(mainObj);
    for (let p = 0; p < mainObj.length; p++) {
        getActiveNumber();
        console.log(SetArrCompleted);

       if (SetArrCompleted.has(`${p}`)){
        console.log(`${p} сходится`);
        
            createNewElem (p, mainObj[p], 'checked', `text__completed__${darkOrLight}`, no, '');
        } else {
            createNewElem (p, mainObj[p], '', '', '', comp);
        }
    // 
    
        menuActive();
        countActivePoint();
        
    }
}
setTimeout(renovationMainObj, 500);

function updateNumberActivePoint () {
    let arrTwo = Object.values(objCompleted);
    console.log(arrTwo);
    for (let elemObj in objCompleted) {
                delete objCompleted[elemObj];
            }
    for (let u=0; u < mainObj.length; u++) {
        localStorage.setItem(u, mainObj[u]);

        
            
            
            
            for (let elArr = 0; elArr < arrTwo.length; elArr++) {
                if (mainObj.indexOf(arrTwo[elArr]) >= 0) {
                    objCompleted[mainObj.indexOf(arrTwo[elArr])] = arrTwo[elArr];
                }
                
            }
        
    }
}

// удаление элемента:
let g;
listBlock.addEventListener('click', function (event) { /* рабочий код */
    if (event.target.className == 'input__main__check__close') {
        g = event.target.previousElementSibling.innerText;
        console.log(g);
        
        
        localStorage.clear();
        mainObj.forEach(function (z, num) {
            if (z == g) {
                console.log(num);
                g = num;
                mainObj.splice(num, 1);
                localStorage.removeItem(num);
                console.log(mainObj);
                
                event.target.offsetParent.remove();
            }
            
        })
        
    }
    countActivePoint();
    updateNumberActivePoint ();
    objCompletedLocal ();
    

})




function numberInArray () {
   
    for (key in mainObj) {
        console.log(`${mainObj.key} номер  ${key}`);
    }
   
  
}
let elemInDomNumber;
function arrOne (w) {
    mainObj.forEach(function (index, numb) {
  
        
        if (w == index) {
            console.log(numb);
            console.log(mainObj);
            elemInDomNumber = numb;
        }
       
    })
    return elemInDomNumber;
}

let moveElem;

function mousemoveFunc (event) {
    event.preventDefault();
    console.log('мышь2');
    moveElem.style.position = 'absolute';
    document.body.append(moveElem);
    moveElem.style.left = event.pageX - moveElem.offsetWidth / 2 + 'px';
    moveElem.style.top = event.pageY - moveElem.offsetHeight / 2 + 'px';
}

// function mousemoveFuncMobile (event) {
//     // event.preventDefault();
//     console.log('мышь2');
//     moveElem.style.position = 'absolute';
//     document.body.append(moveElem);
//     moveElem.style.left = event.changedTouches[0].pageX - moveElem.offsetWidth / 2 + 'px';
//     moveElem.style.top = event.changedTouches[0].pageY - moveElem.offsetHeight / 2 + 'px';
// }


// listBlock.addEventListener('mousedown', function (event) {
//     if (event.target.className == 'list-block__text ') {
        
//         console.log('мышь1');
       
//         console.log(console.dir());
//         moveElem = event.target.offsetParent;
//         moveElem.style.position = 'absolute';
//         document.body.append(moveElem);
       
//         moveElem.style.left = event.pageX - moveElem.offsetWidth / 2 + 'px';
//         moveElem.style.top = event.pageY - moveElem.offsetHeight / 2 + 'px';

//         console.log(moveElem.outerText);
//         arrOne (moveElem.outerText);
//         let numberThisElem = arrOne(moveElem.outerText);
//         console.log(numberThisElem);
    
//         document.addEventListener('mousemove', mousemoveFunc);

            

//         moveElem.addEventListener('mouseup', function (event) {
//             console.log('мышь3');
//             document.removeEventListener('mousemove', mousemoveFunc);
//             moveElem.style.visibility = 'hidden';
//             let elemInDom = document.elementFromPoint(event.clientX, event.clientY);
//             // 
//             console.log(elemInDom);
           
//             console.log(event.currentTarget);
//             console.log(console.dir(event.currentTarget));
//             console.log(event.type);
            
            
//             if (elemInDom.className == "list-block__text") {
           
                
//                 arrOne(elemInDom.outerText);
//                 console.log(elemInDomNumber);
//                 let a = mainObj.splice(numberThisElem, 1);
//                 let b = mainObj.slice(elemInDomNumber+1);
//                 let v = mainObj.slice(0, elemInDomNumber+1);
               
//                 console.log(mainObj);
//                 console.log(a);
//                 console.log(b);
//                 b.unshift(a);

//                 console.log(v);
//                 let newArr = v.concat(b);
//                 mainObj = newArr;
//                 console.log(mainObj);
                
//                 for (let k=0; k < localStorage.length; k++) {
//                     if (+localStorage.key(k) < 50) {
//                         localStorage.removeItem(k);
                        
//                     }
//                 }
//                 for (let u=0; u < mainObj.length; u++) {
//                     localStorage.setItem(u, mainObj[u]);
//                 }
//                 let numberAfterChange = arrOne(moveElem.outerText);
//                 moveElem.style.display = 'none';
//                 listBlock.innerHTML = ``;
//                 renovationMainObj ();
                
//             } else {
//                 console.log('другой класс');
//                 moveElem.style.display = 'none';
//                 listBlock.innerHTML = ``;
//                 renovationMainObj ();
//             }
//             moveElem.style.visibility = 'visible';

//         })

//     }
    
// })
// на мобильном
// listBlock.addEventListener('touchstart', function (event) {
//     if (event.target.className == 'list-block__text ') {
        
//         console.log('мышь1');
       
//         console.log(console.dir());
//         moveElem = event.target.offsetParent;
//         moveElem.style.position = 'absolute';
//         document.body.append(moveElem);
       
//         moveElem.style.left = event.pageX - moveElem.offsetWidth / 2 + 'px';
//         moveElem.style.top = event.pageY - moveElem.offsetHeight / 2 + 'px';

//         // moveElem.style.width = '10px';
//         // moveElem.style.height = '10px';

//         console.log(moveElem.outerText);
//         arrOne (moveElem.outerText);
//         let numberThisElem = arrOne(moveElem.outerText);
//         // console.log(numberThisElem);
    
//         document.addEventListener('touchmove', mousemoveFuncMobile);

            

//         moveElem.addEventListener('touchend', function (event) {
//             console.log('мышь3');
//             document.removeEventListener('touchmove', mousemoveFuncMobile);
//             moveElem.style.visibility = 'hidden';
//             // let elemInDom = document.elementFromPoint(event.clientX, event.clientY);
//             let a;
//             let b;
//             a = event.changedTouches[0].pageX;
//             b = event.changedTouches[0].pageY;
//             console.log(a);
//             console.log(b);
//             console.log(elemInDom);
           
//             console.log(event.currentTarget);
//             console.log(console.dir(event.currentTarget));
//             console.log(event.type);
            
            
//             if (elemInDom.className == "list-block__text") {
           
                
//                 arrOne(elemInDom.outerText);
//                 console.log(elemInDomNumber);
//                 let a = mainObj.splice(numberThisElem, 1);
//                 let b = mainObj.slice(elemInDomNumber+1);
//                 let v = mainObj.slice(0, elemInDomNumber+1);
               
//                 console.log(mainObj);
//                 console.log(a);
//                 console.log(b);
//                 b.unshift(a);

//                 console.log(v);
//                 let newArr = v.concat(b);
//                 mainObj = newArr;
//                 console.log(mainObj);
                
//                 for (let k=0; k < localStorage.length; k++) {
//                     if (+localStorage.key(k) < 50) {
//                         localStorage.removeItem(k);
                        
//                     }
//                 }
//                 for (let u=0; u < mainObj.length; u++) {
//                     localStorage.setItem(u, mainObj[u]);
//                 }
//                 let numberAfterChange = arrOne(moveElem.outerText);
//                 moveElem.style.display = 'none';
//                 listBlock.innerHTML = ``;
//                 renovationMainObj ();
                
//             } else {
//                 console.log('другой класс');
//                 moveElem.style.display = 'none';
//                 listBlock.innerHTML = ``;
//                 renovationMainObj ();
//             }
//             moveElem.style.visibility = 'visible';

//         })

//     }
    
// })





function objCompletedLocal () {
    console.log(objCompleted);
    for (let ob in objCompleted) {
        localStorage.setItem(`completed${ob}`, ob);
    }
}

let n;
function testNumberCheckOnActive () {
   
    for(let i=0; i<localStorage.length; i++) {
        let key = localStorage.key(i);
   
       
        if (key.match(`completed${numberCheck}`)) {
            console.log(key);
           let keyLocal = localStorage.getItem(key);
            
           
            if (completedArr.has(`${keyLocal}`)) {
               
                completedArr.delete(keyLocal);
            }
            if (objCompleted.hasOwnProperty(`${keyLocal}`)) {
                console.log(keyLocal);
                delete objCompleted[keyLocal];
            }
            SetArrCompleted.delete(keyLocal);
            console.log(objCompleted);
            console.log(completedArr);
            localStorage.removeItem(`${key}`);

        }
    }
   
}


// }
let check = document.querySelector('input__main__check');
let numberCheck;
listBlock.addEventListener('change', function textCompleted (event) {
    
    if (event.target.className == 'input__main__check') {

    
        numberCheck = event.target.id.slice(-1);
        console.log(SetArrCompleted);
        if (SetArrCompleted.has(`${numberCheck}`)){
            console.log('есть в Сете');
            
            testNumberCheckOnActive ();
            console.log(SetArrCompleted);
            
            event.target.offsetParent.nextElementSibling.classList.remove(`text__completed__${darkOrLight}`);
            event.target.offsetParent.nextElementSibling.classList.add('list-block__text');
        } else {
            console.log('нет в Сете');
            console.log(completedArr);
            objCompleted[numberCheck] = mainObj[numberCheck];
            console.log(objCompleted);
            
            completedArr.add(numberCheck);
            console.log(completedArr);
            objCompletedLocal ();
            
            event.target.offsetParent.nextElementSibling.classList.add(`text__completed__${darkOrLight}`);
            event.target.offsetParent.nextElementSibling.classList.remove('list-block__text');
            getActiveNumber();
            console.log(SetArrCompleted);

        }
        countActivePoint();
   
    
    }})


    

getActiveNumber ();

console.log(objCompleted);


console.log(console.dir(listBlock));




function menuActive () {
    
        console.log('больше');
        menuElem.classList.add('list-block__menu');
        menuElem.classList.remove('list-block__menu__active__no');
        listBlock.classList.remove('list-block__shadow');
    
}


function countActivePoint () {
    sumActivePoint.innerHTML = mainObj.length - SetArrCompleted.size;
    console.log(mainObj.length - SetArrCompleted.size);
}

let activePoint = [];
function filterActivePoint () {
    mainObj.forEach(function (m, i) {
        if (SetArrCompleted.has(`${i}`)) {
            console.log(`дело номер ${i} сделано`);
        } else {
            activePoint.push(i);
        }
    })
    
    console.log(activePoint);
    createNewElem(no = 'input__main__wrap__none');
}

activeButton.addEventListener('click', function () {
    activeButtonColor();
    this.classList.add('control__elem__active');
    listBlock.innerHTML = ` `;
    
    renovationMainObj ('input__main__wrap__none');
       
    
});


allButton.addEventListener('click', function () {
    activeButtonColor();
    this.classList.add('control__elem__active');
    listBlock.innerHTML = ` `;
    renovationMainObj (' ');
})

completedButton.addEventListener('click', function () {
    activeButtonColor();
    this.classList.add('control__elem__active');
    listBlock.innerHTML = ` `;
    renovationMainObj ('', 'input__main__wrap__none');
})

// удалить все отмеченные галочкой элементы
clearButton.addEventListener('click', function () {
    console.log(mainObj);
    for (let p = 0; p < mainObj.length; p++) {
        getActiveNumber();
        console.log(SetArrCompleted);
        let objectValues = Object.values(objCompleted);
        objectValues.forEach(function () {
            if (objectValues.includes(mainObj[p])) {
                console.log(`сходится с объектом${mainObj[p]}`);
                for (let k in objCompleted) {
                    if (objCompleted[k] == mainObj[p]) {
                     
                    SetArrCompleted.delete(`${k}`);
                    completedArr.delete(`${k}`);
                     Reflect.deleteProperty(objCompleted, k);
                   
                    }
                 }
                mainObj.splice(p, 1);
                console.log(`${p} сходится`);
                
                
                localStorage.clear();
    
           console.log('localStorage очищено');
            }
        })
        
  
      
        


    
       mainObj.forEach(function (value, number) {
        localStorage.setItem(number, value);
    })
    listBlock.innerHTML = ` `;

        renovationMainObj();
       
        console.log(mainObj);
        console.log(objCompleted);
        console.log(completedArr);
    }

})
console.log(mainObj);

let example = [0, 1, 2, 3, 4, 5];
example.splice(1, 1);
example.splice(3, 1);
console.log(example);

// смена темы темная/светлая

function switchingDarkLight () {
    if (buttonDarkLight.classList.contains('title__img__light')) {
        darkOrLight = 'dark';
        listBlock.innerHTML = ` `;
        
        buttonDarkLight.classList.remove('title__img__light');
        buttonDarkLight.classList.add('title__img__dark');

        mainWindow.classList.remove('title__img__light');
        mainWindow.classList.add('main__dark');

        

        menuElem.classList.remove('list-block__menu__light');
        menuElem.classList.add('list-block__menu__dark');

        mainInput.classList.remove('input__main__wrap__light');
        mainInput.classList.add('input__main__wrap__dark');
        
        mainInputText.classList.add('input__main__check__text__dark');

        menuButtons.forEach(function (buttonElem) {
            buttonElem.classList.remove('menu__text__light');
            buttonElem.classList.add('menu__text__dark');
            
        });
        
        menuTextElem.forEach(function (textElem) {
            textElem.classList.remove('menu__text__b-a__light');
            textElem.classList.add('menu__text__b-a__dark');
        });
        
        hint.classList.remove('hint__light');
        hint.classList.add('hint__dark');

        checkmarkMain.classList.remove('checkmark__light');
        checkmarkMain.classList.add('checkmark__dark');

        elemPanelControl.classList.remove('list-block__menu__text__control__light');
        elemPanelControl.classList.add('list-block__menu__text__control__dark');

        localStorage.removeItem('light');
        localStorage.setItem('dark', true);
        // renovationMainObj();
    } else {
        darkOrLight = 'light';
        
        listBlock.innerHTML = ` `;
        
        buttonDarkLight.classList.add('title__img__light');
        buttonDarkLight.classList.remove('title__img__dark');

        mainWindow.classList.remove('main__dark');
        mainWindow.classList.add('main__light');

        localStorage.removeItem('dark');
        localStorage.setItem('light', true);

        menuElem.classList.remove('list-block__menu__dark');
        menuElem.classList.add('list-block__menu__light');
        
        mainInput.classList.remove('input__main__wrap__dark');
        mainInput.classList.add('input__main__wrap__light');

        mainInputText.classList.remove('input__main__check__text__dark');
        
   
        menuButtons.forEach(function (buttonElem) {
            buttonElem.classList.remove('menu__text__dark');
            buttonElem.classList.add('menu__text__light');
            
        });
        

        menuTextElem.forEach(function (textElem) {
            
            textElem.classList.add('menu__text__b-a__light');
            textElem.classList.remove('menu__text__b-a__dark');
        });
        hint.classList.remove('hint__dark');
        hint.classList.add('hint__light');
        
        checkmarkMain.classList.add('checkmark__light');
        checkmarkMain.classList.remove('checkmark__dark');

        elemPanelControl.classList.add('list-block__menu__text__control__light');
        elemPanelControl.classList.remove('list-block__menu__text__control__dark');
        // renovationMainObj();
    }
}
buttonDarkLight.addEventListener('click', function () {
    switchingDarkLight();
    renovationMainObj();
});

if (localStorage.getItem('dark')) {
   switchingDarkLight ();
}



function activeButtonColor () {
    menuButtons.forEach(function (buttonMenu, n) {
        buttonMenu.classList.remove('control__elem__active');
        
        
    });
   
    
}
function showHint () {
if (listBlock.clientHeight < 120) {
    hint.style.display = 'none';
} else {
    hint.style.display = 'block';
}
}

setInterval(showHint, 500);


// listBlock.addEventListener(`dragstart`, (evt) => {
// // listBlock.addEventListener(`mousedown`, (evt) => {
//     evt.preventDefault();
//     evt.target.classList.add(`selected`);
//     console.log(evt.target);
//   })
  


// listBlock.addEventListener(`dragover`, function (evt) {
// // listBlock.addEventListener(`mousemove`, function (evt) {
//     evt.preventDefault();
//     let activeElement = listBlock.querySelector(`.selected`);

    
//     let currentElement = evt.target;
//     // console.log(console.dir(activeElement.innerText));
//     // console.log(console.dir(currentElement.innerText));
//     console.log(console.dir(activeElement));
//     console.log(currentElement); /* работает */
//     // activeElement.offsetParent.style.position = 'absolute';
//     // listBlock.insertBefore(activeElement, currentElement);
//             let textActiveElem = activeElement.innerText;
//             let numActiveElem = mainObj.indexOf(activeElement.innerText);
//             let underNumActiveElem = mainObj.indexOf(currentElement.innerText);
//             // console.log(console.dir(activeElement));
//             mainObj.splice(numActiveElem, 1);
//             mainObj.splice(underNumActiveElem, 0, textActiveElem);
            
//             console.log(mainObj);

//             localStorage.clear();
//             SetArrCompleted.forEach((point) => {
                
//                 SetArrCompleted.delete(point);
                
//             });
//             completedArr.forEach((point) => {
                
//                 completedArr.delete(point);
                
//             });
//             updateNumberActivePoint ();
//             objCompletedLocal ();
            
//             listBlock.innerHTML = ``;
//             renovationMainObj ();
//             switchingDarkLight ();
// })

// listBlock.addEventListener(`dragend`, (evt) => {
//     // listBlock.addEventListener(`mouseup`, (evt) => {
//         evt.target.classList.remove(`selected`);
//      });

// на мобильном
listBlock.addEventListener(`touchstart`, (evt) => {
    if ((evt.target.className !== 'checkmark') && (evt.target.className !== 'input__main__check') && (evt.target.className !== 'input__main__check__block')) {
    evt.preventDefault();
    evt.target.classList.add(`selected`);
    console.log('touchstart');
    
    // console.log(activeElement);
    // return activeElement;
    } else {
        return;
    }
  })
  


listBlock.addEventListener(`touchmove`, function (evt) {
    evt.preventDefault();
    
    if ((evt.target.className !== 'checkmark') && (evt.target.className !== 'input__main__check') && (evt.target.className !== 'input__main__check__block')) {
    let activeElement = listBlock.querySelector(`.selected`);
    console.log(console.dir(activeElement));
    console.log('touchmove');
    
    
    activeElement.offsetParent.style.position = 'absolute';
    
    
       
        // activeElement.style.left = event.pageX - moveElem.offsetWidth / 2 + 'px';
        // for (let i = 0; i < changedTouches.length; i++) {
        //     activeElement.style.top = evt.changedTouches[i].pageY - activeElement.offsetHeight / 2 + 'px';
        // }
        
        activeElement.offsetParent.style.visibility = 'hidden';
            
    // if (activeElement !== currentElement && currentElement.classList.contains(`input__main__wrap`)) {
    //     let isMoveable = activeElement;
    //     console.log(isMoveable);
    // } else {
    //     return;
    // }
    
    // 
    // let x = evt.touches[0].clientX;
    // let y = evt.touches[0].clientY;
    
            
    
    } else {
        return;
    }
  });


listBlock.addEventListener(`touchend`, (evt) => {
    if ((evt.target.className !== 'checkmark') && (evt.target.className !== 'input__main__check') && (evt.target.className !== 'input__main__check__block')) {
        console.log('touchend');
    evt.preventDefault();
    

    let currentElement = evt.target;
    console.log(console.dir(currentElement));
    let elemInDom = document.elementFromPoint(evt.changedTouches[0].pageX, evt.changedTouches[0].pageY);
            console.log(console.dir(elemInDom));
            console.log(elemInDom.innerText); /* Анна */
            console.log(currentElement.innerHTML.split('\n').join('').trim()); /* Борис */
            
            let textActiveElem = currentElement.innerHTML.split('\n').join('').trim();
            let numActiveElem = mainObj.indexOf(currentElement.innerHTML.split('\n').join('').trim());
            let underNumActiveElem = mainObj.indexOf(elemInDom.innerText);
            // console.log(console.dir(activeElement));
            mainObj.splice(numActiveElem, 1);
            mainObj.splice(underNumActiveElem, 0, textActiveElem);
            
            console.log(mainObj);

            localStorage.clear();
            SetArrCompleted.forEach((point) => {
                
                SetArrCompleted.delete(point);
                
            });
            completedArr.forEach((point) => {
                
                completedArr.delete(point);
                
            });
            updateNumberActivePoint ();
            objCompletedLocal ();
            
            listBlock.innerHTML = ` `;
            renovationMainObj ();
            // switchingDarkLight ();
            evt.target.classList.remove(`selected`);
        } else {
            return;
        }
            
})
// десктоп

// listBlock.addEventListener(`mousedown`, (evt) => {
    
//     evt.preventDefault();
//     evt.target.classList.add(`selected`);
//   })
  


// listBlock.addEventListener(`mousemove`, function (evt) {
//     evt.preventDefault();
//     let activeElement = listBlock.querySelector(`.selected`);
    
//     console.log(activeElement);
//     let currentElement = evt.target;
//     console.log(currentElement);
    
//     activeElement.offsetParent.style.position = 'absolute';
    
    
       
//         // activeElement.style.left = event.pageX - moveElem.offsetWidth / 2 + 'px';
//         // for (let i = 0; i < changedTouches.length; i++) {
//         //     activeElement.style.top = evt.changedTouches[i].pageY - activeElement.offsetHeight / 2 + 'px';
//         // }
        
//         activeElement.offsetParent.style.visibility = 'hidden';
            
//     // if (activeElement !== currentElement && currentElement.classList.contains(`input__main__wrap`)) {
//     //     let isMoveable = activeElement;
//     //     console.log(isMoveable);
//     // } else {
//     //     return;
//     // }
//     listBlock.addEventListener(`touchend`, (evt) => {
//     evt.preventDefault();
//     evt.target.classList.remove(`selected`);
//     // 
//     // let x = evt.touches[0].clientX;
//     // let y = evt.touches[0].clientY;
//     let elemInDom = document.elementFromPoint(evt.changedTouches[0].pageX, evt.changedTouches[0].pageY);
//             console.log(elemInDom);
//             let textActiveElem = activeElement.innerHTML.split('\n').join('').trim();
//             let numActiveElem = mainObj.indexOf(activeElement.innerHTML.split('\n').join('').trim());
//             let underNumActiveElem = mainObj.indexOf(elemInDom.innerHTML.split('\n').join('').trim());
//             // console.log(console.dir(activeElement));
//             mainObj.splice(numActiveElem, 1);
//             mainObj.splice(underNumActiveElem, 0, textActiveElem);
            
//             console.log(mainObj);

//             localStorage.clear();
//             SetArrCompleted.forEach((point) => {
                
//                 SetArrCompleted.delete(point);
                
//             });
//             completedArr.forEach((point) => {
                
//                 completedArr.delete(point);
                
//             });
//             updateNumberActivePoint ();
//             objCompletedLocal ();
            
//             listBlock.innerHTML = ``;
//             renovationMainObj ();
//             switchingDarkLight ();
            
    
    
//   });
// })

listBlock.addEventListener(`dragstart`, (evt) => {
    evt.target.classList.add(`selected`);
  })
  
listBlock.addEventListener(`dragend`, (evt) => {
    evt.target.classList.remove(`selected`);
  });

listBlock.addEventListener(`dragover`, function (evt) {
    evt.preventDefault();
    let activeElement = listBlock.querySelector(`.selected`);
    
    let currentElement = evt.target;
    // console.log(console.dir(activeElement.innerText)); /* актиный элемент */
    // console.log(currentElement.innerHTML.split('\n').join('').trim()); /* работает */
    if (activeElement !== currentElement && currentElement.classList.contains(`input__main__wrap`)) {
        let isMoveable = activeElement;
    } else {
        return;
    }
    currentElement.after(activeElement);
    // listBlock.insertBefore(activeElement, currentElement);
    console.log(console.dir(currentElement.innerText)); /* соседний элемент */

            let textActiveElem = activeElement.innerText;
            let numActiveElem = mainObj.indexOf(activeElement.innerText);
            let underNumActiveElem = mainObj.indexOf(currentElement.innerText);
            // console.log(console.dir(activeElement));
            mainObj.splice(numActiveElem, 1);
            mainObj.splice(underNumActiveElem, 0, textActiveElem);
            
            console.log(mainObj);

            localStorage.clear();
            SetArrCompleted.forEach((point) => {
                
                SetArrCompleted.delete(point);
                
            });
            completedArr.forEach((point) => {
                
                completedArr.delete(point);
                
            });
            updateNumberActivePoint ();
            objCompletedLocal ();
            
            listBlock.innerHTML = ` `;
            renovationMainObj ();
            // switchingDarkLight ();
           
})


